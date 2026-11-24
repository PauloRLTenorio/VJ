// "Plano de 7 dias": um gesto pequeno por dia, guardado só no seu aparelho.
import { state } from '../../state.js';
import { sym, $, $$, esc } from './util.js';

const DIAS = [
  'Ao amanhecer, ore ou leia um trecho da Bíblia antes de olhar o celular.',
  'Faça um serviço escondido: lavar, arrumar, ajudar, sem que ninguém peça.',
  'Leve “um copo de água fria” a alguém: uma ajuda, um favor, uma palavra de ânimo.',
  'Perdoe alguém, nem que seja só em oração. Jesus orou por quem o feriu.',
  'Descanse de verdade: pare, olhe a criação e agradeça a quem a fez.',
  'Visite ou ligue para alguém que está só ou triste, como Jesus visitava os lares.',
  'Convide alguém para conhecer este caminho, como André e Filipe fizeram.',
];

export function mount(host, card, ctx) {
  host.innerHTML = `<div class="w pn">
    <div class="pn__top"><div class="pn__plant" aria-hidden="true">${sym('seedling')}${sym('tree')}</div><div class="pn__sum" id="pnS"></div></div>
    <div class="pn__list" id="pnL" role="group" aria-label="Plano de sete dias">${DIAS.map((d, i) => `<button type="button" class="pn__day" role="checkbox" aria-checked="false" data-i="${i}"><b>${i + 1}</b><span>${esc(d)}</span></button>`).join('')}</div>
    <div class="pn__act"><button type="button" class="w-btn w-btn--pri" id="pnShare">Compartilhar meu plano</button><button type="button" class="w-btn" id="pnReset">Recomeçar</button></div></div>`;
  const sum = $('#pnS', host), [seed, tree] = $$('.pn__plant svg', host);
  const paint = () => {
    const c = state.plan().checks;
    $$('.pn__day', host).forEach((el) => el.setAttribute('aria-checked', String(c.includes(+el.dataset.i))));
    const n = c.length;
    seed.style.opacity = n >= 6 ? 0 : 1; seed.style.transform = `scale(${0.7 + n * 0.08})`;
    tree.style.opacity = n >= 6 ? 1 : 0; tree.style.transform = n >= 6 ? 'scale(1)' : 'scale(.5)';
    sum.innerHTML = n === 0 ? 'Comece pelo dia 1<small>Marque cada gesto quando fizer.</small>'
      : n === 7 ? 'Plano completo! 🌳<small>Sete gestos pequenos já formam um começo de caminho.</small>'
      : `${n} de 7 gestos<small>${7 - n === 1 ? 'Falta só um.' : `Faltam ${7 - n}.`}</small>`;
  };
  host.addEventListener('click', async (e) => {
    const d = e.target.closest('.pn__day');
    if (d) { state.togglePlan(+d.dataset.i); paint(); return; }
    if (e.target.closest('#pnReset')) { state.resetPlan(); paint(); return; }
    if (e.target.closest('#pnShare')) {
      const n = state.plan().checks.length;
      const data = { title: 'Meu plano de 7 dias · VJ', text: `Estou fazendo um plano de 7 dias de pequenos gestos para seguir os passos de Jesus (${n}/7 até agora). Vem junto?`, url: 'https://paulorltenorio.github.io/VJ/' };
      try {
        if (navigator.share) await navigator.share(data);
        else { await navigator.clipboard.writeText(`${data.text} ${data.url}`); ctx.toast('Texto copiado!'); }
      } catch (err) { /* cancelado */ }
    }
  });
  paint();
}
