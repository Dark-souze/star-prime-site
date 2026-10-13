import { createHash } from 'node:crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { getAdminFirestore, FieldValue } from '@/lib/firebase-admin';
import { getSiteUrl } from '@/lib/site-url';
import { DIMENSOES, OBRA_TYPES } from '@/lib/content';

export const runtime = 'nodejs';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = '15 m';
const upstashConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);
const rateLimiter = upstashConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW),
      prefix: 'star-prime:orcamentos',
      timeout: 1500,
    })
  : null;

function getClientKey(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function getRateLimitIdentifier(request) {
  return createHash('sha256').update(getClientKey(request)).digest('hex');
}

function hasAllowedOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return process.env.NODE_ENV !== 'production';

  try {
    const originUrl = new URL(origin);
    const allowedOrigins = new Set([
      new URL(getSiteUrl()).origin,
      'https://www.starprime.ao',
      'https://starprime.ao',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3002',
    ]);

    if (process.env.VERCEL_URL) {
      allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
    }

    return allowedOrigins.has(originUrl.origin);
  } catch {
    return false;
  }
}

function readText(value, maxLength, required = false) {
  if (typeof value !== 'string') return null;
  const clean = value.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim();
  if (required && !clean) return null;
  if (clean.length > maxLength) return null;
  return clean;
}

function validatePayload(body) {
  const payload = {
    tipoObra: readText(body.tipoObra, 60, true),
    localizacao: readText(body.localizacao, 120, true),
    dimensao: readText(body.dimensao, 60),
    nome: readText(body.nome, 100, true),
    contacto: readText(body.contacto, 40, true),
  };

  const valid = payload.tipoObra
    && OBRA_TYPES.includes(payload.tipoObra)
    && payload.localizacao
    && payload.nome
    && payload.contacto
    && (!payload.dimensao || DIMENSOES.includes(payload.dimensao))
    && body.consent === true;

  return valid ? payload : null;
}

function hasProductionConfiguration() {
  return Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    && rateLimiter
    && process.env.RESEND_API_KEY
    && process.env.LEADS_NOTIFY_TO
    && process.env.LEADS_EMAIL_FROM
  );
}

async function sendLeadNotification(payload, recordId) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.LEADS_EMAIL_FROM,
      to: process.env.LEADS_NOTIFY_TO.split(',').map((email) => email.trim()).filter(Boolean),
      subject: 'Novo pedido de orçamento — Star Prime',
      text: [
        'Foi recebido um novo pedido através do website Star Prime.',
        '',
        `Nome: ${payload.nome}`,
        `Contacto: ${payload.contacto}`,
        `Tipo de obra: ${payload.tipoObra}`,
        `Localização: ${payload.localizacao}`,
        `Dimensão: ${payload.dimensao || 'Não indicada'}`,
        `Referência interna: ${recordId}`,
      ].join('\n'),
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) throw new Error(`Resend respondeu com o estado ${response.status}.`);
  const result = await response.json().catch(() => ({}));
  return result.id || null;
}

export async function POST(request) {
  if (!hasAllowedOrigin(request)) {
    return Response.json({ error: 'Origem não autorizada.' }, { status: 403 });
  }

  if (!hasProductionConfiguration()) {
    return Response.json({ error: 'O formulário está temporariamente indisponível. Fale connosco pelo WhatsApp.' }, { status: 503 });
  }

  let limitResult;
  try {
    limitResult = await rateLimiter.limit(getRateLimitIdentifier(request));
  } catch {
    return Response.json({ error: 'O formulário está temporariamente indisponível. Fale connosco pelo WhatsApp.' }, { status: 503 });
  }

  if (!limitResult.success) {
    return Response.json({ error: 'Foram recebidos muitos pedidos. Tente novamente mais tarde.' }, { status: 429 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 20_000) {
    return Response.json({ error: 'Pedido demasiado grande.' }, { status: 413 });
  }

  let rawBody;
  let body;
  try {
    rawBody = await request.text();
    if (rawBody.length > 20_000) {
      return Response.json({ error: 'Pedido demasiado grande.' }, { status: 413 });
    }
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'Dados inválidos.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Dados inválidos.' }, { status: 400 });
  }

  if (typeof body.website === 'string' && body.website.trim()) {
    return Response.json({ ok: true }, { status: 202 });
  }

  const payload = validatePayload(body);
  if (!payload) {
    return Response.json({ error: 'Preencha os campos obrigatórios e aceite a política de privacidade.' }, { status: 422 });
  }

  try {
    const db = getAdminFirestore();
    if (!db) {
      return Response.json({ error: 'O formulário está temporariamente indisponível. Fale connosco pelo WhatsApp.' }, { status: 503 });
    }

    const record = await db.collection('orcamentos').add({
      ...payload,
      consent: true,
      source: 'website',
      notificationStatus: 'pending',
      createdAt: FieldValue.serverTimestamp(),
    });

    let notificationId;
    try {
      notificationId = await sendLeadNotification(payload, record.id);
    } catch (error) {
      await record.update({ notificationStatus: 'failed' }).catch(() => {});
      console.error('Falha no aviso de um pedido de orçamento:', record.id, error.message);
      return Response.json({ ok: true, notificationStatus: 'failed' }, { status: 201 });
    }

    try {
      await record.update({
        notificationStatus: 'sent',
        notificationId,
        notifiedAt: FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Email enviado; falhou a atualização do estado do pedido:', record.id, error.message);
    }

    return Response.json({ ok: true, notificationStatus: 'sent' }, { status: 201 });
  } catch (error) {
    console.error('Falha ao guardar pedido de orçamento:', error.message);
    return Response.json({ error: 'Não foi possível enviar o pedido agora. Tente novamente ou fale connosco pelo WhatsApp.' }, { status: 502 });
  }
}
