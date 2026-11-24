// "Procure a ovelha perdida": arraste a lanterna pela noite até achar a ovelha que ficou para trás.
import { sym, $, clamp, drag, rel, burst, refHTML, timers, reduceMotion } from './util.js';

const FIM = { ref: 'VJ 56.8–9', hl: 'toma-a nos braços e a leva de volta ao redil' };
export const REFS = [{ hl: FIM.hl, ref: FIM.ref }, { hl: 'Alegrai-vos comigo, porque já achei a minha ovelha perdida', ref: 'VJ 56.9' }];

export function mount(host) {
  const T = timers();
  host.innerHTML = `<div class="w w--split ov">
    <div class="w__main"><div class="ov__field" id="ovF" tabindex="0" aria-label="Campo à noite. Arraste a lanterna para procurar a ovelha perdida. Também é possível usar as setas do teclado.">
      <div class="ov__lost" id="ovL" aria-hidden="true">${sym('sheep')}</div>
      <div class="ov__dark" id="ovD"></div>
      <div class="ov__fold" aria-hidden="true"><i class="ov__fence"></i>${[0, 1, 2, 3].map((k) => `<span class="ov__sheep" style="--k:${k}">${sym('sheep')}</span>`).join('')}</div>
      <div class="ov__lantern" id="ovT" aria-hidden="true">${sym('lantern')}</div>
      <div class="ov__hint" id="ovH" aria-hidden="true">Arraste a luz</div>
    </div></div>
    <div class="w__side"><p class="w__msg" id="ovM" aria-live="polite">Noventa e nove ovelhas estão seguras. Uma se perdeu no escuro. Procure com a lanterna.</p>
      <div class="w-row"><button type="button" class="w-btn" id="ovR" hidden>Procurar de novo</button></div></div></div>`;
  const field = $('#ovF', host), lost = $('#ovL', host), dark = $('#ovD', host), lan = $('#ovT', host), msg = $('#ovM', host), hint = $('#ovH', host), again = $('#ovR', host);
  let sx = 0.2, sy = 0.5, lx = 0.2, ly = 0.6, achou = false;
  const sorteia = () => { sx = 0.5 + Math.random() * 0.42; sy = 0.3 + Math.random() * 0.55; };
  const paint = () => {
    dark.style.setProperty('--x', `${(lx * 100).toFixed(1)}%`); dark.style.setProperty('--y', `${(ly * 100).toFixed(1)}%`);
    lan.style.left = `${(lx * 100).toFixed(1)}%`; lan.style.top = `${(ly * 100).toFixed(1)}%`;
    if (!achou) { lost.style.left = `${(sx * 100).toFixed(1)}%`; lost.style.top = `${(sy * 100).toFixed(1)}%`; }
  };
  const check = () => {
    if (achou) return;
    const r = field.getBoundingClientRect();
    const d = Math.hypot((lx - sx) * r.width, (ly - sy) * r.height);
    if (d < Math.max(34, r.height * 0.13)) found();
  };
  function found() {
    achou = true;
    field.classList.add('is-found');
    lost.classList.add('is-home');
    lost.style.left = '19%'; lost.style.top = '62%';
    msg.innerHTML = `<b>Achou!</b> O pastor toma a ovelha nos braços e a leva de volta, sem queixa. “Alegrai-vos comigo, porque já achei a minha ovelha perdida.”${refHTML(FIM.ref, FIM.hl)}`;
    again.hidden = false; hint.textContent = '';
    burst(field, 'star', 12);
  }
  const mover = (e) => { const p = rel(field, e); lx = p.x; ly = clamp(p.y - 0.06, 0, 1); paint(); check(); hint.style.opacity = 0; };
  drag(field, { start: mover, move: mover, end: () => {} });
  field.addEventListener('keydown', (e) => {
    const d = { ArrowLeft: [-0.07, 0], ArrowRight: [0.07, 0], ArrowUp: [0, -0.07], ArrowDown: [0, 0.07] }[e.key];
    if (!d) return;
    e.preventDefault(); lx = clamp(lx + d[0], 0, 1); ly = clamp(ly + d[1], 0, 1); paint(); check(); hint.style.opacity = 0;
  });
  again.addEventListener('click', () => {
    achou = false; field.classList.remove('is-found'); lost.classList.remove('is-home', 'is-glint');
    sorteia(); lx = 0.2; ly = 0.6; again.hidden = true; hint.textContent = 'Arraste a luz'; hint.style.opacity = 1;
    msg.textContent = 'De novo: a ovelha se perdeu em outro lugar do escuro.'; paint(); armaDica();
  });
  // depois de um tempo sem achar, um brilho discreto mostra o rumo (para ninguém desistir)
  function armaDica() { T.clear(); if (!reduceMotion()) T.set(() => { if (!achou) lost.classList.add('is-glint'); }, 16000); }
  sorteia(); paint(); armaDica();
  return () => T.clear();
}
