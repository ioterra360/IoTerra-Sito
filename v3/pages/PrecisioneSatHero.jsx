// v3/pages/PrecisioneSatHero.jsx — Hero scroll-driven della pagina
// Agricoltura di Precisione. Vista aerea di un campo di mais con un satellite
// che scorre sopra. Mentre scorri, il satellite attraversa il campo da sx a
// dx, una scan-beam verticale lo segue, dietro la beam si rivela un overlay
// NDVI verde, e cinque punti del campo si illuminano con i loro chip-metrica.
// Tutti i chip restano DENTRO il box del campo: niente sfori sullo schermo.

const SatelliteScanHero = () => {
  const stageRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [vw, setVw] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    let root = window.__scrollRoot || null;
    const handler = () => {
      const el = stageRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const rootRect = root ? root.getBoundingClientRect() : { top: 0, height: window.innerHeight };
      const stageTop = rect.top - rootRect.top;
      const total = rect.height - rootRect.height;
      const p = Math.max(0, Math.min(1, -stageTop / total));
      setProgress(p);
    };
    let target = root || window;
    target.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
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

  // 5 POI distribuiti sul campo. Coordinate in % rispetto al box .sat-field
  // (NON al viewport), così niente esce mai dallo schermo.
  // chipDX/chipDY in % rispetto al campo per posizionare il chip vicino al POI.
  const POI = React.useMemo(() => ([
    { id:'nord-ovest', x:14, y:24, chipDX:  4, chipDY:-14,
      sym:'NDVI', name:'VIGORE', val:'0.82', unit:'' },
    { id:'centro',     x:36, y:54, chipDX:  6, chipDY: 14,
      sym:'+18%', name:'RESA STIM.', val:'kg/ha', unit:'' },
    { id:'fascia-mid', x:52, y:30, chipDX:  4, chipDY:-14,
      sym:'H₂O', name:'UMIDITÀ', val:'24', unit:'%' },
    { id:'sud-est',    x:74, y:64, chipDX: -8, chipDY: 14,
      sym:'STR', name:'STRESS', val:'BASSO', unit:'' },
    { id:'est',        x:88, y:36, chipDX:-10, chipDY:-14,
      sym:'CCI', name:'CLOROFILLA', val:'42', unit:'' },
  ]), []);

  const captions = [
    { tag:'STEP 01 · ACQUISIZIONE', t:'Il satellite passa.',          d:'Sentinel-2 sorvola la parcella ogni 5 giorni: 13 bande spettrali, risoluzione 10 m.' },
    { tag:'STEP 02 · ELABORAZIONE',  t:'Le bande diventano indici.',  d:'NDVI, NDWI, MSAVI: indici che descrivono vigore vegetativo, contenuto idrico, copertura.' },
    { tag:'STEP 03 · ANALISI',       t:'Zone uniformi, zone critiche.', d:'L\'analisi spaziale identifica le aree omogenee e i punti dove serve un intervento.' },
    { tag:'STEP 04 · MAPPA',         t:'Prescrizione pronta al trattore.', d:'Mappa di prescrizione esportata in formato compatibile col tuo macchinario per dose variabile.' },
  ];

  let step = 0;
  if (progress > 0.18) step = 1;
  if (progress > 0.50) step = 2;
  if (progress > 0.80) step = 3;

  // Scan position (X%) — il satellite parte da sx, finisce a dx
  // con piccolo warm-up iniziale e afterglow finale.
  const scanX = Math.max(0, Math.min(100, (progress - 0.05) / 0.85 * 100));

  // HUD live values
  const ndviAvg = (0.65 + Math.sin(progress * 4) * 0.12).toFixed(2);

  return (
    <div className="sat-stage" ref={stageRef}>
      <div className="sat-pin">

        {/* HUD */}
        <div className="sat-hud">
          <div>● SAT-S2 · PARCELLA C2</div>
          <div>LAT 39.2238° · LNG 9.1217°</div>
          <div>PASS T+{Math.floor(progress * 18) + 102}</div>
          <div className="ph">
            <span>NDVI</span>
            <b>{ndviAvg}</b>
          </div>
        </div>
        <div className="sat-hud-r">
          <div>● SCAN · LIVE</div>
          <span className="lg">
            {String(Math.round(progress * 100)).padStart(2,'0')}<small>%</small>
          </span>
          <div style={{marginTop:6,color:'var(--c-onDark-muted)',fontSize:10.5}}>
            FASE {String(step + 1).padStart(2,'0')} / 04
          </div>
        </div>

        {/* Field box */}
        <div className="sat-field" style={{ '--scan-x': scanX + '%' }}>
          <div className="sat-bg"/>
          <div className="sat-ndvi"/>

          {/* POI dots */}
          <div className="sat-poi-layer">
            {POI.map(p => {
              const dist = Math.abs(scanX - p.x);
              const active = Math.max(0, 1 - dist / 8);
              const persistent = Math.max(0, Math.min(1, (scanX - p.x + 6) / 12));
              const finalOpacity = Math.max(active, persistent * 0.95);
              return (
                <div
                  key={p.id}
                  className="sat-poi"
                  style={{
                    left: p.x + '%', top: p.y + '%',
                    '--poi-active': finalOpacity,
                    '--poi-scale': 0.6 + finalOpacity * 0.6,
                  }}
                >
                  <div className="dot"/>
                  <div className="ring" style={{display: active > 0.5 ? 'block' : 'none'}}/>
                </div>
              );
            })}
          </div>

          {/* Chip-metrica (dentro al campo, mai fuori) */}
          {POI.map(p => {
            const persistent = Math.max(0, Math.min(1, (scanX - p.x + 6) / 12));
            // Chip position in % del campo, clampata 4..96% per non toccare il bordo
            const cx = Math.max(4, Math.min(96, p.x + p.chipDX));
            const cy = Math.max(8, Math.min(92, p.y + p.chipDY));
            return (
              <div
                key={'chip-'+p.id}
                className="sat-chip"
                style={{
                  left: cx + '%', top: cy + '%',
                  '--chip-opacity': persistent,
                  transform: `translate(-50%, -50%) scale(${0.85 + persistent * 0.15})`,
                }}
              >
                <div className="sat-chip-name">{p.name}</div>
                <div className="sat-chip-row">
                  <span className="sat-chip-sym">{p.sym}</span>
                  <span className="sat-chip-val">{p.val}</span>
                  {p.unit && <span className="sat-chip-unit">{p.unit}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis ticks */}
        <div className="sat-ticks">
          {['W','25%','50%','75%','E'].map((v, i) => {
            const ti = i * 25;
            const lit = Math.abs(scanX - ti) < 8;
            return <span key={v} className={lit ? 'on' : ''}>{v}</span>;
          })}
        </div>

        {/* Linea di trasmissione satellite -> top campo (NON scan: e' solo
            il "raggio guida" attraverso il cielo, sottile e fumato) */}
        <div className="sat-link" style={{ '--scan-x': scanX + '%' }}/>

        {/* Beam scannerizzante: SOLO sul campo (top:18% -> bottom:22%) */}
        <div className="sat-beam" style={{ '--scan-x': scanX + '%' }}/>

        {/* Satellite icon che si muove */}
        <div className="sat-icon" style={{ '--scan-x': scanX + '%' }}>
          <svg viewBox="0 0 64 64" fill="none" stroke="rgba(var(--c-accent-rgb),0.95)"
               strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {/* corpo */}
            <rect x="24" y="24" width="16" height="16" rx="2"
                  fill="rgba(var(--c-accent-rgb),0.35)" stroke="rgba(var(--c-accent-rgb),0.95)"/>
            {/* pannelli solari */}
            <rect x="6"  y="28" width="14" height="8" rx="1"
                  fill="rgba(var(--c-accent-rgb),0.18)"/>
            <line x1="11" y1="28" x2="11" y2="36"/>
            <line x1="15" y1="28" x2="15" y2="36"/>
            <rect x="44" y="28" width="14" height="8" rx="1"
                  fill="rgba(var(--c-accent-rgb),0.18)"/>
            <line x1="49" y1="28" x2="49" y2="36"/>
            <line x1="53" y1="28" x2="53" y2="36"/>
            {/* connettori */}
            <line x1="20" y1="32" x2="24" y2="32"/>
            <line x1="40" y1="32" x2="44" y2="32"/>
            {/* antenna */}
            <line x1="32" y1="24" x2="32" y2="14"/>
            <circle cx="32" cy="13" r="1.6" fill="rgba(var(--c-accent-rgb),0.95)" stroke="none"/>
            {/* finestra */}
            <circle cx="32" cy="32" r="2.5" fill="rgba(var(--c-dark-rgb),0.85)" stroke="rgba(var(--c-accent-rgb),0.95)"/>
          </svg>
        </div>

        {/* Caption */}
        <div className="sat-caption">
          <div className="sat-cap-frame">
            {captions.map((cap, i) => (
              <div key={i} className={i === step ? 'on' : ''}>
                <div className="sat-step">{cap.tag}</div>
                <h2 className="sat-ttl">{cap.t}</h2>
                <p>{cap.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress rail */}
        <div className="sat-rail">
          <span style={{width: `${progress * 100}%`}}/>
        </div>
      </div>
    </div>
  );
};

window.SatelliteScanHero = SatelliteScanHero;
