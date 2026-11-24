// "Leve uma frase": carta que vira e mostra uma frase curta do livro (conferida contra o texto).
import { FRASES } from '../../data/stories.js';
import { sym, $, esc } from './util.js';

export function mount(host, card, ctx) {
  let bag = [], cur = null, flipped = false;
  const pick = () => { if (!bag.length) bag = FRASES.map((_, i) => i).sort(() => Math.random() - 0.5); return FRASES[bag.pop()]; };
  host.innerHTML = `<div class="w w--split fr">
    <div class="w__main"><div class="fr__card" id="frC" role="button" tabindex="0" aria-label="Virar a carta para ver uma frase do livro">
      <div class="fr__face fr__front">${sym('book')}<b>Toque para virar</b></div>
      <div class="fr__face fr__back" id="frB" aria-live="polite"></div>
    </div></div>
    <div class="w__side"><div class="w-row" style="justify-content:center"><button type="button" class="w-btn w-btn--pri" id="frN">Outra frase</button><button type="button" class="w-btn" id="frS">Compartilhar</button></div></div></div>`;
  const c = $('#frC', host), back = $('#frB', host);
  // virada, a carta deixa de ser botão: o verso tem um link (a referência ao livro) e link dentro de botão não vale
  const papel = () => { c.setAttribute('role', flipped ? 'group' : 'button'); c.setAttribute('aria-label', flipped ? 'Frase do livro' : 'Virar a carta para ver uma frase do livro'); };
  const show = () => {
    cur = pick();
    // data-q: o link do livro (js/ui/refs.js) destaca esta frase na página do site oficial
    back.innerHTML = `<p class="fr__q">“${esc(cur.q)}”</p><p class="fr__ref" data-q="${esc(cur.q)}">${esc(cur.ref)}</p><p class="fr__g">${esc(cur.glosa)}</p>`;
  };
  const flip = () => {
    if (!flipped) { show(); flipped = true; papel(); c.classList.add('is-flip'); }
    else { c.classList.remove('is-flip'); flipped = false; papel(); setTimeout(() => { show(); flipped = true; papel(); c.classList.add('is-flip'); }, 420); }
  };
  c.addEventListener('click', () => { if (!flipped) flip(); });
  c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!flipped) flip(); } });
  $('#frN', host).addEventListener('click', flip);
  $('#frS', host).addEventListener('click', async () => {
    if (!cur) { ctx.toast('Vire a carta primeiro.'); return; }
    const text = `“${cur.q}” — ${cur.ref}. ${cur.glosa} https://paulorltenorio.github.io/VJ/`;
    try {
      if (navigator.share) await navigator.share({ title: 'VJ', text });
      else { await navigator.clipboard.writeText(text); ctx.toast('Frase copiada!'); }
    } catch (e) { /* cancelado */ }
  });
}
