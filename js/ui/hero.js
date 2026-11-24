// Cena interativa da página inicial: o caminho, da noite de Belém ao túmulo vazio ao nascer do sol. Cada objeto abre uma história.
const W = 640, H = 540;

const HOTS = [
  { sym: 'star', story: 'noite-em-belem', label: 'Uma noite em Belém', x: 104, y: 232, w: 104, edge: 'l', float: true, glow: true, pd: 0 },
  { sym: 'lighthouse', story: 'montanha', label: 'A montanha e a estrada', x: 262, y: 300, w: 96, pd: 0.6 },
  { sym: 'palm', story: 'hosana', label: 'Hosana!', x: 436, y: 366, w: 84, pd: 1.2 },
  { sym: 'tomb', story: 'ressuscitou', label: 'Ressuscitou!', x: 544, y: 326, w: 124, edge: 'r', glow: true, pd: 1.8 },
  { sym: 'sheep', story: 'bom-pastor', label: 'O bom Pastor', x: 190, y: 458, w: 92, edge: 'l', pd: 2.4 },
  { sym: 'chalice', story: 'ultima-ceia', label: 'A última ceia', x: 352, y: 474, w: 80, pd: 3.0 },
];

const STARS = [[32, 40, 2.4], [90, 90, 1.8], [170, 36, 2.2], [236, 96, 1.6], [300, 50, 2], [60, 150, 1.8], [150, 140, 1.6], [220, 20, 1.5], [350, 110, 1.4]];

function bgSVG() {
  return `<svg class="scene__bg" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">
    ${STARS.map(([x, y, r], i) => `<circle class="scene__tw" cx="${x}" cy="${y}" r="${r}" fill="#fff4d6" style="animation-delay:${(i * 0.43).toFixed(2)}s"/>`).join('')}
    <circle cx="548" cy="300" r="150" fill="url(#g-glow)"/>
    <path d="M0 330C90 290 190 296 290 322S500 296 640 316V540H0z" fill="#aec6d8" opacity=".8"/>
    <path d="M0 392C110 352 230 372 330 388S560 352 640 378V540H0z" fill="url(#g-hill-1)"/>
    <use href="#s-cross" x="322" y="256" width="58" height="58" opacity=".92"/>
    <use href="#s-stable" x="38" y="270" width="132" height="132"/>
    <path d="M70 548C118 490 262 512 300 456S440 400 524 366" fill="none" stroke="#e3c98d" stroke-width="36" stroke-linecap="round"/>
    <path d="M70 548C118 490 262 512 300 456S440 400 524 366" fill="none" stroke="#f6e5b4" stroke-width="24" stroke-linecap="round"/>
    <path d="M70 548C118 490 262 512 300 456S440 400 524 366" fill="none" stroke="#e3c98d" stroke-width="2.4" stroke-dasharray="3 14" stroke-linecap="round" opacity=".9"/>
    <path d="M0 474C140 440 260 480 400 468S580 442 640 460V540H0z" fill="url(#g-hill-2)"/>
    <use href="#s-olive-tree" x="-26" y="336" width="140" height="140"/>
    <use href="#s-olive-tree" x="522" y="414" width="118" height="118"/>
  </svg>`;
}

export function mountHero(host, { onOpen }) {
  host.innerHTML = bgSVG() + HOTS.map((h, i) => `
    <button type="button" class="hot${h.float ? ' hot--float' : ''}${h.glow ? ' hot--glow' : ''}" data-story="${h.story}" ${h.edge ? `data-edge="${h.edge}"` : ''}
      style="left:${(h.x / W * 100).toFixed(2)}%;top:${(h.y / H * 100).toFixed(2)}%;width:${(h.w / W * 100).toFixed(2)}%;--pd:${h.pd}s;--hi:${i}"
      aria-label="${h.label}: abrir história">
      <span class="hot__ping" aria-hidden="true"></span>
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><use href="#s-${h.sym}"/></svg>
      <span class="hot__label" aria-hidden="true">${h.label}</span>
    </button>`).join('');

  const touch = matchMedia('(hover: none)').matches;
  const hint = document.getElementById('heroHint');
  if (hint) hint.textContent = touch ? 'Toque nos objetos do caminho' : 'Passe o mouse nos objetos do caminho';

  let timer = 0;
  const closeAll = () => host.querySelectorAll('.hot.is-open').forEach((b) => b.classList.remove('is-open'));
  host.addEventListener('click', (e) => {
    const b = e.target.closest('.hot'); if (!b) return;
    b.classList.add('is-seen');
    if (touch && !b.classList.contains('is-open')) {
      closeAll(); b.classList.add('is-open');
      clearTimeout(timer); timer = setTimeout(closeAll, 3200);
      return;
    }
    closeAll();
    onOpen(b.dataset.story);
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.hot')) closeAll(); });
}
