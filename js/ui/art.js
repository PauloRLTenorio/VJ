// Composição de cenas: posiciona ilustrações (símbolos do sprite) num "palco" e cria cenários de fundo.

export const icon = (id, cls = '') =>
  `<svg class="ic ${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><use href="#s-${id}"/></svg>`;

// [x%, y%, tamanho (cqmin)]
const LAYOUTS = {
  one: [[50, 52, 66]],
  two: [[31, 54, 46], [70, 47, 46]],
  three: [[50, 31, 42], [29, 66, 40], [71, 66, 40]],
  four: [[32, 36, 40], [68, 34, 40], [32, 68, 40], [68, 66, 40]],
  five: [[50, 26, 36], [25, 50, 34], [75, 50, 34], [36, 76, 32], [64, 76, 32]],
  orbit: [[50, 52, 52], [21, 25, 27], [79, 25, 27], [20, 79, 25], [80, 79, 25]],
};

export function layoutFor(n, name) {
  if (name && LAYOUTS[name]) return LAYOUTS[name].slice(0, n);
  const key = ['', 'one', 'two', 'three', 'four', 'five'][Math.min(n, 5)];
  return LAYOUTS[key].slice(0, n);
}

export function itemsHTML(art) {
  if (!art || !art.items) return '';
  const pos = layoutFor(art.items.length, art.layout);
  const anim = art.anim || 'float';
  return art.items
    .map((id, i) => {
      const [x, y, s] = pos[i] || [50, 50, 30];
      const rot = ((i % 2 ? 1 : -1) * (2 + i * 1.5)).toFixed(1);
      return `<span class="it it--${anim}" style="left:${x}%;top:${y}%;--s:${s};--d:${(i * 0.13).toFixed(2)}s;--r:${rot}deg"><svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><use href="#s-${id}"/></svg></span>`;
    })
    .join('');
}

const STARS = [[12, 14, 1.4], [28, 26, 1], [44, 10, 1.2], [60, 22, 1.6], [76, 12, 1], [88, 28, 1.3], [20, 44, 1], [92, 48, 1.1], [8, 62, 1.2], [70, 40, 0.9]];

export function backdropHTML(name) {
  switch (name) {
    case 'garden':
      return `<div class="bd bd--garden"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle class="bd-sun" cx="16" cy="18" r="16" fill="url(#g-glow)"/>
        <path d="M-5 76C15 64 38 64 58 73S92 80 105 68V105H-5z" fill="url(#g-hill-1)"/>
        <path d="M-5 88C22 78 52 82 74 86S96 88 105 82V105H-5z" fill="url(#g-hill-2)"/>
        <path d="M-5 98C25 92 60 96 105 94V105H-5z" fill="url(#g-hill-3)"/></svg>
        ${[[12, 7, 22, 0], [34, 9, 28, 6], [58, 6, 25, 11], [78, 8, 30, 3], [92, 7, 26, 9]].map(([x, z, t, d], i) => `<i class="bd-leaf" style="--x:${x}%;--s:${z};--t:${t}s;--d:-${d}s;--dx:${i % 2 ? 40 : -40}"></i>`).join('')}</div>`;
    case 'dawn':
      return `<div class="bd bd--dawn"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle class="bd-sunr" cx="50" cy="70" r="34" fill="url(#g-glow)"/>
        <circle cx="50" cy="72" r="9" fill="#fff6d0" opacity=".95"/>
        <path d="M-5 76C18 66 40 68 58 74S92 82 105 72V105H-5z" fill="url(#g-hill-1)"/>
        <path d="M-5 88C22 78 52 82 74 86S96 88 105 82V105H-5z" fill="url(#g-hill-2)"/>
        <path d="M-5 98C25 92 60 96 105 94V105H-5z" fill="url(#g-hill-3)"/></svg>
        ${[[18, 20, 14], [46, 12, 19], [72, 24, 11], [86, 14, 16]].map(([x, y, t], i) => `<i class="bd-fly" style="--x:${x}%;--y:${y}%;--t:${t}s;--d:-${i * 3.1}s"></i>`).join('')}</div>`;
    case 'desert':
      return `<div class="bd bd--desert"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <circle class="bd-sunr" cx="80" cy="20" r="20" fill="url(#g-glow)" style="transform-origin:80px 20px"/>
        <circle cx="80" cy="20" r="6.5" fill="#fff6d0"/>
        <path d="M-5 70C20 58 40 60 60 68S92 74 105 64V105H-5z" fill="#ecd29a"/>
        <path d="M-5 84C25 74 55 80 78 84S98 86 105 80V105H-5z" fill="#dcb872"/>
        <path d="M-5 96C30 90 60 96 105 92V105H-5z" fill="#c9a05e"/></svg></div>`;
    case 'dusk':
      return `<div class="bd bd--dusk" aria-hidden="true">${STARS.slice(0, 6).map(([x, y, s], i) => `<i class="bd-star" style="left:${x}%;top:${y}%;--s:${s};--d:${(i * 0.5).toFixed(2)}s"></i>`).join('')}
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice"><path d="M-5 74C15 64 38 66 58 74S92 80 105 70V105H-5z" fill="#6a4f9a" opacity=".5"/><path d="M-5 88C22 78 52 82 74 86S96 88 105 82V105H-5z" fill="#4a3578" opacity=".6"/></svg></div>`;
    case 'sky':
      return `<div class="bd bd--sky" aria-hidden="true">
        <i class="bd-cloud" style="--y:10%;--s:34;--t:58s;--o:.0s"><svg viewBox="0 0 100 100"><use href="#s-cloud"/></svg></i>
        <i class="bd-cloud" style="--y:30%;--s:22;--t:80s;--o:-30s"><svg viewBox="0 0 100 100"><use href="#s-cloud"/></svg></i>
        <i class="bd-cloud" style="--y:62%;--s:28;--t:68s;--o:-12s"><svg viewBox="0 0 100 100"><use href="#s-cloud"/></svg></i></div>`;
    case 'glow':
      return '<div class="bd bd--glow" aria-hidden="true"><i></i><i></i></div>';
    case 'night':
      return `<div class="bd bd--night" aria-hidden="true">${STARS.map(([x, y, s], i) => `<i class="bd-star" style="left:${x}%;top:${y}%;--s:${s};--d:${(i * 0.37).toFixed(2)}s"></i>`).join('')}${[[22, 58, 9], [64, 70, 12], [80, 46, 7], [40, 80, 14]].map(([x, y, t], i) => `<i class="bd-fly" style="--x:${x}%;--y:${y}%;--t:${t}s;--d:-${i * 2.3}s"></i>`).join('')}</div>`;
    case 'water':
      return `<div class="bd bd--water" aria-hidden="true"><svg viewBox="0 0 200 60" preserveAspectRatio="none">
        <path class="w1" d="M0 30c25-14 50-14 75 0s50 14 75 0 50-14 75 0V60H0z"/>
        <path class="w2" d="M0 38c25-12 50-12 75 0s50 12 75 0 50-12 75 0V60H0z"/></svg>
        ${[[14, 9, 9], [38, 6, 12], [61, 11, 8], [83, 7, 11]].map(([x, z, t], i) => `<i class="bd-bub" style="--x:${x}%;--s:${z};--t:${t}s;--d:-${i * 2.1}s"></i>`).join('')}</div>`;
    default:
      return '<div class="bd bd--plain" aria-hidden="true"><i></i><i></i></div>';
  }
}

export function stageHTML(art, scene, imgUrl = '') {
  if (imgUrl) return `<div class="stage stage--img"><img src="${imgUrl}" alt="" decoding="async"></div>`;
  return `<div class="stage">${backdropHTML(scene)}<div class="stage__items">${itemsHTML(art)}</div></div>`;
}
