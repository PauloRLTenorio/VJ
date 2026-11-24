// "Quem é Este?": as testemunhas dos profetas respondem à pergunta da multidão (como no livro).
import { sym, $, $$, burst, refHTML } from './util.js';

const T = [
  { id: 'adao', nome: 'Adão', s: 'seedling', t: 'É a semente da mulher que esmagará a cabeça da serpente.', ref: 'VJ 64.3', hl: 'É a semente da mulher que esmagará a cabeça da serpente' },
  { id: 'abraao', nome: 'Abraão', s: 'crown', t: 'É Melquisedeque, o Rei de Salém, o Rei da paz.', ref: 'VJ 64.4', hl: 'É Melquisedeque, o Rei de Salém, o Rei da paz' },
  { id: 'jaco', nome: 'Jacó', s: 'star', t: 'Ele é Siló, da tribo de Judá.', ref: 'VJ 64.5', hl: 'Ele é Siló da tribo de Judá' },
  { id: 'isaias', nome: 'Isaías', s: 'scroll', t: 'Emanuel: Maravilhoso Conselheiro, Deus forte, Pai da Eternidade, Príncipe da Paz.', ref: 'VJ 64.6', hl: 'Maravilhoso Conselheiro, Deus forte, Pai da Eternidade, Príncipe da Paz' },
  { id: 'jeremias', nome: 'Jeremias', s: 'olive', t: 'É o Ramo de Davi, o Senhor, Justiça Nossa.', ref: 'VJ 64.7', hl: 'É o Ramo de Davi' },
  { id: 'daniel', nome: 'Daniel', s: 'book', t: 'Ele é o Messias.', ref: 'VJ 65.1', hl: 'Ele é o Messias' },
  { id: 'oseias', nome: 'Oséias', s: 'angel', t: 'Ele é o Senhor Deus dos Exércitos; o Senhor é o Seu nome.', ref: 'VJ 65.2', hl: 'Ele é o Senhor Deus dos Exércitos' },
  { id: 'joao', nome: 'João Batista', s: 'sheep', t: 'Ele é o Cordeiro de Deus, que tira o pecado do mundo.', ref: 'VJ 65.3', hl: 'Ele é o Cordeiro de Deus, que tira o pecado do mundo' },
  { id: 'jeova', nome: 'A voz do Céu', s: 'dove', t: 'Este é o Meu Filho amado.', ref: 'VJ 65.4', hl: 'Este é o meu Filho amado' },
];
const FIM = { ref: 'VJ 65.5', hl: 'Este é Jesus, o Messias, o Príncipe da Vida, o Redentor' };
export const REFS = [...T, FIM].map((x) => ({ hl: x.hl, ref: x.ref }));

export function mount(host) {
  const seen = new Set();
  host.innerHTML = `<div class="w w--split qe">
    <div class="w__main"><div class="qe__grid" role="group" aria-label="Testemunhas">${T.map((x) => `<button type="button" class="qe__tile" data-id="${x.id}" aria-pressed="false">${sym(x.s)}<span>${x.nome}</span></button>`).join('')}</div></div>
    <div class="w__side"><div class="qe__count" id="qeC" aria-hidden="true">0 de ${T.length}</div>
    <p class="w__msg" id="qeM" aria-live="polite">A multidão pergunta: “Quem é Este?”. Toque numa testemunha e ouça a resposta dela.</p></div></div>`;
  const msg = $('#qeM', host), cnt = $('#qeC', host);
  host.addEventListener('click', (e) => {
    const b = e.target.closest('.qe__tile'); if (!b) return;
    const x = T.find((y) => y.id === b.dataset.id);
    $$('.qe__tile', host).forEach((t) => t.classList.toggle('is-now', t === b));
    b.setAttribute('aria-pressed', 'true'); seen.add(x.id);
    cnt.textContent = `${seen.size} de ${T.length}`;
    if (seen.size === T.length && !host.dataset.fim) {
      host.dataset.fim = '1';
      msg.innerHTML = `<b>${x.nome}:</b> “${x.t}”${refHTML(x.ref, x.hl)}`;
      setTimeout(() => { msg.innerHTML = `<b>E nós, Seus discípulos:</b> “Este é Jesus, o Messias, o Príncipe da Vida, o Redentor.”${refHTML(FIM.ref, FIM.hl)}`; burst($('.qe__grid', host), 'star', 12); }, 2600);
    } else msg.innerHTML = `<b>${x.nome}:</b> “${x.t}”${refHTML(x.ref, x.hl)}`;
  });
}
