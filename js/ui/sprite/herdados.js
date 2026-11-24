// Símbolos do modelo anterior, reaproveitados (cores por variáveis CSS). Os demais são desenhados para o VJ nos outros módulos.
const grape = (cx, cy, r = 11) => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--c-grape)"/>
  <circle cx="${cx + r * 0.25}" cy="${cy + r * 0.3}" r="${r * 0.7}" fill="var(--c-grape-d)" opacity=".35"/>
  <circle cx="${cx - r * 0.35}" cy="${cy - r * 0.35}" r="${r * 0.26}" fill="#fff" opacity=".5"/>`;

const grain = (x, y, rot) =>
  `<ellipse cx="${x}" cy="${y}" rx="5.2" ry="10" transform="rotate(${rot} ${x} ${y})" fill="var(--c-wheat)"/>
   <ellipse cx="${x + (rot > 0 ? 1.2 : -1.2)}" cy="${y + 1}" rx="2.2" ry="7" transform="rotate(${rot} ${x} ${y})" fill="var(--c-wheat-d)" opacity=".45"/>`;

const rays = (n, r1, r2, w) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i * 360) / n;
    return `<rect x="${50 - w / 2}" y="${50 - r2}" width="${w}" height="${r2 - r1}" rx="${w / 2}" transform="rotate(${a} 50 50)"/>`;
  }).join('');

export const HERDADOS = `
<symbol id="s-sun" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="url(#g-glow)"/>
  <g fill="var(--sun)">${rays(12, 31, 44, 5)}</g>
  <circle cx="50" cy="50" r="22" fill="var(--sun-2)"/>
  <circle cx="50" cy="50" r="22" fill="none" stroke="var(--sun)" stroke-width="3"/>
  <ellipse cx="43" cy="43" rx="5" ry="8" transform="rotate(35 43 43)" fill="#fff" opacity=".45"/>
</symbol>

<symbol id="s-cloud" viewBox="0 0 100 100">
  <path d="M26 74c-11 0-18-8-18-17 0-9 7-16 16-16 2-12 12-20 25-20 14 0 24 9 26 21 9 1 15 7 15 16 0 9-7 16-17 16z" fill="var(--c-white)"/>
  <path d="M82 57c0 9-7 17-17 17H26c-11 0-18-8-18-17 12 8 40 9 74 0z" fill="#d8e3ea" opacity=".6"/>
</symbol>

<symbol id="s-moon" viewBox="0 0 100 100">
  <path d="M62 12A40 40 0 1 0 90 66 32 32 0 0 1 62 12z" fill="var(--sun-2)"/>
  <circle cx="40" cy="58" r="5" fill="var(--sun)" opacity=".5"/><circle cx="52" cy="76" r="3.4" fill="var(--sun)" opacity=".5"/><circle cx="32" cy="38" r="3" fill="var(--sun)" opacity=".5"/>
</symbol>

<symbol id="s-wheat" viewBox="0 0 100 100">
  <path d="M50 96V22" stroke="var(--c-wheat-d)" stroke-width="3.4" stroke-linecap="round"/>
  ${grain(39, 30, -32)}${grain(61, 30, 32)}${grain(38, 46, -34)}${grain(62, 46, 34)}${grain(37, 62, -36)}${grain(63, 62, 36)}
  <ellipse cx="50" cy="13" rx="5.2" ry="11" fill="var(--c-wheat)"/>
  <ellipse cx="51" cy="14" rx="2.2" ry="8" fill="var(--c-wheat-d)" opacity=".45"/>
</symbol>

<symbol id="s-bread" viewBox="0 0 100 100">
  <path d="M12 58c0-18 17-31 38-31s38 13 38 31c0 8-4 12-9 13v15c0 3-2 5-5 5H26c-3 0-5-2-5-5V71c-5-1-9-5-9-13z" fill="var(--c-bread)"/>
  <path d="M12 58c0-18 17-31 38-31s38 13 38 31c0 4-1 7-3 9-3-14-18-25-35-25S18 53 15 67c-2-2-3-5-3-9z" fill="var(--c-crust)" opacity=".55"/>
  <path d="M33 42l9 16M48 38l9 17M63 42l9 16" stroke="var(--c-cream)" stroke-width="5.5" stroke-linecap="round" opacity=".85"/>
  <path d="M26 82h48" stroke="var(--c-bread-d)" stroke-width="3" stroke-linecap="round" opacity=".6"/>
</symbol>

<symbol id="s-heart" viewBox="0 0 100 100">
  <path d="M50 88C20 66 8 48 8 32 8 18 19 10 31 10c8 0 15 4 19 11 4-7 11-11 19-11 12 0 23 8 23 22 0 16-12 34-42 56z" fill="#e0524c"/>
  <path d="M50 21c4-7 11-11 19-11 12 0 23 8 23 22 0 16-12 34-42 56 20-18 30-36 26-52-1-7-8-12-26-15z" fill="#b4302a" opacity=".4"/>
  <ellipse cx="26" cy="30" rx="4.4" ry="8" transform="rotate(35 26 30)" fill="#fff" opacity=".45"/>
</symbol>

<symbol id="s-leaf" viewBox="0 0 100 100">
  <path d="M16 84C10 42 42 12 88 12 92 58 62 88 16 84z" fill="var(--c-leaf)"/>
  <path d="M88 12C92 58 62 88 16 84 50 76 74 52 88 12z" fill="var(--c-leaf-d)" opacity=".4"/>
  <path d="M18 82C40 62 62 40 84 16" stroke="var(--c-leaf-d)" stroke-width="2.6" stroke-linecap="round" fill="none"/>
  <path d="M42 62l-2-14M56 48l-1-14M32 72l-12-4M54 60l12 2" stroke="var(--c-leaf-d)" stroke-width="2" stroke-linecap="round" fill="none"/>
</symbol>

<symbol id="s-seedling" viewBox="0 0 100 100">
  <ellipse cx="50" cy="86" rx="30" ry="10" fill="#7a5233"/>
  <ellipse cx="50" cy="83" rx="30" ry="9" fill="#946541"/>
  <path d="M50 84C50 66 49 56 50 44" stroke="var(--c-leaf-d)" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M50 52C34 54 22 46 20 30c16-2 28 6 30 22z" fill="var(--c-leaf)"/>
  <path d="M50 44C54 28 66 18 82 18c0 18-12 28-32 26z" fill="var(--c-leaf-d)"/>
  <path d="M26 34c8 4 14 10 20 16M78 22c-8 6-16 14-24 20" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".4"/>
</symbol>

<symbol id="s-drop" viewBox="0 0 100 100">
  <path d="M50 8C36 32 20 46 20 64c0 18 13 28 30 28s30-10 30-28C80 46 64 32 50 8z" fill="var(--c-water)"/>
  <path d="M50 8c14 24 30 38 30 56 0 18-13 28-30 28 16-8 22-22 20-38-1-12-8-24-20-46z" fill="var(--c-water-d)" opacity=".4"/>
  <path d="M34 62c0 8 4 14 10 17" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>
</symbol>

<symbol id="s-grapes" viewBox="0 0 100 100">
  <path d="M50 22c0-8 3-12 8-14" stroke="var(--c-wood-d)" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M54 14c6-8 20-8 26 0-5 9-19 11-26 0z" fill="var(--c-leaf)"/>
  ${grape(32, 38)}${grape(50, 36)}${grape(68, 38)}
  ${grape(41, 53)}${grape(59, 53)}${grape(32, 56, 0)}
  ${grape(50, 68)}${grape(33, 66, 0)}
  ${grape(41, 74, 0)}
</symbol>

<symbol id="s-book" viewBox="0 0 100 100">
  <path d="M6 28c16-6 32-4 44 4v54c-12-8-28-10-44-4z" fill="#f6ecd2" stroke="#d9c9a3" stroke-width="2"/>
  <path d="M94 28c-16-6-32-4-44 4v54c12-8 28-10 44-4z" fill="#fff8e6" stroke="#d9c9a3" stroke-width="2"/>
  <path d="M6 82c16-6 32-4 44 4 12-8 28-10 44-4v6c-16-5-32-3-44 5-12-8-28-10-44-5z" fill="var(--c-forest-2)"/>
  <path d="M15 40c8-2 16-1 24 2M15 50c8-2 16-1 24 2M15 60c8-2 16-1 24 2M61 42c8-3 16-4 24-2M61 52c8-3 16-4 24-2" stroke="#c9b98f" stroke-width="2.4" stroke-linecap="round" fill="none"/>
  <path d="M50 32v54" stroke="#d9c9a3" stroke-width="2"/>
</symbol>

<symbol id="s-hands" viewBox="0 0 100 100">
  <path d="M10 62c8-10 18-16 30-16h14c6 0 10 6 6 10-2 2-4 3-8 3H44c-2 0-2 3 0 3h26c6 0 14-4 20-10l4 8c-8 12-20 20-34 20H30c-8 0-14-4-20-10z" fill="var(--c-skin)"/>
  <path d="M10 62c6 6 12 10 20 10h22c-8 8-22 12-34 10-6-1-10-6-8-12z" fill="var(--c-skin-d)" opacity=".5"/>
  <path d="M50 44c-10-8-16-14-16-22 0-6 4-10 9-10 3 0 6 2 7 5 1-3 4-5 7-5 5 0 9 4 9 10 0 8-6 14-16 22z" fill="#e0524c"/>
</symbol>

<symbol id="s-feet" viewBox="0 0 100 100">
  <g fill="var(--c-forest-2)">
    <ellipse cx="34" cy="62" rx="13" ry="20" transform="rotate(-8 34 62)"/>
    <circle cx="26" cy="36" r="4.6"/><circle cx="35" cy="32" r="4.6"/><circle cx="44" cy="33" r="4.2"/><circle cx="50" cy="39" r="3.6"/>
    <ellipse cx="68" cy="44" rx="13" ry="20" transform="rotate(8 68 44)"/>
    <circle cx="60" cy="18" r="4.6"/><circle cx="69" cy="14" r="4.6"/><circle cx="78" cy="15" r="4.2"/><circle cx="84" cy="21" r="3.6"/>
  </g>
</symbol>

<symbol id="s-house" viewBox="0 0 100 100">
  <path d="M14 48L50 16l36 32z" fill="var(--terra)"/>
  <path d="M50 16l36 32H50z" fill="#000" opacity=".12"/>
  <rect x="22" y="46" width="56" height="42" rx="3" fill="var(--c-cream)"/>
  <rect x="42" y="62" width="16" height="26" rx="8" fill="var(--c-wood)"/>
  <rect x="27" y="54" width="12" height="12" rx="2" fill="var(--c-water)"/><rect x="61" y="54" width="12" height="12" rx="2" fill="var(--c-water)"/>
  <rect x="66" y="22" width="9" height="16" fill="var(--c-wood-d)"/>
</symbol>

<symbol id="s-jug" viewBox="0 0 100 100">
  <path d="M30 22h38l8 12c3 22 1 44-8 56H32c-9-12-11-34-8-56z" fill="#e8f6fb" stroke="#bfe0ec" stroke-width="2.5"/>
  <path d="M27 50h46c1 14-1 30-7 40H33c-6-10-8-26-6-40z" fill="var(--c-water)"/>
  <path d="M27 50h46" stroke="#fff" stroke-width="3" opacity=".6"/>
  <path d="M74 38c14-2 18 10 14 20-3 8-10 10-14 8" stroke="#bfe0ec" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M36 32c-2 14-2 28 2 44" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7" fill="none"/>
  <path d="M30 22c-5 0-8-4-8-8 6 2 14 4 20 8z" fill="#e8f6fb" stroke="#bfe0ec" stroke-width="2"/>
</symbol>

<symbol id="s-glass" viewBox="0 0 100 100">
  <path d="M26 16h48l-6 72c0 3-2 5-5 5H37c-3 0-5-2-5-5z" fill="#eaf7fb" stroke="#bfe0ec" stroke-width="2.5"/>
  <path d="M29 42h42l-4 46H33z" fill="var(--c-water)"/>
  <path d="M29 42h42" stroke="#fff" stroke-width="3" opacity=".6"/>
  <path d="M36 22l3 60" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
</symbol>
`;
