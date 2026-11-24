// "Para onde foi a boa notícia?": três portas; a notícia do nascimento chegou aos pastores que oravam.
import { sym, $, $$, burst, refHTML } from './util.js';

const PORTAS = [
  { id: 'palacio', nome: 'O palácio', s: 'crown', ref: 'VJ 16.6', hl: 'Herodes não gostou de ouvir falar de um rei que um dia poderia tomar o seu trono',
    msg: '<b>Ainda não.</b> O palácio só soube depois, pelos sábios, e o rei Herodes não gostou de ouvir falar de outro rei.' },
  { id: 'templo', nome: 'O templo', s: 'temple', ref: 'VJ 10.8', hl: 'Eram por demais orgulhosos para aceitar o Messias como um bebê indefeso',
    msg: '<b>Também não.</b> Os sacerdotes esperavam um rei poderoso e eram orgulhosos demais para aceitar um bebê indefeso.' },
  { id: 'colinas', nome: 'As colinas', s: 'sheep', ref: 'VJ 10.9–10', hl: 'enviou as novas de grande alegria a alguns pastores que guardavam seus rebanhos nas colinas de Belém', certa: true,
    msg: '<b>Isso!</b> A notícia foi para pastores simples que oravam pela vinda do Salvador. Deus escolhe o coração aberto, não o título.' },
];
export const REFS = PORTAS.map((p) => ({ hl: p.hl, ref: p.ref }));

export function mount(host) {
  host.innerHTML = `<div class="w w--split an">
    <div class="w__main"><div class="an__scene">
      <div class="an__angel" aria-hidden="true">${sym('angel')}</div>
      <div class="an__doors" role="group" aria-label="Três lugares">${PORTAS.map((p) => `<button type="button" class="an__door" data-id="${p.id}" aria-pressed="false">${sym(p.s)}<span>${p.nome}</span></button>`).join('')}</div>
    </div></div>
    <div class="w__side"><p class="w__msg" aria-live="polite">Um anjo tem uma boa notícia: nasceu o Salvador. Para onde ele vai levá-la primeiro?</p></div></div>`;
  const msg = $('.w__msg', host);
  host.addEventListener('click', (e) => {
    const b = e.target.closest('.an__door'); if (!b) return;
    const p = PORTAS.find((x) => x.id === b.dataset.id);
    $$('.an__door', host).forEach((x) => { x.setAttribute('aria-pressed', String(x === b)); x.classList.toggle('is-right', x === b && !!p.certa); x.classList.toggle('is-wrong', x === b && !p.certa); });
    msg.innerHTML = p.msg + refHTML(p.ref, p.hl);
    if (p.certa) { burst($('.an__scene', host), 'star', 12); $('.an__scene', host).classList.add('is-found'); }
  });
}
