import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(process.argv[2] || '.');
const port = Number(process.env.PORT || 5174);
const types = { '/': ['index.html', 'text/html'], '/index.html': ['index.html', 'text/html'], '/style.css': ['style.css', 'text/css'], '/app.js': ['app.js', 'text/javascript'], '/favicon.svg': ['favicon.svg', 'image/svg+xml'] };
http.createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path === '/healthz') { res.writeHead(200, {'Content-Type': 'text/plain'}); return res.end('ok'); }
  const entry = types[path];
  if (!entry) { res.writeHead(404); return res.end('Not found'); }
  try { const data = await readFile(resolve(root, entry[0])); res.writeHead(200, {'Content-Type': entry[1] + '; charset=utf-8'}); res.end(data); }
  catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, '0.0.0.0', () => console.log(`Weekend Studio: http://localhost:${port}`));
