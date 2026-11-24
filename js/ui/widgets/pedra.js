// "Role a pedra": arraste a grande pedra do sepulcro. Dentro, luz.
import { sym, $, clamp, drag, rel, burst, refHTML, reduceMotion } from './util.js';

const FIM = { ref: 'VJ 114.12–14', hl: 'Eu sou a ressurreição e a vida' };
const ANJO = { ref: 'VJ 114.12', hl: 'O anjo rolou a grande pedra que selava o túmulo como se fosse um seixo' };
export const REFS = [{ hl: FIM.hl, ref: FIM.ref }, { hl: ANJO.hl, ref: ANJO.ref }];

export function mount(host) {
  host.innerHTML = `<div class="w w--split pd">
    <div class="w__main"><div class="pd__stage" id="pdS" role="slider" tabindex="0" aria-label="Pedra do sepulcro: arraste para o lado ou use as setas" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <svg class="pd__svg" viewBox="0 0 240 190" aria-hidden="true">
        <defs><radialGradient id="pdG" cx=".5" cy=".6" r=".6"><stop offset="0" stop-color="#fffdf0"/><stop offset=".55" stop-color="#ffe9a0"/><stop offset="1" stop-color="#ffc94f"/></radialGradient></defs>
        <circle id="pdGlow" cx="120" cy="120" r="100" fill="url(#g-glow)" opacity="0"/>
        <path d="M6 182V96C6 52 52 20 120 20s114 32 114 76v86z" fill="var(--c-sand-d)"/>
        <path d="M120 20c68 0 114 32 114 76v86h-60V96c0-30-22-56-54-76z" fill="#000" opacity=".1"/>
        <path d="M70 182v-62c0-26 20-42 50-42s50 16 50 42v62z" fill="#2b2236"/>
        <path d="M70 182v-62c0-26 20-42 50-42s50 16 50 42v62z" fill="url(#pdG)" id="pdLit" opacity="0"/>
        <path d="M70 182v-62c0-26 20-42 50-42s50 16 50 42v62" fill="none" stroke="var(--c-stone-d)" stroke-width="6"/>
        <path d="M0 183h240" stroke="var(--c-leaf-d)" stroke-width="8"/>
        <g id="pdStone"><circle cx="120" cy="130" r="50" fill="var(--c-stone)"/><path d="M120 80a50 50 0 0 1 0 100c30-14 40-70 0-100z" fill="var(--c-stone-d)" opacity=".4"/><circle cx="120" cy="130" r="50" fill="none" stroke="var(--c-stone-d)" stroke-width="4"/><path d="M92 110c8-14 22-20 36-18" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".5"/><path d="M118 150l10-14 8 16M96 156l10-5" stroke="var(--c-stone-d)" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/></g>
      </svg>
      <div class="pd__hint" id="pdH">← Arraste a pedra</div>
    </div></div>
    <div class="w__side"><p class="w__msg" id="pdM" aria-live="polite">A entrada foi fechada com uma grande pedra e selada. Soldados montavam guarda. Role a pedra.</p></div></div>`;
  const stage = $('#pdS', host), stone = $('#pdStone', host), lit = $('#pdLit', host), glow = $('#pdGlow', host), msg = $('#pdM', host), hint = $('#pdH', host);
  const MAX = 150; // deslocamento máximo da pedra (unidades do SVG), para a esquerda
  let v = 0, aberto = false;
  const set = (x) => {
    v = clamp(x, 0, 1);
    stone.setAttribute('transform', `translate(${(-v * MAX).toFixed(1)} 0) rotate(${(-v * 220).toFixed(0)} 120 130)`);
    lit.setAttribute('opacity', Math.min(1, v * 1.6).toFixed(2)); glow.setAttribute('opacity', Math.min(1, v * 1.3).toFixed(2));
    stage.setAttribute('aria-valuenow', Math.round(v * 100));
    if (v > 0.97 && !aberto) abrir();
  };
  const abrir = () => {
    aberto = true; stage.classList.add('is-open'); hint.textContent = '';
    msg.innerHTML = `<b>O anjo rolou a pedra “como se fosse um seixo”</b> e chamou: “Jesus, Filho de Deus, Teu Pai Te chama!”. Então Jesus saiu do sepulcro, vencedor: “Eu sou a ressurreição e a vida”.${refHTML(FIM.ref, FIM.hl)}`;
    burst(stage, 'star', 14);
  };
  const solta = () => { if (aberto) return; if (v > 0.55) { animar(v, 1); } else animar(v, 0); };
  const animar = (de, para) => {
    if (reduceMotion()) { set(para); return; }
    const t0 = performance.now();
    const passo = (t) => { const k = clamp((t - t0) / 380, 0, 1); set(de + (para - de) * (1 - (1 - k) * (1 - k))); if (k < 1) requestAnimationFrame(passo); };
    requestAnimationFrame(passo);
  };
  let x0 = 0, v0 = 0;
  drag(stage, { start: (e) => { if (aberto) return; x0 = rel(stage, e).x; v0 = v; hint.style.opacity = 0; }, move: (e) => { if (aberto) return; set(v0 + (x0 - rel(stage, e).x) * 2.4); }, end: solta });
  stage.addEventListener('keydown', (e) => {
    if (aberto) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); animar(v, e.key === 'ArrowRight' ? Math.max(0, v - 0.25) : Math.min(1, v + 0.34)); }
  });
  set(0);
}
