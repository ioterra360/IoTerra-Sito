// v3/pages/AnalisiSuolo.jsx
const PageAnalisiSuolo = () => (
  <>
    <section className="v3-page-hero">
      <div className="v3-page-hero-bg" style={{backgroundImage:"url('assets/img/lab.jpg')"}}/>
      <div className="v3-page-hero-content">
        <Reveal>
          <div className="v3-tag" style={{marginBottom:16}}>SERVIZIO 01</div>
          <h1 className="v3-h1">Analisi del<br/><em>suolo.</em></h1>
          <p>
            Analizzare il suolo della tua azienda ci permette di comprenderne le caratteristiche e pianificare in maniera precisa la fertilizzazione e la gestione idrica.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="v3-section" style={{paddingTop:24}}>
      <div className="v3-section-narrow" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
        <Reveal delay={100}>
          <div className="v3-card" style={{padding:36,height:'100%'}}>
            <p style={{fontSize:18,lineHeight:1.55,margin:0,fontFamily:'var(--font-display)',fontWeight:300,color:'var(--c-onDark)'}}>
              Conoscere quali nutrienti sono presenti permette di intervenire in modo mirato, riducendo gli sprechi. Ciò porta a una <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>riduzione dei costi</em> e minimizza l'impatto ambientale.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="v3-card" style={{padding:36,height:'100%'}}>
            <p style={{fontSize:18,lineHeight:1.55,margin:0,fontFamily:'var(--font-display)',fontWeight:300,color:'var(--c-onDark)'}}>
              Valutare struttura, profondità, drenaggio, pH e nutrienti è fondamentale <em style={{color:'var(--c-accent)',fontStyle:'italic'}}>prima di mettere a dimora una nuova coltura</em>. Ti aiutiamo a scegliere la cultivar più adatta al tuo terreno.
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* HERO scroll-driven: zolle che esplodono — appena prima del processo */}
    <SoilBlastHero/>

    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{marginBottom:48}}>
          <h2 className="v3-h2">Il <em>processo</em><br/>in tre fasi.</h2>
        </Reveal>
        <div style={{display:'grid',gap:16}}>
          {[
            {n:'01', title:'CAMPIONAMENTO', body:["I campioni sono rappresentativi della variabilità del tuo suolo. Tramite satelliti e Software GIS creiamo uno schema di prelievo ottimale.","Il campionamento è eseguito con trivella pedologica a diverse profondità a seconda della coltura, con raccolta multipla per affidabilità."]},
            {n:'02', title:'ANALISI IN LABORATORIO', body:["Un team di esperti svolge le analisi chimiche e fisiche necessarie."], list: ['Tessitura', 'pH', 'Sostanza Organica', 'Carbonio', 'Azoto', 'Fosforo', 'Basi (Ca, Mg, Na, K)', 'Carbonati', 'CSC', 'GSB']},
            {n:'03', title:'ELABORAZIONE DEI DATI', body:["Report completo sulla struttura e concentrazione di elementi nutritivi.","Tramite software specifici creiamo mappe rappresentative della variabilità per guidarti in irrigazione e fertilizzazione mirate."]},
          ].map((f,i) => (
            <Reveal key={f.n} delay={i*100}>
              <div className="v3-card" style={{display:'grid',gridTemplateColumns:'160px 1fr',gap:48,padding:48}}>
                <div>
                  <div style={{fontFamily:'var(--font-display)',fontStyle:'italic',fontSize:96,color:'var(--c-onDark)',lineHeight:1,fontWeight:300}}>{f.n}</div>
                  <div style={{fontFamily:'var(--font-ui)',fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--c-onDark-muted)',marginTop:8}}>FASE</div>
                </div>
                <div>
                  <h3 style={{fontFamily:'var(--font-ui)',fontSize:15,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--c-accent)',fontWeight:700,margin:'0 0 20px'}}>{f.title}</h3>
                  {f.body.map((p,j)=><p key={j} style={{fontSize:15,lineHeight:1.7,margin:'0 0 12px',color:'var(--c-onDark-muted)'}}>{p}</p>)}
                  {f.list && (
                    <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,marginTop:20}}>
                      {f.list.map(x => (
                        <div key={x} style={{padding:'10px 12px',background:'rgba(var(--c-accent-rgb),0.06)',border:'1px solid rgba(var(--c-accent-rgb),0.15)',borderRadius:8,fontSize:12,color:'var(--c-onDark)',textAlign:'center',fontWeight:500}}>{x}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="v3-section">
      <div className="v3-section-narrow">
        <Reveal style={{textAlign:'center',marginBottom:48}}>
          <div className="v3-tag" style={{marginBottom:16}}><Icon name="layers" size={12}/> PACCHETTI</div>
          <h2 className="v3-h2">Tre livelli di <em>profondità.</em></h2>
        </Reveal>
        <div className="v3-pkg-grid">
          <Reveal delay={0}>
            <div className="v3-pkg" style={{height:'100%'}}>
              <div className="v3-pkg-tier">PACCHETTO 1</div>
              <h3>Base</h3>
              <ul><li>Analisi del suolo</li><li>Elaborazione dati</li><li>Relazione agronomica</li></ul>
              <a href="#/contatti" className="v3-btn v3-btn-ghost">contattaci →</a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="v3-pkg featured" style={{height:'100%'}}>
              <div className="v3-pkg-flag">Raccomandato</div>
              <div className="v3-pkg-tier">PACCHETTO 2</div>
              <h3>Premium</h3>
              <ul><li>Analisi del suolo</li><li>Elaborazione dati</li><li>Relazione agronomica</li><li>Mappe di prescrizione</li><li>Monitoraggio satellitare</li></ul>
              <a href="#/contatti" className="v3-btn v3-btn-accent">contattaci →</a>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="v3-pkg" style={{height:'100%'}}>
              <div className="v3-pkg-tier">PACCHETTO 3</div>
              <h3>All-Inclusive</h3>
              <ul><li>Tutte le nostre tecnologie a tua disposizione, senza limiti!</li></ul>
              <a href="#/contatti" className="v3-btn v3-btn-ghost">contattaci →</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <section className="v3-call-strip">
      <div>
        <h2>Serve un'analisi del suolo <em style={{color:'var(--c-onDark)'}}>professionale?</em></h2>
        <p>Chiama ora per programmare il campionamento e ottenere un'analisi completa del suolo, con risultati chiari e una relazione agronomica.</p>
      </div>
      <div className="right">
        <div className="phone">+39 366 539 3733</div>
        <a href="tel:+393665393733" className="v3-btn v3-btn-light">Chiama ora →</a>
      </div>
    </section>
  </>
);
window.PageAnalisiSuolo = PageAnalisiSuolo;
