# Coverage audit post-remediere

| Categorie | Status | Rezultat |
| --- | --- | --- |
| Instrucțiuni AGENTS/SECURITY | Verificată — fără probleme | `AGENTS.md` citit; nu există `SECURITY.md` aplicabil în root. |
| Inventar framework/rute | Verificată — fără probleme | Next App Router, rute și proxy inventariate. |
| API routes / route handlers | Verificată — fără probleme | Doar `/api/contact`; controale prezente. |
| Server Actions | Verificată — fără probleme | Nu au fost identificate Server Actions. |
| Middleware/proxy | Verificată — fără probleme | `proxy.ts` protejează `/studio` fail-closed. |
| Formulare | Verificată — finding asociat | Formular contact verificat; doar hardening rate limit în SEC-003. |
| Sanity config/client/schema | Verificată — finding asociat | Client published/CDN; linkurile CMS au nevoie de allowlist, SEC-001. |
| Autentificare/autorizare | Parțial verificată | Studio verificat public ca 401; rolurile Sanity/Vercel nu au fost accesibile. |
| Secrete în repo | Verificată — fără probleme | Nu am găsit secrete confirmate; `.env.local` nu este tracked. |
| Secrete în Git history | Parțial verificată | Scanare pattern-based; nu a găsit valori confirmate. |
| Supply chain | Verificată — finding asociat | `npm audit --omit=dev` are 20 vulnerabilități, SEC-002. |
| XSS/HTML injection | Verificată — finding asociat | Nu există `dangerouslySetInnerHTML`; risc link scheme din CMS, SEC-001. |
| GROQ injection | Verificată — fără probleme | Query parametrizat cu `$slug`; nu am găsit concatenare GROQ din input. |
| SSRF/path traversal/command injection | Verificată — fără probleme | Nu am găsit exec, filesystem din input sau fetch server-side către URL user-controlled. |
| Email injection | Verificată — fără probleme | Email text-only, subject static, CRLF curățat din câmpuri single-line. |
| Headere browser/transport | Verificată — finding asociat | Headere bune; CSP compatibilă, dar nu strictă, SEC-005. |
| Fișiere expuse | Verificată — fără probleme | `.env`, `.git`, package/config publice testate: 404; sourcemaps: 403. |
| Documente publice | Verificată — finding asociat | PDF-uri cu markeri/metadate, SEC-004. |
| WordPress/servicii externe | Parțial verificată | Nu am testat agresiv vechiul WordPress; linkurile externe rămân trust boundary. |
| Privacy/GDPR | Parțial verificată | Date contact identificate; politica/legal retention nu au fost auditate juridic. |
| CI/CD/Vercel | Parțial verificată | Build local și deployment public verificate; setări Vercel/GitHub nu au fost accesibile. |
| Lint/type/build | Verificată — fără probleme | `npm run lint` și `npm run build` trec; build inițial a avut EPERM local, rerulare escaladată OK. |

