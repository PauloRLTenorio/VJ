# Como trocar as ilustrações por imagens do Gemini

O site já funciona com ilustrações em SVG feitas à mão (leves, nítidas e animadas). Quando você gerar imagens no Gemini, é só soltar os arquivos numa pasta e apontar para eles — **sem mexer no HTML nem nos cartões**.

## Passo a passo

1. Gere a imagem (veja os prompts abaixo) em proporção **4:5 vertical** (ex.: 1200 × 1500 px).
2. Salve em `assets/img/` (crie a pasta se não existir), de preferência em **.webp** ou **.jpg** com menos de 250 KB. Exemplo: `assets/img/parada-1.webp`.
3. Abra `js/data/imagens.js` e preencha a chave correspondente:

   ```js
   'parada-1': 'assets/img/parada-1.webp',
   ```

4. Rode `node scripts/gerar_sw.mjs` (inclui as imagens no cache offline), faça o commit e o push. Em 1 ou 2 minutos o GitHub Pages publica. Chave vazia (`''`) = o site continua usando a ilustração SVG.

## Onde cada imagem aparece

| Chave | Onde aparece | Proporção sugerida |
|---|---|---|
| `hero` | Fundo da página inicial (atrás do texto e da cena interativa) | 16:9 largo (2400 × 1350), com o lado esquerdo mais calmo |
| `parada-1` … `parada-17` | **1º cartão** da parada, **cartão final** e miniatura na lista de paradas | 4:5 (a miniatura recorta o centro) |
| `c-<parada>-<cartão>` | Substitui a ilustração de **um cartão específico**. Ex.: `c-8-4` = parada 8, 4º cartão | 4:5 |
| `og` | Só para referência: a imagem de compartilhamento fica em `assets/og-image.png` (1200 × 630) | 1200 × 630 |

Dicas de composição: um painel de texto cobre o **terço inferior** da imagem no celular; deixe o assunto principal no terço superior e médio. Em celular deitado a imagem é recortada nas laterais; mantenha o centro limpo.

## Regra de reverência (vale para todo prompt)

**Nunca peça o rosto de Jesus nem de pessoas sagradas.** Use símbolos, objetos, animais, paisagens e luz. Se precisar de gente (multidão, pastores), peça **silhuetas de costas, de longe ou só mãos**, sem rosto. Sem cenas de violência, sem sangue.

## Guia de estilo (cole no começo de todo prompt)

> Ilustração editorial em estilo flat, com leve textura de papel, formas arredondadas e suaves, paleta calorosa (creme #FFF8EA, azul-índigo #22376B, azul-noite #1C2A63, dourado #F4B73F, terracota #C9633C, verde-sálvia #8DB596), luz suave, composição vertical 4:5. Assunto principal no terço superior e médio; terço inferior mais simples e calmo. **Sem texto, sem letras, sem logotipos, sem marca d'água. Sem rostos: nenhuma pessoa com rosto visível.**

Todos os temas e cores das paradas estão em `js/data/stories.js` (campo `theme`). Se quiser que cada imagem combine com o fundo do cartão, cite a cor dominante no prompt.

## Prompts sugeridos

**hero** (16:9): *O caminho: uma estrada de terra serpenteando por colinas suaves, da esquerda (uma estrebaria simples sob uma grande estrela dourada, noite azul) até a direita (um túmulo na rocha com a pedra rolada e o sol nascendo, céu pêssego). Pelo caminho: um farol pequeno, uma palmeira, uma ovelha, um cálice. Lado esquerdo mais calmo.*

**parada-1 — Uma noite em Belém**: *Estrebaria simples de palha sob um céu azul-noite cheio de estrelas, uma estrela dourada de quatro pontas brilhando acima, uma manjedoura de madeira com palha dourada iluminada por dentro; ovelhas dormindo ao redor. Sem pessoas.*

**parada-2 — A estrela dos sábios**: *Camelos com mantas coloridas caminhando em silhueta por um deserto azul-violeta à noite, uma grande estrela dourada guiando no alto; no horizonte, pequenas luzes de uma cidade. Sem rostos.*

**parada-3 — O menino de Nazaré**: *Oficina de carpintaria humilde ao amanhecer: bancada de madeira com plaina, serra e martelo, uma tábua clara, luz dourada entrando pela porta, um passarinho pousado na janela. Sem pessoas.*

**parada-4 — Batismo e deserto**: *Rio calmo ao entardecer com uma pomba branca descendo em raios de luz dourada; ao fundo, dunas do deserto em tons de areia e terracota e três pedras sobre a areia. Sem pessoas.*

**parada-5 — Os primeiros passos**: *Poço de pedra à sombra de uma árvore no fim da tarde, cântaro de barro ao lado, céu azul-claro e dourado, água cristalina refletindo a luz; ao fundo, um barco simples à beira do lago. Sem pessoas.*

**parada-6 — A montanha e a estrada**: *Encosta verde de uma montanha ao amanhecer com um farol pequeno e luminoso no alto, estrada de terra serpenteando colina abaixo, um burrinho com cestos na estrada. Sem pessoas.*

**parada-7 — O dia de descanso**: *Campo de trigo dourado ao pôr do sol, uma lua crescente já visível, uma ovelha pastando e um sol suave descendo; tons de lavanda e pêssego, sensação de paz. Sem pessoas.*

**parada-8 — O bom Pastor**: *Colina verde ao crepúsculo com um rebanho de ovelhas dormindo num redil de pedras e, ao longe, uma lanterna acesa no escuro procurando uma ovelha; cajado de madeira encostado numa pedra. Sem pessoas.*

**parada-9 — Hosana!**: *Estrada de terra coberta de túnicas coloridas e ramos de palmeira e oliveira, um jumentinho com manta azul no meio, céu dourado e claro; ao fundo, muralhas e templo de Jerusalém em tons creme. Sem pessoas.*

**parada-10 — A última ceia**: *Sala simples no andar de cima à luz de uma lamparina a óleo: mesa baixa de madeira com pão partido e um cálice, bacia de cobre com água e uma toalha branca dobrada; tons marrom-quente e dourado. Sem pessoas.*

**parada-11 — Getsêmani**: *Jardim de oliveiras antigas à noite sob lua e estrelas, uma lamparina pequena e acesa no chão, nenhuma figura; tons azul-marinho profundos com um brilho dourado discreto.*

**parada-12 — Preso e julgado**: *Pátio de pedra à noite iluminado por tochas, uma bacia de água e um pergaminho enrolado sobre uma mesa de pedra, sombras longas; tons cinza-azulados. Sem pessoas.*

**parada-13 — A cruz**: *Uma cruz simples de madeira sobre uma colina, sob um céu escuro e roxo com um único raio de luz dourada descendo; colina em silhueta. Sem pessoas, sem violência.*

**parada-14 — Ressuscitou!**: *Túmulo escavado na rocha ao amanhecer, a grande pedra rolada para o lado, luz dourada intensa saindo da entrada, céu pêssego e rosa, lírios do campo. Sem pessoas.*

**parada-15 — Paz seja convosco**: *Estrada de Emaús ao entardecer, uma casa simples com a janela acesa, uma mesa com pão partido à porta, céu lavanda e dourado, duas silhuetas de costas ao longe, caminhando (sem rosto).*

**parada-16 — O lar que Ele prepara**: *Terra renovada: rio cristalino, árvore da vida com frutos dourados, colinas verdes, um cordeiro e um lobo deitados lado a lado, casas simples e videiras; luz de manhã; tons verde e azul-claro. Sem pessoas.*

**parada-17 — Seu próximo passo**: *Um par de sandálias de couro à beira de uma estrada que sobe uma colina ao amanhecer, uma estrela dourada ao fundo e pegadas na terra; tons dourado e terracota. Sem pessoas.*
