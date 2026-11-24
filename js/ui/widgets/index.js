// Registro das interações. Cada módulo exporta mount(host, card, ctx) e devolve (opcionalmente) uma função de limpeza.
// Os que citam o livro exportam também REFS = [{ q | hl, ref }], que o gerador de links (scripts/gerar_links_egw.py) confere.
const LOADERS = {
  anuncio: () => import('./anuncio.js'),
  estrela: () => import('./estrela.js'),
  crescer: () => import('./crescer.js'),
  escrito: () => import('./escrito.js'),
  poco: () => import('./poco.js'),
  samaritano: () => import('./samaritano.js'),
  descansar: () => import('./descansar.js'),
  ovelha: () => import('./ovelha.js'),
  'quem-e-este': () => import('./quem-e-este.js'),
  lavapes: () => import('./lavapes.js'),
  vigia: () => import('./vigia.js'),
  cenario: () => import('./cenario.js'),
  trevas: () => import('./trevas.js'),
  pedra: () => import('./pedra.js'),
  emaus: () => import('./emaus.js'),
  florescer: () => import('./florescer.js'),
  plano: () => import('./plano.js'),
  frase: () => import('./frase.js'),
  compartilhar: () => import('./compartilhar.js'),
  reflexao: () => import('./reflexao.js'),
};

export async function mountWidget(name, host, card, ctx) {
  const load = LOADERS[name];
  if (!load) { host.innerHTML = '<p class="sv__small">Interação em preparo.</p>'; return () => {}; }
  const mod = await load();
  const clean = mod.mount(host, card, ctx);
  return typeof clean === 'function' ? clean : () => {};
}
