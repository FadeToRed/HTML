// ============================================================
// COSTANTI DI CONFIGURAZIONE NPC
// ============================================================
var LIVELLO_INIZIALE = 1;
var EXP_INIZIALE = 0;
var EXP_MASSIMA = 100;
var JENNY_INIZIALI = 0;
var HC_INIZIALI = 0;
var NEN_INIZIALE = 0;
var TENACIA_INIZIALE = 10;

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

var LUOGHI_BESTIA = {
 'Kiriko':              ['Insediamento Melioras'],
 'Scimmia Antropomorfa':['Villaggio di Trakey'],
 'Guardiano':           ['Villaggio di Blackbird'],
 'Kitsune':             ['Villaggio delle Nuvole', 'Villaggio dei Fiori'],
 'Dai Tengu':           ['Monte Hiei', 'Monte Kurama'],
 'Karasu Tengu':        ['Monte Hiei', 'Monte Kurama'],
 'Were-pire':           ['Città Eterna'],
 'Formichimera Umana':  Object.keys(BONUS_LUOGO)
};

var DATI_SPECIE = {
 'Kiriko':              { rank: 'E', conservazione: 'Vulnerabile (VU)',                      fedina: 'Incensurato' },
 'Scimmia Antropomorfa':{ rank: 'A', conservazione: 'Rischio Minimo (LC)',                   fedina: 'Ricercato' },
 'Guardiano':           { rank: 'C', conservazione: 'Critico (CR)',                          fedina: 'Ricercato' },
 'Kitsune':             { rank: 'C', conservazione: 'Rischio Minimo (LC)',                   fedina: 'Ricercato' },
 'Dai Tengu':           { rank: 'D', conservazione: 'Vulnerabile (VU)',                      fedina: 'Incensurato' },
 'Karasu Tengu':        { rank: 'D', conservazione: 'Vulnerabile (VU)',                      fedina: 'Incensurato' },
 'Were-pire':           { rank: 'D', conservazione: 'Rischio Minimo (LC)',                   fedina: 'Incensurato' },
 'Formichimera Umana':  { rank: 'B', conservazione: 'Probabilmente Estinto in Natura (PEW)', fedina: 'Ricercato' }
};

var SPECIE_BESTIA = Object.keys(DATI_SPECIE);

var VALORE_TAGLIA_BASE = {
 'E': 1000, 'D': 50000, 'C': 100000, 'B': 250000,
 'A': 750000, 'S': 1500000, 'SS': 3000000, 'SSS': 5000000
};
var CLASSIFICAZIONI_TAGLIA = ['E','D','C','B','A','S','SS','SSS'];

var CLASSI_NPC = Object.keys(CLASSI_CONFIG); // tutte le classi, nessuna esclusa

var LUOGHI_UMANI = Object.keys(BONUS_LUOGO);
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

var TIPI_HATSU = [
 'Non ancora sbloccato',
 'Irrobustimento (&#24375;&#21270;)',
 'Emissione (&#25918;&#20986;)',
 'Trasformazione (&#22793;&#21270;)',
 'Manipolazione (&#25805;&#20316;)',
 'Concretizzazione (&#20855;&#29616;&#21270;)',
 'Specializzazione (&#29305;&#36074;)'
];

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

var SLIDE_EXTRA_TIPI = ['nessuna', 'moveset', 'valutazioni', 'altro'];

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

 if (!isNuova) {
  html += sezioneForm('<i class="fa-solid fa-file-import"></i> Importa Scheda Esistente', costruisciImporta());
 }

 html += sezioneForm('<i class="fa-solid fa-user"></i> Dati Personali', costruisciDatiPersonali(isNuova));
 html += sezioneForm('<i class="fa-solid fa-image"></i> Immagini', costruisciImmagini());
 html += sezioneForm('<i class="fa-solid fa-star"></i> Info &amp; Personalità', costruisciInfo());
 html += sezioneForm('<i class="fa-solid fa-chart-bar"></i> Statistiche', costruisciStatistiche(isNuova));
 html += sezioneForm('<i class="fa-solid fa-fire"></i> Abilità Nen', costruisciNen(isNuova));
 html += sezioneForm('<i class="fa-solid fa-scroll"></i> Apparizioni', costruisciApparizioni(isNuova));
 html += sezioneForm('<i class="fa-solid fa-list"></i> Campi Dati Extra', costruisciCampiExtra());
 html += sezioneForm('<i class="fa-solid fa-bag-shopping"></i> Baule', costruisciBalue());
 html += sezioneForm('<i class="fa-solid fa-music"></i> Musica', costruisciMusica());
 html += sezioneForm('<i class="fa-solid fa-layer-group"></i> Slide Extra', costruisciSlideExtra(isNuova));

 html += '<div style="text-align:center; margin-top:40px; padding-bottom:40px;">';
 html += '<button onclick="generaScheda()" style="background:linear-gradient(135deg,#A8DBA8 0%,#79BD9A 100%); color:#1a2e1a; border:none; padding:18px 60px; font-size:1.3em; font-weight:700; border-radius:10px; cursor:pointer; font-family:\'Montserrat\'; box-shadow:0 6px 25px rgba(0,0,0,0.4); text-transform:uppercase; letter-spacing:2px; transition:all 0.3s;">';
 html += '<i class="fa-solid fa-wand-magic-sparkles"></i> Genera Scheda</button>';
 html += '</div>';

 container.innerHTML = html;

 if (isNuova) {
  var luogoEl = document.getElementById('campo-luogo');
  if (luogoEl) luogoEl.onchange = function(){};
  aggiornaRazza(true);
 } else {
  aggiornaRazza(false);
  var feEl = document.getElementById('campo-fedina');
  if (feEl) feEl.onchange = function(){ aggiornaFedina(false); };
 }
 aggiornaSlideExtra();
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
 for (var g = 1; g <= 31; g++) { opG += '<option value="' + (g < 10 ? '0'+g : g) + '">' + g + '</option>'; }
 for (var m = 0; m < 12; m++) { opM += '<option value="' + mesi[m] + '">' + mesi[m] + '</option>'; }
 for (var a = 2017; a >= 1900; a--) { opA += '<option value="' + a + '">' + a + '</option>'; }
 var sel = STILE_INPUT + ' background:#292354;';
 return '<div style="margin-bottom:14px;">' +
  '<label style="' + STILE_LABEL + '">' + label + '</label>' +
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:25%; padding-right:6px; vertical-align:top;"><select id="' + id + '-g" style="' + sel + '">' + opG + '</select><div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Giorno</div></td>' +
  '<td style="width:45%; padding-left:3px; padding-right:3px; vertical-align:top;"><select id="' + id + '-m" style="' + sel + '">' + opM + '</select><div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Mese</div></td>' +
  '<td style="width:30%; padding-left:6px; vertical-align:top;"><select id="' + id + '-a" style="' + sel + '">' + opA + '</select><div style="color:#8FBEBA; font-size:0.75em; text-align:center; margin-top:3px;">Anno</div></td>' +
  '</tr></table></div>';
}

function leggiData(id) {
 var g = document.getElementById(id + '-g');
 var m = document.getElementById(id + '-m');
 var a = document.getElementById(id + '-a');
 if (!g || !m || !a) return '—';
 var vg = g.value, vm = m.value, va = a.value;
 if (vg && !vm && !va) return '—';
 if (!vg && !vm && !va) return '—';
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
// SEZIONI DEL FORM
// ============================================================
function costruisciDatiPersonali(isNuova) {
 var html = '';
 html += riga2(inputText('campo-nome','Nome','Es. Hisoka'), inputText('campo-cognome','Cognome','Es. Morrow'));
 html += riga2(
  inputText('campo-genere','Genere','Uomo / Donna / Neutro / Ecc.'),
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Razza</label>' +
  '<select id="campo-razza" onchange="aggiornaRazza('+isNuova+')" style="'+STILE_INPUT+' background:#292354;">' +
  '<option value="Umano">Umano</option>' +
  '<option value="Bestia Demoniaca">Bestia Demoniaca</option>' +
  '</select></div>'
 );
 // Specie
 html += '<div id="campo-specie-wrap" style="display:none; margin-bottom:14px;">' +
  '<label style="'+STILE_LABEL+'">Specie</label>' +
  '<select id="campo-specie" onchange="aggiornaRazza('+isNuova+')" style="'+STILE_INPUT+' background:#292354;">';
 for (var sp = 0; sp < SPECIE_BESTIA.length; sp++) {
  html += '<option value="'+SPECIE_BESTIA[sp]+'">'+SPECIE_BESTIA[sp]+'</option>';
 }
 html += '</select></div>';
 // Rank (readonly calcolato)
 html += '<div id="campo-rank-wrap" style="display:none;">' +
  riga2(
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Rank di Pericolosità</label><div id="campo-rank-val" style="'+STILE_READONLY+'">—</div></div>',
   '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Stato di Conservazione</label><div id="campo-conservazione-val" style="'+STILE_READONLY+'">—</div></div>'
  ) +
 '</div>';
 // Luogo di nascita
 html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Luogo di nascita</label>' +
  '<select id="campo-luogo" style="'+STILE_INPUT+' background:#292354;"></select></div>';
 html += inputDate('campo-datanascita', 'Data di nascita');
 html += riga2(inputSelect('campo-segno','Segno zodiacale', SEGNI_ZODIACALI), inputSelect('campo-segnocinese','Segno zodiacale cinese', SEGNI_CINESI));
 html += riga2(inputSelect('campo-mbti','MBTI', MBTI_TIPI), inputSelect('campo-allineamento','Allineamento', ALLINEAMENTI));
 html += inputText('campo-mestiere','Mestiere','Es. Assassino');
 // Classe — visibile solo per Umani, tutte le classi disponibili
 html += '<div id="campo-classe-wrap">' +
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classe</label>' +
  '<select id="campo-classe" style="'+STILE_INPUT+' background:#292354;"></select></div>' +
 '</div>';
 // Fedina — sempre select libera
 html += '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Fedina Penale</label>' +
  '<select id="campo-fedina" onchange="aggiornaFedina(false)" style="'+STILE_INPUT+' background:#292354;">' +
  '<option value="Incensurato">Incensurato</option>' +
  '<option value="Ricercato">Ricercato</option>' +
  '</select></div>';
 // Taglia
 html += '<div id="campo-taglia-wrap" style="display:none;">';
 var opzioniTaglia = '';
 for (var ct = 0; ct < CLASSIFICAZIONI_TAGLIA.length; ct++) {
  opzioniTaglia += '<option value="'+CLASSIFICAZIONI_TAGLIA[ct]+'">'+CLASSIFICAZIONI_TAGLIA[ct]+'</option>';
 }
 html += riga2(
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Classificazione Taglia</label>' +
  '<select id="campo-classtaglia" onchange="aggiornaTaglia()" style="'+STILE_INPUT+' background:#292354;">' + opzioniTaglia + '</select></div>',
  inputText('campo-valtaglia','Valore Taglia (Jenny)','Es. 1000')
 );
 html += '</div>';
 // Status, Livello, EXP, Jenny, HC — tutti liberi
 html += inputSelect('campo-status','Status', STATUS);
 html += riga2(
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Livello</label><input type="text" id="campo-livello" placeholder="Es. 50" style="'+STILE_INPUT+'"></div>',
  inputText('campo-exp','EXP attuale','Es. 80')
 );
 html += riga2(inputText('campo-jenny','Jenny','Es. 500000'), inputText('campo-hc','HC','Es. 0'));
 return html;
}

function costruisciImmagini() {
 var html = inputText('campo-img-laterale','Immagine Header (URL) — dimensioni ideali: 664x184px.','https://...');
 html += inputText('campo-img-dati','Immagine slide Dati (URL) — dimensioni ideali: 214x429px.','https://...');
 // Solo una immagine per la slide Info (niente doppia opzione, niente img-info nella scheda NPC)
 return html;
}

function costruisciInfo() {
 var html = riga3(
  inputText('campo-agg1','Aggettivo 1','Es. Enigmatico'),
  inputText('campo-agg2','Aggettivo 2','Es. Pericoloso'),
  inputText('campo-agg3','Aggettivo 3','Es. Imprevedibile')
 );
 html += inputText('campo-citazione','Citazione del personaggio','Citazione...');
 html += inputTextarea('campo-aspetto','Descrizione','Descrivi aspetto fisico e carattere...', 5);
 html += inputTextarea('campo-background','Background','Racconta la storia del personaggio...', 6);
 return html;
}

function costruisciStatistiche(isNuova) {
 // NPC: sempre input liberi, nessuna restrizione
 var html = '<p style="color:#8FBEBA; font-size:0.85em; margin-bottom:15px; font-style:italic;">Nessuna restrizione — gli NPC possono avere qualsiasi valore.</p>';
 var nomiStat = ['Forza','Resistenza','Velocità','Riflessi','Destrezza','Mira','Intelligenza','Carisma','Istinto','Fortuna'];
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna'];
 var r1 = [], r2 = [];
 for (var i = 0; i < 5; i++) {
  r1.push(
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' +
   '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">'+nomiStat[i]+'</div>' +
   '<input type="number" id="stat-'+ls[i]+'" value="5" min="0" style="width:60px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' +
   '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' +
   '<button onclick="stepStatNpc(\''+ls[i]+'\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' +
   '<button onclick="stepStatNpc(\''+ls[i]+'\',5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' +
   '</div></div>'
  );
 }
 for (var j = 5; j < 10; j++) {
  r2.push(
   '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px 4px;">' +
   '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">'+nomiStat[j]+'</div>' +
   '<input type="number" id="stat-'+ls[j]+'" value="5" min="0" style="width:60px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' +
   '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' +
   '<button onclick="stepStatNpc(\''+ls[j]+'\',-5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' +
   '<button onclick="stepStatNpc(\''+ls[j]+'\',5)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' +
   '</div></div>'
  );
 }
 html += rigaStat5(r1);
 html += rigaStat5(r2);
 html += riga2(
  '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px;">' +
  '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">Vita</div>' +
  '<input type="number" id="stat-vita" value="300" min="0" style="width:70px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' +
  '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' +
  '<button onclick="stepStatNpc(\'vita\',-100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' +
  '<button onclick="stepStatNpc(\'vita\',100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' +
  '</div></div>',
  '<div style="text-align:center; background:#292354; border:1px solid #3B8686; border-radius:8px; padding:8px;">' +
  '<div style="color:#8FBEBA; font-size:0.75em; margin-bottom:4px;">Aura</div>' +
  '<input type="number" id="stat-aura" value="500" min="0" style="width:70px; background:transparent; border:none; color:#CFF09E; font-size:1.2em; font-weight:700; text-align:center; padding:2px 0;">' +
  '<div style="display:flex; justify-content:center; gap:4px; margin-top:5px;">' +
  '<button onclick="stepStatNpc(\'aura\',-100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">&#8722;</button>' +
  '<button onclick="stepStatNpc(\'aura\',100)" style="background:#0B486B; color:#CFF09E; border:1px solid #3B8686; border-radius:4px; width:24px; height:24px; cursor:pointer; font-size:0.9em; padding:0;">+</button>' +
  '</div></div>'
 );
 // Competenze: sempre tutte sbloccate, nessuna restrizione di livello
 html += '<div style="margin-top:22px; border-top:1px solid #3B8686; padding-top:18px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:14px;"><i class="fa-solid fa-puzzle-piece"></i> Competenze</h4>';
 html += '<p style="color:#8FBEBA; font-size:0.85em; margin-bottom:14px; font-style:italic;">Tutti gli slot sono sempre disponibili per gli NPC.</p>';
 for (var n = 0; n < 5; n++) {
  html += '<div style="background:#292354; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:10px;">';
  html += '<div style="color:#CFF09E; font-size:0.82em; margin-bottom:10px;"><i class="fa-solid fa-lock-open"></i> Slot ' + (n+1) + '</div>';
  html += inputText('comp-nome-'+n,'Nome competenza','Es. Maestro del Combattimento');
  html += riga2(inputText('comp-lv-'+n,'Livello','Es. 3'), inputText('comp-oggetto-'+n,'Oggetto','Es. Carte'));
  html += inputTextarea('comp-desc-'+n,'Descrizione','Descrizione della competenza...', 2);
  html += '</div>';
 }
 html += '</div>';
 return html;
}

function costruisciNen(isNuova) {
 var html = inputSelect('campo-hatsu','Tipo Hatsu', TIPI_HATSU);
 html += riga2(inputText('campo-nen','Nen (%)','Es. 100'), inputText('campo-tenacia','Tenacia (%)','Es. 100'));
 html += '<div style="margin-top:8px;">';
 html += '<label style="' + STILE_LABEL + '">Tecniche Hatsu</label>';
 html += '<div id="lista-tecniche"></div>';
 html += '<button onclick="aggiungiTecnica()" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Tecnica</button>';
 html += '</div>';
 return html;
}

function costruisciApparizioni(isNuova) {
 var html = '<div id="lista-apparizioni"></div>';
 html += '<button onclick="aggiungiApparizione()" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Apparizione</button>';
 return html;
}

function aggiungiApparizione() {
 var lista = document.getElementById('lista-apparizioni');
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = 'apparizione-row-' + idx;
 div.style.cssText = 'margin-bottom:8px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:44%; padding-right:5px; vertical-align:bottom;">' + inputText('apparizione-nome-'+idx,'Nome apparizione','Es. La Prima Missione') + '</td>' +
  '<td style="width:44%; padding-left:5px; padding-right:5px; vertical-align:bottom;">' + inputText('apparizione-link-'+idx,'Link','https://...') + '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'apparizione-row-'+idx+'\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>';
 lista.appendChild(div);
}

// ============================================================
// CAMPI DATI EXTRA (label + valore liberi, aggiungibili)
// ============================================================
function costruisciCampiExtra() {
 var html = '<p style="color:#8FBEBA; font-size:0.88em; margin-bottom:12px; font-style:italic;"><i class="fa-solid fa-circle-info"></i> Aggiungi campi personalizzati alla slide Dati. Puoi scegliere sia il testo del label che il contenuto.</p>';
 html += '<div id="lista-campi-extra"></div>';
 html += '<button onclick="aggiungiCampoExtra()" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Campo</button>';
 return html;
}

function aggiungiCampoExtra() {
 var lista = document.getElementById('lista-campi-extra');
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = 'extra-row-' + idx;
 div.style.cssText = 'background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:12px; margin-bottom:10px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:35%; padding-right:5px; vertical-align:bottom;">' + inputText('extra-label-'+idx,'Testo del Label','Es. Affiliazione:') + '</td>' +
  '<td style="width:53%; padding-left:5px; padding-right:5px; vertical-align:bottom;">' + inputText('extra-val-'+idx,'Contenuto','Es. Brigata dei Fantasmi') + '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'extra-row-'+idx+'\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>';
 lista.appendChild(div);
}

// ============================================================
// BAULE
// ============================================================
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
 var riga1 = '';
 if (categoria === 'materiali') {
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
 var riga2esp = '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:50%; padding-right:6px; vertical-align:bottom;">' + inputText(categoria+'-exp-nome-'+idx,'Nome espansione','Es. Caccia al Tesoro') + '</td>' +
  '<td style="width:50%; padding-left:6px; vertical-align:bottom;">' + inputText(categoria+'-exp-link-'+idx,'Link espansione','https://...') + '</td>' +
  '</tr></table>';
 div.innerHTML = riga1 + riga2esp;
 lista.appendChild(div);
}

function costruisciMusica() {
 return inputText('campo-musica','Colonna sonora (Solo ID Video YouTube)','Es. cjqwwIRnmuQ') +
  '<p style="color:#8FBEBA; font-size:0.82em; margin-top:-10px; font-style:italic;">Inserisci SOLO l\'ID della traccia (Gli 11 caratteri alfanumerici dopo "https://www.youtube.com/watch?v=" nell\'URL di YouTube)</p>';
}

function costruisciImporta() {
 return '<p style="color:#8FBEBA; font-size:0.88em; margin-bottom:12px; font-style:italic;"><i class="fa-solid fa-circle-info"></i> Incolla il codice HTML della scheda esistente e premi "Importa Dati".</p>' +
  '<label style="' + STILE_LABEL + '">Codice HTML della scheda esistente:</label>' +
  '<textarea id="campo-importa" placeholder="Incolla il codice HTML..." rows="6" style="' + STILE_INPUT + ' font-family:\'Montserrat\'; font-size:1em; resize:vertical;"></textarea>' +
  '<button onclick="importaScheda()" style="margin-top:10px; background:#292354; color:#8FBEBA; border:1px solid #3B8686; padding:10px 25px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\';"><i class="fa-solid fa-file-import"></i> Importa Dati</button>';
}

// ============================================================
// SLIDE EXTRA
// ============================================================
function costruisciSlideExtra(isNuova) {
 var html = '<p style="color:#8FBEBA; font-size:0.88em; margin-bottom:16px; font-style:italic;"><i class="fa-solid fa-circle-info"></i> Puoi aggiungere una slide opzionale alla scheda NPC. Scegli il tipo o lascia "Nessuna".</p>';
 html += '<div style="margin-bottom:20px;">';
 html += '<label style="' + STILE_LABEL + '">Tipo di slide extra</label>';
 html += '<select id="campo-slide-extra" onchange="aggiornaSlideExtra()" style="' + STILE_INPUT + ' background:#292354;">';
 html += '<option value="nessuna">Nessuna</option>';
 html += '<option value="moveset">Moveset</option>';
 html += '<option value="valutazioni">Valutazioni</option>';
 html += '<option value="altro">Altro</option>';
 html += '</select></div>';

 // --- Pannello MOVESET ---
 html += '<div id="pannello-moveset" style="display:none;">';
 html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:14px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-fist-raised"></i> Attribuzione Punti</h4>';
 html += riga3(
  inputText('moveset-colpovalido','Colpo Valido','Es. 10'),
  inputText('moveset-colpocritico','Colpo Critico','Es. 20'),
  inputText('moveset-garantiti','Punti Garantiti','Es. 5')
 );
 html += '</div>';
 html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:14px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-burst"></i> Attacchi</h4>';
 html += '<div id="lista-attacchi"></div>';
 html += '<button onclick="aggiungiTecnicaSlide(\'lista-attacchi\')" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Attacco</button>';
 html += '</div>';
 html += '<div style="background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:14px; margin-bottom:14px;">';
 html += '<h4 style="color:#CFF09E; font-family:\'Montserrat\'; margin-bottom:12px;"><i class="fa-solid fa-shield-halved"></i> Difese</h4>';
 html += '<div id="lista-difese"></div>';
 html += '<button onclick="aggiungiTecnicaSlide(\'lista-difese\')" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Difesa</button>';
 html += '</div>';
 html += '</div>'; // fine pannello-moveset

 // --- Pannello VALUTAZIONI ---
 html += '<div id="pannello-valutazioni" style="display:none;">';
 html += inputText('val-titolo','Titolo valutazione','Valutazione degli Esaminatori');
 html += '<div id="lista-valutazioni"></div>';
 html += '<button onclick="aggiungiValutazione()" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Valutazione</button>';
 html += '</div>'; // fine pannello-valutazioni

 // --- Pannello ALTRO ---
 html += '<div id="pannello-altro" style="display:none;">';
 html += '<div id="lista-altro"></div>';
 html += '<button onclick="aggiungiCampoAltro()" style="background:transparent; color:#8FBEBA; border:1px dashed #3B8686; padding:8px 20px; border-radius:6px; cursor:pointer; font-family:\'Montserrat\'; margin-top:5px;"><i class="fa-solid fa-plus"></i> Aggiungi Campo</button>';
 html += '</div>'; // fine pannello-altro

 return html;
}

function aggiornaSlideExtra() {
 var sel = document.getElementById('campo-slide-extra');
 if (!sel) return;
 var val = sel.value;
 var pannelli = ['moveset','valutazioni','altro'];
 for (var i = 0; i < pannelli.length; i++) {
  var p = document.getElementById('pannello-' + pannelli[i]);
  if (p) p.style.display = val === pannelli[i] ? '' : 'none';
 }
}

function aggiungiTecnicaSlide(listaId) {
 var lista = document.getElementById(listaId);
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = listaId + '-row-' + idx;
 div.style.cssText = 'background:#0d1f30; border:1px solid #3B8686; border-radius:8px; padding:12px; margin-bottom:10px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed; margin-bottom:6px;"><tr>' +
  '<td style="width:88%; padding-right:6px; vertical-align:bottom;">' + inputText(listaId+'-nome-'+idx,'Nome','Es. Pugno di Ferro') + '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'' + listaId + '-row-' + idx + '\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>' +
  inputTextarea(listaId+'-desc-'+idx,'Descrizione','Descrizione...', 2);
 lista.appendChild(div);
}

function aggiungiValutazione() {
 var lista = document.getElementById('lista-valutazioni');
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = 'val-row-' + idx;
 div.style.cssText = 'background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:12px; margin-bottom:10px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:55%; padding-right:5px; vertical-align:bottom;">' + inputText('val-nome-'+idx,'Nome valutazione','Es. Combattività') + '</td>' +
  '<td style="width:33%; padding-left:5px; padding-right:5px; vertical-align:middle;">' +
  '<div style="margin-bottom:14px;"><label style="'+STILE_LABEL+'">Punteggio (1-5)</label>' +
  '<div style="display:flex; gap:6px; align-items:center;">' +
  [1,2,3,4,5].map(function(n){ return '<button onclick="setStella(\'val-stelle-'+idx+'\','+n+')" id="val-stella-'+idx+'-'+n+'" style="background:transparent; border:none; cursor:pointer; font-size:22px; color:#3B8686; padding:0;">★</button>'; }).join('') +
  '<input type="hidden" id="val-stelle-'+idx+'" value="0">' +
  '</div></div>' +
  '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'val-row-'+idx+'\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>';
 lista.appendChild(div);
}

function setStella(hiddenId, valore) {
 var hidden = document.getElementById(hiddenId);
 if (!hidden) return;
 hidden.value = valore;
 // Aggiorna colori bottoni stelle
 var idx = hiddenId.replace('val-stelle-','');
 for (var n = 1; n <= 5; n++) {
  var btn = document.getElementById('val-stella-'+idx+'-'+n);
  if (btn) btn.style.color = n <= valore ? '#CFF09E' : '#3B8686';
 }
}

function aggiungiCampoAltro() {
 var lista = document.getElementById('lista-altro');
 var idx = lista.children.length;
 var div = document.createElement('div');
 div.id = 'altro-row-' + idx;
 div.style.cssText = 'background:#1a2e45; border:1px solid #3B8686; border-radius:8px; padding:12px; margin-bottom:10px;';
 div.innerHTML =
  '<table style="width:100%; border-collapse:collapse; table-layout:fixed;"><tr>' +
  '<td style="width:35%; padding-right:5px; vertical-align:bottom;">' + inputText('altro-label-'+idx,'Testo del Label','Es. Affiliazione:') + '</td>' +
  '<td style="width:53%; padding-left:5px; padding-right:5px; vertical-align:bottom;">' + inputText('altro-val-'+idx,'Contenuto','Es. Brigata dei Fantasmi') + '</td>' +
  '<td style="width:12%; vertical-align:bottom; padding-bottom:14px; text-align:center;">' +
  '<button onclick="rimuoviElemento(\'altro-row-'+idx+'\')" style="background:rgba(80,0,0,0.4); color:#F9C6C6; border:1px solid #6b0b0b; padding:10px 12px; border-radius:6px; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>' +
  '</td></tr></table>';
 lista.appendChild(div);
}

// ============================================================
// LOGICA RAZZA
// ============================================================
function aggiornaRazza(isNuova) {
 var razzaEl = document.getElementById('campo-razza');
 var specieEl = document.getElementById('campo-specie');
 if (!razzaEl) return;
 var isBestia = razzaEl.value === 'Bestia Demoniaca';
 var specie = specieEl ? specieEl.value : '';

 var spWrap = document.getElementById('campo-specie-wrap');
 var rankWrap = document.getElementById('campo-rank-wrap');
 if (spWrap) spWrap.style.display = isBestia ? '' : 'none';
 if (rankWrap) rankWrap.style.display = isBestia ? '' : 'none';

 if (isBestia && DATI_SPECIE[specie]) {
  var ds = DATI_SPECIE[specie];
  var rv = document.getElementById('campo-rank-val');
  var cv = document.getElementById('campo-conservazione-val');
  if (rv) rv.textContent = ds.rank;
  if (cv) cv.textContent = ds.conservazione;
 }

 // Aggiorna luoghi — NPC vede tutti i luoghi senza restrizioni
 var luogoEl = document.getElementById('campo-luogo');
 if (luogoEl) {
  var luogoCorrente = luogoEl.value;
  luogoEl['inn'+'erHTML'] = '';
  var luoghiDaMostrare = isBestia
   ? (specie && LUOGHI_BESTIA[specie] ? LUOGHI_BESTIA[specie] : LUOGHI_TUTTI)
   : LUOGHI_UMANI;
  // NPC: mostra comunque tutti, senza disabilitare
  for (var li = 0; li < LUOGHI_TUTTI.length; li++) {
   var opt = document.createElement('option');
   opt.value = LUOGHI_TUTTI[li]; opt.text = LUOGHI_TUTTI[li];
   luogoEl['append'+'Child'](opt);
  }
  if (luogoCorrente) {
   for (var oi = 0; oi < luogoEl.options.length; oi++) {
    if (luogoEl.options[oi].value === luogoCorrente) { luogoEl.selectedIndex = oi; break; }
   }
  }
 }

 // Classe — tutte disponibili, nessuna esclusa
 var classeWrap = document.getElementById('campo-classe-wrap');
 var classeEl = document.getElementById('campo-classe');
 if (classeWrap) classeWrap.style.display = isBestia ? 'none' : '';
 if (classeEl && !isBestia) {
  classeEl['inn'+'erHTML'] = '';
  for (var ci = 0; ci < CLASSI_NPC.length; ci++) {
   var optC = document.createElement('option');
   optC.value = CLASSI_NPC[ci]; optC.text = CLASSI_NPC[ci];
   classeEl['append'+'Child'](optC);
  }
 }

 aggiornaFedina(false);
}

function aggiornaFedina(isNuova) {
 var feEl = document.getElementById('campo-fedina');
 if (!feEl) return;
 var tagliaWrap = document.getElementById('campo-taglia-wrap');
 if (tagliaWrap) tagliaWrap.style.display = feEl.value === 'Ricercato' ? '' : 'none';
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

// ============================================================
// STEP STAT NPC (nessun limite)
// ============================================================
function stepStatNpc(sId, delta) {
 var el = document.getElementById('stat-' + sId);
 if (!el) return;
 var cur = parseInt(el.value) || 0;
 var nv = cur + delta;
 if (nv < 0) nv = 0;
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

function rimuoviElemento(id) {
 var el = document.getElementById(id);
 if (el && el.parentNode) el.parentNode.removeChild(el);
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

// ============================================================
// RACCOLTA DATI
// ============================================================
function raccogliDati(isNuova) {
 function val(id) { var e=document.getElementById(id); return e?e.value.trim():''; }

 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna'];
 var stat = {};
 for (var i=0;i<ls.length;i++) {
  var e = document.getElementById('stat-'+ls[i]);
  stat[ls[i]] = e ? (e.value.trim()||'5') : '5';
 }
 stat.vita = (function(){ var e=document.getElementById('stat-vita'); return e?(e.value.trim()||'300'):'300'; })();
 stat.aura = (function(){ var e=document.getElementById('stat-aura'); return e?(e.value.trim()||'500'):'500'; })();

 var isBestia = (function(){ var e=document.getElementById('campo-razza'); return e && e.value==='Bestia Demoniaca'; })();
 var specie = isBestia ? (val('campo-specie')||'') : '';
 var rank = isBestia && DATI_SPECIE[specie] ? DATI_SPECIE[specie].rank : '—';
 var conservazione = isBestia && DATI_SPECIE[specie] ? DATI_SPECIE[specie].conservazione : '—';
 var feEl = document.getElementById('campo-fedina');
 var fedina = feEl ? feEl.value : 'Incensurato';
 var classTaglia = '—', valTaglia = '—';
 if (fedina === 'Ricercato') {
  var cte = document.getElementById('campo-classtaglia');
  var vte = document.getElementById('campo-valtaglia');
  classTaglia = cte ? cte.value : 'E';
  var vtRaw = vte ? parseInt(vte.value.replace(/\./g,'').replace(/,/g,'').replace(/[^\d]/g,'')) || VALORE_TAGLIA_BASE['E'] : VALORE_TAGLIA_BASE['E'];
  var vtMin = VALORE_TAGLIA_BASE[classTaglia] || VALORE_TAGLIA_BASE['E'];
  if (vtRaw < vtMin) vtRaw = vtMin;
  valTaglia = vtRaw.toLocaleString();
 }

 var nomeVal = val('campo-nome')||'—';
 var cognomeVal = val('campo-cognome')||'';

 // Apparizioni
 var apparizioni = [];
 var la = document.getElementById('lista-apparizioni');
 if (la) {
  for (var q=0;q<la.children.length;q++) {
   var an=document.getElementById('apparizione-nome-'+q);
   var al=document.getElementById('apparizione-link-'+q);
   if (an&&al) apparizioni.push({nome:an.value.trim(), link:al.value.trim()});
  }
 }

 // Campi extra
 var campiExtra = [];
 var le = document.getElementById('lista-campi-extra');
 if (le) {
  for (var ce=0;ce<le.children.length;ce++) {
   var elLbl=document.getElementById('extra-label-'+ce);
   var elVal=document.getElementById('extra-val-'+ce);
   if (elLbl && elLbl.value.trim()) campiExtra.push({label:elLbl.value.trim(), valore:elVal?elVal.value.trim():''});
  }
 }

 // Baule
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
    item.nome=nE?nE.value.trim():''; item.qt=qE?qE.value.trim():'1';
    if (cats[c]==='oggetti') { var uE=document.getElementById(cats[c]+'-usi-'+bb); item.usi=uE?uE.value.trim():'0/1'; }
    else if (cats[c]!=='materiali') { var lE=document.getElementById(cats[c]+'-lv-'+bb); item.lv=lE?lE.value.trim():'0'; }
    var enE=document.getElementById(cats[c]+'-exp-nome-'+bb);
    var elE2=document.getElementById(cats[c]+'-exp-link-'+bb);
    item.expNome=enE?enE.value.trim():''; item.expLink=elE2?elE2.value.trim():'';
    if (item.nome) baule[cats[c]].push(item);
   }
  }
 }

 // Competenze — tutte sempre sbloccate
 var competenze = [];
 for (var k=0;k<5;k++) {
  competenze.push({
   nome:val('comp-nome-'+k), lv:val('comp-lv-'+k),
   oggetto:val('comp-oggetto-'+k), desc:val('comp-desc-'+k),
   sbloccato: !!val('comp-nome-'+k)
  });
 }

 // Tecniche Hatsu
 var tecniche = [];
 var lt = document.getElementById('lista-tecniche');
 if (lt) {
  for (var ti=0;ti<lt.children.length;ti++) {
   var tn=document.getElementById('tecnica-nome-'+ti);
   var td2=document.getElementById('tecnica-desc-'+ti);
   if (tn) tecniche.push({nome:tn.value.trim()||('Tecnica '+(ti+1)), desc:td2?td2.value.trim():''});
  }
 }

 // Slide extra
 var slideExtraTipo = val('campo-slide-extra') || 'nessuna';
 var slideExtraData = {};
 if (slideExtraTipo === 'moveset') {
  slideExtraData.colpovalido  = val('moveset-colpovalido')  || '—';
  slideExtraData.colpocritico = val('moveset-colpocritico') || '—';
  slideExtraData.garantiti    = val('moveset-garantiti')    || '—';
  slideExtraData.attacchi = raccogliListaTecnicaSlide('lista-attacchi');
  slideExtraData.difese   = raccogliListaTecnicaSlide('lista-difese');
 } else if (slideExtraTipo === 'valutazioni') {
  slideExtraData.titolo = val('val-titolo') || 'Valutazione degli Esaminatori';
  slideExtraData.voci = [];
  var lv2 = document.getElementById('lista-valutazioni');
  if (lv2) {
   for (var vi=0;vi<lv2.children.length;vi++) {
    var vnEl = document.getElementById('val-nome-'+vi);
    var vsEl = document.getElementById('val-stelle-'+vi);
    if (vnEl && vnEl.value.trim()) {
     slideExtraData.voci.push({nome:vnEl.value.trim(), stelle: parseInt(vsEl?vsEl.value:0)||0});
    }
   }
  }
 } else if (slideExtraTipo === 'altro') {
  slideExtraData.campi = [];
  var lal = document.getElementById('lista-altro');
  if (lal) {
   for (var ai=0;ai<lal.children.length;ai++) {
    var albl=document.getElementById('altro-label-'+ai);
    var aval=document.getElementById('altro-val-'+ai);
    if (albl && albl.value.trim()) slideExtraData.campi.push({label:albl.value.trim(), valore:aval?aval.value.trim():''});
   }
  }
 }

 var expTot = 100;
 var lvNum = parseInt(val('campo-livello')) || 1;
 if (lvNum > 14) expTot = 100 + (lvNum - 14) * 10;

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
  status: val('campo-status')||'Nessuno',
  livello: val('campo-livello')||'1',
  exp: val('campo-exp')||'0',
  exptot: expTot,
  jenny: val('campo-jenny')||'0',
  hc: val('campo-hc')||'0',
  imgLaterale: val('campo-img-laterale')||'https://via.placeholder.com/664x184',
  imgDati: val('campo-img-dati')||'https://via.placeholder.com/154x429',
  agg1: val('campo-agg1')||'Aggettivo 1',
  agg2: val('campo-agg2')||'Aggettivo 2',
  agg3: val('campo-agg3')||'Aggettivo 3',
  citazione: val('campo-citazione')||'...',
  aspetto: val('campo-aspetto')||'...',
  background: val('campo-background')||'...',
  hatsu: val('campo-hatsu')||'—',
  nen: val('campo-nen')||'0',
  tenacia: val('campo-tenacia')||'0',
  tecniche: tecniche,
  musica: val('campo-musica')||'',
  stat: stat, ovSt: [], apparizioni: apparizioni,
  campiExtra: campiExtra,
  baule: baule, competenze: competenze,
  slideExtraTipo: slideExtraTipo,
  slideExtraData: slideExtraData
 };
}

function raccogliListaTecnicaSlide(listaId) {
 var lista = document.getElementById(listaId);
 var out = [];
 if (!lista) return out;
 for (var i=0;i<lista.children.length;i++) {
  var nEl = document.getElementById(listaId+'-nome-'+i);
  var dEl = document.getElementById(listaId+'-desc-'+i);
  if (nEl && nEl.value.trim()) out.push({nome:nEl.value.trim(), desc:dEl?dEl.value.trim():''});
 }
 return out;
}

// ============================================================
// GENERA SCHEDA
// ============================================================
function generaScheda() {
 var mantieni = stato.palette === 'mantieni';
 var classeContenitore = mantieni ? '' : (stato.palette || 'scheda-darknight');
 var classeOriginale = mantieni ? (stato.classeOriginale || '') : '';
 var styleOriginale  = mantieni ? (stato.styleOriginale  || '') : '';
 var d = raccogliDati(stato.modalita === 'nuova');

 var htmlScheda, htmlAnteprima;
 if (mantieni && stato.schedaOriginale) {
  htmlScheda   = aggiornaHTMLSchedaNpc(d);
  htmlAnteprima = htmlScheda.replace(/\\n/g, '<br>').replace(/\n(?=<span)/g, '<br>');
 } else {
  htmlScheda    = costruisciHTMLSchedaNpc(d, classeContenitore, classeOriginale, styleOriginale);
  htmlAnteprima = htmlScheda.replace(/\\n/g, '<br>').replace(/\n(?=<span)/g, '<br>');
 }

 document.getElementById('anteprima-scheda').innerHTML = htmlAnteprima;
 document.getElementById('codice-html').textContent = htmlScheda;
 document.getElementById('sezione-output').style.display = 'block';
 document.getElementById('sezione-output').scrollIntoView({ behavior:'smooth' });
}

// ============================================================
// COPIA HTML
// ============================================================
function copiaHTML() {
 var codice = document.getElementById('codice-html').textContent;
 if (!codice||codice.length<10) { alert('Prima genera la scheda!'); return; }
 var textarea = document.createElement('textarea');
 textarea.value = codice;
 textarea.style.position = 'fixed';
 textarea.style.opacity = '0';
 document.body.appendChild(textarea);
 textarea.select();
 try { document.execCommand('copy'); alert('Codice copiato!'); }
 catch(e) { alert('Copia manualmente il codice.'); }
 document.body.removeChild(textarea);
}

// ============================================================
// IMPORTA SCHEDA (modalità modifica)
// ============================================================
function bbcodeToHtml(testo) {
 testo = testo.replace(/\[IMG\](.*?)\[\/IMG\]/gi, '<img src="$1">');
 testo = testo.replace(/\[URL=(.*?)\](.*?)\[\/URL\]/gi, '<a href="$1">$2</a>');
 testo = testo.replace(/\[URL\](.*?)\[\/URL\]/gi, '<a href="$1">$1</a>');
 return testo;
}

function importaScheda() {
 var htmlScheda = document.getElementById('campo-importa').value.trim();
 if (!htmlScheda) { alert('Incolla prima il codice HTML!'); return; }
 htmlScheda = bbcodeToHtml(htmlScheda);
 var temp = document.createElement('div');
 temp.innerHTML = htmlScheda;
 var metodo = 'getElements' + 'ByTagName';

 function setVal(id, val) { var e=document.getElementById(id); if(e&&val!==null&&val!==undefined&&val!=='') e.value=val; }
 function setSelect(id, val) {
  var e=document.getElementById(id); if(!e||!val) return; val=val.trim();
  for(var i=0;i<e.options.length;i++) { if(e.options[i].value===val||e.options[i].text===val){e.selectedIndex=i;return;} }
 }
 function setTextarea(id, val) { var e=document.getElementById(id); if(e&&val) e.value=val; }
 function setValHTML(id, val) { var e=document.getElementById(id); if(e&&val!==null&&val!==undefined&&val!=='') e.value=val; }
 function trovaEntryDopoLabel(spans, labelTesto) {
  for(var i=0;i<spans.length-1;i++) {
   if(spans[i].className==='scheda-label'&&spans[i].textContent.trim()===labelTesto) {
    if(spans[i+1].className==='scheda-entry') return spans[i+1].textContent.trim();
   }
  }
  return null;
 }

 var spans = temp[metodo]('span');
 var divs  = temp[metodo]('div');

 // Campi semplici
 var mappaLabel = { 'Nome:':'campo-nome','Cognome:':'campo-cognome','Genere:':'campo-genere','Mestiere:':'campo-mestiere' };
 for(var i=0;i<spans.length-1;i++) {
  var lbl=spans[i].textContent.trim();
  if(mappaLabel[lbl]&&spans[i+1].className==='scheda-entry') setValHTML(mappaLabel[lbl],spans[i+1]['inn'+'erHTML'].trim());
 }

 // Select standard
 var mappaSelect = {
  'Luogo di nascita:':'campo-luogo','Segno zodiacale:':'campo-segno',
  'Segno zodiacale cinese:':'campo-segnocinese','MBTI:':'campo-mbti','Allineamento:':'campo-allineamento'
 };
 for(var i=0;i<spans.length-1;i++) {
  var lbl=spans[i].textContent.trim();
  if(mappaSelect[lbl]&&spans[i+1].className==='scheda-entry') setSelect(mappaSelect[lbl],spans[i+1].textContent.trim());
 }

 // Razza, specie, fedina, taglia, classe
 for(var i=0;i<spans.length-1;i++) {
  if(spans[i].className!=='scheda-label') continue;
  var lbl2=spans[i].textContent.trim();
  var val2=spans[i+1].className==='scheda-entry'?spans[i+1].textContent.trim():null;
  if(!val2) continue;
  if(lbl2==='Razza:')                  setSelect('campo-razza',val2);
  if(lbl2==='Specie:')                 setSelect('campo-specie',val2);
  if(lbl2==='Fedina Penale:')          setSelect('campo-fedina',val2);
  if(lbl2==='Classificazione Taglia:') setSelect('campo-classtaglia',val2);
  if(lbl2==='Valore Taglia:')          setVal('campo-valtaglia',val2.replace(/\./g,'').replace(/[^\d]/g,''));
  if(lbl2==='Classe:')                 setSelect('campo-classe',val2);
 }
 aggiornaRazza(false);

 // Data di nascita
 var dataRaw = trovaEntryDopoLabel(spans,'Data di nascita:');
 if(dataRaw&&dataRaw!=='—') {
  var mesiNomi=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  var parti=dataRaw.split(' ');
  if(parti.length===3){setSelect('campo-datanascita-g',parti[0]);setSelect('campo-datanascita-m',parti[1]);setSelect('campo-datanascita-a',parti[2]);}
  else if(parti.length===2){var pm=mesiNomi.indexOf(parti[0])!==-1;if(pm){setSelect('campo-datanascita-m',parti[0]);setSelect('campo-datanascita-a',parti[1]);}else{setSelect('campo-datanascita-g',parti[0]);setSelect('campo-datanascita-m',parti[1]);}}
  else if(parti.length===1){if(mesiNomi.indexOf(parti[0])!==-1)setSelect('campo-datanascita-m',parti[0]);else setSelect('campo-datanascita-a',parti[0]);}
 }

 // Classe, Status, Livello da dati-pg
 for(var i=0;i<divs.length;i++) {
  if(divs[i].className==='dati-pg') {
   var testo=divs[i].textContent; var parti=testo.split('|');
   for(var p=0;p<parti.length;p++){var coppia=parti[p].trim().split(':');if(coppia.length>=2){var chiave=coppia[0].trim();var valore=coppia.slice(1).join(':').trim();if(chiave==='Classe')setSelect('campo-classe',valore);if(chiave==='Status')setSelect('campo-status',valore);if(chiave==='Livello')setVal('campo-livello',valore);}}
   break;
  }
 }

 // EXP
 for(var i=0;i<spans.length;i++){if(spans[i].className==='dati-pg2'){var t=spans[i].textContent.trim();if(t.indexOf('/')!==-1&&t.indexOf('For')!==-1){var ep=t.replace('For Level Up!','').trim().split('/');if(ep.length===2)setVal('campo-exp',ep[0].replace(/[^\d]/g,'').trim());}}}

 // Jenny e HC
 var soldiRaw=trovaEntryDopoLabel(spans,'Soldi:');
 if(soldiRaw){var sp2=soldiRaw.split('/');if(sp2.length>=2){setVal('campo-jenny',sp2[0].replace('Jenny','').replace(/\./g,'').replace(/[^\d]/g,'').trim());setVal('campo-hc',sp2[1].replace('HC','').replace(/[^\d]/g,'').trim());}}

 // Aggettivi
 var aggTrovati=[];
 for(var i=0;i<spans.length;i++){if(spans[i].className==='aggettivo')aggTrovati.push(spans[i]['inn'+'erHTML'].trim());}
 if(aggTrovati[0])setValHTML('campo-agg1',aggTrovati[0]);
 if(aggTrovati[1])setValHTML('campo-agg2',aggTrovati[1]);
 if(aggTrovati[2])setValHTML('campo-agg3',aggTrovati[2]);

 // Citazione
 for(var i=0;i<divs.length;i++){if(divs[i].className==='info-citazione'){var cs=divs[i][metodo]('span');if(cs.length>0)setValHTML('campo-citazione',cs[0]['inn'+'erHTML'].trim());else setValHTML('campo-citazione',divs[i]['inn'+'erHTML'].trim());break;}}

 // Descrizione e Background
 for(var i=0;i<spans.length-1;i++){if(spans[i].className==='scheda-label'){var lbl=spans[i].textContent.trim();if(lbl==='Descrizione:'&&spans[i+1].className==='scheda-entry')setTextarea('campo-aspetto',spans[i+1]['inn'+'erHTML'].trim());if(lbl==='Background:'&&spans[i+1].className==='scheda-entry')setTextarea('campo-background',spans[i+1]['inn'+'erHTML'].trim());}}

 // Statistiche
 var mapStat={'Forza':'forza','Resistenza':'resistenza','Velocità':'velocita','Riflessi':'riflessi','Destrezza':'destrezza','Mira':'mira','Intelligenza':'intelligenza','Carisma':'carisma','Istinto':'istinto','Fortuna':'fortuna','Vita':'vita','Aura':'aura'};
 for(var i=0;i<divs.length;i++){var cn=divs[i].className;if(cn==='stat-card'||cn==='stat-card-vitale'){var le2=divs[i].querySelector?divs[i].querySelector('.stat-label'):null;var ve=divs[i].querySelector?divs[i].querySelector('.stat-value'):null;if(le2&&ve){var sid=mapStat[le2.textContent.trim()];if(sid){var inp=document.getElementById('stat-'+sid);if(inp)inp.value=ve.textContent.trim().replace(/\./g,'').replace(/,/g,'');}}}}

 // Hatsu
 for(var i=0;i<divs.length;i++){if(divs[i].className==='hatsu-card'){var ve2=divs[i].querySelector?divs[i].querySelector('.hatsu-card-value'):null;if(ve2)setSelect('campo-hatsu',ve2.textContent.trim());break;}}

 // Nen e Tenacia
 for(var i=0;i<divs.length;i++){if(divs[i].className==='barra-card'){var lb2=divs[i].querySelector?divs[i].querySelector('.barra-card-label'):null;var pe=divs[i].querySelector?divs[i].querySelector('.barra-card-pct'):null;if(lb2&&pe){var nome=lb2.textContent.trim();var valore=pe.textContent.replace('%','').trim();if(nome==='Nen')setVal('campo-nen',valore);if(nome==='Tenacia')setVal('campo-tenacia',valore);}}}

 // Tecniche
 for(var i=0;i<divs.length;i++){if(divs[i].className==='poteri-box'){var ps=divs[i][metodo]('span');for(var j=0;j<ps.length-1;j++){if(ps[j].className==='scheda-label'&&ps[j+1].className==='scheda-entry'){var nomeT=ps[j].textContent.replace(':','').trim();var descT=ps[j+1]['inn'+'erHTML'].trim();if(nomeT&&nomeT!=='—'){aggiungiTecnica();var tIdx=document.getElementById('lista-tecniche').children.length-1;setVal('tecnica-nome-'+tIdx,nomeT);setTextarea('tecnica-desc-'+tIdx,descT);}}}break;}}

 // Apparizioni (ex quest)
 for(var i=0;i<spans.length;i++){if(spans[i].className==='scheda-label'&&(spans[i].textContent.trim()==='Apparizioni:'||spans[i].textContent.trim()==='Quest:')){for(var j=i+1;j<spans.length;j++){if(spans[j].className!=='scheda-entry')break;var anchors=spans[j][metodo]('a');for(var a=0;a<anchors.length;a++){aggiungiApparizione();var qIdx=document.getElementById('lista-apparizioni').children.length-1;setVal('apparizione-nome-'+qIdx,anchors[a].textContent.trim());setVal('apparizione-link-'+qIdx,anchors[a].getAttribute('href')||'');}}break;}}

 // Baule
 var catMap=['armi','equip','oggetti','materiali'];var catTitoli=['Armi','Equipaggiamento','Oggetti Extra','Materiali'];
 for(var i=0;i<divs.length;i++){if(divs[i].className==='equip-box'){var titleEl=divs[i].querySelector?divs[i].querySelector('.equip-box-title'):null;if(!titleEl)continue;var titolo=titleEl.textContent.trim();var catIdx=catTitoli.indexOf(titolo);if(catIdx===-1)continue;var catId=catMap[catIdx];var items=divs[i][metodo]('li');for(var li=0;li<items.length;li++){var nameEl=items[li].querySelector?items[li].querySelector('.equip-item-name'):null;var infoEl=items[li].querySelector?items[li].querySelector('.equip-item-info'):null;if(!nameEl)continue;aggiungiItem(catId);var bIdx=document.getElementById('lista-'+catId).children.length-1;setVal(catId+'-nome-'+bIdx,nameEl.textContent.trim());if(infoEl){var infoTesto=infoEl.textContent;var qtMatch=infoTesto.match(/Qt:\s*(\S+)/);if(qtMatch)setVal(catId+'-qt-'+bIdx,qtMatch[1]);var lvMatch=infoTesto.match(/Lv\.\s*(\S+)/);if(lvMatch&&catId!=='oggetti'&&catId!=='materiali'){var lvVal=parseInt(lvMatch[1])||0;if(lvVal>5)lvVal=5;setVal(catId+'-lv-'+bIdx,lvVal);}var usiMatch=infoTesto.match(/Usi:\s*(\S+)/);if(usiMatch&&catId==='oggetti')setVal(catId+'-usi-'+bIdx,usiMatch[1]);var expAnchor=infoEl.querySelector?infoEl.querySelector('a'):null;if(expAnchor){setVal(catId+'-exp-nome-'+bIdx,expAnchor.textContent.trim());setVal(catId+'-exp-link-'+bIdx,expAnchor.getAttribute('href')||'');}}}}}

 // Immagini
 var divLat=temp['querySelector']('.scheda-img');if(divLat){var iL=divLat['querySelector']('img');if(iL)setVal('campo-img-laterale',iL.getAttribute('src')||'');}
 var divDati=temp['querySelector']('.img-dati');if(divDati){var iD=divDati['querySelector']('img');if(iD)setVal('campo-img-dati',iD.getAttribute('src')||'');}

 // Musica
 var iframes=temp[metodo]('iframe');for(var i=0;i<iframes.length;i++){var src=iframes[i].getAttribute('src')||'';var match=src.match(/embed\/([^?&]+)/);if(match){setVal('campo-musica',match[1]);break;}}

 var radice=temp.firstElementChild;
 stato.schedaOriginale=radice;
 if(radice){stato.classeOriginale=radice.getAttribute('class')||'';stato.styleOriginale=radice.getAttribute('style')||'';}
 document.getElementById('campo-importa').value='';
 alert('Dati importati! Controlla i campi e poi genera la scheda.');
}
