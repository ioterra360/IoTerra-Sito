// v3/pages/Precisione.jsx

const NDVIBig = () => {
  const cols = 16, rows = 10;
  const cells = [];
  for (let i = 0; i < cols * rows; i++) {
    const r = i % cols, c = Math.floor(i / cols);
    const v = (Math.sin(r*0.45+c*0.6) + Math.cos(r*0.3-c*0.5) + 2) / 4;
    const col = v > 0.65 ? 'var(--c-accent)' : v > 0.5 ? '#a8d63a' : v > 0.35 ? '#41a752' : v > 0.2 ? '#0b614e' : '#082e25';
    cells.push({ x: r, y: c, col, v, delay: (r+c) * 25 });
  }
  return (
    <svg viewBox="0 0 640 400" style={{width:'100%',height:'100%',display:'block'}}>
      {cells.map((c, i) => (
        <rect key={i} x={c.x*40} y={c.y*40} width={39} height={39} fill={c.col} opacity={0.6+c.v*0.4}>
          <animate attributeName="opacity" values={`0;${0.6+c.v*0.4};${0.6+c.v*0.4}`} dur="1.4s" begin={`${c.delay}ms`} fill="freeze"/>
        </rect>
      ))}
      <rect x="0" y="0" width="2" height="400" fill="var(--c-accent)" opacity="0.9">
        <animate attributeName="x" values="0;640;0" dur="6s" repeatCount="indefinite"/>
      </rect>
    </svg>
  );
};

const PagePrecisione = () => (
  <>
    <section className="v3-section" style={{paddingBottom:24}}>
      <div className="v3-section-narrow">
        <Reveal>          <h1 className="v3-h1">Agricoltura<br/>di <em>precisione.</em></h1>
          <p style={{fontSize:18,lineHeight:1.6,color:'var(--c-onDark-muted)',marginTop:32,maxWidth:820}}>
            L'agricoltura di precisione è un'opportunità unica per trasformare la tua azienda agricola: efficienza, risparmio e sostenibilità.
          </p>
        </Reveal>
      </div>
    </section>

    {/* HERO scroll-driven: satellite che scansiona il campo dall'alto */}
    <SatelliteScanHero/>

    <section className="v3-section">
      <div className="v3-section-narrow" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
        <Reveal>
          <div className="v3-card" style={{padding:40,height:'100%'}}>
            <p style={{fontSize:18,lineHeight:1.65,margin:0,fontFamily:'var(--font-display)',fontWeight:300,color:'var(--c-onDark)'}}>
              Tecnologie come <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>sensori, satelliti e monitoraggio in tempo reale</em>: ottimizziamo l'uso di acqua, fertilizzanti e fitofarmaci. Riduzione costi, miglioramento produttività.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="v3-card" style={{padding:40,height:'100%'}}>
            <p style={{fontSize:18,lineHeight:1.65,margin:0,fontFamily:'var(--font-display)',fontWeight:300,color:'var(--c-onDark)'}}>
              <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>Decisioni basate su dati certi</em>: rischio ridotto, margini di profitto aumentati. Mercati premium, immagine aziendale rafforzata.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* IOTERRA360 BLOCK */}
    <section style={{padding:'48px 0'}} id="ioterra360">
      <div className="v3-block" style={{padding:'80px 56px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:64,alignItems:'center',position:'relative',zIndex:1}}>
          <Reveal>
            <div className="v3-tag" style={{marginBottom:24}}><Icon name="window" size={12}/> SOFTWARE PROPRIETARIO</div>
            <h2 className="v3-h2"><em>IoTerra</em>360.</h2>
            <p style={{fontSize:19,lineHeight:1.7,marginTop:24,maxWidth:520}}>
              Il nostro software rende la gestione dei campi semplice e intuitiva, con dati in tempo reale dal tuo smartphone. Monitora colture, ottimizza irrigazione e altro con pochi click.
            </p>
            <a href="#/contatti" className="v3-btn v3-btn-accent" style={{marginTop:32}}>Scopri di più →</a>
          </Reveal>
          <Reveal delay={200}>
            <div style={{background:'rgba(0,0,0,0.3)',border:'1px solid rgba(var(--c-accent-rgb),0.15)',borderRadius:20,padding:24,height:480,display:'flex',flexDirection:'column',gap:16}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--c-onDark-muted)',letterSpacing:'.12em',textTransform:'uppercase'}}>
                <span>IoTerra360 · NDVI · Parcella 042</span>
                <span style={{color:'var(--c-accent)',display:'flex',gap:6,alignItems:'center'}}><span style={{width:6,height:6,background:'var(--c-accent)',borderRadius:'50%',animation:'blink 1.4s infinite'}}/>LIVE</span>
              </div>
              <div style={{flex:1,borderRadius:12,overflow:'hidden',background:'rgba(0,0,0,0.3)'}}><NDVIBig/></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
                {[{l:'Resa',v:'+18%'},{l:'Acqua',v:'−24%'},{l:'Fertiliz.',v:'−31%'}].map(s=>(
                  <div key={s.l} style={{padding:14,background:'rgba(var(--c-accent-rgb),0.06)',borderRadius:8,textAlign:'center'}}>
                    <div style={{fontSize:11,color:'var(--c-onDark-muted)'}}>{s.l}</div>
                    <div style={{fontFamily:'var(--font-display)',fontSize:28,color:'var(--c-accent)',marginTop:2,fontWeight:300}}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* TECNOLOGIE */}
    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}>TECNOLOGIE</div>
          <h2 className="v3-h2">Le migliori tecnologie<br/>a tua <em>disposizione.</em></h2>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {[
            {t:'IoTerra360', d:'Software proprietario per gestione dati e supporto decisioni', i:'app'},
            {t:'Satelliti', d:'Monitoraggio efficiente di ampie aree', i:'satellite'},
            {t:'Stazioni meteo', d:'Condizioni atmosferiche direttamente in campo', i:'weather'},
            {t:'Sensori suolo', d:"Acqua nel suolo e pianificazione irrigazione", i:'droplet'},
            {t:'Sensori colture', d:'Stato nutrizionale e fertilizzazione mirata', i:'plant'},
            {t:'Sensori insetti', d:'Popolazioni e pianificazione trattamenti', i:'bug'},
          ].map((c,i) => (
            <Reveal key={c.t} delay={i*80}>
              <div className="v3-card" style={{padding:32,height:'100%'}}>
                <div style={{width:48,height:48,background:'rgba(var(--c-accent-rgb),0.1)',border:'1px solid rgba(var(--c-accent-rgb),0.2)',borderRadius:'50%',marginBottom:24,display:'grid',placeItems:'center',color:'var(--c-accent)'}}><Icon name={c.i} size={20} stroke={1.5}/></div>
                <div style={{fontFamily:'var(--font-display)',fontSize:28,color:'var(--c-onDark)',fontWeight:400,letterSpacing:'-0.02em'}}>{c.t}</div>
                <p style={{fontSize:17,lineHeight:1.6,margin:'12px 0 0'}}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* CONFRONTO */}
    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}>VANTAGGI</div>
          <h2 className="v3-h2">I vantaggi della <em>precisione.</em></h2>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <Reveal>
            <div className="v3-card" style={{padding:36,height:'100%'}}>
              <h3 style={{fontFamily:'var(--font-display)',fontSize:24,fontWeight:400,letterSpacing:'-0.02em',margin:0,paddingBottom:16,borderBottom:'1px solid rgba(255,255,255,0.1)',color:'var(--c-onDark-muted)'}}>Agricoltura tradizionale</h3>
              <ul style={{listStyle:'none',padding:0,margin:'24px 0 0',display:'grid',gap:14}}>
                {['Uso meno preciso di risorse','Produzione variabile','Maggiore impatto ambientale','Rilevamento tardivo di problemi','Decisioni basate su esperienza'].map(li => <li key={li} style={{fontSize:17,paddingLeft:28,position:'relative',color:'var(--c-onDark-muted)',lineHeight:1.6}}><span style={{position:'absolute',left:0,top:'-2px',color:'#b3593a',fontSize:18,fontWeight:700}}>✘</span>{li}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="v3-card featured" style={{padding:36,height:'100%',background:'linear-gradient(160deg, rgba(var(--c-accent-rgb),0.12) 0%, rgba(var(--c-accent-rgb),0.04) 100%)',borderColor:'var(--c-accent)'}}>
              <h3 style={{fontFamily:'var(--font-display)',fontSize:24,fontWeight:400,letterSpacing:'-0.02em',margin:0,paddingBottom:16,borderBottom:'1px solid rgba(var(--c-accent-rgb),0.2)',color:'var(--c-onDark)'}}>Con <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>IoTerra</em></h3>
              <ul style={{listStyle:'none',padding:0,margin:'24px 0 0',display:'grid',gap:14}}>
                {['Uso mirato e ottimizzato','Maggiore resa, gestione precisa','Riduzione impatto ambientale','Monitoraggio continuo','Decisioni su dati real-time'].map(li => <li key={li} style={{fontSize:17,paddingLeft:28,position:'relative',color:'var(--c-onDark)',lineHeight:1.6}}><span style={{position:'absolute',left:0,top:0,color:'var(--c-accent)',fontWeight:700}}>✓</span>{li}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* PACCHETTI */}
    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{textAlign:'center',marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}><Icon name="layers" size={12}/> PACCHETTI</div>
          <h2 className="v3-h2">Scegli il <em>tuo.</em></h2>
        </Reveal>
        <div className="v3-pkg-grid">
          <Reveal><div className="v3-pkg" style={{height:'100%'}}>
            <div className="v3-pkg-tier">PACCHETTO 1</div><h3>Base</h3>
            <ul><li>IoTerra360 Base</li><li>Digitalizzazione aziendale</li><li>Monitoraggio satellitare</li><li>Mappe di prescrizione</li></ul>
            <a href="#/contatti" className="v3-btn v3-btn-ghost">Contattaci →</a>
          </div></Reveal>
          <Reveal delay={100}><div className="v3-pkg featured" style={{height:'100%'}}>
            <div className="v3-pkg-flag">Raccomandato</div>
            <div className="v3-pkg-tier">PACCHETTO 2</div><h3>Premium</h3>
            <ul><li>IoTerra360 Premium</li><li>Digitalizzazione aziendale</li><li>Monitoraggio satellitare</li><li>Mappe di prescrizione</li><li>Monitoraggio climatico Premium</li><li>Monitoraggio suolo Premium</li><li>Monitoraggio colturale Premium</li><li>Monitoraggio insetti Premium</li></ul>
            <a href="#/contatti" className="v3-btn v3-btn-accent">Contattaci →</a>
          </div></Reveal>
          <Reveal delay={200}><div className="v3-pkg" style={{height:'100%'}}>
            <div className="v3-pkg-tier">PACCHETTO 3</div><h3>All-Inclusive</h3>
            <ul><li>Supporto agronomico costante</li><li>Software custom per la tua azienda</li><li>Analisi chimico-fisiche in lab</li><li>Monitoraggio completo Premium</li><li>Mappe di prescrizione</li></ul>
            <a href="#/contatti" className="v3-btn v3-btn-ghost">Contattaci →</a>
          </div></Reveal>
        </div>
      </div>
    </section>

    <section className="v3-call-strip">
      <div>
        <h2>Vuoi <em style={{color:'var(--c-onDark)'}}>innovare</em> la tua azienda?</h2>
        <p>Chiama ora per introdurre strumenti di Agricoltura di Precisione: NDVI, mappe, sensori e analisi digitali per migliorare le decisioni.</p>
      </div>
      <div className="right">
        <a href="tel:+393665393733" className="phone">+39 366 539 3733</a>
        <a href="tel:+393665393733" className="v3-btn v3-btn-light">Chiama ora →</a>
      </div>
    </section>
  </>
);
window.PagePrecisione = PagePrecisione;
