// "Puxe a corda do poço": arraste o balde até a água e traga de volta. Três baldes e a água viva "jorra".
import { sym, $, $$, clamp, drag, rel, burst, refHTML } from './util.js';

const MSG = [
  { msg: '<b>Água viva.</b> Jesus disse à mulher de Samaria que, se ela pedisse, receberia uma água que mata a sede de verdade.', ref: 'VJ 40.2', hl: 'Cristo lhe disse que se ela quisesse, Ele lhe daria água viva' },
  { msg: '<b>Mais um balde.</b> O livro explica: a água viva é o Espírito Santo. Como o viajante sedento precisa de água, precisamos do Espírito de Deus no coração.', ref: 'VJ 40.4', hl: 'A água viva simboliza o Espírito Santo' },
  { msg: '<b>A fonte jorra!</b> Quem recebe essa água não guarda só para si: ela “será nele uma fonte a jorrar”, e quer que os outros também tenham.', ref: 'VJ 40.5', hl: 'Tal é a nossa alegria, que desejamos que os outros também a tenham' },
];
export const REFS = MSG.map((m) => ({ hl: m.hl, ref: m.ref }));

export function mount(host) {
  let n = 0, cheio = false, y = 0;
  host.innerHTML = `<div class="w w--split pc">
    <div class="w__main"><div class="pc__stage" id="pcS" tabindex="0" role="slider" aria-label="Corda do poço: arraste para baixo e para cima" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <svg class="pc__svg" viewBox="0 0 200 230" aria-hidden="true">
        <rect x="20" y="14" width="160" height="9" rx="4" fill="var(--c-wood-l)"/>
        <rect x="26" y="22" width="7" height="50" rx="2" fill="var(--c-wood)"/><rect x="167" y="22" width="7" height="50" rx="2" fill="var(--c-wood)"/>
        <path d="M14 16L100 0l86 16z" fill="var(--c-wood)"/>
        <rect x="40" y="70" width="20" height="150" fill="var(--c-stone)"/><rect x="140" y="70" width="20" height="150" fill="var(--c-stone)"/>
        <path d="M36 70h28M136 70h28" stroke="var(--c-stone-d)" stroke-width="5" stroke-linecap="round"/>
        <rect x="60" y="70" width="80" height="150" fill="#2a2640"/>
        <g stroke="var(--c-stone-d)" stroke-width="2" opacity=".6"><path d="M40 100h20M40 130h20M40 160h20M40 190h20M140 90h20M140 120h20M140 150h20M140 180h20"/></g>
        <path d="M60 188c14-6 26-6 40 0s26 6 40 0V220H60z" fill="var(--c-water)"/>
        <path d="M60 188c14-6 26-6 40 0s26 6 40 0" fill="none" stroke="#fff" stroke-width="2.4" opacity=".6"/>
        <line id="pcRope" x1="100" y1="23" x2="100" y2="80" stroke="#b08a5a" stroke-width="3"/>
        <g id="pcBucket" transform="translate(0 80)"><path d="M86 0h28l-3 22H89z" fill="var(--c-wood-l)"/><path d="M86 0h28" stroke="var(--c-wood-d)" stroke-width="3"/><ellipse id="pcW" cx="100" cy="2" rx="12" ry="3" fill="var(--c-water)" opacity="0"/></g>
      </svg>
      <div class="pc__hint" id="pcH">Arraste a corda ↓</div>
    </div></div>
    <div class="w__side"><div class="pc__drops" aria-label="Baldes puxados">${[0, 1, 2].map(() => `<span class="pc__drop">${sym('drop')}</span>`).join('')}</div>
    <p class="w__msg" id="pcM" aria-live="polite">Abaixe o balde até a água e puxe de volta. Faça isso três vezes.</p></div></div>`;
  const stage = $('#pcS', host), bucket = $('#pcBucket', host), rope = $('#pcRope', host), water = $('#pcW', host), msg = $('#pcM', host), hint = $('#pcH', host);
  const TOP = 80, BOT = 176;
  const set = (v) => {
    y = clamp(v, 0, 1);
    const py = TOP + y * (BOT - TOP);
    bucket.setAttribute('transform', `translate(0 ${py.toFixed(1)})`);
    rope.setAttribute('y2', py.toFixed(1));
    stage.setAttribute('aria-valuenow', Math.round(y * 100));
    if (y > 0.96 && !cheio) { cheio = true; water.setAttribute('opacity', '.95'); hint.textContent = 'Agora puxe para cima ↑'; }
    if (y < 0.06 && cheio) {
      cheio = false; water.setAttribute('opacity', '0');
      const k = n; n++;
      $$('.pc__drop', host).forEach((d, i) => d.classList.toggle('is-on', i < n));
      msg.innerHTML = MSG[k].msg + refHTML(MSG[k].ref, MSG[k].hl);
      hint.textContent = n >= 3 ? 'A fonte jorra!' : 'Arraste a corda ↓';
      if (n >= 3) { stage.classList.add('is-spring'); burst(stage, 'drop', 12); n = 0; setTimeout(() => $$('.pc__drop', host).forEach((d) => d.classList.remove('is-on')), 3200); }
    }
  };
  drag(stage, { start: (e) => { stage.classList.add('is-drag'); set(rel(stage, e).y * 1.15 - 0.05); }, move: (e) => set(rel(stage, e).y * 1.15 - 0.05), end: () => { stage.classList.remove('is-drag'); } });
  stage.addEventListener('keydown', (e) => {
    const d = e.key === 'ArrowDown' ? 0.15 : e.key === 'ArrowUp' ? -0.15 : 0;
    if (d) { e.preventDefault(); set(y + d); }
  });
  set(0);
}
