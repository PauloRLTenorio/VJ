// Utilitários compartilhados pelas interações.
export const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const sym = (id, cls = '') => `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><use href="#s-${id}"/></svg>`;
export const $ = (s, r) => (r || document).querySelector(s);
export const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// mistura duas cores #rrggbb (t = quanto da cor b entra, de 0 a 1), sem depender de color-mix
export const mixHex = (a, b, t) => {
  const n = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [n(a), n(b)];
  return '#' + x.map((v, i) => Math.round(v * (1 - t) + y[i] * t).toString(16).padStart(2, '0')).join('');
};
export function timers() {
  const ids = [];
  return {
    set(fn, ms) { const id = setTimeout(fn, ms); ids.push(id); return id; },
    clear() { ids.forEach(clearTimeout); ids.length = 0; },
  };
}

// Referência ao livro dentro de uma mensagem: vira link sozinha (js/ui/refs.js); `hl` é a frase que o link destaca na página do livro.
export const refHTML = (ref, hl) => `<small${hl ? ` data-q="${esc(hl)}"` : ''}>${ref}</small>`;

// Arrastar com o ponteiro (mouse, toque, caneta). Chama start/move/end com o evento; o ponteiro fica "capturado" no elemento.
export function drag(el, { start, move, end }) {
  let on = false, id = null;
  el.addEventListener('pointerdown', (e) => {
    if (e.button) return;
    on = true; id = e.pointerId;
    try { el.setPointerCapture(id); } catch (err) { /* ponteiro sintético */ }
    start && start(e);
  });
  el.addEventListener('pointermove', (e) => { if (on && e.pointerId === id) move && move(e); });
  const stop = (e) => { if (!on) return; on = false; try { el.releasePointerCapture(id); } catch (err) { /* ok */ } end && end(e); };
  el.addEventListener('pointerup', stop);
  el.addEventListener('pointercancel', stop);
}

// posição do ponteiro dentro de um elemento, de 0 a 1
export function rel(el, e) {
  const r = el.getBoundingClientRect();
  return { x: clamp((e.clientX - r.left) / r.width, 0, 1), y: clamp((e.clientY - r.top) / r.height, 0, 1), w: r.width, h: r.height };
}

// chuva de estrelinhas (comemoração curta). `host` precisa ter position:relative.
export function burst(host, id = 'star', n = 10) {
  if (reduceMotion()) return;
  const box = document.createElement('div');
  box.className = 'w-burst'; box.setAttribute('aria-hidden', 'true');
  box.innerHTML = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, d = 90 + (i % 3) * 34;
    return `<i style="--bx:${(Math.cos(a) * d).toFixed(0)}%;--by:${(Math.sin(a) * d).toFixed(0)}%;animation-delay:${i * 28}ms">${sym(id)}</i>`;
  }).join('');
  host.appendChild(box);
  setTimeout(() => box.remove(), 1700);
}
