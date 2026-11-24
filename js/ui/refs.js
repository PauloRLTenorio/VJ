// Referências ao livro viram links que abrem o trecho exato no site oficial (m.egwwritings.org), para conferir na fonte.
// Funciona sobre qualquer texto da página: basta escrever "VJ 10.6" (página 10, parágrafo 6 do livro impresso) e o link aparece sozinho.
// Formatos: "VJ 10.6" · "VJ 10.6–8" · "VJ 11.2–13.4" · "VJ 9–13" · "VJ 10.6, 13.2 e 16.8" · "Cap. 5" · "Cap. 1, “O líder celestial”" · "Caps. 3 e 4".
// Os IDs ficam em js/data/egw.js (gerado por scripts/gerar_links_egw.py, que também confere cada referência contra o texto do livro).
// Quando a referência está junto de uma citação literal (elemento com data-q), o link também destaca a frase na página do livro.
import { LIVRO_SITE } from '../data/livro.js';
import { CAPS, REFS, PAGS, TITULOS, CITACOES } from '../data/egw.js';

const N = '\\d{1,3}';
const ITEM = `(?:${N}\\.\\d{1,2}(?:\\s*[–-]\\s*${N}(?:\\.\\d{1,2})?)?|${N}(?:\\s*[–-]\\s*${N})?)`;
const SEP = '(?:\\s*[,;]\\s*|\\s+e\\s+)';
// 1 lista de itens de "VJ …" · 2 rótulo Cap./Caps. · 3 capítulo · 4 segundo capítulo ("Caps. 3 e 4") · 5 título entre aspas
const RE = new RegExp(`\\bVJ\\s+(${ITEM}(?:${SEP}${ITEM})*)|\\b(Caps?\\.)\\s*(\\d{1,2})(?:\\s+e\\s+(\\d{1,2}))?(?:,\\s*“([^”]{3,100})”)?`, 'g');
const RE_ITEM = new RegExp(`^(${N})(?:\\.(\\d{1,2}))?(?:\\s*[–-]\\s*(${N})(?:\\.(\\d{1,2}))?)?$`);
const IGNORAR = 'a, script, style, textarea, input, select, noscript, [data-no-ref]';

const url = (p, frase) => `${LIVRO_SITE}.${p[0]}#${p[1]}${frase ? `:~:text=${frase}` : ''}`;
const capitulo = (c) => CAPS[c] || null;

function link(txt, href, dica) {
  const a = document.createElement('a');
  a.className = 'egw-ref';
  a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer';
  a.dataset.egw = '';
  a.title = dica;
  a.setAttribute('aria-label', `${txt}: ${dica} (abre em outra aba)`);
  a.textContent = txt;
  return a;
}

// o texto de uma citação literal junto de uma referência (se o elemento ou um ancestral tiver data-q)
function citacaoDe(no) {
  const el = no.parentElement && no.parentElement.closest('[data-q]');
  return el ? CITACOES[el.dataset.q] || null : null;
}

// "10.6–8" -> { ini: "10.6", fim: "10.8" } ; "9–13" -> { ini: "9", fim: "13" } (página)
function parseItem(s) {
  const m = s.match(RE_ITEM);
  if (!m) return null;
  const [, p1, n1, p2, n2] = m;
  if (n1 != null) {
    const ini = `${p1}.${n1}`;
    const fim = p2 == null ? ini : n2 == null ? `${p1}.${p2}` : `${p2}.${n2}`;
    return { ini, fim, pagina: false };
  }
  return { ini: p1, fim: p2 || p1, pagina: true };
}

function dicaDe(ini, pagina, dentro) {
  const [pg, pa] = ini.split('.');
  const onde = pagina ? `página ${pg}` : `página ${pg}, parágrafo ${pa}`;
  return `Conferir no livro (${onde})${dentro ? ', com a frase destacada' : ''}`;
}

function nodosVJ(lista, cit) {
  const out = [];
  lista.split(new RegExp(`(${SEP})`)).forEach((p, i) => { // itens e separadores, alternados
    if (i % 2) { out.push(p); return; }
    const it = parseItem(p);
    const txt = `${i === 0 ? 'VJ ' : ''}${p}`;
    const alvo = it && (it.pagina ? PAGS[it.ini] : REFS[it.ini]);
    if (!alvo) { out.push(txt); return; }
    const fimAlvo = it.pagina ? alvo : REFS[it.fim] || alvo;
    const dentro = cit && cit.u[1] >= alvo[1] && cit.u[1] <= fimAlvo[1]; // a citação literal está neste trecho: destaca a frase
    out.push(link(txt, url(dentro ? cit.u : alvo, dentro ? cit.u[2] : ''), dicaDe(it.ini, it.pagina, dentro)));
  });
  return out;
}

function nodosCap(m) {
  const [rot, c1, c2, titulo] = m.slice(2);
  const alvo = (titulo && TITULOS[`${c1}:${titulo}`]) || capitulo(c1);
  const txt = titulo ? `${rot} ${c1}, “${titulo}”` : `${rot} ${c1}`;
  const out = [alvo ? link(txt, url(alvo), titulo && TITULOS[`${c1}:${titulo}`] ? 'Abrir esta parte no livro' : 'Abrir o capítulo no livro') : txt];
  if (c2) { // "Caps. 3 e 4"
    out.push(' e ');
    const a2 = capitulo(c2);
    out.push(a2 ? link(c2, url(a2), 'Abrir o capítulo no livro') : c2);
  }
  return out;
}

export function linkar(raiz) {
  const nos = [];
  if (raiz.nodeType === 3) nos.push(raiz);
  else if (raiz.nodeType === 1) {
    const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) nos.push(n);
  }
  for (const no of nos) {
    const t = no.nodeValue;
    if (!t || (t.indexOf('Cap') < 0 && t.indexOf('VJ') < 0)) continue;
    const pai = no.parentElement;
    if (!pai || pai.closest(IGNORAR)) continue;
    const ms = [...t.matchAll(RE)];
    if (!ms.length) continue;
    const cit = citacaoDe(no);
    const frag = document.createDocumentFragment();
    let pos = 0;
    for (const m of ms) {
      if (m.index > pos) frag.append(t.slice(pos, m.index));
      frag.append(...(m[1] ? nodosVJ(m[1], cit) : nodosCap(m)));
      pos = m.index + m[0].length;
    }
    if (pos < t.length) frag.append(t.slice(pos));
    no.replaceWith(frag);
  }
}

// liga os links agora e sempre que o conteúdo da página mudar (cartões novos, mensagens das interações)
export function observarRefs(raiz) {
  linkar(raiz);
  if (!('MutationObserver' in window)) return;
  new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') linkar(m.target);
      else m.addedNodes.forEach((n) => linkar(n));
    }
  }).observe(raiz, { childList: true, subtree: true, characterData: true });
}
