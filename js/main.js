// VJ (Vida de Jesus) — ponto de entrada: sprite, tema, página inicial, rota (#/h/<parada>/<cartão>) e visualizador.
import { SPRITE } from './ui/sprite.js';
import { STORIES, BY_ID } from './data/stories.js';
import { state } from './state.js';
import { Viewer } from './ui/viewer.js';
import { mountHero } from './ui/hero.js';
import { renderJourney, observeReveal } from './ui/journey.js';
import { img } from './data/imagens.js';
import { mountLeve } from './ui/leve.js';

const $ = (s) => document.querySelector(s);

// 1) sprite de ilustrações (e reatualiza os <use> que já estavam na página)
document.body.insertAdjacentHTML('afterbegin', SPRITE);
document.querySelectorAll('use[href^="#s-"]').forEach((u) => { const h = u.getAttribute('href'); u.setAttribute('href', ''); u.setAttribute('href', h); });

// 2) toast
let toastT = 0;
export function toast(msg) {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg; t.classList.add('is-on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is-on'), 2600);
}

window.addEventListener('vj:toast', (e) => toast(e.detail));

// 3) tema dia/noite
const root = document.documentElement;
const effectiveTheme = () => root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');
$('#btnTema').addEventListener('click', () => {
  const next = effectiveTheme() === 'night' ? 'day' : 'night';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('vj.tema', next); } catch (e) { /* ignora */ }
});

// 4) visualizador + rota
let pushed = false; // abrimos por navegação interna (há uma entrada no histórico para voltar)
const viewer = new Viewer($('#viewer'), {
  toast,
  onNavigate(id, idx) {
    const h = `#/h/${id}/${idx}`;
    if (location.hash !== h) history.replaceState(history.state, '', h);
  },
  onOpenStory(id) {
    history.replaceState(history.state, '', `#/h/${id}`);
    viewer.open(id, state.pos(id) > 0 && !state.isDone(id) ? state.pos(id) : 0);
  },
  onClose(scrollTo) {
    if (pushed) { pushed = false; history.back(); }
    else if (/^#\/h\//.test(location.hash)) history.replaceState(null, '', location.pathname + location.search + (typeof scrollTo === 'string' ? '' : '#/'));
    refresh();
    if (typeof scrollTo === 'string') { const el = $(scrollTo); el && el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  },
});

function parse() {
  const m = location.hash.match(/^#\/h\/([\w-]+)(?:\/(\d+))?/);
  return m ? { id: m[1], idx: m[2] != null ? +m[2] : null } : null;
}
function sync() {
  const r = parse();
  if (r && BY_ID[r.id]) {
    if (viewer.isOpen && viewer.id === r.id) {
      // mesmo cartão: nada a fazer; outro cartão (endereço editado ou colado): vai até ele
      if (r.idx != null && r.idx !== viewer.idx && r.idx >= 0 && r.idx < viewer.total) viewer.go(r.idx, r.idx > viewer.idx ? 1 : -1);
      return;
    }
    const idx = r.idx != null ? r.idx : (state.pos(r.id) > 0 && !state.isDone(r.id) ? state.pos(r.id) : 0);
    viewer.open(r.id, idx);
  } else if (viewer.isOpen) {
    pushed = false; viewer.close();
  }
}
window.addEventListener('hashchange', () => {
  // navegação por link interno => há entrada para voltar
  if (parse() && !viewer.isOpen) pushed = true;
  sync();
});

function openStory(id) { pushed = true; location.hash = `#/h/${id}`; }

// 5) página inicial
if (img('hero')) document.documentElement.classList.add('has-hero-img');
if (img('hero')) document.documentElement.style.setProperty('--hero-img', `url("${new URL(img('hero'), document.baseURI).href}")`);
mountHero($('#heroScene'), { onOpen: openStory });
function refresh() {
  renderJourney();
  const last = state.lastOpen();
  const btn = $('#btnContinuar');
  const nx = STORIES.find((s) => state.started(s.id)) || null;
  if (btn) {
    if (nx) { btn.hidden = false; btn.textContent = 'Continuar'; btn.dataset.id = nx.id; } else btn.hidden = true;
  }
  const comecar = $('#btnComecar');
  if (comecar) {
    const target = nx || STORIES.find((s) => !state.isDone(s.id)) || STORIES[0];
    const started = state.doneCount() > 0 || !!nx;
    comecar.textContent = started ? `Continuar: ${target.title}` : 'Começar a jornada';
    comecar.setAttribute('href', `#/h/${target.id}`);
  }
}
$('#btnContinuar').addEventListener('click', (e) => { const id = e.currentTarget.dataset.id; if (id) openStory(id); });
refresh();
state.subscribe(() => { /* o painel é atualizado ao fechar o visualizador */ });

// caderno de reflexões
$('#cadernoCopiar').addEventListener('click', async () => {
  const notes = state.notes();
  const txt = STORIES.filter((s) => notes[s.id]).map((s) => { const c = s.cards.find((k) => k.w === 'reflexao'); return `${s.n}. ${s.title}\n${c ? c.pergunta : ''}\n${notes[s.id].t}`; }).join('\n\n');
  try { await navigator.clipboard.writeText(txt); toast('Caderno copiado!'); } catch (e) { toast('Não foi possível copiar.'); }
});
$('#cadernoLimpar').addEventListener('click', () => {
  if (!confirm('Apagar todas as anotações do seu caderno neste aparelho?')) return;
  Object.keys(state.notes()).forEach((id) => state.setNote(id, ''));
  refresh(); toast('Caderno apagado.');
});

// 6) cabeçalho: sombra ao rolar
const hdr = $('#hdr');
const onScroll = () => hdr.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// 7) compartilhar
$('#btnCompartilhar').addEventListener('click', async () => {
  const data = { title: 'VJ — Ele veio para ficar perto', text: 'Uma jornada em cartões pela vida de Jesus, de Belém ao lar que Ele prepara.', url: 'https://paulorltenorio.github.io/VJ/' };
  try {
    if (navigator.share) { await navigator.share(data); return; }
    await navigator.clipboard.writeText(data.url); toast('Link copiado!');
  } catch (e) { /* o usuário cancelou */ }
});

try { mountLeve({ toast }); } catch (e) { /* bloco opcional: nunca pode derrubar o resto */ }
// "VJ 10.6" vira link para o trecho exato no site do livro. Módulo opcional: se falhar, o site funciona igual, só sem os links.
import('./ui/refs.js').then((m) => m.observarRefs(document.body)).catch(() => { /* sem links */ });
observeReveal();
sync();

// 8) offline: service worker só no site publicado (no teste local não registra, para não confundir o cache)
if ('serviceWorker' in navigator && /\.github\.io$/.test(location.hostname)) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
