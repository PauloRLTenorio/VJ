# VJ — Vida de Jesus

> **Ele veio para ficar perto.**
> Uma jornada interativa, em cartões curtos, pela vida de Jesus, a partir do livro *Vida de Jesus* (Ellen G. White): de uma noite em Belém ao lar que Ele prepara.

🔗 **Site:** https://paulorltenorio.github.io/VJ/

## O que é

Um site feito para quem está acostumado a conteúdo curto (stories, shorts, status): em vez de reproduzir o livro, ele **conta a mensagem como um palestrante**, em **17 paradas** de 1 a 2 minutos, mais uma versão de **60 segundos**. Cada parada é uma sequência de cartões com ilustração animada, uma ideia central e a indicação exata de onde ler mais no livro.

- **Página inicial interativa:** "o caminho" (da noite de Belém ao túmulo vazio); cada objeto (estrela, farol, palmeira, túmulo, ovelha, cálice) abre uma história.
- **Cartões em tela cheia:** toque, deslize ou use as setas do teclado; barra de progresso; "continuar de onde parou".
- **Modo palestrante:** botão ▶ reproduz os cartões sozinhos; se o aparelho tiver voz em português, o botão de som narra em voz alta (usa a voz do próprio navegador ou do sistema; o site não envia nada para servidor nenhum, mas algumas vozes do navegador podem ser online).
- **16 interações próprias:** siga a estrela dos magos, puxe a corda do poço, procure a ovelha perdida com a lanterna, lave os pés, vigie e ore, role a pedra do túmulo, caminhe até Emaús, faça o deserto florescer… e mais um plano de 7 dias, uma carta com frase do livro (e imagem para stories) e uma pergunta para levar (caderno só no aparelho).
- **Conferir na fonte:** toda referência (`VJ 10.6` = página 10, parágrafo 6 do livro impresso) é um link que abre o trecho exato no site oficial do livro (m.egwwritings.org); nas citações literais, a frase também fica destacada na página.
- **QR Code do site:** bloco "Leve com você" (tela cheia para projetar numa palestra, copiar o link, baixar o PNG) e o mesmo QR dentro da imagem para stories.
- **Celular primeiro** (em pé e deitado), com tema claro/escuro, funcionando offline e sem rastreamento.
- **Reverência:** nenhuma ilustração mostra o rosto de Jesus; usamos símbolos, objetos, animais e paisagens.

## Como foi feito

HTML, CSS e JavaScript puros (sem build, sem dependências). Ilustrações em SVG feitas à mão (`js/ui/sprite/`), fontes Inter e Newsreader locais (licença SIL OFL). Veja **[docs/COMO-EDITAR.md](docs/COMO-EDITAR.md)**.

```
index.html            página inicial
js/data/stories.js    conteúdo das paradas, "60 segundos" e frases
js/data/imagens.js    troca de ilustrações por imagens (Gemini etc.)
js/ui/…               visualizador, ilustrações (sprite/), herói, interações (widgets/)
css/…                 estilos e tokens de design
docs/                 guias: editar, imagens do Gemini, fontes de cada cartão
scripts/              links para o livro (js/data/egw.js), docs/FONTES.md, service worker (sw.js) e QR Code (assets/qr.*)
```

## Direitos autorais e cuidados

- O livro é uma obra antiga (a autora faleceu há mais de 100 anos) e está em domínio público; mesmo assim este site **não é o livro**: ele conta as cenas e as ideias em **palavras próprias** e cita **trechos pontuais**, sempre com a referência e um **link para o trecho exato** no site oficial (EGW Writings). A tradução e a edição em português podem ter direitos próprios, por isso os trechos são pontuais. O texto do livro baixado para o trabalho **não faz parte** deste repositório (fica em `_trabalho/`, ignorado pelo git); os links guardam apenas IDs de parágrafo do site oficial e as frases citadas.
- Conteúdo devocional, baseado num livro escrito há mais de um século.
- Projeto independente, não oficial; sem fins lucrativos.
- Fontes: [Inter](https://rsms.me/inter/) e [Newsreader](https://github.com/productiontype/Newsreader), ambas SIL Open Font License 1.1.
