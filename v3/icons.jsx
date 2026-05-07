// v3/icons.jsx — Set di icone SVG line, 1.5 stroke, currentColor
// Usage: <Icon name="grid" size={14}/>
const ICONS = {
  // ★ generico → griglia/sezione
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  // Cosa facciamo → settings/sliders
  sliders: <><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="var(--c-darker)"/><circle cx="15" cy="12" r="2" fill="var(--c-darker)"/><circle cx="7" cy="18" r="2" fill="var(--c-darker)"/></>,
  // Manifesto → libro/documento
  book: <><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5z"/><line x1="8" y1="7" x2="14" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></>,
  // Software → finestra/codice
  window: <><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><circle cx="6.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="9" cy="6.5" r="0.5" fill="currentColor"/></>,
  // Finanziamenti → euro
  euro: <><path d="M18 7a7 7 0 1 0 0 10"/><line x1="3" y1="10" x2="13" y2="10"/><line x1="3" y1="14" x2="13" y2="14"/></>,
  // Pacchetti → box/livelli
  layers: <><polygon points="12 3 21 8 12 13 3 8 12 3"/><polyline points="3 14 12 19 21 14"/></>,
  // Modulo contatti → mail
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></>,
  // Competenze → bersaglio/precisione
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></>,
  // Stelle → asterisco grafico (per badge)
  star: <><polygon points="12 3 14.5 9.5 21 10.2 16 14.7 17.5 21 12 17.5 6.5 21 8 14.7 3 10.2 9.5 9.5 12 3"/></>,
  // Foglia → natura
  leaf: <><path d="M5 21c.5-9 5.5-15 16-16-1 11-7 16-16 16z"/><line x1="5" y1="21" x2="13" y2="13"/></>,
  // Pin → posizione
  pin: <><path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></>,
  // Telefono
  phone: <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></>,
  // Satellite
  satellite: <><path d="M5 14l-2 2 5 5 2-2"/><path d="M14 5l-2 2 5 5 2-2"/><path d="M9 10l5 5"/><path d="M16 16l3 3"/><path d="M21 21h-2v-2"/></>,
  // Stazione meteo (sole + nuvola)
  weather: <><circle cx="8" cy="9" r="3"/><path d="M14 17a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.5 1.5A3.5 3.5 0 0 0 5 18h9z"/></>,
  // Goccia (suolo / acqua)
  droplet: <><path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/></>,
  // Pianta / coltura
  plant: <><path d="M12 22V11"/><path d="M12 11C8 11 5 8 5 4c4 0 7 3 7 7z"/><path d="M12 13c4 0 7-3 7-7-4 0-7 3-7 7z"/></>,
  // Bug / insetto
  bug: <><circle cx="12" cy="12" r="5"/><line x1="12" y1="7" x2="12" y2="3"/><line x1="9" y1="4" x2="11" y2="6"/><line x1="15" y1="4" x2="13" y2="6"/><line x1="3" y1="10" x2="7" y2="11"/><line x1="3" y1="14" x2="7" y2="13"/><line x1="21" y1="10" x2="17" y2="11"/><line x1="21" y1="14" x2="17" y2="13"/><line x1="6" y1="20" x2="9" y2="17"/><line x1="18" y1="20" x2="15" y2="17"/></>,
  // App / smartphone
  app: <><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></>,
  // Drone
  drone: <><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><line x1="8" y1="8" x2="6" y2="6"/><line x1="16" y1="8" x2="18" y2="6"/><line x1="8" y1="16" x2="6" y2="18"/><line x1="16" y1="16" x2="18" y2="18"/></>,
  // Lab / provetta
  lab: <><path d="M9 3v6l-5 10a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-10V3"/><line x1="8" y1="3" x2="16" y2="3"/><line x1="7" y1="14" x2="17" y2="14"/></>,
  // Bandiera UE / istituzioni
  flag: <><line x1="5" y1="22" x2="5" y2="3"/><path d="M5 4h12l-2 4 2 4H5"/></>,
  // Documento / bando
  doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></>,
  // Instagram
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/></>,
  // Google (G glyph)
  google: <><path d="M21.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.3-2 3v2.5h3.2c1.9-1.7 2.9-4.3 2.9-7.3z"/><path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/><path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9z"/><path d="M12 6.1c1.5 0 2.8.5 3.8 1.5L18.6 4.9A10 10 0 0 0 12 2a10 10 0 0 0-8.9 5.5l3.3 2.6C7.2 7.7 9.4 6.1 12 6.1z"/></>,
};

const Icon = ({ name, size = 14, stroke = 1.6, style = {} }) => {
  const path = ICONS[name];
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size} height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{display:'inline-block',verticalAlign:'-2px',flexShrink:0,...style}}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
};

window.Icon = Icon;
