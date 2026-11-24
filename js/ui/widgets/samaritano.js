// "Seja o próximo": os gestos do samaritano, um a um; o homem ferido se recupera a cada cuidado.
import { sym, $, $$, burst, refHTML } from './util.js';

const G = [
  { id: 'tunica', nome: 'Envolver', s: 'towel', msg: '<b>Primeiro, o abrigo.</b> Tirou a própria túnica e envolveu o ferido.', ref: 'VJ 47.5', hl: 'O samaritano tirou a túnica e nela envolveu o ferido' },
  { id: 'bebida', nome: 'Dar de beber', s: 'glass', msg: '<b>Depois, a sede.</b> Deu-lhe de beber.', ref: 'VJ 47.5', hl: 'Deu-lhe bebida' },
  { id: 'azeite', nome: 'Tratar', s: 'oil', msg: '<b>Cuidou das feridas</b> com azeite.', ref: 'VJ 47.5', hl: 'tratou seus ferimentos com azeite' },
  { id: 'animal', nome: 'Levar', s: 'donkey', msg: '<b>Não o deixou ali.</b> Colocou-o sobre o seu animal e o levou a uma hospedaria.', ref: 'VJ 47.5', hl: 'Depois colocou-o sobre o animal e levou-o a uma hospedaria' },
  { id: 'noite', nome: 'Ficar', s: 'house', msg: '<b>Ficou com ele.</b> Cuidou do homem a noite toda.', ref: 'VJ 47.5', hl: 'onde cuidou dele a noite toda' },
  { id: 'pagar', nome: 'Pagar', s: 'gold', msg: '<b>E pagou.</b> No dia seguinte, deixou dinheiro ao hospedeiro para que cuidasse dele até que se recuperasse.', ref: 'VJ 47.6', hl: 'pagou ao hospedeiro para que cuidasse dele até que se recuperasse' },
];
const FIM = { msg: '<b>“Vai e procede tu de igual modo.”</b> Quem precisa de ajuda é o nosso próximo, e é assim que gostaríamos de ser tratados.', ref: 'VJ 47.6–7', hl: 'Vai e procede tu de igual modo' };
export const REFS = [...G, FIM].map((g) => ({ hl: g.hl, ref: g.ref }));

export function mount(host) {
  const on = new Set();
  host.innerHTML = `<div class="w w--split sm">
    <div class="w__main"><div class="sm__road" id="smR">
      <div class="sm__slots" aria-hidden="true">${G.map(() => '<span class="sm__slot"></span>').join('')}</div>
      <div class="sm__man" id="smMan" style="--v:0">${sym('person')}</div>
    </div></div>
    <div class="w__side"><div class="sm__chips" role="group" aria-label="Gestos de cuidado">${G.map((g) => `<button type="button" class="sm__chip" data-id="${g.id}" aria-pressed="false">${sym(g.s)}<span>${g.nome}</span></button>`).join('')}</div>
    <p class="w__msg" id="smM" aria-live="polite">Na estrada de Jerusalém a Jericó, um homem ferido. O sacerdote e o levita passaram do outro lado. E você?</p></div></div>`;
  const msg = $('#smM', host), man = $('#smMan', host);
  host.addEventListener('click', (e) => {
    const b = e.target.closest('.sm__chip'); if (!b || b.getAttribute('aria-pressed') === 'true') return;
    const g = G.find((x) => x.id === b.dataset.id), i = G.indexOf(g);
    b.setAttribute('aria-pressed', 'true'); on.add(g.id);
    $$('.sm__slot', host)[i].innerHTML = sym(g.s);
    $$('.sm__slot', host)[i].classList.add('is-on');
    man.style.setProperty('--v', (on.size / G.length).toFixed(2));
    if (on.size === G.length) { msg.innerHTML = FIM.msg + refHTML(FIM.ref, FIM.hl); man.classList.add('is-well'); burst($('#smR', host), 'heart', 10); }
    else msg.innerHTML = g.msg + refHTML(g.ref, g.hl);
  });
}
