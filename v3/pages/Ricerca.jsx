// v3/pages/Ricerca.jsx — Ricerca & Sviluppo per le aziende
const RD_IMG = {
  vertical: 'assets/img/vertical-farming.jpg',
  trays: 'assets/img/rd-trays.jpg',
  nasturzio: 'assets/img/rd-nasturzio.jpg',
  pisello: 'assets/img/rd-pisello.jpg',
  microgreens: 'assets/img/rd-microgreens.png',
};

const PageRicerca = () => (
  <>
    <section className="v3-page-hero">
      <div className="v3-page-hero-bg" style={{backgroundImage:`url(${RD_IMG.vertical})`}}/>
      <div className="v3-page-hero-content">
        <Reveal>          <h1 className="v3-h1">Ricerca<br/>& <em>Sviluppo.</em></h1>
          <p>
            Lavoriamo a fianco delle aziende agricole per studiare nuove soluzioni: prove di campo, sperimentazioni in laboratorio, analisi dati e sviluppo di prodotti e protocolli innovativi.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="v3-section" style={{paddingTop:24}}>
      <div className="v3-section-narrow">
        <Reveal>
          <div className="v3-card" style={{padding:48}}>
            <p style={{fontSize:18,lineHeight:1.7,margin:0,maxWidth:920,fontFamily:'var(--font-display)',fontWeight:300,color:'var(--c-onDark)'}}>
              Affianchiamo aziende, consorzi e centri di ricerca in progetti di innovazione: dalla definizione delle ipotesi al disegno sperimentale, dalla raccolta dati all'analisi statistica fino alla scrittura del report finale. <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>Metodo scientifico applicato al campo.</em>
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* HERO scroll-driven: fasi R&S su una pianta sperimentale */}
    <PlantScanHero/>

    {/* TRIPTYCH AMBITI */}
    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{marginBottom:32}}>
          <div className="v3-tag" style={{marginBottom:16}}>AMBITI DI LAVORO</div>
          <h2 className="v3-h2">Tre fronti, <em>un metodo.</em></h2>
        </Reveal>
        <div className="v3-img-trio" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
          {[
            { src: RD_IMG.trays, code: 'CAMPO · LAB', t: 'Prove sperimentali', d: 'Parcelle in campo aperto, serre e camere di crescita: condizioni controllate per testare ipotesi e quantificare gli effetti.' },
            { src: 'assets/img/confronti-varietali.jpg', code: 'COLTURE · CULTIVAR', t: 'Confronti varietali', d: 'Test di adattamento, resa, qualità e resilienza fra cultivar, ibridi e tecniche colturali su seminativi, ortive e arboree.' },
            { src: RD_IMG.nasturzio, code: 'INPUT · PROTOCOLLI', t: 'Validazione di prodotti', d: 'Biostimolanti, fertilizzanti, agrofarmaci, substrati, packaging: prove di efficacia e schede tecniche per l\'azienda.' },
          ].map((it,i) => (
            <Reveal key={it.code} delay={i*100}>
              <div className="v3-card" style={{padding:0,overflow:'hidden'}}>
                <div style={{aspectRatio:'4 / 5',overflow:'hidden',background:'#0a1f17'}}>
                  <img src={it.src} alt={it.t} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                </div>
                <div style={{padding:24}}>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.1em',color:'var(--c-accent)',marginBottom:8}}>{it.code}</div>
                  <h3 style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:24,fontWeight:300,marginBottom:8,color:'var(--c-onDark)'}}>{it.t}</h3>
                  <p style={{fontSize:15,lineHeight:1.5,margin:0,color:'var(--c-onDark-muted)'}}>{it.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}>COSA FACCIAMO</div>
          <h2 className="v3-h2">Quattro aree di <em>ricerca.</em></h2>
        </Reveal>
        <div style={{display:'grid',gap:16}}>
          {[
            { n:'01', t:'Prove di campo e sperimentazioni', d:'Disegno sperimentale rigoroso, parcelle dimostrative, test varietali e prove agronomiche su colture reali.', list:['Disegno sperimentale','Gestione parcelle e configurazioni','Rilievi periodici in campo','Analisi statistica dei dati','Report scientifici'] },
            { n:'02', t:'Innovazione di prodotto', d:'Sviluppo di nuovi protocolli colturali, biostimolanti, fertilizzanti, soluzioni biotech e fitopatologiche.', list:['Test di efficacia','Confronto formulati','Schede tecniche','Validazione in campo','Documentazione regolatoria'] },
            { n:'03', t:'Data science agronomica', d:'Analisi di dati eterogenei: agronomici, climatici, satellitari, IoT. Modelli predittivi e cruscotti decisionali.', list:['Pipeline di analisi dati','Modelli predittivi su rese','Telerilevamento e GIS','Dashboard e visualizzazioni','Integrazione con sensori IoT'] },
            { n:'04', t:'Progetti di filiera e sostenibilità', d:'Studi di tracciabilità, impatto ambientale, carbon footprint, biodiversità. Supporto a certificazioni e progetti europei.', list:['LCA e carbon footprint','Indicatori di sostenibilità','Tracciabilità di filiera','Stesura proposte progettuali','Reportistica per finanziamenti'] },
          ].map((s,i) => (
            <Reveal key={s.n} delay={i*100}>
              <div className="v3-card" style={{display:'grid',gridTemplateColumns:'140px 1fr 1.2fr',gap:48,padding:48,alignItems:'start'}}>
                <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:88,color:'var(--c-accent)',lineHeight:1,fontWeight:300}}>{s.n}</div>
                <div>
                  <h3 className="v3-h3" style={{fontSize:32,marginBottom:12}}>{s.t}</h3>
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

    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}>METODOLOGIA</div>
          <h2 className="v3-h2">Dal problema al <em>protocollo.</em></h2>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}} className="v3-stats-row">
          {[
            ['01','Briefing','Studio del fabbisogno aziendale, definizione degli obiettivi e delle ipotesi.'],
            ['02','Disegno','Protocollo sperimentale, scelta delle configurazioni, randomizzazione, calendario rilievi.'],
            ['03','Esecuzione','Conduzione delle prove in campo o in laboratorio, raccolta dati controllata.'],
            ['04','Analisi','Statistica, modelli, interpretazione e report finale con raccomandazioni.'],
          ].map(([n,h,d]) => (
            <Reveal key={n}>
              <div className="v3-card" style={{padding:24}}>
                <div style={{fontFamily:'var(--font-display)',fontSize:36,fontWeight:300,color:'var(--c-onDark)',lineHeight:1,marginBottom:12}}>{n}</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.1em',color:'var(--c-accent)',marginBottom:8}}>{h.toUpperCase()}</div>
                <div style={{fontSize:15,lineHeight:1.5,color:'var(--c-onDark-muted)'}}>{d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* FULL-BLEED IMAGE — pisello detail */}
    <section className="v3-section" style={{paddingTop:0,paddingBottom:0}}>
      <div style={{position:'relative',width:'100%',aspectRatio:'21 / 8',overflow:'hidden'}}>
        <img src={RD_IMG.pisello} alt="Parcella sperimentale di pisello — IoTerra Lab" style={{width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'saturate(1.05)'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(var(--c-dark-rgb),0.88) 0%,rgba(var(--c-dark-rgb),0.4) 50%,transparent 100%)'}}></div>
        <div style={{position:'absolute',left:'8%',top:'50%',transform:'translateY(-50%)',maxWidth:520}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.15em',color:'var(--c-accent)',marginBottom:16}}>● METODO SCIENTIFICO · CAMPO + LAB</div>
          <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:48,fontWeight:300,color:'#fff',lineHeight:1.05,letterSpacing:'-0.02em'}}>Dall'ipotesi<br/>al dato.</div>
          <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:16,letterSpacing:'0.05em'}}>DESIGN · RILIEVI · ANALISI · REPORT</div>
        </div>
      </div>
    </section>

    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{textAlign:'center',marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}><Icon name="layers" size={12}/> PACCHETTI</div>
          <h2 className="v3-h2">Tre <em>formule.</em></h2>
        </Reveal>
        <div className="v3-pkg-grid">
          <Reveal delay={0}><div className="v3-pkg" style={{height:'100%'}}>
            <div className="v3-pkg-tier">FORMULA 1</div><h3>Singola prova</h3>
            <ul><li>Disegno sperimentale dedicato</li><li>1 stagione o ciclo colturale</li><li>Rilievi standardizzati</li><li>Analisi statistica</li><li>Report finale</li></ul>
            <a href="#/contatti" className="v3-btn v3-btn-ghost">contattaci →</a>
          </div></Reveal>
          <Reveal delay={100}><div className="v3-pkg featured" style={{height:'100%'}}>
            <div className="v3-pkg-flag">Raccomandato</div>
            <div className="v3-pkg-tier">FORMULA 2</div><h3>Programma annuale</h3>
            <ul><li>Più prove coordinate</li><li>Confronto configurazioni multiple</li><li>Monitoraggio continuo</li><li>Analisi dati avanzata</li><li>Riunioni di avanzamento</li><li>Documentazione tecnica completa</li></ul>
            <a href="#/contatti" className="v3-btn v3-btn-accent">contattaci →</a>
          </div></Reveal>
          <Reveal delay={200}><div className="v3-pkg" style={{height:'100%'}}>
            <div className="v3-pkg-tier">FORMULA 3</div><h3>Progetto pluriennale</h3>
            <ul><li>R&D strutturata 2-4 anni</li><li>Team dedicato</li><li>Integrazione con bandi e finanziamenti</li><li>Pubblicazioni e divulgazione</li><li>Sviluppo prodotto / protocollo</li><li>Trasferimento tecnologico</li></ul>
            <a href="#/contatti" className="v3-btn v3-btn-ghost">contattaci →</a>
          </div></Reveal>
        </div>
      </div>
    </section>

    <section className="v3-call-strip">
      <div>
        <h2>Hai un'idea da <em style={{color:'var(--c-onDark)'}}>validare?</em></h2>
        <p>Ti aiutiamo a trasformarla in un protocollo di ricerca rigoroso, con dati e risultati misurabili.</p>
      </div>
      <div className="right">
        <div className="phone">+39 366 539 3733</div>
        <a href="tel:+393665393733" className="v3-btn v3-btn-light">Chiama ora →</a>
      </div>
    </section>
  </>
);
window.PageRicerca = PageRicerca;
