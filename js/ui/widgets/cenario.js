// "Como você responde?": três situações do dia a dia, à luz do que Jesus fez na noite da prisão e no julgamento. Sem nota: só reflexão.
import { $, $$, esc, refHTML } from './util.js';

export const SC = [
  {
    q: 'Alguém espalha algo injusto sobre você.',
    o: [
      { t: 'Responder na mesma moeda, em voz alta.', c: 'bad', f: 'Jesus fazia o contrário: quando era maltratado, pagava o mal com o bem.', r: 'VJ 45.10', hl: 'Quando era maltratado, Jesus pagava o mal com o bem' },
      { t: 'Falar com calma e gentileza, e deixar a verdade aparecer.', c: 'good', f: 'Diante das acusações, Jesus não gritou: “Se falei mal, dá testemunho do mal; mas, se falei bem, por que Me feres?”.', r: 'VJ 88.1', hl: 'Se falei mal, dá testemunho do mal; mas, se falei bem, por que Me feres?' },
      { t: 'Fingir que nada aconteceu e guardar a mágoa.', c: 'mid', f: 'Guardar mágoa pesa. O livro mostra Jesus tratando até o traidor com tolerância, amor e simpatia.', r: 'VJ 86.7', hl: 'Nisso, Ele nos deu exemplo de tolerância, amor e simpatia' },
    ],
  },
  {
    q: 'Você vê alguém sendo tratado com injustiça e sente vontade de reagir.',
    o: [
      { t: 'Partir para cima, com a “espada” das palavras.', c: 'bad', f: 'Pedro puxou a espada, e Jesus mandou guardá-la: “Embainha a tua espada”.', r: 'VJ 87.1', hl: 'Embainha a tua espada' },
      { t: 'Cuidar de quem foi ferido e acalmar o clima.', c: 'good', f: 'Jesus tocou a orelha ferida do servo, e ela sarou na hora. Cuidou até de quem veio prendê-Lo.', r: 'VJ 86.10', hl: 'Tocou então a orelha ferida, que sarou no mesmo instante' },
      { t: 'Ficar de longe, só olhando.', c: 'mid', f: 'Os discípulos, cheios de medo, deixaram o Mestre sozinho. Ele sabia da fraqueza deles e não deixou de amá-los.', r: 'VJ 87.3', hl: 'cheios de medo, deixaram o Mestre sozinho e fugiram' },
    ],
  },
  {
    q: 'Todo mundo pressiona você a fazer algo que a sua consciência diz que está errado.',
    o: [
      { t: 'Ceder para não perder a posição.', c: 'bad', f: 'Pilatos sabia que Jesus era inocente, mas preferiu sacrificar uma vida inocente a perder a autoridade.', r: 'VJ 101.14', hl: 'Preferiu sacrificar uma vida inocente a perder sua autoridade terrena' },
      { t: 'Manter o que é certo, com firmeza e sem agressividade.', c: 'good', f: 'Jesus foi firme e gentil: “Todo aquele que é da verdade ouve a Minha voz”.', r: 'VJ 97.4', hl: 'Todo aquele que é da verdade ouve a Minha voz' },
      { t: 'Adiar e esperar que o problema passe.', c: 'mid', f: 'Pilatos tentou passar a responsabilidade a Herodes, mas o problema voltou para as mãos dele.', r: 'VJ 97.11', hl: 'Através dessa manobra, Pilatos pensou em transferir a responsabilidade de suas mãos para as de Herodes' },
    ],
  },
];
export const REFS = SC.flatMap((s) => s.o.map((o) => ({ hl: o.hl, ref: o.r })));
const TAG = { good: 'Boa escolha', mid: 'Dá para melhorar', bad: 'Cuidado' };

export function mount(host) {
  let i = 0;
  const draw = () => {
    const s = SC[i];
    host.innerHTML = `<div class="w cn">
      <span class="cn__n">Situação ${i + 1} de ${SC.length}</span>
      <p class="cn__q">${esc(s.q)}</p>
      <div class="cn__opts" role="group" aria-label="Respostas">${s.o.map((o, k) => `<button type="button" class="cn__opt" data-k="${k}">${esc(o.t)}</button>`).join('')}</div>
      <div id="cnF" aria-live="polite"></div></div>`;
    host.querySelector('.cn__opts').addEventListener('click', (e) => {
      const b = e.target.closest('.cn__opt'); if (!b) return;
      const o = s.o[+b.dataset.k];
      $$('.cn__opt', host).forEach((x) => x.classList.toggle('is-pick', x === b));
      const last = i === SC.length - 1;
      $('#cnF', host).innerHTML = `<div class="cn__fb t-${o.c}"><b>${TAG[o.c]}</b>${esc(o.f)}${refHTML(o.r, o.hl)}</div>
        <div class="w-row" style="margin-top:8px"><button type="button" class="w-btn w-btn--pri" id="cnN">${last ? 'Recomeçar' : 'Próxima situação'}</button></div>`;
      $('#cnN', host).addEventListener('click', () => { i = last ? 0 : i + 1; draw(); });
    });
  };
  draw();
}
