// v3/pages/Servizi.jsx
const SVC_IMG = {
  s1: 'assets/img/lab.jpg',
  s2: 'assets/img/uliveto.jpg',
  s3: 'assets/img/data.jpg',
  s4: 'assets/img/sensoristica.webp',
  s5: 'assets/img/rd-trays.jpg',
};

const PageServizi = () => (
  <>
    <section className="v3-section" style={{paddingTop:48,paddingBottom:24}}>
      <div className="v3-section-narrow">
        <Reveal>
          <div className="v3-tag" style={{marginBottom:16}}>SERVIZI</div>
          <h1 className="v3-h1" style={{maxWidth:1200}}>I nostri <em>servizi.</em><br/>Scegli quello che fa per te.</h1>
        </Reveal>
      </div>
    </section>

    <section className="v3-section" style={{paddingTop:16}}>
      <div className="v3-section-narrow" style={{display:'grid',gap:16}}>
        {[
          { href:'#/analisi-suolo', n:'01', img:SVC_IMG.s1, title:'Analisi del suolo', tag:'LAB · GIS · MAPPE', desc:"Caratteristiche chimico-fisiche del suolo. Pianifichiamo fertilizzazione e irrigazione in modo preciso, aiutandoti anche nella scelta delle cultivar."},
          { href:'#/consulenza', n:'02', img:SVC_IMG.s2, title:'Consulenza agronomica', tag:'PAC · CSR · BANDI', desc:"Assistenza tecnica e consulenza a 360° in campo agricolo. Seguiamo la tua azienda dal punto di vista agronomico, normativo ed economico."},
          { href:'#/marketing', n:'03', img:SVC_IMG.s3, title:'Servizi Digitali', tag:'WEB · APP · FULL-STACK', desc:"Siti web dedicati, applicazioni full-stack e web app costruite su misura per il tuo business agricolo. Trasformiamo i tuoi processi in strumenti digitali che funzionano davvero."},
          { href:'#/precisione', n:'04', img:SVC_IMG.s4, title:'Agricoltura di precisione', tag:'IOT · SATELLITI · AI', desc:"Tecnologie avanzate per monitorare e ottimizzare le operazioni agricole. Aumentiamo la resa, riduciamo costi e impatto ambientale."},
          { href:'#/ricerca', n:'05', img:SVC_IMG.s5, title:'Ricerca & Sviluppo', tag:'LAB · PROVE · DATA', desc:"Affianchiamo aziende e centri di ricerca in progetti di innovazione: prove di campo, sperimentazioni in laboratorio, analisi dati e sviluppo di prodotti."},
        ].map((s,i) => (
          <Reveal key={s.n} delay={i*100}>
            <a href={s.href} className="v3-card" style={{display:'grid',gridTemplateColumns:'180px 80px 1fr 80px',gap:32,alignItems:'center',textDecoration:'none',color:'inherit',padding:24}}>
              <div className="v3-img" style={{height:140,borderRadius:'calc(var(--radius) - 8px)'}}>
                <img src={s.img} alt=""/>
              </div>
              <div style={{fontFamily:'var(--font-display)',fontSize:56,color:'var(--c-accent)',fontStyle:'italic',fontWeight:300,lineHeight:1}}>{s.n}</div>
              <div>
                <div style={{fontSize:11,letterSpacing:'.12em',color:'var(--c-onDark-muted)',marginBottom:10,fontWeight:600}}>{s.tag}</div>
                <h3 className="v3-h3" style={{fontSize:36,marginBottom:12,color:'var(--c-onDark)'}}>{s.title}</h3>
                <p style={{fontSize:17,lineHeight:1.6,margin:0}}>{s.desc}</p>
              </div>
              <div style={{width:56,height:56,background:'var(--c-accent)',borderRadius:'50%',display:'grid',placeItems:'center',color:'var(--c-dark)',fontSize:18,justifySelf:'end',transition:'transform .3s'}}>→</div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="v3-call-strip">
      <div>
        <h2>Non sai da dove <em>cominciare?</em></h2>
        <p>Contattaci per una consulenza iniziale gratuita. Insieme costruiamo il percorso più adatto alla tua azienda.</p>
      </div>
      <div className="right">
        <div className="phone">+39 366 539 3733</div>
        <a href="#/contatti" className="v3-btn v3-btn-light">Parla con noi →</a>
      </div>
    </section>
  </>
);
window.PageServizi = PageServizi;
