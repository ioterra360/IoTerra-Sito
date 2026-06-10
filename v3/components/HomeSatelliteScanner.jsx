// v3/components/HomeSatelliteScanner.jsx — hero statico della home.
// Ex "satellite scanner" animato: rimosso l'effetto scan-line / POI / chip /
// caption a step / barra di progresso. Ora è una semplice prima schermata a
// tutto schermo (100vh): foto satellite a sfondo (cover) + titolo e CTA in
// basso a sinistra. Mantiene la stessa API <HomeSatelliteScanner>{children}…
// così Home.jsx resta invariato.

const HomeSatelliteScanner = ({ children }) => {
  return (
    <section className="hsc-hero-section">
      <div className="hsc-bg"/>
      <div className="hsc-hero">
        {children}
      </div>
    </section>
  );
};

window.HomeSatelliteScanner = HomeSatelliteScanner;
