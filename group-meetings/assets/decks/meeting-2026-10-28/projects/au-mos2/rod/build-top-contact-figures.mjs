import fs from 'node:fs/promises';
const root = new URL('./', import.meta.url);
const data = JSON.parse(await fs.readFile(new URL('source/top-contact/lateral-sbh.json',root),'utf8'));
const W=1440,H=540,l=120,r=1350,t=45,b=408;
const x=n=>l+n/10*(r-l), y=v=>b-v/.8*(b-t);
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d"><title id="t">Au–MoS₂ top-contact lateral electron barrier</title><desc id="d">Case labels 0d through 10d, barrier midpoint and archived extraction bracket. Pristine reference 0.150 eV has no resolved uncertainty range. These are LDOS extraction sensitivities, not confidence intervals.</desc><rect width="1440" height="540" fill="white"/><g font-family="Arial,Helvetica,sans-serif" fill="#182636">`;
for(let v=0;v<=.8001;v+=.2){s+=`<path d="M${l},${y(v)}H${r}" stroke="#e4e8eb"/><text x="${l-20}" y="${y(v)+8}" font-size="24" text-anchor="end">${v.toFixed(1)}</text>`;}
s+=`<path d="M${l},${t}V${b}H${r}" fill="none" stroke="#657582" stroke-width="1.5"/><text x="30" y="230" font-size="25" transform="rotate(-90 30 230)" text-anchor="middle">Lateral electron SBH (eV)</text><text x="740" y="493" font-size="25" text-anchor="middle">Vacancy-position case (farther from contact edge →)</text>`;
s+=`<path d="M${l},${y(data.pristine.central)}H${r}" stroke="#788793" stroke-width="2" stroke-dasharray="9 7"/><text x="${r-10}" y="${y(.15)+34}" text-anchor="end" fill="#657582" font-size="22">Pristine: 0.150 eV · uncertainty not resolved</text>`;
s+=`<path d="${data.records.map((p,i)=>(i?'L':'M')+x(p.d_index)+','+y(p.central)).join(' ')}" fill="none" stroke="#a78bca" stroke-width="2"/>`;
for(const p of data.records){const px=x(p.d_index),ya=y(p.upper),yb=y(p.lower),py=y(p.central);s+=`<path d="M${px},${ya}V${yb}M${px-10},${ya}H${px+10}M${px-10},${yb}H${px+10}" stroke="#7848a1" stroke-width="4"/><circle cx="${px}" cy="${py}" r="7" fill="#7848a1"/><text x="${px}" y="${ya-17}" font-size="25" text-anchor="middle" font-weight="700">${p.central.toFixed(3)}</text><text x="${px}" y="${b+36}" font-size="24" text-anchor="middle">${p.d_index}d</text>`;}
s+=`<text x="${r}" y="26" font-size="21" fill="#657582" text-anchor="end">Dots: bracket midpoint · whiskers: LDOS extraction range</text></g></svg>`;
await fs.writeFile(new URL('figures/top-contact-lateral-sbh.svg',root),s);
