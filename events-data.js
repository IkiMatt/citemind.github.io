/**
 * CiteMind — Gestione Eventi e Incontri
 * 
 * Per aggiungere o modificare un evento, modifica semplicemente questo file su GitHub!
 * Non serve toccare l'HTML: la pagina leggerà i dati e li mostrerà automaticamente.
 * 
 * Regole automatiche:
 * - Se la data è futura o oggi -> appare in "Prossimi Incontri" con il pulsante per partecipare.
 * - Se la data è passata -> si sposta automaticamente nella tabella "Archivio Incontri Precedenti".
 */

const CITEMIND_EVENTS = [
  {
    id: 1,
    date: "2026-10-13",               // Formato: AAAA-MM-GG (usato per l'ordinamento automatico)
    time: "21:00 CET (UTC+1)",         // Orario dell'incontro
    duration: "~45-60 min",            // Durata indicativa
    platform: "Google Meet",           // Piattaforma (es. Google Meet, Jitsi, Zoom)
    meet_url: "https://meet.google.com/czq-seun-dwb", // Link alla stanza della videochiamata
    
    // Titolo (Italiano e Inglese)
    title_it: "CiteMind Community Call #1 – Introduzione a Citemind",
    title_en: "CiteMind Community Call #1 – Introduction to Citemind",
    
    // Descrizione (Italiano e Inglese)
    desc_it: "In questo primo incontro aperto presenteremo le funzionalità, raccoglieremo feedback e desideri della community per le prossime release.",
    desc_en: "In this first open session and gather community feedback and feature requests for upcoming releases.",
    
    // Link facoltativi
    discussion_url: "https://github.com/IkiMatt/CiteMind/discussions", // Link discussione GitHub
    notes_url: ""                                                     // Link alle note/registrazione (per eventi passati)
  }

  /* ESEMPIO DI UN SECONDO EVENTO (basta decommentare e compilare):
  ,
  {
    id: 2,
    date: "2026-11-05",
    time: "18:30 CET",
    duration: "45 min",
    platform: "Google Meet",
    meet_url: "https://meet.google.com/xyz-abcd-efg",
    title_it: "CiteMind Call #2 – AI locale e ricerca semantica",
    title_en: "CiteMind Call #2 – Local AI & Semantic Search",
    desc_it: "Focus sull'integrazione di Ollama, estrazione keyword e similarità vettoriale in CiteMind.",
    desc_en: "Deep dive into Ollama integration, keyword extraction, and vector similarity in CiteMind.",
    discussion_url: "https://github.com/IkiMatt/CiteMind/discussions",
    notes_url: ""
  }
  */
];
