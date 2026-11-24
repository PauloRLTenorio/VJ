// "Vigiai e orai": segure o botão durante a vigília. Soltar cedo é humano: até os três amigos dormiram.
import { sym, $, burst, refHTML, timers } from './util.js';

const TOTAL = 12000;
const FASES = [{ ate: 4000, w: 'Vigiai', t: 'Fique desperto, sem pressa e sem tela.' }, { ate: 8000, w: 'Orai', t: 'Diga a Deus o que pesa em você.' }, { ate: 12000, w: 'Entregue', t: 'Que a vontade dEle seja feita.' }];
const OK = { ref: 'VJ 80.7', hl: 'Todavia, não seja como Eu quero, e sim como Tu queres' };
const CEDO = { ref: 'VJ 81.3', hl: 'O espírito, na verdade, está pronto, mas a carne é fraca' };
export const REFS = [{ hl: OK.hl, ref: OK.ref }, { hl: CEDO.hl, ref: CEDO.ref }];

export function mount(host) {
  const T = timers();
  host.innerHTML = `<div class="w w--split vg" id="vg">
    <div class="w__main"><div class="vg__sky" aria-hidden="true">
      ${[0, 1, 2, 3, 4, 5].map((k) => `<i class="vg__star" style="--k:${k}"></i>`).join('')}
      <div class="vg__moon">${sym('moon')}</div><div class="vg__tree">${sym('olive-tree')}</div>
      <div class="vg__lamp" id="vgL">${sym('lamp')}</div>
    </div></div>
    <div class="w__side vg__side">
      <div class="vg__word" id="vgW" aria-live="polite">Pronto?</div>
      <button type="button" class="vg__btn" id="vgB" aria-label="Segurar para vigiar durante doze segundos. Com o teclado, aperte Enter para começar e de novo para parar."><svg class="vg__ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" pathLength="100"/></svg><span>Segure</span></button>
      <p class="w__msg" id="vgM" aria-live="polite" style="text-align:center">Jesus pediu: “Ficai aqui e vigiai comigo”. Segure por doze segundos.</p>
    </div></div>`;
  const root = $('#vg', host), btn = $('#vgB', host), word = $('#vgW', host), msg = $('#vgM', host), ring = $('.vg__ring circle', host);
  let t0 = 0, raf = 0, on = false, fase = -1;
  const step = () => {
    const dt = performance.now() - t0;
    ring.style.strokeDashoffset = String(100 - Math.min(100, (dt / TOTAL) * 100));
    root.style.setProperty('--p', Math.min(1, dt / TOTAL).toFixed(3));
    const f = FASES.findIndex((q) => dt < q.ate);
    if (f !== fase && f >= 0) { fase = f; word.textContent = FASES[f].w; msg.textContent = FASES[f].t; }
    if (dt >= TOTAL) { done(); return; }
    raf = requestAnimationFrame(step);
  };
  const begin = () => {
    if (on) return; on = true; fase = -1; t0 = performance.now();
    root.classList.add('is-on'); root.classList.remove('is-done'); btn.classList.add('is-hold');
    raf = requestAnimationFrame(step);
  };
  const stop = (cedo) => {
    if (!on) return; on = false; cancelAnimationFrame(raf); btn.classList.remove('is-hold');
    if (cedo) {
      root.classList.remove('is-on'); root.style.setProperty('--p', 0); ring.style.strokeDashoffset = '100'; word.textContent = 'Dormiram…';
      msg.innerHTML = `<b>Vigiar cansa.</b> Até Pedro, Tiago e João dormiram, e Jesus não os reprovou: “O espírito está pronto, mas a carne é fraca.” Tente de novo.${refHTML(CEDO.ref, CEDO.hl)}`;
    }
  };
  const done = () => {
    on = false; btn.classList.remove('is-hold'); root.classList.add('is-done'); word.textContent = 'Seja feita a Tua vontade';
    msg.innerHTML = `<b>Vigília cumprida.</b> Jesus orou três vezes e entregou tudo: “não seja como Eu quero, e sim como Tu queres”.${refHTML(OK.ref, OK.hl)}`;
    burst($('.vg__sky', host), 'star', 10);
  };
  btn.addEventListener('pointerdown', (e) => { e.preventDefault(); try { btn.setPointerCapture(e.pointerId); } catch (err) { /* ok */ } begin(); });
  btn.addEventListener('pointerup', () => stop(performance.now() - t0 < TOTAL));
  btn.addEventListener('pointercancel', () => stop(true));
  btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (e.repeat) return; on ? stop(true) : begin(); } });
  btn.addEventListener('contextmenu', (e) => e.preventDefault());
  return () => { cancelAnimationFrame(raf); T.clear(); };
}
