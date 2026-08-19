# Threat model — Arta în Dar

## Active protejate

- Disponibilitatea site-ului public.
- Datele personale introduse în formularul de contact: nume, email, telefon, mesaj.
- Credențialele SMTP și eventualele variabile Vercel.
- Accesul la Sanity Studio și la conținutul CMS.
- Integritatea documentelor publice și a conținutului editorial.
- Reputația domeniului și a asociației.

## Atacatori posibili

- Vizitator anonim.
- Bot de spam/contact bombing.
- Editor Sanity compromis sau rău intenționat.
- Atacator supply-chain prin pachete npm.
- Actor care compromite vechiul WordPress sau resurse externe legate.
- Persoană cu acces la Vercel/GitHub/Sanity.

## Puncte de intrare

- Browser public pe rutele statice și dinamice.
- `/api/contact`.
- `/studio`.
- Conținut Sanity publicat: text, imagini, linkuri, Portable Text.
- Documente PDF/ODT descărcabile.
- Linkuri externe: Sanity CDN, Google Maps, social media.

## Granițe de încredere

- Browser vizitator ↔ aplicație Vercel.
- Aplicație Vercel ↔ SMTP provider.
- Aplicație Vercel ↔ Sanity API/CDN.
- Editor Sanity ↔ conținut public randat pe site.
- Repository/build pipeline ↔ npm registry.
- Site nou ↔ vechiul WordPress pentru documente istorice, dacă rămân linkuri externe.

## Date personale

- Colectate prin formular: nume, email, telefon opțional, motiv, mesaj.
- Procesate de runtime Vercel și SMTP provider.
- Nu am confirmat stocare persistentă în aplicație.
- Logurile pot conține erori SMTP și `messageId`; nu am văzut logare explicită a mesajului utilizatorului.

## Operații sensibile

- Trimitere email din `/api/contact`.
- Publicare/editare conținut Sanity.
- Acces la `/studio`.
- Build/deploy pe Vercel.
- Management variabile de mediu.

## Efecte posibile ale compromiterii

- Spam/email bombing prin contact form.
- Publicare conținut malițios sau linkuri malițioase din CMS.
- Expunere date personale din email/loguri.
- Defacement editorial.
- Supply-chain compromise în build sau în runtime.
- Pierdere reputațională prin documente/linkuri externe compromise.

