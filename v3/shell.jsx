// v3/shell.jsx — Nav + Footer condivisi
const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/servizi', label: 'Servizi', children: [
    { href: '/analisi-suolo', label: 'Analisi del suolo', tag: 'LAB · GIS' },
    { href: '/consulenza',    label: 'Consulenza agronomica', tag: 'PAC · CSR · BANDI' },
    { href: '/marketing',     label: 'Servizi Digitali', tag: 'WEB · APP · FULL-STACK' },
    { href: '/precisione',    label: 'Agricoltura di precisione', tag: 'IOT · SATELLITI · AI' },
    { href: '/ricerca',       label: 'Ricerca & Sviluppo', tag: 'LAB · PROVE · DATA' },
  ]},
  { href: '/contatti', label: 'Contatti' },
];

const Nav = ({ route }) => {
  const [open, setOpen] = React.useState(false);
  const [svcOpen, setSvcOpen] = React.useState(false);
  const svcTimerRef = React.useRef(null);
  React.useEffect(() => { setOpen(false); setSvcOpen(false); }, [route]);
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const openSvc = () => { clearTimeout(svcTimerRef.current); setSvcOpen(true); };
  const closeSvc = () => { svcTimerRef.current = setTimeout(()=>setSvcOpen(false), 200); };

  return (
    <>
      <nav className="v3-nav">
        <a href="/" className="v3-nav-logo">
          <img src="assets/logo-ioterra.svg" alt="" className="v3-nav-logo-img"/>
          <span className="v3-nav-logo-text">IoTerra</span>
        </a>
        <div className="v3-nav-mid">
          {NAV_ITEMS.map(n => {
            if (n.children) {
              const isActive = route === n.href || n.children.some(c => c.href === route);
              return (
                <div key={n.href} className="v3-nav-svc" onMouseEnter={openSvc} onMouseLeave={closeSvc}>
                  <button
                    className={`v3-nav-svc-btn ${isActive ? 'active' : ''}`}
                    onClick={()=>setSvcOpen(v=>!v)}
                    aria-expanded={svcOpen}
                  >
                    {n.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" style={{transform: svcOpen?'rotate(180deg)':'rotate(0)',transition:'transform .2s'}}><path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                  </button>
                  {svcOpen && (
                    <div className="v3-nav-dropdown">
                      <a href="/servizi" className="v3-nav-dropdown-all" onClick={()=>setSvcOpen(false)}>
                        <span>Tutti i servizi</span>
                        <span className="arrow">→</span>
                      </a>
                      <div className="v3-nav-dropdown-list">
                        {n.children.map(c => (
                          <a key={c.href} href={c.href} className={route===c.href?'active':''} onClick={()=>setSvcOpen(false)}>
                            <span className="lbl">{c.label}</span>
                            <span className="tag">{c.tag}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a key={n.href} href={n.href} className={route === n.href ? 'active' : ''}>{n.label}</a>
            );
          })}
        </div>
        <div className="v3-nav-right">
          <a href="tel:+393665393733" className="v3-btn v3-btn-ghost">+39 366 539 3733</a>
          <a href="/contatti" className="v3-btn v3-btn-light">Contattaci →</a>
          <button className="v3-nav-burger" aria-label="Menu" onClick={()=>setOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
          </button>
        </div>
      </nav>
      {open && (
        <div className="v3-mobile-menu">
          <div className="v3-mobile-menu-head">
            <a href="/" className="v3-nav-logo" onClick={()=>setOpen(false)}>
              <img src="assets/logo-ioterra-light.svg" alt="" className="v3-mobile-logo-img"/>
              <span>IoTerra</span>
            </a>
            <button className="close" aria-label="Chiudi" onClick={()=>setOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>
            </button>
          </div>

          <div className="v3-mobile-menu-meta">
            <span>● MENU</span>
            <span>{NAV_ITEMS.reduce((n,i)=>n+1+(i.children?.length||0),0).toString().padStart(2,'0')} VOCI</span>
          </div>

          <nav>
            {NAV_ITEMS.map((n, i) => (
              <React.Fragment key={n.href}>
                <a href={n.href} onClick={()=>setOpen(false)} className={`v3-mm-row ${route === n.href ? 'active' : ''}`}>
                  <em>0{i+1}</em>
                  <span>{n.label}</span>
                  <i className="arr">→</i>
                </a>
                {n.children && (
                  <div className="v3-mobile-menu-sub">
                    {n.children.map(c => (
                      <a key={c.href} href={c.href} onClick={()=>setOpen(false)} className={route===c.href?'active':''}>
                        <span className="lbl">{c.label}</span>
                        <span className="tag">{c.tag}</span>
                      </a>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="v3-mobile-menu-cta">
            <div className="v3-mm-cta-meta">● CONTATTACI</div>
            <a href="tel:+393665393733" className="v3-mm-phone">
              <Icon name="phone" size={14}/>
              <span>+39 366 539 3733</span>
            </a>
            <a href="/contatti" onClick={()=>setOpen(false)} className="v3-btn v3-btn-accent" style={{justifyContent:'center',padding:'16px'}}>Richiedi preventivo →</a>
            <div className="v3-mm-social">
              <a href="https://www.instagram.com/ioterra_360/" target="_blank" rel="noopener"><Icon name="instagram" size={14}/>Instagram</a>
              <a href="mailto:ioterraservizi@gmail.com"><Icon name="mail" size={14}/>Email</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Footer = () => (
  <footer className="v3-footer">
    <div className="v3-footer-top">
      <div className="v3-footer-brand">
        <div className="lg">
          <img src="assets/logo-ioterra-light.svg" alt="IoTerra" style={{height:36,width:'auto'}}/>
          <span>IoTerra</span>
        </div>
        <p style={{fontFamily:'var(--font-display)',fontWeight:300,fontSize:18,lineHeight:1.45,letterSpacing:'-0.01em',color:'var(--c-onDark)',marginBottom:14}}>
          Coltiviamo il futuro<br/>analizzando il presente.
        </p>
        <p style={{fontSize:13,lineHeight:1.6,color:'var(--c-onDark-muted)',margin:0,maxWidth:420}}>
          Studio agronomico con sede in Sardegna. Integriamo analisi di laboratorio, sensori IoT, satelliti e ricerca scientifica per portare l'agricoltura sarda nel futuro: dal singolo campione al campo intero.
        </p>
        <p style={{fontSize:13,lineHeight:1.6,color:'var(--c-onDark-muted)',margin:0,maxWidth:420}}>
          <span style={{color:'var(--c-onDark)'}}>Angelo Casula, Dottore Agronomo</span>, iscritto all'Ordine dei Dottori Agronomi e dei Dottori Forestali della Provincia di Sassari, n. 1083.
        </p>
      </div>
      <div>
        <h4>Servizi</h4>
        <ul>
          <li><a href="/analisi-suolo">Analisi del suolo</a></li>
          <li><a href="/consulenza">Consulenza agronomica</a></li>
          <li><a href="/marketing">Servizi Digitali</a></li>
          <li><a href="/precisione">Agricoltura di precisione</a></li>
          <li><a href="/ricerca">Ricerca & Sviluppo</a></li>
        </ul>
      </div>
      <div>
        <h4>Studio</h4>
        <ul>
          <li><a href="/contatti">Contatti</a></li>
          <li><a href="tel:+393665393733">+39 366 539 3733</a></li>
          <li><a href="mailto:ioterraservizi@gmail.com">ioterraservizi@gmail.com</a></li>
        </ul>
      </div>
      <div>
        <h4>Social</h4>
        <ul>
          <li><a href="https://www.instagram.com/ioterra_360/" target="_blank" rel="noopener" style={{display:'inline-flex',alignItems:'center',gap:8}}><Icon name="instagram" size={14}/>Instagram</a></li>
          <li><a href="https://www.google.com/search?sca_esv=5cb444661cf9bcf8&rlz=1CAXCFT_enIT1190IT1190&kgmid=/g/11zj8lslh2&q=IoTerra+-+Servizi+Agronomici&shndl=30&shem=bdslc,damc,lcuae,uaasie,shrtsdl&source=sh/x/loc/uni/m1/1&kgs=5e10c14b78610770" target="_blank" rel="noopener" style={{display:'inline-flex',alignItems:'center',gap:8}}><Icon name="google" size={14}/>Google</a></li>
        </ul>
      </div>
    </div>
    <div className="v3-footer-bot">
      <span>© IoTerra · <span style={{whiteSpace:'nowrap'}}>Angelo Casula, Dottore Agronomo</span> · <span style={{whiteSpace:'nowrap'}}>P.IVA 03034130900</span></span>
      <span>
        <a href="/privacy">Privacy</a> · <a href="/termini">Termini</a>
      </span>
    </div>
  </footer>
);

// Path-based routing (URL puliti tipo /servizi, /contatti).
// Listener:
//  - popstate: pulsanti back/forward del browser
//  - click globale su <a>: intercetta link interni e usa history.pushState
//    (no full reload). I link esterni / mailto: / tel: / target=_blank
//    bypassano l'intercettore.
const useRoute = () => {
  const [r, setR] = React.useState(window.location.pathname || '/');
  React.useEffect(() => {
    const sync = () => { setR(window.location.pathname || '/'); window.scrollTo(0, 0); };
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      // Salta esterni, ancore in-page, mailto/tel, target=_blank, download
      if (/^(https?:|mailto:|tel:|#)/i.test(href)) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download')) return;
      // Solo path-relative interni
      if (!href.startsWith('/')) return;
      e.preventDefault();
      if (href !== window.location.pathname) {
        window.history.pushState(null, '', href);
        sync();
      } else {
        // Stessa rotta → scroll-to-top liscio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('popstate', sync);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', sync);
      document.removeEventListener('click', onClick);
    };
  }, []);
  return r;
};

Object.assign(window, { Nav, Footer, useRoute });
