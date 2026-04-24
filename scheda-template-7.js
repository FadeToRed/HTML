// AGGIORNA HTML SCHEDA (modalità "Mantieni attuale") 
// Lavora sul DOM dell'originale importato: aggiorna solo i valori 
// noti lasciando intatti tutti gli style/class inline dell'utente. 
// ============================================================ 
function aggiornaHTMLScheda(d) { 
 // Clona il DOM originale per non alterare stato.schedaOriginale 
 var root = stato.schedaOriginale.cloneNode(true); 
 var metodo = 'getElements' + 'ByTagName'; 
 
 // ── Helper ───────────────────────────────────────────────── 
 function qs(sel)  { return root.querySelector ? root.querySelector(sel) : null; } 
 function qsa(sel) { return root.querySelectorAll ? root.querySelectorAll(sel) : []; } 
 // Aggiorna il contenuto di uno span.scheda-entry dopo uno span.scheda-label 
 // Usa innerHTML per supportare tag HTML inline (es. <del>, <b>, <i>...) 
 function setEntry(labelTesto, nuovoValore) { 
  var spans = root[metodo]('span'); 
  for (var i = 0; i < spans.length - 1; i++) { 
   if (spans[i].className === 'scheda-label' && spans[i].textContent.trim() === labelTesto) { 
    if (spans[i+1].className === 'scheda-entry') { 
     spans[i+1]['inn'+'erHTML'] = nuovoValore; 
     return; 
    } 
   } 
  } 
 } 
 // Aggiorna innerHTML di un elemento trovato con querySelector 
 function setText(sel, val) { var el = qs(sel); if (el) el['inn'+'erHTML'] = val; } 
 // Aggiorna src di un img dentro un contenitore trovato con querySelector 
 function setImg(containerSel, src) { 
  var c = qs(containerSel); 
  if (!c) return; 
  var imgs = c[metodo]('img'); 
  if (imgs.length > 0) imgs[0].setAttribute('src', src); 
 } 
 
 // ── Nome / Cognome nel titolo ─────────────────────────────── 
 setText('.nomecognome', d.nomecognome); 
 
 // ── Immagini ─────────────────────────────────────────────── 
 setImg('.scheda-img',   d.imgLaterale); 
 setImg('.img-dati',   d.imgDati); 
 if (d.imgInfoModo === '2') { 
  var boxInfo = root.querySelector ? root['querySelector']('.img-info2') : null; 
  if (!boxInfo) { 
   var boxInfo1 = root.querySelector ? root['querySelector']('.img-info') : null; 
   if (boxInfo1) { boxInfo1.className = 'img-info2'; } 
   boxInfo = root.querySelector ? root['querySelector']('.img-info2') : null; 
  } 
  if (boxInfo) boxInfo['inn'+'erHTML'] = '<img src="'+d.imgInfoA+'"><br><img src="'+d.imgInfoB+'">'; 
 } else { 
  var boxInfo1b = root.querySelector ? root['querySelector']('.img-info,.img-info2') : null; 
  if (boxInfo1b) { boxInfo1b.className = 'img-info'; boxInfo1b['inn'+'erHTML'] = '<img src="'+d.imgInfo+'">'; } 
 } 
 
 // ── Musica ───────────────────────────────────────────────── 
 var btn = qs('.custom-player'); 
 var iframes = root[metodo]('iframe'); 
 if (d.musica) { 
  var nuovoSrc = d.musicaPiattaforma === 'soundcloud'
   ? 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + d.musica
   : 'https://www.youtube.com/embed/' + d.musica + '?enablejsapi=1';
  if (iframes.length > 0) { 
   iframes[0].setAttribute('src', nuovoSrc); 
  } else { 
   // Non c'era musica: aggiunge il bottone e l'iframe nel container nomecognome 
   var nc = qs('.container-nomecognome'); 
   if (nc) { 
    var newBtn = document.createElement('button'); 
    newBtn.className = 'custom-player'; 
    newBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>'; 
    var newIframe = document.createElement('iframe'); 
    newIframe.setAttribute('style','display:none;'); 
    newIframe.setAttribute('src', nuovoSrc); 
    newIframe.setAttribute('frameborder','0'); 
    newIframe.setAttribute('allow','autoplay; encrypted-media'); 
    nc.insertBefore(newIframe, nc.firstChild); 
    nc.insertBefore(newBtn,    nc.firstChild); 
   } 
  } 
 } else { 
  // Rimuove musica se vuota 
  if (btn && btn.parentNode) btn.parentNode.removeChild(btn); 
  if (iframes.length > 0 && iframes[0].parentNode) iframes[0].parentNode.removeChild(iframes[0]); 
 } 
 
 // ── Riga dati-pg (Classe / Status / Livello) ─────────────── 
 var datiPg = qs('.dati-pg'); 
 if (datiPg) { 
  datiPg.innerHTML = '<span>Classe:</span> <span>'+(d.classe !== '—' ? d.classe : 'N/D')+'</span> | <span>Status:</span> <span>'+d.status+'</span> | <span>Livello:</span> <span>'+d.livello+'</span>'; 
 } 
 
 // ── Barra EXP ────────────────────────────────────────────── 
 var expPct = Math.round((parseInt(d.exp) / parseInt(d.exptot)) * 100) || 0; 
 var barraExp = qs('.barra-exp'); 
 if (barraExp) barraExp.style.width = expPct + '%'; 
 var datiPg2 = root[metodo]('span'); 
 for (var i = 0; i < datiPg2.length; i++) { 
  if (datiPg2[i].className === 'dati-pg2' && datiPg2[i].textContent.indexOf('For Level Up') !== -1) { 
   datiPg2[i].innerHTML = '<b>'+d.exp+'/'+d.exptot+'</b> For Level Up!'; 
   break; 
  } 
 } 
 
 // ── Dati personali (scheda-entry dopo scheda-label) ───────── 
 setEntry('Nome:',                  d.nome); 
 setEntry('Cognome:',               d.cognome); 
 setEntry('Genere:',                d.genere); 
 setEntry('Razza:',                 d.razza); 
 if (d.specie)         setEntry('Specie:',                 d.specie); 
 if (d.rank && d.rank !== '—') setEntry('Rank di Pericolosità:', d.rank); 
 if (d.conservazione && d.conservazione !== '—') setEntry('Stato di Conservazione:', d.conservazione); 
 setEntry('Luogo di nascita:',      d.luogo); 
 setEntry('Data di nascita:',       d.datanascita); 
 setEntry('Segno zodiacale:',       d.segno); 
 setEntry('Segno zodiacale cinese:',d.segnocinese); 
 setEntry('MBTI:',                  d.mbti); 
 setEntry('Allineamento:',          d.allineamento); 
 setEntry('Mestiere:',              d.mestiere); 
 setEntry('Fedina Penale:',         d.fedina); 
 if (d.fedina === 'Ricercato') { 
  setEntry('Classificazione Taglia:', d.classTaglia); 
  setEntry('Valore Taglia:',          d.valTaglia + ' Jenny'); 
 } 
 setEntry('Soldi:', d.jenny.toLocaleString() + ' Jenny / ' + d.hc + ' HC'); 
 
 // ── Quest ─────────────────────────────────────────────────── 
 // Rimuove tutti gli span.scheda-entry delle quest esistenti 
 var allSpans = root[metodo]('span'); 
 var questLabelIdx = -1; 
 for (var i = 0; i < allSpans.length; i++) { 
  if (allSpans[i].className === 'scheda-label' && allSpans[i].textContent.trim() === 'Quest:') { 
   questLabelIdx = i; break; 
  } 
 } 
 if (questLabelIdx !== -1) { 
  var questLabel = allSpans[questLabelIdx]; 
  var parent = questLabel.parentNode; 
  // Rimuove i nodi (span.scheda-entry + eventuali nodi testo \n) dopo il label 
  var toRemove = []; 
  var node = questLabel.nextSibling; 
  while (node) { 
   var next = node.nextSibling; 
   if (node.nodeType === 1 && node.className === 'scheda-entry') toRemove.push(node); 
   else if (node.nodeType === 3) toRemove.push(node); // nodo testo (\n) 
   else break; 
   node = next; 
  } 
  for (var r = 0; r < toRemove.length; r++) parent.removeChild(toRemove[r]); 
  // Inserisce le quest aggiornate 
  if (d.quest.length > 0) { 
   var ref = questLabel.nextSibling; 
   for (var q = 0; q < d.quest.length; q++) { 
    var sp = document.createElement('span'); 
    sp.className = 'scheda-entry'; 
    sp.innerHTML = '- <a href="'+d.quest[q].link+'">'+(d.quest[q].nome||'Link quest')+'</a>'; 
    parent.insertBefore(sp, ref); 
    var tn = document.createTextNode('\n'); 
    parent.insertBefore(tn, ref); 
   } 
  } else { 
   var sp = document.createElement('span'); 
   sp.className = 'scheda-entry'; 
   sp.textContent = '—'; 
   parent.insertBefore(sp, questLabel.nextSibling); 
  } 
 } 
 
 // ── Aggettivi ─────────────────────────────────────────────── 
 var aggs = qsa('.aggettivo'); 
 if (aggs[0]) aggs[0].textContent = d.agg1; 
 if (aggs[1]) aggs[1].textContent = d.agg2; 
 if (aggs[2]) aggs[2].textContent = d.agg3; 
 
 // ── Citazione ─────────────────────────────────────────────── 
 var citDiv = qs('.info-citazione'); 
 if (citDiv) { 
  var citSpan = citDiv[metodo]('span'); 
  if (citSpan.length > 0) citSpan[0].textContent = d.citazione; 
  else citDiv.textContent = d.citazione; 
 } 
 
 // ── Descrizione / Background ─────────────────────────────── 
 setEntry('Descrizione:',    d.aspetto); 
 setEntry('Background:', d.background); 
 
 // ── Statistiche (.stat-card e .stat-card-vitale) ──────────── 
 var mapStat = { 
  'Forza':'forza','Resistenza':'resistenza','Velocità':'velocita', 
  'Riflessi':'riflessi','Destrezza':'destrezza','Mira':'mira', 
  'Intelligenza':'intelligenza','Carisma':'carisma','Istinto':'istinto', 
  'Fortuna':'fortuna','Vita':'vita','Aura':'aura' 
 }; 
 var statCards = root[metodo]('div'); 
 for (var i = 0; i < statCards.length; i++) { 
  var cn = statCards[i].className; 
  if (cn === 'stat-card' || cn === 'stat-card-vitale') { 
   var lbl = statCards[i].querySelector ? statCards[i].querySelector('.stat-label') : null; 
   var val = statCards[i].querySelector ? statCards[i].querySelector('.stat-value') : null; 
   if (lbl && val) { 
    var sid = mapStat[lbl.textContent.trim().replace(' over','')]; 
    if (sid) { 
     var newVal = sid === 'vita' || sid === 'aura' 
      ? parseInt(d.stat[sid]).toLocaleString() 
      : d.stat[sid]; 
     val.textContent = newVal; 
     // gestione classe over sul label 
     var isOver = d.ovSt && d.ovSt.indexOf(sid) !== -1; 
     lbl.className = 'stat-label' + (isOver ? ' over' : ''); 
    } 
   } 
  } 
 } 
 
 // ── Competenze ────────────────────────────────────────────── 
 var compGrid = qs('.competenze-grid'); 
 if (compGrid) { 
  var ls2 = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
  var nuovoComp = ''; 
  for (var t = 0; t < 5; t++) { 
   var comp = d.competenze[t]; 
   if (comp && comp.sbloccato) { 
    nuovoComp += '<div class="competenza-card"><div class="competenza-header"><span class="competenza-nome">'+comp.nome+'</span><span class="competenza-livello">Lv. '+(comp.lv||'1')+'</span></div><div class="competenza-desc">'+comp.desc+'</div><div class="competenza-oggetto"><span class="competenza-oggetto-label">Oggetto:</span> '+(comp.oggetto||'—')+'</div></div>'; 
   } else { 
    nuovoComp += '<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-lock"></i> Slot bloccato — sbloccabile al Lv. '+SBLOCCO_COMPETENZE[t]+'</div></div>'; 
   } 
  } 
  compGrid.innerHTML = nuovoComp; 
 } 
 
 // ── Hatsu / Nen / Tenacia ─────────────────────────────────── 
 setText('.hatsu-card-value', d.hatsu || '—'); 
 var barreCards = root[metodo]('div'); 
 for (var i = 0; i < barreCards.length; i++) { 
  if (barreCards[i].className === 'barra-card') { 
   var lblEl = barreCards[i].querySelector ? barreCards[i].querySelector('.barra-card-label') : null; 
   var pctEl = barreCards[i].querySelector ? barreCards[i].querySelector('.barra-card-pct') : null; 
   var barEl = barreCards[i].querySelector ? barreCards[i].querySelector('.bc-barra') : null; 
   if (lblEl && pctEl) { 
    var nome = lblEl.textContent.trim(); 
    var pct = nome === 'Nen' ? d.nen : (nome === 'Tenacia' ? d.tenacia : null); 
    if (pct !== null) { 
     pctEl.textContent = pct + '%'; 
     if (barEl) barEl.style.width = pct + '%'; 
    } 
   } 
  } 
 } 
 
 // ── Tecniche Hatsu ────────────────────────────────────────── 
 var potieriBox = qs('.poteri-box'); 
 if (potieriBox) { 
  var nuovoPoteri = ''; 
  if (d.tecniche && d.tecniche.length > 0) { 
   for (var ti = 0; ti < d.tecniche.length; ti++) { 
    nuovoPoteri += '<span class="scheda-label">'+d.tecniche[ti].nome+':</span> <span class="scheda-entry">'+(d.tecniche[ti].desc||'—')+'</span>\n\n'; 
   } 
  } else { 
   nuovoPoteri = '<span class="scheda-entry">—</span>'; 
  } 
  potieriBox.innerHTML = nuovoPoteri; 
 } 
 
 // ── Baule ─────────────────────────────────────────────────── 
 var catMap    = ['armi','equip','oggetti','materiali']; 
 var catTitoli = ['Armi','Equipaggiamento','Oggetti Extra','Materiali']; 
 var equipBoxes = root[metodo]('div'); 
 for (var i = 0; i < equipBoxes.length; i++) { 
  if (equipBoxes[i].className === 'equip-box') { 
   var titleEl = equipBoxes[i].querySelector ? equipBoxes[i].querySelector('.equip-box-title') : null; 
   if (!titleEl) continue; 
   var catIdx = catTitoli.indexOf(titleEl.textContent.trim()); 
   if (catIdx === -1) continue; 
   var catId = catMap[catIdx]; 
   var tipo  = catId; 
   var items = d.baule[catId]; 
   var nuovoLi = ''; 
   if (items && items.length > 0) { 
    for (var x = 0; x < items.length; x++) { 
     var itm = items[x]; 
     var expNome = itm.expNome || ''; 
     var expLink = itm.expLink || ''; 
     var expTag  = expLink ? '<a href="'+expLink+'">'+expNome+'</a>' : expNome; 
     var hasExp  = !!(expNome || expLink); 
     var info = 'Qt: '+(itm.qt||'1'); 
     if (tipo==='armi'||tipo==='equip') info += ' · Lv. '+(itm.lv||'0') + (hasExp ? ' · Espansione: '+expTag : ''); 
     if (tipo==='oggetti')              info += ' · Usi: '+(itm.usi||'0/1') + (hasExp ? ' · Espansione: '+expTag : ''); 
     if (tipo==='materiali' && hasExp)  info += ' · Espansione: '+expTag; 
     var descHtml = itm.desc ? '<div class="equip-item-desc">'+itm.desc+'</div>' : '';
     nuovoLi += '<li><span class="equip-item-name">'+itm.nome+'</span> <span class="equip-item-info">'+info+'</span>'+descHtml+'</li>'; 
    } 
   } 
   var bodyEl = equipBoxes[i].querySelector ? equipBoxes[i].querySelector('.equip-box-body') : null; 
   if (bodyEl) bodyEl.innerHTML = '<ul>'+nuovoLi+'</ul>'; 
  } 
 } 
 
 // Restituisce l'HTML serializzato del DOM aggiornato 
 return root.outerHTML; 
} 
 
// ============================================================ 
// GENERA SCHEDA 
// ============================================================ 
function generaScheda() { 
 var isNuova = stato.modalita === 'nuova'; 
 // Validazione punti extra per schede nuove 
 if (isNuova) { 
  var rimasti = aggiornaContatoreExtra(); 
  if (rimasti > 0) { 
   alert('Devi ancora distribuire ' + rimasti + ' punti extra nelle statistiche!'); 
   return; 
  } 
 } 
 var mantieni = stato.palette === 'mantieni'; 
 var classeContenitore = mantieni ? '' : (stato.palette || 'scheda-darknight'); 
 var classeOriginale = mantieni ? (stato.classeOriginale || '') : ''; 
 var styleOriginale  = mantieni ? (stato.styleOriginale  || '') : ''; 
 var d = raccogliDati(isNuova); 
 
 var htmlScheda, htmlAnteprima; 
 if (mantieni && stato.schedaOriginale) { 
  // Modalità mantieni: aggiorna chirurgicamente il DOM originale 
  htmlScheda = aggiornaHTMLScheda(d); 
  // Per l'anteprima sostituisce \n con <br> 
  htmlAnteprima = htmlScheda.replace(/\\n/g, '<br>').replace(/\n(?=<span)/g, '<br>'); 
 } else { 
  htmlScheda    = costruisciHTMLScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale); 
  htmlAnteprima = costruisciHTMLAnteprimaScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale); 
 } 
 
 document.getElementById('anteprima-scheda').innerHTML = htmlAnteprima; 
 document.getElementById('codice-html').textContent = htmlScheda; 
 document.getElementById('sezione-output').style.display = 'block'; 
 document.getElementById('sezione-output').scrollIntoView({ behavior:'smooth' }); 
} 
 
// ============================================================ 
// HTML SCHEDA 
// ============================================================ 
function costruisciHTMLScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale) { 
 var expPct = Math.round((parseInt(d.exp) / parseInt(d.exptot)) * 100) || 0; 
 // Costruisce l'attributo del div radice: 
 // - se classeOriginale è valorizzato (modalità mantieni), usa quello + eventuale style originale 
 // - altrimenti usa classeContenitore normale 
 var divApri; 
 if (classeOriginale) { 
  divApri = '<div class="' + classeOriginale + '"' + (styleOriginale ? ' style="' + styleOriginale + '"' : '') + '>'; 
 } else if (classeContenitore) { 
  divApri = '<div class="' + classeContenitore + '">'; 
 } else { 
  divApri = '<div>'; 
 } 
 
 var ls = ['forza','resistenza','velocita','riflessi','destrezza','mira','intelligenza','carisma','istinto','fortuna']; 
 var nomiStat = ['Forza','Resistenza','Velocità','Riflessi','Destrezza','Mira','Intelligenza','Carisma','Istinto','Fortuna']; 
 
 var htmlStats = ''; 
 for (var i=0;i<ls.length;i++) { 
  var isOver = d.ovSt && d.ovSt.indexOf(ls[i])!==-1; 
  htmlStats += '<div class="stat-card"><span class="stat-label' + (isOver?' over':'') + '">' + nomiStat[i] + '</span><span class="stat-value">' + d.stat[ls[i]] + '</span></div>'; 
 } 
 
 var htmlComp = ''; 
 if (isNuova) { 
  for (var s=0;s<5;s++) htmlComp += '<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-lock"></i> Slot bloccato — sbloccabile al Lv. '+SBLOCCO_COMPETENZE[s]+'</div></div>'; 
 } else { 
  for (var t=0;t<5;t++) { 
   var comp=d.competenze[t]; 
   if (comp&&comp.sbloccato) { 
    htmlComp += '<div class="competenza-card"><div class="competenza-header"><span class="competenza-nome">'+comp.nome+'</span><span class="competenza-livello">Lv. '+(comp.lv||'1')+'</span></div><div class="competenza-desc">'+comp.desc+'</div><div class="competenza-oggetto"><span class="competenza-oggetto-label">Oggetto:</span> '+(comp.oggetto||'—')+'</div></div>'; 
   } else { 
    htmlComp += '<div class="competenza-card bloccata"><div class="competenza-bloccata-label"><i class="fa-solid fa-lock"></i> Slot bloccato — sbloccabile al Lv. '+SBLOCCO_COMPETENZE[t]+'</div></div>'; 
   } 
  } 
 } 
 
 var htmlQuest = ''; 
 if (!isNuova && d.quest.length > 0) { 
  for (var q=0;q<d.quest.length;q++) { 
   htmlQuest += '<span class="scheda-entry">- <a href="'+d.quest[q].link+'">'+(d.quest[q].nome||'Link quest')+'</a></span>\n'; 
  } 
 } 
 
 function htmlBauleCategoria(titolo, items, tipo) { 
  var li = ''; 
  if (items&&items.length>0) { 
   for (var x=0;x<items.length;x++) { 
    var itm=items[x]; 
    var expNome = itm.expNome || ''; 
    var expLink = itm.expLink || ''; 
    var expTag = expLink ? '<a href="'+expLink+'">'+expNome+'</a>' : expNome; 
    var hasExp = !!(expNome || expLink); 
    var info='Qt: '+(itm.qt||'1'); 
    if (tipo==='armi'||tipo==='equip') info+=' · Lv. '+(itm.lv||'0') + (hasExp ? ' · Espansione: '+expTag : ''); 
    if (tipo==='oggetti') info+=' · Usi: '+(itm.usi||'0/1') + (hasExp ? ' · Espansione: '+expTag : ''); 
    if (tipo==='materiali' && hasExp) info+=' · Espansione: '+expTag; 
    var descHtml = itm.desc ? '<div class="equip-item-desc">'+itm.desc+'</div>' : '';
    li+='<li><span class="equip-item-name">'+itm.nome+'</span> <span class="equip-item-info">'+info+'</span>'+descHtml+'</li>'; 
   } 
  } 
  return '<div class="equip-box"><div class="equip-box-header"><span class="equip-box-title">'+titolo+'</span></div><div class="equip-box-body"><ul>'+li+'</ul></div></div>'; 
 } 
 
var htmlNen = '';
 if (isNuova) {
  // Scheda nuova: invariato
  htmlNen =
   '<div class="hatsu-card"><div><span class="hatsu-card-label">Hatsu</span><span class="hatsu-card-value">Non ancora sbloccato</span></div><i class="mdi mdi-fire hatsu-card-icon"></i></div>' +
   '<div class="barre-row">' +
   '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Nen</span><span class="barra-card-pct">'+NEN_INIZIALE+'%</span></div><div class="bc-container"><div class="bc-barra bc-nen barra-pg" style="width:'+NEN_INIZIALE+'%;"></div></div></div>' +
   '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Tenacia</span><span class="barra-card-pct">'+TENACIA_INIZIALE+'%</span></div><div class="bc-container"><div class="bc-barra bc-tenacia barra-pg" style="width:'+TENACIA_INIZIALE+'%;"></div></div></div>' +
   '</div>' +
   '<div class="titolo-poteri-box">POTERE NEN</div>' +
   '<div class="poteri-box"><span class="scheda-entry">—</span></div>';
 } else {
  // Helper: genera HTML di una card (profilo o tecnica)
  function htmlNenCard(titolo, campi) {
   var s = '<div class="nen-card"><span class="nen-card-title">'+titolo+'</span><br>';
   for (var ci=0;ci<campi.length;ci++) {
    s += '<span class="scheda-label">'+campi[ci].label+'</span> <span class="scheda-entry">'+campi[ci].val+'</span><br>';
   }
   s += '</div>';
   return s;
  }
 
  // Box 1: Potere Nen
  var htmlBox1 = '<div class="nen-box">' +
   '<div class="nen-box-header"><span class="nen-box-title">'+(d.hatsu||'—')+'</span></div>' +
   '<div class="nen-box-body">';
  if (d.nenPotere) {
   htmlBox1 +=
    '<span class="scheda-label">Nome potere:</span> <span class="scheda-entry">'+(d.nenPotere.nomepotere||'—')+'</span><br>' +
    '<span class="scheda-label">Descrizione:</span> <span class="scheda-entry">'+(d.nenPotere.descrizione||'—')+'</span><br>' +
    '<span class="scheda-label">Funzionamento e regole:</span> <span class="scheda-entry">'+(d.nenPotere.funzionamento||'—')+'</span><br>' +
    '<span class="scheda-label">Condizioni e restrizioni:</span> <span class="scheda-entry">'+(d.nenPotere.condizioni||'—')+'</span>';
  } else {
   htmlBox1 += '<span class="scheda-entry">—</span>';
  }
  htmlBox1 += '</div></div>';
 
  // Immagine nen
  var htmlNenImg = d.nenImg ? '<img class="nen-img" src="'+d.nenImg+'">' : '';
 
  // Box 2: Profili (omesso in Speed Duel)
  var htmlBox2 = '';
  if (d.nenModo !== 'speedduel') {
   htmlBox2 = '<div class="nen-box">' +
    '<div class="nen-box-header"><span class="nen-box-title">Profili</span></div>' +
    '<div class="nen-box-body">';
   if (d.profili && d.profili.length > 0) {
    for (var pi=0;pi<d.profili.length;pi++) {
     var pr = d.profili[pi];
     htmlBox2 += htmlNenCard('Profilo '+(pi+1)+' \u2014 '+pr.nome, [
      {label:'Descrizione:', val: pr.desc},
      {label:'Bonus:', val: pr.bonus},
      {label:'Condizioni e/o Restrizioni e/o Malus:', val: pr.malus},
      {label:'Costo per Fase:', val: pr.costo}
     ]);
    }
   } else {
    htmlBox2 += '<span class="scheda-entry">—</span>';
   }
   htmlBox2 += '</div></div>';
  }
 
  // Helper box tecniche
  function htmlBoxTecniche(titolo, tecniche) {
   var s = '<div class="nen-box">' +
    '<div class="nen-box-header"><span class="nen-box-title">'+titolo+'</span></div>' +
    '<div class="nen-box-body">';
   if (tecniche && tecniche.length > 0) {
    for (var ti2=0;ti2<tecniche.length;ti2++) {
     var tc = tecniche[ti2];
     s += htmlNenCard(tc.nome, [
      {label:'Descrizione:', val: tc.desc},
      {label:'Bonus:', val: tc.bonus},
      {label:'Condizioni e/o Restrizioni e/o Malus:', val: tc.malus},
      {label:'Costo per Fase:', val: tc.costo}
     ]);
    }
   } else {
    s += '<span class="scheda-entry">—</span>';
   }
   s += '</div></div>';
   return s;
  }
 
  htmlNen =
   '<div class="hatsu-card"><div><span class="hatsu-card-label">Hatsu</span><span class="hatsu-card-value">'+(d.hatsu||'—')+'</span></div><i class="mdi mdi-fire hatsu-card-icon"></i></div>' +
   '<div class="barre-row">' +
   '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Nen</span><span class="barra-card-pct">'+d.nen+'%</span></div><div class="bc-container"><div class="bc-barra bc-nen barra-pg" style="width:'+d.nen+'%;"></div></div></div>' +
   '<div class="barra-card"><div class="barra-card-header"><span class="barra-card-label">Tenacia</span><span class="barra-card-pct">'+d.tenacia+'%</span></div><div class="bc-container"><div class="bc-barra bc-tenacia barra-pg" style="width:'+d.tenacia+'%;"></div></div></div>' +
   '</div>' +
   '<div class="titolo-poteri-box">POTERE NEN</div>' +
   '<div class="poteri-box">' +
   htmlBox1 +
   htmlNenImg +
   htmlBox2 +
   htmlBoxTecniche('Tecniche 25%', d.tecniche25) +
   htmlBoxTecniche('Tecniche 50%', d.tecniche50) +
   htmlBoxTecniche('Tecnica Finale 100%', d.tecniche100) +
   '</div>';
 }
 
 var htmlMusica = ''; 
 if (d.musica) { 
  var mSrc = d.musicaPiattaforma === 'soundcloud'
   ? 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + d.musica
   : 'https://www.youtube.com/embed/' + d.musica + '?enablejsapi=1';
  htmlMusica = '<i' + 'frame style="display: none;" src="' + mSrc + '" frameborder="0" allow="autoplay; encrypted-media"></' + 'iframe>'; 
 } 
 
 return divApri + 
  '<div class="scheda-pg-container">' + 
  '<div class="scheda-immagine"><div class="scheda-img"><img src="'+d.imgLaterale+'"></div></div>' + 
  '<div class="scheda-nomecognome"><p align="center"><span class="container-nomecognome">' + 
  (d.musica ? '<button class="custom-player"><i class="fa-solid fa-circle-play"></i></button>' + htmlMusica : '') + 
  '<span class="nomecognome">'+d.nomecognome+'</span></span></p></div>' + 
  '<div class="scheda-bottoni">' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,0)"><b>Dati</b></div>' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,1)"><b>Info</b></div>' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,2)"><b>Statistiche</b></div>' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,3)"><b>Abilità</b></div>' + 
  '<div class="bottone-nav" onclick="mostraSlide(this,4)"><b>Baule</b></div>' + 
  '</div>' + 
  '<div class="scheda-slide">' + 
  '<div class="slide-pg"><div class="slide-dati">' + 
  '<div class="dati-pg"><span>Classe:</span> <span>'+(d.classe !== '—' ? d.classe : 'N/D')+'</span> | <span>Status:</span> <span>'+d.status+'</span> | <span>Livello:</span> <span>'+d.livello+'</span></div>' + 
  '<div class="dati-exp-row"><span class="dati-pg2">Exp</span><div class="container-barra"><div class="barra-pg barra-exp" style="width:'+expPct+'%; height:100%;"></div></div><span class="dati-pg2"><b>'+d.exp+'/'+d.exptot+'</b> For Level Up!</span></div>' + 
  '<div class="img-dati"><img src="'+d.imgDati+'"></div>' + 
  '<div class="div-dati">' + 
  '<span class="scheda-label">Nome:</span> <span class="scheda-entry">'+d.nome+'</span>\n' + 
  '<span class="scheda-label">Cognome:</span> <span class="scheda-entry">'+d.cognome+'</span>\n' + 
  '<span class="scheda-label">Genere:</span> <span class="scheda-entry">'+d.genere+'</span>\n' + 
  '<span class="scheda-label">Razza:</span> <span class="scheda-entry">'+d.razza+'</span>\n' + 
  (d.specie ? '<span class="scheda-label">Specie:</span> <span class="scheda-entry">'+d.specie+'</span>\n' : '') + 
  (d.rank && d.rank !== '—' ? '<span class="scheda-label">Rank di Pericolosità:</span> <span class="scheda-entry">'+d.rank+'</span>\n' : '') + 
  (d.conservazione && d.conservazione !== '—' ? '<span class="scheda-label">Stato di Conservazione:</span> <span class="scheda-entry">'+d.conservazione+'</span>\n' : '') + 
  '<span class="scheda-label">Luogo di nascita:</span> <span class="scheda-entry">'+d.luogo+'</span>\n' + 
  '<span class="scheda-label">Data di nascita:</span> <span class="scheda-entry">'+d.datanascita+'</span>\n' + 
  '<span class="scheda-label">Segno zodiacale:</span> <span class="scheda-entry">'+d.segno+'</span>\n' + 
  '<span class="scheda-label">Segno zodiacale cinese:</span> <span class="scheda-entry">'+d.segnocinese+'</span>\n' + 
  '<span class="scheda-label">MBTI:</span> <span class="scheda-entry">'+d.mbti+'</span>\n' + 
  '<span class="scheda-label">Allineamento:</span> <span class="scheda-entry">'+d.allineamento+'</span>\n' + 
  '<span class="scheda-label">Mestiere:</span> <span class="scheda-entry">'+d.mestiere+'</span>\n' + 
  '<span class="scheda-label">Fedina Penale:</span> <span class="scheda-entry">'+d.fedina+'</span>\n' + 
  (d.fedina === 'Ricercato' ? '<span class="scheda-label">Classificazione Taglia:</span> <span class="scheda-entry">'+d.classTaglia+'</span>\n' + '<span class="scheda-label">Valore Taglia:</span> <span class="scheda-entry">'+d.valTaglia+' Jenny</span>\n' : '') + 
  '<span class="scheda-label">Soldi:</span> <span class="scheda-entry">'+d.jenny.toLocaleString()+' Jenny / '+d.hc+' HC</span>\n' + 
  (htmlQuest ? '<span class="scheda-label">Quest:</span> '+htmlQuest : '<span class="scheda-label">Quest:</span> <span class="scheda-entry">—</span>') + 
  '</div></div></div>' + 
  '<div class="slide-pg"><div class="slide-info">' + 
  '<div class="info-aggettivi"><span class="aggettivo">'+d.agg1+'</span><span class="info-sep"></span><span class="aggettivo">'+d.agg2+'</span><span class="info-sep"></span><span class="aggettivo">'+d.agg3+'</span></div>' + 
  '<div class="info-citazione"><span>'+d.citazione+'</span></div>' + 
  (d.imgInfoModo==='2' ? '<div class="img-info2"><img src="'+d.imgInfoA+'"><br><img src="'+d.imgInfoB+'"></div>' : '<div class="img-info"><img src="'+d.imgInfo+'"></div>') + 
  '<div class="info-aspetto"><span class="scheda-label">Descrizione:</span> <span class="scheda-entry">'+d.aspetto+'</span></div>' + 
  '<div class="info-storia"><span class="scheda-label">Background:</span> <span class="scheda-entry">'+d.background+'</span></div>' + 
  '</div></div>' + 
  '<div class="slide-pg"><div class="slide-statistiche">' + 
  '<div class="stats-grid">'+htmlStats+'</div>' + 
  '<div class="stats-vitali"><div class="stat-card-vitale"><span class="stat-label">Vita</span><span class="stat-value">'+parseInt(d.stat.vita).toLocaleString()+'</span></div><div class="stat-card-vitale"><span class="stat-label">Aura</span><span class="stat-value">'+parseInt(d.stat.aura).toLocaleString()+'</span></div></div>' + 
  '<div class="stats-sep">&#9670; &#9670; &#9670;</div>' + 
  '<div class="competenze-grid">'+htmlComp+'</div>' + 
  '</div></div>' + 
  '<div class="slide-pg"><div class="slide-poteri">' + 
   
  '<div class="div-poteri">'+htmlNen+'</div>' + 
  '</div></div>' + 
  '<div class="slide-pg"><div class="slide-equip">' + 
  htmlBauleCategoria('Armi',d.baule.armi,'armi') + 
  htmlBauleCategoria('Equipaggiamento',d.baule.equip,'equip') + 
  htmlBauleCategoria('Oggetti Extra',d.baule.oggetti,'oggetti') + 
  htmlBauleCategoria('Materiali',d.baule.materiali,'materiali') + 
  '</div></div>' + 
  '</div>' + 
  '<div class="scheda-copyright"><a href="https://hxhforumgdr.forumcommunity.net/">Hunter x Hunter Forum - GDR Remastered</a></div>' + 
  '</div></div>'; 
} 
 
// ============================================================ 
// HTML ANTEPRIMA 
// ============================================================ 
function costruisciHTMLAnteprimaScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale) { 
 var html = costruisciHTMLScheda(d, isNuova, classeContenitore, classeOriginale, styleOriginale); 
 html = html.replace(/\\n/g, '<br>'); 
 html = html.replace(/\n(?=<span)/g, '<br>'); 
 return html; 
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
