# Plan de remediere post-audit

## Imediat, înainte de următorul deploy

1. SEC-001 — validare URL pentru linkuri din Sanity.
   - Dificultate: mică-medie.
   - Risc regresie: mic.
   - Acțiuni: helper `safeHref`, allowlist `http:`, `https:`, `mailto:`, `tel:` și path-uri interne care încep cu `/`; fallback la `#` sau ascundere link.

## În 24–48 de ore

2. SEC-002 — dependency remediation plan pentru Sanity.
   - Dificultate: medie-mare.
   - Risc regresie: mediu-mare, deoarece `npm audit` sugerează schimbări majore.
   - Acțiuni: test upgrade pe branch separat, verificare Studio, build, query-uri și compatibilitate Next 16.

3. SEC-004 — igienizare documente publice.
   - Dificultate: mică-medie.
   - Risc regresie: mic.
   - Acțiuni: re-export PDF fără acțiuni automate/atașamente/metadate personale; păstrează PDF/A dacă e posibil.

## În următoarea săptămână

4. SEC-003 — rate limiting distribuit pentru `/api/contact`.
   - Dificultate: medie.
   - Risc regresie: mediu.
   - Acțiuni: Vercel Firewall/edge rules, Upstash Redis sau Turnstile cu verificare server-side.

## Hardening ulterior

5. SEC-005 — CSP strictă.
   - Dificultate: medie-mare.
   - Risc regresie: mediu-mare.
   - Acțiuni: nonce/hash pentru scripturi inline unde se poate; politică separată pentru Studio; test complet pe toate paginile.

6. Audit connector-based Vercel/GitHub/Sanity.
   - Dificultate: medie.
   - Risc regresie: nul.
   - Acțiuni: verifică env vars, preview deployments, branch protection, log retention, Sanity roles/CORS.

