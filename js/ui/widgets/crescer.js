// "Crescia em quatro direções": sabedoria, estatura, graça diante de Deus e diante das pessoas (Lc 2:52, como o livro conta).
import { sym, $, $$, burst, refHTML } from './util.js';

const DIRS = [
  { id: 'sabedoria', nome: 'Sabedoria', s: 'book', ref: 'VJ 20.8', hl: 'No livro da natureza, Ele aprendia sobre as plantas e animais, sobre o Sol e as estrelas',
    msg: '<b>Em sabedoria.</b> Aprendia nas Escrituras com Maria e no “livro da natureza”: plantas, animais, o Sol e as estrelas.' },
  { id: 'estatura', nome: 'Estatura', s: 'hammer', ref: 'VJ 22.19', hl: 'Seu corpo e mente se tornaram vigorosos',
    msg: '<b>Em estatura.</b> Trabalhando na carpintaria, o corpo e a mente ficaram fortes. Cuidava de usar bem todas as faculdades.' },
  { id: 'deus', nome: 'Diante de Deus', s: 'sunrise', ref: 'VJ 28.4', hl: 'Ao amanhecer estava sempre em algum lugar sossegado, meditando em Deus, orando ou lendo a Bíblia',
    msg: '<b>Diante de Deus.</b> Cada amanhecer num lugar sossegado: meditando, orando e lendo a Bíblia.' },
  { id: 'pessoas', nome: 'Diante das pessoas', s: 'glass', ref: 'VJ 26.5', hl: 'Aos sedentos e famintos, sempre lhes trazia um copo de água fria',
    msg: '<b>Diante das pessoas.</b> Levava um copo de água fria a quem tinha sede e repartia o próprio alimento.' },
];
const FIM = { ref: 'VJ 19.4', hl: 'E crescia Jesus em sabedoria, estatura e graça, diante de Deus e dos homens', msg: '<b>Quatro direções, uma vida inteira.</b> “Crescia Jesus em sabedoria, estatura e graça, diante de Deus e dos homens.”' };
export const REFS = [...DIRS, FIM].map((d) => ({ hl: d.hl, ref: d.ref }));

export function mount(host) {
  const on = new Set();
  host.innerHTML = `<div class="w w--split cr">
    <div class="w__main"><div class="cr__stage"><div class="cr__plant" id="crP">${sym('seedling', 'cr__seed')}${sym('tree', 'cr__tree')}</div></div></div>
    <div class="w__side"><div class="cr__chips" role="group" aria-label="Direções do crescimento">${DIRS.map((d) => `<button type="button" class="cr__chip" data-id="${d.id}" aria-pressed="false">${sym(d.s)}<span>${d.nome}</span></button>`).join('')}</div>
    <p class="w__msg" aria-live="polite">Toque em cada direção e veja a planta crescer.</p></div></div>`;
  const msg = $('.w__msg', host), plant = $('#crP', host);
  const paint = () => {
    const n = on.size;
    plant.style.setProperty('--g', n / 4);
    plant.classList.toggle('is-tree', n >= 3);
    plant.classList.toggle('is-full', n === 4);
  };
  host.addEventListener('click', (e) => {
    const b = e.target.closest('.cr__chip'); if (!b) return;
    const d = DIRS.find((x) => x.id === b.dataset.id);
    const pressed = !on.has(d.id);
    if (pressed) on.add(d.id); else on.delete(d.id);
    b.setAttribute('aria-pressed', String(pressed));
    paint();
    if (on.size === 4) { msg.innerHTML = FIM.msg + refHTML(FIM.ref, FIM.hl); burst($('.cr__stage', host), 'star', 12); }
    else if (pressed) msg.innerHTML = d.msg + refHTML(d.ref, d.hl);
    else msg.textContent = on.size ? 'Retirado. Toque de novo para repor.' : 'Toque em cada direção e veja a planta crescer.';
  });
  paint();
}
