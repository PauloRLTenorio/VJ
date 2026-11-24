// Ilustrações do VJ — natureza e céu (viewBox 0 0 100 100, cores por variáveis CSS; sem rostos de pessoas).

// ramo de palmeira: haste curva com folhas aos pares
const frond = () => {
  const P = (t) => { const a = 1 - t; return [a * a * 20 + 2 * a * t * 22 + t * t * 84, a * a * 94 + 2 * a * t * 34 + t * t * 14]; };
  const D = (t) => { const a = 1 - t; const dx = 2 * a * 2 + 2 * t * 62, dy = 2 * a * -60 + 2 * t * -20; const l = Math.hypot(dx, dy); return [dx / l, dy / l]; };
  let s = '';
  for (let i = 0; i < 9; i++) {
    const t = 0.2 + i * 0.085;
    const [x, y] = P(t); const [dx, dy] = D(t);
    const len = 27 - i * 2.4;
    [-1, 1].forEach((sg) => {
      const ang = Math.atan2(dy, dx) + sg * 0.95;
      const ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len;
      s += `<path d="M${x.toFixed(1)} ${y.toFixed(1)}Q${((x + ex) / 2 + sg * 1.5).toFixed(1)} ${((y + ey) / 2 - 3).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${sg < 0 ? 'var(--c-leaf)' : '#72bd80'}" stroke-width="5.4" stroke-linecap="round" fill="none"/>`;
    });
  }
  return s;
};

// ramo de oliveira: folhas alongadas e azeitonas
const olive = () => {
  const P = (t) => { const a = 1 - t; return [a * a * 12 + 2 * a * t * 40 + t * t * 90, a * a * 78 + 2 * a * t * 70 + t * t * 24]; };
  let s = '';
  for (let i = 0; i < 7; i++) {
    const t = 0.14 + i * 0.13;
    const [x, y] = P(t);
    [-1, 1].forEach((sg) => {
      const rot = (sg < 0 ? -62 : 38) - i * 3;
      s += `<ellipse cx="${(x + sg * 1).toFixed(1)}" cy="${(y - 8 * sg).toFixed(1)}" rx="3.6" ry="11" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${sg < 0 ? 'var(--c-olive)' : '#a9b86a'}"/>`;
    });
  }
  return s;
};

export const NATUREZA = `
<symbol id="s-star" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="49" fill="url(#g-glow)"/>
  <g transform="translate(50 50) rotate(45) scale(.62) translate(-50 -50)"><path d="M50 2L58 42L98 50L58 58L50 98L42 58L2 50L42 42Z" fill="#ffe58a"/></g>
  <path d="M50 2L58 42L98 50L58 58L50 98L42 58L2 50L42 42Z" fill="var(--c-star)"/>
  <path d="M50 2L58 42L98 50L58 58L50 98Z" fill="var(--c-gold-d)" opacity=".28"/>
  <circle cx="50" cy="50" r="10" fill="#fff" opacity=".92"/>
  <circle cx="50" cy="50" r="5.5" fill="var(--c-star)"/>
</symbol>

<symbol id="s-sunrise" viewBox="0 0 100 100"><g clip-path="url(#cp-round)">
  <circle cx="50" cy="66" r="48" fill="url(#g-glow)"/>
  <g fill="var(--sun)">
    ${[-72, -48, -24, 0, 24, 48, 72].map((a) => `<rect x="48" y="12" width="4" height="15" rx="2" transform="rotate(${a} 50 66)"/>`).join('')}
  </g>
  <path d="M20 68a30 30 0 0 1 60 0z" fill="var(--sun-2)"/>
  <path d="M20 68a30 30 0 0 1 60 0" fill="none" stroke="var(--sun)" stroke-width="3"/>
  <ellipse cx="40" cy="52" rx="5" ry="8" transform="rotate(35 40 52)" fill="#fff" opacity=".5"/>
  <path d="M0 68h100v32H0z" fill="var(--c-leaf)"/>
  <path d="M0 76c22-9 44-9 64-2s28 5 36 1v25H0z" fill="var(--c-leaf-d)" opacity=".55"/>
  <path d="M0 68h100" stroke="var(--c-leaf-d)" stroke-width="2" opacity=".5"/>
</g></symbol>

<symbol id="s-tree" viewBox="0 0 100 100">
  <path d="M44 94c1-14 2-26 0-42h12c-2 16-1 28 0 42z" fill="var(--c-wood)"/>
  <path d="M52 94c-1-14-1-26 0-42h4c-2 16-1 28 0 42z" fill="var(--c-wood-d)" opacity=".35"/>
  <path d="M50 70l-13-13M52 62l13-11" stroke="var(--c-wood)" stroke-width="4.4" stroke-linecap="round"/>
  <circle cx="50" cy="32" r="22" fill="var(--c-leaf)"/>
  <circle cx="30" cy="43" r="18" fill="var(--c-leaf)"/>
  <circle cx="70" cy="43" r="18" fill="var(--c-leaf)"/>
  <ellipse cx="50" cy="55" rx="30" ry="9" fill="var(--c-leaf-d)" opacity=".32"/>
  <circle cx="40" cy="26" r="6" fill="#fff" opacity=".14"/>
  <circle cx="38" cy="40" r="4.6" fill="var(--c-star)"/><circle cx="60" cy="30" r="4.6" fill="var(--c-star)"/><circle cx="68" cy="48" r="4.6" fill="var(--c-star)"/><circle cx="28" cy="52" r="4.6" fill="var(--c-star)"/><circle cx="52" cy="46" r="4.6" fill="var(--c-star)"/>
  <circle cx="37" cy="38.5" r="1.6" fill="#fff" opacity=".7"/><circle cx="59" cy="28.5" r="1.6" fill="#fff" opacity=".7"/><circle cx="67" cy="46.5" r="1.6" fill="#fff" opacity=".7"/>
</symbol>

<symbol id="s-olive-tree" viewBox="0 0 100 100">
  <path d="M40 95c1-12 2-22 5-32-7-4-13-11-15-19l9-2c2 7 6 11 11 13 3-8 10-13 19-15l2 9c-8 2-12 8-13 15 2 9 2 20 0 31z" fill="var(--c-wood)"/>
  <path d="M50 95c1-12 1-24-1-33 3-8 9-13 17-15l1 6c-6 2-10 7-10 14 2 9 2 20 1 28z" fill="var(--c-wood-d)" opacity=".4"/>
  <ellipse cx="26" cy="38" rx="19" ry="12" fill="var(--c-olive)"/>
  <ellipse cx="52" cy="26" rx="23" ry="15" fill="var(--c-olive)"/>
  <ellipse cx="76" cy="38" rx="19" ry="12" fill="var(--c-olive)"/>
  <ellipse cx="50" cy="42" rx="26" ry="11" fill="var(--c-olive-d)" opacity=".5"/>
  <ellipse cx="44" cy="20" rx="12" ry="5" fill="#b9c77a" opacity=".6"/>
  <ellipse cx="20" cy="33" rx="8" ry="3.4" fill="#b9c77a" opacity=".55"/>
  <ellipse cx="80" cy="33" rx="8" ry="3.4" fill="#b9c77a" opacity=".55"/>
  <circle cx="34" cy="44" r="2.6" fill="#3f4c22"/><circle cx="62" cy="38" r="2.6" fill="#3f4c22"/><circle cx="72" cy="46" r="2.6" fill="#3f4c22"/><circle cx="50" cy="34" r="2.6" fill="#3f4c22"/>
</symbol>

<symbol id="s-palm" viewBox="0 0 100 100">
  <path d="M20 94Q22 34 84 14" stroke="var(--c-leaf-d)" stroke-width="3.6" stroke-linecap="round" fill="none"/>
  ${frond()}
</symbol>

<symbol id="s-olive" viewBox="0 0 100 100">
  <path d="M12 78Q40 70 90 24" stroke="var(--c-wood)" stroke-width="3.6" stroke-linecap="round" fill="none"/>
  ${olive()}
  <ellipse cx="42" cy="82" rx="4.4" ry="6" fill="#4b5a2a"/><ellipse cx="55" cy="72" rx="4.4" ry="6" fill="#3f4c22"/>
  <path d="M42 70v8M55 62v6" stroke="var(--c-wood)" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="41" cy="80" rx="1.4" ry="2.2" fill="#fff" opacity=".35"/>
</symbol>

<symbol id="s-mountain" viewBox="0 0 100 100"><g clip-path="url(#cp-round)">
  <path d="M2 90L34 26l14 22 12-16 38 58z" fill="var(--c-stone)"/>
  <path d="M34 26l14 22-8 8-12-10z" fill="#fff" opacity=".35"/>
  <path d="M60 32L98 90H58z" fill="var(--c-stone-d)" opacity=".5"/>
  <path d="M0 96c12-12 26-16 40-14s34 6 60-2v20H0z" fill="var(--c-leaf)"/>
  <path d="M0 98c20-8 44-8 100-2v6H0z" fill="var(--c-leaf-d)" opacity=".5"/>
  <circle cx="82" cy="20" r="9" fill="var(--sun-2)"/>
</g></symbol>

<symbol id="s-river" viewBox="0 0 100 100"><g clip-path="url(#cp-round)">
  <path d="M0 20c20-12 40-12 60 0s30 8 40 0v80H0z" fill="var(--c-leaf)"/>
  <path d="M-4 38c18-12 36-12 54 0s34 12 54 0v22c-20 12-36 12-54 0S14 48-4 60z" fill="var(--c-water)"/>
  <path d="M-4 38c18-12 36-12 54 0s34 12 54 0" fill="none" stroke="#fff" stroke-width="2.6" opacity=".6"/>
  <path d="M10 52c10-5 20-5 30 0M52 56c10-5 20-5 30 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
  <path d="M0 74c30-8 58-6 100 4v22H0z" fill="var(--c-leaf-d)" opacity=".55"/>
</g></symbol>

<symbol id="s-bird" viewBox="0 0 100 100">
  <path d="M10 82C34 78 64 76 92 80" stroke="var(--c-wood)" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  <path d="M30 80l-4 8M56 78l-3 8" stroke="#d98b2f" stroke-width="2.6" stroke-linecap="round"/>
  <ellipse cx="46" cy="60" rx="25" ry="19" transform="rotate(-10 46 60)" fill="#6f93c9"/>
  <ellipse cx="50" cy="68" rx="17" ry="10" transform="rotate(-8 50 68)" fill="var(--c-cream)"/>
  <circle cx="70" cy="42" r="13" fill="#6f93c9"/>
  <path d="M81 40l12 4-12 5z" fill="var(--c-gold)"/>
  <circle cx="74" cy="39" r="2.4" fill="#26324f"/><circle cx="74.8" cy="38.2" r=".8" fill="#fff"/>
  <path d="M30 52c10-10 26-10 34-2-6 12-20 20-34 16z" fill="#4c6fab"/>
  <path d="M26 66L6 76l22-2z" fill="#4c6fab"/><path d="M28 62L8 66l18 2z" fill="#6f93c9"/>
  <ellipse cx="60" cy="36" rx="5" ry="3" transform="rotate(-30 60 36)" fill="#fff" opacity=".3"/>
</symbol>

<symbol id="s-dove" viewBox="0 0 100 100">
  <circle cx="50" cy="48" r="47" fill="url(#g-glow)"/>
  <g stroke="#cdd4e6" stroke-width="1.8" stroke-linejoin="round">
    <path d="M62 54C66 36 76 24 92 20C88 36 80 48 70 57z" fill="#e6ebf6"/>
    <path d="M34 66L6 62Q8 74 34 74z" fill="#e6ebf6"/>
    <path d="M36 70L10 84Q28 86 42 76z" fill="#dfe5f2"/>
    <ellipse cx="54" cy="64" rx="27" ry="14" transform="rotate(-10 54 64)" fill="#fff"/>
    <circle cx="78" cy="52" r="11" fill="#fff"/>
    <path d="M56 58C44 46 32 30 34 8C48 16 62 34 68 54z" fill="#fff"/>
  </g>
  <path d="M40 24c4 8 10 16 18 24M45 20c3 8 8 16 14 24" stroke="#cdd4e6" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <path d="M88 52l10 3-10 3z" fill="var(--c-gold)"/>
  <circle cx="81" cy="50" r="2.2" fill="#26324f"/>
  <path d="M50 76c10 2 20-2 28-10" stroke="#cdd4e6" stroke-width="1.6" fill="none" stroke-linecap="round"/>
</symbol>

<symbol id="s-lightning" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="url(#g-glow)"/>
  <path d="M60 4L22 56h22l-8 40 42-58H54z" fill="var(--c-star)" stroke="var(--c-star-d)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M60 4L44 56h10l-4 24 22-38H54z" fill="#fff" opacity=".55"/>
</symbol>
`;
