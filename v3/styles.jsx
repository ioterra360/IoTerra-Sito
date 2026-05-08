// v3/styles.jsx — Stylesheet condiviso, verde scuro dominante + animazioni
const V3GlobalStyle = () => (
  <style>{`
    :root { color-scheme: dark; }
    /* NB: niente overflow:hidden su html/body — rompe ScrollTrigger pin.
       Usiamo overflow-x: clip che evita scroll laterale senza creare un nuovo
       scroll container. */
    html, body, #root { height: 100%; margin: 0; padding: 0;
      overflow-x: clip; }
    body {
      font-family: var(--font-ui);
      color: var(--c-onDark);
      background: var(--c-dark);
      -webkit-font-smoothing: antialiased;
    }
    * { box-sizing: border-box; }
    a { color: inherit; }

    .v3-app { min-height: 100vh; display: flex; flex-direction: column; background: var(--c-dark); }
    .v3-app > main { flex: 1; }

    /* GRAIN + NOISE overlay */
    .v3-grain::before {
      content: ''; position: fixed; inset: 0;
      pointer-events: none; z-index: 100;
      opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
    }

    /* === ANIMATIONS === */
    @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } }
    @keyframes drawLine { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes growBar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
    @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes orbit { from { transform: rotate(0deg) translateX(60px) rotate(0deg); } to { transform: rotate(360deg) translateX(60px) rotate(-360deg); } }

    .v3-fadeUp { animation: fadeUp 1s cubic-bezier(.2,.8,.2,1) both; }
    .v3-fadeIn { animation: fadeIn 1.2s ease both; }
    .v3-float { animation: float 6s ease-in-out infinite; }
    .v3-spin-slow { animation: spin 24s linear infinite; }

    .reveal { opacity: 0; transform: translateY(40px); transition: opacity .9s cubic-bezier(.2,.8,.2,1), transform .9s cubic-bezier(.2,.8,.2,1); }
    .reveal.in { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }

    /* NAV */
    .v3-nav {
      position: sticky; top: 12px; z-index: 50;
      margin: 12px 24px 0;
      display: grid; grid-template-columns: auto 1fr auto;
      align-items: center; gap: 24px;
      padding: 10px 14px 10px 22px;
      background: rgba(var(--c-dark-rgb),0.7);
      backdrop-filter: blur(20px) saturate(140%);
      -webkit-backdrop-filter: blur(20px) saturate(140%);
      border: 1px solid rgba(var(--c-accent-rgb),0.15);
      border-radius: 999px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
      animation: fadeUp .8s cubic-bezier(.2,.8,.2,1) both;
    }
    .v3-nav-logo {
      display: flex; align-items: center; gap: 12px;
      font-family: var(--font-display); font-weight: 400;
      font-size: 30px; letter-spacing: -0.02em;
      color: var(--c-onDark); text-decoration: none;
    }
    .v3-nav-logo .logodot { width: 10px; height: 10px; background: var(--c-accent); border-radius: 50%; animation: pulse 2.4s ease-in-out infinite; }
    .v3-nav-logo .v3-nav-logo-img { height: 44px; width: auto; }
    .v3-nav-mid { display: flex; gap: 6px; justify-content: center; }
    .v3-nav-mid a {
      color: var(--c-onDark); text-decoration: none;
      font-size: 17.5px; font-weight: 500; letter-spacing: 0.01em;
      padding: 10px 20px; border-radius: 999px; transition: all 0.3s;
      position: relative;
    }
    .v3-nav-mid a:hover { color: var(--c-accent); }
    .v3-nav-mid a.active { background: rgba(var(--c-accent-rgb),0.14); color: var(--c-accent); }
    .v3-nav-right { display: flex; gap: 8px; align-items: center; }

    .v3-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 20px; font-size: 13.5px; font-weight: 600;
      border-radius: 999px; border: 1px solid transparent;
      cursor: pointer; transition: all 0.3s cubic-bezier(.2,.8,.2,1);
      text-decoration: none; font-family: inherit; white-space: nowrap;
      letter-spacing: 0.01em;
    }
    .v3-btn-ghost { background: transparent; color: var(--c-onDark); border-color: rgba(255,255,255,0.18); }
    .v3-btn-ghost:hover { background: rgba(255,255,255,0.06); border-color: rgba(var(--c-accent-rgb),0.4); }
    .v3-btn-primary { background: var(--c-accent); color: var(--c-dark); }
    .v3-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -8px rgba(var(--c-accent-rgb),0.4); }
    .v3-btn-accent { background: var(--c-accent); color: var(--c-dark); }
    .v3-btn-accent:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -8px rgba(var(--c-accent-rgb),0.4); }
    .v3-btn-light { background: var(--c-bg); color: var(--c-dark); }
    .v3-btn-light:hover { transform: translateY(-2px); }

    .v3-tag {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 6px 14px;
      background: rgba(var(--c-accent-rgb),0.1);
      border: 1px solid rgba(var(--c-accent-rgb),0.25);
      font-size: 11px; color: var(--c-accent); font-weight: 600;
      border-radius: 999px;
      letter-spacing: 0.1em; text-transform: uppercase;
    }
    .v3-tag::before { content: ''; width: 6px; height: 6px; background: var(--c-accent); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
    .v3-tag-light {
      background: rgba(11,97,78,0.08);
      border-color: rgba(11,97,78,0.15);
      color: var(--c-primary);
    }

    h1, h2, h3 { font-family: var(--font-display); font-weight: 300; letter-spacing: -0.04em; line-height: 0.94; margin: 0; color: var(--c-onDark); }
    /* Em titoli: accent brand pieno, NESSUN text-shadow / sfumatura.
       Tutte le parole del sito sono nitide, senza glow. */
    h1 em, h2 em, h3 em {
      font-style: italic; color: var(--c-accent); font-weight: 400;
    }
    p { color: var(--c-onDark-muted); font-size: 16.5px; line-height: 1.65; }

    .v3-h1 { font-size: clamp(56px, 10vw, 144px); }
    .v3-h2 { font-size: clamp(46px, 7.2vw, 96px); }
    .v3-h3 { font-size: clamp(32px, 4vw, 50px); }

    /* Hero CTA layout */
    .v3-hero-cta {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: 32px;
      align-items: flex-end;
      margin-top: 56px;
      padding-top: 32px;
      border-top: 1px solid rgba(var(--c-accent-rgb),0.15);
    }
    .v3-hero-cta p {
      font-size: 17px; line-height: 1.6;
      max-width: 480px;
      color: rgba(243,245,237,0.78);
      margin: 0;
    }
    .v3-hero-cta-btns { display: contents; }

    @media (max-width: 900px) {
      .v3-nav { margin: 8px 8px 0; padding: 6px 8px 6px 14px; gap: 8px; grid-template-columns: 1fr auto; }
      .v3-nav-logo { font-size: 18px; }
      .v3-nav-mid { display: none; }
      .v3-nav-right { justify-content: flex-end; margin-left: auto; }
      .v3-nav-right > .v3-btn-ghost { display: none; }
      .v3-nav-right > .v3-btn-primary,
      .v3-nav-right > .v3-btn-light { display: none; }

      .v3-hero-cta { grid-template-columns: 1fr; gap: 20px; margin-top: 32px; padding-top: 24px; }
      .v3-hero-cta p { font-size: 15px; }
      .v3-hero-cta-btns { display: flex; flex-wrap: wrap; gap: 10px; }
      .v3-hero-cta-btns .v3-btn { flex: 1 1 auto; justify-content: center; min-width: 140px; }

      .v3-nav-burger { display: inline-flex; }
      .v3-nav-right > .v3-btn-primary,
      .v3-nav-right > .v3-btn-light { display: none; }
    }

    /* SECTIONS */
    .v3-section { padding: 120px 32px; position: relative; }
    .v3-section-narrow { max-width: 1280px; margin: 0 auto; }

    /* CARD on dark */
    .v3-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--radius);
      padding: 32px;
      transition: all 0.4s cubic-bezier(.2,.8,.2,1);
      backdrop-filter: blur(8px);
    }
    .v3-card:hover { border-color: rgba(var(--c-accent-rgb),0.25); background: rgba(255,255,255,0.04); transform: translateY(-4px); }
    .v3-card.light { background: var(--c-bg); border-color: var(--c-line); color: var(--c-fg); }
    .v3-card.light:hover { border-color: var(--c-primary); }
    .v3-card.light h3, .v3-card.light h2 { color: var(--c-fg); }
    .v3-card.light h3 em, .v3-card.light h2 em { color: var(--c-primary); }
    .v3-card.light p { color: var(--c-muted); }

    /* IMAGE TILE */
    .v3-img {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius);
      background: rgba(0,0,0,0.4);
    }
    .v3-img img {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
      transition: transform 1.6s cubic-bezier(.2,.8,.2,1), filter 0.6s;
    }
    .v3-img:hover img { transform: scale(1.06); }
    .v3-img::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(180deg, transparent 30%, rgba(var(--c-dark-rgb),0.7) 100%);
      pointer-events: none;
    }
    .v3-img-cap { position: absolute; left: 24px; bottom: 20px; right: 24px; z-index: 2; color: var(--c-accent); font-family: var(--font-ui); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; }

    /* HERO */
    .v3-hero {
      position: relative;
      margin: 16px 24px 0;
      border-radius: 32px;
      overflow: hidden;
      background: linear-gradient(140deg, #082e25 0%, #0b614e 60%, #082e25 100%);
      min-height: calc(100vh - 100px);
      display: flex; flex-direction: column;
      isolation: isolate;
    }
    .v3-hero-bg { position: absolute; inset: 0; z-index: 0; }
    .v3-hero-bg img, .v3-hero-bg video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.42; }
    .v3-hero-bg img { transform: scale(1.05); animation: heroZoom 24s ease-in-out infinite alternate; }
    .v3-hero-bg video { z-index: 1; }
    .v3-hero-bg .v3-hero-bg-img { z-index: 0; } /* poster fallback dietro al video */
    @keyframes heroZoom { from { transform: scale(1.05); } to { transform: scale(1.18); } }
    .v3-hero-bg::after {
      content: ''; position: absolute; inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 80% 10%, rgba(var(--c-accent-rgb),0.18) 0%, transparent 50%),
        radial-gradient(ellipse 60% 50% at 0% 100%, rgba(65,167,82,0.25) 0%, transparent 50%),
        linear-gradient(180deg, rgba(var(--c-dark-rgb),0.55) 0%, rgba(var(--c-dark-rgb),0.85) 100%);
    }
    .v3-hero-content { position: relative; z-index: 1; padding: 80px 56px 48px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .v3-hero h1 { color: var(--c-onDark); }
    .v3-hero h1 em { color: var(--c-accent); }

    .v3-hero-marquee {
      position: relative; z-index: 1;
      border-top: 1px solid rgba(var(--c-accent-rgb),0.15);
      overflow: hidden;
      background: rgba(var(--c-dark-rgb),0.4);
    }
    .v3-hero-marquee-inner {
      display: flex; gap: 48px; padding: 18px 56px;
      align-items: center;
      font-family: var(--font-ui);
      font-size: 12px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--c-accent);
      font-weight: 600;
      flex-wrap: wrap;
    }
    .v3-hero-marquee-track {
      display: flex; gap: 64px; white-space: nowrap;
      animation: ticker 40s linear infinite;
      width: max-content;
    }
    .v3-hero-marquee span {
      font-family: var(--font-display);
      font-size: 32px; font-style: italic; font-weight: 300;
      color: var(--c-accent);
      display: inline-flex; align-items: center; gap: 64px;
    }
    .v3-hero-marquee-inner span {
      font-family: var(--font-ui);
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      gap: 0;
    }
    .v3-hero-marquee-inner span::after { content: none; }
    .v3-hero-marquee-track span::after { content: '✦'; color: rgba(var(--c-accent-rgb),0.4); font-style: normal; }

    @media (max-width: 900px) {
      .v3-section { padding: 64px 16px; }
      .v3-hero { margin: 8px 8px 0; min-height: auto; border-radius: 20px; }      .v3-hero-content { padding: 56px 20px 32px; }
      .v3-h1 { font-size: clamp(44px, 13vw, 72px) !important; }
      .v3-hero-marquee { padding: 14px 0; }
      .v3-hero-marquee span { font-size: 22px; gap: 40px; }
      .v3-hero-marquee-track { gap: 40px; }
    }

    /* FEATURE BLOCK */
    .v3-block {
      margin: 0 24px;
      background: linear-gradient(140deg, var(--c-dark) 0%, #0b614e 100%);
      color: var(--c-onDark);
      border-radius: 28px;
      padding: 80px 56px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(var(--c-accent-rgb),0.08);
    }
    .v3-block::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 60% 50% at 100% 0%, rgba(var(--c-accent-rgb),0.12) 0%, transparent 50%);
      pointer-events: none;
    }

    /* FOOTER */
    .v3-footer {
      margin: 24px;
      background: #051a14;
      color: var(--c-onDark);
      border-radius: 28px;
      padding: 64px 56px 32px;
      border: 1px solid rgba(var(--c-accent-rgb),0.08);
      position: relative;
      overflow: hidden;
    }
    .v3-footer::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 50% at 50% 100%, rgba(var(--c-accent-rgb),0.08) 0%, transparent 50%);
      pointer-events: none;
    }
    .v3-footer-top {
      display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr;
      gap: 48px;
      padding-bottom: 48px;
      border-bottom: 1px solid rgba(var(--c-accent-rgb),0.1);
      position: relative;
    }
    .v3-footer-top h4 {
      font-family: var(--font-display); font-weight: 400;
      font-size: 24px; letter-spacing: -0.02em;
      color: var(--c-onDark);
      margin: 0 0 18px;
    }
    .v3-footer-top ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
    .v3-footer-top a { color: var(--c-onDark-muted); text-decoration: none; font-size: 14.5px; transition: color .2s; }
    .v3-footer-top a:hover { color: var(--c-accent); }
    .v3-footer-brand { display: flex; flex-direction: column; gap: 16px; }
    .v3-footer-brand .lg { display: flex; align-items: center; gap: 12px; font-family: var(--font-display); font-weight: 400; font-size: 28px; color: var(--c-accent); letter-spacing: -0.02em; }
    .v3-footer-brand p { font-size: 14px; color: var(--c-onDark-muted); line-height: 1.7; margin: 0; max-width: 320px; }
    .v3-footer-bot {
      display: flex; justify-content: space-between;
      padding-top: 24px;
      font-size: 12px; color: var(--c-onDark-muted);
      letter-spacing: 0.04em;
      position: relative;
    }
    .v3-footer-bot a { text-decoration: none; }
    .v3-footer-bot a:hover { color: var(--c-accent); }
    .v3-footer-mega {
      font-family: var(--font-display); font-style: italic; font-weight: 300;
      font-size: clamp(80px, 16vw, 220px);
      letter-spacing: -0.06em; line-height: 0.9;
      color: rgba(var(--c-accent-rgb),0.08);
      margin: 48px 0 0;
      white-space: nowrap; overflow: hidden;
      text-align: center;
    }
    @media (max-width: 900px) {
      .v3-block { margin: 0 12px; padding: 48px 24px; border-radius: 20px; }
      /* FOOTER MOBILE - single column editoriale con divider tra sezioni */
      .v3-footer { margin: 8px; padding: 36px 22px 20px; border-radius: 20px; }
      .v3-footer-top {
        grid-template-columns: 1fr;
        gap: 0;
        padding-bottom: 22px;
      }
      .v3-footer-top > div + div {
        padding-top: 22px;
        margin-top: 22px;
        border-top: 1px solid rgba(var(--c-accent-rgb), 0.12);
      }
      .v3-footer-brand { gap: 12px; }
      .v3-footer-brand .lg { font-size: 28px; }
      .v3-footer-brand .lg img { height: 36px !important; }
      .v3-footer-brand p { font-size: 13px; line-height: 1.55; }
      .v3-footer-top h4 {
        font-family: var(--font-display);
        font-size: 24px;
        font-weight: 400;
        letter-spacing: -0.02em;
        color: var(--c-onDark);
        margin: 0 0 14px;
      }
      .v3-footer-top ul { gap: 10px; }
      .v3-footer-top a { font-size: 14.5px; }
      /* Social inline orizzontale (ultimo div) */
      .v3-footer-top > div:last-child ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
      }
      .v3-footer-top > div:last-child ul li a {
        display: inline-flex !important;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border: 1px solid rgba(var(--c-accent-rgb), 0.18);
        border-radius: 999px;
        font-size: 13px;
        color: var(--c-onDark);
      }
      .v3-footer-bot {
        flex-direction: column;
        gap: 6px;
        align-items: flex-start;
        font-size: 11.5px;
        letter-spacing: 0.06em;
        padding-top: 22px;
      }
    }

    /* CTA STRIP */
    .v3-call-strip {
      margin: 0 24px 24px;
      background: var(--c-accent);
      color: var(--c-dark);
      border-radius: 28px;
      padding: 64px 56px;
      display: grid; grid-template-columns: 2fr 1fr;
      gap: 48px; align-items: center;
      position: relative; overflow: hidden;
    }
    .v3-call-strip::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(var(--c-dark-rgb),0.08) 0%, transparent 60%);
      pointer-events: none;
    }
    .v3-call-strip h2 { font-size: clamp(36px, 5vw, 64px); line-height: 0.96; margin: 0; color: var(--c-dark); }
    .v3-call-strip h2 em { font-style: italic; color: var(--c-onDark); }
    .v3-call-strip p { font-size: 16px; line-height: 1.6; margin: 16px 0 0; max-width: 540px; opacity: 0.85; color: var(--c-dark); }
    .v3-call-strip .right { display: flex; flex-direction: column; gap: 12px; align-items: flex-end; position: relative; z-index: 1; }
    .v3-call-strip .phone {
      font-family: var(--font-display); font-weight: 300;
      font-size: 36px; letter-spacing: -0.02em;
      white-space: nowrap;
      color: inherit; text-decoration: none;
      transition: opacity .18s ease;
    }
    .v3-call-strip a.phone:hover { opacity: 0.7; }
    @media (max-width: 900px) {
      .v3-call-strip { grid-template-columns: 1fr; padding: 32px 24px; margin: 0 12px 12px; border-radius: 20px; }
      .v3-call-strip .right { align-items: flex-start; }
    }

    /* PACKAGES grid */
    .v3-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    @media (max-width: 900px) { .v3-pkg-grid { grid-template-columns: 1fr; } }

    /* MARKETING service rows */
    .v3-svc-row { transition: border-color .4s, transform .4s; }
    .v3-svc-row:hover { border-color: rgba(var(--c-accent-rgb),0.3); transform: translateY(-2px); }
    .v3-svc-row:hover img { transform: scale(1.06); }

    /* MARKETING stack cards */
    .v3-stack-card:hover { transform: translateY(-4px); border-color: rgba(var(--c-accent-rgb),0.4) !important; }
    .v3-stack-card:hover .v3-stack-bar { width: 100% !important; }

    @media (max-width: 900px) {
      .v3-svc-row { grid-template-columns: 1fr !important; gap: 16px !important; }
      .v3-svc-row > div:first-child { height: 180px !important; }
    }

    .v3-pkg {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--radius);
      padding: 36px;
      display: flex; flex-direction: column;
      position: relative;
      min-height: 380px;
      transition: all 0.4s cubic-bezier(.2,.8,.2,1);
    }
    .v3-pkg:hover { transform: translateY(-6px); border-color: rgba(var(--c-accent-rgb),0.25); }
    .v3-pkg.featured {
      background: linear-gradient(160deg, rgba(var(--c-accent-rgb),0.12) 0%, rgba(var(--c-accent-rgb),0.04) 100%);
      border-color: var(--c-accent);
      box-shadow: 0 24px 60px -16px rgba(var(--c-accent-rgb),0.25);
    }
    .v3-pkg-flag {
      position: absolute; top: 24px; right: 24px;
      background: var(--c-accent); color: var(--c-dark);
      padding: 4px 12px; font-size: 10px; font-weight: 700;
      border-radius: 999px;
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .v3-pkg-tier {
      font-size: 11px; color: var(--c-accent); font-weight: 600;
      letter-spacing: 0.1em; margin-bottom: 12px; text-transform: uppercase;
    }
    .v3-pkg h3 { font-size: 36px; margin: 0 0 24px; color: var(--c-onDark); }
    .v3-pkg ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; flex: 1; }
    .v3-pkg li {
      font-size: 13.5px; padding-left: 22px; position: relative;
      line-height: 1.5; color: var(--c-onDark-muted);
    }
    .v3-pkg li::before { content: '✓'; position: absolute; left: 0; top: 0; color: var(--c-accent); font-weight: 700; }
    .v3-pkg .v3-btn { margin-top: 32px; justify-content: center; }
    .v3-pkg-desc { font-size: 14px; color: var(--c-onDark-muted); line-height: 1.6; flex: 1; margin: 0; }

    /* TICKER bar (nav strip below hero) */
    .v3-ticker {
      background: var(--c-accent);
      color: var(--c-dark);
      padding: 14px 0;
      overflow: hidden;
      margin: 0 24px;
      border-radius: 0 0 16px 16px;
      margin-top: -1px;
    }
    .v3-ticker-track { display: flex; gap: 48px; white-space: nowrap; animation: ticker 35s linear infinite; width: max-content; font-family: var(--font-ui); font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; }
    .v3-ticker-track span { display: inline-flex; gap: 48px; align-items: center; }
    .v3-ticker-track span::after { content: '✦'; }

    /* ROTATING badge */
    .v3-badge {
      position: relative; width: 140px; height: 140px;
      display: grid; place-items: center;
    }
    .v3-badge svg { animation: spin 18s linear infinite; }
    .v3-badge-center { position: absolute; width: 56px; height: 56px; border-radius: 50%; background: var(--c-accent); color: var(--c-dark); display: grid; place-items: center; font-size: 22px; }

    /* STAT counter */
    .v3-stat-num {
      font-family: var(--font-display); font-weight: 300;
      font-size: clamp(48px, 6vw, 88px);
      color: var(--c-accent); line-height: 1;
      letter-spacing: -0.04em;
    }
    .v3-stat-num em { font-style: italic; }

    /* Reveal on scroll utility */
    .v3-stagger > * { opacity: 0; transform: translateY(24px); transition: all 0.8s cubic-bezier(.2,.8,.2,1); }
    .v3-stagger.in > *:nth-child(1) { opacity: 1; transform: translateY(0); transition-delay: 0s; }
    .v3-stagger.in > *:nth-child(2) { opacity: 1; transform: translateY(0); transition-delay: 0.1s; }
    .v3-stagger.in > *:nth-child(3) { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
    .v3-stagger.in > *:nth-child(4) { opacity: 1; transform: translateY(0); transition-delay: 0.3s; }
    .v3-stagger.in > *:nth-child(5) { opacity: 1; transform: translateY(0); transition-delay: 0.4s; }
    .v3-stagger.in > *:nth-child(6) { opacity: 1; transform: translateY(0); transition-delay: 0.5s; }

    /* === MOBILE: collapse hard-coded multi-col grids globally === */
    @media (max-width: 900px) {
      /* All inline grid-template-columns become single-column on mobile */
      [style*="grid-template-columns: 1fr 1fr"],
      [style*="grid-template-columns:'1fr 1fr'"],
      [style*="gridTemplateColumns:'1fr 1fr'"],
      [style*="grid-template-columns: 1.2fr"],
      [style*="grid-template-columns: 1fr 1.2fr"],
      [style*="grid-template-columns: 1.5fr"],
      [style*="grid-template-columns: 2fr"],
      [style*="grid-template-columns: repeat(3"],
      [style*="grid-template-columns: repeat(4"] {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
      /* Stat strips: keep 2 cols on mobile, drop borders */
      .v3-stats-row { grid-template-columns: 1fr 1fr !important; gap: 24px 16px !important; padding: 24px 0 !important; }
      .v3-stats-row > * { padding: 0 !important; border-right: none !important; border-bottom: none !important; }

      /* Image trios: stack into 1 col */
      .v3-img-trio { grid-template-columns: 1fr !important; height: auto !important; gap: 12px !important; }
      .v3-img-trio > .v3-img { height: 240px; }

      /* Service cards grid → 1 col */
      .v3-svc-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
      .v3-svc-grid .v3-card { padding: 0 !important; }
      .v3-svc-grid .v3-card > div:last-child { padding: 4px 20px 24px !important; }
      .v3-svc-grid h3 { font-size: 28px !important; }

      /* Block (IoTerra360) responsive */
      .v3-block { padding: 40px 20px !important; }
      .v3-block .v3-stat-num { font-size: 36px !important; }

      /* Section padding tighter */
      .v3-section { padding: 56px 16px !important; }

      /* Big headlines: clamp tighter */
      .v3-h2 { font-size: clamp(32px, 9vw, 48px) !important; }
      .v3-h3 { font-size: clamp(22px, 6vw, 28px) !important; }

      /* Buttons full-width feel */
      .v3-btn { padding: 11px 18px; font-size: 13px; }

      /* Card-internal grids (numero+contenuto) → stack su mobile, padding ridotto */
      .v3-card[style*="grid-template-columns"] {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
        padding: 28px 22px !important;
      }
      .v3-card[style*="grid-template-columns"] > div:first-child {
        font-size: 64px !important;
      }

      /* Sub-grid 5 col (mineral chips) */
      [style*="grid-template-columns: repeat(5"] {
        grid-template-columns: repeat(2, 1fr) !important;
      }

      /* Footer mega text smaller */
      .v3-footer-mega { font-size: clamp(56px, 18vw, 96px) !important; margin: 24px 0 0 !important; }

      /* Tag tighter */
      .v3-tag { font-size: 10px; padding: 5px 10px; }

      /* CTA strip text */
      .v3-call-strip h2 { font-size: clamp(28px, 7vw, 40px) !important; }
      .v3-call-strip .phone { font-size: 22px !important; white-space: nowrap !important; }
      .v3-call-strip { padding: 36px 24px !important; }

      /* Tickers: smaller */
      .v3-ticker { margin: 0 8px; padding: 10px 0; }
      .v3-ticker-track { font-size: 11px; gap: 32px; }
      .v3-ticker-track span { gap: 32px; }

      /* Packages min-height free */
      .v3-pkg { padding: 28px 22px; min-height: 0; }
      .v3-pkg h3 { font-size: 28px !important; }

      /* Cards on dark padding tighter */
      .v3-card { padding: 24px; }

      /* Feature block heading scale */
      .v3-block .v3-h2 { font-size: clamp(36px, 11vw, 56px) !important; }
    }
    @media (max-width: 480px) {
      .v3-h1 { font-size: clamp(36px, 14vw, 56px) !important; }
      .v3-hero-content { padding: 48px 16px 24px; }
      .v3-section { padding: 48px 14px !important; }
      .v3-stats-row { grid-template-columns: 1fr !important; }
    }

    /* === SCROLL MOSAIC: tech + natura === */
    .v3-mosaic {
      padding: 120px 32px;
      max-width: 1280px;
      margin: 0 auto;
      position: relative;
    }
    .v3-mosaic-grid {
      display: flex; flex-direction: column; gap: 40px;
    }
    .v3-mosaic-row {
      display: grid;
      align-items: center;
      gap: 48px;
    }
    .v3-mosaic-l { grid-template-columns: 1.4fr 1fr; }
    .v3-mosaic-r { grid-template-columns: 1fr 1.4fr; }
    .v3-mosaic-r .v3-mosaic-img { order: 2; }
    .v3-mosaic-r .v3-mosaic-text { order: 1; text-align: right; }

    .v3-mosaic-img {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius);
      background: rgba(0,0,0,0.4);
      border: 1px solid rgba(var(--c-accent-rgb),0.08);
      aspect-ratio: 16/10;
    }
    .v3-mosaic-lg .v3-mosaic-img { aspect-ratio: 16/9; }
    .v3-mosaic-md .v3-mosaic-img { aspect-ratio: 5/4; }
    .v3-mosaic-img img {
      width: 100%; height: 110%;
      object-fit: cover; display: block;
      transition: transform .1s linear;
      will-change: transform;
    }
    .v3-mosaic-img::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(180deg, transparent 50%, rgba(var(--c-dark-rgb),0.65) 100%);
      pointer-events: none;
    }
    .v3-mosaic-tag {
      position: absolute; top: 20px; left: 20px;
      padding: 6px 12px;
      background: rgba(var(--c-dark-rgb),0.7);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(var(--c-accent-rgb),0.25);
      border-radius: 999px;
      font-size: 11px; letter-spacing: 0.14em; font-weight: 600;
      color: var(--c-accent);
      z-index: 2;
    }
    .v3-mosaic-num {
      position: absolute; bottom: 20px; right: 24px;
      font-family: var(--font-display);
      font-style: italic;
      font-weight: 300;
      font-size: 64px;
      color: var(--c-onDark);
      line-height: 1;
      z-index: 2;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    .v3-mosaic-text h3 { margin: 0 0 16px; }
    .v3-mosaic-text p { font-size: 17px; line-height: 1.6; margin: 0; max-width: 420px; color: var(--c-onDark-muted); }
    .v3-mosaic-r .v3-mosaic-text p { margin-left: auto; }

    @media (max-width: 900px) {
      .v3-mosaic { padding: 64px 16px; }
      .v3-mosaic-row, .v3-mosaic-l, .v3-mosaic-r { grid-template-columns: 1fr !important; gap: 20px !important; }
      .v3-mosaic-r .v3-mosaic-text, .v3-mosaic-l .v3-mosaic-text { text-align: left; order: 1 !important; }
      .v3-mosaic-r .v3-mosaic-img { order: 0 !important; }
      .v3-mosaic-r .v3-mosaic-text p { margin-left: 0; }
      .v3-mosaic-num { font-size: 48px; bottom: 16px; right: 18px; }
      .v3-mosaic-img { aspect-ratio: 4/3 !important; }
    }
    .v3-mobile .v3-mosaic { padding: 56px 16px; }
    .v3-mobile .v3-mosaic-row,
    .v3-mobile .v3-mosaic-l,
    .v3-mobile .v3-mosaic-r { grid-template-columns: 1fr !important; gap: 20px !important; }
    .v3-mobile .v3-mosaic-r .v3-mosaic-text { text-align: left; order: 1 !important; }
    .v3-mobile .v3-mosaic-r .v3-mosaic-img { order: 0 !important; }
    .v3-mobile .v3-mosaic-r .v3-mosaic-text p { margin-left: 0; }
    .v3-mobile .v3-mosaic-num { font-size: 44px; bottom: 12px; right: 16px; }
    .v3-mobile .v3-mosaic-img { aspect-ratio: 4/3 !important; }

    /* === END SCROLL MOSAIC === */
    /* (duplicato del blocco @media per quando window è desktop ma il    */
    /*  contenuto è renderizzato in un viewport simulato)                */
    /* ============================================================ */

    /* MOBILE NAV — pill compatto, logo piccolo, solo logo + burger
       Aumentato margin-top per non coprire status bar simulata del PhoneFrame */
    .v3-mobile .v3-nav {
      margin: 56px 12px 0;
      padding: 8px 8px 8px 16px;
      gap: 12px;
      grid-template-columns: 1fr auto;
      border-radius: 999px;
      background: rgba(var(--c-dark-rgb),0.85);
      backdrop-filter: blur(20px) saturate(160%);
      -webkit-backdrop-filter: blur(20px) saturate(160%);
    }
    .v3-mobile .v3-nav-logo { font-size: 17px; gap: 8px; }
    .v3-mobile .v3-nav-logo .v3-nav-logo-img { height: 26px; width: auto; }
    .v3-mobile .v3-nav-logo .v3-nav-logo-text { letter-spacing: -0.02em; }
    .v3-mobile .v3-nav-mid { display: none; }
    .v3-mobile .v3-nav-right { gap: 0; }
    .v3-mobile .v3-nav-right > .v3-btn-ghost,
    .v3-mobile .v3-nav-right > .v3-btn-primary,
    .v3-mobile .v3-nav-right > .v3-btn-light { display: none; }
    .v3-mobile.v3-app, .v3-mobile .v3-app { min-height: auto !important; }
    .v3-mobile .v3-app > main { flex: 0 0 auto !important; }
    .v3-mobile .v3-nav-burger {
      display: inline-flex;
      width: 42px; height: 42px;
      background: var(--c-accent);
      border: none;
    }
    .v3-mobile .v3-nav-burger:hover { background: var(--c-accent); }
    .v3-mobile .v3-nav-burger svg { stroke: var(--c-dark); width: 16px; height: 16px; }

    .v3-mobile .v3-hero { margin: 8px 8px 0; min-height: auto; border-radius: 20px; }
    .v3-mobile .v3-hero-content { padding: 56px 20px 32px; }
    .v3-mobile .v3-h1 { font-size: clamp(36px, 11vw, 60px); }
    .v3-mobile .v3-h2 { font-size: clamp(32px, 8vw, 48px); }
    .v3-mobile .v3-h3 { font-size: clamp(22px, 5.5vw, 28px); }

    .v3-mobile .v3-hero-cta { grid-template-columns: 1fr; gap: 20px; margin-top: 32px; padding-top: 24px; }
    .v3-mobile .v3-hero-cta p { font-size: 15px; }
    .v3-mobile .v3-hero-cta-btns { display: flex; flex-wrap: wrap; gap: 10px; }
    .v3-mobile .v3-hero-cta-btns .v3-btn { flex: 1 1 auto; justify-content: center; min-width: 120px; }

    .v3-mobile .v3-section { padding: 56px 16px; }

    /* TUTTI i grid hard-coded → 1 colonna nel PhoneFrame */
    .v3-mobile .v3-section-narrow > div[style*="grid-template-columns"],
    .v3-mobile .v3-block > div[style*="grid-template-columns"],
    .v3-mobile .v3-section > div[style*="grid-template-columns"],
    .v3-mobile section > div[style*="grid-template-columns"],
    .v3-mobile [style*="grid-template-columns: 1fr 1fr"],
    .v3-mobile [style*="grid-template-columns: 1.2fr"],
    .v3-mobile [style*="grid-template-columns: 1fr 1.2fr"],
    .v3-mobile [style*="grid-template-columns: 1.4fr"],
    .v3-mobile [style*="grid-template-columns: 1.5fr"],
    .v3-mobile [style*="grid-template-columns: 2fr"],
    .v3-mobile [style*="grid-template-columns: repeat(3"],
    .v3-mobile [style*="grid-template-columns: repeat(4"],
    .v3-mobile [style*="grid-template-columns: 180px"],
    .v3-mobile [style*="grid-template-columns: 160px"],
    .v3-mobile [style*="grid-template-columns: 140px"] {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }
    /* Stats row → 2 colonne */
    .v3-mobile .v3-stats-row {
      grid-template-columns: 1fr 1fr !important;
      gap: 24px 16px !important;
      padding: 24px 0 !important;
    }
    .v3-mobile .v3-stats-row > * { padding: 0 !important; border-right: none !important; border-bottom: none !important; }
    .v3-mobile .v3-stats-row .v3-stat-num { font-size: 36px !important; }

    /* Img trio: stack */
    .v3-mobile .v3-img-trio { height: auto !important; gap: 12px !important; }
    .v3-mobile .v3-img-trio > .v3-img { height: 200px; }

    /* Service cards */
    .v3-mobile .v3-svc-grid { gap: 12px !important; }
    .v3-mobile .v3-svc-grid .v3-card { padding: 0 !important; }
    .v3-mobile .v3-svc-grid .v3-card > div:last-child { padding: 4px 20px 24px !important; }
    .v3-mobile .v3-svc-grid h3 { font-size: 26px !important; }

    /* Card-internal grids */
    .v3-mobile .v3-card[style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
      padding: 28px 22px !important;
    }
    .v3-mobile .v3-card[style*="grid-template-columns"] > div:first-child { font-size: 56px !important; }
    .v3-mobile [style*="grid-template-columns: repeat(5"] { grid-template-columns: repeat(2, 1fr) !important; }

    /* Block (IoTerra360) */
    .v3-mobile .v3-block { padding: 40px 20px !important; }
    .v3-mobile .v3-block .v3-stat-num { font-size: 36px !important; }
    .v3-mobile .v3-block .v3-h2 { font-size: clamp(32px, 10vw, 48px) !important; }

    /* CTA strip */
    .v3-mobile .v3-call-strip { grid-template-columns: 1fr !important; padding: 32px 20px !important; margin: 0 8px 8px !important; border-radius: 20px; gap: 20px !important; }
    .v3-mobile .v3-call-strip h2 { font-size: clamp(28px, 7vw, 40px) !important; }
    .v3-mobile .v3-call-strip .right { align-items: flex-start; }
    .v3-mobile .v3-call-strip .phone { font-size: 20px !important; white-space: nowrap !important; }

    /* Footer mobile - single column con divider editoriale tra sezioni */
    .v3-mobile .v3-footer { margin: 8px; padding: 36px 22px 20px; border-radius: 20px; }
    .v3-mobile .v3-footer-top {
      grid-template-columns: 1fr !important;
      gap: 0 !important;
      padding-bottom: 22px !important;
    }
    .v3-mobile .v3-footer-top > div + div {
      padding-top: 22px;
      margin-top: 22px;
      border-top: 1px solid rgba(var(--c-accent-rgb), 0.12);
    }
    .v3-mobile .v3-footer-brand { grid-column: auto !important; gap: 12px; }
    .v3-mobile .v3-footer-brand .lg { font-size: 22px; }
    .v3-mobile .v3-footer-brand .lg img { height: 28px !important; }
    .v3-mobile .v3-footer-brand p { font-size: 13px; line-height: 1.55; }
    .v3-mobile .v3-footer-top h4 {
      font-family: var(--font-mono);
      font-size: 11px !important;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--c-accent);
      margin: 0 0 14px !important;
    }
    .v3-mobile .v3-footer-top ul { gap: 12px !important; }
    .v3-mobile .v3-footer-top a { font-size: 15px; }
    /* Social inline orizzontale */
    .v3-mobile .v3-footer-top > div:last-child ul {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap;
      gap: 10px !important;
    }
    .v3-mobile .v3-footer-top > div:last-child ul li a {
      display: inline-flex !important;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border: 1px solid rgba(var(--c-accent-rgb), 0.18);
      border-radius: 999px;
      font-size: 13px;
      color: var(--c-onDark);
    }
    .v3-mobile .v3-footer-bot {
      flex-direction: column;
      gap: 6px;
      align-items: flex-start;
      font-size: 11.5px;
      letter-spacing: 0.06em;
      padding-top: 22px !important;
    }
    .v3-mobile .v3-footer-mega { font-size: clamp(48px, 16vw, 72px) !important; margin: 24px 0 0 !important; }

    /* Tickers */
    .v3-mobile .v3-ticker { margin: 0 8px; padding: 10px 0; }
    .v3-mobile .v3-ticker-track { font-size: 11px; gap: 32px; }
    .v3-mobile .v3-ticker-track span { gap: 32px; }

    /* Hero marquee statica */
    .v3-mobile .v3-hero-marquee-inner { gap: 16px !important; flex-direction: column; align-items: flex-start; padding: 16px 20px !important; }
    .v3-mobile .v3-hero-marquee-inner span { font-size: 12px !important; }

    /* Tags + buttons compatti */
    .v3-mobile .v3-tag { font-size: 10px; padding: 5px 10px; }
    .v3-mobile .v3-btn { padding: 11px 16px; font-size: 13px; }

    /* Cards on dark padding */
    .v3-mobile .v3-card { padding: 24px; }

    /* Pkg */
    .v3-mobile .v3-pkg { padding: 28px 22px; min-height: 0; }
    .v3-mobile .v3-pkg h3 { font-size: 26px !important; }
    .v3-mobile .v3-pkg-grid { grid-template-columns: 1fr !important; gap: 12px !important; }

    /* Hide HUD/coord overlays on mobile — recuperano spazio sul mobile */
    @media (max-width: 900px) { .v3-hero-overlay { display: none !important; } }
    .v3-mobile .v3-hero-overlay { display: none !important; }

    /* Hamburger button: visibile in TUTTE le condizioni mobile, !important
       per evitare override da regole successive nel template. */
    .v3-nav-burger {
      display: none;
      align-items: center; justify-content: center;
      width: 44px; height: 44px; padding: 0; border-radius: 50%;
      background: var(--c-accent); border: 1px solid var(--c-accent);
      cursor: pointer; transition: all .25s;
      box-shadow: 0 6px 18px -6px rgba(var(--c-accent-rgb),0.55);
    }
    .v3-nav-burger:hover { transform: translateY(-1px); box-shadow: 0 10px 24px -6px rgba(var(--c-accent-rgb),0.7); }
    .v3-nav-burger svg { width: 22px; height: 22px; stroke: var(--c-dark); stroke-width: 2.2; }
    @media (max-width: 900px) {
      .v3-nav-burger { display: inline-flex !important; }
    }
    .v3-mobile .v3-nav-burger { display: inline-flex !important; }

    /* Servizi dropdown nella nav */
    .v3-nav-svc { position: relative; }
    .v3-nav-svc-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; border: 0;
      color: var(--c-onDark); cursor: pointer;
      font-family: inherit; font-size: 17.5px; font-weight: 500; letter-spacing: 0.01em;
      padding: 10px 20px; border-radius: 999px; transition: all 0.3s;
    }
    .v3-nav-svc-btn:hover { color: var(--c-accent); }
    .v3-nav-svc-btn.active { background: rgba(var(--c-accent-rgb),0.14); color: var(--c-accent); }
    .v3-nav-dropdown {
      position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%);
      min-width: 360px;
      background: rgba(var(--c-dark-rgb),0.95);
      backdrop-filter: blur(20px) saturate(140%);
      border: 1px solid rgba(var(--c-accent-rgb),0.18);
      border-radius: 20px;
      padding: 8px;
      box-shadow: 0 20px 60px -12px rgba(0,0,0,0.6);
      animation: dropdownIn .25s cubic-bezier(.2,.8,.2,1) both;
      z-index: 60;
    }
    @keyframes dropdownIn { from { opacity: 0; transform: translate(-50%, -8px); } to { opacity: 1; transform: translate(-50%, 0); } }
    .v3-nav-dropdown::before {
      content: ''; position: absolute; top: -6px; left: 50%; transform: translateX(-50%) rotate(45deg);
      width: 12px; height: 12px;
      background: rgba(var(--c-dark-rgb),0.95);
      border-left: 1px solid rgba(var(--c-accent-rgb),0.18);
      border-top: 1px solid rgba(var(--c-accent-rgb),0.18);
    }
    .v3-nav-dropdown-all {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 16px;
      background: rgba(var(--c-accent-rgb),0.08);
      border-radius: 14px;
      color: var(--c-accent);
      text-decoration: none;
      font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
      margin-bottom: 6px;
      transition: background .2s;
    }
    .v3-nav-dropdown-all:hover { background: rgba(var(--c-accent-rgb),0.16); }
    .v3-nav-dropdown-all .arrow { font-size: 16px; }
    .v3-nav-dropdown-list { display: flex; flex-direction: column; gap: 2px; }
    .v3-nav-dropdown-list a {
      display: flex; flex-direction: column; gap: 4px;
      padding: 12px 16px;
      border-radius: 12px;
      color: var(--c-onDark);
      text-decoration: none;
      transition: background .2s;
    }
    .v3-nav-dropdown-list a:hover, .v3-nav-dropdown-list a.active { background: rgba(var(--c-accent-rgb),0.08); }
    .v3-nav-dropdown-list .lbl { font-size: 14px; font-weight: 500; color: var(--c-onDark); font-family: var(--font-display); letter-spacing: -0.01em; }
    .v3-nav-dropdown-list a:hover .lbl, .v3-nav-dropdown-list a.active .lbl { color: var(--c-accent); }
    .v3-nav-dropdown-list .tag { font-size: 10px; color: var(--c-onDark-muted); letter-spacing: 0.1em; text-transform: uppercase; }

    /* Mobile menu — REDESIGNED */
    .v3-mobile-menu {
      position: fixed; inset: 0; z-index: 1100;
      background:
        radial-gradient(ellipse 120% 60% at 50% 0%, rgba(var(--c-accent-rgb),0.18) 0%, transparent 50%),
        radial-gradient(ellipse 80% 50% at 50% 100%, rgba(var(--c-accent-rgb),0.08) 0%, transparent 60%),
        linear-gradient(180deg, #0a3a2e 0%, #082e25 40%, #04201a 100%);
      backdrop-filter: blur(24px);
      display: flex; flex-direction: column;
      padding: max(20px, env(safe-area-inset-top, 20px)) 20px max(24px, env(safe-area-inset-bottom, 24px));
      animation: fadeIn .3s ease;
      overflow-y: auto;
    }
    .v3-mobile-menu::before {
      content: '';
      position: absolute; inset: 0;
      background-image: radial-gradient(rgba(var(--c-accent-rgb),0.08) 1px, transparent 1px);
      background-size: 24px 24px;
      pointer-events: none;
      mask-image: radial-gradient(ellipse 70% 50% at center, black 30%, transparent 80%);
      -webkit-mask-image: radial-gradient(ellipse 70% 50% at center, black 30%, transparent 80%);
    }
    .v3-mobile-menu > * { position: relative; z-index: 1; }
    .v3-mobile-menu-head {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 4px;
      margin-bottom: 24px;
      border-bottom: 1px solid rgba(var(--c-accent-rgb),0.1);
      padding-bottom: 20px;
    }
    .v3-mobile-menu-head .v3-nav-logo { font-size: 22px; gap: 10px; }
    .v3-mobile-menu-head .v3-mobile-logo-img { height: 32px; width: auto; }
    .v3-mobile-menu-head .close {
      background: rgba(var(--c-accent-rgb),0.08);
      border: 1px solid rgba(var(--c-accent-rgb),0.2);
      width: 42px; height: 42px;
      border-radius: 50%;
      color: var(--c-accent);
      cursor: pointer;
      display: grid; place-items: center;
      transition: all .2s ease;
    }
    .v3-mobile-menu-head .close:hover { background: rgba(var(--c-accent-rgb),0.16); transform: rotate(90deg); }

    .v3-mobile-menu-meta {
      display: flex; justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--c-accent); opacity: 0.7;
      margin-bottom: 16px;
      padding: 0 4px;
    }

    .v3-mobile-menu nav { display: flex; flex-direction: column; gap: 4px; }

    .v3-mobile-menu nav .v3-mm-row {
      display: grid;
      grid-template-columns: 32px 1fr auto;
      align-items: center;
      gap: 16px;
      color: var(--c-onDark);
      text-decoration: none;
      font-family: var(--font-display);
      font-style: italic;
      font-size: 30px;
      font-weight: 300;
      letter-spacing: -0.02em;
      padding: 18px 16px;
      border-radius: 16px;
      border: 1px solid transparent;
      transition: all .25s ease;
      line-height: 1;
    }
    .v3-mobile-menu nav .v3-mm-row em {
      font-style: normal;
      font-family: var(--font-mono);
      font-weight: 400;
      color: var(--c-accent);
      opacity: 0.6;
      font-size: 11px;
      letter-spacing: 0.08em;
    }
    .v3-mobile-menu nav .v3-mm-row .arr {
      font-style: normal;
      font-family: var(--font-ui);
      font-size: 18px;
      color: var(--c-accent);
      opacity: 0;
      transform: translateX(-6px);
      transition: all .25s ease;
    }
    .v3-mobile-menu nav .v3-mm-row:hover {
      background: rgba(var(--c-accent-rgb),0.06);
      border-color: rgba(var(--c-accent-rgb),0.18);
    }
    .v3-mobile-menu nav .v3-mm-row:hover .arr { opacity: 1; transform: translateX(0); }
    .v3-mobile-menu nav .v3-mm-row.active {
      background: rgba(var(--c-accent-rgb),0.12);
      border-color: rgba(var(--c-accent-rgb),0.3);
      color: var(--c-accent);
    }
    .v3-mobile-menu nav .v3-mm-row.active em { opacity: 1; }
    .v3-mobile-menu nav .v3-mm-row.active .arr { opacity: 1; transform: translateX(0); }

    /* Submenu (Servizi) — annidato, indentato, divisore tratteggiato */
    .v3-mobile-menu-sub {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin: 4px 0 8px 24px;
      padding-left: 16px;
      border-left: 1px dashed rgba(var(--c-accent-rgb),0.2);
    }
    .v3-mobile-menu-sub a {
      display: flex; flex-direction: column; gap: 4px;
      padding: 12px 14px;
      border-radius: 10px;
      color: var(--c-onDark-muted);
      text-decoration: none;
      transition: all .2s ease;
      font-family: var(--font-ui);
    }
    .v3-mobile-menu-sub a .lbl {
      font-size: 14px;
      font-weight: 500;
      color: var(--c-onDark);
      letter-spacing: -0.005em;
    }
    .v3-mobile-menu-sub a .tag {
      font-family: var(--font-mono);
      font-size: 9.5px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--c-onDark-muted);
      opacity: 0.7;
    }
    .v3-mobile-menu-sub a:hover, .v3-mobile-menu-sub a.active { background: rgba(var(--c-accent-rgb),0.06); }
    .v3-mobile-menu-sub a:hover .lbl, .v3-mobile-menu-sub a.active .lbl { color: var(--c-accent); }
    .v3-mobile-menu-sub a:hover .tag, .v3-mobile-menu-sub a.active .tag { color: var(--c-accent); opacity: 1; }

    /* CTA bottom */
    .v3-mobile-menu-cta {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(var(--c-accent-rgb),0.1);
      display: flex; flex-direction: column; gap: 12px;
    }
    .v3-mm-cta-meta {
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 0.14em;
      color: var(--c-accent);
      opacity: 0.7;
      margin-bottom: 4px;
    }
    .v3-mm-phone {
      display: flex; align-items: center; gap: 12px;
      padding: 16px 18px;
      border: 1px solid rgba(var(--c-accent-rgb),0.2);
      border-radius: 14px;
      color: var(--c-onDark);
      text-decoration: none;
      font-family: var(--font-display);
      font-size: 22px;
      letter-spacing: -0.01em;
      background: rgba(var(--c-accent-rgb),0.03);
      transition: all .2s;
    }
    .v3-mm-phone svg { color: var(--c-accent); }
    .v3-mm-phone:hover { background: rgba(var(--c-accent-rgb),0.08); }

    .v3-mm-social {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    .v3-mm-social a {
      display: flex; align-items: center; justify-content: center;
      gap: 8px;
      padding: 12px 14px;
      border: 1px solid rgba(var(--c-accent-rgb),0.15);
      border-radius: 12px;
      color: var(--c-onDark-muted);
      text-decoration: none;
      font-family: var(--font-ui);
      font-size: 12.5px;
      font-weight: 500;
      transition: all .2s ease;
    }
    .v3-mm-social a:hover { color: var(--c-accent); border-color: rgba(var(--c-accent-rgb),0.3); background: rgba(var(--c-accent-rgb),0.04); }
  
    /* ─── PORTED FROM CLAUDE DESIGN BUNDLE (gnTCWfhCC0XrlPLqObTZWQ) ─── */
    /* === MOSAIC ANIMATED === */
    .v3m-anim { will-change: transform, opacity; }
    .v3m-img { position: relative; overflow: hidden; }
    .v3m-topline {
      position: absolute; top: 0; left: 0; right: 0;
      height: 2px; background: var(--c-accent);
      transform-origin: left center;
      box-shadow: 0 0 12px rgba(var(--c-accent-rgb),.6);
      z-index: 3;
    }
    .v3m-grain {
      position: absolute; inset: 0;
      background-image:
        repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 3px),
        repeating-linear-gradient(90deg, rgba(0,0,0,.06) 0 1px, transparent 1px 4px);
      mix-blend-mode: overlay;
      pointer-events: none;
      z-index: 2;
    }
    .v3m-tag {
      display: inline-flex; align-items: center; gap: 8px;
      transition: transform .5s cubic-bezier(.22,.9,.28,1), opacity .5s ease;
    }
    .v3m-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--c-accent);
      box-shadow: 0 0 8px var(--c-accent);
      animation: v3m-pulse 1.6s ease-in-out infinite;
    }
    @keyframes v3m-pulse {
      0%,100% { opacity: .4; transform: scale(.85); }
      50% { opacity: 1; transform: scale(1.1); }
    }
    .v3m-num { font-feature-settings: "tnum"; }
    .v3m-cursor {
      display: inline-block; width: 3px; height: .8em;
      background: var(--c-onDark);
      vertical-align: -0.05em; margin-left: 2px;
      animation: v3m-blink 1s step-end infinite;
    }
    @keyframes v3m-blink {
      0%,50% { opacity: 1; } 51%,100% { opacity: 0; }
    }
    .v3m-kpi {
      position: absolute;
      bottom: 20px; left: 20px;
      background: rgba(var(--c-dark-rgb),.85);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(var(--c-accent-rgb),.25);
      border-radius: 14px;
      padding: 12px 16px 10px;
      min-width: 160px;
      color: var(--c-onDark);
      box-shadow: 0 14px 40px -10px rgba(0,0,0,.6);
      z-index: 3;
      transition: opacity .5s ease, transform .6s cubic-bezier(.22,.9,.28,1);
    }
    .v3m-kpi-label {
      font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
      font-size: 9px; letter-spacing: .22em;
      color: var(--c-onDark-muted);
      text-transform: uppercase;
    }
    .v3m-kpi-value {
      font-family: var(--font-display, 'Fraunces', serif);
      font-size: 28px; line-height: 1; margin-top: 2px;
      font-style: italic; font-weight: 400;
      color: var(--c-accent);
    }
    .v3m-kpi-value small {
      font-size: 14px; margin-left: 4px;
      color: var(--c-onDark-muted);
      font-style: normal;
    }
    .v3m-spark {
      width: 60px; height: 16px;
      margin-top: 6px;
      color: var(--c-accent);
      display: block;
    }
    @media (max-width: 720px) {
      .v3m-kpi { padding: 8px 12px 6px; min-width: 130px; bottom: 14px; left: 14px; }
      .v3m-kpi-label { font-size: 8px; }
      .v3m-kpi-value { font-size: 22px; }
      .v3m-spark { width: 50px; height: 14px; }
    }
    .v3-mobile .v3m-kpi { padding: 8px 12px 6px; min-width: 130px; bottom: 14px; left: 14px; }
    .v3-mobile .v3m-kpi-label { font-size: 8px; }
    .v3-mobile .v3m-kpi-value { font-size: 22px; }
    .v3-mobile .v3m-spark { width: 50px; height: 14px; }
    /* === END MOSAIC ANIMATED === */

    /* === SOIL BLAST HERO (AnalisiSuolo) === */
    .sb-stage { position: relative; height: 150vh; }
    .sb-pin {
      position: sticky; top: 0; left: 0; height: 100vh; width: 100%;
      overflow: hidden;
      background: linear-gradient(180deg, var(--c-dark) 0%, #061f18 60%, var(--c-primary-deep) 100%);
    }
    .sb-pin::before {
      content:''; position:absolute; inset:0; pointer-events:none; z-index:1;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      opacity:.04; mix-blend-mode:overlay;
    }
    .sb-hud, .sb-hud-r {
      position:absolute; z-index:6;
      font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
      font-size:10px; letter-spacing:.2em; text-transform:uppercase;
      color: var(--c-accent); pointer-events:none;
    }
    .sb-hud { top:88px; left:32px; }
    .sb-hud-r { top:88px; right:32px; }
    .sb-hud .row { color: var(--c-onDark-muted); margin-top:4px; }
    .sb-hud .ph {
      margin-top:14px; display:flex; align-items:baseline; gap:10px;
      color: var(--c-onDark); font-family: var(--font-ui, 'Inter', sans-serif);
      letter-spacing:0; text-transform:none; font-size:12px;
    }
    .sb-hud .ph b {
      font-family: var(--font-display, 'Fraunces', serif);
      font-style:italic; font-size:42px; color: var(--c-accent);
      font-weight:300; letter-spacing:-.02em; line-height:.9;
    }
    .sb-hud-r { top:88px; right:32px; text-align:right; }
    .sb-hud-r .lg {
      display:block; margin-top:6px;
      font-family: var(--font-display, 'Fraunces', serif);
      font-style:italic; font-weight:300; font-size:64px;
      letter-spacing:-.04em; color: var(--c-accent); line-height:.9;
    }
    .sb-hud-r .lg small {
      font-size:20px; color: var(--c-onDark-muted);
      font-style:normal; letter-spacing:0; margin-left:4px;
    }
    /* Desktop: immagine leggermente alzata. Mobile: torna centrata. */
    .sb-scene { position:absolute; inset:0; display:grid; place-items:start center;
      padding-top: 10vh; padding-bottom: 16vh; z-index:3; }
    @media (max-width: 720px) {
      /* alzo leggermente l'immagine: paddingBottom > paddingTop sposta il centro verso l'alto */
      .sb-scene { place-items: center; padding-top: 4vh; padding-bottom: 12vh; }
    }
    .v3-mobile .sb-scene { place-items: center; padding-top: 4vh; padding-bottom: 12vh; }
    .sb-blast {
      position:relative;
      /* Mantiene rapporto naturale del PNG (941:1672). Larghezza limitata sia da
         viewport orizzontale che verticale (per non sforare HUD/caption). */
      aspect-ratio: 941 / 1672;
      width: min(440px, 72vw, calc((100vh - 280px) * 0.563));
      height: auto;
      filter: drop-shadow(0 30px 60px rgba(0,0,0,.55));
    }
    @media (max-width: 720px) {
      .sb-blast {
        width: min(290px, 72vw, calc((100vh - 220px) * 0.563));
      }
    }
    .v3-mobile .sb-blast {
      width: min(280px, 70vw, calc((100vh - 220px) * 0.563));
    }
    .sb-blast .sb-core, .sb-shard {
      position:absolute; inset:0;
      /* --hero-img può essere overridato dallo stage per riusare la scena
         con immagini diverse (es. RicercaHero usa la pianta idroponica). */
      background-image: var(--hero-img, url('assets/img/plant-soil-cutout.png'));
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .sb-shard {
      will-change: transform, opacity, filter;
      transition:
        transform 1.3s cubic-bezier(.18,.85,.22,1),
        opacity .8s ease,
        filter .8s ease;
    }
    .sb-shard::after {
      content:''; position:absolute; inset:0;
      box-shadow: inset 0 0 0 1px rgba(var(--c-accent-rgb),.0), inset 0 -1px 0 rgba(var(--c-accent-rgb),0);
      pointer-events:none;
      transition: box-shadow .6s ease;
    }
    .sb-stage[data-detonating="1"] .sb-shard::after {
      box-shadow: inset 0 0 0 1px rgba(var(--c-accent-rgb),.06), inset 0 -1px 0 rgba(var(--c-accent-rgb),.1);
    }
    .sb-pulse {
      position:absolute; left:50%; top:55%;
      width:80px; height:80px; border-radius:50%;
      transform: translate(-50%,-50%) scale(0);
      background: radial-gradient(circle, rgba(var(--c-accent-rgb),.45) 0%, rgba(var(--c-accent-rgb),0) 70%);
      pointer-events:none;
      transition: transform 1.4s cubic-bezier(.2,.8,.2,1), opacity .8s;
      opacity:0;
    }
    .sb-dust {
      position:absolute; width:3px; height:3px; border-radius:50%;
      background: rgba(var(--c-accent-rgb),.6);
      pointer-events:none; will-change: transform, opacity;
      box-shadow: 0 0 6px rgba(var(--c-accent-rgb),.5);
    }
    .sb-chip {
      position:absolute; left:50%; top:50%;
      transform: translate(-50%,-50%) scale(.5);
      display:inline-flex; align-items:center; gap:14px;
      width: max-content; max-width: 260px;
      padding:11px 18px 11px 11px;
      background: rgba(var(--c-dark-rgb),.9);
      border:1px solid rgba(var(--c-accent-rgb),.3);
      border-radius:999px;
      box-shadow: 0 12px 40px -10px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.05);
      backdrop-filter: blur(12px);
      opacity:0;
      transition: opacity .7s cubic-bezier(.22,.9,.28,1), transform 1.1s cubic-bezier(.22,.9,.28,1);
      pointer-events:none; z-index:5;
    }
    .sb-sym {
      width:42px; height:42px; border-radius:12px;
      background: linear-gradient(135deg, var(--c-accent) 0%, #2da846 100%);
      color: var(--c-dark);
      display:grid; place-items:center;
      font-family: var(--font-display, 'Fraunces', serif);
      font-style:italic; font-weight:500; font-size:19px; letter-spacing:-.02em;
      box-shadow: 0 4px 12px -2px rgba(var(--c-accent-rgb),.4), inset 0 1px 0 rgba(255,255,255,.4);
    }
    .sb-sym.sm { font-size:16px; }
    .sb-meta { display:flex; flex-direction:column; gap:3px; line-height:1; }
    .sb-name {
      font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
      font-size:11px; letter-spacing:.18em; text-transform:uppercase;
      color: var(--c-onDark-muted);
    }
    .sb-val {
      font-family: var(--font-display, 'Fraunces', serif);
      font-style:italic; font-size:21px; color: var(--c-accent);
      font-weight:400; letter-spacing:-.01em;
    }
    .sb-connectors { position:absolute; inset:0; z-index:4; pointer-events:none; width:100%; height:100%; }
    .sb-caption {
      position:absolute; bottom:48px; left:50%;
      transform: translateX(-50%);
      width: min(680px, 92vw);
      text-align:center; z-index:6; pointer-events:none;
    }
    .sb-cap-frame { position:relative; height:120px; }
    .sb-cap-frame > div {
      position:absolute; inset:0;
      opacity:0; transform: translateY(12px);
      transition: opacity .6s, transform .8s cubic-bezier(.22,.9,.28,1);
    }
    .sb-cap-frame > div.on { opacity:1; transform: translateY(0); }
    .sb-step {
      font-family: var(--font-mono, 'JetBrains Mono', ui-monospace, monospace);
      font-size:10px; letter-spacing:.24em; text-transform:uppercase;
      color: var(--c-onDark); margin-bottom:10px;
      display:flex; align-items:center; gap:10px; justify-content:center;
    }
    .sb-step::before, .sb-step::after {
      content:''; width:24px; height:1px; background: rgba(var(--c-onDark-rgb),.4);
    }
    .sb-ttl {
      font-family: var(--font-display, 'Fraunces', serif);
      font-style:italic; font-weight:300;
      font-size: clamp(22px, 2.6vw, 32px);
      letter-spacing:-.02em; line-height:1.15;
      color: var(--c-onDark); margin: 0 0 6px;
    }
    .sb-caption p {
      font-size:14px; line-height:1.55; color: var(--c-onDark-muted);
      margin: 0 auto; max-width:520px;
    }
    .sb-rail {
      position:absolute; bottom:18px; left:50%;
      transform: translateX(-50%);
      width: min(420px, 70vw); height:2px;
      background: rgba(var(--c-accent-rgb),.1);
      border-radius:999px; overflow:hidden; z-index:6;
    }
    .sb-rail span {
      display:block; height:100%; background: var(--c-accent);
      width:0%; transition: width .1s linear;
    }
    /* Mobile: HUD compatto, chip leggermente più piccoli */
    @media (max-width: 900px) {
      .sb-hud, .sb-hud-r {
        font-size: 9px;
      }
      .sb-hud { top: 80px; left: 16px; }
      .sb-hud-r { top: 80px; right: 16px; }
      .sb-hud-r .lg { font-size: 36px; }
      .sb-hud-r .lg small { font-size: 14px; }
      .sb-hud .ph b { font-size: 28px; }
      .sb-chip {
        padding: 4px 8px 4px 4px; gap: 6px;
        max-width: 105px;
      }
      .sb-sym { width: 22px; height: 22px; font-size: 10px; border-radius: 6px; }
      .sb-sym.sm { font-size: 9px; }
      .sb-name { font-size: 7.5px; letter-spacing: .12em; white-space: nowrap; }
      .sb-val { font-size: 11px; white-space: nowrap; }
      .sb-meta { gap: 1px; }
      .sb-caption { bottom: 32px; }
      .sb-cap-frame { height: 96px; }
      .sb-ttl { font-size: clamp(18px, 5vw, 24px); }
      .sb-caption p { font-size: 12.5px; line-height: 1.5; max-width: 90%; }
      .sb-step { font-size: 9px; letter-spacing: .18em; }
      .sb-step::before, .sb-step::after { width: 14px; }
      .sb-rail { width: min(260px, 70vw); bottom: 10px; }
    }
    @media (max-width: 480px) {
      .sb-hud { font-size: 8px; }
      .sb-hud .ph b { font-size: 22px; }
      .sb-hud-r .lg { font-size: 28px; }
      .sb-hud-r .lg small { font-size: 11px; }
      .sb-hud .row, .sb-hud > div:first-child { line-height: 1.4; }
      .sb-chip {
        padding: 6px 12px 6px 6px; gap: 9px;
        max-width: 165px;
      }
      .sb-sym { width: 32px; height: 32px; font-size: 14px; border-radius: 9px; }
      .sb-sym.sm { font-size: 13px; }
      .sb-name { font-size: 9.5px; letter-spacing: .14em; }
      .sb-val { font-size: 15px; }
      .sb-meta { gap: 3px; }
    }
    /* Forced mobile mode (PhoneFrame) — same as media query */
    .v3-mobile .sb-hud, .v3-mobile .sb-hud-r { font-size: 8.5px; }
    .v3-mobile .sb-hud { top: 80px; left: 14px; }
    .v3-mobile .sb-hud-r { top: 80px; right: 14px; }
    .v3-mobile .sb-hud-r .lg { font-size: 28px; }
    .v3-mobile .sb-hud-r .lg small { font-size: 11px; }
    .v3-mobile .sb-hud .ph b { font-size: 22px; }
    .v3-mobile .sb-chip { padding: 6px 12px 6px 6px; gap: 9px; max-width: 165px; }
    .v3-mobile .sb-sym { width: 32px; height: 32px; font-size: 14px; border-radius: 9px; }
    .v3-mobile .sb-sym.sm { font-size: 13px; }
    .v3-mobile .sb-name { font-size: 9.5px; letter-spacing: .14em; white-space: nowrap; }
    .v3-mobile .sb-val { font-size: 15px; white-space: nowrap; }
    .v3-mobile .sb-meta { gap: 3px; }
    .v3-mobile .sb-caption { bottom: 28px; }
    .v3-mobile .sb-cap-frame { height: 96px; }
    .v3-mobile .sb-ttl { font-size: clamp(18px, 5vw, 24px); }
    .v3-mobile .sb-caption p { font-size: 12.5px; line-height: 1.5; max-width: 90%; }
    .v3-mobile .sb-step { font-size: 9px; }
    .v3-mobile .sb-rail { width: min(220px, 65vw); bottom: 8px; }
    /* === END SOIL BLAST HERO === */

    /* === PLANT SCAN HERO (Ricerca, alternativa alla blast) === */
    .scn-stage { position: relative; height: 180vh; }
    .scn-pin {
      position: sticky; top: 0; left: 0; height: 100vh; width: 100%;
      overflow: hidden;
      background: linear-gradient(180deg, var(--c-dark) 0%, #061f18 60%, var(--c-primary-deep) 100%);
    }
    .scn-pin::before {
      content: ''; position: absolute; inset: 0;
      background-image: radial-gradient(rgba(var(--c-accent-rgb),0.05) 1px, transparent 1px);
      background-size: 26px 26px;
      mask-image: radial-gradient(ellipse 80% 70% at center, black 20%, transparent 90%);
      -webkit-mask-image: radial-gradient(ellipse 80% 70% at center, black 20%, transparent 90%);
      pointer-events: none;
    }
    .scn-scene {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .scn-plant-wrap {
      position: relative;
      width: clamp(280px, 42vw, 520px);
      aspect-ratio: 1122 / 1402;
      filter: drop-shadow(0 30px 60px rgba(0,0,0,0.55))
              drop-shadow(0 0 28px rgba(var(--c-accent-rgb),0.06));
    }
    .scn-plant {
      width: 100%; height: 100%;
      background-image: var(--hero-img, url('assets/img/hydroponic-plant-cutout.png'));
      background-size: 100% 100%;
      background-repeat: no-repeat; background-position: center;
    }
    /* Overlay vegetativo che illumina la pianta a contatto con la scan */
    .scn-plant-glow {
      position: absolute; inset: 0;
      background-image: var(--hero-img, url('assets/img/hydroponic-plant-cutout.png'));
      background-size: 100% 100%;
      background-repeat: no-repeat; background-position: center;
      mix-blend-mode: screen;
      opacity: var(--scan-glow, 0);
      filter: hue-rotate(20deg) saturate(1.6) brightness(1.4);
      pointer-events: none;
    }
    /* Wireframe contour che si rivela */
    .scn-plant-wire {
      position: absolute; inset: 0;
      background-image: var(--hero-img, url('assets/img/hydroponic-plant-cutout.png'));
      background-size: 100% 100%;
      background-repeat: no-repeat; background-position: center;
      mix-blend-mode: lighten;
      opacity: var(--scan-wire, 0);
      filter: contrast(8) brightness(1.6) hue-rotate(50deg);
      pointer-events: none;
    }

    /* Scan line orizzontale */
    .scn-line {
      /* Posizionata DENTRO scn-plant-wrap: top % = % della pianta.
         Estendo width a 100vw centrato sulla pianta per attraversare tutto lo schermo. */
      position: absolute; left: 50%; width: 100vw; height: 2px;
      transform: translateX(-50%);
      top: var(--scan-y, 0%);
      background: linear-gradient(90deg,
        transparent 0%, rgba(var(--c-accent-rgb),0.85) 25%,
        var(--c-accent) 50%, rgba(var(--c-accent-rgb),0.85) 75%, transparent 100%);
      box-shadow: 0 0 14px rgba(var(--c-accent-rgb),0.65),
                  0 0 38px rgba(var(--c-accent-rgb),0.35);
      pointer-events: none;
      z-index: 4;
    }
    .scn-line::before {
      content: '';
      position: absolute; left: 0; right: 0; top: -28px; height: 28px;
      background: linear-gradient(180deg, transparent 0%, rgba(var(--c-accent-rgb),0.16) 100%);
    }
    .scn-line::after {
      content: '';
      position: absolute; left: 0; right: 0; top: 100%; height: 56px;
      background: linear-gradient(180deg, rgba(var(--c-accent-rgb),0.18) 0%, transparent 100%);
    }
    /* Tag laterale sulla scan line */
    .scn-line-tag {
      /* Anchorata appena a destra del plant-wrap, sulla scan-line estesa */
      position: absolute; left: calc(100% + 14px);
      top: calc(var(--scan-y, 0%) - 11px);
      padding: 4px 10px;
      background: rgba(var(--c-dark-rgb),0.78);
      border: 1px solid rgba(var(--c-accent-rgb),0.45);
      border-radius: 6px;
      font-family: var(--font-mono); font-size: 10.5px;
      letter-spacing: 0.12em; color: var(--c-accent);
      backdrop-filter: blur(8px);
      z-index: 5;
      white-space: nowrap;
    }
    .scn-line-tag b { color: var(--c-onDark); font-weight: 500; margin-left: 6px;
      font-variant-numeric: tabular-nums; }

    /* Y-axis ticks sul lato sinistro */
    .scn-ticks {
      position: absolute; left: 8%; top: 0; bottom: 0;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 4% 0;
      pointer-events: none;
    }
    .scn-ticks span {
      font-family: var(--font-mono); font-size: 9.5px;
      letter-spacing: 0.1em; color: rgba(var(--c-accent-rgb),0.45);
      display: flex; align-items: center; gap: 6px;
    }
    .scn-ticks span::before {
      content: ''; width: 14px; height: 1px;
      background: rgba(var(--c-accent-rgb),0.35);
    }
    .scn-ticks span.on { color: var(--c-accent); }
    .scn-ticks span.on::before { background: var(--c-accent); width: 22px; }

    /* Punti di interesse (POI) sulla pianta */
    .scn-poi-layer { position: absolute; inset: 0; pointer-events: none; z-index: 6; }
    .scn-poi {
      position: absolute; transform: translate(-50%, -50%);
      width: 14px; height: 14px;
    }
    .scn-poi .dot {
      position: absolute; inset: 0;
      border-radius: 50%;
      background: var(--c-accent);
      box-shadow: 0 0 0 0 rgba(var(--c-accent-rgb),0.5);
      opacity: var(--poi-active, 0);
      transition: opacity .25s, transform .25s;
      transform: scale(var(--poi-scale, 0.6));
    }
    .scn-poi .ring {
      position: absolute; inset: -6px;
      border: 1px solid rgba(var(--c-accent-rgb),0.55);
      border-radius: 50%;
      opacity: var(--poi-active, 0);
      animation: scn-poi-ring 1.6s ease-out infinite;
    }
    @keyframes scn-poi-ring {
      0%   { transform: scale(0.6); opacity: 0.7; }
      100% { transform: scale(1.8); opacity: 0; }
    }

    /* Linea connettrice POI -> chip */
    .scn-conn {
      position: absolute; pointer-events: none; z-index: 7;
      transform-origin: 0 50%;
      height: 1px;
      background: linear-gradient(90deg,
        rgba(var(--c-accent-rgb),0.85) 0%, rgba(var(--c-accent-rgb),0.25) 100%);
      opacity: var(--conn-opacity, 0);
    }

    /* Chip metrica */
    .scn-chip {
      position: absolute; transform: translate(-50%, -50%);
      padding: 8px 12px;
      background: rgba(var(--c-dark-rgb),0.82);
      border: 1px solid rgba(var(--c-accent-rgb),0.40);
      border-radius: 10px;
      font-family: var(--font-ui);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 14px 36px rgba(0,0,0,0.45),
                  inset 0 1px 0 rgba(255,255,255,0.05);
      min-width: 140px;
      opacity: var(--chip-opacity, 0);
      z-index: 8;
    }
    .scn-chip-name {
      font-family: var(--font-mono); font-size: 9.5px;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: rgba(var(--c-accent-rgb),0.85); margin-bottom: 3px;
    }
    .scn-chip-row { display: flex; align-items: baseline; gap: 8px; }
    .scn-chip-sym {
      font-family: var(--font-display); font-style: italic;
      font-weight: 300; font-size: 22px; color: var(--c-accent);
      line-height: 1; letter-spacing: -0.02em;
    }
    .scn-chip-val {
      font-family: var(--font-mono); font-size: 13px;
      color: var(--c-onDark); font-variant-numeric: tabular-nums;
    }
    .scn-chip-unit {
      font-family: var(--font-mono); font-size: 10px;
      color: rgba(var(--c-onDark-rgb),0.55);
    }

    /* HUD */
    .scn-hud, .scn-hud-r {
      position: absolute; top: 88px;
      font-family: var(--font-mono); font-size: 11px;
      color: var(--c-onDark-muted);
      letter-spacing: 0.1em; line-height: 1.7;
      z-index: 10;
    }
    .scn-hud { left: 32px; }
    .scn-hud > div:first-child { color: var(--c-accent); letter-spacing: 0.16em; }
    .scn-hud .row { color: var(--c-onDark-muted); font-size: 10.5px; }
    .scn-hud .ph {
      margin-top: 14px; padding: 8px 12px;
      background: rgba(var(--c-dark-rgb),0.65);
      border: 1px solid rgba(var(--c-accent-rgb),0.20);
      border-radius: 8px;
      display: inline-flex; align-items: baseline; gap: 8px;
      backdrop-filter: blur(8px);
    }
    .scn-hud .ph span { font-size: 10px; color: var(--c-accent); letter-spacing: 0.18em; }
    .scn-hud .ph b { font-size: 18px; color: var(--c-onDark);
      font-variant-numeric: tabular-nums; font-weight: 500; }

    .scn-hud-r { right: 32px; text-align: right; }
    .scn-hud-r > div:first-child { color: var(--c-accent); letter-spacing: 0.16em; }
    .scn-hud-r .lg {
      display: block; font-size: 36px; font-weight: 300;
      color: var(--c-onDark); letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums; margin-top: 4px;
      font-family: var(--font-display);
    }
    .scn-hud-r .lg small { font-size: 14px; color: var(--c-accent);
      margin-left: 2px; font-family: var(--font-mono); }

    /* Caption a step (uguale a sb) */
    .scn-caption {
      position: absolute; bottom: 56px; left: 50%;
      transform: translateX(-50%);
      max-width: min(640px, 92vw); width: 100%;
      text-align: center; padding: 0 24px;
      z-index: 10;
    }
    .scn-cap-frame { position: relative; min-height: 100px; }
    .scn-cap-frame > div {
      position: absolute; inset: 0; opacity: 0;
      transition: opacity 0.6s ease;
    }
    .scn-cap-frame > div.on { opacity: 1; }
    .scn-step {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.18em; color: var(--c-accent);
      margin-bottom: 12px;
    }
    .scn-ttl {
      font-family: var(--font-display); font-style: italic;
      font-weight: 300; font-size: clamp(24px, 3.4vw, 36px);
      color: var(--c-onDark); margin: 0 0 8px;
      letter-spacing: -0.02em; line-height: 1.1;
    }
    .scn-caption p {
      font-size: 13.5px; line-height: 1.55;
      color: var(--c-onDark-muted); max-width: 540px;
      margin: 0 auto;
    }

    /* Progress rail (bottom) */
    .scn-rail {
      position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
      width: min(360px, 60vw); height: 2px;
      background: rgba(var(--c-accent-rgb),0.14);
      border-radius: 999px; overflow: hidden; z-index: 10;
    }
    .scn-rail span {
      display: block; height: 100%;
      background: linear-gradient(90deg, transparent, var(--c-accent));
    }

    /* Mobile */
    @media (max-width: 720px) {
      .scn-stage { height: 150vh; }
      .scn-plant-wrap { width: min(70vw, 320px); }
      .scn-hud, .scn-hud-r { top: 80px; font-size: 10px; }
      .scn-hud { left: 16px; } .scn-hud-r { right: 16px; }
      .scn-hud-r .lg { font-size: 28px; }
      .scn-ticks { display: none; }
      .scn-line-tag { right: 16px; font-size: 9.5px; padding: 3px 8px; }
      /* Chip compatti, dimensionati per stare DENTRO al box pianta */
      .scn-chip { min-width: 0; width: max-content; padding: 4px 7px; gap: 6px; }
      .scn-chip-name { font-size: 7.5px; letter-spacing: .12em; margin-bottom: 1px; }
      .scn-chip-sym { font-size: 13px; }
      .scn-chip-val { font-size: 9.5px; }
      .scn-chip-unit { font-size: 8px; }
      .scn-chip-row { gap: 5px; }
      .scn-caption { bottom: 36px; }
      .scn-ttl { font-size: 18px; }
      .scn-caption p { font-size: 11.5px; max-width: 90%; }
    }
    .v3-mobile .scn-stage { height: 190vh; }
    .v3-mobile .scn-ticks { display: none; }
    .v3-mobile .scn-chip { min-width: 0; width: max-content; padding: 4px 7px; gap: 6px; }
    .v3-mobile .scn-chip-name { font-size: 7.5px; letter-spacing: .12em; margin-bottom: 1px; }
    .v3-mobile .scn-chip-sym { font-size: 13px; }
    .v3-mobile .scn-chip-val { font-size: 9.5px; }
    .v3-mobile .scn-chip-unit { font-size: 8px; }
    .v3-mobile .scn-chip-row { gap: 5px; }
    /* === END PLANT SCAN HERO === */

    /* === SATELLITE SCAN HERO (Precisione) ============================== */
    /* Vista aerea di un campo + satellite SVG che orbita in alto.
       Una scan-beam verticale parte dal satellite e attraversa il campo
       da sx a dx mentre scorri. Dietro la beam si rivela l'overlay NDVI.
       I chip-metrica sono posizionati sopra il campo, mai fuori. */
    .sat-stage { position: relative; height: 112vh; }
    .sat-pin {
      position: sticky; top: 0; left: 0; height: 100vh; width: 100%;
      overflow: hidden;
      background: linear-gradient(180deg, var(--c-dark) 0%, #061f18 60%, var(--c-primary-deep) 100%);
    }
    .sat-pin::before {
      content: ''; position: absolute; inset: 0;
      background-image: radial-gradient(rgba(var(--c-accent-rgb),0.05) 1px, transparent 1px);
      background-size: 26px 26px;
      mask-image: radial-gradient(ellipse 80% 70% at center, black 20%, transparent 90%);
      -webkit-mask-image: radial-gradient(ellipse 80% 70% at center, black 20%, transparent 90%);
      pointer-events: none;
    }
    .sat-field {
      position: absolute;
      left: 6%; right: 6%;
      top: 18%; bottom: 22%;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(var(--c-accent-rgb),0.20);
      box-shadow: 0 30px 60px rgba(0,0,0,0.45);
    }
    .sat-bg, .sat-ndvi {
      position: absolute; inset: 0;
      background-image: url('assets/img/mais-aerial.jpg');
      background-size: cover; background-position: center;
    }
    .sat-bg { filter: brightness(0.55) saturate(0.6) contrast(1.1); }
    .sat-ndvi {
      filter: hue-rotate(15deg) saturate(2.4) brightness(0.85) contrast(1.25);
      mix-blend-mode: lighten;
      clip-path: inset(0 calc(100% - var(--scan-x, 0%)) 0 0);
      -webkit-clip-path: inset(0 calc(100% - var(--scan-x, 0%)) 0 0);
    }
    /* Vignette al bordo del campo */
    .sat-field::after {
      content:''; position:absolute; inset:0; pointer-events:none;
      background:
        radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%),
        linear-gradient(180deg, transparent 60%, rgba(var(--c-dark-rgb),0.55) 100%);
    }

    /* Satellite icon che si muove con la scan */
    .sat-icon {
      position: absolute;
      top: 6%;
      left: var(--scan-x, 0%);
      transform: translateX(-50%);
      width: 64px; height: 64px;
      z-index: 6;
      transition: filter .25s;
    }
    .sat-icon svg {
      width: 100%; height: 100%; display: block;
      filter: drop-shadow(0 4px 14px rgba(var(--c-accent-rgb),0.55));
    }
    .sat-icon::before {
      content:''; position:absolute; inset:-18px;
      border-radius:50%;
      background: radial-gradient(circle, rgba(var(--c-accent-rgb),0.30), transparent 60%);
      animation: pulse 2s ease-in-out infinite;
    }

    /* Linea di trasmissione satellite -> campo (cielo, NON scannerizza).
       Sottile e sfumata, parte da sotto il satellite e arriva al top del campo.
       Niente glow box-shadow: e' solo un "raggio guida". */
    .sat-link {
      position: absolute;
      top: calc(6% + 64px);
      height: calc(12% - 64px);
      left: var(--scan-x, 0%);
      width: 1px;
      transform: translateX(-0.5px);
      pointer-events: none;
      z-index: 4;
      background: linear-gradient(180deg,
        rgba(var(--c-accent-rgb),0.18) 0%,
        rgba(var(--c-accent-rgb),0.45) 100%);
    }

    /* Beam che scannerizza il campo (NON tocca il cielo).
       Top allineato al top del campo, bottom al bottom del campo. */
    .sat-beam {
      position: absolute;
      top: 18%; bottom: 22%;
      left: var(--scan-x, 0%);
      width: 2px;
      transform: translateX(-1px);
      pointer-events: none;
      z-index: 5;
      background: linear-gradient(180deg,
        rgba(var(--c-accent-rgb),0.85) 0%,
        rgba(var(--c-accent-rgb),0.45) 100%);
      box-shadow: 0 0 14px rgba(var(--c-accent-rgb),0.6),
                  0 0 38px rgba(var(--c-accent-rgb),0.3);
    }
    .sat-beam::before {
      content:''; position:absolute;
      top: 0; bottom: 0; left:-30px; right:-30px;
      background: linear-gradient(90deg,
        transparent 0%, rgba(var(--c-accent-rgb),0.10) 50%, transparent 100%);
      pointer-events: none;
    }

    /* X-axis ticks (sotto il campo) */
    .sat-ticks {
      position: absolute;
      left: 6%; right: 6%;
      bottom: calc(22% - 24px);
      height: 18px;
      display: flex; justify-content: space-between; align-items: center;
      font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .1em;
      color: rgba(var(--c-accent-rgb),0.45);
      pointer-events: none;
    }
    .sat-ticks span {
      display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
    .sat-ticks span::before {
      content: ''; width: 1px; height: 10px;
      background: rgba(var(--c-accent-rgb),0.35);
    }
    .sat-ticks span.on { color: var(--c-accent); }
    .sat-ticks span.on::before { background: var(--c-accent); height: 14px; }

    /* POI sul campo */
    .sat-poi-layer { position: absolute; inset: 0; pointer-events: none; z-index: 6; }
    .sat-poi {
      position: absolute; transform: translate(-50%, -50%);
      width: 14px; height: 14px;
    }
    .sat-poi .dot {
      position: absolute; inset: 0; border-radius: 50%;
      background: var(--c-accent);
      opacity: var(--poi-active, 0);
      transition: opacity .25s, transform .25s;
      transform: scale(var(--poi-scale, 0.6));
    }
    .sat-poi .ring {
      position: absolute; inset: -6px;
      border: 1px solid rgba(var(--c-accent-rgb),0.55);
      border-radius: 50%;
      opacity: var(--poi-active, 0);
      animation: scn-poi-ring 1.6s ease-out infinite;
    }

    /* Chip metrica — flottano SOPRA il campo, non fuori */
    .sat-chip {
      position: absolute; transform: translate(-50%, -50%);
      padding: 7px 11px;
      background: rgba(var(--c-dark-rgb),0.85);
      border: 1px solid rgba(var(--c-accent-rgb),0.40);
      border-radius: 10px;
      font-family: var(--font-ui);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 12px 28px rgba(0,0,0,0.45);
      min-width: 110px; max-width: 38vw;
      opacity: var(--chip-opacity, 0);
      z-index: 8;
    }
    .sat-chip-name {
      font-family: var(--font-mono); font-size: 9px;
      letter-spacing: 0.16em; text-transform: uppercase;
      color: rgba(var(--c-accent-rgb),0.85); margin-bottom: 2px;
    }
    .sat-chip-row { display: flex; align-items: baseline; gap: 6px; }
    .sat-chip-sym {
      font-family: var(--font-display); font-style: italic;
      font-weight: 300; font-size: 18px; color: var(--c-accent);
      line-height: 1;
    }
    .sat-chip-val {
      font-family: var(--font-mono); font-size: 12px;
      color: var(--c-onDark); font-variant-numeric: tabular-nums;
    }
    .sat-chip-unit {
      font-family: var(--font-mono); font-size: 9px;
      color: rgba(var(--c-onDark-rgb),0.55);
    }

    /* HUD top-left/right (riusa colori sb) — top più giù per non collidere
       con la nav sticky del sito (alta ~70px) */
    .sat-hud, .sat-hud-r {
      position: absolute; top: 88px;
      font-family: var(--font-mono); font-size: 11px;
      color: var(--c-onDark-muted); letter-spacing: 0.1em; line-height: 1.6;
      z-index: 10;
    }
    .sat-hud { left: 28px; }
    .sat-hud > div:first-child { color: var(--c-accent); letter-spacing: 0.16em; }
    .sat-hud .ph {
      margin-top: 12px; padding: 7px 11px;
      background: rgba(var(--c-dark-rgb),0.65);
      border: 1px solid rgba(var(--c-accent-rgb),0.20);
      border-radius: 8px;
      display: inline-flex; align-items: baseline; gap: 8px;
      backdrop-filter: blur(8px);
    }
    .sat-hud .ph span { font-size: 10px; color: var(--c-accent); letter-spacing: 0.18em; }
    .sat-hud .ph b { font-size: 17px; color: var(--c-onDark);
      font-variant-numeric: tabular-nums; font-weight: 500; }
    .sat-hud-r { right: 28px; text-align: right; }
    .sat-hud-r > div:first-child {
      color: var(--c-accent); letter-spacing: 0.16em;
      font-size: 14px;
    }
    .sat-hud-r .lg {
      display: block; font-size: 48px; font-weight: 300;
      color: var(--c-onDark); letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums; margin-top: 6px;
      font-family: var(--font-display); line-height: 1;
    }
    .sat-hud-r .lg small { font-size: 18px; color: var(--c-accent);
      margin-left: 3px; font-family: var(--font-mono); }

    /* Caption (uguale a scn) */
    .sat-caption {
      position: absolute; bottom: 38px; left: 50%;
      transform: translateX(-50%);
      max-width: min(640px, 92vw); width: 100%;
      text-align: center; padding: 0 24px;
      z-index: 10;
    }
    .sat-cap-frame { position: relative; min-height: 92px; }
    .sat-cap-frame > div { position: absolute; inset: 0; opacity: 0;
      transition: opacity 0.6s ease; }
    .sat-cap-frame > div.on { opacity: 1; }
    .sat-step {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.18em; color: var(--c-accent); margin-bottom: 10px;
    }
    .sat-ttl {
      font-family: var(--font-display); font-style: italic;
      font-weight: 300; font-size: clamp(22px, 3vw, 32px);
      color: var(--c-onDark); margin: 0 0 6px;
      letter-spacing: -0.02em; line-height: 1.1;
    }
    .sat-caption p {
      font-size: 13px; line-height: 1.5;
      color: var(--c-onDark-muted); max-width: 540px; margin: 0 auto;
    }

    /* Progress rail */
    .sat-rail {
      position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
      width: min(360px, 60vw); height: 2px;
      background: rgba(var(--c-accent-rgb),0.14);
      border-radius: 999px; overflow: hidden; z-index: 10;
    }
    .sat-rail span {
      display: block; height: 100%;
      background: linear-gradient(90deg, transparent, var(--c-accent));
    }

    @media (max-width: 720px) {
      .sat-stage { height: 112vh; }
      /* Field box e icone ulteriormente abbassati per dare spazio all'HUD
         (top:80px) e mostrare scritte/satellite intere */
      .sat-field { left: 4%; right: 4%; top: 30%; bottom: 32%; }
      .sat-icon { width: 44px; height: 44px; top: 18%; }
      .sat-link { top: calc(18% + 44px); height: calc(12% - 44px); }
      .sat-beam { top: 30%; bottom: 32%; }
      .sat-hud, .sat-hud-r { top: 80px; font-size: 10px; }
      .sat-hud { left: 14px; } .sat-hud-r { right: 14px; }
      .sat-hud-r > div:first-child { font-size: 12px; }
      .sat-hud-r .lg { font-size: 36px; }
      .sat-hud-r .lg small { font-size: 14px; }
      .sat-ticks { display: none; }
      .sat-chip { min-width: 78px; padding: 5px 9px; }
      .sat-chip-sym { font-size: 14px; }
      .sat-chip-val { font-size: 10.5px; }
      /* Caption SUBITO sotto il field (top assoluto), non più dal fondo */
      .sat-caption { top: 56%; bottom: auto; padding: 0 16px;
        transform: translateX(-50%); }
      .sat-cap-frame { min-height: 78px; }
      .sat-step { font-size: 9.5px; margin-bottom: 6px; }
      .sat-ttl { font-size: 17px; line-height: 1.15; margin-bottom: 4px; }
      .sat-caption p { font-size: 11.5px; max-width: 100%; line-height: 1.45; }
      .sat-rail { bottom: 16px; width: min(220px, 70vw); }
    }
    .v3-mobile .sat-stage { height: 112vh; }
    .v3-mobile .sat-ticks { display: none; }
    .v3-mobile .sat-field { left: 4%; right: 4%; top: 30%; bottom: 32%; }
    .v3-mobile .sat-icon { width: 44px; height: 44px; top: 18%; }
    .v3-mobile .sat-link { top: calc(18% + 44px); height: calc(12% - 44px); }
    .v3-mobile .sat-beam { top: 30%; bottom: 32%; }
    .v3-mobile .sat-caption { top: 72%; bottom: auto; padding: 0 16px;
      transform: translateX(-50%); }
    .v3-mobile .sat-cap-frame { min-height: 78px; }
    .v3-mobile .sat-rail { bottom: 16px; width: min(220px, 70vw); }
    .v3-mobile .sat-hud, .v3-mobile .sat-hud-r { top: 12px; font-size: 10px; }
    .v3-mobile .sat-hud { left: 14px; } .v3-mobile .sat-hud-r { right: 14px; }
    .v3-mobile .sat-hud-r > div:first-child { font-size: 12px; }
    .v3-mobile .sat-hud-r .lg { font-size: 36px; }
    .v3-mobile .sat-hud-r .lg small { font-size: 14px; }
    .v3-mobile .sat-chip { min-width: 78px; padding: 5px 9px; }
    .v3-mobile .sat-chip-sym { font-size: 14px; }
    .v3-mobile .sat-chip-val { font-size: 10.5px; }
    .v3-mobile .sat-step { font-size: 9.5px; }
    .v3-mobile .sat-ttl { font-size: 17px; line-height: 1.15; }
    .v3-mobile .sat-caption p { font-size: 11.5px; max-width: 100%; line-height: 1.45; }
    /* === END SATELLITE SCAN HERO === */

    /* === DIGITAL INTRO CARD (Marketing) ============================== */
    .v3-dig-intro-card {
      position: relative; overflow: hidden;
      padding: clamp(28px, 4vw, 56px);
    }
    .v3-dig-intro-grid {
      position: absolute; inset: 0; pointer-events: none;
      background-image:
        linear-gradient(rgba(var(--c-accent-rgb),0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(var(--c-accent-rgb),0.04) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .v3-dig-intro-row {
      position: relative; display: grid;
      grid-template-columns: 1.3fr 1fr;
      gap: 48px; align-items: center;
    }
    .v3-dig-intro-lead {
      font-size: clamp(18px, 1.7vw, 22px);
      line-height: 1.55; margin: 0;
      font-family: var(--font-display); font-weight: 300;
      color: var(--c-onDark); letter-spacing: -0.01em;
    }
    .v3-dig-intro-lead em {
      color: var(--c-accent); font-style: italic;
    }
    .v3-dig-intro-stats {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
    }
    .v3-dig-intro-stats > div {
      text-align: center;
      padding: 14px 8px;
      border-radius: 14px;
      background: rgba(var(--c-accent-rgb),0.03);
      border: 1px solid rgba(var(--c-accent-rgb),0.10);
    }
    .v3-dig-intro-stats .num {
      font-family: var(--font-display); font-style: italic; font-weight: 300;
      font-size: clamp(36px, 3.6vw, 52px);
      color: var(--c-accent); line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .v3-dig-intro-stats .num span {
      font-size: 0.42em; color: var(--c-onDark-muted); margin-left: 2px;
    }
    .v3-dig-intro-stats .lbl {
      font-family: var(--font-mono); font-size: 9.5px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--c-onDark-muted); margin-top: 8px;
    }
    @media (max-width: 760px) {
      .v3-dig-intro-row { grid-template-columns: 1fr; gap: 24px; }
      .v3-dig-intro-stats { gap: 10px; }
      .v3-dig-intro-stats > div { padding: 12px 6px; }
      .v3-dig-intro-stats .num { font-size: clamp(28px, 8vw, 40px); }
      .v3-dig-intro-stats .lbl { font-size: 8.5px; letter-spacing: 0.10em; }
      .v3-dig-intro-lead { font-size: 16px; }
    }
    .v3-mobile .v3-dig-intro-row { grid-template-columns: 1fr; gap: 24px; }
    .v3-mobile .v3-dig-intro-stats { gap: 10px; }
    .v3-mobile .v3-dig-intro-stats > div { padding: 12px 6px; }
    .v3-mobile .v3-dig-intro-stats .num { font-size: clamp(28px, 8vw, 40px); }
    .v3-mobile .v3-dig-intro-stats .lbl { font-size: 8.5px; letter-spacing: 0.10em; }
    .v3-mobile .v3-dig-intro-lead { font-size: 16px; }
    /* === END DIGITAL INTRO CARD === */

    /* === IOTERRA360 BLOCK (Home) ====================================== */
    .v3-iot360-grid {
      display: grid; grid-template-columns: 1fr 1.2fr;
      gap: 64px; align-items: center;
      position: relative; z-index: 1;
    }
    .iot360-stats {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 24px; margin-top: 36px;
    }
    .iot360-stat {
      border-top: 1px solid rgba(var(--c-accent-rgb),0.20);
      padding-top: 16px;
    }
    .iot360-stat .v3-stat-num { font-size: 48px; }
    .iot360-stat-lbl {
      font-size: 13px; color: var(--c-onDark-muted);
      margin-top: 6px; letter-spacing: 0.04em;
    }
    .iot360-map-card {
      position: relative;
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(var(--c-accent-rgb),0.15);
      border-radius: 20px; padding: 20px;
      aspect-ratio: 1.4 / 1;
    }
    .iot360-map-head {
      display: flex; justify-content: space-between;
      margin-bottom: 16px; font-size: 12px;
      color: var(--c-onDark-muted); letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .iot360-live {
      color: var(--c-accent); display: flex; gap: 6px; align-items: center;
    }
    .iot360-live .dot {
      width: 6px; height: 6px; background: var(--c-accent);
      border-radius: 50%; animation: blink 1.4s infinite;
    }
    .iot360-map-frame {
      height: calc(100% - 80px);
      border-radius: 12px; overflow: hidden;
    }
    .iot360-map-legend {
      display: flex; justify-content: space-between;
      margin-top: 16px; font-size: 12px;
      color: var(--c-onDark-muted);
    }
    .iot360-map-legend span {
      display: flex; gap: 8px; align-items: center;
    }
    .iot360-map-legend .sw {
      width: 14px; height: 8px; border-radius: 2px;
    }

    @media (max-width: 760px) {
      /* Mobile: mappa NDVI sopra, prominente. Stats compatte sotto. */
      .v3-iot360-grid {
        display: flex; flex-direction: column; gap: 32px;
      }
      .iot360-map { order: 1; }
      .iot360-text { order: 2; }
      .iot360-map-card {
        aspect-ratio: 4 / 3; padding: 14px;
      }
      .iot360-map-head { font-size: 10px; margin-bottom: 12px; }
      .iot360-map-legend { font-size: 10px; gap: 6px; flex-wrap: wrap; }
      .iot360-map-frame { height: calc(100% - 64px); }
      .iot360-stats { gap: 12px; margin-top: 24px; }
      .iot360-stat { padding-top: 12px; }
      .iot360-stat .v3-stat-num { font-size: 30px; }
      .iot360-stat-lbl { font-size: 11px; }
    }
    .v3-mobile .v3-iot360-grid {
      display: flex; flex-direction: column; gap: 32px;
    }
    .v3-mobile .iot360-map { order: 1; }
    .v3-mobile .iot360-text { order: 2; }
    .v3-mobile .iot360-map-card { aspect-ratio: 4 / 3; padding: 14px; }
    .v3-mobile .iot360-map-head { font-size: 10px; margin-bottom: 12px; }
    .v3-mobile .iot360-map-legend { font-size: 10px; gap: 6px; flex-wrap: wrap; }
    .v3-mobile .iot360-map-frame { height: calc(100% - 64px); }
    .v3-mobile .iot360-stats { gap: 12px; margin-top: 24px; }
    .v3-mobile .iot360-stat { padding-top: 12px; }
    .v3-mobile .iot360-stat .v3-stat-num { font-size: 30px; }
    .v3-mobile .iot360-stat-lbl { font-size: 11px; }
    /* === END IOTERRA360 BLOCK === */

    /* === MOBILE GRID FIX (codex review) =================================
       Forza su mobile la collassazione a single-column delle griglie multi-col
       inline-styled che producono overflow su 360-430px. Selettore basato
       sull'attributo style serializzato dal browser. */
    @media (max-width: 760px) {
      .v3-section-narrow [style*="repeat(3"],
      .v3-section-narrow [style*="repeat(4"],
      .v3-section-narrow [style*="repeat(5"],
      .v3-section-narrow [style*="1.2fr"],
      .v3-section-narrow [style*="1.4fr"],
      .v3-section-narrow [style*="1fr 1fr 1fr"],
      .v3-section-narrow [style*="160px 1fr"],
      .v3-section-narrow [style*="140px 1fr"],
      .v3-section-narrow [style*="320px 1fr"],
      .v3-block [style*="1.2fr"],
      .v3-block [style*="1fr 1.2fr"] {
        grid-template-columns: 1fr !important;
        gap: 18px !important;
      }
      /* Mantieni 2 colonne dove ha senso (logiche pari) */
      .v3-section-narrow [style*="gridTemplateColumns:'1fr 1fr'"]:not([style*="1fr 1fr 1fr"]),
      .v3-section-narrow [style*="grid-template-columns: 1fr 1fr"]:not([style*="1fr 1fr 1fr"]) {
        grid-template-columns: 1fr !important;
      }
      /* Padding card processo Analisi Suolo (160px 1fr — codex) */
      .v3-section-narrow .v3-card[style*="160px 1fr"] { padding: 24px !important; }
      /* Pacchetti pkg-grid */
      .v3-pkg-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
    }
    .v3-mobile .v3-section-narrow [style*="repeat(3"],
    .v3-mobile .v3-section-narrow [style*="repeat(4"],
    .v3-mobile .v3-section-narrow [style*="repeat(5"],
    .v3-mobile .v3-section-narrow [style*="1.2fr"],
    .v3-mobile .v3-section-narrow [style*="1.4fr"],
    .v3-mobile .v3-section-narrow [style*="1fr 1fr 1fr"],
    .v3-mobile .v3-section-narrow [style*="160px 1fr"],
    .v3-mobile .v3-section-narrow [style*="140px 1fr"],
    .v3-mobile .v3-section-narrow [style*="320px 1fr"],
    .v3-mobile .v3-block [style*="1.2fr"],
    .v3-mobile .v3-block [style*="1fr 1.2fr"] {
      grid-template-columns: 1fr !important;
      gap: 18px !important;
    }
    .v3-mobile .v3-section-narrow .v3-card[style*="160px 1fr"] { padding: 24px !important; }
    .v3-mobile .v3-pkg-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
    /* === END MOBILE GRID FIX === */

    /* === PAGE HERO with bg image + gradient (Analisi/Consulenza/Marketing) === */
    .v3-page-hero {
      position: relative;
      min-height: clamp(360px, 58vh, 560px);
      padding: clamp(96px, 14vh, 160px) 32px clamp(56px, 8vh, 96px);
      display: flex; align-items: flex-end;
      overflow: hidden;
      margin-bottom: 24px;
    }
    .v3-page-hero-bg {
      position: absolute; inset: 0;
      background-size: cover; background-position: center;
      filter: saturate(0.95) contrast(1.05);
    }
    .v3-page-hero-bg::after {
      content: ''; position: absolute; inset: 0;
      background:
        linear-gradient(180deg,
          rgba(var(--c-dark-rgb),0.35) 0%,
          rgba(var(--c-dark-rgb),0.55) 45%,
          rgba(var(--c-dark-rgb),0.92) 100%),
        radial-gradient(ellipse 70% 50% at 0% 100%, rgba(var(--c-accent-rgb),0.18), transparent 70%);
    }
    .v3-page-hero-content {
      position: relative; z-index: 2;
      max-width: 1280px; margin: 0 auto; width: 100%;
    }
    .v3-page-hero-content .v3-tag { margin-bottom: 16px; }
    .v3-page-hero-content h1 { color: var(--c-onDark);
      text-shadow: 0 4px 24px rgba(0,0,0,0.45); }
    .v3-page-hero-content p {
      font-size: clamp(16px, 1.6vw, 20px);
      line-height: 1.6; color: rgba(var(--c-onDark-rgb), 0.92);
      margin-top: 28px; max-width: 820px;
      text-shadow: 0 2px 14px rgba(0,0,0,0.4);
    }
    @media (max-width: 720px) {
      .v3-page-hero { padding: 110px 20px 40px;
        min-height: clamp(320px, 50vh, 460px); }
    }
    .v3-mobile .v3-page-hero { padding: 110px 20px 40px;
      min-height: clamp(320px, 50vh, 460px); }
    /* === END PAGE HERO === */

    /* === Ricerca strip vertical farming (responsive) =================== */
    .v3-rd-strip {
      position: relative; border-radius: var(--radius); overflow: hidden;
      aspect-ratio: 21 / 9;
      border: 1px solid rgba(var(--c-accent-rgb),0.12);
    }
    .v3-rd-strip img { width:100%; height:100%; object-fit:cover; display:block; }
    .v3-rd-strip-grad {
      position:absolute; inset:0;
      background: linear-gradient(180deg, transparent 35%, rgba(var(--c-dark-rgb),0.92) 100%);
    }
    .v3-rd-strip-meta {
      position:absolute; left:32px; bottom:28px; right:32px;
      display:flex; justify-content:space-between; align-items:flex-end;
      gap:24px; flex-wrap:wrap;
    }
    .v3-rd-strip-meta .kicker {
      font-family: var(--font-mono); font-size:11px; letter-spacing:0.15em;
      color: var(--c-accent); margin-bottom: 8px;
    }
    .v3-rd-strip-meta .ttl {
      font-family: var(--font-display); font-style: italic;
      font-size: clamp(20px, 3.4vw, 32px); font-weight: 300;
      color: #fff; line-height: 1.15;
    }
    .v3-rd-strip-meta .badge {
      font-family: var(--font-mono); font-size: 11px;
      color: rgba(255,255,255,0.7); text-align: right;
    }
    @media (max-width: 720px) {
      .v3-rd-strip { aspect-ratio: 4 / 5; }
      .v3-rd-strip-grad {
        background: linear-gradient(180deg, transparent 30%, rgba(var(--c-dark-rgb),0.95) 75%);
      }
      .v3-rd-strip-meta {
        left: 18px; right: 18px; bottom: 20px;
        flex-direction: column; align-items: flex-start; gap: 14px;
      }
      .v3-rd-strip-meta .kicker { font-size: 10px; }
      .v3-rd-strip-meta .ttl { font-size: clamp(20px, 6vw, 28px); }
      .v3-rd-strip-meta .badge { text-align: left; font-size: 10px; }
    }
    .v3-mobile .v3-rd-strip { aspect-ratio: 4 / 5; }
    .v3-mobile .v3-rd-strip-meta {
      left: 18px; right: 18px; bottom: 20px;
      flex-direction: column; align-items: flex-start; gap: 14px;
    }
    .v3-mobile .v3-rd-strip-meta .ttl { font-size: clamp(20px, 6vw, 28px); }
    .v3-mobile .v3-rd-strip-meta .badge { text-align: left; font-size: 10px; }
    /* === END Ricerca strip === */

    /* === FULL-BLEED HERO BREAK (Marketing + Ricerca) ============== */
    /* Sezione full-width con foto immersiva, multi-layer gradient per stacco
       del testo dal soggetto fotografico, kicker mono, titolo display 56px,
       paragrafo descrittivo + tag chips. Mobile: aspect-ratio più verticale. */
    .v3-fbhero {
      position: relative; width: 100%;
      aspect-ratio: 21 / 9;
      overflow: hidden;
      isolation: isolate;
    }
    .v3-fbhero-img {
      position: absolute; inset: 0;
      background-size: cover; background-position: center;
      transform: scale(1.05);
      filter: saturate(1.05) contrast(1.05);
    }
    /* Gradient orizzontale (sx scuro per stacco testo, dx visibile soggetto) */
    .v3-fbhero-grad {
      position: absolute; inset: 0;
      background:
        linear-gradient(90deg,
          rgba(var(--c-dark-rgb),0.92) 0%,
          rgba(var(--c-dark-rgb),0.65) 35%,
          rgba(var(--c-dark-rgb),0.20) 65%,
          transparent 100%),
        linear-gradient(180deg,
          rgba(var(--c-dark-rgb),0.30) 0%,
          transparent 30%,
          rgba(var(--c-dark-rgb),0.45) 100%);
    }
    /* Vignette accent in basso a sinistra per richiamo brand */
    .v3-fbhero-vignette {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 60% 50% at 0% 100%,
        rgba(var(--c-accent-rgb),0.18) 0%, transparent 65%);
      pointer-events: none;
    }
    .v3-fbhero-content {
      position: absolute; left: 8%; top: 50%;
      transform: translateY(-50%);
      max-width: 600px; z-index: 2;
    }
    .v3-fbhero-kicker {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.18em; color: var(--c-accent);
      margin-bottom: 18px; display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px;
      background: rgba(var(--c-dark-rgb),0.5);
      border: 1px solid rgba(var(--c-accent-rgb),0.25);
      border-radius: 999px;
      backdrop-filter: blur(10px);
    }
    .v3-fbhero-h {
      font-family: var(--font-display); font-weight: 300;
      font-size: clamp(40px, 5.6vw, 72px);
      line-height: 1; letter-spacing: -0.04em;
      color: #fff; margin: 0 0 18px;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    .v3-fbhero-h em {
      font-style: italic; color: var(--c-accent); font-weight: 300;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    .v3-fbhero-sub {
      font-size: 17px; line-height: 1.55;
      color: rgba(255,255,255,0.88); max-width: 520px;
      margin: 0 0 22px;
      text-shadow: 0 2px 12px rgba(0,0,0,0.4);
    }
    .v3-fbhero-tags {
      display: flex; flex-wrap: wrap; gap: 8px;
    }
    .v3-fbhero-tags span {
      font-family: var(--font-mono); font-size: 10.5px;
      letter-spacing: 0.14em; text-transform: uppercase;
      padding: 6px 12px;
      background: rgba(var(--c-dark-rgb),0.6);
      border: 1px solid rgba(var(--c-accent-rgb),0.22);
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      backdrop-filter: blur(8px);
    }

    @media (max-width: 760px) {
      .v3-fbhero { aspect-ratio: 4 / 5; }
      .v3-fbhero-grad {
        background:
          linear-gradient(180deg,
            rgba(var(--c-dark-rgb),0.20) 0%,
            rgba(var(--c-dark-rgb),0.50) 40%,
            rgba(var(--c-dark-rgb),0.92) 100%);
      }
      .v3-fbhero-content {
        left: 6%; right: 6%; top: auto; bottom: 8%;
        transform: none; max-width: 100%;
      }
      .v3-fbhero-h { font-size: clamp(34px, 9vw, 48px); }
      .v3-fbhero-sub { font-size: 14.5px; max-width: 100%; }
      .v3-fbhero-tags span { font-size: 9.5px; padding: 5px 10px; }
    }
    .v3-mobile .v3-fbhero { aspect-ratio: 4 / 5; }
    .v3-mobile .v3-fbhero-grad {
      background:
        linear-gradient(180deg,
          rgba(var(--c-dark-rgb),0.20) 0%,
          rgba(var(--c-dark-rgb),0.50) 40%,
          rgba(var(--c-dark-rgb),0.92) 100%);
    }
    .v3-mobile .v3-fbhero-content {
      left: 6%; right: 6%; top: auto; bottom: 8%;
      transform: none; max-width: 100%;
    }
    .v3-mobile .v3-fbhero-h { font-size: clamp(34px, 9vw, 48px); }
    .v3-mobile .v3-fbhero-sub { font-size: 14.5px; max-width: 100%; }
    .v3-mobile .v3-fbhero-tags span { font-size: 9.5px; padding: 5px 10px; }
    /* === END FULL-BLEED HERO BREAK === */

    /* === BANDI AGRICOLI (Home) ====================================== */
    /* Sezione finanziamenti — su mobile: stack verticale con card lime,
       desktop: 4-col con divisori. */
    .v3-bandi-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
      padding: 40px 0;
      border-top: 1px solid rgba(255,255,255,0.10);
      border-bottom: 1px solid rgba(255,255,255,0.10);
    }
    .v3-bandi-cell {
      padding: 0 32px;
      border-right: 1px solid rgba(255,255,255,0.10);
    }
    .v3-bandi-cell:last-child { border-right: 0; }
    .v3-bandi-suffix {
      font-size: 0.32em; margin-left: 8px;
      color: var(--c-onDark-muted);
    }
    .v3-bandi-lbl {
      font-size: 15px; color: var(--c-onDark-muted);
      margin-top: 16px; letter-spacing: 0.04em;
    }
    @media (max-width: 760px) {
      .v3-bandi-grid {
        grid-template-columns: 1fr 1fr; gap: 12px;
        padding: 24px 0; border: 0;
      }
      .v3-bandi-cell {
        padding: 18px 14px;
        background: rgba(var(--c-accent-rgb),0.04);
        border: 1px solid rgba(var(--c-accent-rgb),0.14);
        border-radius: 14px;
      }
      .v3-bandi-cell .v3-stat-num { font-size: 32px !important; }
      .v3-bandi-suffix { font-size: 0.42em; margin-left: 4px; }
      .v3-bandi-lbl { font-size: 12px; margin-top: 10px; line-height: 1.35; }
    }
    .v3-mobile .v3-bandi-grid {
      grid-template-columns: 1fr 1fr; gap: 12px;
      padding: 24px 0; border: 0;
    }
    .v3-mobile .v3-bandi-cell {
      padding: 18px 14px;
      background: rgba(var(--c-accent-rgb),0.04);
      border: 1px solid rgba(var(--c-accent-rgb),0.14);
      border-radius: 14px;
    }
    .v3-mobile .v3-bandi-cell .v3-stat-num { font-size: 32px !important; }
    .v3-mobile .v3-bandi-suffix { font-size: 0.42em; margin-left: 4px; }
    .v3-mobile .v3-bandi-lbl { font-size: 12px; margin-top: 10px; line-height: 1.35; }
    /* === END BANDI AGRICOLI === */

    /* === HOME SATELLITE SCANNER (sostituisce mosaico cosa facciamo) ====== */
    /* Sfondo: foto reale satellite + campo. Scan-line orizzontale si muove
       sul campo, 3 POI essenziali (SAT/DASHBOARD/LAB) si illuminano.
       Stage 180vh pinned (130vh su mobile). */
    .hsc-stage { position: relative; height: 180vh; }
    .hsc-pin {
      position: sticky; top: 0; height: 100vh; width: 100%;
      overflow: hidden; background: var(--c-dark);
    }
    .hsc-bg {
      position: absolute; inset: 0;
      background-image: url('assets/img/satellite-scanner.jpg');
      background-size: cover; background-position: center;
    }
    .hsc-bg::after {
      content:''; position: absolute; inset: 0;
      background:
        linear-gradient(180deg, rgba(var(--c-dark-rgb),0.35) 0%, transparent 30%, rgba(var(--c-dark-rgb),0.55) 100%),
        radial-gradient(ellipse at 50% 100%, rgba(var(--c-dark-rgb),0.4), transparent 70%);
      pointer-events: none;
    }
    /* Vignette ai bordi per fondere la foto col bg del sito */
    .hsc-pin::before {
      content:''; position: absolute; inset: 0; pointer-events:none; z-index:2;
      background:
        radial-gradient(ellipse 90% 80% at center, transparent 50%, rgba(var(--c-dark-rgb),0.5) 100%);
    }

    /* Hero overlay — il titolo "Coltiviamo..." sopra la foto satellite */
    .hsc-hero {
      position: absolute;
      top: 88px; left: 40px; right: 40px;
      z-index: 8;
      pointer-events: auto;
      max-width: 1200px;
      padding: 18px 24px 28px;
      isolation: isolate;
    }
    /* Card-gradient leggermente più scuro dietro alle scritte per leggibilità.
       Sfumato per fondersi con la foto, con vignette inferiore più marcata. */
    .hsc-hero::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(180deg,
        rgba(var(--c-dark-rgb),0.10) 0%,
        rgba(var(--c-dark-rgb),0.55) 60%,
        rgba(var(--c-dark-rgb),0.85) 100%);
      border-radius: 16px;
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      z-index: -1;
      pointer-events: none;
    }
    .hsc-hero .hsc-h1 {
      font-family: var(--font-display);
      font-size: clamp(40px, 7.5vw, 112px);
      line-height: 0.92; letter-spacing: -0.04em;
      color: var(--c-onDark);
      margin: 0;
      max-width: 1200px;
      text-shadow: 0 2px 22px rgba(0,0,0,0.45);
    }
    .hsc-hero .hsc-h1 em {
      font-style: italic; color: var(--c-accent); font-weight: 300;
    }
    .hsc-hero-cta {
      display: grid; grid-template-columns: 1fr auto auto;
      gap: 28px; align-items: flex-end;
      margin-top: 32px; padding-top: 24px;
      border-top: 1px solid rgba(var(--c-accent-rgb),0.15);
      max-width: 920px;
    }
    .hsc-hero-cta p {
      font-size: 16px; line-height: 1.55;
      color: rgba(var(--c-onDark-rgb),0.86); margin: 0;
      max-width: 480px;
      text-shadow: 0 2px 12px rgba(0,0,0,0.35);
    }
    .hsc-hero-cta-btns { display: contents; }
    .hsc-scan-tag {
      position: absolute;
      top: -56px; right: 0;
      display: inline-flex; gap: 8px; align-items: center;
      font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .16em;
      text-transform: uppercase; color: var(--c-accent);
      padding: 6px 12px;
      background: rgba(var(--c-dark-rgb),0.6);
      border: 1px solid rgba(var(--c-accent-rgb),0.25);
      border-radius: 999px; backdrop-filter: blur(10px);
    }

    /* Scan line orizzontale (si muove con --scan-x) */
    .hsc-line {
      position: absolute; top: 0; bottom: 30%;
      left: var(--scan-x, 0%);
      width: 2px; transform: translateX(-1px);
      pointer-events: none; z-index: 4;
      background: linear-gradient(180deg,
        transparent 0%, rgba(var(--c-accent-rgb),0.85) 30%,
        var(--c-accent) 60%, rgba(var(--c-accent-rgb),0.85) 100%);
      box-shadow: 0 0 14px rgba(var(--c-accent-rgb),0.6),
                  0 0 38px rgba(var(--c-accent-rgb),0.3);
    }
    .hsc-line::before {
      content:''; position: absolute; top: 0; bottom: 0;
      left: -28px; right: -28px;
      background: linear-gradient(90deg,
        transparent 0%, rgba(var(--c-accent-rgb),0.10) 50%, transparent 100%);
    }

    /* POI sul campo */
    .hsc-poi-layer { position: absolute; inset: 0; pointer-events: none; z-index: 5; }
    .hsc-poi {
      position: absolute; transform: translate(-50%,-50%);
      width: 14px; height: 14px;
    }
    .hsc-poi .dot {
      position: absolute; inset: 0; border-radius: 50%;
      background: var(--c-accent);
      opacity: var(--poi-active, 0);
      transform: scale(var(--poi-scale, 0.6));
      transition: opacity .25s, transform .25s;
    }
    .hsc-poi .ring {
      position: absolute; inset: -6px;
      border: 1px solid rgba(var(--c-accent-rgb),0.55);
      border-radius: 50%;
      opacity: var(--poi-active, 0);
      animation: scn-poi-ring 1.6s ease-out infinite;
    }

    /* Chip metrica (clampati DENTRO il box dell'immagine) */
    .hsc-chip {
      position: absolute; transform: translate(-50%,-50%);
      padding: 8px 12px;
      background: rgba(var(--c-dark-rgb),0.85);
      border: 1px solid rgba(var(--c-accent-rgb),0.40);
      border-radius: 10px;
      font-family: var(--font-ui);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 12px 28px rgba(0,0,0,0.45);
      min-width: 130px; max-width: 38vw;
      opacity: var(--chip-opacity, 0);
      z-index: 6;
    }
    .hsc-chip-name {
      font-family: var(--font-mono); font-size: 9px;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(var(--c-accent-rgb),0.85); margin-bottom: 3px;
    }
    .hsc-chip-row { display: flex; align-items: baseline; gap: 8px; }
    .hsc-chip-sym {
      font-family: var(--font-display); font-style: italic;
      font-weight: 300; font-size: 22px; color: var(--c-accent);
      line-height: 1; letter-spacing: -0.02em;
    }
    .hsc-chip-val {
      font-family: var(--font-mono); font-size: 13px;
      color: var(--c-onDark); font-variant-numeric: tabular-nums;
    }
    .hsc-chip-unit {
      font-family: var(--font-mono); font-size: 10px;
      color: rgba(var(--c-onDark-rgb),0.55);
    }
    /* Hero text Home rimane sempre VISIBILE — chip dell'animazione vanno
       sotto, mai sopra al titolo "Coltiviamo il...". */
    .hsc-hero { z-index: 20 !important; }
    .hsc-chip { z-index: 6 !important; }
    .hsc-poi-layer { z-index: 5 !important; }
    /* Precisione: i chip restano sopra al field (no overlap con hero del sito) */
    .sat-chip { z-index: 14 !important; }
    .sat-poi-layer { z-index: 13 !important; }

    /* Caption */
    .hsc-caption {
      position: absolute; bottom: 60px; left: 50%;
      transform: translateX(-50%);
      max-width: min(640px, 92vw); width: 100%;
      text-align: center; padding: 0 24px;
      z-index: 8;
    }
    .hsc-cap-frame { position: relative; min-height: 92px; }
    .hsc-cap-frame > div { position: absolute; inset: 0; opacity: 0;
      transition: opacity 0.6s ease; }
    .hsc-cap-frame > div.on { opacity: 1; }
    .hsc-step {
      font-family: var(--font-mono); font-size: 11px;
      letter-spacing: 0.18em; color: var(--c-accent); margin-bottom: 10px;
    }
    .hsc-ttl {
      font-family: var(--font-display); font-style: italic;
      font-weight: 300; font-size: clamp(22px, 3vw, 34px);
      color: var(--c-onDark); margin: 0 0 8px;
      letter-spacing: -0.02em; line-height: 1.1;
    }
    .hsc-caption p {
      font-size: 13px; line-height: 1.5;
      color: var(--c-onDark-muted); max-width: 540px; margin: 0 auto;
    }

    /* Progress rail */
    .hsc-rail {
      position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%);
      width: min(360px, 60vw); height: 2px;
      background: rgba(var(--c-accent-rgb),0.16);
      border-radius: 999px; overflow: hidden; z-index: 8;
    }
    .hsc-rail span {
      display: block; height: 100%;
      background: linear-gradient(90deg, transparent, var(--c-accent));
    }

    @media (max-width: 720px) {
      .hsc-stage { height: 130vh; }
      /* Riadatto la foto satellite per mostrare il sat in alto a sinistra
         (su mobile portrait il cover ritaglia ai lati). */
      .hsc-bg { background-position: 30% 30%; }
      /* Più aria sopra al titolo per non farlo coprire dalla nav durante il pin */
      .hsc-hero { top: 110px; left: 18px; right: 18px; padding: 14px 18px 20px; }
      .hsc-hero::before { border-radius: 12px; }
      .hsc-hero .hsc-h1 { font-size: clamp(32px, 9vw, 48px); line-height: 0.96; }
      .hsc-hero-cta {
        grid-template-columns: 1fr; gap: 16px;
        margin-top: 18px; padding-top: 14px;
      }
      .hsc-hero-cta p { font-size: 13px; max-width: 100%; }
      .hsc-hero-cta-btns { display: flex; flex-wrap: wrap; gap: 8px; }
      .hsc-hero-cta-btns .v3-btn {
        flex: 1 1 auto; justify-content: center;
        min-width: 120px; padding: 10px 14px; font-size: 12.5px;
      }
      .hsc-scan-tag { top: -38px; font-size: 9.5px; padding: 4px 10px; }
      .hsc-chip { min-width: 78px; padding: 4px 7px; }
      .hsc-chip-name { font-size: 8px; letter-spacing: .14em; }
      .hsc-chip-sym { font-size: 14px; }
      .hsc-chip-val { font-size: 10px; }
      .hsc-chip-unit { font-size: 9px; }
      .hsc-caption { bottom: 50px; padding: 0 14px; }
      .hsc-cap-frame { min-height: 78px; }
      .hsc-step { font-size: 9.5px; margin-bottom: 6px; }
      .hsc-ttl { font-size: 16px; line-height: 1.15; margin-bottom: 4px; }
      .hsc-caption p { font-size: 11px; max-width: 100%; line-height: 1.45; }
      .hsc-rail { bottom: 18px; width: min(220px, 70vw); }
    }
    .v3-mobile .hsc-stage { height: 130vh; }
    .v3-mobile .hsc-bg { background-position: 30% 30%; }
    .v3-mobile .hsc-hero { top: 110px; left: 18px; right: 18px; padding: 14px 18px 20px; }
    .v3-mobile .hsc-hero::before { border-radius: 12px; }
    .v3-mobile .hsc-hero .hsc-h1 { font-size: clamp(32px, 9vw, 48px); line-height: 0.96; }
    .v3-mobile .hsc-hero-cta { grid-template-columns: 1fr; gap: 16px;
      margin-top: 18px; padding-top: 14px; }
    .v3-mobile .hsc-hero-cta p { font-size: 13px; max-width: 100%; }
    .v3-mobile .hsc-hero-cta-btns { display: flex; flex-wrap: wrap; gap: 8px; }
    .v3-mobile .hsc-hero-cta-btns .v3-btn {
      flex: 1 1 auto; justify-content: center;
      min-width: 120px; padding: 10px 14px; font-size: 12.5px;
    }
    .v3-mobile .hsc-scan-tag { top: -38px; font-size: 9.5px; padding: 4px 10px; }
    .v3-mobile .hsc-chip { min-width: 78px; padding: 4px 7px; }
    .v3-mobile .hsc-chip-name { font-size: 8px; }
    .v3-mobile .hsc-chip-sym { font-size: 14px; }
    .v3-mobile .hsc-chip-val { font-size: 10px; }
    .v3-mobile .hsc-chip-unit { font-size: 9px; }
    .v3-mobile .hsc-caption { bottom: 50px; padding: 0 14px; }
    .v3-mobile .hsc-cap-frame { min-height: 78px; }
    .v3-mobile .hsc-step { font-size: 9.5px; }
    .v3-mobile .hsc-ttl { font-size: 16px; line-height: 1.15; }
    .v3-mobile .hsc-caption p { font-size: 11px; max-width: 100%; }
    .v3-mobile .hsc-rail { bottom: 18px; width: min(220px, 70vw); }
    /* === END HOME SATELLITE SCANNER === */
    /* ─── END PORTED BLOCKS ─── */
`}</style>
);

window.V3GlobalStyle = V3GlobalStyle;

// === Reveal hook ===
const useReveal = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let io;
    const bind = () => {
      if (io) io.disconnect();
      const root = window.__scrollRoot || null;
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); } });
      }, { root, threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
      io.observe(el);
      // Fallback: if element is already visible at bind time, reveal immediately
      const r = el.getBoundingClientRect();
      const rh = root ? root.clientHeight : window.innerHeight;
      if (r.top < rh && r.bottom > 0) el.classList.add('in');
    };
    bind();
    window.addEventListener('__scrollRootChanged', bind);
    return () => { if (io) io.disconnect(); window.removeEventListener('__scrollRootChanged', bind); };
  }, []);
  return ref;
};
window.useReveal = useReveal;

// Reusable Reveal wrapper
const Reveal = ({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) => {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...rest.style }} {...rest}>
      {children}
    </Tag>
  );
};
window.Reveal = Reveal;

// Animated number counter
const Counter = ({ to = 100, suffix = '', duration = 1600, decimals = 0 }) => {
  const [v, setV] = React.useState(0);
  const ref = useReveal();
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let io;
    const bind = () => {
      if (io) io.disconnect();
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setV(to * eased);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      }, { root: window.__scrollRoot || null, threshold: 0.2 });
      io.observe(el);
    };
    bind();
    window.addEventListener('__scrollRootChanged', bind);
    return () => { if (io) io.disconnect(); window.removeEventListener('__scrollRootChanged', bind); };
  }, [to, duration]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
};
window.Counter = Counter;
