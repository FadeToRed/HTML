// ============================================================ 
// COSTANTI DI CONFIGURAZIONE 
// ============================================================ 
var LIVELLO_INIZIALE = 1; 
var EXP_INIZIALE = 0; 
var EXP_MASSIMA = 100; 
var JENNY_INIZIALI = 10000; 
var HC_INIZIALI = 0; 
var NEN_INIZIALE = 0; 
var TENACIA_INIZIALE = 10; 
 
var SBLOCCO_COMPETENZE = [10, 20, 30, 40, 50]; 
 
var STAT_BASE = { 
 forza: 5, resistenza: 5, velocita: 5, riflessi: 5, destrezza: 5, 
 mira: 5, intelligenza: 5, carisma: 5, istinto: 5, fortuna: 5, 
 vita: 300, aura: 500 
}; 
 
var BONUS_LUOGO = { 
 'Neo Green Life':            { resistenza: 5, velocita: 5, riflessi: 5 }, 
 'Repubblica di Padokia':     { riflessi: 5, destrezza: 5, intelligenza: 5 }, 
 'York Shin':                 { mira: 5, intelligenza: 5, carisma: 5 }, 
 'Città delle Stelle Cadenti':{ forza: 5, resistenza: 5, destrezza: 5 }, 
 'Zapan':                     { forza: 5, intelligenza: 5, carisma: 5 } 
}; 
 
// Luoghi esclusivi Bestie Demoniache (nessun bonus stat) 
var LUOGHI_BESTIA = { 
 'Kiriko':              ['Insediamento Melioras'], 
 'Scimmia Antropomorfa':['Villaggio di Trakey'], 
 'Guardiano':           ['Villaggio di Blackbird'], 
 'Kitsune':             ['Villaggio delle Nuvole', 'Villaggio dei Fiori'], 
 'Dai Tengu':           ['Monte Hiei', 'Monte Kurama'], 
 'Karasu Tengu':        ['Monte Hiei', 'Monte Kurama'], 
 'Were-pire':           ['Città Eterna'], 
 'Formichimera Umana':  Object.keys(BONUS_LUOGO) // tutti i luoghi umani, senza bonus 
}; 
 
// Dati per ogni specie di Bestia Demoniaca 
var DATI_SPECIE = { 
 'Kiriko':              { rank: 'E', conservazione: 'Vulnerabile (VU)',                    fedina: 'Incensurato' }, 
 'Scimmia Antropomorfa':{ rank: 'A', conservazione: 'Rischio Minimo (LC)',                 fedina: 'Ricercato' }, 
 'Guardiano':           { rank: 'C', conservazione: 'Critico (CR)',                        fedina: 'Ricercato' }, 
 'Kitsune':             { rank: 'C', conservazione: 'Rischio Minimo (LC)',                 fedina: 'Ricercato' }, 
 'Dai Tengu':           { rank: 'D', conservazione: 'Vulnerabile (VU)',                    fedina: 'Incensurato' }, 
 'Karasu Tengu':        { rank: 'D', conservazione: 'Vulnerabile (VU)',                    fedina: 'Incensurato' }, 
 'Were-pire':           { rank: 'D', conservazione: 'Rischio Minimo (LC)',                 fedina: 'Incensurato' }, 
 'Formichimera Umana':  { rank: 'B', conservazione: 'Probabilmente Estinto in Natura (PEW)', fedina: 'Ricercato' } 
}; 
 
var SPECIE_BESTIA = Object.keys(DATI_SPECIE); 
 
// Valore taglia minimo per classificazione 
var VALORE_TAGLIA_BASE = { 
 'E': 1000, 'D': 50000, 'C': 100000, 'B': 250000, 
 'A': 750000, 'S': 1500000, 'SS': 3000000, 'SSS': 5000000 
}; 
var CLASSIFICAZIONI_TAGLIA = ['E','D','C','B','A','S','SS','SSS']; 
 
var BONUS_CLASSE = { 
 'Hacker': { intelligenza: 10 } 
}; 
 
var TIPI_HATSU = [ 
 'Non ancora sbloccato',
 'Irrobustimento (&#24375;&#21270;)', 
 'Emissione (&#25918;&#20986;)', 
 'Trasformazione (&#22793;&#21270;)', 
 'Manipolazione (&#25805;&#20316;)', 
 'Concretizzazione (&#20855;&#29616;&#21270;)', 
 'Specializzazione (&#29305;&#36074;)' 
]; 
 
 
// Classi attive (0 = disponibile) — usato per nuove schede 
var CLASSI = Object.keys(CLASSI_CONFIG).filter(function(c){ return CLASSI_CONFIG[c] === 0; }); 
// Tutte le classi — usato in modifica per non perdere classi disabilitate 
var CLASSI_TUTTE = Object.keys(CLASSI_CONFIG); 
 
var LUOGHI_UMANI = Object.keys(BONUS_LUOGO); 
// Tutti i luoghi visibili nel menù (umani + bestia, deduplicati) 
var LUOGHI_TUTTI = (function(){ 
 var tutti = LUOGHI_UMANI.slice(); 
 var visti = {}; 
 for (var i = 0; i < tutti.length; i++) visti[tutti[i]] = true; 
 for (var sp in LUOGHI_BESTIA) { 
  var ll = LUOGHI_BESTIA[sp]; 
  for (var j = 0; j < ll.length; j++) { 
   if (!visti[ll[j]]) { tutti.push(ll[j]); visti[ll[j]] = true; } 
  } 
 } 
 return tutti; 
})(); 
 
var STATUS = ['Nessuno', 'Criminale', 'Hunter', 'Lottatore/trice Celeste', 'Assassino/a', 'Zampa']; 
 
var SEGNI_ZODIACALI = [ 
 'Ariete', 'Toro', 'Gemelli', 'Cancro', 'Leone', 'Vergine', 
 'Bilancia', 'Scorpione', 'Sagittario', 'Capricorno', 'Acquario', 'Pesci' 
]; 
 
var SEGNI_CINESI = [ 
 'Topo', 'Bue', 'Tigre', 'Coniglio', 'Drago', 'Serpente', 
 'Cavallo', 'Capra', 'Scimmia', 'Gallo', 'Cane', 'Maiale' 
]; 
 
var MBTI_TIPI = [ 
 'INTJ', 'INTP', 'ENTJ', 'ENTP', 
 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 
 'ISTP', 'ISFP', 'ESTP', 'ESFP' 
]; 
 
var ALLINEAMENTI = [ 
 'Legale Buono', 'Neutrale Buono', 'Caotico Buono', 
 'Legale Neutrale', 'Neutrale Puro', 'Caotico Neutrale', 
 'Legale Malvagio', 'Neutrale Malvagio', 'Caotico Malvagio' 
]; 
 
 
// ============================================================ 
// STATO GLOBALE 
// ============================================================ 
var stato = { 
 modalita: null, 
 palette: null, 
 schedaOriginale: null 
}; 
 
// ============================================================ 
// NAVIGAZIONE TRA SCHERMATE 
// ============================================================ 
function mostraSchermata(id) { 
 var schermate = ['schermata-scelta', 'schermata-palette', 'schermata-form']; 
 for (var i = 0; i < schermate.length; i++) { 
  var el = document.getElementById(schermate[i]); 
  if (el) el.style.display = 'none'; 
 } 
 var target = document.getElementById(id); 
 if (target) { 
  target.style.display = 'block'; 
  target.style.opacity = '0'; 
  target.style.transform = 'translateY(20px)'; 
  setTimeout(function() { 
   target.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; 
   target.style.opacity = '1'; 
   target.style.transform = 'translateY(0)'; 
  }, 10); 
 } 
} 
 
function scegliModalita(modalita) { 
 stato.modalita = modalita; 
 var btnNuova = document.getElementById('btn-nuova'); 
 var btnModifica = document.getElementById('btn-modifica'); 
 if (modalita === 'nuova') { 
  btnNuova.style.borderColor = '#CFF09E'; 
  btnNuova.style.background = 'rgba(207,240,158,0.12)'; 
  btnModifica.style.borderColor = '#3B8686'; 
  btnModifica.style.background = 'rgba(0,0,0,0.2)'; 
 } else { 
  btnModifica.style.borderColor = '#CFF09E'; 
  btnModifica.style.background = 'rgba(207,240,158,0.12)'; 
  btnNuova.style.borderColor = '#3B8686'; 
  btnNuova.style.background = 'rgba(0,0,0,0.2)'; 
 } 
 setTimeout(function() { 
  mostraSchermata('schermata-palette'); 
  costruisciGalleriaPalette(); 
 }, 300); 
} 
 
function costruisciGalleriaPalette() { 
 var container = document.getElementById('galleria-palette'); 
 var html = ''; 
 
 if (stato.modalita === 'modifica') { 
  html += '<div onclick="selezionaPalette(\'mantieni\')" id="card-mantieni" style="cursor:pointer; border:2px dashed #3B8686; border-radius:12px; overflow:hidden; transition:all 0.3s; width:220px; display:inline-block; margin:12px; vertical-align:top; box-shadow:0 4px 15px rgba(0,0,0,0.3);">'; 
  html += '<div style="height:140px; background:#0B486B; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px;">'; 
  html += '<i class="fa-solid fa-rotate-left" style="font-size:2.2em; color:#8FBEBA;"></i>'; 
  html += '<span style="color:#8FBEBA; font-size:0.85em; font-style:italic;">Modifica solo il contenuto, non la struttura!</span>'; 
  html += '</div>'; 
  html += '<div style="padding:10px 14px; background:#0B486B; border-top:1px solid #3B8686;">'; 
  html += '<span style="color:#8FBEBA; font-family:\'Montserrat\'; font-size:1.2em;">Mantieni le Personalizzazioni!</span>'; 
  html += '</div></div>'; 
 } 
 
 for (var i = 0; i < PALETTE.length; i++) { 
  var p = PALETTE[i]; 
  html += '<div onclick="selezionaPalette(\'' + p.id + '\')" id="card-' + p.id + '" style="cursor:pointer; border:2px solid ' + p.bordo + '; border-radius:12px; overflow:hidden; transition:all 0.3s; width:220px; display:inline-block; margin:12px; vertical-align:top; box-shadow:0 4px 15px rgba(0,0,0,0.3);">'; 
  html += '<div style="height:140px; background:' + p.sfondo + '; padding:14px; box-sizing:border-box;">'; 
  html += '<div style="background:' + p.titolo1 + '; border:1px solid ' + p.bordo + '; border-radius:6px; padding:6px 10px; margin-bottom:8px; display:flex; align-items:center; gap:6px;">'; 
  html += '<div style="width:28px; height:28px; border-radius:50%; background:' + p.sfondo2 + '; border:1px solid ' + p.bordo + ';"></div>'; 
  html += '<div style="flex:1;">'; 
  html += '<div style="height:6px; border-radius:3px; background:' + p.titolo2 + '; margin-bottom:4px; width:70%;"></div>'; 
  html += '<div style="height:5px; border-radius:3px; background:' + p.testo + '; opacity:0.5; width:50%;"></div>'; 
  html += '</div></div>'; 
  html += '<div style="display:flex; gap:5px; margin-bottom:6px;">'; 
  for (var b = 0; b < 4; b++) { 
   html += '<div style="flex:1; height:20px; border-radius:4px; background:' + p.sfondo2 + '; border:1px solid ' + p.bordo + '; display:flex; align-items:center; justify-content:center;">'; 
   html += '<div style="width:60%; height:4px; border-radius:2px; background:' + p.titolo2 + ';"></div>'; 
   html += '</div>'; 
  } 
  html += '</div>'; 
  html += '<div style="height:5px; border-radius:3px; background:' + p.testo + '; opacity:0.4; width:90%; margin-bottom:4px;"></div>'; 
  html += '<div style="height:5px; border-radius:3px; background:' + p.testo + '; opacity:0.3; width:70%;"></div>'; 
  html += '</div>'; 
  html += '<div style="padding:10px 14px; background:' + p.titolo1 + '; border-top:1px solid ' + p.bordo + '; display:flex; align-items:center; justify-content:space-between;">'; 
  html += '<span style="color:' + p.vitale + '; font-family:\'Montserrat\',serif; font-size:1.2em; font-weight:600;">' + p.nome + '</span>'; 
  html += '<i class="fa-solid fa-palette" style="color:' + p.testo + '; font-size:0.9em;"></i>'; 
  html += '</div></div>'; 
 } 
 
 container.innerHTML = html; 
} 
 
function selezionaPalette(paletteId) { 
 stato.palette = paletteId; 
 var allIds = []; 
 for (var i = 0; i < PALETTE.length; i++) allIds.push('card-' + PALETTE[i].id); 
 allIds.push('card-mantieni'); 
 for (var i = 0; i < allIds.length; i++) { 
  var card = document.getElementById(allIds[i]); 
  if (card) { 
   card.style.transform = 'scale(1)'; 
   card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)'; 
   card.style.outline = 'none'; 
  } 
 } 
 var sel = document.getElementById('card-' + paletteId); 
 if (sel) { 
  sel.style.transform = 'scale(1.05)'; 
  sel.style.boxShadow = '0 0 25px rgba(207,240,158,0.35)'; 
  sel.style.outline = '2px solid #CFF09E'; 
 } 
 setTimeout(function() { 
  mostraSchermata('schermata-form'); 
  costruisciForm(); 
 }, 400); 
} 
 
// ============================================================ 
// STILI BASE 
// ============================================================ 
var STILE_SEZIONE = 'background:#0B486B; border:2px solid #292354; border-radius:12px; padding:25px; margin-bottom:20px;'; 
var STILE_INPUT = 'width:100%; padding:10px 14px; background:#292354; border:1px solid #3B8686; border-radius:6px; color:#E2F7C4; font-family:\'Montserrat\'; font-size:1em; box-sizing:border-box; outline:none;'; 
var STILE_LABEL = 'display:block; color:#CFF09E; font-size:0.9em; margin-bottom:5px; font-family:\'Montserrat\';'; 
var STILE_READONLY = 'display:block; padding:10px 14px; background:#292354; border:1px solid #3B8686; border-radius:6px; color:#8FBEBA; font-family:\'Montserrat\'; font-size:1em; opacity:0.75;'; 
 
// ============================================================ 
// HELPERS LAYOUT 
// ============================================================ 
function riga2(a, b) { 
 return '<table style="width:100%; border-collapse:collapse; table-layout:fixed;">' + 
  '<tr><td style="width:50%; padding-right:7px; vertical-align:top;">' + a + '</td>' + 
  '<td style="width:50%; padding-left:7px; vertical-align:top;">' + b + '</td></tr>' + 
  '</table>'; 
} 
 
function riga3(a, b, c) { 
 return '<table style="width:100%; border-collapse:collapse; table-layout:fixed;">' + 
  '<tr>' + 
  '<td style="width:33%; padding-right:5px; vertical-align:top;">' + a + '</td>' + 
  '<td style="width:34%; padding-left:5px; padding-right:5px; vertical-align:top;">' + b + '</td>' + 
  '<td style="width:33%; padding-left:5px; vertical-align:top;">' + c + '</td>' + 
  '</tr></table>'; 
} 
 
function riga4(a, b, c, d) { 
 return '<table style="width:100%; border-collapse:collapse; table-layout:fixed;">' + 
  '<tr>' + 
  '<td style="width:25%; padding-right:4px; vertical-align:top;">' + a + '</td>' + 
  '<td style="width:25%; padding-left:4px; padding-right:4px; vertical-align:top;">' + b + '</td>' + 
  '<td style="width:25%; padding-left:4px; padding-right:4px; vertical-align:top;">' + c + '</td>' + 
  '<td style="width:25%; padding-left:4px; vertical-align:top;">' + d + '</td>' + 
  '</tr></table>'; 
} 
 
function rigaStat5(celle) { 
 var html = '<table style="width:100%; border-collapse:collapse; table-layout:fixed; margin-bottom:8px;"><tr>'; 
 for (var i = 0; i < celle.length; i++) { 
  var pl = i > 0 ? 'padding-left:4px;' : ''; 
  var pr = i < celle.length - 1 ? 'padding-right:4px;' : ''; 
  html += '<td style="width:20%; ' + pl + pr + ' vertical-align:top;">' + celle[i] + '</td>'; 
 } 
 html += '</tr></table>'; 
 return html; 
} 
 
// ============================================================ 
// COSTRUZIONE FORM 
// ============================================================ 
function costruisciForm() { 
 var container = document.getElementById('form-container'); 
 var isNuova = stato.modalita === 'nuova'; 
 var html = ''; 
 
 // PATCH 1: Importa in cima (solo modalità modifica) 
 if (!isNuova) { 
  html += sezioneForm('<i class="fa-solid fa-file-import"></i> Importa Scheda Esistente', costruisciImporta()); 
 } 
 
 html += sezioneForm('<i class="fa-solid fa-user"></i> Dati Personali', costruisciDatiPersonali(isNuova)); 
 html += sezioneForm('<i class="fa-solid fa-image"></i> Immagini', costruisciImmagini()); 
 html += sezioneForm('<i class="fa-solid fa-star"></i> Info &amp; Personalità', costruisciInfo()); 
 html += sezioneForm('<i class="fa-solid fa-chart-bar"></i> Statistiche', costruisciStatistiche(isNuova)); 
 html += sezioneForm('<i class="fa-solid fa-fire"></i> Abilità Nen', costruisciNen(isNuova)); 
 html += sezioneForm('<i class="fa-solid fa-scroll"></i> Quest', costruisciQuest(isNuova)); 
 html += sezioneForm('<i class="fa-solid fa-bag-shopping"></i> Baule', costruisciBalue()); 
 html += sezioneForm('<i class="fa-solid fa-music"></i> Musica', costruisciMusica()); 
 
 html += '<div style="text-align:center; margin-top:40px; padding-bottom:40px;">'; 
 html += '<button onclick="generaScheda()" style="background:linear-gradient(135deg,#A8DBA8 0%,#79BD9A 100%); color:#1a2e1a; border:none; padding:18px 60px; font-size:1.3em; font-weight:700; border-radius:10px; cursor:pointer; font-family:\'Montserrat\'; box-shadow:0 6px 25px rgba(0,0,0,0.4); text-transform:uppercase; letter-spacing:2px; transition:all 0.3s;">'; 
 html += '<i class="fa-solid fa-wand-magic-sparkles"></i> Genera Scheda</button>'; 
 html += '</div>'; 
 
 container.innerHTML = html; 
 
 if (isNuova) { 
  var luogoEl = document.getElementById('campo-luogo'); 
  var classeEl = document.getElementById('campo-classe'); 
  if (luogoEl) luogoEl.onchange = aggiornaStatNuova; 
  if (classeEl) classeEl.onchange = aggiornaStatNuova; 
  aggiornaRazza(true); 
 } else { 
  aggiornaRazza(false); 
  aggiornaCompetenze(); 
  // Fedina penale: mostra/nascondi taglia al cambio manuale 
  var feEl = document.getElementById('campo-fedina'); 
  if (feEl) feEl.onchange = function(){ aggiornaFedina(false); }; 
 } 
} 
 
function sezioneForm(titolo, contenuto) { 
 return '<div style="' + STILE_SEZIONE + '">' + 
  '<h3 style="color:#CFF09E; font-family:\'Montserrat\'; font-size:1.35em; margin-bottom:20px; border-bottom:1px solid #3B8686; padding-bottom:10px;">' + titolo + '</h3>' + 
  contenuto + '</div>'; 
} 
 
function inputText(id, label, placeholder, valore, readonly) { 
 var stile = readonly ? STILE_INPUT + ' opacity:0.55; cursor:not-allowed;' : STILE_INPUT; 
 var ro = readonly ? ' readonly' : ''; 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<input type="text" id="' + id + '" placeholder="' + (placeholder||'') + '" value="' + (valore||'') + '"' + ro + ' style="' + stile + '">' + 
  '</div>'; 
} 
 
function inputDate(id, label) { 
 var mesi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno', 
  'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']; 
 var opG = '<option value="">—</option>', opM = '<option value="">—</option>', opA = '<option value="">—</option>'; 
 for (var g = 1; g <= 31; g++) { 
  opG += '<option value="' + (g < 10 ? '0'+g : g) + '">' + g + '</option>'; 
 } 
 for (var m = 0; m < 12; m++) { 
  opM += '<option value="' + mesi[m] + '">' + mesi[m] + '</option>'; 
 } 
 for (var a = 2017; a >= 1900; a--) { 
  opA += '<option value="' + a + '">' + a + '</option>'; 
 } 
 var sel = STILE_INPUT + ' background:#292354;'; 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;">' + 
  '<tr>' + 
  '<td style="width:25%; padding-right:6px; vertical-align:top;">' + 
  '<select id="' + id + '-g" style="' + sel + '">' + opG + '</select>' + 
  '<div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Giorno</div>' + 
  '</td>' + 
  '<td style="width:45%; padding-left:3px; padding-right:3px; vertical-align:top;">' + 
  '<select id="' + id + '-m" style="' + sel + '">' + opM + '</select>' + 
  '<div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Mese</div>' + 
  '</td>' + 
  '<td style="width:30%; padding-left:6px; vertical-align:top;">' + 
  '<select id="' + id + '-a" style="' + sel + '">' + opA + '</select>' + 
  '<div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Anno</div>' + 
  '</td>' + 
  '</tr></table>' + 
  '</div>'; 
} 
 
function leggiData(id) { 
 var g = document.getElementById(id + '-g'); 
 var m = document.getElementById(id + '-m'); 
 var a = document.getElementById(id + '-a'); 
 if (!g || !m || !a) return '—'; 
 var vg = g.value, vm = m.value, va = a.value; 
 // Giorno da solo non è valido 
 if (vg && !vm && !va) return '—'; 
 if (!vg && !vm && !va) return '—'; 
 // Costruisce la stringa con solo i pezzi presenti 
 if (vg && vm && va)   return vg + ' ' + vm + ' ' + va; 
 if (vg && vm && !va)  return vg + ' ' + vm; 
 if (!vg && vm && va)  return vm + ' ' + va; 
 if (!vg && vm && !va) return vm; 
 if (!vg && !vm && va) return va; 
 return '—'; 
} 
 
function inputTextarea(id, label, placeholder, righe) { 
 righe = righe || 4; 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<textarea id="' + id + '" placeholder="' + (placeholder||'') + '" rows="' + righe + '" style="' + STILE_INPUT + ' resize:vertical;"></textarea>' + 
  '</div>'; 
} 
 
function inputSelect(id, label, opzioni) { 
 var html = '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<select id="' + id + '" style="' + STILE_INPUT + ' background:#292354;">'; 
 for (var i = 0; i < opzioni.length; i++) { 
  html += '<option value="' + opzioni[i] + '">' + opzioni[i] + '</option>'; 
 } 
 html += '</select></div>'; 
 return html; 
} 
 
function campoReadonly(label, valore) { 
 return '<div style="margin-bottom:14px;">' + 
  '<label style="' + STILE_LABEL + '">' + label + '</label>' + 
  '<div style="' + STILE_READONLY + '">' + valore + '</div>' + 
  '</div>'; 
} 
 
// ============================================================ 
// COSTRUTTORI SEZIONI 
// ============================================================ 
function costruisciDatiPersonali(isNuova) { 
 var html = ''; 
 html += riga2(inputText('campo-nome','Nome','Es. Gon'), inputText('campo-cognome','Cognome','Es. Freecs')); 
 html += riga2(inputText('campo-genere','Genere','Uomo / Donna / Neutro / Ecc.'), 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Razza</label>' + 
  '<select id="campo-razza" onchange="aggiornaRazza('+isNuova+')" style="'+STILE_INPUT+' background:#292354;">' + 
  '<option value="Umano">Umano</option>' + 
  '<option value="Bestia Demoniaca">Bestia Demoniaca</option>' + 
  '</select></div>' 
 ); 
 // Specie (visibile solo se Bestia Demoniaca) 
 html += '<div id="campo-specie-wrap" style="display:none; margin-bottom:14px;">' + 
  '<label style="'+STILE_LABEL+'">Specie</label>' + 
  '<select id="campo-specie" onchange="aggiornaRazza('+isNuova+')" style="'+STILE_INPUT+' background:#292354;">'; 
 for (var sp = 0; sp < SPECIE_BESTIA.length; sp++) { 
  html += '<option value="'+SPECIE_BESTIA[sp]+'">'+SPECIE_BESTIA[sp]+'</option>'; 
 } 
 html += '</select></div>'; 
 // Rank e Stato di Conservazione (readonly, calcolati da specie) 
 html += '<div id="campo-rank-wrap" style="display:none;">' + 
  riga2( 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Rank di Pericolosità</label><div id="campo-rank-val" style="'+STILE_READONLY+'">—</div></div>', 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Stato di Conservazione</label><div id="campo-conservazione-val" style="'+STILE_READONLY+'">—</div></div>' 
  ) + 
 '</div>'; 
 // Luogo di nascita — menù unico, le opzioni vengono filtrate da aggiornaRazza 
 html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Luogo di nascita</label>' + 
  '<select id="campo-luogo" onchange="aggiornaStatNuova()" style="'+STILE_INPUT+' background:#292354;"></select></div>'; 
 html += inputDate('campo-datanascita', 'Data di nascita'); 
 html += riga2(inputSelect('campo-segno','Segno zodiacale', SEGNI_ZODIACALI), inputSelect('campo-segnocinese','Segno zodiacale cinese', SEGNI_CINESI)); 
 html += riga2(inputSelect('campo-mbti','MBTI', MBTI_TIPI), inputSelect('campo-allineamento','Allineamento', ALLINEAMENTI)); 
 html += inputText('campo-mestiere','Mestiere','Es. Assassino'); 
 // Classe (visibile solo per Umani) 
 html += '<div id="campo-classe-wrap">' + 
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classe</label>' + 
  '<select id="campo-classe" style="'+STILE_INPUT+' background:#292354;"></select></div>' + 
 '</div>'; 
 // Fedina penale 
 if (isNuova) { 
  html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Fedina Penale</label><div id="campo-fedina-val" style="'+STILE_READONLY+'">Incensurato</div></div>'; 
 } else { 
  html += '<div id="campo-fedina-wrap" style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Fedina Penale</label>' + 
   '<select id="campo-fedina" style="'+STILE_INPUT+' background:#292354;">' + 
   '<option value="Incensurato">Incensurato</option>' + 
   '<option value="Ricercato">Ricercato</option>' + 
   '</select></div>'; 
 } 
 // Taglia (visibile solo se Ricercato) 
 html += '<div id="campo-taglia-wrap" style="display:none;">'; 
 if (isNuova) { 
  // Per nuove schede la classificazione è sempre E (per Bestie rank A/B/C), readonly 
  html += riga2( 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classificazione Taglia</label><div id="campo-classtaglia-val" style="'+STILE_READONLY+'">E</div></div>', 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Valore Taglia (Jenny)</label><div id="campo-valtaglia-val" style="'+STILE_READONLY+'">1.000</div></div>' 
  ); 
 } else { 
  // Bestie A/B/C: classificazione E fissa (readonly). Altri: select da D in su (E esclusa). 
  var opzioniTaglia = ''; 
  for (var ct = 0; ct < CLASSIFICAZIONI_TAGLIA.length; ct++) { 
   if (CLASSIFICAZIONI_TAGLIA[ct] === 'E') continue; // E non selezionabile in modifica 
   opzioniTaglia += '<option value="'+CLASSIFICAZIONI_TAGLIA[ct]+'">'+CLASSIFICAZIONI_TAGLIA[ct]+'</option>'; 
  } 
  html += riga2( 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classificazione Taglia</label>' + 
   '<div id="campo-classtaglia-readonly" style="'+STILE_READONLY+'; display:none;">E</div>' + 
   '<select id="campo-classtaglia" onchange="aggiornaTaglia()" style="'+STILE_INPUT+' background:#292354;">' + 
   opzioniTaglia + '</select></div>', 
   inputText('campo-valtaglia','Valore Taglia (Jenny)','Es. 1000') 
  ); 
 } 
 html += '</div>'; 
 
 if (isNuova) { 
  html += campoReadonly('Status', 'Nessuno'); 
  html += riga4( 
   campoReadonly('Livello', LIVELLO_INIZIALE), 
   campoReadonly('EXP', EXP_INIZIALE+'/'+EXP_MASSIMA), 
   campoReadonly('Jenny', JENNY_INIZIALI.toLocaleString()), 
   campoReadonly('HC', HC_INIZIALI) 
  ); 
 } else { 
  html += inputSelect('campo-status','Status', STATUS); 
  html += riga2( 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Livello</label><input type="text" id="campo-livello" placeholder="Es. 30" oninput="aggiornaCompetenze()" style="'+STILE_INPUT+'"></div>', 
   inputText('campo-exp','EXP attuale','Es. 50') 
  ); 
  html += inputText('campo-exptot','EXP per level up','', '100', true); 
  html += riga2(inputText('campo-jenny','Jenny','Es. 10000'), inputText('campo-hc','HC','Es. 0')); 
 } 
 return html; 
} 
 
function costruisciImmagini() { 
 var html = inputText('campo-img-laterale','Immagine Header (URL) — dimensioni ideali: 664x184px. Immagini di dimensioni diverse verranno ridimensionate automaticamente.','https://...'); 
 html += inputText('campo-img-dati','Immagine slide Dati (URL) — dimensioni ideali: 214x429px. Immagini di dimensioni diverse verranno ridimensionate automaticamente.','https://...'); 
 html += '<div style="margin-bottom:14px;">'; 
 html += '<label style="' + STILE_LABEL + '">Immagine slide Info</label>'; 
 html += '<div style="display:flex; gap:12px; margin-bottom:8px;">'; 
 html += '<label style="display:flex; align-items:center; gap:6px; color:#8FBEBA; font-size:0.85em; cursor:pointer;"><input type="radio" name="img-info-modo" value="1" checked onchange="aggiornaInputImgInfo()"> Una immagine</label>'; 
 html += '<label style="display:flex; align-items:center; gap:6px; color:#8FBEBA; font-size:0.85em; cursor:pointer;"><input type="radio" name="img-info-modo" value="2" onchange="aggiornaInputImgInfo()"> Due immagini</label>'; 
 html += '</div>'; 
 html += '<div id="img-info-wrap-1">' + inputText('campo-img-info','URL immagine — dimensioni ideali: 154x429px. Immagini di dimensioni diverse verranno ridimensionate automaticamente.','https://...') + '</div>'; 
 html += '<div id="img-info-wrap-2" style="display:none;">' + inputText('campo-img-info-a','URL immagine 1 — dimensioni ideali: 154x204px.','https://...') + inputText('campo-img-info-b','URL immagine 2 — dimensioni ideali: 154x204px.','https://...') + '</div>'; 
 html += '</div>'; 
 return html; 
}

function aggiornaInputImgInfo() { 
 var modo = document['querySelector']('input[name="img-info-modo"]:checked'); 
 var v = modo ? modo.value : '1'; 
 document.getElementById('img-info-wrap-1').style.display = v === '1' ? '' : 'none'; 
 document.getElementById('img-info-wrap-2').style.display = v === '2' ? '' : 'none'; 
} 
 
function costruisciInfo() { 
 var html = riga3( 
  inputText('campo-agg1','Aggettivo 1','Es. Coraggioso'), 
  inputText('campo-agg2','Aggettivo 2','Es. Determinato'), 
  inputText('campo-agg3','Aggettivo 3','Es. Creativo') 
 ); 
 html += inputText('campo-citazione','Citazione del personaggio','Citazione...'); 
 html += inputTextarea('campo-aspetto','Descrizione','Descrivi aspetto fisico e carattere del tuo personaggio...', 5); 
 html += inputTextarea('campo-background','Background','Racconta la storia del tuo personaggio...', 6); 
 return html; 
} 
 
function costruisciStatistiche(isNuova) { 
 var html = ''; 
 var nomiStat = ['Forza','Resistenza','Velocità','Riflessi','Destrezza','Mira','Intelligenza','Carisma','Istinto','Fortuna']; 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 
 if (isNuova) { 
  html += '<p style="color:#8FBEBA; font-size:0.9em; margin-bottom:8px; font-style:italic;">Statistiche di base calcolate da luogo e classe. Puoi ridistribuire <b>25 punti extra</b> (multipli di 5) a piacimento, escluse Vita e Aura.</p>'; 
  html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:10px 16px; margin-bottom:14px; display:flex; align-items:center; gap:10px;">'; 
  html += '<i class="fa-solid fa-coins" style="color:#CFF09E;"></i> '; 
  html += '<span id="punti-extra-counter" style="color:#8FBEBA; font-size:0.95em; font-weight:600;">25 punti rimanenti</span>'; 
  html += '</div>'; 
  var r1 = [], r2 = []; 
  for (var i = 0; i < 5; i++) { 
   r1.push( 
    '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
    '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">'+nomiStat[i]+'</div>' + 
    '<div id="stat-'+ls[i]+'" style="color:#CFF09E; font-size:1.2em; font-weight:700;">5</div>' + 
    '<span style="display:none;" id="stat-base-'+ls[i]+'">5</span>' + 
    '<input type="hidden" id="stat-extra-'+ls[i]+'" value="0">' + 
    '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
    '<button onclick="modificaStatExtra(\''+ls[i]+'\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">−</button>' + 
    '<button onclick="modificaStatExtra(\''+ls[i]+'\',5)"  style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
    '</div></div>' 
   ); 
  } 
  for (var j = 5; j < 10; j++) { 
   r2.push( 
    '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
    '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">'+nomiStat[j]+'</div>' + 
    '<div id="stat-'+ls[j]+'" style="color:#CFF09E; font-size:1.2em; font-weight:700;">5</div>' + 
    '<span style="display:none;" id="stat-base-'+ls[j]+'">5</span>' + 
    '<input type="hidden" id="stat-extra-'+ls[j]+'" value="0">' + 
    '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
    '<button onclick="modificaStatExtra(\''+ls[j]+'\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">−</button>' + 
    '<button onclick="modificaStatExtra(\''+ls[j]+'\',5)"  style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
    '</div></div>' 
   ); 
  } 
  html += rigaStat5(r1); 
  html += rigaStat5(r2); 
  html += riga2( 
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:10px;"><div style="color:#8FBEBA; font-size:0.78em; margin-bottom:4px;">Vita</div><div id="stat-vita" style="color:#CFF09E; font-size:1.3em; font-weight:700;">300</div></div>', 
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:10px;"><div style="color:#8FBEBA; font-size:0.78em; margin-bottom:4px;">Aura</div><div id="stat-aura" style="color:#CFF09E; font-size:1.3em; font-weight:700;">500</div></div>' 
  ); 
 } else { 
  html += '<p style="color:#8FBEBA; font-size:0.85em; margin-bottom:15px; font-style:italic;">Multipli di 5 (Vita e Aura: multipli di 100). Max stat normali: 250 (400 se over), Vita: 3000, Aura: 5000.</p>'; 
  var r3 = [], r4 = []; 
  for (var k = 0; k < 5; k++) { 
   r3.push('<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
    '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">' + nomiStat[k] + '</div>' + 
    '<input type="number" id="stat-' + ls[k] + '" value="5" min="5" max="400" step="5" onchange="validaStat(this,false)" style="width:60px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' + 
    '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
    '<button onclick="stepStat(\'' + ls[k] + '\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' + 
    '<button onclick="stepStat(\'' + ls[k] + '\',5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
    '</div>' + 
    '<label style="display:block; color:#8FBEBA; font-size:0.72em; margin-top:5px; cursor:pointer;"><input type="checkbox" id="over-' + ls[k] + '" onchange="toggleOver(this,\'' + ls[k] + '\')"> over</label></div>'); 
  } 
  for (var m2 = 5; m2 < 10; m2++) { 
   r4.push('<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
    '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">' + nomiStat[m2] + '</div>' + 
    '<input type="number" id="stat-' + ls[m2] + '" value="5" min="5" max="400" step="5" onchange="validaStat(this,false)" style="width:60px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' + 
    '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
    '<button onclick="stepStat(\'' + ls[m2] + '\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' + 
    '<button onclick="stepStat(\'' + ls[m2] + '\',5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
    '</div>' + 
    '<label style="display:block; color:#8FBEBA; font-size:0.72em; margin-top:5px; cursor:pointer;"><input type="checkbox" id="over-' + ls[m2] + '" onchange="toggleOver(this,\'' + ls[m2] + '\')"> over</label></div>'); 
  } 
  html += rigaStat5(r3); 
  html += rigaStat5(r4); 
  html += riga2( 
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
   '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">Vita</div>' + 
   '<input type="number" id="stat-vita" value="300" min="300" max="3000" step="100" onchange="validaStat(this,true)" style="width:70px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' + 
   '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
   '<button onclick="stepStat(\'vita\',-100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' + 
   '<button onclick="stepStat(\'vita\',100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
   '</div></div>', 
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' + 
   '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">Aura</div>' + 
   '<input type="number" id="stat-aura" value="500" min="500" max="5000" step="100" onchange="validaStat(this,true)" style="width:70px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' + 
   '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' + 
   '<button onclick="stepStat(\'aura\',-100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' + 
   '<button onclick="stepStat(\'aura\',100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' + 
   '</div></div>' 
  ); 
  html += '<div style="margin-top:22px; border-top:1px solid #3B8686; padding-top:18px;">'; 
  html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:14px;"><i class="fa-solid fa-puzzle-piece"></i> Competenze</h4>'; 
  for (var n = 0; n < 5; n++) { 
   html += '<div id="comp-slot-'+n+'" style="background:#292354; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:10px;">'; 
   html += '<div style="color:#8FBEBA; font-size:0.82em; margin-bottom:10px;" id="comp-slot-label-'+n+'"><i class="fa-solid fa-lock"></i> Slot ' + (n+1) + ' — sbloccabile al Lv. ' + SBLOCCO_COMPETENZE[n] + '</div>'; 
   html += '<div id="comp-slot-fields-'+n+'">'; 
   html += inputText('comp-nome-'+n,'Nome competenza','Es. Spadaccino Provetto'); 
   html += riga2(inputText('comp-lv-'+n,'Livello','Es. 1'), inputText('comp-oggetto-'+n,'Oggetto','Es. Spada')); 
   html += inputTextarea('comp-desc-'+n,'Descrizione','Descrizione della competenza...', 2); 
   html += '</div>'; 
   html += '</div>'; 
  } 
  html += '</div>'; 
 } 
 return html; 
} 
 
function costruisciNen(isNuova) {
 if (isNuova) {
  var html = '<p style="color:#8FBEBA; font-size:0.9em; margin-bottom:15px; font-style:italic;">L\'Hatsu viene sbloccato in seguito. Nen e Tenacia sono fissi.</p>';
  html += riga2(campoReadonly('Nen', NEN_INIZIALE+'%'), campoReadonly('Tenacia', TENACIA_INIZIALE+'%'));
  html += campoReadonly('Hatsu', '<i class="mdi mdi-fire"></i> Non ancora sbloccato');
  return html;
 }

 var html = inputSelect('campo-hatsu','Tipo Hatsu', TIPI_HATSU);
 html += riga2(inputText('campo-nen','Nen (%)','Es. 95'), inputText('campo-tenacia','Tenacia (%)','Es. 75'));

 // Box 1: Potere Nen
 html += '<div style="margin-top:16px; border-top:1px solid #3B8686; padding-top:16px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="mdi mdi-fire"></i> Potere Nen</h4>';
 html += '<p style="color:#8FBEBA; font-size:0.85em; margin-bottom:12px; font-style:italic;">Il titolo del box sarà il tipo di Hatsu selezionato sopra.</p>';
 html += inputText('nen-nomepotere', 'Nome potere', 'Es. Filo d\'Ambra');
 html += inputTextarea('nen-descrizione', 'Descrizione', 'Descrizione del potere...', 3);
 html += inputTextarea('nen-funzionamento', 'Funzionamento e regole', 'Come funziona il potere, le regole...', 3);
 html += inputTextarea('nen-condizioni', 'Condizioni e restrizioni', 'Eventuali condizioni o restrizioni...', 2);
 html += '</div>';

 // Immagine nen
 html += '<div style="margin-top:16px; border-top:1px solid #3B8686; padding-top:16px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-image"></i> Immagine Nen</h4>';
 html += inputText('nen-img', 'URL immagine — dimensioni ideali: 664x200px.', 'https://...');
 html += '</div>';

 // Box 2: Profili (4 fissi)
 html += '<div style="margin-top:16px; border-top:1px solid #3B8686; padding-top:16px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-layer-group"></i> Profili</h4>';
 for (var p = 1; p <= 4; p++) {
  html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:12px;">';
  html += '<div style="color:#CFF09E; font-size:0.9em; font-weight:600; margin-bottom:10px;">Profilo ' + p + '</div>';
  html += inputText('profilo-'+p+'-nome', 'Nome profilo', 'Es. Filo Singolo');
  html += inputTextarea('profilo-'+p+'-desc', 'Descrizione', 'Descrizione del profilo...', 2);
  html += inputTextarea('profilo-'+p+'-bonus', 'Bonus', 'Descrizione del bonus...', 2);
  html += inputTextarea('profilo-'+p+'-malus', 'Eventuali Condizioni e/o Restrizioni e/o Malus', 'Descrizione...', 2);
  html += inputTextarea('profilo-'+p+'-costo', 'Costo per Fase', 'Es. 5 punti Nen per turno', 1);
  html += '</div>';
 }
 html += '</div>';

 // Box 3: Tecniche 25% (2 fisse)
 html += costruisciBoxTecniche('25', '25%');

 // Box 4: Tecniche 50% (2 fisse)
 html += costruisciBoxTecniche('50', '50%');

 // Box 5: Tecnica Finale 100% (1 fissa)
 html += costruisciBoxTecniche('100', '100%');

 return html;
}

function costruisciBoxTecniche(id, label) {
 var num = id === '100' ? 1 : 2;
 var html = '<div style="margin-top:16px; border-top:1px solid #3B8686; padding-top:16px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-bolt"></i> Tecniche ' + label + '</h4>';
 for (var t = 1; t <= num; t++) {
  html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:12px;">';
  html += '<div style="color:#CFF09E; font-size:0.9em; font-weight:600; margin-bottom:10px;">Tecnica ' + t + '</div>';
  html += inputText('tecnica-'+id+'-'+t+'-nome', 'Nome tecnica', 'Es. Taglio Rapido');
  html += inputTextarea('tecnica-'+id+'-'+t+'-desc', 'Descrizione', 'Descrizione della tecnica...', 2);
  html += inputTextarea('tecnica-'+id+'-'+t+'-bonus', 'Bonus', 'Descrizione del bonus...', 2);
  html += inputTextarea('tecnica-'+id+'-'+t+'-malus', 'Eventuali Condizioni e/o Restrizioni e/o Malus', 'Descrizione...', 2);
  html += inputTextarea('tecnica-'+id+'-'+t+'-costo', 'Costo per Fase', 'Es. 3 punti Nen', 1);
  html += '</div>';
 }
 html += '</div>';
 return html;
} 
 
function costruisciQuest(isNuova) { 
 if (isNuova) { 
  return '<p style="color:#8FBEBA; font-size:0.9em; font-style:italic;"><i class="fa-solid fa-info-circle"></i> Un nuovo PG non ha ancora partecipato a quest. La sezione sarà vuota nella scheda generata.</p>'; 
 } 
 var html = '<div id="lista-quest"></div>'; 
 html += '<button onclick="aggiungiQuest()" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Quest</button>'; 
 return html; 
} 
 
function aggiungiQuest() { 
 var lista = document.getElementById('lista-quest'); 
 var idx = lista.children.length; 
 var div = document.createElement('div'); 
 div.id = 'quest-row-' + idx; 
 div.style.cssText = 'margin-bottom:8px;'; 
 div.innerHTML = 
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
  '<td style="width:44%; padding-right:5px; vertical-align:bottom;">' + inputText('quest-nome-'+idx,'Nome quest','Es. La Prima Missione') + '</td>' + 
  '<td style="width:44%; padding-left:5px; padding-right:5px; vertical-align:bottom;">' + inputText('quest-link-'+idx,'Link','https://...') + '</td>' + 
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
  '<button onclick="rimuoviElemento(\'quest-row-'+idx+'\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
  '</td></tr></table>'; 
 lista.appendChild(div); 
} 
 
function aggiungiTecnica() { 
 var lista = document.getElementById('lista-tecniche'); 
 var idx = lista.children.length; 
 var div = document.createElement('div'); 
 div.id = 'tecnica-row-' + idx; 
 div.style.cssText = 'background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:12px; margin-bottom:10px;'; 
 div.innerHTML = 
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed; margin-bottom:6px;"><tr>' + 
  '<td style="width:88%; padding-right:6px; vertical-align:bottom;">' + inputText('tecnica-nome-'+idx,'Nome tecnica','Es. Scudo di Luce') + '</td>' + 
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
  '<button onclick="rimuoviElemento(\'tecnica-row-'+idx+'\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
  '</td></tr></table>' + 
  inputTextarea('tecnica-desc-'+idx,'Descrizione','Descrizione della tecnica...', 3); 
 lista.appendChild(div); 
} 
 
function costruisciBalue() { 
 var categorie = [ 
  { nome:'Armi', id:'armi' }, 
  { nome:'Equipaggiamento', id:'equip' }, 
  { nome:'Oggetti Extra', id:'oggetti' }, 
  { nome:'Materiali', id:'materiali' } 
 ]; 
 var html = ''; 
 for (var i = 0; i < categorie.length; i++) { 
  var cat = categorie[i]; 
  html += '<div style="margin-bottom:18px;">'; 
  html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; font-size:1.2em; margin-bottom:8px;">' + cat.nome + '</h4>'; 
  html += '<div id="lista-' + cat.id + '"></div>'; 
  html += '<button onclick="aggiungiItem(\'' + cat.id + '\')" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:6px 16px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; font-size:1em;"><i class="fa-solid fa-plus"></i> Aggiungi</button>'; 
  html += '</div>'; 
 } 
 return html; 
} 
 
function aggiungiItem(categoria) { 
 var lista = document.getElementById('lista-' + categoria); 
 var idx = lista.children.length; 
 var div = document.createElement('div'); 
 div.id = categoria + '-row-' + idx; 
 div.style.cssText = 'background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:12px; margin-bottom:10px;'; 
 
 // Riga 1: Nome + Qt + Livello/Usi + pulsante rimuovi 
 var riga1 = ''; 
 if (categoria === 'materiali') { 
  // Materiali: solo Nome + Qt (nessun Livello/Usi) 
  riga1 = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
   '<td style="width:78%; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-nome-'+idx,'Nome','Es. Erba medicinale') + '</td>' + 
   '<td style="width:12%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-qt-'+idx,'Qt','1') + '</td>' + 
   '<td style="width:10%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
   '<button onclick="rimuoviElemento(\'' + categoria + '-row-' + idx + '\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
   '</td></tr></table>'; 
 } else if (categoria === 'oggetti') { 
  riga1 = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
   '<td style="width:52%; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-nome-'+idx,'Nome','Es. Pozione') + '</td>' + 
   '<td style="width:16%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-qt-'+idx,'Qt','1') + '</td>' + 
   '<td style="width:22%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-usi-'+idx,'Usi (es. 0/3)','0/3') + '</td>' + 
   '<td style="width:10%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
   '<button onclick="rimuoviElemento(\'' + categoria + '-row-' + idx + '\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
   '</td></tr></table>'; 
 } else { 
  // armi / equip 
  riga1 = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
   '<td style="width:52%; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-nome-'+idx,'Nome','Es. Spada') + '</td>' + 
   '<td style="width:16%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + inputText(categoria+'-qt-'+idx,'Qt','1') + '</td>' + 
   '<td style="width:22%; padding-left:4px; padding-right:4px; vertical-align:bottom;">' + 
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Livello (max 5)</label>' + 
   '<div style="display:flex; align-items:center; gap:6px;">' + 
   '<button onclick="stepLv(\''+categoria+'-lv-'+idx+'\', -1)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:28px; height:28px; cursor:pointer; font-size:1em; padding:0; flex-shrink:0;">&#8722;</button>' + 
   '<input type="number" id="'+categoria+'-lv-'+idx+'" value="0" min="0" max="5" style="'+STILE_INPUT+' text-align:center; flex:1;">' + 
   '<button onclick="stepLv(\''+categoria+'-lv-'+idx+'\', 1)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:28px; height:28px; cursor:pointer; font-size:1em; padding:0; flex-shrink:0;">+</button>' + 
   '</div></div>' + 
   '</td>' + 
   '<td style="width:10%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' + 
   '<button onclick="rimuoviElemento(\'' + categoria + '-row-' + idx + '\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' + 
   '</td></tr></table>'; 
 } 
 
 // Riga 2: Espansione (nome + link) — per tutte le categorie 
 var riga2esp = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' + 
  '<td style="width:50%; padding-right:6px; vertical-align:bottom;">' + inputText(categoria+'-exp-nome-'+idx,'Nome espansione','Es. Caccia al Tesoro') + '</td>' + 
  '<td style="width:50%; padding-left:6px; vertical-align:bottom;">' + inputText(categoria+'-exp-link-'+idx,'Link espansione','https://...') + '</td>' + 
  '</tr></table>'; 
 
 div.innerHTML = riga1 + riga2esp; 
 lista.appendChild(div); 
} 
 
function costruisciMusica() { 
 return inputText('campo-musica','Colonna sonora del personaggio (Solo ID Video YouTube)','Es. cjqwwIRnmuQ') + 
  '<p style="color:#8FBEBA; font-size:0.82em; margin-top:-10px; font-style:italic;">Inserisci SOLO l\'ID della traccia (Gli 11 caratteri alfanumerici dopo "https://www.youtube.com/watch?v=" nell\'URL di YouTube)</p>'; 
} 
 
function costruisciImporta() { 
 return '<p style="color:#8FBEBA; font-size:0.88em; margin-bottom:12px; font-style:italic;"><i class="fa-solid fa-circle-info"></i> Incolla il codice HTML della tua scheda esistente e premi "Importa Dati": i campi verranno popolati automaticamente. Potrai poi modificarli prima di generare.</p>' + 
  '<label style="' + STILE_LABEL + '">Codice HTML della scheda esistente:</label>' + 
  '<textarea id="campo-importa" placeholder="Incolla il codice HTML della tua scheda..." rows="6" style="' + STILE_INPUT + ' font-family:\'Montserrat\'; font-size:1em; resize:vertical;"></textarea>' + 
  '<button onclick="importaScheda()" style="margin-top:10px; background:#292354; color:#8FBEBA; border:1px solid #3B8686; padding:10px 25px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\';"><i class="fa-solid fa-file-import"></i> Importa Dati</button>'; 
} 
 
// ============================================================ 
// LOGICA RAZZA / SPECIE 
// ============================================================ 
function aggiornaRazza(isNuova) { 
 var razzaEl = document.getElementById('campo-razza'); 
 var specieEl = document.getElementById('campo-specie'); 
 if (!razzaEl) return; 
 var razza = razzaEl.value; 
 var isBestia = razza === 'Bestia Demoniaca'; 
 var specie = specieEl ? specieEl.value : ''; 
 
 // Mostra/nascondi specie e dati relativi 
 var spWrap = document.getElementById('campo-specie-wrap'); 
 var rankWrap = document.getElementById('campo-rank-wrap'); 
 if (spWrap) spWrap.style.display = isBestia ? '' : 'none'; 
 if (rankWrap) rankWrap.style.display = isBestia ? '' : 'none'; 
 
 // Aggiorna rank e conservazione 
 if (isBestia && DATI_SPECIE[specie]) { 
  var ds = DATI_SPECIE[specie]; 
  var rv = document.getElementById('campo-rank-val'); 
  var cv = document.getElementById('campo-conservazione-val'); 
  if (rv) rv.textContent = ds.rank; 
  if (cv) cv.textContent = ds.conservazione; 
 } 
 
 // Aggiorna menù luoghi 
 var luogoEl = document.getElementById('campo-luogo'); 
 if (luogoEl) { 
  var luogoCorrente = luogoEl.value; 
  luogoEl['inn'+'erHTML'] = ''; 
  var luoghiConsentiti, luoghiVietati; 
  if (!isBestia) { 
   // Umano: vede tutti, ma può selezionare solo luoghi umani 
   luoghiConsentiti = LUOGHI_UMANI; 
   luoghiVietati = []; 
   // Raccoglie tutti i luoghi bestia per metterli disabilitati 
   var vistiB = {}; 
   for (var sp2 in LUOGHI_BESTIA) { 
    var ll2 = LUOGHI_BESTIA[sp2]; 
    for (var j2 = 0; j2 < ll2.length; j2++) { 
     if (!BONUS_LUOGO[ll2[j2]] && !vistiB[ll2[j2]]) { 
      luoghiVietati.push(ll2[j2]); 
      vistiB[ll2[j2]] = true; 
     } 
    } 
   } 
   for (var li = 0; li < LUOGHI_UMANI.length; li++) { 
    var opt = document.createElement('option'); 
    opt.value = LUOGHI_UMANI[li]; opt.text = LUOGHI_UMANI[li]; 
    luogoEl['append'+'Child'](opt); 
   } 
   for (var li2 = 0; li2 < luoghiVietati.length; li2++) { 
    var opt2 = document.createElement('option'); 
    opt2.value = luoghiVietati[li2]; opt2.text = luoghiVietati[li2]; 
    opt2.disabled = true; 
    luogoEl['append'+'Child'](opt2); 
   } 
  } else { 
   // Bestia Demoniaca: vede tutti, ma può selezionare solo i luoghi della sua specie 
   var luoghiSpecie = specie && LUOGHI_BESTIA[specie] ? LUOGHI_BESTIA[specie] : []; 
   for (var li3 = 0; li3 < LUOGHI_TUTTI.length; li3++) { 
    var opt3 = document.createElement('option'); 
    opt3.value = LUOGHI_TUTTI[li3]; opt3.text = LUOGHI_TUTTI[li3]; 
    var consentito = luoghiSpecie.indexOf(LUOGHI_TUTTI[li3]) !== -1; 
    if (!consentito) opt3.disabled = true; 
    luogoEl['append'+'Child'](opt3); 
   } 
   // Seleziona il primo luogo consentito 
   if (luoghiSpecie.length > 0) { 
    for (var oi = 0; oi < luogoEl.options.length; oi++) { 
     if (!luogoEl.options[oi].disabled) { luogoEl.selectedIndex = oi; break; } 
    } 
   } 
  } 
  // Tenta di ripristinare il valore precedente se ancora valido 
  if (luogoCorrente) { 
   for (var oi2 = 0; oi2 < luogoEl.options.length; oi2++) { 
    if (luogoEl.options[oi2].value === luogoCorrente && !luogoEl.options[oi2].disabled) { 
     luogoEl.selectedIndex = oi2; break; 
    } 
   } 
  } 
 } 
 
 // Aggiorna menù classe 
 var classeWrap = document.getElementById('campo-classe-wrap'); 
 var classeEl = document.getElementById('campo-classe'); 
 if (classeWrap) classeWrap.style.display = isBestia ? 'none' : ''; 
 if (classeEl && !isBestia) { 
  // Ricostruisce opzioni classi (filtra disabilitate se isNuova) 
  var classiDaMostrare = isNuova ? CLASSI : CLASSI_TUTTE; 
  classeEl['inn'+'erHTML'] = ''; 
  for (var ci = 0; ci < classiDaMostrare.length; ci++) { 
   var optC = document.createElement('option'); 
   optC.value = classiDaMostrare[ci]; optC.text = classiDaMostrare[ci]; 
   classeEl['append'+'Child'](optC); 
  } 
 } 
 
 // Fedina penale 
 aggiornaFedina(isNuova); 
 
 // Aggiorna stat se scheda nuova 
 if (isNuova) aggiornaStatNuova(); 
} 
 
function aggiornaFedina(isNuova) { 
 var razzaEl = document.getElementById('campo-razza'); 
 var specieEl = document.getElementById('campo-specie'); 
 if (!razzaEl) return; 
 var isBestia = razzaEl.value === 'Bestia Demoniaca'; 
 var specie = specieEl ? specieEl.value : ''; 
 var tagliaWrap = document.getElementById('campo-taglia-wrap'); 
 
 if (isNuova) { 
  // Readonly: calcola automaticamente 
  var fedina = 'Incensurato'; 
  if (isBestia && DATI_SPECIE[specie]) fedina = DATI_SPECIE[specie].fedina; 
  var fv = document.getElementById('campo-fedina-val'); 
  if (fv) fv.textContent = fedina; 
  if (tagliaWrap) tagliaWrap.style.display = fedina === 'Ricercato' ? '' : 'none'; 
 } else { 
  var feEl = document.getElementById('campo-fedina'); 
  if (!feEl) return; 
  var isBestiaABC = isBestia && DATI_SPECIE[specie] && ['A','B','C'].indexOf(DATI_SPECIE[specie].rank) !== -1; 
  // Forza "Ricercato" e taglia E se bestia rank A/B/C 
  if (isBestiaABC) { 
   feEl.value = 'Ricercato'; 
   feEl.disabled = true; 
  } else { 
   feEl.disabled = false; 
  } 
  if (tagliaWrap) tagliaWrap.style.display = feEl.value === 'Ricercato' ? '' : 'none'; 
  // Aggiorna il tipo di select taglia (readonly E vs select D+) 
  aggiornaTipoTaglia(isBestiaABC); 
 } 
} 
 
function aggiornaTaglia() { 
 var ctEl = document.getElementById('campo-classtaglia'); 
 var vtEl = document.getElementById('campo-valtaglia'); 
 if (!ctEl || !vtEl) return; 
 var classe = ctEl.value; 
 var min = VALORE_TAGLIA_BASE[classe] || 1000; 
 var attuale = parseInt(vtEl.value.replace(/\./g,'').replace(/,/g,'')) || 0; 
 if (attuale < min) vtEl.value = min.toLocaleString(); 
} 
 
function aggiornaTipoTaglia(isBestiaABC) { 
 // Mostra readonly "E" per bestie A/B/C, select da D in su per tutti gli altri 
 var ctSelect   = document.getElementById('campo-classtaglia'); 
 var ctReadonly = document.getElementById('campo-classtaglia-readonly'); 
 var vtEl       = document.getElementById('campo-valtaglia'); 
 if (!ctSelect) return; 
 if (isBestiaABC) { 
  ctSelect.style.display   = 'none'; 
  if (ctReadonly) ctReadonly.style.display = ''; 
  ctSelect.value = 'E'; 
  if (vtEl) vtEl.value = VALORE_TAGLIA_BASE['E'].toLocaleString(); 
 } else { 
  ctSelect.style.display   = ''; 
  if (ctReadonly) ctReadonly.style.display = 'none'; 
  // Se il valore corrente è E (non selezionabile), salta a D 
  if (ctSelect.value === 'E' || !ctSelect.value) { 
   ctSelect.value = 'D'; 
   if (vtEl) vtEl.value = VALORE_TAGLIA_BASE['D'].toLocaleString(); 
  } 
  aggiornaTaglia(); 
 } 
} 
 
// ============================================================ 
// LOGICA STATISTICHE 
// ============================================================ 
function aggiornaStatNuova() { 
 var luogoEl = document.getElementById('campo-luogo'); 
 var classeEl = document.getElementById('campo-classe'); 
 var razzaEl = document.getElementById('campo-razza'); 
 if (!luogoEl) return; 
 var luogo = luogoEl.value; 
 var classe = classeEl ? classeEl.value : ''; 
 var isBestia = razzaEl && razzaEl.value === 'Bestia Demoniaca'; 
 var specieEl = document.getElementById('campo-specie'); 
 var specie = specieEl ? specieEl.value : ''; 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var stat = {}; 
 for (var i = 0; i < ls.length; i++) stat[ls[i]] = STAT_BASE[ls[i]]; 
 stat.vita = STAT_BASE.vita; stat.aura = STAT_BASE.aura; 
 // Formichimera Umana usa luoghi umani ma senza bonus 
 var applicaBonus = !isBestia || specie === ''; 
 var isFormichimera = isBestia && specie === 'Formichimera Umana'; 
 if (applicaBonus && !isFormichimera && BONUS_LUOGO[luogo]) { 
  var bl = BONUS_LUOGO[luogo]; 
  for (var k in bl) if (stat[k] !== undefined) stat[k] += bl[k]; 
 } 
 if (!isBestia && BONUS_CLASSE[classe]) { 
  var bc = BONUS_CLASSE[classe]; 
  for (var m in bc) if (stat[m] !== undefined) stat[m] += bc[m]; 
 } 
 // Salva i valori base (bonus inclusi) e aggiorna i display 
 for (var s in stat) { 
  var el = document.getElementById('stat-base-'+s); 
  if (el) el.textContent = stat[s]; 
  var elTot = document.getElementById('stat-'+s); 
  if (elTot) elTot.textContent = stat[s]; 
 } 
 // Resetta i punti extra a 0 
 for (var pi = 0; pi < ls.length; pi++) { 
  var eExtra = document.getElementById('stat-extra-'+ls[pi]); 
  if (eExtra) eExtra.value = 0; 
 } 
 aggiornaContatoreExtra(); 
} 
 
var PUNTI_EXTRA_TOTALI = 25; 
 
function aggiornaContatoreExtra() { 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var usati = 0; 
 for (var i = 0; i < ls.length; i++) { 
  var eExtra = document.getElementById('stat-extra-'+ls[i]); 
  if (eExtra) usati += parseInt(eExtra.value) || 0; 
 } 
 var rimasti = PUNTI_EXTRA_TOTALI - usati; 
 var cEl = document.getElementById('punti-extra-counter'); 
 if (cEl) { 
  cEl.textContent = rimasti + ' punti rimanenti'; 
  cEl.style.color = rimasti < 0 ? '#F9C6C6' : (rimasti === 0 ? '#CFF09E' : '#8FBEBA'); 
 } 
 return rimasti; 
} 
 
function modificaStatExtra(sId, delta) { 
 var eExtra = document.getElementById('stat-extra-'+sId); 
 var eBase  = document.getElementById('stat-base-'+sId); 
 var eTot   = document.getElementById('stat-'+sId); 
 if (!eExtra || !eBase || !eTot) return; 
 var rimasti = aggiornaContatoreExtra(); 
 var nuovoExtra = (parseInt(eExtra.value) || 0) + delta; 
 if (nuovoExtra < 0) nuovoExtra = 0; 
 if (delta > 0 && rimasti <= 0) { 
  alert('Hai già distribuito tutti i 25 punti extra!'); 
  return; 
 } 
 eExtra.value = nuovoExtra; 
 var base = parseInt(eBase.textContent) || 5; 
 eTot.textContent = base + nuovoExtra; 
 aggiornaContatoreExtra(); 
} 
 
function validaStat(input, isVitaAura) { 
 var val = parseInt(input.value); 
 var step = isVitaAura ? 100 : 5; 
 var min = isVitaAura ? (input.id==='stat-vita' ? 300 : 500) : 5; 
 var max = isVitaAura ? (input.id==='stat-vita' ? 3000 : 5000) : 250; 
 if (!isVitaAura) { var idS = input.id.replace('stat-',''); var ov = document.getElementById('over-'+idS); if (ov && ov.checked) max = 400; } 
 if (isNaN(val)||val<min) val=min; 
 if (val>max) val=max; 
 input.value = Math.round(val/step)*step; 
} 
 

function stepStat(sId, delta) { 
 var el = document.getElementById('stat-' + sId); 
 if (!el) return; 
 var isVitaAura = sId === 'vita' || sId === 'aura'; 
 var step  = isVitaAura ? 100 : 5; 
 var minV  = isVitaAura ? (sId === 'vita' ? 300 : 500) : 5; 
 var maxV  = isVitaAura ? (sId === 'vita' ? 3000 : 5000) : 400; 
 var ovEl  = document.getElementById('over-' + sId); 
 if (!isVitaAura && ovEl && !ovEl.checked) maxV = 250; 
 var cur = parseInt(el.value) || minV; 
 var nv = Math.round((cur + delta) / step) * step; 
 if (nv < minV) nv = minV; 
 if (nv > maxV) nv = maxV; 
 el.value = nv; 
} 
 
function stepLv(id, delta) { 
 var el = document.getElementById(id); 
 if (!el) return; 
 var nv = (parseInt(el.value) || 0) + delta; 
 if (nv < 0) nv = 0; 
 if (nv > 5) nv = 5; 
 el.value = nv; 
} 
 
function toggleOver(checkbox, sId) { 
 var input = document.getElementById('stat-'+sId); 
 if (!input) return; 
 if (checkbox.checked) { 
  // Conta quante over sono già attive (esclusa quella corrente) 
  var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
  var attive = 0; 
  for (var i = 0; i < ls.length; i++) { 
   if (ls[i] === sId) continue; 
   var ov = document.getElementById('over-'+ls[i]); 
   if (ov && ov.checked) attive++; 
  } 
  if (attive >= 2) { 
   checkbox.checked = false; 
   alert('Puoi overlivellare al massimo 2 statistiche!'); 
   return; 
  } 
  input.max = 400; 
 } else { 
  input.max = 250; 
  if (parseInt(input.value) > 250) input.value = 250; 
 } 
} 
 
function calcolaExpTot(livello) { 
 var lv = parseInt(livello) || 1; 
 if (lv <= 14) return 100; 
 return 100 + (lv - 14) * 10; 
} 
 
function aggiornaCompetenze() { 
 var livEl = document.getElementById('campo-livello'); 
 if (!livEl) return; 
 var lv = parseInt(livEl.value) || 0; 
 // Aggiorna EXP per level up (readonly, calcolato dal livello) 
 var exptotEl = document.getElementById('campo-exptot'); 
 if (exptotEl) exptotEl.value = calcolaExpTot(lv); 
 for (var n = 0; n < 5; n++) { 
  var slot       = document.getElementById('comp-slot-' + n); 
  var label      = document.getElementById('comp-slot-label-' + n); 
  var fields     = document.getElementById('comp-slot-fields-' + n); 
  if (!slot || !label || !fields) continue; 
  var sbloccato  = lv >= SBLOCCO_COMPETENZE[n]; 
  // Bordo e sfondo 
  slot.style.opacity = sbloccato ? '1' : '0.45'; 
  slot.style.borderColor = sbloccato ? '#3B8686' : '#292354'; 
  // Icona e testo label 
  label.innerHTML = sbloccato 
   ? '<i class="fa-solid fa-lock-open" style="color:#CFF09E;"></i> Slot ' + (n+1) + ' — sbloccato al Lv. ' + SBLOCCO_COMPETENZE[n] 
   : '<i class="fa-solid fa-lock"></i> Slot ' + (n+1) + ' — sbloccabile al Lv. ' + SBLOCCO_COMPETENZE[n]; 
  // Abilita / disabilita tutti gli input e textarea dentro il fields 
  var gbn = 'getElements' + 'ByTagName'; 
  var inputs = fields[gbn]('input'); 
  var textareas = fields[gbn]('textarea'); 
  for (var i = 0; i < inputs.length; i++) { 
   inputs[i].disabled = !sbloccato; 
   inputs[i].style.opacity = sbloccato ? '1' : '0.4'; 
   inputs[i].style.cursor = sbloccato ? '' : 'not-allowed'; 
  } 
  for (var j = 0; j < textareas.length; j++) { 
   textareas[j].disabled = !sbloccato; 
   textareas[j].style.opacity = sbloccato ? '1' : '0.4'; 
   textareas[j].style.cursor = sbloccato ? '' : 'not-allowed'; 
  } 
 } 
} 
 
function bbcodeToHtml(testo) { 
 // [IMG]url[/IMG] → <img src="url"> 
 testo = testo.replace(/\[IMG\](.*?)\[\/IMG\]/gi, '<img src="$1">'); 
 // [URL=url]testo[/URL] → <a href="url">testo</a> 
 testo = testo.replace(/\[URL=(.*?)\](.*?)\[\/URL\]/gi, '<a href="$1">$2</a>'); 
 // [URL]url[/URL] → <a href="url">url</a> (forma senza testo) 
 testo = testo.replace(/\[URL\](.*?)\[\/URL\]/gi, '<a href="$1">$1</a>'); 
 return testo; 
} 
 
function importaScheda() { 
 var htmlScheda = document.getElementById('campo-importa').value.trim(); 
 if (!htmlScheda) { alert('Incolla prima il codice HTML!'); return; } 
 // Converte BBCode in HTML (ForumFree trasforma img e link in BBCode nei post) 
 htmlScheda = bbcodeToHtml(htmlScheda); 
 var temp = document.createElement('div'); 
 temp.innerHTML = htmlScheda; 
 var metodo = 'getElements' + 'ByTagName'; 
 
 // ── Helpers ─────────────────────────────────────────────── 
 function setVal(id, val) { 
  var e = document.getElementById(id); 
  if (e && val !== null && val !== undefined && val !== '') e.value = val; 
 } 
 function setSelect(id, val) { 
  var e = document.getElementById(id); 
  if (!e || !val) return; 
  val = val.trim(); 
  for (var i = 0; i < e.options.length; i++) { 
   if (e.options[i].value === val || e.options[i].text === val) { 
    e.selectedIndex = i; return; 
   } 
  } 
 } 
 function setTextarea(id, val) { 
  var e = document.getElementById(id); 
  if (e && val) e.value = val; 
 } 
 // Restituisce il textContent (per label, confronti) 
 function trovaEntryDopoLabel(spans, labelTesto) { 
  for (var i = 0; i < spans.length - 1; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === labelTesto) { 
    if (spans[i+1].className === 'scheda-entry') return spans[i+1].textContent.trim(); 
   } 
  } 
  return null; 
 } 
 // Restituisce l'innerHTML (per campi che possono contenere tag HTML) 
 function trovaEntryHTMLDopoLabel(spans, labelTesto) { 
  for (var i = 0; i < spans.length - 1; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === labelTesto) { 
    if (spans[i+1].className === 'scheda-entry') return spans[i+1]['inn'+'erHTML'].trim(); 
   } 
  } 
  return null; 
 } 
 // Imposta il valore di un input con innerHTML come valore (per campi con HTML inline) 
 function setValHTML(id, val) { 
  var e = document.getElementById(id); 
  if (e && val !== null && val !== undefined && val !== '') e.value = val; 
 } 
 
 var spans = temp[metodo]('span'); 
 var divs  = temp[metodo]('div'); 
 
 // ── Campi testo semplici ─────────────────────────────────── 
 var mappaLabel = { 
  'Nome:':     'campo-nome', 
  'Cognome:':  'campo-cognome', 
  'Genere:':   'campo-genere', 
  'Mestiere:': 'campo-mestiere' 
 }; 
 for (var i = 0; i < spans.length - 1; i++) { 
  var lbl = spans[i].textContent.trim(); 
  if (mappaLabel[lbl] && spans[i+1].className === 'scheda-entry') { 
   setValHTML(mappaLabel[lbl], spans[i+1]['inn'+'erHTML'].trim()); 
  } 
 } 
 
 // ── Select ───────────────────────────────────────────────── 
 var mappaSelect = { 
  'Luogo di nascita:':       'campo-luogo', 
  'Segno zodiacale:':        'campo-segno', 
  'Segno zodiacale cinese:': 'campo-segnocinese', 
  'MBTI:':                   'campo-mbti', 
  'Allineamento:':           'campo-allineamento' 
 }; 
 for (var i = 0; i < spans.length - 1; i++) { 
  var lbl = spans[i].textContent.trim(); 
  if (mappaSelect[lbl] && spans[i+1].className === 'scheda-entry') { 
   setSelect(mappaSelect[lbl], spans[i+1].textContent.trim()); 
  } 
 } 
 
 // ── Razza, Specie, Fedina, Taglia, Rank, Conservazione ───── 
 for (var i = 0; i < spans.length - 1; i++) { 
  if (spans[i].className !== 'scheda-label') continue; 
  var lbl2 = spans[i].textContent.trim(); 
  var val2 = spans[i+1].className === 'scheda-entry' ? spans[i+1].textContent.trim() : null; 
  if (!val2) continue; 
  if (lbl2 === 'Razza:')                   setSelect('campo-razza', val2); 
  if (lbl2 === 'Specie:')                  setSelect('campo-specie', val2); 
  if (lbl2 === 'Fedina Penale:')           setSelect('campo-fedina', val2); 
  if (lbl2 === 'Classificazione Taglia:')  setSelect('campo-classtaglia', val2); 
  if (lbl2 === 'Valore Taglia:')           setVal('campo-valtaglia', val2.replace(/\./g,'').replace(/[^\d]/g,'')); 
  if (lbl2 === 'Classe:')                  setSelect('campo-classe', val2); 
 } 
 // Riesegui aggiornaRazza per aggiornare menù luoghi, classe, fedina ecc. 
 aggiornaRazza(false); 
 
 // ── Data di nascita ──────────────────────────────────────── 
 var dataRaw = trovaEntryDopoLabel(spans, 'Data di nascita:'); 
 if (dataRaw && dataRaw !== '—') { 
  var mesiNomi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno', 
   'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']; 
  var parti = dataRaw.split(' '); 
  if (parti.length === 3) { 
   // "15 Marzo 2001" 
   setSelect('campo-datanascita-g', parti[0]); 
   setSelect('campo-datanascita-m', parti[1]); 
   setSelect('campo-datanascita-a', parti[2]); 
  } else if (parti.length === 2) { 
   // "15 Marzo" oppure "Marzo 2001" 
   var primoEMese = mesiNomi.indexOf(parti[0]) !== -1; 
   if (primoEMese) { 
    // "Marzo 2001" 
    setSelect('campo-datanascita-m', parti[0]); 
    setSelect('campo-datanascita-a', parti[1]); 
   } else { 
    // "15 Marzo" 
    setSelect('campo-datanascita-g', parti[0]); 
    setSelect('campo-datanascita-m', parti[1]); 
   } 
  } else if (parti.length === 1) { 
   // Solo mese o solo anno 
   if (mesiNomi.indexOf(parti[0]) !== -1) { 
    setSelect('campo-datanascita-m', parti[0]); 
   } else { 
    setSelect('campo-datanascita-a', parti[0]); 
   } 
  } 
 } 
 
 // ── Classe, Status, Livello dalla riga .dati-pg ───────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'dati-pg') { 
   var testo = divs[i].textContent; 
   var parti = testo.split('|'); 
   for (var p = 0; p < parti.length; p++) { 
    var coppia = parti[p].trim().split(':'); 
    if (coppia.length >= 2) { 
     var chiave = coppia[0].trim(); 
     var valore = coppia.slice(1).join(':').trim(); 
     if (chiave === 'Classe')  setSelect('campo-classe', valore); 
     if (chiave === 'Status')  setSelect('campo-status', valore); 
     if (chiave === 'Livello') setVal('campo-livello', valore); 
    } 
   } 
   break; 
  } 
 } 
 
 // ── EXP dalla span .dati-pg2 ─────────────────────────────── 
 for (var i = 0; i < spans.length; i++) { 
  if (spans[i].className === 'dati-pg2') { 
   var t = spans[i].textContent.trim(); 
   if (t.indexOf('/') !== -1 && t.indexOf('For') !== -1) { 
    var expParts = t.replace('For Level Up!','').trim().split('/'); 
    if (expParts.length === 2) { 
     setVal('campo-exp', expParts[0].replace(/[^\d]/g,'').trim()); 
    } 
   } 
  } 
 } 
 
 // ── Jenny e HC ───────────────────────────────────────────── 
 var soldiRaw = trovaEntryDopoLabel(spans, 'Soldi:'); 
 if (soldiRaw) { 
  var soldiParts = soldiRaw.split('/'); 
  if (soldiParts.length >= 2) { 
   setVal('campo-jenny', soldiParts[0].replace('Jenny','').replace(/\./g,'').replace(/[^\d]/g,'').trim()); 
   setVal('campo-hc',    soldiParts[1].replace('HC','').replace(/[^\d]/g,'').trim()); 
  } 
 } 
 
 // ── Aggettivi ────────────────────────────────────────────── 
 var aggTrovati = []; 
 for (var i = 0; i < spans.length; i++) { 
  if (spans[i].className === 'aggettivo') aggTrovati.push(spans[i]['inn'+'erHTML'].trim()); 
 } 
 if (aggTrovati[0]) setValHTML('campo-agg1', aggTrovati[0]); 
 if (aggTrovati[1]) setValHTML('campo-agg2', aggTrovati[1]); 
 if (aggTrovati[2]) setValHTML('campo-agg3', aggTrovati[2]); 
 
 // ── Citazione ─────────────────────────────────────────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'info-citazione') { 
   var citSpan = divs[i][metodo]('span'); 
   if (citSpan.length > 0) setValHTML('campo-citazione', citSpan[0]['inn'+'erHTML'].trim()); 
   else setValHTML('campo-citazione', divs[i]['inn'+'erHTML'].trim()); 
   break; 
  } 
 } 
 
 // ── Descrizione e Background ─────────────────────────────────── 
 // Cercati specificamente nei loro div contenitori per evitare conflitti 
 // con le label "Descrizione:" presenti nelle card nen 
 var divAspetto = temp['querySelector']('.info-aspetto'); 
 var divStoria  = temp['querySelector']('.info-storia'); 
 if (divAspetto) { 
  var aspSpans = divAspetto[metodo]('span'); 
  for (var i = 0; i < aspSpans.length - 1; i++) { 
   if (aspSpans[i].className === 'scheda-label' && aspSpans[i].textContent.trim() === 'Descrizione:' && aspSpans[i+1].className === 'scheda-entry') { 
    setTextarea('campo-aspetto', aspSpans[i+1]['inn'+'erHTML'].trim()); break; 
   } 
  } 
 } 
 if (divStoria) { 
  var storSpans = divStoria[metodo]('span'); 
  for (var i = 0; i < storSpans.length - 1; i++) { 
   if (storSpans[i].className === 'scheda-label' && storSpans[i].textContent.trim() === 'Background:' && storSpans[i+1].className === 'scheda-entry') { 
    setTextarea('campo-background', storSpans[i+1]['inn'+'erHTML'].trim()); break; 
   } 
  } 
 } 
 
 // ── Statistiche ───────────────────────────────────────────── 
 var mapStat = { 
  'Forza':'forza','Resistenza':'resistenza','Velocità':'velocita', 
  'Riflessi':'riflessi','Destrezza':'destrezza','Mira':'mira', 
  'Intelligenza':'intelligenza','Carisma':'carisma','Istinto':'istinto', 
  'Fortuna':'fortuna','Vita':'vita','Aura':'aura' 
 }; 
 for (var i = 0; i < divs.length; i++) { 
  var cn = divs[i].className; 
  if (cn === 'stat-card' || cn === 'stat-card-vitale') { 
   var labelEl = divs[i].querySelector ? divs[i].querySelector('.stat-label') : null; 
   var valueEl = divs[i].querySelector ? divs[i].querySelector('.stat-value') : null; 
   if (labelEl && valueEl) { 
    var statNome = labelEl.textContent.trim(); 
    var statVal  = valueEl.textContent.trim().replace(/\./g,'').replace(/,/g,''); 
    var statId   = mapStat[statNome]; 
    if (statId) { 
     var inp = document.getElementById('stat-' + statId); 
     if (inp) inp.value = statVal; 
     if (parseInt(statVal) > 250) { 
      var ov = document.getElementById('over-' + statId); 
      if (ov) { ov.checked = true; if (inp) inp.max = 400; } 
     } 
    } 
   } 
  } 
 } 
 
 // ── Hatsu ─────────────────────────────────────────────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'hatsu-card') { 
   var valEl = divs[i].querySelector ? divs[i].querySelector('.hatsu-card-value') : null; 
   if (valEl) setSelect('campo-hatsu', valEl.textContent.trim()); 
   break; 
  } 
 } 
 
 // ── Nen e Tenacia ─────────────────────────────────────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'barra-card') { 
   var lblEl = divs[i].querySelector ? divs[i].querySelector('.barra-card-label') : null; 
   var pctEl = divs[i].querySelector ? divs[i].querySelector('.barra-card-pct') : null; 
   if (lblEl && pctEl) { 
    var nome   = lblEl.textContent.trim(); 
    var valore = pctEl.textContent.replace('%','').trim(); 
    if (nome === 'Nen')     setVal('campo-nen', valore); 
    if (nome === 'Tenacia') setVal('campo-tenacia', valore); 
   } 
  } 
 } 
 
 // ── Potere Nen, Immagine, Profili, Tecniche ───────────────── 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'poteri-box') { 
   var nenBoxes = divs[i][metodo]('div'); 
   var nenBoxList = []; 
   for (var nb = 0; nb < nenBoxes.length; nb++) { 
    if (nenBoxes[nb].className === 'nen-box') nenBoxList.push(nenBoxes[nb]); 
   } 
   // Box 0: Potere Nen 
   if (nenBoxList[0]) { 
    var b0spans = nenBoxList[0][metodo]('span'); 
    for (var s0=0; s0<b0spans.length-1; s0++) { 
     if (b0spans[s0].className === 'scheda-label' && b0spans[s0+1].className === 'scheda-entry') { 
      var lbl0 = b0spans[s0].textContent.trim(); 
      var val0 = b0spans[s0+1]['inn'+'erHTML'].trim(); 
      if (lbl0 === 'Nome potere:')              setVal('nen-nomepotere', val0); 
      if (lbl0 === 'Descrizione:')              setTextarea('nen-descrizione', val0); 
      if (lbl0 === 'Funzionamento e regole:')   setTextarea('nen-funzionamento', val0); 
      if (lbl0 === 'Condizioni e restrizioni:') setTextarea('nen-condizioni', val0); 
     } 
    } 
   } 
   // Immagine nen 
   var nenImgEl = divs[i].querySelector ? divs[i].querySelector('.nen-img') : null; 
   if (nenImgEl) setVal('nen-img', nenImgEl.getAttribute('src')||''); 
   // Helper: legge le card di un nen-box e popola i campi tecnica/profilo 
   function leggiNenCards(box, prefisso, num) { 
    var cards = []; 
    var allDivs = box[metodo]('div'); 
    for (var d2=0; d2<allDivs.length; d2++) { 
     if (allDivs[d2].className === 'nen-card') cards.push(allDivs[d2]); 
    } 
    for (var ci3=0; ci3<Math.min(cards.length, num); ci3++) { 
     var titleEl2 = cards[ci3].querySelector ? cards[ci3].querySelector('.nen-card-title') : null; 
     var cardSpans = cards[ci3][metodo]('span'); 
     // nome (da titolo se disponibile, altrimenti dal primo scheda-label di tipo Nome) 
     if (titleEl2) { 
      var titoloTesto = titleEl2.textContent.trim(); 
      // Rimuove "Profilo N — " o lascia il nome tecnica 
      var dashIdx = titoloTesto.indexOf('\u2014'); 
      var nomeCard = dashIdx !== -1 ? titoloTesto.substring(dashIdx+2).trim() : titoloTesto; 
      setVal(prefisso+(ci3+1)+'-nome', nomeCard); 
     } 
     for (var cs=0; cs<cardSpans.length-1; cs++) { 
      if (cardSpans[cs].className === 'scheda-label' && cardSpans[cs+1].className === 'scheda-entry') { 
       var lc = cardSpans[cs].textContent.trim(); 
       var vc = cardSpans[cs+1]['inn'+'erHTML'].trim(); 
       if (lc === 'Descrizione:')                                   setTextarea(prefisso+(ci3+1)+'-desc',  vc); 
       if (lc === 'Bonus:')                                         setTextarea(prefisso+(ci3+1)+'-bonus', vc); 
       if (lc === 'Condizioni e/o Restrizioni e/o Malus:')          setTextarea(prefisso+(ci3+1)+'-malus', vc); 
       if (lc === 'Costo per Fase:')                                setTextarea(prefisso+(ci3+1)+'-costo', vc); 
      } 
     } 
    } 
   } 
   // Box 1: Profili 
   if (nenBoxList[1]) leggiNenCards(nenBoxList[1], 'profilo-', 4); 
   // Box 2: Tecniche 25% 
   if (nenBoxList[2]) leggiNenCards(nenBoxList[2], 'tecnica-25-', 2); 
   // Box 3: Tecniche 50% 
   if (nenBoxList[3]) leggiNenCards(nenBoxList[3], 'tecnica-50-', 2); 
   // Box 4: Tecnica Finale 100% 
   if (nenBoxList[4]) leggiNenCards(nenBoxList[4], 'tecnica-100-', 1); 
   break; 
  } 
 } 
 
 // ── Quest ─────────────────────────────────────────────────── 
 for (var i = 0; i < spans.length; i++) { 
  if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === 'Quest:') { 
   // Le quest sono span.scheda-entry consecutivi dopo il label 
   for (var j = i + 1; j < spans.length; j++) { 
    if (spans[j].className !== 'scheda-entry') break; // fine blocco quest 
    var anchors = spans[j][metodo]('a'); 
    for (var a = 0; a < anchors.length; a++) { 
     aggiungiQuest(); 
     var qIdx = document.getElementById('lista-quest').children.length - 1; 
     setVal('quest-nome-' + qIdx, anchors[a].textContent.trim()); 
     setVal('quest-link-' + qIdx, anchors[a].getAttribute('href') || ''); 
    } 
   } 
   break; 
  } 
 } 
 
 // ── Competenze ────────────────────────────────────────────── 
 var compIdx = 0; 
 for (var i = 0; i < divs.length && compIdx < 5; i++) { 
  if (divs[i].className === 'competenza-card bloccata') { compIdx++; continue; } 
  if (divs[i].className === 'competenza-card') { 
   var nomeEl = divs[i].querySelector ? divs[i].querySelector('.competenza-nome') : null; 
   var lvEl   = divs[i].querySelector ? divs[i].querySelector('.competenza-livello') : null; 
   var descEl = divs[i].querySelector ? divs[i].querySelector('.competenza-desc') : null; 
   var oggEl  = divs[i].querySelector ? divs[i].querySelector('.competenza-oggetto') : null; 
   if (nomeEl) setValHTML('comp-nome-'    + compIdx, nomeEl['inn'+'erHTML'].trim()); 
   if (lvEl)   setVal('comp-lv-'          + compIdx, lvEl.textContent.replace('Lv.','').trim()); 
   if (descEl) setTextarea('comp-desc-'   + compIdx, descEl['inn'+'erHTML'].trim()); 
   if (oggEl) { 
    var oggSpanLabel = oggEl.querySelector ? oggEl.querySelector('.competenza-oggetto-label') : null; 
    var oggTesto = oggEl.textContent; 
    if (oggSpanLabel) oggTesto = oggTesto.replace(oggSpanLabel.textContent, '').trim(); 
    setVal('comp-oggetto-' + compIdx, oggTesto.trim()); 
   } 
   compIdx++; 
  } 
 } 
 
 // ── Baule ─────────────────────────────────────────────────── 
 var catMap    = ['armi','equip','oggetti','materiali']; 
 var catTitoli = ['Armi','Equipaggiamento','Oggetti Extra','Materiali']; 
 for (var i = 0; i < divs.length; i++) { 
  if (divs[i].className === 'equip-box') { 
   var titleEl = divs[i].querySelector ? divs[i].querySelector('.equip-box-title') : null; 
   if (!titleEl) continue; 
   var titolo = titleEl.textContent.trim(); 
   var catIdx = catTitoli.indexOf(titolo); 
   if (catIdx === -1) continue; 
   var catId = catMap[catIdx]; 
   var items = divs[i][metodo]('li'); 
   for (var li = 0; li < items.length; li++) { 
    var nameEl = items[li].querySelector ? items[li].querySelector('.equip-item-name') : null; 
    var infoEl = items[li].querySelector ? items[li].querySelector('.equip-item-info') : null; 
    if (!nameEl) continue; 
    aggiungiItem(catId); 
    var bIdx = document.getElementById('lista-' + catId).children.length - 1; 
    setVal(catId + '-nome-' + bIdx, nameEl.textContent.trim()); 
    if (infoEl) { 
     var infoTesto = infoEl.textContent; 
     var qtMatch  = infoTesto.match(/Qt:\s*(\S+)/); 
     if (qtMatch) setVal(catId + '-qt-' + bIdx, qtMatch[1]); 
     var lvMatch  = infoTesto.match(/Lv\.\s*(\S+)/); 
     if (lvMatch && catId !== 'oggetti' && catId !== 'materiali') { 
      var lvVal = parseInt(lvMatch[1]) || 0; 
      if (lvVal > 5) lvVal = 5; 
      setVal(catId + '-lv-' + bIdx, lvVal); 
     } 
     var usiMatch = infoTesto.match(/Usi:\s*(\S+)/); 
     if (usiMatch && catId === 'oggetti') setVal(catId + '-usi-' + bIdx, usiMatch[1]); 
     // Espansione: legge il link se presente, altrimenti il testo 
     var expAnchor = infoEl.querySelector ? infoEl.querySelector('a') : null; 
     if (expAnchor) { 
      setVal(catId + '-exp-nome-' + bIdx, expAnchor.textContent.trim()); 
      setVal(catId + '-exp-link-' + bIdx, expAnchor.getAttribute('href') || ''); 
     } 
    } 
   } 
  } 
 } 
 
 // ── Immagini ─────────────────────────────────────────────── 
 // Header 
 var divLaterale = temp['querySelector']('.scheda-img'); 
 if (divLaterale) { var iL = divLaterale['querySelector']('img'); if (iL) setVal('campo-img-laterale', iL.getAttribute('src')||''); } 
 // Slide Dati 
 var divDati = temp['querySelector']('.img-dati'); 
 if (divDati) { var iD = divDati['querySelector']('img'); if (iD) setVal('campo-img-dati', iD.getAttribute('src')||''); } 
 // Slide Info: controlla se img-info2 (due immagini) o img-info (una) 
 var divInfo2 = temp['querySelector']('.img-info2'); 
 var divInfo1 = temp['querySelector']('.img-info'); 
 if (divInfo2) { 
  var radioDue = document['querySelector']('input[name="img-info-modo"][value="2"]'); 
  if (radioDue) { radioDue.checked = true; aggiornaInputImgInfo(); } 
  var infoImgs = divInfo2['querySelectorAll']('img'); 
  if (infoImgs[0]) setVal('campo-img-info-a', infoImgs[0].getAttribute('src')||''); 
  if (infoImgs[1]) setVal('campo-img-info-b', infoImgs[1].getAttribute('src')||''); 
 } else if (divInfo1) { 
  var radioUna = document['querySelector']('input[name="img-info-modo"][value="1"]'); 
  if (radioUna) { radioUna.checked = true; aggiornaInputImgInfo(); } 
  var iI = divInfo1['querySelector']('img'); 
  if (iI) setVal('campo-img-info', iI.getAttribute('src')||''); 
 } 
 
 // ── Musica (src iframe YouTube) ──────────────────────────── 
 var iframes = temp[metodo]('iframe'); 
 for (var i = 0; i < iframes.length; i++) { 
  var src = iframes[i].getAttribute('src') || ''; 
  var match = src.match(/embed\/([^?&]+)/); 
  if (match) { setVal('campo-musica', match[1]); break; } 
 } 
 
 // Salva classe e style inline del div radice per "Mantieni attuale" 
 var radice = temp.firstElementChild; 
 stato.schedaOriginale = radice; 
 if (radice) { 
  stato.classeOriginale = radice.getAttribute('class') || ''; 
  stato.styleOriginale  = radice.getAttribute('style') || ''; 
 } 
 document.getElementById('campo-importa').value = ''; 
 aggiornaCompetenze(); 
 alert('Dati importati! Controlla i campi e poi genera la scheda.'); 
} 
 
function rimuoviElemento(id) { 
 var el = document.getElementById(id); 
 if (el && el.parentNode) el.parentNode.removeChild(el); 
} 
 
// ============================================================ 
// RACCOLTA DATI DAL FORM 
// ============================================================ 
function raccogliDati(isNuova) { 
 function val(id) { var e=document.getElementById(id); return e?e.value.trim():''; } 
 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var stat = {}; 
 function leggiStat(id, def) { 
  var e = document.getElementById(id); 
  if (!e) return def; 
  var v = (e.tagName === 'INPUT') ? e.value.trim() : e.textContent.trim(); 
  return (v !== '' && v !== '0') ? v : def; 
 } 
 for (var i=0;i<ls.length;i++) { 
  stat[ls[i]] = leggiStat('stat-'+ls[i], '5'); 
 } 
 stat.vita = leggiStat('stat-vita', '300'); 
 stat.aura = leggiStat('stat-aura', '500'); 
 
 var ovSt = []; 
 if (!isNuova) { 
  for (var j=0;j<ls.length;j++) { 
   var ov=document.getElementById('over-'+ls[j]); 
   if (ov&&ov.checked) ovSt.push(ls[j]); 
  } 
 } 
 
 var quest = []; 
 if (!isNuova) { 
  var lq = document.getElementById('lista-quest'); 
  if (lq) { 
   for (var q=0;q<lq.children.length;q++) { 
    var qn=document.getElementById('quest-nome-'+q); 
    var ql=document.getElementById('quest-link-'+q); 
    if (qn&&ql) quest.push({nome:qn.value.trim(), link:ql.value.trim()}); 
   } 
  } 
 } 
 
 var cats = ['armi','equip','oggetti','materiali']; 
 var baule = {}; 
 for (var c=0;c<cats.length;c++) { 
  baule[cats[c]] = []; 
  var lb=document.getElementById('lista-'+cats[c]); 
  if (lb) { 
   for (var bb=0;bb<lb.children.length;bb++) { 
    var item={}; 
    var nE=document.getElementById(cats[c]+'-nome-'+bb); 
    var qE=document.getElementById(cats[c]+'-qt-'+bb); 
    item.nome=nE?nE.value.trim():''; 
    item.qt=qE?qE.value.trim():'1'; 
    if (cats[c]==='oggetti') { var uE=document.getElementById(cats[c]+'-usi-'+bb); item.usi=uE?uE.value.trim():'0/1'; } 
    else if (cats[c]!=='materiali') { var lE=document.getElementById(cats[c]+'-lv-'+bb); item.lv=lE?lE.value.trim():'0'; } 
    var enE=document.getElementById(cats[c]+'-exp-nome-'+bb); 
    var elE=document.getElementById(cats[c]+'-exp-link-'+bb); 
    item.expNome=enE?enE.value.trim():''; 
    item.expLink=elE?elE.value.trim():''; 
    if (item.nome) baule[cats[c]].push(item); 
   } 
  } 
 } 
 
 var competenze = []; 
 if (!isNuova) { 
  for (var k=0;k<5;k++) { 
   competenze.push({ 
    nome:val('comp-nome-'+k), lv:val('comp-lv-'+k), 
    oggetto:val('comp-oggetto-'+k), desc:val('comp-desc-'+k), 
    sbloccato: !!val('comp-nome-'+k) 
   }); 
  } 
 } 
 
 var isBestia = (function(){ var e=document.getElementById('campo-razza'); return e && e.value==='Bestia Demoniaca'; })(); 
 var specie = isBestia ? (val('campo-specie')||'') : ''; 
 var rank = isBestia && DATI_SPECIE[specie] ? DATI_SPECIE[specie].rank : '—'; 
 var conservazione = isBestia && DATI_SPECIE[specie] ? DATI_SPECIE[specie].conservazione : '—'; 
 // Fedina: in scheda nuova leggi dal readonly, in modifica dal select 
 var fedina; 
 if (isNuova) { 
  var fv = document.getElementById('campo-fedina-val'); 
  fedina = fv ? fv.textContent.trim() : 'Incensurato'; 
 } else { 
  var fe = document.getElementById('campo-fedina'); 
  fedina = fe ? fe.value : 'Incensurato'; 
 } 
 // Taglia 
 var classTaglia = '—', valTaglia = '—'; 
 if (fedina === 'Ricercato') { 
  if (isNuova) { 
   var ctv = document.getElementById('campo-classtaglia-val'); 
   var vtv = document.getElementById('campo-valtaglia-val'); 
   classTaglia = ctv ? ctv.textContent.trim() : 'E'; 
   valTaglia   = vtv ? vtv.textContent.trim() : '1.000'; 
  } else { 
   var cte = document.getElementById('campo-classtaglia'); 
   var ctr = document.getElementById('campo-classtaglia-readonly'); 
   var vte = document.getElementById('campo-valtaglia'); 
   // Se il readonly è visibile (bestia A/B/C) usa "E", altrimenti leggi il select 
   var readonlyVisibile = ctr && ctr.style.display !== 'none'; 
   classTaglia = readonlyVisibile ? 'E' : (cte ? cte.value : 'E'); 
   var vtRaw = vte ? parseInt(vte.value.replace(/\./g,'').replace(/,/g,'').replace(/[^\d]/g,'')) || VALORE_TAGLIA_BASE['E'] : VALORE_TAGLIA_BASE['E']; 
   var vtMin = VALORE_TAGLIA_BASE[classTaglia] || VALORE_TAGLIA_BASE['E']; 
   if (vtRaw < vtMin) vtRaw = vtMin; 
   valTaglia = vtRaw.toLocaleString(); 
  } 
 } 
 
 var nomeVal = val('campo-nome')||'—';
 var cognomeVal = val('campo-cognome')||'';

 // Cap lv 5 per armi ed equip 
 for (var ci2=0;ci2<cats.length;ci2++) { 
  if (cats[ci2]==='oggetti'||cats[ci2]==='materiali') continue; 
  for (var bi2=0;bi2<baule[cats[ci2]].length;bi2++) { 
   var lvi = parseInt(baule[cats[ci2]][bi2].lv) || 0; 
   if (lvi > 5) baule[cats[ci2]][bi2].lv = '5'; 
  } 
 } 
 
 return { 
  nome: nomeVal, 
  cognome: cognomeVal, 
  nomecognome: (nomeVal==='—'&&cognomeVal==='') ? nomeVal : (nomeVal+' '+cognomeVal).trim(), 
  genere: val('campo-genere')||'—', 
  razza: isBestia ? 'Bestia Demoniaca' : 'Umano', 
  specie: specie, 
  rank: rank, 
  conservazione: conservazione, 
  fedina: fedina, 
  classTaglia: classTaglia, 
  valTaglia: valTaglia, 
  luogo: val('campo-luogo')||'—', 
  datanascita: leggiData('campo-datanascita'), 
  segno: val('campo-segno')||'—', 
  segnocinese: val('campo-segnocinese')||'—', 
  mbti: val('campo-mbti')||'—', 
  allineamento: val('campo-allineamento')||'—', 
  mestiere: val('campo-mestiere')||'—', 
  classe: isBestia ? '—' : (val('campo-classe')||'—'), 
  status: isNuova ? 'Nessuno' : (val('campo-status')||'Nessuno'), 
  livello: isNuova ? LIVELLO_INIZIALE : (val('campo-livello')||'1'), 
  exp: isNuova ? EXP_INIZIALE : (val('campo-exp')||'0'), 
  exptot: isNuova ? EXP_MASSIMA : calcolaExpTot(val('campo-livello')||'1'), 
  jenny: isNuova ? JENNY_INIZIALI : (val('campo-jenny')||'0'), 
  hc: isNuova ? HC_INIZIALI : (val('campo-hc')||'0'), 
  imgLaterale: val('campo-img-laterale')||'https://via.placeholder.com/664x184', 
  imgDati: val('campo-img-dati')||'https://via.placeholder.com/154x429', 
  imgInfoModo: (function(){ var m=document['querySelector']('input[name="img-info-modo"]:checked'); return m?m.value:'1'; })(),
  imgInfo: val('campo-img-info')||val('campo-img-dati')||'https://via.placeholder.com/154x429',
  imgInfoA: val('campo-img-info-a')||'https://via.placeholder.com/154x204',
  imgInfoB: val('campo-img-info-b')||'https://via.placeholder.com/154x204', 
 
  agg1: val('campo-agg1')||'Aggettivo 1', 
  agg2: val('campo-agg2')||'Aggettivo 2', 
  agg3: val('campo-agg3')||'Aggettivo 3', 
  citazione: val('campo-citazione')||'...', 
  aspetto: val('campo-aspetto')||'...', 
  background: val('campo-background')||'...', 
  hatsu: isNuova ? null : (val('campo-hatsu')||'—'),
  nen: isNuova ? NEN_INIZIALE : (val('campo-nen')||'0'),
  tenacia: isNuova ? TENACIA_INIZIALE : (val('campo-tenacia')||'10'),
  nenPotere: isNuova ? null : {
   nomepotere:    val('nen-nomepotere')||'—',
   descrizione:   val('nen-descrizione')||'—',
   funzionamento: val('nen-funzionamento')||'—',
   condizioni:    val('nen-condizioni')||'—'
  },
  nenImg: isNuova ? '' : (val('nen-img')||''),
  profili: isNuova ? [] : (function(){
   var out = [];
   for (var p=1;p<=4;p++) out.push({
    nome:  val('profilo-'+p+'-nome') ||'—',
    desc:  val('profilo-'+p+'-desc') ||'—',
    bonus: val('profilo-'+p+'-bonus')||'—',
    malus: val('profilo-'+p+'-malus')||'—',
    costo: val('profilo-'+p+'-costo')||'—'
   });
   return out;
  })(),
  tecniche25:  isNuova ? [] : raccogliTecnicheBox('25',  2),
  tecniche50:  isNuova ? [] : raccogliTecnicheBox('50',  2),
  tecniche100: isNuova ? [] : raccogliTecnicheBox('100', 1),
  musica: val('campo-musica')||'', 
  stat: stat, ovSt: ovSt, quest: quest, baule: baule, competenze: competenze 
 }; 
} 

function raccogliTecnicheBox(id, num) {
 function val(fieldId) { var e=document.getElementById(fieldId); return e?e.value.trim():''; }
 var out = [];
 for (var t=1;t<=num;t++) {
  out.push({
   nome:  val('tecnica-'+id+'-'+t+'-nome') ||'—',
   desc:  val('tecnica-'+id+'-'+t+'-desc') ||'—',
   bonus: val('tecnica-'+id+'-'+t+'-bonus')||'—',
   malus: val('tecnica-'+id+'-'+t+'-malus')||'—',
   costo: val('tecnica-'+id+'-'+t+'-costo')||'—'
  });
 }
 return out;
}

// ============================================================
