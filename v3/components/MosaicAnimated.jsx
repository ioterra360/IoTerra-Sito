// v3/components/MosaicAnimated.jsx — Mosaic card animation per Home (Dashboard, Droni, Satelliti, Meteo)
// Effetto: scroll-driven reveal con linea che si disegna, tag pill che scivola,
// numero che pulsa, immagine che scala, KPI chip che fluttua.

const KPI_BY_TAG = {
  'DASHBOARD':      { label:'CAMPI ATTIVI',     value:'42',    unit:'' },
  'DRONI':          { label:'AREA MAPPATA',     value:'120',   unit:'ha' },
  'SATELLITI':      { label:'NDVI MEDIO',       value:'0.78',  unit:'' },
  'STAZIONI METEO': { label:'TEMP. ATTUALE',    value:'24',    unit:'°C' },
};

const MosaicRowAnimated = ({ m, i }) => {
  const ref = React.useRef(null);
  const [t, setT] = React.useState(0);

  React.useEffect(() => {
    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const root = window.__scrollRoot || null;
      const rect = el.getBoundingClientRect();
      const rootRect = root ? root.getBoundingClientRect() : { top: 0, height: window.innerHeight };
      const top = rect.top - rootRect.top;
      const h = rootRect.height;
      // 0 quando entra dal basso, 1 quando esce in alto
      const p = Math.max(0, Math.min(1, 1 - top / (h * 0.85)));
      setT(p);
    };
    const root = window.__scrollRoot || window;
    let target = root;
    const rebind = () => {
      target.removeEventListener('scroll', compute);
      target = window.__scrollRoot || window;
      target.addEventListener('scroll', compute, { passive: true });
      compute();
    };
    target.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    window.addEventListener('__scrollRootChanged', rebind);
    compute();
    return () => {
      target.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
      window.removeEventListener('__scrollRootChanged', rebind);
    };
  }, []);

  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const e = ease(t);
  const reveal = Math.max(0, Math.min(1, t * 1.4));
  const lineDraw = Math.max(0, Math.min(1, (t - 0.05) * 1.6));
  const tagSlide = Math.max(0, Math.min(1, (t - 0.10) * 1.6));
  const numType = Math.max(0, Math.min(1, (t - 0.15) * 1.8));
  const kpiPop = Math.max(0, Math.min(1, (t - 0.25) * 1.6));
  const imgY = (1 - e) * 40 - 20;

  const kpi = KPI_BY_TAG[m.tag] || KPI_BY_TAG.DASHBOARD;
  const numText = `0${i+1}`;
  const shownNum = numText.slice(0, Math.ceil(numType * numText.length));

  return (
    <div
      ref={ref}
      className={`v3-mosaic-row v3-mosaic-${m.side} v3-mosaic-${m.size} v3m-anim`}
      style={{
        opacity: reveal,
        transform: `translateY(${(1-e)*60}px)`,
        transition: 'opacity .4s ease',
      }}
    >
      <div className="v3-mosaic-img v3m-img">
        {/* line top — si disegna da sinistra */}
        <div className="v3m-topline" style={{transform:`scaleX(${lineDraw})`}}></div>
        {/* image with parallax */}
        <img src={m.img} alt="" style={{transform:`translateY(${imgY}px) scale(${1.05 + (1-e)*0.10})`}}/>
        {/* grain overlay che svanisce */}
        <div className="v3m-grain" style={{opacity: (1 - e) * 0.4}}></div>
        {/* tag pill che scivola da side */}
        <div
          className="v3-mosaic-tag v3m-tag"
          style={{
            transform:`translateX(${(1 - tagSlide) * (m.side === 'l' ? -30 : 30)}px)`,
            opacity: tagSlide,
          }}
        >
          <span className="v3m-dot"></span>
          {m.tag}
        </div>
        {/* numero che si scrive */}
        <div className="v3-mosaic-num v3m-num">{shownNum}</div>
        {/* KPI chip che fluttua in basso */}
        <div
          className="v3m-kpi"
          style={{
            opacity: kpiPop,
            transform: `translateY(${(1-kpiPop)*20}px) scale(${0.9 + kpiPop*0.1})`,
          }}
        >
          <div className="v3m-kpi-label">{kpi.label}</div>
          <div className="v3m-kpi-value">
            {kpi.value}<small>{kpi.unit}</small>
          </div>
          <svg className="v3m-spark" viewBox="0 0 60 20" preserveAspectRatio="none">
            <polyline
              points="0,15 10,12 20,14 30,8 40,10 50,4 60,6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100 * (1 - kpiPop),
                transition: 'stroke-dashoffset .6s ease',
              }}
            />
          </svg>
        </div>
      </div>
      <div className="v3-mosaic-text">
        <h3 className="v3-h3" style={{transform:`translateY(${(1-e)*16}px)`,opacity:reveal}}>{m.title}</h3>
        <p style={{transform:`translateY(${(1-e)*22}px)`,opacity:Math.max(0, t*1.2 - 0.2)}}>{m.desc}</p>
      </div>
    </div>
  );
};

window.MosaicRowAnimated = MosaicRowAnimated;
