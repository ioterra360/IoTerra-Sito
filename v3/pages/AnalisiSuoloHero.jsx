// v3/pages/AnalisiSuoloHero.jsx — Hero scroll-driven con zolle che esplodono
// 12 frammenti irregolari della pianta, con shockwave, polvere e chip parametri.
// Stage = 500vh sticky → 4 step di caption: SAMPLE → ANALYSIS → INSIGHT → DECISION

const SoilBlastHero = () => {
  const stageRef = React.useRef(null);
  const pinRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0); // 0..1 globale

  // 12 zolle: clip-path poligonale che a riposo si combaciano (overlap leggero
  // anti-gap), ed esplodono separandosi.
  const shards = React.useMemo(() => {
    const cols = 4, rows = 3;
    const cells = [];
    // Seed determ. per jitter coerente
    const rnd = (seed) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x0 = (c / cols) * 100;
        const x1 = ((c + 1) / cols) * 100;
        const y0 = (r / rows) * 100;
        const y1 = ((r + 1) / rows) * 100;
        const cx = (x0 + x1) / 2;
        const cy = (y0 + y1) / 2;
        // Direzione di volo: vettore dal centro pianta al centro cella
        const dx = cx - 50;
        const dy = cy - 50;
        const len = Math.max(1, Math.hypot(dx, dy));
        const ux = dx / len;
        const uy = dy / len;
        // Bordi sovradimensionati di 2% per evitare gap, jitter solo sui vertici
        // (ogni vertice spostato in modo coerente tra celle adiacenti tramite hash di posizione)
        const jit = (px, py, amt = 3) => {
          const h = (px * 31 + py * 17);
          return [(rnd(h) - 0.5) * amt, (rnd(h + 1) - 0.5) * amt];
        };
        const ext = 1.5; // overlap su tutti i lati
        const [j1x, j1y] = jit(x0, y0);
        const [j2x, j2y] = jit(x1, y0);
        const [j3x, j3y] = jit(x1, y1);
        const [j4x, j4y] = jit(x0, y1);
        const [m1x, m1y] = jit(cx, y0, 4);
        const [m2x, m2y] = jit(x1, cy, 4);
        const [m3x, m3y] = jit(cx, y1, 4);
        const [m4x, m4y] = jit(x0, cy, 4);
        const path = [
          `${x0 - ext + j1x}% ${y0 - ext + j1y}%`,
          `${cx + m1x}% ${y0 - ext + m1y}%`,
          `${x1 + ext + j2x}% ${y0 - ext + j2y}%`,
          `${x1 + ext + m2x}% ${cy + m2y}%`,
          `${x1 + ext + j3x}% ${y1 + ext + j3y}%`,
          `${cx + m3x}% ${y1 + ext + m3y}%`,
          `${x0 - ext + j4x}% ${y1 + ext + j4y}%`,
          `${x0 - ext + m4x}% ${cy + m4y}%`,
        ].join(', ');
        cells.push({
          id: `${r}-${c}`,
          path: `polygon(${path})`,
          ux, uy,
          mag: 60 + Math.abs(dx) * 0.6 + Math.abs(dy) * 0.5,
          rot: (Math.sin(c * 2.1 + r * 1.7) * 28),
          delay: (Math.abs(dx) + Math.abs(dy)) / 250,
        });
      }
    }
    return cells;
  }, []);

  // Scala responsive per dimensioni e posizioni: viewport corrente / desktop di ref (1200×800)
  const [vw, setVw] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  React.useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  // Scala continua: niente salto binario tra desktop e mobile.
  // chipScale serve a portare i 6 chip più vicini al centro su viewport stretti
  // così che non sforino lo schermo. flyScale fa lo stesso per i frammenti
  // delle zolle e per le dust particles.
  const scale = Math.max(0.45, Math.min(1, (vw - 320) / 880));
  const isNarrow = vw < 900;
  // chipScale conservativo su 320-720, generoso su desktop. Coordinate base
  // ±200 con scale 0.32 = ±64px dal centro (iPhone SE) — mai out-of-screen.
  const chipScale = Math.max(0.32, Math.min(1, (vw - 360) / 700));
  const flyScale  = Math.max(0.30, Math.min(1, (vw - 360) / 700));

  // 6 chip parametri ancorati a posizioni compatte intorno alla pianta.
  // Valori scientifici plausibili per suolo agricolo mediterraneo.
  // Coordinate calibrate per restare dentro lo schermo a viewport >= 720px.
  // Coordinate spinte verso i bordi laterali. chipScale (sotto) clampa a 0.32
  // per garantire che su iPhone SE (vw=320) i chip restino dentro il viewport.
  // Coordinate ben sparse: top -190/-180, mid 30/50, bottom 200/220.
  // Range Y totale ~400px → chip ben distinti tra loro.
  const chips = React.useMemo(() => ([
    { sym:'N',  name:'AZOTO',     val:'1.4 g/kg',  x:-205, y:-180, big:true },
    { sym:'P',  name:'FOSFORO',   val:'42 mg/kg',  x: 205, y:-190, big:true },
    { sym:'K',  name:'POTASSIO',  val:'180 ppm',   x:-225, y:  30, big:true },
    { sym:'pH', name:'REAZIONE',  val:'7.2',       x: 225, y:  50, big:false },
    { sym:'OM', name:'SOST. ORG', val:'2.8%',      x:-205, y: 215, big:false },
    { sym:'CE', name:'SALINITÀ',  val:'0.4 dS/m',  x: 220, y: 225, big:false },
  ]), []);

  // 24 dust particles con seed deterministico
  const dust = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2 + Math.sin(i) * 0.4;
      const r = 130 + (i % 4) * 40;
      arr.push({
        id: i,
        ang: a,
        rad: r,
        delay: i * 0.04,
        size: 2 + (i % 3),
      });
    }
    return arr;
  }, []);

  React.useEffect(() => {
    let root = window.__scrollRoot || null;
    const handler = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const rootRect = root ? root.getBoundingClientRect() : { top: 0, height: window.innerHeight };
      const stageTop = rect.top - rootRect.top;
      const stageH = rect.height;
      const viewH = rootRect.height;
      // 0 quando stage entra (top = 0), 1 quando sta per uscire
      const total = stageH - viewH;
      const p = Math.max(0, Math.min(1, -stageTop / total));
      setProgress(p);
    };
    let target = root || window;
    target.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);

    // Re-bind quando il PhoneFrame monta/smonta cambiando __scrollRoot
    const rebind = () => {
      target.removeEventListener('scroll', handler);
      root = window.__scrollRoot || null;
      target = root || window;
      target.addEventListener('scroll', handler, { passive: true });
      handler();
    };
    window.addEventListener('__scrollRootChanged', rebind);

    handler();
    return () => {
      target.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
      window.removeEventListener('__scrollRootChanged', rebind);
    };
  }, []);

  // Mappa progress in fasi narrative — più lente e sovrapposte
  // 0..0.10  : intro statica (pianta intera)
  // 0.10..0.55 : detonation lenta (shards si separano gradualmente)
  // 0.20..0.55 : chips appaiono mentre i shards stanno ancora separandosi
  // 0.55..0.80 : chips stabili
  // 0.80..1.0  : caption finale
  const detonate = Math.max(0, Math.min(1, (progress - 0.10) / 0.45)); // più lenta
  const chipReveal = Math.max(0, Math.min(1, (progress - 0.20) / 0.30)); // anticipata
  const stable = Math.max(0, Math.min(1, (progress - 0.55) / 0.25));
  const finale = Math.max(0, Math.min(1, (progress - 0.82) / 0.18));

  // Step caption (0..3) — step 3 attivato prima per non avere zona morta a fine
  let step = 0;
  if (progress > 0.15) step = 1;
  if (progress > 0.40) step = 2;
  if (progress > 0.68) step = 3;

  const captions = [
    { tag:'STEP 01 · CAMPIONAMENTO', t:'Si parte dal campo.', d:'Campioni di suolo prelevati in punti strategici della parcella, georeferenziati con GPS.' },
    { tag:'STEP 02 · LABORATORIO',   t:'Il suolo si analizza.', d:'Granulometria, sostanza organica, macro/micro elementi, pH, conducibilità — analizzati separatamente.' },
    { tag:'STEP 03 · DATI',          t:'Ogni elemento, un valore.', d:'I parametri diventano numeri confrontabili, mappabili nello spazio e nel tempo.' },
    { tag:'STEP 04 · DECISIONE',     t:'Strategia agronomica su misura.', d:'Piano di concimazione e gestione idrica costruito sui dati reali del tuo terreno.' },
  ];

  // Detonation easing
  const ease = (x) => 1 - Math.pow(1 - x, 3);

  return (
    <div className="sb-stage" ref={stageRef} data-detonating={detonate > 0.05 ? '1' : '0'}>
      <div className="sb-pin" ref={pinRef}>
        {/* HUD top-left */}
        <div className="sb-hud">
          <div>● PARCELLA C2 · PIS · R2</div>
          <div className="row">LAT 39.2238° · LNG 9.1217°</div>
          <div className="row">CAMPIONE T-{Math.floor(progress * 12) + 117}</div>
          <div className="ph">
            <span>PROF</span>
            <b>{Math.round(progress * 50)}<small style={{fontSize:'.55em',marginLeft:4,opacity:.7}}>cm</small></b>
          </div>
        </div>

        {/* HUD top-right */}
        <div className="sb-hud-r">
          <div>● ANALISI · LIVE</div>
          <span className="lg">
            {String(Math.round(progress * 100)).padStart(2,'0')}<small>%</small>
          </span>
          <div style={{marginTop:6,color:'var(--c-onDark-muted)'}}>
            FASE {String(step + 1).padStart(2,'0')} / 04
          </div>
        </div>

        {/* Scena centrale: pianta + zolle */}
        <div className="sb-scene">
          <div className="sb-blast">
            {/* Shards: 12 frammenti che volano via */}
            {shards.map((s, i) => {
              const localProgress = ease(Math.max(0, Math.min(1, detonate - s.delay * 0.15)));
              const flyMag = s.mag * flyScale;
              const tx = s.ux * flyMag * localProgress;
              const ty = s.uy * flyMag * localProgress + localProgress * (8 + flyScale * 22);
              const rot = s.rot * localProgress;
              const opacity = stable > 0.5 ? Math.max(0, 1 - (stable - 0.5) * 1.5) : 1;
              return (
                <div
                  key={s.id}
                  className="sb-shard"
                  style={{
                    clipPath: s.path,
                    WebkitClipPath: s.path,
                    transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
                    opacity,
                    filter: localProgress > 0.5 ? `brightness(${1 + localProgress * 0.2})` : 'none',
                  }}
                />
              );
            })}

            {/* Shockwave pulse */}
            <div
              className="sb-pulse"
              style={{
                opacity: detonate > 0 && detonate < 0.7 ? 1 - detonate : 0,
                transform: `translate(-50%,-50%) scale(${detonate * 8})`,
              }}
            />

            {/* Dust particles */}
            {dust.map(d => {
              const dp = Math.max(0, Math.min(1, detonate * 1.2 - d.delay));
              const dist = d.rad * ease(dp) * flyScale;
              const x = Math.cos(d.ang) * dist;
              const y = Math.sin(d.ang) * dist + dp * 40 * flyScale;
              const op = dp > 0 ? Math.max(0, 1 - dp * 1.2) : 0;
              return (
                <div
                  key={d.id}
                  className="sb-dust"
                  style={{
                    left:'50%', top:'50%',
                    width: d.size, height: d.size,
                    transform: `translate(${x}px, ${y}px)`,
                    opacity: op,
                  }}
                />
              );
            })}

            {/* Chip parametri */}
            {chips.map((c, i) => {
              const chipDelay = i * 0.08;
              const cp = Math.max(0, Math.min(1, chipReveal - chipDelay));
              const settle = ease(Math.max(0, Math.min(1, stable * 1.2 - chipDelay * 0.5)));
              // Posizione: dal centro (0,0) verso x,y finale, scalata per viewport
              const fx = c.x * chipScale * ease(cp);
              const fy = c.y * chipScale * ease(cp);
              const chipBoxScale = 0.7 + chipScale * 0.3;
              const sc = (0.5 + ease(cp) * 0.5 + (settle > 0 ? Math.sin(settle * Math.PI) * 0.04 : 0)) * chipBoxScale;
              return (
                <div
                  key={c.sym}
                  className="sb-chip"
                  style={{
                    left:'50%', top:'50%',
                    transform: `translate(calc(-50% + ${fx}px), calc(-50% + ${fy}px)) scale(${sc})`,
                    opacity: cp,
                  }}
                >
                  <span className={`sb-sym ${c.big ? '' : 'sm'}`}>{c.sym}</span>
                  <div className="sb-meta">
                    <div className="sb-name">{c.name}</div>
                    <div className="sb-val">{c.val}</div>
                  </div>
                </div>
              );
            })}

            {/* SVG connectors da pianta a chip */}
            <svg className="sb-connectors" viewBox="-300 -300 600 600" preserveAspectRatio="none">
              {chips.map((c, i) => {
                const chipDelay = i * 0.08;
                const cp = Math.max(0, Math.min(1, chipReveal - chipDelay));
                const fx2 = c.x * chipScale;
                const fy2 = c.y * chipScale;
                const len = Math.hypot(fx2, fy2);
                const dashOffset = len * (1 - ease(cp));
                return (
                  <line
                    key={c.sym}
                    x1="0" y1="0"
                    x2={fx2 * ease(cp)} y2={fy2 * ease(cp)}
                    stroke="rgba(214,255,67,.25)"
                    strokeWidth="1"
                    strokeDasharray={`${len}`}
                    strokeDashoffset={dashOffset}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Caption frame: 4 step crossfade */}
        <div className="sb-caption">
          <div className="sb-cap-frame">
            {captions.map((cap, i) => (
              <div key={i} className={i === step ? 'on' : ''}>
                <div className="sb-step">{cap.tag}</div>
                <h2 className="sb-ttl">{cap.t}</h2>
                <p>{cap.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress rail */}
        <div className="sb-rail">
          <span style={{width: `${progress * 100}%`}}/>
        </div>
      </div>
    </div>
  );
};

window.SoilBlastHero = SoilBlastHero;
