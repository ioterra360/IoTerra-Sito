// v3/pages/Marketing.jsx — Servizi Digitali (siti web, full-stack, web app)
const DIG_IMG = {
  hero: 'assets/img/software-dashboard.jpg', // dashboard del software in tablet
  fullstack: 'assets/img/digital-hero-new.jpg', // ex-hero, ora in card full-stack
  monitor: 'assets/img/digital-2.png',
  services: 'assets/img/digital-webapp.jpg',
  banner: 'assets/img/digital-hero.png',
  bcs: 'assets/img/digital-bcs.jpg',
  post: 'assets/img/digital-post.png',
};

// Browser frame mockup component
const BrowserFrame = ({ url, children }) => (
  <div style={{borderRadius:14,overflow:'hidden',background:'#0e1f1a',border:'1px solid rgba(var(--c-accent-rgb),0.15)',boxShadow:'0 30px 60px -20px rgba(0,0,0,0.6)'}}>
    <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'#0a1814',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
      <div style={{display:'flex',gap:6}}>
        <div style={{width:10,height:10,borderRadius:'50%',background:'#ff5f57'}}/>
        <div style={{width:10,height:10,borderRadius:'50%',background:'#febc2e'}}/>
        <div style={{width:10,height:10,borderRadius:'50%',background:'#28c840'}}/>
      </div>
      <div style={{flex:1,background:'rgba(255,255,255,0.05)',borderRadius:6,padding:'4px 12px',fontFamily:'var(--font-mono)',fontSize:11,color:'rgba(255,255,255,0.5)',display:'flex',alignItems:'center',gap:6}}>
        <span style={{color:'var(--c-accent)'}}>●</span> {url || 'tuo-progetto.it'}
      </div>
    </div>
    {children}
  </div>
);

const PageMarketing = () => {
  // Animated counter for stats
  const [counters, setCounters] = React.useState({ load: 0, score: 0, mobile: 0 });
  const counterRef = React.useRef(null);

  React.useEffect(() => {
    let io;
    const bind = () => {
      if (io) io.disconnect();
      io = new IntersectionObserver((es) => {
        es.forEach(e => {
          if (e.isIntersecting) {
            const animate = (key, target, duration=1400) => {
              const start = performance.now();
              const step = (now) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                setCounters(c => ({ ...c, [key]: Math.round(target * eased * 10)/10 }));
                if (t < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            };
            animate('load', 1.2);
            animate('score', 98);
            animate('mobile', 100);
            io.disconnect();
          }
        });
      }, { root: window.__scrollRoot || null, threshold: 0.4 });
      if (counterRef.current) io.observe(counterRef.current);
    };
    bind();
    window.addEventListener('__scrollRootChanged', bind);
    return () => { if (io) io.disconnect(); window.removeEventListener('__scrollRootChanged', bind); };
  }, []);

  return (
  <>
    {/* HERO con immagine + glow animato */}
    <section className="v3-section" style={{paddingBottom:24,position:'relative',overflow:'hidden'}}>
      {/* Glow animato di sfondo */}
      <div style={{position:'absolute',top:'-20%',right:'-10%',width:'60%',height:'70%',background:'radial-gradient(circle,rgba(var(--c-accent-rgb),0.18) 0%,transparent 60%)',filter:'blur(40px)',pointerEvents:'none',animation:'pulse 8s ease-in-out infinite'}}/>
      <div className="v3-section-narrow" style={{position:'relative',zIndex:1}}>
        <Reveal>
          <div className="v3-tag" style={{marginBottom:16}}>SERVIZIO 03</div>
          <h1 className="v3-h1">Servizi<br/><em>Digitali.</em></h1>
          <p style={{fontSize:18,lineHeight:1.6,color:'var(--c-onDark-muted)',marginTop:32,maxWidth:820}}>
            Siti web dedicati, applicazioni full-stack e web app costruite su misura per il tuo business agricolo. Trasformiamo il tuo lavoro in strumenti digitali che funzionano davvero.
          </p>
        </Reveal>
      </div>
    </section>

    {/* HERO IMAGE — Browser mockup */}
    <section className="v3-section" style={{paddingTop:24,paddingBottom:24}}>
      <div className="v3-section-narrow">
        <Reveal>
          <div style={{position:'relative'}}>
            <BrowserFrame url="ioterra.it · live preview">
              <div style={{aspectRatio:'21 / 10',background:`url(${DIG_IMG.hero}) center/cover`,position:'relative'}}>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 60%,rgba(var(--c-dark-rgb),0.7) 100%)'}}/>
                <div style={{position:'absolute',left:24,bottom:20,display:'flex',gap:8,flexWrap:'wrap'}}>
                  <div style={{padding:'6px 12px',background:'rgba(var(--c-accent-rgb),0.18)',backdropFilter:'blur(8px)',border:'1px solid rgba(var(--c-accent-rgb),0.4)',borderRadius:999,fontFamily:'var(--font-mono)',fontSize:10,color:'var(--c-accent)',letterSpacing:'0.1em'}}>● LIVE · 99.9% UPTIME</div>
                  <div style={{padding:'6px 12px',background:'rgba(0,0,0,0.4)',backdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:999,fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(255,255,255,0.8)',letterSpacing:'0.1em'}}>SSL · CDN · GDPR</div>
                </div>
              </div>
            </BrowserFrame>
            {/* Floating badges */}
            <div style={{position:'absolute',top:-16,right:-8,padding:'10px 16px',background:'var(--c-accent)',color:'var(--c-dark)',borderRadius:12,fontFamily:'var(--font-mono)',fontSize:11,fontWeight:700,letterSpacing:'0.05em',transform:'rotate(3deg)',boxShadow:'0 12px 24px rgba(var(--c-accent-rgb),0.3)',animation:'float 4s ease-in-out infinite'}}>↑ +240% LEAD</div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* INTRO + Stats animate — riprogettata per leggibilità desktop e mobile */}
    <section className="v3-section v3-dig-intro" style={{paddingTop:24}} ref={counterRef}>
      <div className="v3-section-narrow">
        <Reveal>
          <div className="v3-card v3-dig-intro-card">
            {/* Decorative grid */}
            <div className="v3-dig-intro-grid"/>
            <div className="v3-dig-intro-row">
              <p className="v3-dig-intro-lead">
                Conosciamo il settore agricolo e sappiamo come tradurre i tuoi processi in software. Dal sito vetrina alla piattaforma gestionale, costruiamo prodotti <em>solidi, veloci e su misura</em>.
              </p>
              <div className="v3-dig-intro-stats">
                <div>
                  <div className="num">{counters.load.toFixed(1)}<span>s</span></div>
                  <div className="lbl">LOAD TIME</div>
                </div>
                <div>
                  <div className="num">{counters.score}</div>
                  <div className="lbl">LIGHTHOUSE</div>
                </div>
                <div>
                  <div className="num">{counters.mobile}<span>%</span></div>
                  <div className="lbl">MOBILE READY</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* COSA SVILUPPIAMO — con immagini */}
    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}>COSA SVILUPPIAMO</div>
          <h2 className="v3-h2">Tre direzioni di <em>sviluppo.</em></h2>
        </Reveal>
        <div style={{display:'grid',gap:16}}>
          {[
            { n:'01', img:DIG_IMG.bcs, t:'Siti web dedicati', d:'Siti professionali costruiti su misura per la tua azienda agricola. Veloci, mobile-ready, ottimizzati per essere trovati.', list:['Design e UX su misura','Pagine prodotto, storia, contatti','Gallery, moduli, prenotazioni','SEO tecnica e contenuti','Hosting e dominio inclusi'] },
            { n:'02', img:DIG_IMG.fullstack, t:'Applicazioni full-stack', d:'Software gestionali completi, dal database al frontend. Tutto quello che serve per digitalizzare flussi reali in azienda.', list:['Backend custom (Node, Python)','Database relazionali e cloud','API REST e integrazioni','Autenticazione e ruoli','Dashboard di gestione'] },
            { n:'03', img:DIG_IMG.services, t:'Web app per il business', d:'Strumenti operativi che vivono nel browser: portali clienti, gestionali colture, dashboard di monitoraggio, configuratori.', list:['Portali clienti e fornitori','Gestione campi e colture','Dashboard dati e KPI','Form complessi e workflow','PWA installabili su mobile'] },
          ].map((s,i) => (
            <Reveal key={s.n} delay={i*100}>
              <div className="v3-card v3-svc-row" style={{display:'grid',gridTemplateColumns:'320px 1fr 1fr',gap:32,padding:24,alignItems:'center'}}>
                <div style={{height:200,borderRadius:'calc(var(--radius) - 8px)',overflow:'hidden',background:'#0a1814',position:'relative'}}>
                  <img src={s.img} alt={s.t} style={{width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform .8s cubic-bezier(.2,.8,.2,1)'}}/>
                  <div style={{position:'absolute',top:12,left:12,padding:'4px 10px',background:'rgba(var(--c-dark-rgb),0.85)',backdropFilter:'blur(8px)',border:'1px solid rgba(var(--c-accent-rgb),0.3)',borderRadius:999,fontFamily:'var(--font-mono)',fontSize:10,color:'var(--c-accent)',letterSpacing:'0.1em'}}>{s.n}</div>
                </div>
                <div>
                  <h3 className="v3-h3" style={{fontSize:28,marginBottom:12}}>{s.t}</h3>
                  <p style={{fontSize:17,lineHeight:1.6,margin:0}}>{s.d}</p>
                </div>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'grid',gap:10}}>
                  {s.list.map(li => <li key={li} style={{fontSize:15,paddingLeft:22,position:'relative',lineHeight:1.5,color:'var(--c-onDark)'}}><span style={{position:'absolute',left:0,top:0,color:'var(--c-accent)',fontWeight:700}}>✓</span>{li}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* FULL-BLEED IMAGE BREAK */}
    <section className="v3-section" style={{paddingTop:0,paddingBottom:0}}>
      <div style={{position:'relative',width:'100%',aspectRatio:'21 / 8',overflow:'hidden'}}>
        <img src="assets/img/smartphone-field.jpg" alt="Smartphone in campo agricolo" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(var(--c-dark-rgb),0.92) 0%,rgba(var(--c-dark-rgb),0.5) 50%,transparent 100%)'}}/>
        <div style={{position:'absolute',left:'8%',top:'50%',transform:'translateY(-50%)',maxWidth:560}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.15em',color:'var(--c-accent)',marginBottom:16}}>● BUILD · DEPLOY · SCALE</div>
          <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:48,fontWeight:300,color:'#fff',lineHeight:1.05,letterSpacing:'-0.02em'}}>Il tuo lavoro,<br/>online.</div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:16,letterSpacing:'0.05em'}}>FRONTEND · BACKEND · CLOUD · MONITORING</div>
        </div>
      </div>
    </section>

    {/* STACK con cards più visive */}
    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}>STACK</div>
          <h2 className="v3-h2">Tecnologie <em>moderne.</em></h2>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}} className="v3-stats-row">
          {[
            { h:'Frontend', d:'React · Next.js · TypeScript', icon:'⌘'},
            { h:'Backend', d:'Node · Python · PostgreSQL', icon:'⚙'},
            { h:'Cloud', d:'AWS · Vercel · Cloudflare', icon:'☁'},
            { h:'Mobile', d:'PWA · React Native', icon:'◳'},
          ].map(({h,d,icon}, i) => (
            <Reveal key={h} delay={i*80}>
              <div className="v3-card v3-stack-card" style={{padding:24,position:'relative',overflow:'hidden',transition:'transform .3s,border-color .3s'}}>
                <div style={{fontSize:32,color:'var(--c-accent)',opacity:0.6,marginBottom:16,fontFamily:'var(--font-mono)'}}>{icon}</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.1em',color:'var(--c-accent)',marginBottom:8}}>{h.toUpperCase()}</div>
                <div style={{fontSize:17,lineHeight:1.5,color:'var(--c-onDark)'}}>{d}</div>
                {/* Bottom accent line */}
                <div style={{position:'absolute',bottom:0,left:0,height:2,width:0,background:'var(--c-accent)',transition:'width .4s'}} className="v3-stack-bar"/>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* PACCHETTI */}
    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{textAlign:'center',marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}><Icon name="layers" size={12}/> PACCHETTI</div>
          <h2 className="v3-h2">Tre <em>pacchetti.</em></h2>
        </Reveal>
        <div className="v3-pkg-grid">
          <Reveal delay={0}><div className="v3-pkg" style={{height:'100%'}}>
            <div className="v3-pkg-tier">PACCHETTO 1</div><h3>Sito vetrina</h3>
            <ul><li>Design su misura, 4-6 sezioni</li><li>Mobile-first, performance ottimizzate</li><li>SEO base e Google My Business</li><li>Hosting e dominio inclusi</li><li>Manutenzione 6 mesi</li></ul>
            <a href="#/contatti" className="v3-btn v3-btn-ghost">contattaci →</a>
          </div></Reveal>
          <Reveal delay={100}><div className="v3-pkg featured" style={{height:'100%'}}>
            <div className="v3-pkg-flag">Raccomandato</div>
            <div className="v3-pkg-tier">PACCHETTO 2</div><h3>Web app</h3>
            <ul><li>App custom installabile (PWA)</li><li>Frontend React/Next.js</li><li>Backend Node o Python + DB</li><li>Autenticazione e ruoli</li><li>Dashboard e gestione dati</li><li>Deploy su cloud + monitoring</li></ul>
            <a href="#/contatti" className="v3-btn v3-btn-accent">contattaci →</a>
          </div></Reveal>
          <Reveal delay={200}><div className="v3-pkg" style={{height:'100%'}}>
            <div className="v3-pkg-tier">PACCHETTO 3</div><h3>Full-stack su misura</h3>
            <ul><li>Analisi processi e architettura</li><li>Backend completo + API</li><li>Frontend custom + UX studiata</li><li>Integrazioni esterne (ERP, IoT, GIS)</li><li>Sviluppo iterativo a sprint</li><li>Manutenzione e SLA</li></ul>
            <a href="#/contatti" className="v3-btn v3-btn-ghost">contattaci →</a>
          </div></Reveal>
        </div>
      </div>
    </section>

    <section className="v3-call-strip">
      <div>
        <h2>Vuoi un sito o un'app <em style={{color:'var(--c-onDark)'}}>su misura?</em></h2>
        <p>Raccontaci il progetto e costruiamo insieme la versione digitale del tuo business.</p>
      </div>
      <div className="right">
        <div className="phone">+39 366 539 3733</div>
        <a href="tel:+393665393733" className="v3-btn v3-btn-light">Chiama ora →</a>
      </div>
    </section>
  </>
  );
};
window.PageMarketing = PageMarketing;
