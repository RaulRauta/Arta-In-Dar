# Audit securitate post-remediere — Arta în Dar

## 1. Executive summary

Auditul post-remediere a verificat repository-ul local și deploymentul public `https://arta-in-dar.vercel.app/` prin teste neintruzive. Nu am găsit vulnerabilități critice sau high confirmate exploatabile direct de vizitatori anonimi în aplicația publică.

Controalele remediate anterior sunt prezente: `/api/contact` are validare server-side, limită de corp, verificare Origin/Referer, honeypot, răspunsuri `no-store` și email text-only; `/studio` este protejat fail-closed prin Basic Auth; headerele de securitate sunt active pe producție; fișierele sensibile uzuale nu sunt expuse public.

Riscurile majore identificate anterior pentru CMS content safety și supply-chain au fost remediate. Linkurile venite din Sanity sunt filtrate prin allowlist de scheme-uri sigure, iar `npm audit` și `npm audit --omit=dev` raportează 0 vulnerabilități.

## 2. Data și ora auditului

- Data: 2026-08-18
- Ora aproximativă: 21:09–21:20 Europe/Bucharest

## 3. Branch și commit

- Branch: `main`
- Commit auditat: `91e0084bca0a8c5fd5b298bc42bf1b7c22a2db14`
- Remote: `https://github.com/RaulRauta/Arta-In-Dar`

## 4. Framework și versiuni

- Next.js: `16.3.2`
- React / React DOM: `19.2.8`
- TypeScript: `5.9.3`
- Tailwind CSS: `4.3.3`
- Framer Motion: `12.42.2`
- Sanity: `6.10.1`
- next-sanity: `13.3.3`
- Nodemailer: `9.0.5`

## 5. Suprafața analizată

- App Router pages: `/`, `/contact`, `/despre-noi`, `/distinctii`, `/documente`, `/doneaza-fii-voluntar`, `/noutati`, `/noutati/[slug]`, `/pelerinaj-7-capele`, `/studio/[[...tool]]`.
- Route handlers: `/api/contact`.
- Proxy/middleware: `proxy.ts`, matcher `/studio` și `/studio/:path*`.
- Sanity config, schema și client public read-only.
- Formulare: formularul de contact.
- Fișiere publice: documente PDF/ODT, imagini, `robots.txt`, `sitemap.xml`, `security.txt`.
- Deployment public Vercel: headere, TLS redirect, rute sensibile, sourcemaps, fișiere comune expuse.
- Supply-chain: `package.json`, `package-lock.json`, `npm audit`, `npm ls`.
- Secrete: fișiere curente și căutare pattern-based în Git history, fără expunerea valorilor.

## 6. Ce nu a putut fi verificat complet

- Codex Security plugin nu a fost disponibil ca tool apelabil în sesiune.
- Setările Vercel interne, branch protection, environment variables din Vercel și log retention nu au putut fi citite fără connector Vercel/GitHub instalat.
- Rolurile Sanity, CORS origins din proiectul Sanity și permisiunile editorilor nu au putut fi verificate din consola Sanity.
- Nu am testat trimiterea reală de email; testele pe `/api/contact` au folosit payloaduri invalide sau honeypot.
- Documentele PDF au fost analizate static prin markeri binari, nu printr-o suită completă de analiză forensică PDF.

## 7. Număr vulnerabilități pe severitate

| Severitate | Număr |
| --- | ---: |
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 2 |
| Informational | 1 |

## 8. Lista completă a constatărilor

- [SEC-001](findings/SEC-001.md) — Linkuri CMS fără allowlist de scheme-uri sigure — remediat.
- [SEC-002](findings/SEC-002.md) — Vulnerabilități tranzitive în dependency tree Sanity/toolchain — remediat.
- [SEC-003](findings/SEC-003.md) — Rate limiting în memorie pe runtime serverless.
- [SEC-004](findings/SEC-004.md) — Documente PDF publice cu markeri activi/metadate.
- [SEC-005](findings/SEC-005.md) — CSP compatibilă, dar nu strictă.

## 9. Riscul general

Risc general: **Low–Medium**.

Nu există un blocker critic/high confirmat pentru menținerea site-ului live. Problemele rămase sunt în principal hardening: rate limiting distribuit, igienizarea documentelor publice și întărirea CSP.

## 10. Ordinea recomandată a remedierilor

1. SEC-003 — mută rate limiting pe storage distribuit sau edge/WAF.
2. SEC-004 — regenerează/igienizează PDF-urile publice.
3. SEC-005 — întărește CSP cu nonce/hash unde permite Next/Sanity.

## 11. Controale implementate corect

- HTTPS și redirect HTTP→HTTPS active.
- HSTS: `max-age=63072000; includeSubDomains; preload`.
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY` pe site; `SAMEORIGIN` pe Studio.
- `frame-ancestors` setat în CSP.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` restrictiv.
- `Cross-Origin-Opener-Policy` și `Cross-Origin-Resource-Policy`.
- `/studio` returnează `401` fără Basic Auth și `X-Robots-Tag: noindex`.
- `/api/contact` respinge JSON (`415`), payload invalid (`400`) și cross-origin (`403`).
- Honeypot-ul răspunde `200` fără trimitere de email.
- `.env`, `.env.local`, `.git/HEAD`, `package.json`, lockfile și config-uri comune returnează `404` public.
- Sourcemap-urile JS testate returnează `403`.
- `robots.txt`, `sitemap.xml` și `/.well-known/security.txt` există.

## 12. Concluzie privind siguranța lansării

Site-ul este într-o stare semnificativ mai sigură decât înainte de remedieri. Pentru folosire publică pe Vercel, nu am confirmat vulnerabilități critice/high exploatabile anonim, iar dependency audit-ul este curat. Pentru înlocuirea completă a WordPress-ului, rămân recomandate hardening-ul rate limiting, igienizarea PDF-urilor și CSP mai strictă.
