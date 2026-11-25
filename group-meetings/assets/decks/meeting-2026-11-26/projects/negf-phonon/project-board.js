(() => {
  'use strict';
  const project=window.NEGF_PROJECT;
  const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const card=deck=>`<a class="deck-card ${deck.group==='papers'?'paper':''} ${deck.id==='silicon'?'current':''}" href="viewer.html?deck=${encodeURIComponent(deck.id)}" data-negf-deck="${escape(deck.id)}" aria-label="Open Deck ${deck.number}: ${escape(deck.title)}"><div class="deck-number"><span>Deck ${deck.number}</span>${deck.id==='silicon'?'<span class="current-marker">Thursday</span>':''}</div><h3>${escape(deck.title)}</h3><p>${escape(deck.description)}</p><span class="deck-purpose">${escape(deck.purpose)}</span><div class="deck-meta"><strong>${escape(deck.status)}</strong><span>${deck.slideCount} slides</span><span>${escape(deck.updated)}</span></div><span class="deck-open">Open presentation <span aria-hidden="true">↗</span></span></a>`;
  document.getElementById('development-decks').innerHTML=project.decks.filter(d=>d.group==='development').map(card).join('');
  document.getElementById('paper-decks').innerHTML=project.decks.filter(d=>d.group==='papers').map(card).join('');
})();
