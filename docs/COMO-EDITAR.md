# Como editar e manter o VJ

O site é **estático**: HTML, CSS e JavaScript puros. Não há etapa de build nem dependências. Qualquer servidor de arquivos serve (o GitHub Pages serve direto da branch `main`).

## Rodar no seu computador

```bash
cd VJ
python3 -m http.server 8765
# abra http://localhost:8765/
```

Dica: o navegador guarda arquivos em cache; recarregue com Cmd+Shift+R depois de editar (Safari: ⌥⌘R).

## Onde está cada coisa

| Arquivo | O que faz |
|---|---|
| `index.html` | Estrutura da página inicial, textos fixos (herói, três ideias, sobre o livro, aviso, **seção "Quem fez este site"** `#autor`) e metadados de compartilhamento |
| `js/data/stories.js` | **Todo o conteúdo das 17 paradas** (títulos, cores, cartões, citações), as 4 partes da jornada, o "livro em 60 segundos" e o baralho de frases |
| `js/data/imagens.js` | Troca das ilustrações por imagens (veja `docs/imagens-gemini.md`) |
| `js/ui/sprite.js` + `js/ui/sprite/*.js` | Biblioteca das ilustrações SVG (estrela, manjedoura, ovelha, túmulo…). `SYMBOLS` lista os nomes |
| `js/ui/art.js` | Como as ilustrações são compostas em cada cartão (`layout`, `anim`) e os cenários de fundo (`night`, `dawn`, `desert`, `dusk`, `water`, `sky`, `garden`, `glow`, `plain`) |
| `js/ui/hero.js` | A cena interativa da página inicial ("o caminho") e seus 6 objetos |
| `js/ui/viewer.js` | O visualizador de cartões (toque, deslize, teclado, progresso, modo palestrante) |
| `js/ui/widgets/*.js` | As interações; `index.js` registra cada uma |
| `css/*.css` | Visual: `tokens.css` (cores e tamanhos), `home.css`, `story.css`, `widgets.css` |
| `js/ui/qr.js` · `js/ui/leve.js` | Gerador de QR Code (puro, sem biblioteca) e o bloco "Leve com você" |
| `assets/qr.svg` · `assets/qr.png` | QR Code do site. Gerado por `node scripts/gerar_qr.mjs` |
| `js/ui/refs.js` · `js/data/egw.js` · `js/data/livro.js` | Links "conferir no livro": cada `VJ 10.6` abre o trecho exato no site oficial. `egw.js` é **gerado** (veja abaixo) |

## Editar ou criar um cartão

Em `js/data/stories.js`, cada parada tem uma lista `cards`. Um cartão comum:

```js
say('Título curto do cartão.', 'Texto de apoio, em uma ou duas frases.',
    { items: ['manger', 'star'], layout: 'two', anim: 'pulse' },
    'VJ 10.1–3',                           // referência exibida ("No livro: ...")
    { q: 'citação literal do livro', hl: 'frase que o link destaca' })
```

- `items`: ilustrações do sprite (`star`, `manger`, `sheep`, `lamp`, `tomb`, `cross`, `bread`, `chalice`…; veja `SYMBOLS`).
- `layout`: `one`, `two`, `three`, `four`, `five` ou `orbit`. `anim`: `float`, `sway`, `pulse` ou `bounce`.
- Interações: `widget('estrela', 'Título', 'Instrução')`. Nomes: `anuncio`, `estrela`, `crescer`, `escrito`, `poco`, `samaritano`, `descansar`, `ovelha`, `quem-e-este`, `lavapes`, `vigia`, `cenario`, `trevas`, `pedra`, `emaus`, `florescer`, `plano`, `frase`, `compartilhar`, `reflexao`.
- `q` = citação literal exibida (com a referência); `hl` = frase do livro (não exibida) que o link "No livro" destaca na página do site oficial. Quando há `q` sem `hl`, o destaque é o `q`.
- O cartão final de cada parada é criado sozinho, com o resumo (`recap`) e a indicação de leitura (`book`).

### Formato das referências ao livro

`VJ 10.6` (página 10, parágrafo 6 do livro impresso) · `VJ 10.6–8` (parágrafos 6 a 8 da página 10) · `VJ 11.2–13.4` · `VJ 9–13` (páginas) · `VJ 10.6, 13.2 e 16.8` (lista) · `Cap. 5` · `Cap. 1, “O líder celestial”` · `Caps. 3 e 4`. Os capítulos são os 23 do livro, numerados na ordem. **Escreva sempre nesse formato**: é ele que vira link e que o gerador confere.

## Links para o livro (gerador)

```bash
# precisa do livro baixado em _trabalho/egw/ (python3 scripts/baixar_egw.py; fica FORA do git)
python3 scripts/gerar_links_egw.py      # confere TODAS as referências e citações e gera js/data/egw.js (só IDs e as frases citadas)
node scripts/gerar_fontes.mjs           # docs/FONTES.md: tabela cartão -> passagem
node scripts/gerar_sw.mjs               # service worker offline (rodar SEMPRE antes de publicar)
```

O gerador **falha** se uma referência não existir, estiver fora de ordem, apontar para capítulo ou título inexistente, ou se uma frase `q`/`hl` não estiver na passagem indicada. As interações que citam o livro exportam `REFS = [{ q|hl, ref }]` para entrar na conferência.

## Regras de ouro do conteúdo

1. **Palavras próprias.** O site conta a mensagem do livro (formato "palestrante", cartões curtos). **Citações literais** quando o cartão pede (campo `q`), sempre com a referência e o link para o trecho exato; não copie capítulos inteiros.
2. **Fidelidade.** "O livro diz…": não afirmar o que o texto não afirma; sem polêmica acrescentada. Cenas duras (paixão) com sobriedade, sem detalhes de violência.
3. **Reverência.** Nenhum rosto de Jesus nem de pessoas sagradas: símbolos, objetos, animais, paisagens, luz.
4. **Tom.** Acolhedor, sem culpa, sem medo, sem impor.
5. **Promessas do site verdadeiras.** Hoje: sem rastreamento, sem cookies, sem envio de dados; o caderno e o progresso ficam só no aparelho (`localStorage`). Se isso mudar, ajuste os textos.

## Publicar

`git add -A && git commit && git push` (GitHub Pages, branch `main`, raiz). Antes: `node scripts/gerar_links_egw.py` (se mexeu em referências) e `node scripts/gerar_sw.mjs`. O Pages leva 1–3 min (a CDN pode segurar a versão antiga por até ~10 min).
