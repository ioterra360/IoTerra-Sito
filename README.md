# IoTerra — Sito web

Sito ufficiale di IoTerra, studio agronomico in Sardegna. Single-page application
React caricata da CDN, completamente statica, pubblicabile su GitHub Pages o su
qualsiasi hosting che serva file statici.

Live: https://www.ioterra.it/

## Struttura

```
.
├── index.html              entrypoint, monta l'App e configura il tema
├── assets/
│   ├── img/                foto e illustrazioni utilizzate dalle pagine
│   ├── logo-ioterra.svg
│   └── logo-ioterra-light.svg
├── v3/
│   ├── styles.jsx          design system, animazioni, helper Reveal/Counter
│   ├── icons.jsx           set icone SVG line, brand-coerenti
│   ├── shell.jsx           Nav (desktop + mobile menu), Footer, useRoute
│   ├── home-anim.jsx       animazioni della home (scan-line, hud, count-up)
│   └── pages/              le 11 pagine (Home, Servizi, ChiSiamo, Contatti,
│                           AnalisiSuolo, Consulenza, Marketing, Precisione,
│                           Ricerca, Legal[Privacy/Termini])
├── CNAME                   www.ioterra.it (per GitHub Pages)
├── .nojekyll               disattiva Jekyll su GitHub Pages
├── robots.txt
└── sitemap.xml
```

## Routing

Hash routing client-side: ogni pagina è raggiungibile via `#/percorso`
(es. `#/analisi-suolo`). Nessuna configurazione lato server richiesta.

## Pubblicare su GitHub Pages

1. Crea un repo (es. `ioterra-sito`) e fai push del contenuto di questa cartella
   (escludendo `ioterra/` e `File/` — vedi `.gitignore`).

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<utente>/ioterra-sito.git
   git push -u origin main
   ```

2. Su GitHub: **Settings → Pages → Source: "Deploy from a branch"**, branch `main`,
   folder `/`. Salva. La prima build richiede 1–2 minuti.

3. **DNS sul dominio www.ioterra.it** (presso il registrar attuale del dominio):

   - Per `www`: record **CNAME** verso `<utente>.github.io`
   - Per la root `ioterra.it`: 4 record **A** verso gli IP di GitHub Pages
     (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)

4. Su GitHub Settings → Pages, verifica il dominio custom e attiva
   "**Enforce HTTPS**" appena disponibile.

Il file `CNAME` in repo dichiara già il dominio.

## Pubblicare su altro hosting (Aruba, IONOS, ecc.)

Carica via FTP/cPanel l'intero contenuto della cartella nella root pubblica
(`public_html`, `htdocs`, ecc.). Nient'altro richiesto.

## Sviluppo locale

Apri `index.html` con un server statico qualsiasi (i file remoti — fonts, React,
Babel — richiedono `http://`, non `file://`):

```bash
# Python (preinstallato su Mac/Linux)
python3 -m http.server 8000

# Node (npx senza install)
npx serve

# VS Code: estensione "Live Server"
```

Poi apri http://localhost:8000.

## Aggiornare i contenuti

Le pagine sono in `v3/pages/*.jsx`. Sono file React in JSX, leggibili come HTML
per modifiche di testo (titoli, descrizioni, prezzi, contatti). Per modifiche
strutturali consultare prima `v3/styles.jsx` per le classi disponibili.

Asset (immagini, logo) sono in `assets/`. Per sostituirne uno, usa lo stesso
nome del file esistente.

## Stack

- React 18 production via CDN (unpkg)
- Babel-standalone per JSX in-browser
- Google Fonts (Fraunces + Inter + JetBrains Mono)
- Nessun build step

Trade-off: Babel runtime aggiunge ~700KB e ~0.5–1s al primo caricamento.
Accettabile per un sito vetrina; per ottimizzare in futuro si può precompilare
JSX → JS con `esbuild`/`vite` (vedere note nel design system).

## Brand

- Verde scuro `#082e25` (sfondo)
- Verde primario `#0b614e`
- Lime accent `#d6ff43`
- Beige `#fbfbf8` (light card)
- Tipografia: Fraunces (display), Inter (UI), JetBrains Mono (numeri)

## Contatti

- 📞 +39 366 539 3733
- ✉️ ioterraservizi@ioterra.it
- 🆔 P.IVA 03034130900
- 📷 [@ioterra_360](https://www.instagram.com/ioterra_360/)
