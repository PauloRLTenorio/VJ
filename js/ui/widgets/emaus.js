// "A estrada de Emaús": caminhe com os dois discípulos, ouça as Escrituras e parta o pão: os olhos se abrem.
import { sym, $, burst, refHTML, mixHex } from './util.js';

const Z = [
  { ate: 14, msg: '<b>Uma estrada triste.</b> Dois discípulos voltam para casa, confusos com tudo o que aconteceu em Jerusalém.', ref: 'VJ 123.1–3', hl: 'Iam perplexos por causa dos últimos acontecimentos' },
  { ate: 52, msg: '<b>Alguém se junta a eles.</b> Um Estranho os acompanha e pergunta o que os preocupa. Eles mal notam quem é.', ref: 'VJ 123.4', hl: 'um Estranho Se aproximou e Se uniu a eles na caminhada' },
  { ate: 99, msg: '<b>Ele abre a Palavra.</b> Começando por Moisés e passando por todos os profetas, explica o que as Escrituras dizem a Seu respeito. Não faz milagre: ensina.', ref: 'VJ 124.3', hl: 'começando por Moisés, discorrendo por todos os profetas, expunha-lhes o que a Seu respeito constava em todas as Escrituras' },
  { ate: 100, msg: '<b>Chegaram, ao pôr do sol.</b> O Estranho fez menção de seguir adiante, mas eles pediram: “Fica conosco, porque é tarde”.', ref: 'VJ 124.8–9', hl: 'Fica conosco, porque é tarde e o dia já declina' },
];
const PAO = { msg: '<b>Os olhos deles se abriram.</b> Quando Jesus abençoou o pão, eles O reconheceram. Esqueceram a fome e o cansaço e correram de volta a Jerusalém para contar.', ref: 'VJ 124.10', hl: 'Naquele momento, os olhos dos discípulos se abriram' };
const CORRER = { ref: 'VJ 125.3', hl: 'Em sua alegria, esqueceram a fome e o cansaço' };
export const REFS = [...Z, PAO, CORRER].map((z) => ({ hl: z.hl, ref: z.ref }));

export function mount(host) {
  host.innerHTML = `<div class="w w--split em">
    <div class="w__main"><div class="em__stage" id="emS">
      <div class="em__sky" aria-hidden="true"></div>
      <div class="em__road" id="emR" aria-hidden="true"></div>
      <div class="em__pair" id="emP" aria-hidden="true"><span class="em__p">${sym('person')}</span><span class="em__p em__p--b">${sym('person')}</span><span class="em__glow" id="emG"></span></div>
      <div class="em__scroll" id="emC" aria-hidden="true">${sym('scroll')}</div>
      <div class="em__house" id="emH" aria-hidden="true">${sym('house')}</div>
      <div class="em__table" id="emT" aria-hidden="true">${sym('bread')}</div>
    </div></div>
    <div class="w__side">
      <input class="w-range" id="emI" type="range" min="0" max="100" value="0" aria-label="Caminho até Emaús (doze quilômetros)" style="--w-track:linear-gradient(90deg,#9aa6c8 0%,#f0b46a 100%)">
      <button type="button" class="w-btn w-btn--pri" id="emB" hidden>Partir o pão</button>
      <p class="w__msg" id="emM" aria-live="polite"></p>
    </div></div>`;
  const r = $('#emI', host), btn = $('#emB', host), msg = $('#emM', host), st = $('#emS', host), pair = $('#emP', host), road = $('#emR', host), glow = $('#emG', host);
  let z = -1, partido = false;
  const upd = () => {
    if (partido) return;
    const v = +r.value;
    st.style.setProperty('--v', (v / 100).toFixed(3));
    road.style.backgroundPosition = `${(-v * 3.2).toFixed(1)}px 50%, 0 0`;
    pair.style.left = `${(14 + v * 0.3).toFixed(1)}%`;
    st.style.setProperty('--c1', mixHex('#9aa6c8', '#f0b46a', v / 100)); st.style.setProperty('--c2', mixHex('#f4e2c6', '#e98f6a', v / 100));
    st.classList.toggle('has-guest', v > 14);
    st.classList.toggle('has-scroll', v > 52 && v < 100);
    st.classList.toggle('is-home', v >= 100);
    btn.hidden = v < 100; r.hidden = v >= 100;
    r.setAttribute('aria-valuetext', `${Math.round(v * 0.12)} de 12 quilômetros`);
    const k = Z.findIndex((q) => v <= q.ate);
    if (k === z) return; z = k;
    msg.innerHTML = Z[k].msg + refHTML(Z[k].ref, Z[k].hl);
  };
  r.addEventListener('input', upd);
  btn.addEventListener('click', () => {
    partido = true; btn.hidden = true;
    st.classList.add('is-bread', 'is-eyes');
    msg.innerHTML = PAO.msg + refHTML(PAO.ref, PAO.hl) + refHTML(CORRER.ref, CORRER.hl);
    burst($('#emS', host), 'star', 12);
    setTimeout(() => st.classList.add('is-run'), 1500);
  });
  void glow;
  upd();
}
