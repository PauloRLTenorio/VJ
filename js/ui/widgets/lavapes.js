// "Lave os pés": esfregue com a toalha (dedo ou mouse) até limpar. Jesus fez o trabalho do servo.
import { sym, $, $$, drag, rel, clamp, burst, refHTML } from './util.js';

const FIM = { ref: 'VJ 73.7', hl: 'também vós deveis lavar os pés uns dos outros' };
export const REFS = [{ hl: FIM.hl, ref: FIM.ref }, { hl: 'Ele mesmo Se levantou, cingiu-Se com a toalha, despejou água na bacia e começou a lavar os pés dos discípulos', ref: 'VJ 73.6' }];

export function mount(host) {
  const pontos = [];
  let r = 0; // semente determinística (mesmo desenho a cada vez)
  const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
  host.innerHTML = `<div class="w w--split lp">
    <div class="w__main"><div class="lp__stage" id="lpS" tabindex="0" aria-label="Pés sujos. Esfregue com o dedo para limpar. Ou use o botão Lavar.">
      <div class="lp__feet">${sym('feet')}<div class="lp__dirt" id="lpD"></div></div>
      <div class="lp__basin">${sym('basin')}</div>
      <div class="lp__towel" id="lpT" aria-hidden="true">${sym('towel')}</div>
    </div></div>
    <div class="w__side"><div class="lp__bar" aria-hidden="true"><i id="lpB"></i></div>
    <p class="w__msg" id="lpM" aria-live="polite">Havia bacia, jarro e toalha, mas ninguém quis lavar os pés dos outros. Esfregue até ficarem limpos.</p>
    <div class="w-row"><button type="button" class="w-btn" id="lpW">Lavar com a toalha</button></div></div></div>`;
  const stage = $('#lpS', host), dirt = $('#lpD', host), towel = $('#lpT', host), bar = $('#lpB', host), msg = $('#lpM', host);
  for (let i = 0; i < 34; i++) {
    const pe = i % 2; // dois grupos, um por pé: o esquerdo (embaixo) e o direito (em cima)
    const x = pe ? 0.5 + rnd() * 0.32 : 0.16 + rnd() * 0.32, y = pe ? 0.1 + rnd() * 0.52 : 0.3 + rnd() * 0.52;
    const s = 9 + rnd() * 10;
    const el = document.createElement('i');
    el.className = 'lp__spot'; el.style.cssText = `left:${(x * 100).toFixed(1)}%;top:${(y * 100).toFixed(1)}%;width:${s.toFixed(0)}px;height:${s.toFixed(0)}px;opacity:${(0.65 + rnd() * 0.3).toFixed(2)}`;
    dirt.appendChild(el); pontos.push({ el, x, y, on: true });
  }
  let sobrando = pontos.length, feito = false;
  const total = pontos.length;
  const limpa = (p) => { if (!p.on) return; p.on = false; p.el.classList.add('is-gone'); sobrando--; };
  const finish = () => {
    feito = true; stage.classList.add('is-clean');
    msg.innerHTML = `<b>Limpos.</b> Jesus se levantou, pegou a toalha e lavou os pés dos amigos, sem uma palavra dura. “Também vós deveis lavar os pés uns dos outros.”${refHTML(FIM.ref, FIM.hl)}`;
    burst(stage, 'drop', 10);
  };
  const update = () => {
    bar.style.transform = `scaleX(${(1 - sobrando / total).toFixed(2)})`;
    if (!feito && sobrando <= 1) { pontos.forEach(limpa); bar.style.transform = 'scaleX(1)'; finish(); }
  };
  const esfrega = (e) => {
    const p = rel(stage, e);
    towel.style.left = `${(p.x * 100).toFixed(1)}%`; towel.style.top = `${(p.y * 100).toFixed(1)}%`; towel.classList.add('is-on');
    const raio = Math.max(26, p.h * 0.1);
    pontos.forEach((q) => {
      if (!q.on) return;
      const b = q.el.getBoundingClientRect();
      if (Math.hypot(b.left + b.width / 2 - e.clientX, b.top + b.height / 2 - e.clientY) < raio) limpa(q);
    });
    update();
  };
  drag(stage, { start: esfrega, move: esfrega, end: () => towel.classList.remove('is-on') });
  $('#lpW', host).addEventListener('click', () => {
    // alternativa para teclado e leitores de tela: lava em etapas
    const falta = pontos.filter((q) => q.on);
    falta.slice(0, Math.ceil(total / 4)).forEach(limpa); update();
  });
  stage.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('#lpW', host).click(); } });
}
