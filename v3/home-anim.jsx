// v3/home-anim.jsx — animazioni tech per la Home
// (componenti React puri, no librerie esterne)

// ============================================================
// 1) SCRAMBLE TEXT — testo che cicla con effetto "decrypt"
// ============================================================
const ScrambleWord = ({ words, intervalMs = 2800, scrambleMs = 600 }) => {
  const [idx, setIdx] = React.useState(0);
  const [display, setDisplay] = React.useState(words[0]);
  const charsRef = React.useRef('AGRO•TECH·LAB·DATA·IOT·SAT·∇∂∑');

  React.useEffect(() => {
    let raf, scrambleTimer;
    const tick = () => {
      const next = (idx + 1) % words.length;
      const target = words[next];
      const startLen = display.length;
      const targetLen = target.length;
      const maxLen = Math.max(startLen, targetLen);
      const start = performance.now();

      const step = (t) => {
        const p = Math.min((t - start) / scrambleMs, 1);
        let out = '';
        for (let i = 0; i < maxLen; i++) {
          if (i < p * maxLen) {
            out += target[i] || '';
          } else {
            out += charsRef.current[Math.floor(Math.random() * charsRef.current.length)];
          }
        }
        setDisplay(out);
        if (p < 1) raf = requestAnimationFrame(step);
        else { setIdx(next); setDisplay(target); }
      };
      raf = requestAnimationFrame(step);
    };
    scrambleTimer = setTimeout(tick, intervalMs);
    return () => { clearTimeout(scrambleTimer); cancelAnimationFrame(raf); };
  }, [idx]);

  return <em style={{fontStyle:'italic'}}>{display}</em>;
};

// ============================================================
// 2) HUD SENSORS — pannello dati live
// ============================================================
const HudSensors = () => {
  // Valori plausibili per una serra in Sardegna a metà mattina:
  // T° 22°C, UR 64%, PAR ~1100 μmol·m⁻²·s⁻¹, DLI accumulato 14.2 mol·m⁻²·d⁻¹
  const [vals, setVals] = React.useState({ t: 22.1, ur: 64, par: 1180, dli: 14.2 });
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  React.useEffect(() => {
    const id = setInterval(() => {
      setVals(v => ({
        // temperatura aria: deriva piccola, range serra 18-28°C
        t:   +clamp(v.t   + (Math.random() - 0.5) * 0.2, 18, 28).toFixed(1),
        // umidità relativa: range 55-78%
        ur:  Math.round(clamp(v.ur  + (Math.random() - 0.5) * 1.4, 55, 78)),
        // PAR (radiazione fotosint.): variabile per nuvolosità, range 600-1800
        par: Math.round(clamp(v.par + (Math.random() - 0.5) * 60, 600, 1800)),
        // DLI: integrale giornaliero, sale lentamente, max ~22 mol/m²/d
        dli: +clamp(v.dli + Math.random() * 0.06, 0, 22).toFixed(1),
      }));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const Row = ({ k, v, u, w }) => (
    <div style={{display:'grid',gridTemplateColumns:'30px 1fr auto',gap:8,alignItems:'baseline',fontFamily:'var(--font-mono)',fontSize:9.5,padding:'5px 0',borderBottom:'1px dashed rgba(var(--c-accent-rgb),0.12)'}}>
      <span style={{color:'var(--c-accent)',opacity:0.6,letterSpacing:'.06em'}}>{k}</span>
      <span style={{display:'block',height:2,background:'rgba(var(--c-accent-rgb),0.08)',borderRadius:2,position:'relative'}}>
        <span style={{position:'absolute',left:0,top:0,bottom:0,width:`${w}%`,background:'var(--c-accent)',borderRadius:2,transition:'width .8s cubic-bezier(.2,.8,.2,1)'}}/>
      </span>
      <span style={{color:'var(--c-onDark)',fontWeight:500,minWidth:38,textAlign:'right',fontSize:10}}>{v}<span style={{color:'var(--c-onDark-muted)',marginLeft:2,fontSize:8}}>{u}</span></span>
    </div>
  );

  return (
    <div className="v3-hud-sensors v3-hero-overlay" style={{
      position:'absolute',top:24,right:24,zIndex:5,
      width:218,padding:'10px 13px 8px',
      background:'rgba(4,32,26,0.55)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      border:'1px solid rgba(var(--c-accent-rgb),0.18)',
      borderRadius:12,
      boxShadow:'0 12px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(var(--c-accent-rgb),0.06)',
      pointerEvents:'none',
      animation:'fadeUp 1.2s 1.2s cubic-bezier(.2,.8,.2,1) both',
    }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6,fontFamily:'var(--font-mono)',fontSize:8.5,letterSpacing:'.14em',color:'var(--c-accent)'}}>
        <span style={{display:'flex',gap:5,alignItems:'center'}}>
          <span style={{width:5,height:5,background:'var(--c-accent)',borderRadius:'50%',animation:'pulse 1.6s ease-in-out infinite'}}/>
          IOT · LIVE
        </span>
        <span style={{opacity:0.5}}>SRD·39N</span>
      </div>
      {/* barre normalizzate sui range fisiologici colturali */}
      <Row k="T°"   v={vals.t.toFixed(1)}    u="°C"    w={clamp((vals.t-15)/15*100, 0, 100)}/>
      <Row k="UR"   v={vals.ur}   u="%"     w={vals.ur}/>
      <Row k="PAR"  v={vals.par}  u="μmol"  w={vals.par/2000*100}/>
      <Row k="DLI"  v={vals.dli}  u="mol/d" w={vals.dli/22*100}/>
      <div style={{marginTop:4,display:'flex',justifyContent:'space-between',fontFamily:'var(--font-mono)',fontSize:8,color:'var(--c-onDark-muted)',opacity:0.6,letterSpacing:'.1em'}}>
        <span>NODE·07</span>
        <span>↑ 9.41</span>
      </div>
    </div>
  );
};

// ============================================================
// 3) SCAN LINE — riga lime che scorre verticalmente sull'hero
// ============================================================
const HeroScanLine = () => (
  <div aria-hidden="true" className="v3-hero-overlay" style={{
    position:'absolute',inset:0,zIndex:3,pointerEvents:'none',overflow:'hidden',mixBlendMode:'screen',
  }}>
    <div style={{
      position:'absolute',left:0,right:0,height:80,
      background:'linear-gradient(180deg, transparent 0%, rgba(var(--c-accent-rgb),0.08) 50%, transparent 100%)',
      animation:'scanLine 7s linear infinite',
    }}/>
    <style>{`
      @keyframes scanLine {
        0%   { transform: translateY(-80px); }
        100% { transform: translateY(100vh); }
      }
    `}</style>
  </div>
);

// ============================================================
// 4) DOT GRID REATTIVO AL MOUSE
// ============================================================
const ReactiveDotGrid = () => {
  const cvsRef = React.useRef(null);
  const mouseRef = React.useRef({ x: -9999, y: -9999 });

  React.useEffect(() => {
    const cvs = cvsRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf;

    const resize = () => {
      const r = cvs.getBoundingClientRect();
      cvs.width = r.width * dpr;
      cvs.height = r.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const r = cvs.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    cvs.parentElement.addEventListener('mousemove', onMove);
    cvs.parentElement.addEventListener('mouseleave', onLeave);

    const SPACING = 28;
    const RADIUS = 140;

    const draw = () => {
      const r = cvs.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      const { x: mx, y: my } = mouseRef.current;
      for (let x = SPACING / 2; x < r.width; x += SPACING) {
        for (let y = SPACING / 2; y < r.height; y += SPACING) {
          const dx = x - mx, dy = y - my;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const t = Math.max(0, 1 - dist / RADIUS);
          const alpha = 0.05 + t * 0.45;
          const size = 1 + t * 1.6;
          ctx.fillStyle = `rgba(var(--c-accent-rgb),${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      cvs.parentElement.removeEventListener('mousemove', onMove);
      cvs.parentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas ref={cvsRef} aria-hidden="true" className="v3-hero-overlay" style={{
      position:'absolute',inset:0,width:'100%',height:'100%',zIndex:2,
      pointerEvents:'none',mixBlendMode:'screen',
    }}/>
  );
};

// ============================================================
// 5) COUNT-UP — numeri che salgono quando entrano in viewport
// ============================================================
const CountUp = ({ to, prefix = '', suffix = '', duration = 1400, decimals = 0 }) => {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    if (!ref.current) return;
    let obs;
    const bind = () => {
      if (obs) obs.disconnect();
      obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (t) => {
              const p = Math.min((t - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(to * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      }, { root: window.__scrollRoot || null, threshold: 0.4 });
      obs.observe(ref.current);
    };
    bind();
    window.addEventListener('__scrollRootChanged', bind);
    return () => { if (obs) obs.disconnect(); window.removeEventListener('__scrollRootChanged', bind); };
  }, [to, duration]);

  const formatted = decimals > 0 ? val.toFixed(decimals) : Math.round(val);
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
};

// ============================================================
// 6) COORDINATE BADGE — angolo hero, in stile mappa
// ============================================================
const CoordBadge = () => (
  <div className="v3-hero-overlay" style={{
    position:'absolute',top:32,left:32,zIndex:5,
    fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'.14em',
    color:'var(--c-accent)',opacity:0.85,
    display:'flex',flexDirection:'column',gap:2,
    pointerEvents:'none',
    animation:'fadeUp 1.2s 1.0s cubic-bezier(.2,.8,.2,1) both',
  }}>
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <span style={{width:6,height:6,background:'var(--c-accent)',borderRadius:'50%',animation:'pulse 1.6s ease-in-out infinite'}}/>
      <span>SARDEGNA · OLB</span>
    </div>
    <div style={{opacity:0.7,paddingLeft:14,fontSize:9.5}}>40°55'N · 9°30'E</div>
    <div style={{opacity:0.45,paddingLeft:14,fontSize:9.5}}>ALT 35m · UTC+1</div>
  </div>
);

window.ScrambleWord = ScrambleWord;
window.HudSensors = HudSensors;
window.HeroScanLine = HeroScanLine;
window.ReactiveDotGrid = ReactiveDotGrid;
window.CountUp = CountUp;
window.CoordBadge = CoordBadge;

// ============================================================
// 7) HUD SENSORS GENERICO — accetta una config di metriche
// Ogni metrica: { k, base, unit, min, max, drift, decimals, mode? }
//   mode: 'oscillate' (default) | 'integrate' (sale lentamente) | 'static'
// ============================================================
const clampN = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const HudPanel = ({ title = 'IOT-SENSOR · LIVE', node = 'NODE·07', metrics, ts = '↑ 9.41' }) => {
  const [vals, setVals] = React.useState(() => metrics.map(m => m.base));
  React.useEffect(() => {
    const id = setInterval(() => {
      setVals(curr => curr.map((v, i) => {
        const m = metrics[i];
        if (m.mode === 'static') return v;
        if (m.mode === 'integrate') {
          return +clampN(v + Math.random() * (m.drift || 0.05), m.min, m.max).toFixed(m.decimals ?? 1);
        }
        const next = v + (Math.random() - 0.5) * (m.drift || 0.5);
        return +clampN(next, m.min, m.max).toFixed(m.decimals ?? 1);
      }));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const Row = ({ k, v, u, w }) => (
    <div style={{display:'grid',gridTemplateColumns:'56px 1fr auto',gap:10,alignItems:'baseline',fontFamily:'var(--font-mono)',fontSize:11,padding:'8px 0',borderBottom:'1px dashed rgba(var(--c-accent-rgb),0.12)'}}>
      <span style={{color:'var(--c-accent)',opacity:0.6,letterSpacing:'.08em',whiteSpace:'nowrap'}}>{k}</span>
      <span style={{display:'block',height:3,background:'rgba(var(--c-accent-rgb),0.08)',borderRadius:2,position:'relative'}}>
        <span style={{position:'absolute',left:0,top:0,bottom:0,width:`${clampN(w,0,100)}%`,background:'var(--c-accent)',borderRadius:2,transition:'width .8s cubic-bezier(.2,.8,.2,1)'}}/>
      </span>
      <span style={{color:'var(--c-onDark)',fontWeight:500,minWidth:48,textAlign:'right'}}>{v}<span style={{color:'var(--c-onDark-muted)',marginLeft:3,fontSize:9}}>{u}</span></span>
    </div>
  );

  return (
    <div className="v3-hero-overlay" style={{
      position:'absolute',top:32,right:32,zIndex:5,
      width:300,padding:'14px 18px 12px',
      background:'rgba(4,32,26,0.55)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      border:'1px solid rgba(var(--c-accent-rgb),0.18)',
      borderRadius:16,
      boxShadow:'0 12px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(var(--c-accent-rgb),0.06)',
      pointerEvents:'none',
      animation:'fadeUp 1.2s 1.0s cubic-bezier(.2,.8,.2,1) both',
    }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,fontFamily:'var(--font-mono)',fontSize:9.5,letterSpacing:'.14em',color:'var(--c-accent)'}}>
        <span style={{display:'flex',gap:6,alignItems:'center'}}>
          <span style={{width:6,height:6,background:'var(--c-accent)',borderRadius:'50%',animation:'pulse 1.6s ease-in-out infinite'}}/>
          {title}
        </span>
        <span style={{opacity:0.5}}>{node}</span>
      </div>
      {metrics.map((m, i) => {
        const v = vals[i];
        const w = ((v - m.min) / (m.max - m.min)) * 100;
        return <Row key={m.k} k={m.k} v={typeof v === 'number' ? (m.decimals === 0 ? Math.round(v) : v.toFixed(m.decimals ?? 1)) : v} u={m.unit} w={w}/>;
      })}
      <div style={{marginTop:6,display:'flex',justifyContent:'space-between',fontFamily:'var(--font-mono)',fontSize:9,color:'var(--c-onDark-muted)',opacity:0.6,letterSpacing:'.1em'}}>
        <span>{node}</span>
        <span>{ts}</span>
      </div>
    </div>
  );
};

// Coord badge generico
const CoordTag = ({ label = 'SARDEGNA · OLB', sub = "40°55'N · 9°30'E", note = 'ALT 35m · UTC+1' }) => (
  <div className="v3-hero-overlay" style={{
    position:'absolute',top:32,left:32,zIndex:5,
    fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'.14em',
    color:'var(--c-accent)',opacity:0.85,
    display:'flex',flexDirection:'column',gap:2,
    pointerEvents:'none',
    animation:'fadeUp 1.2s 0.8s cubic-bezier(.2,.8,.2,1) both',
  }}>
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <span style={{width:6,height:6,background:'var(--c-accent)',borderRadius:'50%',animation:'pulse 1.6s ease-in-out infinite'}}/>
      <span>{label}</span>
    </div>
    <div style={{opacity:0.7,paddingLeft:14,fontSize:9.5}}>{sub}</div>
    <div style={{opacity:0.45,paddingLeft:14,fontSize:9.5}}>{note}</div>
  </div>
);

// Wrapper per le pagine servizio: sezione che contiene titolo + descrizione,
// con HUD/coord/scanline/dotgrid montati come overlay.
const ServiceHero = ({ tag, title, em, scrambleWords, intro, hud, coord }) => (
  <section className="v3-section" style={{paddingBottom:24,position:'relative',overflow:'hidden'}}>
    <ReactiveDotGrid/>
    <HeroScanLine/>
    {coord && <CoordTag {...coord}/>}
    {hud && <HudPanel {...hud}/>}
    <div className="v3-section-narrow" style={{position:'relative',zIndex:4}}>
      <Reveal>
        <div className="v3-tag" style={{marginBottom:16}}>{tag}</div>
        <h1 className="v3-h1">
          {title}{title && <br/>}
          {scrambleWords ? <em><ScrambleWord words={scrambleWords}/>.</em> : <em>{em}.</em>}
        </h1>
        <p style={{fontSize:18,lineHeight:1.6,color:'var(--c-onDark-muted)',marginTop:32,maxWidth:820}}>
          {intro}
        </p>
      </Reveal>
    </div>
  </section>
);

window.HudPanel = HudPanel;
window.CoordTag = CoordTag;
window.ServiceHero = ServiceHero;
