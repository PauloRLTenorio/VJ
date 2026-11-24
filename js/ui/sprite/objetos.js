// Ilustrações do VJ — objetos do dia a dia e da história.
const teeth = (x0, x1, y, n, h) => {
  const w = (x1 - x0) / n;
  let d = `M${x0} ${y}`;
  for (let i = 0; i < n; i++) d += `l${(w / 2).toFixed(2)} ${h}l${(w / 2).toFixed(2)} ${-h}`;
  return d;
};

export const OBJETOS = `
<symbol id="s-manger" viewBox="0 0 100 100">
  <circle cx="50" cy="44" r="44" fill="url(#g-glow)"/>
  <g stroke="var(--c-wheat)" stroke-width="3.4" stroke-linecap="round" fill="none">
    <path d="M24 52l-8-16M32 48l-5-20M42 45l-2-22M52 44l1-24M62 45l5-22M72 48l8-18M80 52l9-14"/>
  </g>
  <g stroke="var(--c-wheat-d)" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".8"><path d="M28 50l-4-12M47 44l-1-16M58 44l3-14M76 50l5-12"/></g>
  <path d="M30 70L68 94M70 70L32 94" stroke="var(--c-wood-d)" stroke-width="6.4" stroke-linecap="round"/>
  <ellipse cx="50" cy="50" rx="23" ry="9" fill="var(--c-linen)"/>
  <path d="M30 50c6 4 14 5 20 5s14-1 20-5" fill="none" stroke="var(--c-linen-d)" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M16 54h68l-8 22H24z" fill="var(--c-wood)"/>
  <path d="M50 54h34l-8 22H50z" fill="#000" opacity=".12"/>
  <path d="M22 62h56M24 69h52" stroke="var(--c-wood-d)" stroke-width="2" stroke-linecap="round" opacity=".5"/>
  <rect x="12" y="50" width="76" height="8" rx="4" fill="var(--c-wood-l)"/>
</symbol>

<symbol id="s-stable" viewBox="0 0 100 100">
  <circle cx="50" cy="66" r="34" fill="url(#g-glow)"/>
  <rect x="20" y="44" width="60" height="46" fill="var(--c-night-d)"/>
  <rect x="20" y="44" width="60" height="46" fill="url(#g-glow)" opacity=".75"/>
  <path d="M20 90c8-9 18-11 30-9 12-2 22 0 30 9z" fill="var(--c-wheat)"/>
  <path d="M30 88c6-5 12-6 20-5" stroke="var(--c-wheat-d)" stroke-width="2.4" stroke-linecap="round" fill="none"/>
  <rect x="13" y="42" width="8" height="50" rx="2" fill="var(--c-wood)"/><rect x="79" y="42" width="8" height="50" rx="2" fill="var(--c-wood)"/>
  <rect x="79" y="42" width="8" height="50" rx="2" fill="#000" opacity=".15"/>
  <path d="M4 46L50 12l46 34z" fill="var(--c-wheat-d)"/>
  <path d="M4 46L50 12l46 34-8 2L50 20 12 48z" fill="var(--c-wheat)"/>
  <path d="M50 12l46 34-10 2z" fill="#000" opacity=".12"/>
  <path d="M16 40l8-6M30 32l7-5M60 27l8 6M76 37l7 6" stroke="var(--c-wheat)" stroke-width="2.4" stroke-linecap="round"/>
</symbol>

<symbol id="s-lamp" viewBox="0 0 100 100">
  <circle cx="50" cy="40" r="46" fill="url(#g-glow)"/>
  <path d="M50 4c9 11 14 18 14 27a14 14 0 0 1-28 0c0-9 5-16 14-27z" fill="var(--c-flame)"/>
  <path d="M50 14c5 7 8 12 8 18a8 8 0 0 1-16 0c0-6 3-11 8-18z" fill="var(--c-star)"/>
  <path d="M50 24c3 4 4 7 4 10a4 4 0 0 1-8 0c0-3 1-6 4-10z" fill="#fff" opacity=".9"/>
  <path d="M14 64c0-10 16-16 36-16s36 6 36 16c0 16-16 28-36 28S14 80 14 64z" fill="var(--c-clay)"/>
  <path d="M50 92c20 0 36-12 36-28 0-5-4-9-10-12 2 22-8 36-26 40z" fill="var(--c-clay-d)" opacity=".5"/>
  <ellipse cx="50" cy="56" rx="26" ry="7" fill="var(--c-clay-d)"/>
  <ellipse cx="50" cy="55" rx="18" ry="4.4" fill="#3a2314"/>
  <path d="M80 56l16-6-4 14z" fill="var(--c-clay)"/>
  <circle cx="14" cy="66" r="8" fill="none" stroke="var(--c-clay-d)" stroke-width="5"/>
  <ellipse cx="34" cy="68" rx="5" ry="9" transform="rotate(20 34 68)" fill="#fff" opacity=".22"/>
</symbol>

<symbol id="s-lantern" viewBox="0 0 100 100">
  <circle cx="50" cy="54" r="46" fill="url(#g-glow)"/>
  <path d="M36 22c0-14 28-14 28 0" stroke="var(--c-gray-d)" stroke-width="4.4" stroke-linecap="round" fill="none"/>
  <path d="M28 26h44l-8 9H36z" fill="var(--c-gray-d)"/>
  <path d="M35 35h30l6 41H29z" fill="var(--c-star)" opacity=".8"/>
  <path d="M50 42c6 8 9 12 9 18a9 9 0 0 1-18 0c0-6 3-10 9-18z" fill="var(--c-flame)"/>
  <path d="M50 50c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z" fill="#fff" opacity=".9"/>
  <path d="M50 35v41M35 35l-6 41M65 35l6 41" stroke="var(--c-gray-d)" stroke-width="2.4"/>
  <rect x="26" y="76" width="48" height="11" rx="3" fill="var(--c-gray-d)"/>
  <rect x="26" y="76" width="48" height="4" rx="2" fill="#fff" opacity=".2"/>
</symbol>

<symbol id="s-lighthouse" viewBox="0 0 100 100">
  <path d="M50 26L0 10v32z" fill="url(#g-beam-l)"/>
  <path d="M50 26l50-16v32z" fill="url(#g-beam-r)"/>
  <path d="M37 94l5-56h16l5 56z" fill="var(--c-white)"/>
  <path d="M40.4 58l-.9 10h21l-.9-10zM37.8 86l-.4 5h25.2l-.4-5zM42.6 42l-.5 6h15.8l-.5-6z" fill="var(--c-indigo)"/>
  <path d="M50 38h8l5 56H50z" fill="#000" opacity=".1"/>
  <rect x="39" y="26" width="22" height="13" rx="2" fill="var(--c-star)"/>
  <rect x="39" y="26" width="22" height="13" rx="2" fill="url(#g-glow)" opacity=".9"/>
  <path d="M50 26v13M44.5 26v13M55.5 26v13" stroke="var(--c-gold-d)" stroke-width="1.6"/>
  <path d="M34 26l16-14 16 14z" fill="var(--c-night)"/>
  <circle cx="50" cy="10" r="3.4" fill="var(--c-night-d)"/>
  <rect x="28" y="92" width="44" height="7" rx="2" fill="var(--c-stone-d)"/>
</symbol>

<symbol id="s-scroll" viewBox="0 0 100 100">
  <rect x="24" y="16" width="52" height="68" rx="3" fill="var(--c-linen)" stroke="var(--c-linen-d)" stroke-width="2"/>
  <path d="M34 34h32M34 44h24M34 54h32M34 64h20" stroke="#8a7a60" stroke-width="3.2" stroke-linecap="round" opacity=".75"/>
  <rect x="16" y="10" width="68" height="13" rx="6.5" fill="var(--c-sand)"/><rect x="16" y="10" width="68" height="13" rx="6.5" fill="none" stroke="var(--c-sand-d)" stroke-width="2"/>
  <rect x="16" y="77" width="68" height="13" rx="6.5" fill="var(--c-sand)"/><rect x="16" y="77" width="68" height="13" rx="6.5" fill="none" stroke="var(--c-sand-d)" stroke-width="2"/>
  <circle cx="16" cy="16.5" r="5.5" fill="var(--c-wood)"/><circle cx="84" cy="16.5" r="5.5" fill="var(--c-wood)"/>
  <circle cx="16" cy="83.5" r="5.5" fill="var(--c-wood)"/><circle cx="84" cy="83.5" r="5.5" fill="var(--c-wood)"/>
  <rect x="20" y="13" width="30" height="3" rx="1.5" fill="#fff" opacity=".4"/>
</symbol>

<symbol id="s-jar" viewBox="0 0 100 100">
  <path d="M28 40c-8 8-12 20-10 34 2 14 14 22 32 22s30-8 32-22c2-14-2-26-10-34z" fill="var(--c-clay)"/>
  <path d="M60 40c8 6 14 18 12 34-2 12-10 20-22 22 16-2 28-10 30-24 2-14-2-26-10-34z" fill="var(--c-clay-d)" opacity=".5"/>
  <path d="M38 40c0-8 2-14 2-22h20c0 8 2 14 2 22z" fill="var(--c-clay)"/>
  <ellipse cx="50" cy="16" rx="14" ry="5" fill="var(--c-clay-d)"/><ellipse cx="50" cy="16" rx="10" ry="3" fill="#3a2314"/>
  <path d="M38 24c-14-2-18 10-13 20" stroke="var(--c-clay-d)" stroke-width="5.4" stroke-linecap="round" fill="none"/>
  <path d="M62 24c14-2 18 10 13 20" stroke="var(--c-clay-d)" stroke-width="5.4" stroke-linecap="round" fill="none"/>
  <path d="M21 58c18 8 40 8 58 0" fill="none" stroke="var(--c-star)" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M22 70c18 8 38 8 56 0" fill="none" stroke="var(--c-star)" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
  <ellipse cx="32" cy="62" rx="4.4" ry="12" transform="rotate(14 32 62)" fill="#fff" opacity=".22"/>
</symbol>

<symbol id="s-well" viewBox="0 0 100 100">
  <rect x="22" y="22" width="6" height="40" rx="2" fill="var(--c-wood)"/><rect x="72" y="22" width="6" height="40" rx="2" fill="var(--c-wood)"/>
  <rect x="16" y="14" width="68" height="9" rx="3" fill="var(--c-wood-l)"/>
  <path d="M10 16L50 2l40 14z" fill="var(--c-wood)"/><path d="M50 2l40 14H50z" fill="#000" opacity=".15"/>
  <path d="M50 22v32" stroke="#b08a5a" stroke-width="2.6"/>
  <path d="M42 54h16l-2 15H44z" fill="var(--c-wood-l)"/><path d="M42 54h16" stroke="var(--c-wood-d)" stroke-width="2.4"/>
  <path d="M12 64c0-6 17-11 38-11s38 5 38 11v22c0 6-17 11-38 11S12 92 12 86z" fill="var(--c-stone)"/>
  <path d="M50 97c21 0 38-5 38-11V64c0-2-2-4-5-6 2 18-12 36-33 39z" fill="var(--c-stone-d)" opacity=".4"/>
  <ellipse cx="50" cy="64" rx="38" ry="10.5" fill="var(--c-stone-d)"/>
  <ellipse cx="50" cy="65" rx="30" ry="7.6" fill="var(--c-water)"/>
  <path d="M34 65c6-3 12-3 18 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>
  <path d="M22 76h14M44 80h16M66 76h12M30 88h12M56 90h12" stroke="var(--c-stone-d)" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
</symbol>

<symbol id="s-chalice" viewBox="0 0 100 100">
  <path d="M24 12h52c2 22-2 36-14 44-4 3-6 4-6 8v6H44v-6c0-4-2-5-6-8C26 48 22 34 24 12z" fill="var(--c-gold)"/>
  <path d="M76 12c2 22-2 36-14 44-4 3-6 4-6 8v6h-6V50c14-6 22-20 20-38z" fill="var(--c-gold-d)" opacity=".4"/>
  <ellipse cx="50" cy="12" rx="26" ry="6" fill="var(--c-gold-d)"/>
  <ellipse cx="50" cy="12.6" rx="22" ry="4.4" fill="var(--c-wine)"/>
  <ellipse cx="42" cy="12" rx="8" ry="1.6" fill="#fff" opacity=".35"/>
  <ellipse cx="50" cy="70" rx="10" ry="4.6" fill="var(--c-gold)"/>
  <path d="M30 94c0-9 9-16 20-16s20 7 20 16z" fill="var(--c-gold-d)"/>
  <path d="M30 94c0-4 3-8 8-11" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".4"/>
  <path d="M33 22c0 12 4 22 10 28" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".5"/>
  <circle cx="50" cy="34" r="4" fill="var(--c-wine)"/>
</symbol>

<symbol id="s-basin" viewBox="0 0 100 100">
  <path d="M8 50h84c0 24-17 42-42 42S8 74 8 50z" fill="var(--c-clay)"/>
  <path d="M50 92c25 0 42-18 42-42h-9c-2 22-15 38-33 42z" fill="var(--c-clay-d)" opacity=".5"/>
  <ellipse cx="50" cy="50" rx="42" ry="11" fill="var(--c-clay-d)"/>
  <ellipse cx="50" cy="51" rx="36" ry="8" fill="var(--c-water)"/>
  <path d="M26 51c6-3 12-3 18 0M52 53c6-3 12-3 18 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>
  <path d="M8 50c0 4 1 8 2 12" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".35"/>
  <ellipse cx="26" cy="72" rx="4.4" ry="10" transform="rotate(28 26 72)" fill="#fff" opacity=".24"/>
  <path d="M36 22c-4-6 2-8-1-14M50 20c-4-6 2-8-1-14M64 22c-4-6 2-8-1-14" stroke="#cfd6e6" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>
</symbol>

<symbol id="s-towel" viewBox="0 0 100 100">
  <path d="M10 30c18-9 62-9 80 0v38c-18 9-62 9-80 0z" fill="var(--c-white)"/>
  <path d="M90 30v38c-10 5-26 7-42 7 22-6 34-22 42-45z" fill="#cfd6e6" opacity=".6"/>
  <path d="M10 30c18-9 62-9 80 0" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/>
  <path d="M10 42c18-9 62-9 80 0M10 48c18-9 62-9 80 0" fill="none" stroke="var(--c-indigo)" stroke-width="3.6"/>
  <path d="M10 68c18 9 62 9 80 0" fill="none" stroke="#cdd4e6" stroke-width="2"/>
  <path d="M10 34v30M90 34v30" stroke="#dfe5f2" stroke-width="5" stroke-dasharray="2 3" opacity=".9"/>
  <path d="M14 76c18 8 54 8 72 0v6c-18 8-54 8-72 0z" fill="#000" opacity=".08"/>
</symbol>

<symbol id="s-sandals" viewBox="0 0 100 100">
  <g transform="rotate(-10 30 54)">
    <path d="M30 92c-10 0-14-10-12-22l4-32c2-14 12-22 20-16 8 6 8 18 6 30l-4 30c-1 8-8 10-14 10z" fill="#e0b070" stroke="var(--c-wood)" stroke-width="2.4"/>
    <path d="M30 92c-10 0-14-10-12-22h9c0 9 3 16 10 18z" fill="var(--c-wood)" opacity=".3"/>
    <path d="M20 54c10-7 24-7 34 0M19 68c10-6 24-6 33 0" stroke="var(--c-wine)" stroke-width="5.4" stroke-linecap="round" fill="none"/>
    <path d="M38 30v18" stroke="var(--c-wine)" stroke-width="4.4" stroke-linecap="round"/><circle cx="38" cy="30" r="3.6" fill="var(--c-gold)"/>
  </g>
  <g transform="rotate(10 70 46)">
    <path d="M72 84c-10 0-14-10-12-22l4-32c2-14 12-22 20-16 8 6 8 18 6 30l-4 30c-1 8-8 10-14 10z" fill="#e0b070" stroke="var(--c-wood)" stroke-width="2.4"/>
    <path d="M72 84c-10 0-14-10-12-22h9c0 9 3 16 10 18z" fill="var(--c-wood)" opacity=".3"/>
    <path d="M62 46c10-7 24-7 34 0M61 60c10-6 24-6 33 0" stroke="var(--c-wine)" stroke-width="5.4" stroke-linecap="round" fill="none"/>
    <path d="M80 22v18" stroke="var(--c-wine)" stroke-width="4.4" stroke-linecap="round"/><circle cx="80" cy="22" r="3.6" fill="var(--c-gold)"/>
  </g>
</symbol>

<symbol id="s-hammer" viewBox="0 0 100 100">
  <g transform="rotate(-32 50 52)">
    <rect x="44" y="26" width="12" height="68" rx="4.4" fill="var(--c-wood)"/>
    <rect x="44" y="26" width="5" height="68" rx="2.4" fill="var(--c-wood-l)" opacity=".7"/>
    <rect x="22" y="12" width="52" height="19" rx="4" fill="var(--c-gray)"/>
    <rect x="22" y="12" width="52" height="7" rx="3.4" fill="#fff" opacity=".35"/>
    <path d="M22 14L6 20l16 10z" fill="var(--c-gray-d)"/>
    <rect x="62" y="12" width="12" height="19" rx="3" fill="var(--c-gray-d)" opacity=".5"/>
  </g>
</symbol>

<symbol id="s-saw" viewBox="0 0 100 100">
  <g transform="rotate(-20 50 50)">
    <path d="M22 34h70v18H22z" fill="#cfd5df"/>
    <path d="M22 34h70v6H22z" fill="#fff" opacity=".45"/>
    <path d="${teeth(22, 92, 52, 14, 8)}V52z" fill="#cfd5df"/>
    <path d="M22 52h70" stroke="#9aa3b4" stroke-width="2"/>
    <rect x="4" y="26" width="22" height="34" rx="9" fill="var(--c-wood)"/>
    <rect x="10" y="34" width="10" height="18" rx="5" fill="var(--c-wood-d)" opacity=".6"/>
    <circle cx="30" cy="43" r="2.6" fill="var(--c-gold-d)"/>
  </g>
</symbol>

<symbol id="s-plank" viewBox="0 0 100 100">
  <g transform="rotate(-9 50 50)">
    <rect x="6" y="34" width="88" height="30" rx="3" fill="var(--c-wood-l)"/>
    <path d="M6 64h88v-9H6z" fill="var(--c-wood)" opacity=".5"/>
    <path d="M12 42c18-4 32 4 50 0s22-4 30 0M10 50c20 4 36-4 54 0s22 4 28 0M14 58c16-3 30 3 48 0" fill="none" stroke="var(--c-wood-d)" stroke-width="1.8" stroke-linecap="round" opacity=".45"/>
    <ellipse cx="72" cy="46" rx="4" ry="2.6" fill="var(--c-wood-d)" opacity=".4"/>
    <circle cx="14" cy="49" r="2.4" fill="#6b6f7c"/><circle cx="86" cy="49" r="2.4" fill="#6b6f7c"/>
    <rect x="6" y="34" width="88" height="5" rx="2" fill="#fff" opacity=".28"/>
  </g>
</symbol>

<symbol id="s-sword" viewBox="0 0 100 100">
  <g transform="rotate(25 50 50)">
    <path d="M50 4l8 12v44H42V16z" fill="#d6dae3"/>
    <path d="M50 4l8 12v44h-8z" fill="#aab2c4" opacity=".7"/>
    <path d="M50 10v48" stroke="#fff" stroke-width="1.8" opacity=".7"/>
    <rect x="28" y="60" width="44" height="9" rx="4" fill="var(--c-gold-d)"/>
    <rect x="46" y="69" width="8" height="19" rx="3" fill="var(--c-wood-d)"/>
    <circle cx="50" cy="92" r="5.4" fill="var(--c-gold)"/>
  </g>
</symbol>

<symbol id="s-mat" viewBox="0 0 100 100">
  <g transform="rotate(-14 50 54)">
    <rect x="12" y="38" width="76" height="32" rx="16" fill="var(--c-sand-d)"/>
    <rect x="12" y="38" width="76" height="12" rx="6" fill="var(--c-sand)" opacity=".7"/>
    <ellipse cx="86" cy="54" rx="9" ry="16" fill="var(--c-sand)"/>
    <ellipse cx="86" cy="54" rx="5" ry="10" fill="var(--c-sand-d)"/>
    <ellipse cx="86" cy="54" rx="2" ry="4" fill="#8e6b32"/>
    <path d="M26 38v32M44 38v32M62 38v32" stroke="#a37d3a" stroke-width="1.8" opacity=".5"/>
    <rect x="26" y="34" width="7" height="40" rx="3" fill="var(--c-wood)"/><rect x="62" y="34" width="7" height="40" rx="3" fill="var(--c-wood)"/>
  </g>
</symbol>

<symbol id="s-oil" viewBox="0 0 100 100">
  <path d="M38 22h24v10c10 4 16 14 16 26 0 18-12 30-28 30S22 76 22 58c0-12 6-22 16-26z" fill="var(--c-clay)"/>
  <path d="M62 32c10 4 16 14 16 26 0 14-8 24-20 28 12-6 16-18 12-34-2-8-6-14-8-20z" fill="var(--c-clay-d)" opacity=".5"/>
  <rect x="36" y="14" width="28" height="9" rx="4" fill="var(--c-clay-d)"/>
  <path d="M26 54c14 6 34 6 48 0" fill="none" stroke="var(--c-star)" stroke-width="3.4" stroke-linecap="round"/>
  <ellipse cx="34" cy="60" rx="3.6" ry="10" transform="rotate(14 34 60)" fill="#fff" opacity=".22"/>
  <path d="M82 70c-5 8-8 12-8 16a8 8 0 0 0 16 0c0-4-3-8-8-16z" fill="var(--c-gold)"/>
  <path d="M80 80c-1 3 0 6 3 8" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity=".7"/>
</symbol>

<symbol id="s-gold" viewBox="0 0 100 100">
  <circle cx="50" cy="56" r="44" fill="url(#g-glow)"/>
  <path d="M14 78l8-18h34l8 18z" fill="var(--c-gold)"/><path d="M14 78h50l-2 6H16z" fill="var(--c-gold-d)"/>
  <path d="M38 78l8-18h34l8 18z" fill="var(--c-gold)"/><path d="M38 78h50l-2 6H40z" fill="var(--c-gold-d)"/>
  <path d="M26 60l8-18h34l8 18z" fill="var(--c-star)"/><path d="M26 60h50l-2 6H28z" fill="var(--c-gold-d)"/>
  <path d="M30 56l5-9h14" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".7"/>
  <circle cx="78" cy="38" r="11" fill="var(--c-star)" stroke="var(--c-gold-d)" stroke-width="2.6"/>
  <path d="M78 31v14M73 36h8" stroke="var(--c-gold-d)" stroke-width="2.4" stroke-linecap="round"/>
</symbol>

<symbol id="s-incense" viewBox="0 0 100 100">
  <path d="M40 30c-8-8 4-12-2-20M52 28c-8-8 4-12-2-22M64 30c-8-8 4-12-2-20" stroke="#cfd6e6" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".85"/>
  <path d="M50 30V16" stroke="var(--c-gold-d)" stroke-width="3"/><circle cx="50" cy="13" r="4" fill="var(--c-gold)"/>
  <path d="M26 56c0-18 10-26 24-26s24 8 24 26z" fill="var(--c-gold)"/>
  <path d="M74 56c0-18-10-26-24-26 14 4 20 12 18 26z" fill="var(--c-gold-d)" opacity=".5"/>
  <circle cx="40" cy="46" r="3" fill="var(--c-gold-d)"/><circle cx="50" cy="42" r="3" fill="var(--c-gold-d)"/><circle cx="60" cy="46" r="3" fill="var(--c-gold-d)"/>
  <path d="M22 56h56l-4 12c-2 6-8 8-14 8H40c-6 0-12-2-14-8z" fill="var(--c-gold-d)"/>
  <path d="M26 56h52" stroke="var(--c-gold)" stroke-width="3.4"/>
  <path d="M34 76l-8 14M66 76l8 14M50 76v14" stroke="var(--c-gold-d)" stroke-width="2.6" stroke-linecap="round"/>
  <ellipse cx="38" cy="40" rx="4" ry="7" transform="rotate(30 38 40)" fill="#fff" opacity=".4"/>
</symbol>

<symbol id="s-myrrh" viewBox="0 0 100 100">
  <circle cx="50" cy="56" r="42" fill="url(#g-glow)"/>
  <path d="M44 16h12l2 14c12 6 20 16 20 30 0 18-12 30-28 30S22 78 22 60c0-14 8-24 20-30z" fill="var(--c-cream)"/>
  <path d="M58 30c12 6 20 16 20 30 0 14-8 24-20 28 10-6 14-16 12-30-1-10-6-18-12-24z" fill="var(--c-rose)" opacity=".55"/>
  <rect x="42" y="8" width="16" height="10" rx="4" fill="var(--c-gold)"/><rect x="40" y="16" width="20" height="5" rx="2.4" fill="var(--c-gold-d)"/>
  <path d="M26 58c16 8 32 8 48 0" fill="none" stroke="var(--c-gold)" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M28 70c14 6 30 6 44 0" fill="none" stroke="var(--c-gold)" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
  <ellipse cx="34" cy="56" rx="3.6" ry="11" transform="rotate(14 34 56)" fill="#fff" opacity=".55"/>
  <circle cx="50" cy="46" r="4.4" fill="var(--c-wine)"/>
</symbol>

<symbol id="s-crown" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="url(#g-glow)"/>
  <path d="M14 74L8 28l24 22 18-30 18 30 24-22-6 46z" fill="var(--c-gold)"/>
  <path d="M50 20l18 30 24-22-6 46H50z" fill="var(--c-gold-d)" opacity=".35"/>
  <rect x="14" y="72" width="72" height="14" rx="4" fill="var(--c-gold-d)"/>
  <rect x="14" y="72" width="72" height="5" rx="2.4" fill="#fff" opacity=".28"/>
  <circle cx="30" cy="79" r="3.6" fill="var(--c-rose)"/><circle cx="50" cy="79" r="3.6" fill="var(--c-sea)"/><circle cx="70" cy="79" r="3.6" fill="var(--c-rose)"/>
  <circle cx="8" cy="26" r="5.4" fill="var(--c-star)"/><circle cx="50" cy="18" r="5.4" fill="var(--c-star)"/><circle cx="92" cy="26" r="5.4" fill="var(--c-star)"/>
</symbol>

<symbol id="s-temple" viewBox="0 0 100 100">
  <path d="M6 36L50 10l44 26z" fill="var(--c-stone)"/>
  <path d="M50 10l44 26H50z" fill="var(--c-stone-d)" opacity=".4"/>
  <path d="M6 36h88" stroke="var(--c-gold)" stroke-width="3.6"/>
  <circle cx="50" cy="26" r="4.4" fill="var(--c-gold)"/>
  <rect x="10" y="38" width="80" height="6" fill="var(--c-linen-d)"/>
  <g fill="var(--c-linen)">
    <rect x="16" y="44" width="10" height="38" rx="2"/><rect x="34" y="44" width="10" height="38" rx="2"/><rect x="56" y="44" width="10" height="38" rx="2"/><rect x="74" y="44" width="10" height="38" rx="2"/>
  </g>
  <g fill="var(--c-linen-d)" opacity=".6"><rect x="22" y="44" width="4" height="38"/><rect x="40" y="44" width="4" height="38"/><rect x="62" y="44" width="4" height="38"/><rect x="80" y="44" width="4" height="38"/></g>
  <rect x="44" y="52" width="12" height="30" rx="6" fill="var(--c-night-d)"/>
  <rect x="8" y="82" width="84" height="6" rx="2" fill="var(--c-stone)"/><rect x="4" y="88" width="92" height="7" rx="2" fill="var(--c-stone-d)"/>
</symbol>

<symbol id="s-angel" viewBox="0 0 100 100">
  <circle cx="50" cy="46" r="48" fill="url(#g-glow)"/>
  ${[0, 1, 2, 3, 4].map((k) => `<ellipse cx="${(30 - k * 3.4).toFixed(1)}" cy="${(40 + k * 7.5).toFixed(1)}" rx="${(25 - k * 1.4).toFixed(1)}" ry="6.4" transform="rotate(${(-18 + k * 11).toFixed(1)} ${(40 - k * 1).toFixed(1)} ${(46 + k * 3).toFixed(1)})" fill="${k % 2 ? '#eef1f9' : '#fff'}" stroke="#d3d9ea" stroke-width="1.4"/>`).join('')}
  ${[0, 1, 2, 3, 4].map((k) => `<ellipse cx="${(70 + k * 3.4).toFixed(1)}" cy="${(40 + k * 7.5).toFixed(1)}" rx="${(25 - k * 1.4).toFixed(1)}" ry="6.4" transform="rotate(${(18 - k * 11).toFixed(1)} ${(60 + k * 1).toFixed(1)} ${(46 + k * 3).toFixed(1)})" fill="${k % 2 ? '#eef1f9' : '#fff'}" stroke="#d3d9ea" stroke-width="1.4"/>`).join('')}
  <path d="M42 36h16l8 56H34z" fill="var(--c-white)" stroke="#d3d9ea" stroke-width="1.4"/>
  <path d="M50 36h8l8 56H50z" fill="#cfd6e6" opacity=".6"/>
  <circle cx="50" cy="28" r="10" fill="#fffbe6"/>
  <ellipse cx="50" cy="12" rx="13" ry="4.4" fill="none" stroke="var(--c-star)" stroke-width="3.4"/>
</symbol>

<symbol id="s-globe" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="var(--c-sea)"/>
  <path d="M30 24c10-4 22-2 28 6 4 6-2 12-10 12-8 2-6 10-14 10-8-2-16-6-16-12 0-8 4-12 12-16z" fill="var(--c-leaf)"/>
  <path d="M60 52c8-2 18 2 18 10 0 10-10 18-18 16-6-4-8-10-6-18 0-4 2-6 6-8z" fill="var(--c-leaf)"/>
  <path d="M72 30c4 0 8 2 8 6-4 2-8 0-8-6z" fill="var(--c-leaf-d)"/>
  <path d="M50 10c-14 12-14 68 0 80M50 10c14 12 14 68 0 80M12 40h76M12 62h76" fill="none" stroke="#fff" stroke-width="1.8" opacity=".35"/>
  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--c-water-d)" stroke-width="3"/>
  <ellipse cx="34" cy="32" rx="8" ry="14" transform="rotate(35 34 32)" fill="#fff" opacity=".28"/>
</symbol>

<symbol id="s-speech" viewBox="0 0 100 100">
  <path d="M14 20c0-6 4-10 10-10h52c6 0 10 4 10 10v38c0 6-4 10-10 10H48L30 88V68h-6c-6 0-10-4-10-10z" fill="var(--c-white)"/>
  <path d="M86 20v38c0 6-4 10-10 10H48L30 88l6-20h40c6 0 10-4 10-10z" fill="#cfd6e6" opacity=".6"/>
  <path d="M50 54C34 42 28 34 28 26c0-6 4-10 10-10 5 0 9 3 12 8 3-5 7-8 12-8 6 0 10 4 10 10 0 8-6 16-22 28z" fill="#e0524c"/>
  <ellipse cx="36" cy="25" rx="2.6" ry="5" transform="rotate(30 36 25)" fill="#fff" opacity=".5"/>
</symbol>

<symbol id="s-person" viewBox="0 0 100 100">
  <circle cx="50" cy="22" r="14" fill="currentColor"/>
  <path d="M24 94V60c0-13 11-22 26-22s26 9 26 22v34z" fill="currentColor"/>
  <path d="M50 38c15 0 26 9 26 22v34H50z" fill="#000" opacity=".16"/>
  <ellipse cx="44" cy="17" rx="5" ry="3.4" transform="rotate(-30 44 17)" fill="#fff" opacity=".22"/>
</symbol>

<symbol id="s-clock" viewBox="0 0 100 100">
  <rect x="42" y="4" width="16" height="9" rx="3" fill="var(--c-indigo)"/><rect x="47" y="11" width="6" height="7" fill="var(--c-indigo)"/>
  <circle cx="50" cy="56" r="38" fill="var(--c-white)" stroke="var(--c-indigo)" stroke-width="6"/>
  <circle cx="50" cy="56" r="31" fill="none" stroke="var(--c-linen-d)" stroke-width="1.6"/>
  ${Array.from({ length: 12 }, (_, i) => `<rect x="${i % 3 === 0 ? 48.2 : 49}" y="${i % 3 === 0 ? 27 : 28}" width="${i % 3 === 0 ? 3.6 : 2}" height="${i % 3 === 0 ? 7 : 4}" rx="1" transform="rotate(${i * 30} 50 56)" fill="var(--c-indigo)"/>`).join('')}
  <path d="M50 56V34" stroke="var(--c-indigo)" stroke-width="4" stroke-linecap="round"/>
  <path d="M50 56l14 9" stroke="var(--c-indigo)" stroke-width="4.6" stroke-linecap="round"/>
  <path d="M50 56L72 44" stroke="var(--c-star-d)" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="50" cy="56" r="4.4" fill="var(--c-star)" stroke="var(--c-indigo)" stroke-width="2"/>
  <path d="M30 40a28 28 0 0 1 14-10" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".7"/>
</symbol>
`;
