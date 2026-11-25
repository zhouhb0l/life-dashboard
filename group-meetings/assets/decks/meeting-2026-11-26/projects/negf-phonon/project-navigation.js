/* Shared navigation for new NEGF pages; the frozen silicon HTML is not modified. */
(() => {
  'use strict';
  if(window.__negfNavigationBound)return;
  window.__negfNavigationBound=true;
  const base=new URL('.',document.currentScript.src);
  const boardURL=new URL('index.html',base).href;
  const meetingURL=new URL('../../../../../meeting-2026-11-26.html#overview',base).href;
  const embedded=window.parent!==window;
  const post=(type,extra={})=>window.parent.postMessage({type,...extra},'*');
  document.addEventListener('click',event=>{
    const target=event.target.closest?.('a');
    if(!target)return;
    if(embedded&&target.dataset.negfDeck){event.preventDefault();post('negf:open-deck',{deckId:target.dataset.negfDeck});}
    else if(target.hasAttribute('data-negf-board')){event.preventDefault();embedded?post('negf:return-to-board'):window.location.assign(boardURL);}
    else if(target.hasAttribute('data-meeting-board')&&embedded){event.preventDefault();post('negf:return-to-projects');}
  });
  window.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    event.preventDefault();event.stopImmediatePropagation();
    if(document.body.hasAttribute('data-negf-board'))embedded?post('negf:return-to-projects'):window.location.assign(meetingURL);
    else embedded?post('negf:return-to-board'):window.location.assign(boardURL);
  },true);
})();
