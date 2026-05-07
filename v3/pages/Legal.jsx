// v3/pages/Legal.jsx — Privacy Policy + Termini di Servizio + Cookie Policy

const LegalShared = {
  H3: ({ children }) => (
    <h3 style={{fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'0.12em',color:'var(--c-accent)',textTransform:'uppercase',marginTop:36,marginBottom:14}}>{children}</h3>
  ),
  H4: ({ children }) => (
    <h4 style={{fontFamily:'var(--font-display)',fontSize:22,fontWeight:300,letterSpacing:'-0.02em',color:'var(--c-onDark)',marginTop:24,marginBottom:10,fontStyle:'italic'}}>{children}</h4>
  ),
  P: ({ children }) => (
    <p style={{fontSize:16,lineHeight:1.7,color:'var(--c-onDark-muted)',marginBottom:14}}>{children}</p>
  ),
  UL: ({ children }) => (
    <ul style={{listStyle:'none',padding:0,margin:'0 0 18px 0',display:'grid',gap:8}}>{children}</ul>
  ),
  LI: ({ children }) => (
    <li style={{fontSize:16,lineHeight:1.7,color:'var(--c-onDark-muted)',paddingLeft:22,position:'relative'}}>
      <span style={{position:'absolute',left:0,top:0,color:'var(--c-accent)'}}>›</span>{children}
    </li>
  ),
  Strong: ({ children }) => <strong style={{color:'var(--c-onDark)',fontWeight:500}}>{children}</strong>,
  Em: ({ children }) => <em style={{color:'var(--c-accent)',fontStyle:'italic',fontWeight:500}}>{children}</em>,
};

// ========= PRIVACY POLICY =========
const PagePrivacy = () => {
  const { H3, H4, P, UL, LI, Strong, Em } = LegalShared;
  return (
    <>
      <section className="v3-section" style={{paddingBottom:24}}>
        <div className="v3-section-narrow">
          <Reveal>
            <div className="v3-tag" style={{marginBottom:16}}>NOTE LEGALI · 01</div>
            <h1 className="v3-h1">Privacy<br/><em>Policy.</em></h1>
            <p style={{fontSize:18,lineHeight:1.6,color:'var(--c-onDark-muted)',marginTop:28,maxWidth:780}}>
              Questa Privacy Policy descrive le modalità di raccolta, uso e divulgazione delle informazioni quando utilizzi i servizi di IoTerra e i tuoi diritti in materia di privacy.
            </p>
            <p style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--c-accent)',marginTop:18}}>
              ● Ultimo aggiornamento: 13 febbraio 2025
            </p>
          </Reveal>
        </div>
      </section>

      <section className="v3-section" style={{paddingTop:24}}>
        <div className="v3-section-narrow" style={{maxWidth:920}}>
          <Reveal>
            <div className="v3-card" style={{padding:48}}>
              <P>
                Utilizziamo i tuoi dati personali per fornire e migliorare il servizio. Utilizzando il servizio acconsenti alla raccolta e all'uso delle informazioni in conformità alla presente Privacy Policy.
              </P>

              <H3>Definizioni</H3>
              <UL>
                <LI><Strong>Account</Strong> · account creato per accedere al servizio.</LI>
                <LI><Strong>Società</Strong> · IoTerra (di seguito "noi" o "nostro").</LI>
                <LI><Strong>Cookie</Strong> · piccoli file salvati sul dispositivo durante la navigazione.</LI>
                <LI><Strong>Paese</Strong> · Italia.</LI>
                <LI><Strong>Dispositivo</Strong> · qualsiasi device che acceda al servizio (computer, smartphone, tablet).</LI>
                <LI><Strong>Dati Personali</Strong> · qualsiasi informazione relativa a una persona identificata o identificabile.</LI>
                <LI><Strong>Servizio</Strong> · il sito web IoTerra, accessibile da www.ioterra.it.</LI>
                <LI><Strong>Fornitore di servizi</Strong> · soggetto terzo che tratta i dati per nostro conto.</LI>
                <LI><Strong>Dati di utilizzo</Strong> · dati raccolti automaticamente durante l'utilizzo (es. durata visita, tipo di browser).</LI>
                <LI><Strong>Tu</Strong> · l'individuo o l'entità che accede al servizio.</LI>
              </UL>

              <H3>Tipi di dati raccolti</H3>
              <H4>Dati personali</H4>
              <P>Durante l'utilizzo del servizio potremmo chiederti di fornirci alcune informazioni personali identificabili che possono includere, a titolo non esaustivo:</P>
              <UL>
                <LI>Indirizzo email</LI>
                <LI>Nome e cognome</LI>
                <LI>Numero di telefono</LI>
                <LI>Indirizzo, provincia, CAP, città</LI>
                <LI>Dati di utilizzo</LI>
              </UL>

              <H4>Dati di utilizzo</H4>
              <P>I dati di utilizzo sono raccolti automaticamente quando si utilizza il servizio. Possono includere indirizzo IP, tipo e versione del browser, pagine visitate, data e ora della visita, tempo trascorso, identificatori unici del dispositivo e altri dati diagnostici. Quando accedi tramite mobile, possiamo raccogliere automaticamente il tipo di dispositivo, l'ID del dispositivo, l'IP, il sistema operativo mobile e il tipo di browser.</P>

              <H4>Tecnologie di tracciamento e cookie</H4>
              <P>Utilizziamo cookie e tecnologie simili (beacon, tag, script) per tracciare l'attività e migliorare il servizio. Le tipologie usate sono:</P>
              <UL>
                <LI><Strong>Cookie necessari (sessione)</Strong> · essenziali per fornire il servizio e prevenire usi fraudolenti. Senza questi cookie il servizio non può funzionare.</LI>
                <LI><Strong>Cookie di preferenze (persistenti)</Strong> · ricordano le tue scelte (es. accettazione cookie, lingua) per evitare di reimpostarle ogni volta.</LI>
                <LI><Strong>Cookie funzionali (persistenti)</Strong> · permettono di personalizzare l'esperienza e ricordare scelte.</LI>
              </UL>
              <P>Puoi rifiutare i cookie modificando le impostazioni del tuo browser. Tuttavia, in tal caso potresti non riuscire a usare alcune funzionalità del sito.</P>

              <H3>Uso dei tuoi dati personali</H3>
              <P>La Società può utilizzare i dati personali per:</P>
              <UL>
                <LI><Strong>Fornire e mantenere il servizio</Strong>, monitorandone l'utilizzo.</LI>
                <LI><Strong>Gestire il tuo account</Strong>, permettendoti l'accesso a diverse funzionalità.</LI>
                <LI><Strong>Eseguire un contratto</Strong> di acquisto o di servizio.</LI>
                <LI><Strong>Contattarti</Strong> via email, telefono, SMS o notifiche per aggiornamenti, comunicazioni e sicurezza.</LI>
                <LI><Strong>Fornire informazioni</Strong> su servizi e novità simili a quelli che hai richiesto, salvo opt-out.</LI>
                <LI><Strong>Gestire le tue richieste</Strong>.</LI>
                <LI><Strong>Trasferimenti aziendali</Strong> in caso di fusione, acquisizione o altre operazioni straordinarie.</LI>
                <LI><Strong>Altri scopi</Strong> come analisi dati, identificazione trend, valutazione campagne e miglioramento del servizio.</LI>
              </UL>

              <H4>Condivisione dei dati</H4>
              <P>Possiamo condividere i tuoi dati con: fornitori di servizi (per analisi e contatto), affiliati, partner commerciali, altri utenti (per le aree pubbliche), e con il tuo consenso esplicito.</P>

              <H3>Conservazione dei dati</H3>
              <P>Conserveremo i tuoi dati personali solo per il tempo necessario alle finalità indicate. I dati di utilizzo sono in genere conservati per un periodo più breve, salvo obblighi legali o necessità di sicurezza.</P>

              <H3>Trasferimento dei dati</H3>
              <P>I dati possono essere trattati presso le sedi operative della Società o presso altri luoghi dove le parti coinvolte sono ubicate. Adottiamo tutte le misure ragionevolmente necessarie per garantire un trattamento sicuro e conforme alla presente Policy.</P>

              <H3>Cancellazione dei dati</H3>
              <P>Hai il diritto di cancellare o richiedere la cancellazione dei dati personali raccolti. Puoi aggiornare, modificare o cancellare i tuoi dati in qualsiasi momento contattandoci. Potremmo dover conservare alcune informazioni se richiesto da obblighi legali.</P>

              <H3>Divulgazione dei tuoi dati personali</H3>
              <UL>
                <LI><Strong>Operazioni aziendali</Strong> · in caso di fusione o acquisizione, i dati possono essere trasferiti previa notifica.</LI>
                <LI><Strong>Forze dell'ordine</Strong> · possiamo divulgare dati su richiesta legale (tribunale, autorità).</LI>
                <LI><Strong>Altri obblighi legali</Strong> · per conformarsi a leggi, proteggere diritti, prevenire illeciti, tutelare la sicurezza degli utenti.</LI>
              </UL>

              <H3>Sicurezza dei dati</H3>
              <P>La sicurezza dei tuoi dati è importante per noi, ma nessun metodo di trasmissione su Internet o di archiviazione elettronica è sicuro al 100%. Adottiamo mezzi commercialmente accettabili per proteggere i tuoi dati senza poterne garantire la sicurezza assoluta.</P>

              <H3>Privacy dei minori</H3>
              <P>Il servizio non si rivolge a minori di 13 anni. Non raccogliamo consapevolmente dati personali da minori di 13 anni. Se sei un genitore e sai che tuo figlio ci ha fornito dati personali, contattaci: rimuoveremo le informazioni dai nostri server.</P>

              <H3>Link a siti di terzi</H3>
              <P>Il servizio può contenere link a siti di terzi non gestiti da noi. Ti consigliamo di leggere la Privacy Policy di ogni sito visitato. Non abbiamo alcun controllo né responsabilità sui contenuti, le politiche o le pratiche dei siti di terze parti.</P>

              <H3>Modifiche a questa Privacy Policy</H3>
              <P>Possiamo aggiornare la Privacy Policy di tanto in tanto. Ti notificheremo le modifiche pubblicando la nuova versione su questa pagina e aggiornando la data di "Ultimo aggiornamento". Ti consigliamo di rivedere periodicamente questa Policy.</P>

              <H3>Contatti</H3>
              <P>Per qualsiasi domanda relativa alla presente Privacy Policy puoi contattarci:</P>
              <UL>
                <LI>Email · <a href="mailto:ioterraservizi@gmail.com" style={{color:'var(--c-accent)',textDecoration:'none',borderBottom:'1px solid rgba(var(--c-accent-rgb),0.4)'}}>ioterraservizi@gmail.com</a></LI>
                <LI>Telefono · <a href="tel:+393665393733" style={{color:'var(--c-accent)',textDecoration:'none',borderBottom:'1px solid rgba(var(--c-accent-rgb),0.4)'}}>+39 366 539 3733</a></LI>
              </UL>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

// ========= TERMINI E CONDIZIONI =========
const PageTermini = () => {
  const { H3, H4, P, UL, LI, Strong, Em } = LegalShared;
  return (
    <>
      <section className="v3-section" style={{paddingBottom:24}}>
        <div className="v3-section-narrow">
          <Reveal>
            <div className="v3-tag" style={{marginBottom:16}}>NOTE LEGALI · 02</div>
            <h1 className="v3-h1">Termini<br/>e <em>Condizioni.</em></h1>
            <p style={{fontSize:18,lineHeight:1.6,color:'var(--c-onDark-muted)',marginTop:28,maxWidth:780}}>
              Termini e Condizioni di Servizio di IoTerra. L'accettazione di un preventivo emesso da IoTerra costituisce a tutti gli effetti una presa di incarico professionale e comporta l'accettazione integrale dei presenti Termini.
            </p>
            <p style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--c-accent)',marginTop:18}}>
              ● Ultimo aggiornamento: 20 settembre 2025
            </p>
          </Reveal>
        </div>
      </section>

      <section className="v3-section" style={{paddingTop:24}}>
        <div className="v3-section-narrow" style={{maxWidth:920}}>
          <Reveal>
            <div className="v3-card" style={{padding:48}}>
              <H3>1 · Servizi offerti</H3>
              <P>Offriamo servizi di consulenza agronomica, analisi del suolo, agricoltura di precisione, ricerca e sviluppo, e servizi digitali per il settore agricolo. I dettagli dei servizi e le modalità di prenotazione sono indicati nelle pagine dedicate del sito.</P>

              <H3>2 · Prenotazione</H3>
              <P>Le consulenze devono essere prenotate tramite il sito o contattandoci direttamente via telefono o email.</P>

              <H3>3 · Cancellazione</H3>
              <P>Oltre le 48 ore dall'accettazione del preventivo, il recesso comporta l'addebito del <Em>50% dell'importo totale</Em>, salvo importi superiori già dovuti per attività eseguite o costi documentabili sostenuti da IoTerra.</P>

              <H3>4 · Limitazione di responsabilità</H3>
              <P>Forniamo consulenze basate sulle migliori pratiche, ma non garantiamo risultati specifici. L'utente è responsabile delle decisioni prese sulla base delle informazioni ricevute.</P>

              <H3>5 · Modifiche ai termini</H3>
              <P>Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Le modifiche saranno effettive dalla data di pubblicazione sul sito.</P>

              <H3>6 · Privacy</H3>
              <P>
                Il trattamento dei dati personali avviene nel rispetto del Regolamento UE 2016/679 (GDPR). Per maggiori informazioni consulta la nostra <a href="#/privacy" style={{color:'var(--c-accent)',textDecoration:'none',borderBottom:'1px solid rgba(var(--c-accent-rgb),0.4)'}}>Privacy Policy</a>.
              </P>

              <H3>Contatti</H3>
              <P>Per qualsiasi domanda relativa ai presenti Termini puoi contattarci:</P>
              <UL>
                <LI>Email · <a href="mailto:ioterraservizi@gmail.com" style={{color:'var(--c-accent)',textDecoration:'none',borderBottom:'1px solid rgba(var(--c-accent-rgb),0.4)'}}>ioterraservizi@gmail.com</a></LI>
                <LI>Telefono · <a href="tel:+393665393733" style={{color:'var(--c-accent)',textDecoration:'none',borderBottom:'1px solid rgba(var(--c-accent-rgb),0.4)'}}>+39 366 539 3733</a></LI>
                <LI>Sede legale · Sardegna · IT</LI>
                <LI>P.IVA · 03034130900</LI>
              </UL>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

window.PagePrivacy = PagePrivacy;
window.PageTermini = PageTermini;
