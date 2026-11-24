// Ilustrações do VJ — animais (ovelha, lobo, camelo, jumentinho).
export const ANIMAIS = `
<symbol id="s-sheep" viewBox="0 0 100 100">
  <ellipse cx="50" cy="90" rx="34" ry="4.5" fill="#000" opacity=".1"/>
  <rect x="34" y="70" width="6" height="20" rx="3" fill="#5b5560"/><rect x="44" y="72" width="6" height="18" rx="3" fill="#4a4452"/>
  <rect x="60" y="72" width="6" height="18" rx="3" fill="#5b5560"/><rect x="70" y="70" width="6" height="20" rx="3" fill="#4a4452"/>
  <g fill="var(--c-wool-d)" opacity=".7"><circle cx="40" cy="58" r="16"/><circle cx="56" cy="54" r="18"/><circle cx="72" cy="58" r="15"/><circle cx="52" cy="66" r="15"/></g>
  <g fill="var(--c-wool)">
    <circle cx="38" cy="54" r="16"/><circle cx="54" cy="48" r="18"/><circle cx="71" cy="54" r="15"/>
    <circle cx="46" cy="62" r="14"/><circle cx="62" cy="62" r="14"/><circle cx="76" cy="62" r="9"/><circle cx="30" cy="62" r="9"/>
  </g>
  <ellipse cx="22" cy="56" rx="13" ry="11" fill="#4a4452"/>
  <ellipse cx="33" cy="47" rx="9" ry="4.4" transform="rotate(34 33 47)" fill="#3a3542"/>
  <circle cx="27" cy="45" r="8" fill="var(--c-wool)"/>
  <circle cx="18" cy="54" r="2.6" fill="#fff"/><circle cx="17.4" cy="54.4" r="1.2" fill="#1f1c26"/>
  <ellipse cx="11" cy="60" rx="3" ry="2" fill="#2f2b36"/>
</symbol>

<symbol id="s-wolf" viewBox="0 0 100 100">
  <ellipse cx="52" cy="90" rx="42" ry="4.5" fill="#000" opacity=".1"/>
  <path d="M86 66c12-4 14-16 10-26-4 12-9 16-18 18z" fill="var(--c-fur-d)"/>
  <ellipse cx="58" cy="66" rx="32" ry="19" fill="var(--c-fur)"/>
  <ellipse cx="78" cy="70" rx="15" ry="14" fill="var(--c-fur-d)" opacity=".35"/>
  <ellipse cx="52" cy="76" rx="20" ry="8" fill="#d2cabc" opacity=".85"/>
  <ellipse cx="30" cy="84" rx="13" ry="5.4" fill="var(--c-fur-d)"/><ellipse cx="46" cy="85" rx="11" ry="5" fill="var(--c-fur)"/>
  <path d="M38 62c0-12 6-20 14-24l4 14z" fill="var(--c-fur)"/>
  <circle cx="30" cy="48" r="15" fill="var(--c-fur)"/>
  <path d="M19 52L4 58l16 6z" fill="var(--c-fur)"/><path d="M19 52l-15 6 12 2z" fill="#d2cabc" opacity=".6"/>
  <circle cx="5" cy="58" r="2.8" fill="#2a2a32"/>
  <path d="M22 38l-3-16 12 9zM34 34l4-15 8 13z" fill="var(--c-fur-d)"/>
  <path d="M23 36l-1-9 6 5zM35 33l2-8 4 7z" fill="#d6a8a0" opacity=".7"/>
  <path d="M22 46q4-3 8 0" stroke="#2a2a32" stroke-width="2.4" stroke-linecap="round" fill="none"/>
</symbol>

<symbol id="s-camel" viewBox="0 0 100 100">
  <ellipse cx="50" cy="94" rx="38" ry="3.6" fill="#000" opacity=".1"/>
  <g fill="#c58f48"><rect x="26" y="66" width="6" height="28" rx="3"/><rect x="36" y="68" width="6" height="26" rx="3"/><rect x="58" y="68" width="6" height="26" rx="3"/><rect x="68" y="66" width="6" height="28" rx="3"/></g>
  <g fill="#6a4a2c"><rect x="25" y="90" width="8" height="5" rx="2.5"/><rect x="35" y="90" width="8" height="5" rx="2.5"/><rect x="57" y="90" width="8" height="5" rx="2.5"/><rect x="67" y="90" width="8" height="5" rx="2.5"/></g>
  <path d="M82 54c4-2 6-4 6-8" stroke="#b9833f" stroke-width="3" stroke-linecap="round" fill="none"/>
  <ellipse cx="50" cy="58" rx="30" ry="16" fill="#dba85e"/>
  <ellipse cx="48" cy="38" rx="11" ry="14" fill="#dba85e"/>
  <path d="M64 56C78 52 78 38 84 26" stroke="#dba85e" stroke-width="13" stroke-linecap="round" fill="none"/>
  <ellipse cx="90" cy="22" rx="10" ry="6.4" transform="rotate(-12 90 22)" fill="#dba85e"/>
  <ellipse cx="96" cy="23" rx="4" ry="3.4" fill="#c58f48"/>
  <path d="M82 14l2-6 4 6z" fill="#b9833f"/>
  <circle cx="88" cy="19" r="1.8" fill="#2a1d10"/>
  <ellipse cx="50" cy="66" rx="24" ry="9" fill="#b9833f" opacity=".45"/>
  <path d="M30 46c8-6 24-6 32 0l-2 18c-8 3-20 3-28 0z" fill="var(--c-wine)"/>
  <path d="M30 46c8-6 24-6 32 0" fill="none" stroke="var(--c-gold)" stroke-width="2.4"/>
  <path d="M33 64c8 2.4 18 2.4 26 0" fill="none" stroke="var(--c-gold)" stroke-width="2.4"/>
  <circle cx="46" cy="55" r="4" fill="var(--c-star)"/>
</symbol>

<symbol id="s-donkey" viewBox="0 0 100 100">
  <ellipse cx="52" cy="94" rx="38" ry="3.6" fill="#000" opacity=".1"/>
  <g fill="#8d93a3"><rect x="30" y="64" width="6" height="28" rx="3"/><rect x="40" y="66" width="6" height="26" rx="3"/><rect x="64" y="66" width="6" height="26" rx="3"/><rect x="74" y="64" width="6" height="28" rx="3"/></g>
  <g fill="#3b3f4c"><rect x="29" y="88" width="8" height="5" rx="2.5"/><rect x="39" y="88" width="8" height="5" rx="2.5"/><rect x="63" y="88" width="8" height="5" rx="2.5"/><rect x="73" y="88" width="8" height="5" rx="2.5"/></g>
  <path d="M82 56c10 2 12 10 10 20" stroke="#6a6f80" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  <ellipse cx="92" cy="78" rx="3.4" ry="5" fill="#3b3f4c"/>
  <ellipse cx="56" cy="56" rx="29" ry="16" fill="#a3a9b8"/>
  <ellipse cx="56" cy="64" rx="22" ry="8" fill="#e4e0d6" opacity=".8"/>
  <path d="M36 52C30 46 28 40 26 34" stroke="#a3a9b8" stroke-width="13" stroke-linecap="round" fill="none"/>
  <path d="M38 48c-4-4-8-10-10-18" stroke="#5f6577" stroke-width="3" stroke-linecap="round" fill="none"/>
  <ellipse cx="22" cy="34" rx="11" ry="8" transform="rotate(24 22 34)" fill="#a3a9b8"/>
  <ellipse cx="13" cy="41" rx="6.4" ry="5" transform="rotate(24 13 41)" fill="#e9e2d4"/>
  <circle cx="11" cy="41" r="1.4" fill="#4a4452"/>
  <ellipse cx="22" cy="17" rx="3.6" ry="11" transform="rotate(-14 22 17)" fill="#a3a9b8"/>
  <ellipse cx="30" cy="17" rx="3.4" ry="11" transform="rotate(12 30 17)" fill="#8d93a3"/>
  <ellipse cx="22" cy="18" rx="1.6" ry="7" transform="rotate(-14 22 18)" fill="#e0b8b0" opacity=".8"/>
  <circle cx="22" cy="31" r="2" fill="#26242e"/>
  <path d="M34 44c8-6 28-8 38 0l-2 16c-12 3-26 3-36 0z" fill="var(--c-sea)"/>
  <path d="M35 49h36M36 54h34" stroke="var(--c-wine)" stroke-width="3.6"/>
  <path d="M34 44c8-6 28-8 38 0" fill="none" stroke="var(--c-gold)" stroke-width="2.4"/>
</symbol>
`;
