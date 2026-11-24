// "Três tentações, uma resposta": em cada rodada, escolher a resposta de Jesus ("Está escrito…").
import { sym, $, $$, esc, burst, refHTML } from './util.js';

const R = [
  { s: 'bread', oferta: '“Se és Filho de Deus, manda que estas pedras se transformem em pães.”',
    o: [
      { t: 'Usar o poder só dessa vez, para matar a fome.', f: '<b>Não era esse o plano.</b> Jesus não faria milagre em benefício próprio: Seus milagres eram para os outros.', ref: 'VJ 32.20', hl: 'Não deveria operar nenhum milagre para beneficiar a Si mesmo' },
      { t: '“Está escrito: Não só de pão viverá o homem, mas de toda palavra que procede da boca de Deus.”', c: 1, f: '<b>Essa é a resposta.</b> Obedecer à Palavra de Deus vale mais do que o alimento.', ref: 'VJ 32.22', hl: 'obedecer à Palavra de Deus é mais importante que conseguir o alimento material' },
      { t: 'Esperar o jejum acabar para decidir depois.', f: '<b>Quase.</b> Mas Jesus respondeu na hora, sem hesitar, com o que Deus já tinha dito.', ref: 'VJ 32.21', hl: 'Está escrito: Não só de pão viverá o homem' },
    ] },
  { s: 'temple', oferta: '“Atira-Te do pináculo do templo, pois está escrito que os anjos Te susterão.”',
    o: [
      { t: 'Pular, só para provar a promessa.', f: '<b>Presunção.</b> A promessa não vale para quem se joga no perigo por conta própria.', ref: 'VJ 33.2', hl: 'a promessa não é para aqueles que voluntariamente se aventuram no perigo' },
      { t: '“Também está escrito: Não tentarás o Senhor, teu Deus.”', c: 1, f: '<b>Isso.</b> Confiamos no cuidado do Pai, mas não vamos aonde Ele não manda.', ref: 'VJ 33.3', hl: 'não devemos ir aonde Ele não nos ordena' },
      { t: 'Ignorar e andar mais depressa.', f: '<b>Fugir não bastou.</b> Jesus respondeu a Bíblia com a Bíblia: um texto não pode ser usado contra outro.', ref: 'VJ 33.2', hl: 'Aqui, Satanás seguiu o exemplo de Cristo citando as Escrituras' },
    ] },
  { s: 'globe', oferta: '“Tudo isto Te darei se, prostrado, me adorares.”',
    o: [
      { t: 'Aceitar só um pouquinho do mundo.', f: '<b>Era tudo ou nada.</b> A oferta incluía o amor do mundo, o poder, a soberba da vida: o que afasta de adorar a Deus.', ref: 'VJ 35.6', hl: 'Essa grande tentação compreendia o amor do mundo, a ambição do poder, a soberba da vida' },
      { t: '“Retira-te, Satanás, porque está escrito: Ao Senhor, teu Deus, adorarás, e só a Ele darás culto.”', c: 1, f: '<b>Essa é a resposta.</b> O tentador não pôde resistir a essa ordem e teve de ir embora.', ref: 'VJ 35.9', hl: 'o tentador não pôde resistir a essa ordem' },
      { t: 'Pensar primeiro nas vantagens.', f: '<b>Perigoso.</b> Satanás sempre mostra as vantagens do mal. Jesus olhou além da beleza e viu um mundo precisando de resgate.', ref: 'VJ 35.1–2', hl: 'Satanás havia apresentado o que o mundo tem de mais atraente' },
    ] },
];
export const REFS = R.flatMap((r) => r.o.map((o) => ({ hl: o.hl, ref: o.ref })));
const FIM = { msg: '<b>Três vezes, a mesma resposta: a Palavra de Deus.</b> Jesus venceu por amor a nós, para que também possamos vencer.', ref: 'VJ 35.12', hl: 'Resisti ao diabo, e ele fugirá de vós' };
REFS.push({ hl: FIM.hl, ref: FIM.ref });

export function mount(host) {
  let i = 0, ok = 0;
  const draw = () => {
    const r = R[i];
    host.innerHTML = `<div class="w es2">
      <div class="es2__top"><span class="es2__dots" aria-label="Rodada ${i + 1} de ${R.length}">${R.map((_, k) => `<i class="${k < i ? 'is-done' : k === i ? 'is-now' : ''}"></i>`).join('')}</span><span class="es2__n">Tentação ${i + 1} de ${R.length}</span></div>
      <div class="es2__offer">${sym(r.s)}<p>${esc(r.oferta)}</p></div>
      <div class="es2__opts" role="group" aria-label="Respostas">${r.o.map((o, k) => `<button type="button" class="es2__opt" data-k="${k}">${esc(o.t)}</button>`).join('')}</div>
      <div id="es2F" aria-live="polite"></div></div>`;
    $('.es2__opts', host).addEventListener('click', (e) => {
      const b = e.target.closest('.es2__opt'); if (!b || b.disabled) return;
      const o = r.o[+b.dataset.k];
      const last = i === R.length - 1;
      $$('.es2__opt', host).forEach((x) => x.classList.toggle('is-pick', x === b));
      if (o.c) {
        $$('.es2__opt', host).forEach((x) => { x.disabled = true; });
        b.classList.add('is-right'); ok++;
        $('#es2F', host).innerHTML = `<div class="es2__fb t-good">${o.f}${refHTML(o.ref, o.hl)}</div>
          <div class="w-row" style="margin-top:8px"><button type="button" class="w-btn w-btn--pri" id="es2N">${last ? 'Ver o resultado' : 'Próxima tentação'}</button></div>`;
        $('#es2N', host).addEventListener('click', () => { if (last) fim(); else { i++; draw(); } });
      } else {
        b.classList.add('is-wrong');
        $('#es2F', host).innerHTML = `<div class="es2__fb t-mid">${o.f}${refHTML(o.ref, o.hl)}<br>Tente outra resposta.</div>`;
      }
    });
  };
  const fim = () => {
    host.innerHTML = `<div class="w es2 es2--fim"><div class="es2__shield" aria-hidden="true">${R.map((r) => sym(r.s)).join('')}</div>
      <p class="w__msg" aria-live="polite">${FIM.msg}${refHTML(FIM.ref, FIM.hl)}</p>
      <div class="w-row"><button type="button" class="w-btn" id="es2R">Jogar de novo</button></div></div>`;
    burst($('.es2__shield', host), 'star', 10);
    $('#es2R', host).addEventListener('click', () => { i = 0; ok = 0; draw(); });
  };
  draw();
}
