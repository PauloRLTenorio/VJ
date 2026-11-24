// Gera sw.js (service worker) com a lista dos arquivos do site e uma versão baseada no conteúdo deles.
// O site funciona offline depois da primeira visita. Estratégia: rede primeiro, cache como reserva (nunca serve arquivo velho online).
// Uso (na raiz): node scripts/gerar_sw.mjs     — rode antes de publicar uma mudança.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const RAIZ = new URL('..', import.meta.url).pathname;
const PASTAS = ['css', 'js', 'assets'];
const EXTRAS = ['index.html', 'manifest.webmanifest'];

function lista(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? lista(p) : [p];
  });
}
const arquivos = [...EXTRAS.map((e) => join(RAIZ, e)), ...PASTAS.flatMap((d) => lista(join(RAIZ, d)))]
  .map((p) => relative(RAIZ, p))
  .filter((p) => !p.endsWith('.DS_Store'))
  .sort();

const hash = createHash('sha1');
arquivos.forEach((f) => hash.update(f).update(readFileSync(join(RAIZ, f))));
const versao = hash.digest('hex').slice(0, 10);

const fonte = `// GERADO por scripts/gerar_sw.mjs — não edite à mão.
const CACHE = 'vj-${versao}';
const ARQUIVOS = ${JSON.stringify(['./', ...arquivos], null, 1)};

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith('vj-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
// rede primeiro (sempre a versão mais nova quando há internet); sem internet, usa o cache
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) { const copia = res.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('index.html') : undefined)))
  );
});
`;
writeFileSync(join(RAIZ, 'sw.js'), fonte);
console.log(`sw.js gerado: ${arquivos.length} arquivos, versão ${versao}`);
