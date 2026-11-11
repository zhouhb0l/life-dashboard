(() => {
  'use strict';
  const frame=document.getElementById('deck-viewer');
  const registry=window.NEGF_PROJECT;
  const id=new URLSearchParams(window.location.search).get('deck')||'silicon';
  const deck=[...registry.decks,registry.archive].find(d=>d.id===id);
  if(!deck){frame.hidden=true;document.getElementById('viewer-error').hidden=false;return;}
  document.getElementById('viewer-title').textContent=deck.number?`Deck ${deck.number} · ${deck.title}`:deck.title;
  document.title=deck.title+' · NEGFphph';
  frame.src=deck.src;
  frame.addEventListener('load',()=>frame.focus());
  const back=()=>window.location.assign('index.html');
  window.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();back();}},true);
  window.addEventListener('message',event=>{
    if(event.source!==frame.contentWindow)return;
    const localMessage=window.location.protocol==='file:'&&event.origin==='null';
    if(event.origin!==window.location.origin&&!localMessage)return;
    if(['negf:return-to-board','group-meeting:return-to-overview'].includes(event.data?.type))back();
    if(event.data?.type==='negf:return-to-projects')window.location.assign(registry.meetingPage+'#overview');
  });
})();
