// v3/pages/RicercaScanHero.jsx — Hero scroll-driven della pagina Ricerca.
// Alternativa "scanner": la pianta resta intera mentre una scan-line orizzontale
// la attraversa dall'alto in basso. Quando passa sopra un punto di interesse
// (POI), il punto si illumina e da lì emerge un chip con la metrica letta.
// Stage 500vh sticky → 4 step caption SETUP → SCAN → DATI → INSIGHT.

const PlantScanHero = () => {
  const stageRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [vw, setVw] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const isNarrow = vw < 720;
  // Scala continua dei chip tra desktop e mobile per evitare che sforino
  // lo schermo nei viewport intermedi (tablet, finestre semi-strette).
  const chipDistScale = Math.max(0.30, Math.min(1, (vw - 360) / 880));

  React.useEffect(() => {
    let root = window.__scrollRoot || null;
    const handler = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const rootRect = root ? root.getBoundingClientRect() : { top: 0, height: window.innerHeight };
      const stageTop = rect.top - rootRect.top;
      const stageH = rect.height;
      const viewH = rootRect.height;
      const total = stageH - viewH;
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

  // 5 punti di interesse sulla pianta. y % rispetto al box pianta.
  // side: 'r' (chip a destra) | 'l' (chip a sinistra). x % è dove sta il POI.
  // chipDX/Y in px: distanza del chip dal POI.
  // Chip ancorati ai bordi del box pianta (4% / 96%) con coordinate Y vicine
  // al POI. Niente offset px che potevano far sovrapporre il chip alla pianta.
  const POI = React.useMemo(() => ([
    { id:'foglia',  x:42, y:14, side:'r', chipY:14,
      sym:'PAR',  name:'FOTOSINTESI',    val:'850',  unit:'µmol/m²s' },
    { id:'fusto',   x:50, y:34, side:'l', chipY:34,
      sym:'Ø',    name:'FUSTO',          val:'4.2',  unit:'mm' },
    { id:'foglia2', x:40, y:52, side:'r', chipY:52,
      sym:'LAI',  name:'INDICE FOGLIARE', val:'3.4',  unit:'m²/m²' },
    { id:'vasetto', x:50, y:74, side:'l', chipY:74,
      sym:'EC',   name:'NUTRIENTI',      val:'1.6',  unit:'mS/cm' },
    { id:'radici',  x:50, y:90, side:'r', chipY:90,
      sym:'pH',   name:'RIZOSFERA',      val:'6.2',  unit:'' },
  ]), []);

  // Caption a 4 step
  const captions = [
    { tag:'STEP 01 · IPOTESI',    t:'Dalla domanda all\'ipotesi.', d:'Una domanda concreta dell\'azienda — una cultivar, un protocollo, un input — diventa un\'ipotesi misurabile.' },
    { tag:'STEP 02 · PROTOCOLLO', t:'Disegno sperimentale.', d:'Configurazioni a confronto, repliche, controllo, randomizzazione: il rigore del metodo sul campo o in laboratorio.' },
    { tag:'STEP 03 · MISURE',     t:'Rilievi nel tempo.', d:'Morfometria, resa, qualità, indici di stress, dati IoT: parametri raccolti con calendario regolare.' },
    { tag:'STEP 04 · REPORT',     t:'Risultati e raccomandazioni.', d:'Analisi statistica dei dati e report. Dalla parcella alla raccomandazione: un protocollo replicabile.' },
  ];

  let step = 0;
  if (progress > 0.18) step = 1;
  if (progress > 0.55) step = 2;
  if (progress > 0.82) step = 3;

  // Scan position (Y%) — entra a 0% e si ferma a 96% (appena sotto le radici,
  // ultimo POI a y:90). Niente afterglow oltre la pianta su area vuota.
  const scanY = Math.max(0, Math.min(96, (progress - 0.03) / 0.92 * 96));
  // Plant glow appare dopo che la scan ha fatto qualche cm
  const glowO = Math.max(0, Math.min(0.65, (progress - 0.10) * 1.4));
  // Wireframe contour dopo metà scan
  const wireO = Math.max(0, Math.min(0.45, (progress - 0.30) * 1.2));

  // pH live + p-value live per HUD
  const phLive = (6.4 + Math.sin(progress * 5) * 0.4).toFixed(2);

  return (
    <div
      className="scn-stage"
      ref={stageRef}
      style={{ '--hero-img': "url('assets/img/hydroponic-plant-cutout.png')" }}
    >
      <div className="scn-pin">
        {/* HUD top-left */}
        <div className="scn-hud">
          <div>● PROVA R-2-24 · TESI A · CONTROLLO</div>
          <div className="row">LAT 39.2238° · LNG 9.1217°</div>
          <div className="row">SCAN T-{Math.floor(progress * 24) + 207}</div>
          <div className="ph">
            <span>EC</span>
            <b>{(1.4 + progress * 0.3).toFixed(2)}</b>
          </div>
        </div>

        {/* HUD top-right */}
        <div className="scn-hud-r">
          <div>● SCAN · LIVE</div>
          <span className="lg">
            {String(Math.round(progress * 100)).padStart(2,'0')}<small>%</small>
          </span>
          <div style={{marginTop:6,color:'var(--c-onDark-muted)',fontSize:10.5}}>
            FASE {String(step + 1).padStart(2,'0')} / 04
          </div>
        </div>

        {/* Y-axis ticks (sinistra) */}
        <div className="scn-ticks">
          {['0','25','50','75','100'].map((v, i) => {
            const ti = i * 25;
            const lit = Math.abs(scanY - ti) < 8;
            return <span key={v} className={lit ? 'on' : ''}>{v}%</span>;
          })}
        </div>

        {/* Scena: pianta + scan + POI + chip */}
        <div className="scn-scene">
          <div
            className="scn-plant-wrap"
            style={{
              '--scan-glow': glowO,
              '--scan-wire': wireO,
            }}
          >
            <div className="scn-plant"/>
            <div className="scn-plant-glow"/>
            <div className="scn-plant-wire"/>

            {/* POI dots con pulse */}
            <div className="scn-poi-layer">
              {POI.map(p => {
                // Active when scanY è entro ±5% del POI y
                const dist = Math.abs(scanY - p.y);
                const active = Math.max(0, 1 - dist / 8);
                // Persistente dopo il passaggio: una volta attivato resta visibile
                const persistent = Math.max(0, Math.min(1, (scanY - p.y + 6) / 12));
                const finalOpacity = Math.max(active, persistent * 0.95);
                return (
                  <div
                    key={p.id}
                    className="scn-poi"
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

            {/* Chip metrica + linea connettrice (uno per POI). Chip ancorato al
                BORDO del box pianta (96% destra o 4% sinistra), allineato a
                chipY. Linea SVG-like da POI a punto chip in coords %. */}
            {POI.map(p => {
              const persistent = Math.max(0, Math.min(1, (scanY - p.y + 6) / 12));
              const right = p.side === 'r';
              const chipX = right ? 96 : 4;
              const chipTx = right ? -100 : 0;
              return (
                <React.Fragment key={'chip-'+p.id}>
                  {/* Connettore: linea sottile da POI a chip */}
                  <div
                    className="scn-conn"
                    style={{
                      left: p.x + '%', top: p.y + '%',
                      width: Math.abs(chipX - p.x) * persistent + '%',
                      transform: right ? 'rotate(0deg)' : 'rotate(180deg)',
                      transformOrigin: '0 50%',
                      '--conn-opacity': persistent,
                    }}
                  />
                  <div
                    className="scn-chip"
                    style={{
                      left: chipX + '%', top: p.chipY + '%',
                      '--chip-opacity': persistent,
                      transform: `translate(${chipTx}%, -50%) scale(${0.85 + persistent * 0.15})`,
                    }}
                  >
                    <div className="scn-chip-name">{p.name}</div>
                    <div className="scn-chip-row">
                      <span className="scn-chip-sym">{p.sym}</span>
                      <span className="scn-chip-val">{p.val}</span>
                      {p.unit && <span className="scn-chip-unit">{p.unit}</span>}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Scan line + tag */}
          <div className="scn-line" style={{ '--scan-y': scanY + '%' }}/>
          <div className="scn-line-tag" style={{ '--scan-y': scanY + '%' }}>
            Y<b>{Math.round(scanY)}%</b>
          </div>
        </div>

        {/* Progress rail */}
        <div className="scn-rail">
          <span style={{width: `${progress * 100}%`}}/>
        </div>
      </div>
    </div>
  );
};

window.PlantScanHero = PlantScanHero;
