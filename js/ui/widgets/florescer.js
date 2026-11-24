// "O deserto vai florescer": arraste e veja a Terra renovada surgir, como o livro descreve.
import { sym, $, $$, clamp, refHTML, mixHex } from './util.js';

const Z = [
  { ate: 22, msg: '<b>Hoje.</b> Há desertos, tristezas e perdas. Mas o livro fala de uma Terra renovada: um novo céu e uma nova Terra.', ref: 'VJ 142.4', hl: 'O céu e a Terra serão renovados' },
  { ate: 46, msg: '<b>“O deserto e a terra se alegrarão.”</b> O ermo exultará e florescerá.', ref: 'VJ 144.3', hl: 'O deserto e a terra se alegrarão' },
  { ate: 70, msg: '<b>Águas vivas.</b> Rios claros como cristal, árvores à margem e o Pastor conduzindo o rebanho às fontes.', ref: 'VJ 142.7', hl: 'Ali o Pastor divino conduz o Seu rebanho às fontes de águas vivas' },
  { ate: 94, msg: '<b>Lar de verdade.</b> Casas construídas e habitadas, vinhas plantadas e comidas: “não edificarão para que outros habitem”.', ref: 'VJ 144.2', hl: 'Eles edificarão casas e nelas habitarão' },
  { ate: 100, msg: '<b>O lobo com o cordeiro.</b> E um pequenino os guiará. “Já não haverá luto, nem pranto, nem dor.”', ref: 'VJ 144.4–5', hl: 'O lobo habitará com o cordeiro' },
];
export const REFS = Z.map((z) => ({ hl: z.hl, ref: z.ref }));

export function mount(host) {
  host.innerHTML = `<div class="w w--split fl">
    <div class="w__main"><div class="fl__land" id="flL" style="--v:0">
      <div class="fl__sky"></div><div class="fl__sun" aria-hidden="true">${sym('sun')}</div>
      <div class="fl__ground"></div><div class="fl__grass"></div>
      <div class="fl__it fl__it--palm" style="--at:.22;left:9%">${sym('palm')}</div>
      <div class="fl__it fl__it--olive" style="--at:.30;left:28%">${sym('olive-tree')}</div>
      <div class="fl__it fl__it--river" style="--at:.46;left:56%">${sym('river')}</div>
      <div class="fl__it fl__it--tree" style="--at:.55;left:78%">${sym('tree')}</div>
      <div class="fl__it fl__it--house" style="--at:.70;left:40%">${sym('house')}</div>
      <div class="fl__it fl__it--vine" style="--at:.76;left:66%">${sym('grapes')}</div>
      <div class="fl__it fl__it--wolf" style="--at:.92;left:14%">${sym('wolf')}</div>
      <div class="fl__it fl__it--sheep" style="--at:.94;left:30%">${sym('sheep')}</div>
    </div></div>
    <div class="w__side">
      <input class="w-range" id="flR" type="range" min="0" max="100" value="0" aria-label="Da terra seca ao jardim renovado" style="--w-track:linear-gradient(90deg,#d9b46a 0%,#8fc07a 55%,#3e9a62 100%)">
      <p class="w__msg" id="flM" aria-live="polite"></p>
    </div></div>`;
  const r = $('#flR', host), land = $('#flL', host), msg = $('#flM', host);
  const items = $$('.fl__it', host).map((el) => ({ el, at: parseFloat(el.style.getPropertyValue('--at')) }));
  let z = -1;
  const upd = () => {
    const v = +r.value;
    land.style.setProperty('--sk1', mixHex('#f3d9a8', '#b9e0f0', v / 100)); land.style.setProperty('--sk2', mixHex('#f6e2b4', '#e8f6d8', v / 100));
    land.style.setProperty('--gr', clamp((v / 100 - 0.12) * 2, 0, 1).toFixed(2));
    items.forEach(({ el, at }) => { const k = clamp((v / 100 - at) * 12, 0, 1); el.style.opacity = k.toFixed(2); el.style.transform = `translateX(-50%) scale(${(0.3 + 0.7 * k).toFixed(2)})`; });
    const k = Z.findIndex((q) => v <= q.ate);
    r.setAttribute('aria-valuetext', ['terra seca', 'o deserto floresce', 'águas vivas', 'casas e vinhas', 'lobo e cordeiro'][k]);
    if (k === z) return; z = k;
    msg.innerHTML = Z[k].msg + refHTML(Z[k].ref, Z[k].hl);
  };
  r.addEventListener('input', upd);
  upd();
}
