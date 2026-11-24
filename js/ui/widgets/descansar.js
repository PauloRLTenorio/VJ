// "Três passos do descanso": pare, olhe a criação e pense no bem que pode fazer.
import { sym, $, timers, refHTML } from './util.js';

const FASES = [
  { w: 'Pare', s: 'moon', d: 4500, t: 'Largue a pressa e o trabalho por um instante. O descanso foi feito para o bem de quem trabalha.' },
  { w: 'Olhe', s: 'sun', d: 4500, t: 'Sol, estrelas, árvores, flores: tudo foi criado por Jesus, e nos faz lembrar do Seu amor e poder.' },
  { w: 'Faça o bem', s: 'heart', d: 4500, t: 'Pense em alguém que precisa de uma visita, uma ajuda, uma palavra. O descanso também é tempo de cuidar.' },
];
const FIM = { ref: 'VJ 52.10', hl: 'devotar essas horas sagradas a um repouso saudável, dedicando tempo para adorar a Deus e assistindo aos necessitados' };
export const REFS = [{ hl: FIM.hl, ref: FIM.ref }, { hl: 'Quando olhamos o Sol, as estrelas, as árvores e as belas flores, devemos nos lembrar de que foram criados por Jesus', ref: 'VJ 49.3' }];

export function mount(host) {
  const T = timers();
  host.innerHTML = `<div class="w w--split ps" id="ps" data-ph="0">
    <div class="w__main"><div class="ps__orb"><div class="ps__ic" id="psI">${sym('moon')}</div></div></div>
    <div class="w__side ps__side"><div class="ps__word" id="psW" aria-live="assertive">Pronto?</div>
    <div class="ps__bar ps__bar--12" aria-hidden="true"><i></i></div>
    <p class="w__msg" id="psT" aria-live="polite" style="text-align:center">São só doze segundos.</p>
    <button type="button" class="w-btn w-btn--pri" id="psB">Começar</button></div></div>`;
  const root = $('#ps', host), ic = $('#psI', host), wd = $('#psW', host), tx = $('#psT', host), bt = $('#psB', host);
  let running = false;
  function run() {
    if (running) return;
    running = true; bt.disabled = true; bt.textContent = 'Descansando…';
    root.classList.remove('is-run'); void root.offsetWidth; root.classList.add('is-run');
    let at = 0;
    FASES.forEach((p, i) => {
      T.set(() => { root.dataset.ph = String(i); wd.textContent = p.w; tx.textContent = p.t; ic.innerHTML = sym(p.s); }, at);
      at += p.d;
    });
    T.set(() => {
      wd.textContent = 'Pronto.';
      tx.innerHTML = `Para o livro, o descanso é um repouso saudável, com tempo para adorar a Deus e para cuidar de quem precisa.${refHTML('VJ 49.3', REFS[1].hl)}${refHTML(FIM.ref, FIM.hl)}`;
      ic.innerHTML = sym('heart'); root.classList.remove('is-run'); running = false; bt.disabled = false; bt.textContent = 'Fazer de novo';
    }, at);
  }
  bt.addEventListener('click', run);
  return () => T.clear();
}
