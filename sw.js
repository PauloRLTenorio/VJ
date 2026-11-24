// GERADO por scripts/gerar_sw.mjs — não edite à mão.
const CACHE = 'vj-9f9988fc7b';
const ARQUIVOS = [
 "./",
 "assets/apple-touch-icon.png",
 "assets/favicon.svg",
 "assets/fonts/inter-latin-ext.woff2",
 "assets/fonts/inter-latin.woff2",
 "assets/fonts/newsreader-latin-ext.woff2",
 "assets/fonts/newsreader-latin.woff2",
 "assets/icon-192.png",
 "assets/icon-512.png",
 "assets/og-image.png",
 "assets/qr.png",
 "assets/qr.svg",
 "css/base.css",
 "css/fonts.css",
 "css/home.css",
 "css/story.css",
 "css/tokens.css",
 "css/widgets.css",
 "index.html",
 "js/data/egw.js",
 "js/data/imagens.js",
 "js/data/livro.js",
 "js/data/stories.js",
 "js/main.js",
 "js/state.js",
 "js/ui/art.js",
 "js/ui/hero.js",
 "js/ui/journey.js",
 "js/ui/leve.js",
 "js/ui/qr.js",
 "js/ui/refs.js",
 "js/ui/sprite.js",
 "js/ui/sprite/animais.js",
 "js/ui/sprite/herdados.js",
 "js/ui/sprite/natureza.js",
 "js/ui/sprite/objetos.js",
 "js/ui/sprite/sagrado.js",
 "js/ui/viewer.js",
 "js/ui/widgets/anuncio.js",
 "js/ui/widgets/cenario.js",
 "js/ui/widgets/compartilhar.js",
 "js/ui/widgets/crescer.js",
 "js/ui/widgets/descansar.js",
 "js/ui/widgets/emaus.js",
 "js/ui/widgets/escrito.js",
 "js/ui/widgets/estrela.js",
 "js/ui/widgets/florescer.js",
 "js/ui/widgets/frase.js",
 "js/ui/widgets/index.js",
 "js/ui/widgets/lavapes.js",
 "js/ui/widgets/ovelha.js",
 "js/ui/widgets/pedra.js",
 "js/ui/widgets/plano.js",
 "js/ui/widgets/poco.js",
 "js/ui/widgets/quem-e-este.js",
 "js/ui/widgets/reflexao.js",
 "js/ui/widgets/samaritano.js",
 "js/ui/widgets/trevas.js",
 "js/ui/widgets/util.js",
 "js/ui/widgets/vigia.js",
 "manifest.webmanifest"
];

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
