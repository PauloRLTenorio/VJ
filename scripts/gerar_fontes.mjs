// Gera docs/FONTES.md: para cada cartão, a passagem do livro que o sustenta (e a citação literal, se houver).
// Uso (na raiz do projeto): node scripts/gerar_fontes.mjs
import { STORIES, RESUMO } from '../js/data/stories.js';
import { writeFileSync } from 'node:fs';

const linhas = [
  '# Fontes de cada cartão',
  '',
  'Este arquivo é gerado por `node scripts/gerar_fontes.mjs` a partir de `js/data/stories.js`.',
  'As referências seguem o formato do próprio livro **Vida de Jesus**: `VJ 10.6` = página 10, parágrafo 6 do livro impresso (`VJ 10.6–8` = parágrafos 6 a 8; `VJ 11.2–13.4` = de 11.2 até 13.4). No site, cada uma é um link que abre o trecho exato no site oficial (EGW Writings).',
  'Os textos do site são **paráfrases em palavras próprias**; só as citações da coluna “Citação literal” são trechos do livro, todas conferidas contra o texto por `scripts/gerar_links_egw.py`.',
  '',
];
const tabela = (s) => {
  linhas.push(`## ${s.n ? `Parada ${s.n} — ` : ''}${s.title}`, '', `Para ler no livro: ${s.book}.`, '', '| # | Cartão | Referência | Citação literal |', '|---|---|---|---|');
  s.cards.forEach((c, i) => {
    const titulo = (c.big || '').replace(/\|/g, '/');
    const q = c.q ? `“${c.q.replace(/\|/g, '/')}”` : '';
    linhas.push(`| ${i + 1} | ${c.k === 'widget' ? '🎮 ' : ''}${titulo} | ${c.ref || '—'} | ${q} |`);
  });
  linhas.push('');
};
tabela(RESUMO);
STORIES.forEach(tabela);
writeFileSync(new URL('../docs/FONTES.md', import.meta.url), linhas.join('\n'));
console.log('docs/FONTES.md gerado');
