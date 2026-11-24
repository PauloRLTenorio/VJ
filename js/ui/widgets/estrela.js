// "Siga a estrela": a luz some perto de Jerusalém e volta a guiar os sábios até o Menino.
import { sym, $, refHTML } from './util.js';

const ZONAS = [
  { ate: 34, msg: '<b>Uma estrela nova.</b> Os sábios seguem a luz noite após noite, rumo ao oeste.', ref: 'VJ 16.3', hl: 'Decidiram acompanhá-la e ver aonde ela os levaria' },
  { ate: 62, msg: '<b>A luz enfraquece.</b> Perto de Jerusalém, ela ficou tão frágil que eles não puderam mais segui-la. Foram perguntar na cidade.', ref: 'VJ 16.3', hl: 'sua luz tornou-se tão frágil que não puderam mais segui-la' },
  { ate: 99, msg: '<b>A estrela volta.</b> Depois de ouvirem o rei, partiram, e a estrela os precedia outra vez.', ref: 'VJ 16.7', hl: 'a estrela que viram no Oriente os precedia' },
  { ate: 100, msg: '<b>Chegaram!</b> A estrela parou sobre onde estava o Menino, e eles se alegraram com grande e intenso júbilo.', ref: 'VJ 16.7', hl: 'chegando, parou sobre onde estava o Menino' },
];
export const REFS = ZONAS.map((z) => ({ hl: z.hl, ref: z.ref }));
const brilho = (v) => (v < 30 ? 1 : v < 56 ? 1 - ((v - 30) / 26) * 0.88 : v < 66 ? 0.12 : 0.12 + ((v - 66) / 34) * 0.88);

export function mount(host) {
  host.innerHTML = `<div class="w w--split es">
    <div class="w__main"><div class="es__sky" id="esK">
      <i class="es__star es__star--a"></i><i class="es__star es__star--b"></i><i class="es__star es__star--c"></i>
      <div class="es__pin" style="left:12%">${sym('mountain')}<span>Oriente</span></div>
      <div class="es__pin" style="left:56%">${sym('temple')}<span>Jerusalém</span></div>
      <div class="es__pin" style="left:88%">${sym('stable')}<span>Belém</span></div>
      <div class="es__way" id="esW"><div class="es__trav">${sym('camel')}</div></div>
      <div class="es__lead" id="esL">${sym('star')}</div>
    </div></div>
    <div class="w__side">
      <input class="w-range" id="esR" type="range" min="0" max="100" value="0" aria-label="Caminho dos sábios, do Oriente a Belém" style="--w-track:linear-gradient(90deg,#f4c25a 0%,#f4c25a 28%,#5b6aa8 36%,#5b6aa8 62%,#f4c25a 72%,#f4c25a 100%)">
      <p class="w__msg" id="esM" aria-live="polite"></p>
    </div></div>`;
  const r = $('#esR', host), lead = $('#esL', host), trav = $('.es__trav', host), msg = $('#esM', host), sky = $('#esK', host);
  let zona = -1;
  const upd = () => {
    const v = +r.value;
    const x = 12 + v * 0.76;
    trav.style.left = `${x}%`; lead.style.left = `${x + 1}%`;
    lead.style.opacity = brilho(v).toFixed(2);
    lead.style.transform = `translate(-50%, 0) scale(${(0.7 + brilho(v) * 0.5).toFixed(2)})`;
    lead.style.top = v >= 100 ? '34%' : '12%';
    sky.classList.toggle('is-end', v >= 100);
    const z = ZONAS.findIndex((q) => v <= q.ate);
    r.setAttribute('aria-valuetext', ['a caminho', 'perto de Jerusalém', 'saindo de Jerusalém', 'em Belém'][z]);
    if (z === zona) return; zona = z;
    msg.innerHTML = ZONAS[z].msg + refHTML(ZONAS[z].ref, ZONAS[z].hl);
  };
  r.addEventListener('input', upd);
  upd();
}
