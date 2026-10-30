// Optional local preview: node tools/preview-project-tracker.cjs
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 4173);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.pdf':'application/pdf'};
const server = http.createServer((request,response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname); }
  catch (_) { response.writeHead(400); response.end('Invalid URL'); return; }
  if (pathname === '/') pathname = '/project-progress.html';
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) || pathname.split('/').some(part => part.startsWith('.'))) {
    response.writeHead(403); response.end('Forbidden'); return;
  }
  fs.stat(file,(error,stat) => {
    if (error || !stat.isFile()) { response.writeHead(404); response.end('Not found'); return; }
    response.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    fs.createReadStream(file).pipe(response);
  });
});
server.listen(port,'127.0.0.1',() => console.log(`Local: http://127.0.0.1:${port}/project-progress.html`));
server.on('error',error => { console.error(error.message); process.exitCode = 1; });
