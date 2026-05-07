// v3/components/HomeSatelliteScanner.jsx — sostituisce il vecchio mosaico
// "Cosa facciamo" sulla home. Usa la foto reale del satellite che proietta un
// cono di luce verde su un campo coltivato, e ci sovrappone una scan-line
// verticale che attraversa la scena da sx a dx mentre scorri. 5 POI sull'immagine
// si illuminano in cascata, ognuno corrisponde a una delle 5 tecnologie/asset
// che usiamo. Stage 500vh pinned (380vh su mobile).

const HomeSatelliteScanner = ({ children }) => {
  const stageRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);

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

  // 5 POI ancorati a punti coerenti con la foto satellite-scanner.jpg.
  // Posizionati nella metà inferiore della scena per non collidere con l'hero
  // text che ora vive nella metà superiore. Chip clampati 8-92% per restare dentro.
  const POI = React.useMemo(() => ([
    { id:'sat',  x:18, y:46, chipDX: 16, chipDY: 12,
      sym:'SAT', name:'SATELLITI',     val:'NDVI 0.78', unit:'· S2 5gg' },
    { id:'cono', x:42, y:58, chipDX:-14, chipDY:-12,
      sym:'AI',  name:'DASHBOARD',     val:'42',        unit:'campi attivi' },
    { id:'campo',x:58, y:72, chipDX: 16, chipDY:-12,
      sym:'UAV', name:'DRONI',         val:'120',       unit:'ha mappata' },
    { id:'ne',   x:80, y:54, chipDX:-14, chipDY: 14,
      sym:'°C',  name:'STAZIONI METEO',val:'24°',       unit:'· UR 64%' },
    { id:'sw',   x:30, y:80, chipDX: 16, chipDY:-12,
      sym:'LAB', name:'LABORATORIO',   val:'200+',      unit:'campioni' },
  ]), []);

  const captions = [
    { tag:'STEP 01 · ACQUISIZIONE', t:'Dal cielo e dalla terra.', d:'Satelliti, droni, sensori IoT e laboratorio: ogni livello osserva il campo da una prospettiva diversa.' },
    { tag:'STEP 02 · ELABORAZIONE', t:'Dati integrati in un\'unica interfaccia.', d:'NDVI, mappe di vigore, modelli di crescita e meteo locale: tutti i flussi confluiscono in un\'unica dashboard.' },
    { tag:'STEP 03 · DECISIONE',    t:'L\'agronomia che decide.', d:'L\'esperienza agronomica trasforma i numeri in scelte: il momento giusto per concimare, irrigare, raccogliere.' },
    { tag:'STEP 04 · AZIONE',       t:'Dal dato al campo.', d:'Mappe di prescrizione e raccomandazioni operative pronte per il tuo team.' },
  ];

  let step = 0;
  if (progress > 0.18) step = 1;
  if (progress > 0.50) step = 2;
  if (progress > 0.80) step = 3;

  // Scan position (X%) — parte da sx con piccolo warm-up
  const scanX = Math.max(0, Math.min(100, (progress - 0.05) / 0.85 * 100));

  return (
    <div className="hsc-stage" ref={stageRef}>
      <div className="hsc-pin">
        <div className="hsc-bg"/>

        {/* Hero overlay (children dal Home.jsx) — fisso al top sopra la foto */}
        <div className="hsc-hero">
          {children}
          <span className="hsc-scan-tag">● SCAN · LIVE · {String(Math.round(progress * 100)).padStart(2,'0')}%</span>
        </div>

        {/* Scan line verticale */}
        <div className="hsc-line" style={{ '--scan-x': scanX + '%' }}/>

        {/* POI dots */}
        <div className="hsc-poi-layer">
          {POI.map(p => {
            const dist = Math.abs(scanX - p.x);
            const active = Math.max(0, 1 - dist / 8);
            const persistent = Math.max(0, Math.min(1, (scanX - p.x + 6) / 12));
            const finalOpacity = Math.max(active, persistent * 0.95);
            return (
              <div
                key={p.id}
                className="hsc-poi"
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

        {/* Chip metriche — ancorati ai bordi del frame (4% sx / 96% dx)
            con translateX(-100%) o (0) così non escono mai dallo schermo. */}
        {POI.map(p => {
          const persistent = Math.max(0, Math.min(1, (scanX - p.x + 6) / 12));
          const right = (p.x + (p.chipDX || 0)) >= 50;
          const cx = right ? 96 : 4;
          const cy = Math.max(12, Math.min(82, p.y + (p.chipDY || 0)));
          const tx = right ? -100 : 0;
          return (
            <div
              key={'chip-'+p.id}
              className="hsc-chip"
              style={{
                left: cx + '%', top: cy + '%',
                '--chip-opacity': persistent,
                transform: `translate(${tx}%, -50%) scale(${0.85 + persistent * 0.15})`,
              }}
            >
              <div className="hsc-chip-name">{p.name}</div>
              <div className="hsc-chip-row">
                <span className="hsc-chip-sym">{p.sym}</span>
                <span className="hsc-chip-val">{p.val}</span>
                {p.unit && <span className="hsc-chip-unit">{p.unit}</span>}
              </div>
            </div>
          );
        })}

        {/* Caption a step */}
        <div className="hsc-caption">
          <div className="hsc-cap-frame">
            {captions.map((cap, i) => (
              <div key={i} className={i === step ? 'on' : ''}>
                <div className="hsc-step">{cap.tag}</div>
                <h3 className="hsc-ttl">{cap.t}</h3>
                <p>{cap.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress rail */}
        <div className="hsc-rail">
          <span style={{width: `${progress * 100}%`}}/>
        </div>
      </div>
    </div>
  );
};

window.HomeSatelliteScanner = HomeSatelliteScanner;
