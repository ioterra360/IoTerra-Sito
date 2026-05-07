// v3/pages/Home.jsx — Visual showpiece
const HOME_IMG = {
  hero: 'assets/img/agritech.jpg',
  field: 'assets/img/frumento.jpg',
  vine: 'assets/img/vigna.jpg',
  olive: 'assets/img/uliveto.jpg',
  tech: 'assets/img/iot.jpg',
  sardinia: 'assets/img/tablet-consulenza.jpg',
  hands: 'assets/img/soil-closeup.jpg',
  rd: 'assets/img/vertical-farming.jpg',
  smartphone: 'assets/img/smartphone-field.jpg',
};

// Mosaico scroll-driven: tech + natura
const MOSAIC = [
  { img: 'assets/img/agritech.jpg',         tag: 'DASHBOARD',     title: 'Il campo, in tasca.',          desc: 'Una piattaforma unica per dati di campo, mappe e supporto decisioni.', side: 'l', size: 'lg' },
  { img: 'assets/img/drone.jpg',            tag: 'DRONI',         title: 'Sguardo dall\'alto.',          desc: 'Voli con drone per mappature ad alta risoluzione di campi e impianti.', side: 'r', size: 'md' },
  { img: 'assets/img/satellite-1.jpg',      tag: 'SATELLITI',     title: 'Ogni 5 giorni, dal cielo.',    desc: 'Indici NDVI da Sentinel-2 per monitorare vigore vegetativo e stress.', side: 'l', size: 'md' },
  { img: 'assets/img/stazione-meteo.jpg',   tag: 'STAZIONI METEO',title: 'Sensori a terra.',             desc: 'Microclima, pioggia, umidità del suolo: dati locali per decisioni precise.', side: 'r', size: 'lg' },
  { img: 'assets/img/iot.jpg',              tag: 'LABORATORIO',   title: 'L\'analisi del suolo.',        desc: 'Analisi chimico-fisiche per pianificare concimazione e irrigazione.', side: 'l', size: 'md' },
];

const MosaicRow = ({ m, i }) => {
  const ref = React.useRef(null);
  const [t, setT] = React.useState(0); // 0 = sotto al viewport, 1 = già passato sopra

  React.useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Progresso locale dell'elemento: 0 quando il suo top tocca il fondo viewport,
      // 1 quando il suo bottom esce dal top viewport.
      const total = rect.height + vh;
      const seen = vh - rect.top;
      const p = Math.max(0, Math.min(1, seen / total));
      setT(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Reveal: opacità piena fra t=0.15 e t=0.85
  const reveal = Math.max(0, Math.min(1, (t - 0.1) / 0.25));
  const translate = (1 - reveal) * 60;
  const scale = 0.94 + reveal * 0.06;
  // Parallax interno immagine: range simmetrico [-20, 20]
  const imgY = (t - 0.5) * 40;

  return (
    <div ref={ref} className={`v3-mosaic-row v3-mosaic-${m.side} v3-mosaic-${m.size}`}
      style={{
        opacity: reveal,
        transform: `translateY(${translate}px) scale(${scale})`,
        transition: 'transform .15s linear, opacity .4s ease',
      }}
    >
      <div className="v3-mosaic-img">
        <img src={m.img} alt="" style={{transform:`translateY(${imgY}px) scale(1.15)`}}/>
        <div className="v3-mosaic-tag">{m.tag}</div>
        <div className="v3-mosaic-num">0{i+1}</div>
      </div>
      <div className="v3-mosaic-text">
        <h3 className="v3-h3">{m.title}</h3>
        <p>{m.desc}</p>
      </div>
    </div>
  );
};

const ScrollMosaic = () => (
  <section className="v3-mosaic">
    <Reveal style={{textAlign:'center', maxWidth: 880, margin: '0 auto 80px'}}>
      <div className="v3-tag" style={{marginBottom:20}}><Icon name="sliders" size={12}/> COSA FACCIAMO</div>
      <h2 className="v3-h2">Tecnologia<br/>al servizio della <em>terra.</em></h2>
      <p style={{fontSize:19,lineHeight:1.7,color:'var(--c-onDark-muted)',marginTop:24,maxWidth:640,marginLeft:'auto',marginRight:'auto'}}>
        Lab, droni, satelliti e stazioni meteo: gli strumenti con cui seguiamo le aziende agricole sarde, dal singolo campione al campo intero.
      </p>
    </Reveal>
    <div className="v3-mosaic-grid">
      {MOSAIC.map((m, i) => <MosaicRowAnimated key={i} m={m} i={i}/>)}
    </div>
  </section>
);

// Animated NDVI grid
// Scala colori coerente con la convenzione NDVI:
//   alto (vegetazione densa)  → verde scuro
//   medio                     → verde brand
//   basso / stress idrico     → giallino
const NDVIMap = () => {
  const cols = 14, rows = 8;
  const cells = [];
  for (let i = 0; i < cols * rows; i++) {
    const r = i % cols, c = Math.floor(i / cols);
    const v = (Math.sin(r*0.5+c*0.7) + Math.cos(r*0.3-c*0.4) + 2) / 4;
    const col = v > 0.7  ? '#0b614e'   // vigore alto  → verde scuro
              : v > 0.55 ? '#1f8a3a'   // alto-medio
              : v > 0.4  ? '#41a752'   // medio        → verde brand
              : v > 0.25 ? '#a8d63a'   // medio-basso  → lime
              :            '#d6c43a';  // stress       → giallino
    cells.push({ x: r, y: c, col, v, delay: (r+c) * 30 });
  }
  return (
    <svg viewBox="0 0 560 320" style={{width:'100%',height:'100%',display:'block'}}>
      {cells.map((c, i) => (
        <rect key={i} x={c.x*40} y={c.y*40} width={39} height={39} fill={c.col} opacity={0.5+c.v*0.5}>
          <animate attributeName="opacity" values={`0;${0.5+c.v*0.5};${0.5+c.v*0.5}`} dur="1.4s" begin={`${c.delay}ms`} fill="freeze"/>
        </rect>
      ))}
      {/* scan line */}
      <rect x="0" y="0" width="2" height="320" fill="var(--c-accent)" opacity="0.8">
        <animate attributeName="x" values="0;560;0" dur="6s" repeatCount="indefinite"/>
      </rect>
    </svg>
  );
};

// Rotating circular badge
const RotatingBadge = ({ text = 'IOTERRA · STUDIO AGRONOMICO · SARDEGNA · ' }) => (
  <div className="v3-badge">
    <svg viewBox="0 0 140 140" width="140" height="140">
      <defs><path id="circ" d="M 70,70 m -56,0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0"/></defs>
      <text fill="var(--c-accent)" fontSize="10" fontFamily="Inter" letterSpacing="3" fontWeight="600">
        <textPath href="#circ">{text.repeat(3)}</textPath>
      </text>
    </svg>
    <div className="v3-badge-center"><Icon name="leaf" size={20}/></div>
  </div>
);

const PageHome = () => (
  <>
    {/* HERO + SATELLITE SCANNER unificati: il titolo "Coltiviamo..." è
        sovrapposto fisso alla foto satellite, lo scanner si attiva con lo
        scroll. */}
    <HomeSatelliteScanner>
      <h1 className="v3-h1 v3-fadeUp hsc-h1" style={{fontWeight:200,lineHeight:0.92,animationDelay:'.3s'}}>
        <span style={{display:'block'}}>Coltiviamo il</span>
        <span style={{display:'block'}}>
          <ScrambleWord words={['futuro','raccolto','potenziale']}/>, analizzando
        </span>
        <span style={{display:'block',color:'var(--c-accent)'}}>il presente.</span>
      </h1>
      <div className="hsc-hero-cta v3-fadeUp" style={{animationDelay:'.7s'}}>
        <p>
          Studio agronomico che integra <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>analisi di laboratorio</em>, satelliti e IoT per portare l'agricoltura sarda nel futuro.
        </p>
        <div className="hsc-hero-cta-btns">
          <a href="#/servizi" className="v3-btn v3-btn-light">Esplora i servizi →</a>
          <a href="#/contatti" className="v3-btn v3-btn-ghost">Parla con noi</a>
        </div>
      </div>
    </HomeSatelliteScanner>

    {/* MANIFESTO + 3 IMG */}
    <section className="v3-section">
      <div className="v3-section-narrow" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'flex-end'}}>
        <Reveal>
          <div className="v3-tag" style={{marginBottom:24}}><Icon name="book" size={12}/> APPROCCIO</div>
          <h2 className="v3-h2">Tecnologia,<br/>scienza,<br/><em>innovazione.</em></h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{fontSize:18,lineHeight:1.7,color:'var(--c-onDark-muted)',margin:0}}>
            IoTerra è uno studio agronomico con sede in Sardegna che offre consulenza tecnica e soluzioni innovative per il settore agricolo. Integriamo <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>tecnologia avanzata</em>, ricerca scientifica e competenze agronomiche maturate sul campo.
          </p>
          <a href="#/contatti" className="v3-btn v3-btn-ghost" style={{marginTop:32}}>Parla con noi →</a>
        </Reveal>
      </div>
    </section>

    {/* SERVIZI griglia */}
    <section className="v3-section" style={{paddingTop:64}}>
      <div className="v3-section-narrow">
        <Reveal style={{textAlign:'center',marginBottom:88}}>
          <div className="v3-tag" style={{marginBottom:16}}>I NOSTRI SERVIZI</div>
          <h2 className="v3-h2" style={{fontSize:'clamp(34px, 9vw, 132px)', lineHeight:1.0, whiteSpace:'nowrap', letterSpacing:'-0.05em'}}>Pensati <em>per te.</em></h2>
        </Reveal>
        <div className="v3-svc-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {[
            { href:'#/analisi-suolo', img:HOME_IMG.hands, n:'01', tag:'Lab + GIS', title:'Analisi del', em:'suolo', desc:"Caratteristiche chimico-fisiche del suolo. Pianifichiamo fertilizzazione e irrigazione in modo preciso, ti aiutiamo nella scelta delle cultivar."},
            { href:'#/consulenza', img:HOME_IMG.sardinia, n:'02', tag:'PAC · CSR · Bandi', title:'Consulenza', em:'agronomica', desc:"Assistenza tecnica e consulenza a 360° in campo agricolo. Seguiamo la tua azienda dal punto di vista agronomico, normativo ed economico."},
            { href:'#/marketing', img:HOME_IMG.smartphone, n:'03', tag:'Web + App + Full-stack', title:'Servizi', em:'Digitali', desc:"Siti web dedicati, applicazioni full-stack e web app costruite su misura per il tuo business agricolo."},
            { href:'#/precisione', img:HOME_IMG.tech, n:'04', tag:'IoT + Satelliti + AI', title:'Agricoltura di', em:'precisione', desc:"Tecnologie avanzate per monitorare e ottimizzare le operazioni agricole. Aumentiamo la resa, riduciamo costi e impatto ambientale."},
            { href:'#/ricerca', img:HOME_IMG.rd, n:'05', tag:'Lab + Prove + Data', title:'Ricerca &', em:'Sviluppo', desc:"Affianchiamo aziende e centri di ricerca in progetti di innovazione: prove di campo, sperimentazioni in laboratorio, analisi dati e nuovi protocolli."},
          ].map((s,i) => (
            <Reveal key={i} delay={i*100}>
              <a href={s.href} className="v3-card" style={{textDecoration:'none',color:'inherit',display:'grid',gridTemplateRows:'200px 1fr',gap:24,padding:0,overflow:'hidden',height:'100%'}}>
                <div className="v3-img" style={{borderRadius:'var(--radius) var(--radius) 0 0',height:200}}>
                  <img src={s.img} alt=""/>
                  <div style={{position:'absolute',top:16,left:16,padding:'4px 12px',background:'rgba(var(--c-dark-rgb),0.7)',backdropFilter:'blur(8px)',borderRadius:999,fontSize:11,color:'var(--c-accent)',fontWeight:600,letterSpacing:'.08em',zIndex:2}}>{s.tag}</div>
                </div>
                <div style={{padding:'4px 32px 32px',display:'flex',flexDirection:'column',gap:16}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:36,color:'var(--c-onDark)',fontWeight:300,lineHeight:1}}>{s.n}</span>
                    <span style={{fontFamily:'var(--font-ui)',fontSize:11,letterSpacing:'.14em',color:'var(--c-onDark-muted)'}}>SVC · 0{s.n.replace('0','')}</span>
                  </div>
                  <h3 className="v3-h3">{s.title} <em>{s.em}</em></h3>
                  <p style={{fontSize:18.5,lineHeight:1.65,margin:0,color:'var(--c-onDark-muted)'}}>{s.desc}</p>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:16,borderTop:'1px solid rgba(255,255,255,0.08)',color:'var(--c-accent)',fontWeight:600,fontSize:18}}>
                    <span>Scopri di più</span><span style={{fontSize:18}}>→</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* IOTERRA360 + NDVI */}
    <section style={{padding:'48px 0'}}>
      <div className="v3-block">
        <div className="v3-iot360-grid">
          <Reveal className="iot360-text">
            <div className="v3-tag" style={{marginBottom:24}}><Icon name="window" size={12}/> SOFTWARE PROPRIETARIO</div>
            <h2 className="v3-h2"><em>IoTerra</em>360.</h2>
            <p style={{fontSize:19,lineHeight:1.7,marginTop:24,maxWidth:480}}>
              Il nostro software rende la gestione dei campi semplice e intuitiva: dati in tempo reale dal tuo smartphone, monitoraggio satellitare NDVI, sensori IoT e mappe di prescrizione. Tutto in un'unica dashboard.
            </p>
            <div className="iot360-stats">
              {[
                {l:'Resa media',       prefix:'+', to:18, suffix:'%'},
                {l:'Risparmio idrico', prefix:'−', to:24, suffix:'%'},
                {l:'Fertilizzanti',    prefix:'−', to:31, suffix:'%'},
                {l:'Tempo decisioni',  prefix:'−', to:60, suffix:'%'},
              ].map(x=>(
                <div key={x.l} className="iot360-stat">
                  <div className="v3-stat-num">
                    <CountUp prefix={x.prefix} to={x.to} suffix={x.suffix}/>
                  </div>
                  <div className="iot360-stat-lbl">{x.l}</div>
                </div>
              ))}
            </div>
            <a href="#/precisione" className="v3-btn v3-btn-accent" style={{marginTop:32,color:'var(--c-onDark)'}}>Esplora IoTerra360 →</a>
          </Reveal>
          <Reveal delay={200} className="iot360-map">
            <div className="iot360-map-card">
              <div className="iot360-map-head">
                <span>NDVI · Parcella 042 · 18,4 ha</span>
                <span className="iot360-live"><span className="dot"/>LIVE</span>
              </div>
              <div className="iot360-map-frame"><NDVIMap/></div>
              <div className="iot360-map-legend">
                <span><span className="sw" style={{background:'#0b614e'}}/>Vigore alto</span>
                <span><span className="sw" style={{background:'#41a752'}}/>Medio</span>
                <span><span className="sw" style={{background:'#d6c43a'}}/>Stress</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* STATS strip — finanziamenti */}
    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{maxWidth:720,marginBottom:64}}>
          <div className="v3-tag" style={{marginBottom:16}}><Icon name="euro" size={12}/> FINANZIAMENTI</div>
          <h2 className="v3-h2">Accesso ai bandi <em>agricoli.</em></h2>
        </Reveal>
        <div className="v3-bandi-grid">
          {[
            {n:387,s:'Mld €',l:'Stanziati per la PAC',d:0},
            {n:36,s:'Mld €',l:"Destinati all'Italia",d:1},
            {n:1.5,s:'Mld €',l:'Stanziati per il CSR',d:1},
            {n:500,s:'/anno',l:'Bandi aperti in Italia',d:0},
          ].map((x,i) => (
            <Reveal key={i} delay={i*120} className="v3-bandi-cell">
              <div className="v3-stat-num"><Counter to={x.n} decimals={x.d}/><span className="v3-bandi-suffix">{x.s}</span></div>
              <div className="v3-bandi-lbl">{x.l}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="v3-call-strip">
      <div>
        <h2>Pronto a portare la tua azienda nel <em style={{color:'var(--c-onDark)'}}>futuro?</em></h2>
        <p>La prima consulenza è gratuita: analizziamo le esigenze della tua azienda e costruiamo insieme la strategia agronomica più adatta.</p>
      </div>
      <div className="right">
        <a href="tel:+393665393733" className="phone">+39 366 539 3733</a>
        <a href="#/contatti" className="v3-btn v3-btn-light">Inizia ora →</a>
      </div>
    </section>
  </>
);
window.PageHome = PageHome;
window.HOME_IMG = HOME_IMG;
window.ScrollMosaic = ScrollMosaic;
window.NDVIMap = NDVIMap;
window.RotatingBadge = RotatingBadge;
