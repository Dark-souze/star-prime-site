/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  connect-src 'self' https://firestore.googleapis.com https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  worker-src 'self' blob:;
  ${isDev ? '' : 'upgrade-insecure-requests;'}
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'commons.wikimedia.org' },
      { protocol: 'https', hostname: 'ybeangola.com' },
      { protocol: 'https', hostname: 'ree-gera.com' },
      { protocol: 'https', hostname: 'www.angocasa.com' },
      { protocol: 'https', hostname: 'www.myimovel.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          ...(!isDev ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }] : []),
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Content-Security-Policy', value: cspHeader },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
