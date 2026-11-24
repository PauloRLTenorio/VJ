// "Do meio-dia às três": o céu escurece por três horas e a luz volta. Sóbrio: só o céu e a cruz.
import { sym, $, refHTML } from './util.js';

const Z = [
  { ate: 8, msg: '<b>Meio-dia.</b> O Sol brilhava no céu.', ref: 'VJ 112.1', hl: 'O Sol, que até o meio-dia havia brilhado no firmamento' },
  { ate: 88, msg: '<b>De repente, escuridão.</b> O Sol negou o seu brilho e tudo ficou como a noite mais escura, por três horas. As zombarias pararam e o silêncio tomou a multidão.', ref: 'VJ 112.1–2', hl: 'Essa escuridão sobrenatural durou três horas completas' },
  { ate: 99, msg: '<b>Quase três horas.</b> A dor maior não era a do corpo: era o peso do pecado do mundo e a separação do Pai.', ref: 'VJ 111.1', hl: 'o peso esmagador do pecado do mundo que O separava do amor de Seu Pai' },
  { ate: 100, msg: '<b>“Está consumado!”</b> A sombra se dissipou, uma luz inundou a cruz e a obra estava completa.', ref: 'VJ 112.7–9', hl: 'Uma luz inundou a cruz' },
];
export const REFS = Z.map((z) => ({ hl: z.hl, ref: z.ref }));
const hora = (v) => { const m = Math.round((v / 100) * 180); return `${12 + Math.floor(m / 60)}h${String(m % 60).padStart(2, '0')}`; };
const escuro = (v) => (v < 6 ? 0 : v < 16 ? (v - 6) / 10 : v < 88 ? 1 : v < 100 ? 1 - ((v - 88) / 12) * 0.55 : 0.12);

export function mount(host) {
  host.innerHTML = `<div class="w w--split tv">
    <div class="w__main"><div class="tv__sky" id="tvK">
      <div class="tv__sun" id="tvS">${sym('sun')}</div>
      <div class="tv__cross">${sym('cross')}</div>
      <div class="tv__shade" id="tvD"></div>
      <div class="tv__clock" id="tvC" aria-hidden="true">12h00</div>
      <div class="tv__ray" id="tvY" aria-hidden="true"></div>
    </div></div>
    <div class="w__side">
      <input class="w-range" id="tvR" type="range" min="0" max="100" value="0" aria-label="Hora, do meio-dia às três da tarde" style="--w-track:linear-gradient(90deg,#f4c25a 0%,#f4c25a 6%,#2b2d4f 16%,#2b2d4f 88%,#f4c25a 100%)">
      <p class="w__msg" id="tvM" aria-live="polite"></p>
    </div></div>`;
  const r = $('#tvR', host), msg = $('#tvM', host), sun = $('#tvS', host), shade = $('#tvD', host), clk = $('#tvC', host), ray = $('#tvY', host), sky = $('#tvK', host);
  let z = -1;
  const upd = () => {
    const v = +r.value;
    shade.style.opacity = escuro(v).toFixed(2);
    sun.style.opacity = (v < 6 ? 1 : v < 16 ? 1 - (v - 6) / 10 : v < 99 ? 0 : 0.3).toFixed(2);
    ray.style.opacity = v >= 100 ? 1 : 0;
    clk.textContent = hora(v);
    sky.classList.toggle('is-lit', v >= 100);
    r.setAttribute('aria-valuetext', hora(v));
    const k = Z.findIndex((q) => v <= q.ate);
    if (k === z) return; z = k;
    msg.innerHTML = Z[k].msg + refHTML(Z[k].ref, Z[k].hl);
  };
  r.addEventListener('input', upd);
  upd();
}
