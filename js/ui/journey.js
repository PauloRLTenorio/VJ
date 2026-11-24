// Lista de paradas (em quatro partes), progresso (estrelas) e atalhos para as interações.
import { STORIES, BY_ID, PARTES } from '../data/stories.js';
import { state } from '../state.js';
import { icon } from './art.js';
import { img } from '../data/imagens.js';

const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const mins = (s) => Math.max(1, Math.round((s.cards.length + 1) * 0.24));

// atalhos para as interações ("Brinque"): w = módulo da interação; story = parada onde ela está
const TOYS = [
  { w: 'anuncio', story: 'noite-em-belem', icon: 'angel', t: 'Para onde foi a boa notícia?', d: 'Três portas, uma surpresa.' },
  { w: 'estrela', story: 'estrela-dos-sabios', icon: 'star', t: 'Siga a estrela', d: 'A luz some perto de Jerusalém e volta.' },
  { w: 'crescer', story: 'menino-de-nazare', icon: 'seedling', t: 'Crescia em quatro direções', d: 'Sabedoria, estatura e graça.' },
  { w: 'escrito', story: 'deserto', icon: 'scroll', t: 'Três tentações, uma resposta', d: 'Escolha o “Está escrito”.' },
  { w: 'poco', story: 'primeiros-passos', icon: 'well', t: 'Puxe a corda do poço', d: 'A água viva que mata a sede.' },
  { w: 'samaritano', story: 'montanha', icon: 'oil', t: 'Seja o próximo', d: 'Cuide do homem ferido.' },
  { w: 'descansar', story: 'descanso', icon: 'moon', t: 'Três passos do descanso', d: 'Pare, olhe e faça o bem.' },
  { w: 'ovelha', story: 'bom-pastor', icon: 'lantern', t: 'Procure a ovelha perdida', d: 'Uma lanterna e a noite escura.' },
  { w: 'quem-e-este', story: 'hosana', icon: 'palm', t: 'Quem é Este?', d: 'As testemunhas respondem.' },
  { w: 'lavapes', story: 'ultima-ceia', icon: 'basin', t: 'Lave os pés', d: 'A toalha do Mestre.' },
  { w: 'vigia', story: 'getsemani', icon: 'olive-tree', t: 'Vigiai e orai', d: 'Doze segundos de vigília.' },
  { w: 'cenario', story: 'preso-e-julgado', icon: 'scroll', t: 'Como você responde?', d: 'Três situações do dia a dia.' },
  { w: 'trevas', story: 'a-cruz', icon: 'cross', t: 'Do meio-dia às três', d: 'O céu escurece e a luz volta.' },
  { w: 'pedra', story: 'ressuscitou', icon: 'stone', t: 'Role a pedra', d: 'O túmulo está vazio.' },
  { w: 'emaus', story: 'paz-seja-convosco', icon: 'bread', t: 'A estrada de Emaús', d: 'Caminhe, ouça e parta o pão.' },
  { w: 'florescer', story: 'lar-que-ele-prepara', icon: 'tree', t: 'O deserto vai florescer', d: 'Da terra seca ao jardim.' },
  { w: 'plano', story: 'proximo-passo', icon: 'feet', t: 'Plano de 7 dias', d: 'Um gesto pequeno por dia.' },
  { w: 'frase', story: 'proximo-passo', icon: 'book', t: 'Leve uma frase', d: 'Vire a carta e guarde.' },
];

export function toyHref(t) {
  const s = BY_ID[t.story];
  const i = s.cards.findIndex((c) => c.w === t.w);
  return `#/h/${s.id}/${Math.max(0, i)}`;
}

export function renderJourney() {
  const path = $('#path');
  if (!path) return;
  const done = state.doneCount();
  const nextStory = STORIES.find((s) => !state.isDone(s.id));
  const parteDe = (n) => PARTES.find((p, k) => n >= p.de && (!PARTES[k + 1] || n < PARTES[k + 1].de));
  path.innerHTML = STORIES.map((s) => {
    const isDone = state.isDone(s.id);
    const started = state.started(s.id);
    const badge = isDone ? '<span class="badge badge--ok">Concluída</span>' : started ? '<span class="badge badge--go">Continuar</span>' : '';
    const pos = started ? `/${state.pos(s.id)}` : '';
    const pt = PARTES.find((p) => p.de === s.n);
    const cab = pt ? `<li class="part reveal" aria-label="Parte ${PARTES.indexOf(pt) + 1}: ${esc(pt.titulo)}"><span class="part__n">Parte ${PARTES.indexOf(pt) + 1}</span><span class="part__t">${esc(pt.titulo)}</span></li>` : '';
    return `${cab}<li class="stop stop--${s.n % 2 ? 'l' : 'r'} reveal${isDone ? ' is-done' : ''}" style="--st-a:${s.theme.a};--st-b:${s.theme.b}" data-parte="${parteDe(s.n).id}">
      <span class="stop__node" aria-hidden="true">${isDone ? '✓' : s.n}</span>
      <a class="stop__card" href="#/h/${s.id}${pos}" aria-label="Parada ${s.n}: ${esc(s.title)}. ${isDone ? 'Concluída.' : ''}">
        <span class="stop__art">${img(`parada-${s.n}`) ? `<img src="${img(`parada-${s.n}`)}" alt="" loading="lazy" decoding="async">` : icon(s.icon)}</span>
        <span class="stop__body">
          <span class="stop__tit">${esc(s.title)}</span>
          <span class="stop__hook">${esc(s.hook)}</span>
          <span class="stop__meta"><span>${s.cards.length} cartões</span><span aria-hidden="true">·</span><span>≈ ${mins(s)} min</span>${badge}</span>
        </span>
      </a></li>`;
  }).join('');

  const tree = $('#tree');
  if (tree) {
    tree.innerHTML = `
      <div class="tree__fruits" aria-hidden="true">${STORIES.map((s) => `<span class="tree__fruit${state.isDone(s.id) ? ' is-on' : ''}">${icon('star')}</span>`).join('')}</div>
      <span class="tree__txt">${done === 0 ? 'Nenhuma parada concluída ainda' : done === STORIES.length ? 'Jornada completa! ✨' : `${done} de ${STORIES.length} paradas concluídas`}</span>
      ${nextStory && done > 0 ? `<a class="tree__go" href="#/h/${nextStory.id}${state.started(nextStory.id) ? '/' + state.pos(nextStory.id) : ''}">Continuar: ${esc(nextStory.title)}</a>` : ''}`;
  }

  const toys = $('#toys');
  if (toys && !toys.dataset.ready) {
    toys.dataset.ready = '1';
    toys.innerHTML = TOYS.map((t) => {
      const s = BY_ID[t.story];
      return `<li class="reveal"><a class="toy" href="${toyHref(t)}" style="--st-a:${s.theme.a};--st-b:${s.theme.b}">
        <span class="toy__ic">${icon(t.icon)}</span><span class="toy__t">${esc(t.t)}</span><span class="toy__d">${esc(t.d)}</span></a></li>`;
    }).join('');
  }
  renderNotebook();
  observeReveal();
}

export function renderNotebook() {
  const sec = $('#caderno'); if (!sec) return;
  const notes = state.notes();
  const ids = STORIES.filter((s) => notes[s.id]).map((s) => s.id);
  sec.hidden = ids.length === 0;
  if (!ids.length) return;
  $('#cadernoLista').innerHTML = ids.map((id) => {
    const s = BY_ID[id];
    const card = s.cards.find((c) => c.w === 'reflexao');
    return `<article class="nota"><h3>Parada ${s.n} · ${esc(s.title)}</h3><p class="nota__q">${esc(card ? card.pergunta : '')}</p><p>${esc(notes[id].t)}</p></article>`;
  }).join('');
}

let io;
export function observeReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  io = io || new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((e, i) => { e.style.setProperty('--rd', `${(i % 4) * 0.06}s`); io.observe(e); });
}
