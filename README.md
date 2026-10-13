<div align="center">
  <img src="./public/StarPrime-LOGO.png" alt="Star Prime Engenharia e Construção" width="220" />
  
  # Star Prime — Engenharia e Construção

  **Gestão de projetos, consultoria, construção e fiscalização de obras em Angola.**
</div>

---

## 🏢 Sobre a Empresa

A **Star Prime, Engenharia e Construção, Lda.** é uma empresa sediada em Talatona, Luanda, dedicada a responder às exigências do setor da construção civil com uma abordagem abrangente e altamente técnica. 

A nossa política de qualidade assenta em quatro compromissos fundamentais: **Qualidade, Custos, Prazos e Segurança**. A satisfação do cliente orienta o trabalho da nossa equipa, assente na experiência profissional consolidada ao longo de vários projetos de engenharia.

### Os Nossos Serviços
- **🏗️ Engenharia e Construção:** Execução de obras (edificações, reabilitações) com rigor, segurança e excelência.
- **📊 Gestão de Projetos:** Planeamento e acompanhamento detalhado desde a conceção até à entrega.
- **🔎 Fiscalização de Obras:** Supervisão técnica rigorosa para garantir o cumprimento estrito das normas e do projeto.
- **💡 Consultoria:** Assessoria especializada para a otimização de recursos e identificação das melhores soluções técnicas.

---

## 💻 Portal Institucional (Guia para Desenvolvedores)

Este repositório contém o código-fonte oficial do site da Star Prime, desenvolvido com as mais modernas tecnologias web para garantir performance, acessibilidade e um design premium. 

**Stack Tecnológica:** Next.js (React), Tailwind CSS, Firebase (Firestore), Resend e Upstash (Redis).

### 🚀 Desenvolvimento Local

**Requisitos:** Node.js 20.9 ou superior.

```powershell
npm ci
Copy-Item .env.example .env.local
# Adicione as variáveis de ambiente necessárias no .env.local
npm run dev
```

> **Verificação de Código (CI):** O comando `npm run lint` faz uma verificação da sintaxe. O workflow configurado em `.github/workflows/ci.yml` executa esta verificação e o `npm run build` automaticamente em cada *push* e *pull request*.

### ⚙️ Integrações e Variáveis de Ambiente

O formulário de contacto do site tem um fluxo completo de recolha e notificação de orçamentos (Leads). Este fluxo regista os pedidos no **Firestore** e envia notificações por email via **Resend**, sendo protegido contra spam por *rate limiters* no **Upstash (Redis)**.

Preencha o `.env.local` em desenvolvimento e adicione como *Secrets* no servidor:

| Variável | Propósito |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica (ex: `https://www.starprime.ao`). |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Chave JSON do Service Account do Firebase. Usada de forma segura na API. |
| `UPSTASH_REDIS_REST_URL` / `TOKEN` | Credenciais REST para o Redis (limitação de envios de formulário). |
| `RESEND_API_KEY` | Chave privada da Resend. |
| `LEADS_NOTIFY_TO` | Endereço que recebe as notificações de novos pedidos. Por defeito: `info@starprime.ao`. |
| `LEADS_EMAIL_FROM` | Remetente aprovado no Resend. Configuração da Star Prime: `Star Prime <info@starprime.ao>`; requer o domínio `starprime.ao` verificado na Resend. |

**Nota sobre a Base de Dados:** O ficheiro `firestore.rules` bloqueia a escrita por parte dos clientes. O acesso e registo das leads é feito unicamente pela API Backend (Admin SDK).

### 🌍 Deploy e SEO (Produção)

A plataforma sugerida para alojamento contínuo é a **Vercel**, que deteta automaticamente os parâmetros ideais do Next.js.
- Escolha a branch `main` como produção.
- Diferencie as variáveis do **Production** e **Preview** no painel (para as previews não usarem a base de dados real ou serem indexadas pelos motores de busca: `noindex`).
- **SEO Pós-Deploy:** 
  - Registe o domínio no *Google Search Console*.
  - Acompanhe o `sitemap.xml` e a resposta do `robots.txt` incluídos.

### ✅ Checklist de Aprovação Final
Antes de publicações definitivas de novas funcionalidades ou alterações:
- [ ] **Email:** Testar o envio de propostas para `info@starprime.ao`.
- [ ] **Proteção de Dados:** Garantir que a Política de Privacidade está alinhada legalmente, considerando o envio de dados para as plataformas Firebase e Resend.
- [ ] **Direitos de Imagem:** Validar todas as fotografias e menções a projetos passados do Portfólio.
- [ ] **Revisão Textual:** Confirmar pequenos acertos de copy com a equipa da Star Prime.
