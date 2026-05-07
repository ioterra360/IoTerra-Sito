// v3/pages/Consulenza.jsx
const PageConsulenza = () => (
  <>
    <section className="v3-page-hero">
      <div className="v3-page-hero-bg" style={{backgroundImage:"url('assets/img/tablet-consulenza.jpg')"}}/>
      <div className="v3-page-hero-content">
        <Reveal>          <h1 className="v3-h1">Consulenza<br/><em>agronomica.</em></h1>
          <p>
            La consulenza agronomica è uno strumento strategico per migliorare la gestione delle attività agricole e garantire la sostenibilità economica, ambientale e produttiva.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="v3-section" style={{paddingTop:24}}>
      <div className="v3-section-narrow" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
        <Reveal delay={100}><div className="v3-card" style={{padding:36,height:'100%'}}><p style={{fontSize:18,lineHeight:1.55,margin:0,fontFamily:'var(--font-display)',fontWeight:300,color:'var(--c-onDark)'}}>Offriamo competenze specialistiche dal supporto normativo alla pianificazione strategica, rendendo la consulenza un <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>investimento prezioso</em>.</p></div></Reveal>
        <Reveal delay={200}><div className="v3-card" style={{padding:36,height:'100%'}}><p style={{fontSize:18,lineHeight:1.55,margin:0,fontFamily:'var(--font-display)',fontWeight:300,color:'var(--c-onDark)'}}>Sopralluoghi in campo per valutare colture e suolo. In caso di sintomi sospetti valutiamo <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>fitopatie, parassiti o carenze</em>.</p></div></Reveal>
      </div>
    </section>

    <section style={{padding:'24px 0'}}>
      <div className="v3-block" style={{padding:'80px 56px'}}>
        <Reveal style={{maxWidth:720,marginBottom:48,position:'relative',zIndex:1}}>
          <div className="v3-tag" style={{marginBottom:24}}><Icon name="euro" size={12}/> FINANZIAMENTI</div>
          <h2 className="v3-h2">Accesso ai finanziamenti <em>agricoli.</em></h2>
          <p style={{fontSize:19,lineHeight:1.6,marginTop:24}}>Ti guidiamo nella richiesta di contributi e finanziamenti, per ottimizzare le risorse economiche della tua azienda.</p>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,position:'relative',zIndex:1}}>
          {[
            {t:'PAC', d:'Consulenza per pagamenti diretti, eco-schemi e aiuti accoppiati.', i:'flag'},
            {t:'CSR', d:"Fondi per lo sviluppo rurale, misure agroambientali, modernizzazione.", i:'leaf'},
            {t:'Bandi', d:'Contributi locali e nazionali, individuazione e presentazione domande.', i:'doc'},
          ].map((c,i) => (
            <Reveal key={c.t} delay={i*120}>
              <div style={{padding:36,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'var(--radius)',height:'100%'}}>
                <div style={{width:44,height:44,background:'rgba(var(--c-accent-rgb),0.1)',border:'1px solid rgba(var(--c-accent-rgb),0.2)',borderRadius:'50%',marginBottom:20,display:'grid',placeItems:'center',color:'var(--c-accent)'}}><Icon name={c.i} size={18} stroke={1.5}/></div>
                <h3 style={{fontFamily:'var(--font-display)',fontSize:48,color:'var(--c-onDark)',margin:0,fontStyle:'italic',fontWeight:300}}>{c.t}</h3>
                <p style={{fontSize:17,lineHeight:1.6,marginTop:16}}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="v3-stats-row" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:64,paddingTop:48,borderTop:'1px solid rgba(255,255,255,0.1)',position:'relative',zIndex:1}}>
          {[
            {n:387,s:'Mld €',l:'PAC totale',d:0},
            {n:36,s:'Mld €',l:"Italia",d:0},
            {n:1.5,s:'Mld €',l:'CSR',d:1},
            {n:500,s:'/anno',l:'Bandi IT',d:0},
          ].map((x,i) => (
            <Reveal key={i} delay={i*100} style={{padding:'0 24px',borderRight:i<3?'1px solid rgba(255,255,255,0.1)':'none'}}>
              <div className="v3-stat-num" style={{fontSize:64}}><Counter to={x.n} decimals={x.d}/><span style={{fontSize:18,marginLeft:6,color:'var(--c-onDark-muted)'}}>{x.s}</span></div>
              <div style={{fontSize:15,color:'var(--c-onDark-muted)',marginTop:12}}>{x.l}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{textAlign:'center',marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}><Icon name="layers" size={12}/> PACCHETTI</div>
          <h2 className="v3-h2">Prenota la tua <em>consulenza.</em></h2>
          <p style={{fontSize:19,color:'var(--c-onDark-muted)',marginTop:16}}>La prima è gratuita.</p>
        </Reveal>
        <div className="v3-pkg-grid">
          {[
            {n:'01', t:'Consulenza generale', d:"Gestione della tua azienda agricola, decisioni informate basate su analisi approfondite."},
            {n:'02', t:'Consulenza normativa', d:"Conformità alle normative, accesso a finanziamenti e agevolazioni."},
            {n:'03', t:'Valutazione economica', d:"Valutazione e ottimizzazione della redditività, valore economico e sostenibilità."},
          ].map((p,i) => (
            <Reveal key={p.n} delay={i*100}>
              <div className={'v3-pkg ' + (p.featured?'featured':'')} style={{height:'100%'}}>
                {p.featured && <div className="v3-pkg-flag">Raccomandato</div>}
                <div className="v3-pkg-tier">PACCHETTO {p.n}</div>
                <h3>{p.t}</h3>
                <p className="v3-pkg-desc">{p.d}</p>
                <a href="#/contatti" className={'v3-btn ' + (p.featured?'v3-btn-accent':'v3-btn-ghost')}>contattaci →</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="v3-call-strip">
      <div>
        <h2>Serve una <em style={{color:'var(--c-onDark)'}}>consulenza?</em></h2>
        <p>Chiama ora per ricevere supporto professionale su PAC, CSR e principali bandi e finanziamenti agricoli.</p>
      </div>
      <div className="right">
        <div className="phone">+39 366 539 3733</div>
        <a href="tel:+393665393733" className="v3-btn v3-btn-light">Chiama ora →</a>
      </div>
    </section>
  </>
);
window.PageConsulenza = PageConsulenza;
