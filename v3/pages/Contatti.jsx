// v3/pages/Contatti.jsx
const ContactForm = () => {
  const [vals, setVals] = React.useState({nome:'', email:'', messaggio:'', accept:false});
  const [err, setErr] = React.useState(null);
  const submit = (e) => {
    e.preventDefault();
    setErr(null);
    if (!vals.nome.trim() || !vals.email.trim() || !vals.messaggio.trim()) {
      setErr('Compila nome, email e messaggio.'); return;
    }
    if (!vals.accept) {
      setErr('Devi accettare Privacy Policy e Termini.'); return;
    }
    // mailto: apre il client di posta con campi precompilati. Funziona ovunque
    // (Gmail web, Apple Mail, Outlook). L'utente conferma l'invio dal suo client.
    const subject = encodeURIComponent('Richiesta dal sito · ' + vals.nome);
    const body = encodeURIComponent(
      'Nome: ' + vals.nome + '\n' +
      'Email: ' + vals.email + '\n\n' +
      'Messaggio:\n' + vals.messaggio + '\n\n— Inviato dal modulo contatti di www.ioterra.it'
    );
    window.location.href = 'mailto:ioterraservizi@gmail.com?subject=' + subject + '&body=' + body;
  };
  const inp = (k) => (e) => setVals(v => ({...v, [k]: e.target.value}));
  return (
    <form className="v3-card" style={{padding:40}} onSubmit={submit}>
      <div style={{fontSize:11,letterSpacing:'.14em',marginBottom:8,color:'var(--c-accent)',fontWeight:600,textTransform:'uppercase',display:'inline-flex',alignItems:'center',gap:8}}><Icon name="mail" size={12}/> Modulo contatti</div>
      <h3 className="v3-h3" style={{fontSize:32,marginBottom:32}}>Scrivici un <em>messaggio</em></h3>
      {[
        {l:'Nome', k:'nome', p:'Scrivi il tuo nome…', type:'text'},
        {l:'Email', k:'email', p:'Scrivi la tua email…', type:'email'},
      ].map(f => (
        <div key={f.k} style={{marginBottom:20}}>
          <label style={{display:'block',fontSize:11,color:'var(--c-onDark-muted)',fontWeight:600,marginBottom:8,letterSpacing:'.08em',textTransform:'uppercase'}}>{f.l}</label>
          <input
            type={f.type}
            placeholder={f.p}
            value={vals[f.k]}
            onChange={inp(f.k)}
            required
            style={{width:'100%',background:'rgba(0,0,0,0.2)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:'14px 16px',fontFamily:'inherit',fontSize:17,outline:'none',color:'var(--c-onDark)',transition:'border-color .2s'}}
            onFocus={e=>e.target.style.borderColor='var(--c-accent)'}
            onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.1)'}/>
        </div>
      ))}
      <div style={{marginBottom:24}}>
        <label style={{display:'block',fontSize:11,color:'var(--c-onDark-muted)',fontWeight:600,marginBottom:8,letterSpacing:'.08em',textTransform:'uppercase'}}>Messaggio</label>
        <textarea
          rows={5}
          placeholder="Scrivi il tuo messaggio…"
          value={vals.messaggio}
          onChange={inp('messaggio')}
          required
          style={{width:'100%',background:'rgba(0,0,0,0.2)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:'14px 16px',fontFamily:'inherit',fontSize:17,outline:'none',color:'var(--c-onDark)',resize:'none'}}/>
      </div>
      <label style={{fontSize:12,color:'var(--c-onDark-muted)',display:'flex',gap:10,alignItems:'flex-start',marginBottom:16,lineHeight:1.5}}>
        <input
          type="checkbox"
          checked={vals.accept}
          onChange={e=>setVals(v=>({...v, accept:e.target.checked}))}
          style={{marginTop:3,accentColor:'var(--c-accent)'}}/>
        <span>Ho letto e accetto la <a href="#/privacy" style={{color:'var(--c-accent)'}}>Privacy Policy</a> e i <a href="#/termini" style={{color:'var(--c-accent)'}}>Termini e Condizioni</a></span>
      </label>
      {err && <div style={{padding:'10px 14px',background:'rgba(180,60,60,0.16)',border:'1px solid rgba(220,90,90,0.5)',borderRadius:8,color:'#ffb4b4',fontSize:13,marginBottom:14}}>{err}</div>}
      <button type="submit" className="v3-btn v3-btn-accent" style={{width:'100%',justifyContent:'center',padding:'16px'}}>Invia messaggio →</button>
      <div style={{fontSize:11,color:'var(--c-onDark-muted)',marginTop:14,textAlign:'center',lineHeight:1.5}}>
        Cliccando invia, si aprirà il tuo client di posta con il messaggio precompilato verso <a href="mailto:ioterraservizi@gmail.com" style={{color:'var(--c-accent)'}}>ioterraservizi@gmail.com</a>.
      </div>
    </form>
  );
};

const PageContatti = () => (
  <>
    <section className="v3-section" style={{paddingBottom:32}}>
      <div className="v3-section-narrow">
        <Reveal>
          <div className="v3-tag" style={{marginBottom:16}}>CONTATTI</div>
          <h1 className="v3-h1">Siamo qui<br/>per <em>supportarti.</em></h1>
          <p style={{fontSize:18,lineHeight:1.6,color:'var(--c-onDark-muted)',marginTop:32,maxWidth:720}}>
            Per qualsiasi domanda, richiesta di informazioni o per scoprire come le nostre soluzioni possano migliorare la tua azienda agricola, non esitare a contattarci. Siamo a tua disposizione per fornirti consulenza personalizzata.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="v3-section" style={{paddingTop:24}}>
      <div className="v3-section-narrow" style={{display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:48,alignItems:'start'}}>
        <Reveal style={{display:'grid',gap:12}}>
          {[
            {h:'Telefono',v:'+39 366 539 3733',href:'tel:+393665393733',i:'phone'},
            {h:'Email',v:'ioterraservizi@gmail.com',href:'mailto:ioterraservizi@gmail.com',i:'mail'},
            {h:'Instagram',v:'@ioterra_360',href:'https://www.instagram.com/ioterra_360/',i:'instagram'},
            {h:'Google',v:'IoTerra · Servizi Agronomici',href:'https://www.google.com/search?sca_esv=5cb444661cf9bcf8&rlz=1CAXCFT_enIT1190IT1190&kgmid=/g/11zj8lslh2&q=IoTerra+-+Servizi+Agronomici&shndl=30&shem=bdslc,damc,lcuae,uaasie,shrtsdl&source=sh/x/loc/uni/m1/1&kgs=5e10c14b78610770',i:'google'},
          ].map(c => {
            const Tag = c.href ? 'a' : 'div';
            return (
              <Tag key={c.h} {...(c.href?{href:c.href,target:c.href.startsWith('http')?'_blank':null,rel:'noopener'}:{})} className="v3-card" style={{display:'grid',gridTemplateColumns:'52px 1fr',gap:16,alignItems:'center',textDecoration:'none',color:'inherit',padding:'24px 28px'}}>
                <div style={{width:52,height:52,background:'rgba(var(--c-accent-rgb),0.1)',color:'var(--c-accent)',borderRadius:'50%',display:'grid',placeItems:'center',border:'1px solid rgba(var(--c-accent-rgb),0.2)'}}><Icon name={c.i} size={20}/></div>
                <div>
                  <div style={{fontSize:11,color:'var(--c-onDark-muted)',letterSpacing:'.1em',textTransform:'uppercase'}}>{c.h}</div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:24,marginTop:4,letterSpacing:'-0.01em',fontWeight:400,color:'var(--c-onDark)'}}>{c.v}</div>
                </div>
              </Tag>
            );
          })}
        </Reveal>

        <Reveal delay={150}>
          <ContactForm/>
        </Reveal>
      </div>
    </section>
  </>
);
window.PageContatti = PageContatti;
