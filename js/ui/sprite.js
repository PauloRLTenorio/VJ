// Biblioteca de ilustrações do VJ (Vida de Jesus): símbolos SVG (viewBox 0 0 100 100) coloridos por variáveis CSS (css/tokens.css).
// Uso: <svg viewBox="0 0 100 100"><use href="#s-star"/></svg>. Para trocar por imagens do Gemini, veja js/data/imagens.js.
// Regra de reverência: nenhuma ilustração mostra o rosto de Jesus nem de pessoas sagradas — só símbolos, objetos, animais, paisagens e luz.
import { HERDADOS } from './sprite/herdados.js';
import { NATUREZA } from './sprite/natureza.js';
import { ANIMAIS } from './sprite/animais.js';
import { OBJETOS } from './sprite/objetos.js';
import { SAGRADO } from './sprite/sagrado.js';

export const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
<defs>
  <linearGradient id="g-sky-day" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#b9d3f0"/><stop offset=".55" stop-color="#ffe9c9"/><stop offset="1" stop-color="#ffcf9a"/>
  </linearGradient>
  <linearGradient id="g-hill-1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b5d3a4"/><stop offset="1" stop-color="#93bd8c"/></linearGradient>
  <linearGradient id="g-hill-2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#78b177"/><stop offset="1" stop-color="#559a62"/></linearGradient>
  <linearGradient id="g-hill-3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46865a"/><stop offset="1" stop-color="#2f6a47"/></linearGradient>
  <radialGradient id="g-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3c4" stop-opacity=".95"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient>
  <radialGradient id="g-light" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#fffdf0"/><stop offset=".55" stop-color="#ffe9a0"/><stop offset="1" stop-color="#ffc94f"/></radialGradient>
  <linearGradient id="g-beam-l" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff3b0" stop-opacity=".9"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></linearGradient>
  <linearGradient id="g-beam-r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff3b0" stop-opacity=".9"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></linearGradient>
  <linearGradient id="g-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b57c4f"/><stop offset="1" stop-color="#8c5b3a"/></linearGradient>
  <clipPath id="cp-round"><rect x="2" y="2" width="96" height="96" rx="22"/></clipPath>
</defs>
${HERDADOS}
${NATUREZA}
${ANIMAIS}
${OBJETOS}
${SAGRADO}
</svg>`;

// lista (para a folha de ilustrações de apoio, _trabalho/lab.html)
export const SYMBOLS = [...SPRITE.matchAll(/<symbol id="s-([a-z0-9-]+)"/g)].map((m) => m[1]);
