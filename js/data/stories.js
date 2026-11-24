// Conteúdo do VJ (Vida de Jesus): 17 paradas. Texto em palavras próprias, a partir do livro "Vida de Jesus" (Ellen G. White).
// As citações (campo q) são trechos do livro, sempre com referência e link; o gerador (scripts/gerar_links_egw.py) confere cada uma contra o texto do livro.
// Referências no formato do livro: "VJ 10.6" = página 10, parágrafo 6 do livro impresso ("VJ 10.6–7", "VJ 11.2–13.4", "VJ 9–13", "VJ 10.6, 13.2").
// Cartões: say (afirmação), widget (interação). O cartão final ("end") é acrescentado automaticamente pelo visualizador.
// art: { items:[símbolos], layout:'one|two|three|four|five|orbit', anim:'float|sway|pulse|bounce' }

const say = (big, small, art, ref, extra = {}) => ({ k: 'say', big, small, art, ref, ...extra });
const widget = (w, big, small, extra = {}) => ({ k: 'widget', w, big, small, ...extra });
const refl = (pergunta) => widget('reflexao', 'Uma pergunta para levar', 'Escreva se quiser. Fica só no seu aparelho.', { pergunta });

// Partes (cabeçalhos da lista de paradas)
export const PARTES = [
  { id: 'p1', titulo: 'Cristo vem ao mundo', de: 1 },
  { id: 'p2', titulo: 'Jesus ao lado das pessoas', de: 4 },
  { id: 'p3', titulo: 'A paixão de Cristo', de: 10 },
  { id: 'p4', titulo: 'Vitória e esperança', de: 14 },
];

export const STORIES = [
  {
    id: 'noite-em-belem', n: 1, title: 'Uma noite em Belém',
    hook: 'Sem lugar na hospedaria, nasceu o Rei. E a notícia chegou primeiro a quem orava.',
    icon: 'manger', scene: 'night',
    theme: { a: '#1c2a63', b: '#3b4ea6', ink: '#fff4dc', accent: '#f4c25a', dark: true },
    recap: 'Jesus escolheu nascer entre os humildes, e Deus entregou a boa notícia aos que estavam de coração aberto.',
    book: 'Cap. 1, “O nascimento de Jesus” (pp. 9–13)',
    ponte: 'A luz daquela noite foi vista de muito longe. Quem a seguiu?',
    cards: [
      say('Uma viagem cansativa, uma cidade lotada.', 'José e Maria foram a Belém por causa do censo. As hospedarias estavam cheias, e os dois acharam abrigo numa estrebaria.', { items: ['stable'], layout: 'one', anim: 'float' }, 'VJ 9.2'),
      say('Nasceu numa manjedoura.', 'O Filho do Altíssimo repousou num berço rude. Eram pobres de bens, mas ricos em paz, e os anjos os acompanharam o caminho todo.', { items: ['manger', 'star'], layout: 'two', anim: 'pulse' }, 'VJ 10.1–3', { hl: 'Ali, naquela pobre estrebaria, nasceu Jesus, o Salvador, e foi colocado em uma manjedoura' }),
      say('Ele trocou o Céu pela Terra.', 'Antes de vir, Jesus comandava os anjos. Escolheu a pobreza e a simplicidade para mostrar, de um jeito que todos entendem, o quanto Deus nos ama.', { items: ['crown', 'heart'], layout: 'two', anim: 'float' }, 'VJ 10.6', { q: 'por amor a nós trocou as riquezas do Céu pela pobreza da Terra' }),
      widget('anuncio', 'Para onde foi a boa notícia?', 'Toque numa das portas e descubra.'),
      say('“Não temais.”', 'Os anjos falaram aos pastores nas colinas. Eles foram depressa a Belém e encontraram o Menino, exatamente como o anjo tinha dito.', { items: ['angel', 'sheep', 'star'], layout: 'three', anim: 'float' }, 'VJ 11.1', { q: 'Não temais; eis que vos trago boa-nova de grande alegria' }),
      say('Apresentado a Deus.', 'Com seis semanas, Jesus foi levado ao templo, como a lei pedia. O Filho de Deus quis ensinar a obedecer, obedecendo primeiro.', { items: ['temple'], layout: 'one', anim: 'sway' }, 'VJ 11.2–3'),
      say('Dois que reconheceram.', 'O sacerdote viu só um bebê. Simeão e Ana, que serviam a Deus com a vida inteira, souberam que ali estava o Salvador prometido.', { items: ['scroll', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 13.7–8'),
      say('Luz para quem andava no escuro.', 'Maria guardava tudo no coração e se lembrou da profecia: um Menino nos nasceu, e o Seu nome será Príncipe da Paz.', { items: ['star', 'lamp'], layout: 'two', anim: 'pulse' }, 'VJ 13.16', { q: 'O povo que andava em trevas viu grande luz' }),
      refl('Se Deus escolheu a simplicidade para chegar até nós, onde você pode encontrá-Lo nos lugares simples do seu dia?'),
    ],
  },

  {
    id: 'estrela-dos-sabios', n: 2, title: 'A estrela dos sábios',
    hook: 'Uma luz no céu, uma pergunta em Jerusalém e presentes para um Menino.',
    icon: 'camel', scene: 'night',
    theme: { a: '#2a1f5c', b: '#5a45a8', ink: '#fff4dc', accent: '#ffd47a', dark: true },
    recap: 'Deus quis que todos os povos soubessem. Quem procura com sinceridade é guiado, e o melhor presente é o que damos com amor.',
    book: 'Cap. 2, “A visita dos magos” (pp. 15–17)',
    ponte: 'Os sábios voltaram por outro caminho. E o Menino cresceu: onde, e como?',
    cards: [
      say('Sábios que olhavam o céu.', 'Num país distante, homens estudavam as profecias e os astros. Não eram idólatras: eram honestos e queriam conhecer a verdade.', { items: ['camel', 'star'], layout: 'two', anim: 'float' }, 'VJ 15.4–5'),
      say('Uma estrela nova.', 'Na noite em que os anjos cantaram aos pastores, os sábios viram uma luz estranha no céu. Lembraram uma profecia e resolveram seguir a estrela.', { items: ['star'], layout: 'one', anim: 'pulse' }, 'VJ 16.3'),
      widget('estrela', 'Siga a estrela', 'Arraste e veja o que aconteceu no caminho.'),
      say('Perguntaram em Jerusalém.', 'Perto da cidade, a luz ficou tão fraca que não puderam mais segui-la. Foram perguntar: “Onde está o recém-nascido Rei dos judeus?”. O rei Herodes se alarmou.', { items: ['temple', 'scroll'], layout: 'two', anim: 'sway' }, 'VJ 16.4–6', { hl: 'Onde está o recém-nascido Rei dos judeus' }),
      say('A estrela voltou a guiá-los.', 'Ao saírem de Jerusalém, a estrela reapareceu e parou sobre o lugar onde estava o Menino. A alegria deles foi enorme.', { items: ['star', 'house'], layout: 'two', anim: 'bounce' }, 'VJ 16.7', { q: 'alegraram-se com grande e intenso júbilo' }),
      say('Ouro, incenso e mirra.', 'Os sábios entregaram o que tinham de mais precioso. O livro pergunta: e nós, o que damos ao Amigo que nos dá tantas bênçãos?', { items: ['gold', 'incense', 'myrrh'], layout: 'three', anim: 'float' }, 'VJ 16.8', { q: 'Devemos oferecer a Cristo o melhor de tudo o que temos — nosso tempo, nosso dinheiro, nosso amor.' }),
      say('Deus cuidou da viagem.', 'Herodes fingia querer adorar o Menino. Um anjo avisou em sonho, e José partiu na mesma noite. Os presentes dos sábios pagaram a estada no Egito.', { items: ['moon', 'sandals', 'gold'], layout: 'three', anim: 'float' }, 'VJ 17.1–4', { hl: 'José não esperou amanhecer' }),
      refl('Qual é o seu “ouro, incenso e mirra” hoje: o melhor que você pode oferecer em tempo, recursos e amor?'),
    ],
  },

  {
    id: 'menino-de-nazare', n: 3, title: 'O menino de Nazaré',
    hook: 'Mãos de carpinteiro, coração de servo e as manhãs a sós com Deus.',
    icon: 'hammer', scene: 'dawn',
    theme: { a: '#ffe9c4', b: '#f3c98b', ink: '#3f2a14', accent: '#b4682b', dark: false },
    recap: 'Jesus cresceu na simplicidade: trabalhou bem, serviu aos outros, respondeu com a Palavra e começou o dia com Deus.',
    book: 'Cap. 3, “A infância de Jesus” (pp. 19–23) e Cap. 4, “Conflitos da vida diária” (pp. 25–29)',
    ponte: 'Aos trinta anos, a hora chegou: o rio Jordão e o deserto esperavam.',
    cards: [
      say('Escolheu viver entre os pobres.', 'Podia ter nascido em qualquer lugar. Jesus escolheu Nazaré, uma aldeia simples, para mostrar que entende cada dificuldade e quer ajudar.', { items: ['house', 'hammer'], layout: 'two', anim: 'float' }, 'VJ 19.1–3', { hl: 'Antes escolheu viver entre os pobres em Nazaré' }),
      widget('crescer', 'Crescia em quatro direções', 'Toque e veja o que o livro diz de cada uma.'),
      say('A natureza era a sua escola.', 'Maria o ensinou nas Escrituras, e Jesus aprendia olhando plantas, animais, o Sol e as estrelas. Cada coisa criada era uma lição.', { items: ['book', 'seedling', 'sun'], layout: 'three', anim: 'float' }, 'VJ 20.7–9', { hl: 'No livro da natureza, Ele aprendia sobre as plantas e animais, sobre o Sol e as estrelas' }),
      say('Doze anos, e a casa do Pai.', 'Em Jerusalém, o menino ficou no templo fazendo perguntas aos mestres. José e Maria só o acharam três dias depois.', { items: ['temple'], layout: 'one', anim: 'pulse' }, 'VJ 22.9', { q: 'Não sabíeis que Me cumpria estar na casa de Meu Pai?' }),
      say('Tudo o que fazia era bem feito.', 'Jesus aprendeu o ofício e trabalhou na carpintaria com José. Cuidava até do manejo das ferramentas e nunca usou o Seu poder para facilitar a própria vida.', { items: ['hammer', 'saw', 'plank'], layout: 'three', anim: 'bounce' }, 'VJ 22.17–23.1'),
      say('A bondade em pessoa.', 'Levava água fria a quem tinha sede, repartia o próprio alimento e animava os que ninguém animava. Para Ele, ninguém era pouca coisa.', { items: ['glass', 'bread', 'heart'], layout: 'three', anim: 'float' }, 'VJ 26.5, 28.8'),
      say('“Está escrito.”', 'Quando pressionado a seguir regras que Deus nunca pediu, Jesus mostrava o que a Bíblia diz. Firme e gentil, sem brigar.', { items: ['scroll'], layout: 'one', anim: 'sway' }, 'VJ 26.9', { q: 'Não reprovava as más ações de Seus irmãos, mas lhes mostrava o que Deus havia dito.' }),
      say('Ao amanhecer, a sós com Deus.', 'Antes das tarefas do dia, Jesus buscava um lugar sossegado: cantava, orava e lia a Bíblia. Depois voltava para casa e servia.', { items: ['sunrise', 'bird', 'book'], layout: 'three', anim: 'float' }, 'VJ 28.4'),
      refl('Qual hábito das manhãs de Jesus (orar, cantar, ler) você poderia começar amanhã?'),
    ],
  },

  {
    id: 'deserto', n: 4, title: 'Batismo e deserto',
    hook: 'Do rio Jordão ao deserto: três tentações e uma resposta só.',
    icon: 'dove', scene: 'desert',
    theme: { a: '#fbe6bb', b: '#e5b878', ink: '#3d2a12', accent: '#a4562a', dark: false },
    recap: 'Jesus venceu pela Palavra de Deus e por amor a nós. Quem se chega a Deus tem o mesmo caminho aberto.',
    book: 'Cap. 5, “Buscando força do alto” (pp. 31–35)',
    ponte: 'Vencida a primeira batalha, começou o caminho entre as pessoas: os primeiros chamados.',
    cards: [
      say('O primeiro passo foi o rio.', 'Antes de começar a Sua obra, Jesus foi batizado por João Batista. Não por arrependimento, pois nunca pecou, mas para nos dar o exemplo.', { items: ['river', 'dove'], layout: 'two', anim: 'float' }, 'VJ 32.1–2', { hl: 'Jesus não foi batizado para mostrar arrependimento por Seus próprios pecados' }),
      say('Uma voz do Céu.', 'Jesus orou, o céu se abriu e o Espírito desceu como uma pomba. O livro lembra: a mesma voz de amor alcança até o mais necessitado.', { items: ['dove', 'star'], layout: 'two', anim: 'pulse' }, 'VJ 32.5, 32.7', { q: 'Este é o Meu Filho amado, em quem Me comprazo.' }),
      say('Quarenta dias no deserto.', 'Jesus foi levado ao deserto para meditar e se preparar. Longe de tudo, em jejum, enfrentou o tentador.', { items: ['sun', 'mountain'], layout: 'two', anim: 'float' }, 'VJ 32.8–9'),
      widget('escrito', 'Três tentações, uma resposta', 'Escolha a resposta de Jesus em cada uma.'),
      say('Mandar nas vontades.', 'A primeira tentação foi pelo apetite. O livro diz que cada desejo errado deve ser vencido: o ser humano governa o apetite, e não o contrário.', { items: ['bread', 'stone'], layout: 'two', anim: 'bounce' }, 'VJ 32.16', { q: 'Não devemos ser governados pelo apetite, mas sim governá-lo.' }),
      say('Confiar sem se jogar no perigo.', 'Satanás também citou a Bíblia. Jesus respondeu com outra passagem da Escritura: confiamos em Deus, mas não vamos aonde Ele não manda.', { items: ['temple', 'scroll'], layout: 'two', anim: 'sway' }, 'VJ 33.2–3'),
      say('Viu além da beleza.', 'Satanás mostrou os reinos do mundo e ofereceu tudo em troca de adoração. Jesus voltou-lhe as costas: viu um mundo precisando de resgate.', { items: ['globe', 'crown'], layout: 'two', anim: 'sway' }, 'VJ 35.1–3'),
      say('Resista, e ele fugirá.', 'Jesus venceu por amor a nós, para que também possamos vencer. “Retira-te”, disse, e o tentador teve de ir embora.', { items: ['sunrise', 'feet'], layout: 'two', anim: 'float' }, 'VJ 35.12', { q: 'Resisti ao diabo, e ele fugirá de vós. Chegai-vos a Deus, e Ele Se chegará a vós.' }),
      refl('Qual “está escrito” você quer guardar no coração para o momento da tentação?'),
    ],
  },

  {
    id: 'primeiros-passos', n: 5, title: 'Os primeiros passos',
    hook: 'Um chamado, uma festa e um poço: assim começou o caminho.',
    icon: 'well', scene: 'water',
    theme: { a: '#c4e2f2', b: '#f9e4b4', ink: '#17323f', accent: '#2a7aa0', dark: false },
    recap: 'Jesus começou chamando amigos, e cada amigo chamou outro. Onde havia sede, Ele trouxe água viva.',
    book: 'Cap. 6, “Milagres de Cristo” (pp. 37–41)',
    ponte: 'Pelos povoados, Jesus ensinou o que importa de verdade. E tudo começou numa montanha.',
    cards: [
      say('Alguém para abrir a estrada.', 'Antigamente, antes de um rei passar, trabalhadores tiravam pedras e tapavam buracos. João Batista fez isso com as pessoas, preparando o caminho de Jesus.', { items: ['sandals', 'stone'], layout: 'two', anim: 'sway' }, 'VJ 37.4'),
      say('“Eis o Cordeiro de Deus.”', 'Jesus estava no meio da multidão, com roupas simples. Foi João quem apontou para Ele e disse quem era.', { items: ['star', 'sheep'], layout: 'two', anim: 'float' }, 'VJ 38.5', { q: 'Eis o Cordeiro de Deus, que tira o pecado do mundo!' }),
      say('Um traz o irmão, outro traz o amigo.', 'André chamou Simão, que virou Pedro. Filipe chamou Natanael. Quem conhece Jesus conta ao amigo: é um trabalho que todos podem fazer.', { items: ['speech', 'hands'], layout: 'two', anim: 'bounce' }, 'VJ 38.10–12', { hl: 'André logo trouxe o seu irmão, Simão, a quem Jesus chamou de Pedro' }),
      say('Na festa, faltou a bebida.', 'Em Caná, durante um casamento, o suprimento acabou, um vexame na época. Jesus pediu que enchessem seis talhas de água. O que saiu foi melhor e deu para todos. Ele apreciava ver o povo feliz.', { items: ['jar', 'grapes'], layout: 'two', anim: 'pulse' }, 'VJ 38.14–39.2', { hl: 'pediu que os servos enchessem com água seis grandes talhas' }),
      widget('poco', 'Puxe a corda do poço', 'Arraste para baixo e para cima.'),
      say('Uma conversa à beira do poço.', 'Em Samaria, uma mulher foi buscar água e encontrou Alguém que conhecia a sua vida, mas a tratou como amiga. Ela correu para chamar a cidade.', { items: ['well', 'jar'], layout: 'two', anim: 'sway' }, 'VJ 40.8–10'),
      say('O céu parecia ter baixado.', 'Em Nazaré, muitos deixaram de crer por causa da aparência: “é o carpinteiro”. Mas por onde havia quem quisesse ajuda, Jesus curava e ensinava, e era alegria.', { items: ['hammer', 'heart'], layout: 'two', anim: 'float' }, 'VJ 41.4–9', { q: 'O Céu parecia ter baixado à Terra' }),
      refl('Quem você poderia convidar, como André e Filipe fizeram, para conhecer Jesus?'),
    ],
  },

  {
    id: 'montanha', n: 6, title: 'A montanha e a estrada',
    hook: 'Oito bem-aventuranças, uma luz no escuro e a pergunta: quem é o meu próximo?',
    icon: 'mountain', scene: 'sky',
    theme: { a: '#e0f0d2', b: '#fff0c0', ink: '#1f3a22', accent: '#3e8a5f', dark: false },
    recap: 'Para Jesus, felicidade é um coração humilde e puro, e amor é ajudar quem precisa, sem perguntar quem é.',
    book: 'Cap. 7, “Os ensinos de Cristo” (pp. 43–47)',
    ponte: 'Quem ensina assim também sabe parar e descansar. O que Jesus fazia no sábado?',
    cards: [
      say('Ele veio ensinar algo melhor.', 'Muitos esperavam um reino de poder e riqueza. Jesus veio restaurar o culto de coração puro, que aparece numa vida reta.', { items: ['scroll', 'heart'], layout: 'two', anim: 'float' }, 'VJ 45.1–2', { hl: 'Seu objetivo era restaurar o verdadeiro culto a Deus' }),
      say('Felizes os humildes.', 'No sermão da montanha, Jesus explicou o que Deus considera mais precioso: felizes os que reconhecem que precisam de Deus e se entristecem pelo que fizeram de errado.', { items: ['mountain', 'hands'], layout: 'two', anim: 'sway' }, 'VJ 45.3–7'),
      say('Mansos, famintos de justiça, misericordiosos.', 'Pagar o mal com o bem, ter fome de ser como Cristo, tratar os outros melhor do que merecem: é assim que Deus nos trata.', { items: ['wheat', 'heart'], layout: 'two', anim: 'bounce' }, 'VJ 45.10, 45.11, 46.1'),
      say('Limpos de coração e pacificadores.', 'Deus valoriza o que somos mais do que o que dizemos ser. E quem tem o espírito de Jesus transforma o lar num lugar de paz.', { items: ['dove', 'house'], layout: 'two', anim: 'float' }, 'VJ 46.3–5'),
      say('Vocês são a luz do mundo.', 'Como a luz do farol guia os navios ao porto, quem segue Jesus brilha num mundo escuro e ajuda os outros a chegar em casa.', { items: ['lighthouse'], layout: 'one', anim: 'pulse' }, 'VJ 46.10', { q: 'A luz do farol, brilhando na escuridão, guia os navios ao porto com segurança' }),
      say('“Quem é o meu próximo?”', 'Um doutor da lei queria uma desculpa. Jesus não discutiu: contou a história de uma estrada deserta e de um homem ferido.', { items: ['feet', 'mountain'], layout: 'two', anim: 'sway' }, 'VJ 46.12–14'),
      widget('samaritano', 'Seja o próximo', 'Cuide do homem ferido, gesto por gesto.'),
      say('Vale mais do que todas as riquezas.', 'O sacerdote e o levita passaram do outro lado. Um samaritano, desprezado por muitos, parou e cuidou. Era ele quem guardava o mandamento.', { items: ['heart', 'hands'], layout: 'two', anim: 'pulse' }, 'VJ 47.10', { q: 'Um coração bondoso e compassivo vale mais do que todas as riquezas do mundo.' }),
      refl('Quem está “caído na estrada” no seu caminho esta semana, e qual gesto simples você poderia fazer?'),
    ],
  },

  {
    id: 'descanso', n: 7, title: 'O dia de descanso',
    hook: 'Descansar é um presente: parar, olhar e fazer o bem.',
    icon: 'moon', scene: 'glow',
    theme: { a: '#efe6ff', b: '#ffe9d6', ink: '#33284f', accent: '#6a4fa3', dark: false },
    recap: 'O descanso foi feito para o bem das pessoas: um tempo para lembrar do Criador, repousar e ajudar quem precisa.',
    book: 'Cap. 8, “Jesus também descansava” (pp. 49–52)',
    ponte: 'Quem faz o bem sem cessar também é Pastor: Ele cuida de cada ovelha.',
    cards: [
      say('Quem fez o descanso?', 'Para o livro, Jesus trabalhou com o Pai na Criação e foi Ele quem fez o sábado. Cada vez que vemos o Sol, as estrelas, as árvores e as flores, lembramos do Seu amor e poder.', { items: ['sun', 'moon', 'tree'], layout: 'three', anim: 'float' }, 'VJ 49.2, 49.3'),
      say('Fome no campo de trigo.', 'Voltando da sinagoga, os discípulos colheram espigas e comeram. Alguns acusaram, mas Jesus lembrou o rei Davi e defendeu os amigos.', { items: ['wheat', 'bread'], layout: 'two', anim: 'sway' }, 'VJ 50.1–4'),
      say('Feito para o bem das pessoas.', 'O descanso não foi feito para ser um peso. Foi feito para o bem das pessoas, para dar-lhes paz e repouso.', { items: ['heart', 'moon'], layout: 'two', anim: 'pulse' }, 'VJ 50.5', { q: 'O sábado foi estabelecido por causa do homem, e não o homem por causa do sábado.' }),
      say('Fazer o bem sempre cabe.', 'Diante de um homem de mão ressequida, Jesus perguntou: se uma ovelha cai numa cova, você não a tira? Quanto mais vale uma pessoa!', { items: ['hands', 'sheep'], layout: 'two', anim: 'bounce' }, 'VJ 50.6–8'),
      widget('descansar', 'Três passos do descanso', 'Pare, olhe e faça o bem.'),
      say('“Queres ser curado?”', 'Em Betesda, um homem estava paralítico havia trinta e oito anos, sempre passado para trás. Jesus perguntou e disse: “Levanta-te, toma o teu leito e anda”. Ele correu louvando a Deus a cada passo.', { items: ['mat', 'feet'], layout: 'two', anim: 'float' }, 'VJ 51.9–52.4'),
      say('Parar não é ficar parado.', 'Deus trabalha sem parar para sustentar a vida. Para o livro, o descanso é um repouso saudável, com tempo para adorar a Deus e cuidar de quem precisa.', { items: ['sun', 'heart', 'hands'], layout: 'three', anim: 'float' }, 'VJ 52.10', { q: 'um repouso saudável, dedicando tempo para adorar a Deus e assistindo aos necessitados' }),
      refl('Qual parte do seu descanso poderia ser mais “descanso”: mais repouso, mais gratidão ou mais bondade?'),
    ],
  },

  {
    id: 'bom-pastor', n: 8, title: 'O bom Pastor',
    hook: 'Ele conhece cada ovelha pelo nome e vai atrás da que se perdeu.',
    icon: 'sheep', scene: 'garden',
    theme: { a: '#e3f3d6', b: '#b9dfae', ink: '#1b3a22', accent: '#2f7a4a', dark: false },
    recap: 'Para Jesus, cada pessoa importa: Ele guarda o rebanho, procura quem se perdeu e dá a vida pelas ovelhas.',
    book: 'Cap. 9, “O bom pastor” (pp. 55–58)',
    ponte: 'Quando o Pastor chegou a Jerusalém, uma multidão o recebeu com ramos nas mãos.',
    cards: [
      say('“Eu sou o bom Pastor.”', 'Jesus usou uma imagem que todos conheciam. Sempre que os discípulos vissem um pastor com o rebanho, lembrariam do Seu amor por eles.', { items: ['sheep'], layout: 'one', anim: 'sway' }, 'VJ 55.1–3', { q: 'Eu sou o bom Pastor; conheço as Minhas ovelhas, e elas Me conhecem a Mim.' }),
      say('Dia e noite de cuidado.', 'O pastor leva o rebanho a boas pastagens, vigia à noite contra animais e ladrões e carrega no colo os cordeirinhos fracos ou doentes.', { items: ['sheep', 'mountain', 'moon'], layout: 'three', anim: 'float' }, 'VJ 55.4–6'),
      say('Chama cada uma pelo nome.', 'Por maior que seja o rebanho, o pastor conhece todas. Jesus nos conhece pelo nome e sabe onde moramos.', { items: ['sheep', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 56.2', { q: 'Cuida de cada um como se não houvesse mais ninguém no mundo todo.' }),
      widget('ovelha', 'Procure a ovelha perdida', 'Arraste a luz pela noite.'),
      say('Ele está procurando você.', 'Se falta uma ovelha, o pastor não descansa até achá-la. Para quem se sente longe, o livro garante: voltar é possível, e há festa no Céu.', { items: ['lantern', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 56.16', { q: 'O bom Pastor está procurando você.' }),
      say('Olhos nEle, e a mão se estende.', 'Pedro andou sobre as águas enquanto olhou para Jesus. Quando desviou o olhar, começou a afundar e gritou. A mão firme do Mestre o sustentou.', { items: ['hands', 'drop'], layout: 'two', anim: 'float' }, 'VJ 56.22–23'),
      say('Cegos veem, coxos andam.', 'João Batista, preso, teve dúvidas. Jesus mandou dizer o que estava acontecendo: curas, consolo e boas notícias para os pobres.', { items: ['lamp', 'hands', 'heart'], layout: 'three', anim: 'float' }, 'VJ 58.5', { q: 'Os cegos vêem, os coxos andam, os leprosos são purificados, os surdos ouvem, os mortos são ressuscitados, e aos pobres está sendo pregado o evangelho.' }),
      say('O bom Pastor dá a vida pelas ovelhas.', 'Durante três anos e meio, Jesus andou fazendo o bem. Chegou a hora de subir a Jerusalém.', { items: ['sheep', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 58.6, 58.7', { q: 'O bom Pastor dá a vida pelas ovelhas.' }),
      refl('Se Jesus cuida de você como se não houvesse mais ninguém no mundo, o que isso muda na sua semana?'),
    ],
  },

  {
    id: 'hosana', n: 9, title: 'Hosana!',
    hook: 'Uma multidão canta, as crianças lideram e as pedras clamariam.',
    icon: 'palm', scene: 'sky',
    theme: { a: '#fff3c4', b: '#bfe4c6', ink: '#203a24', accent: '#2f7a4a', dark: false },
    recap: 'Jesus entrou em Jerusalém como Rei de paz, acolhido por quem Ele ajudou. Os pequenos O louvaram, e Ele cuidou de cada um.',
    book: 'Cap. 10, “O príncipe da paz” (pp. 61–65) e Cap. 11, “Jesus reprova a corrupção” (pp. 67–69)',
    ponte: 'Naquela semana, antes da Páscoa, Jesus reuniu os amigos numa sala no andar de cima.',
    cards: [
      say('Um jumentinho, não um cavalo.', 'Jesus entrou em Jerusalém montado num jumentinho, como o profeta tinha anunciado: um Rei humilde. O povo estendeu túnicas e ramos no caminho.', { items: ['donkey', 'palm'], layout: 'two', anim: 'float' }, 'VJ 61.2–63.1'),
      say('Quem cantava? Os que Ele ajudou.', 'Na multidão estavam cegos que enxergavam, mudos que falavam, leprosos curados, viúvas, órfãos e até Lázaro. O louvor era a gratidão deles.', { items: ['hands', 'heart', 'sun'], layout: 'three', anim: 'bounce' }, 'VJ 63.5–8', { hl: 'Na grande multidão que cercava o Salvador havia evidências de Seu poder de operar milagres' }),
      say('“Hosana!”', 'O grito rolou de colina em colina. Os fariseus quiseram calar o povo, mas Jesus respondeu: se eles se calarem, as próprias pedras clamarão.', { items: ['palm', 'stone'], layout: 'two', anim: 'pulse' }, 'VJ 63.14', { q: 'se eles se calarem, as próprias pedras clamarão' }),
      widget('quem-e-este', 'Quem é Este?', 'Toque nas testemunhas e escute o que cada uma diz.'),
      say('Do alto da colina, Ele chorou.', 'Quando Jerusalém apareceu, o povo se calou, maravilhado. Jesus não: chorou. Amava a cidade e sabia o que a esperava por rejeitá-Lo.', { items: ['drop', 'temple'], layout: 'two', anim: 'float' }, 'VJ 63.16–19'),
      say('A casa de oração.', 'No dia seguinte, no templo, havia barulho e comércio. Jesus ergueu a voz com autoridade, e os comerciantes saíram depressa.', { items: ['temple', 'scroll'], layout: 'two', anim: 'sway' }, 'VJ 68.3', { q: 'A Minha casa será casa de oração.' }),
      say('Depois da firmeza, a ternura.', 'Logo o átrio se encheu de doentes. Temiam o olhar severo, mas encontraram só compaixão. Jesus curava e acolhia até as crianças no colo.', { items: ['hands', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 68.7–9', { hl: 'o que encontraram em Sua face foi somente ternura e compaixão' }),
      say('As crianças tomaram a frente.', 'Os pequenos repetiam o “Hosana” no templo. Os líderes reclamaram, e Jesus respondeu: da boca de crianças Deus tira perfeito louvor.', { items: ['palm', 'star'], layout: 'two', anim: 'bounce' }, 'VJ 68.17', { q: 'Da boca de pequeninos e crianças de peito tiraste perfeito louvor' }),
      refl('Se você estivesse naquela multidão, qual seria o seu “Hosana”, o motivo da sua gratidão?'),
    ],
  },

  {
    id: 'ultima-ceia', n: 10, title: 'A última ceia',
    hook: 'Uma toalha, uma bacia e o pão partido: o Mestre serve.',
    icon: 'chalice', scene: 'night',
    theme: { a: '#3b2416', b: '#6b4226', ink: '#fff1d4', accent: '#f4b73f', dark: true },
    recap: 'O maior se faz servo. Jesus lavou os pés dos amigos, partiu o pão e orou para que todos fossem um.',
    book: 'Cap. 12, “A última páscoa” (pp. 71–77)',
    ponte: 'Depois da ceia, saíram para um jardim, onde Jesus costumava orar.',
    cards: [
      say('Prontos para partir.', 'Na primeira Páscoa, no Egito, o povo comeu pronto para a jornada: sandálias nos pés e cajado na mão. O cordeiro e o sangue na porta lembravam a libertação.', { items: ['sandals', 'sheep'], layout: 'two', anim: 'float' }, 'VJ 71.1–6'),
      say('Siga o homem do cântaro.', 'Jesus mandou Pedro e João seguirem um homem com um cântaro de água, até uma sala espaçosa no andar de cima. Tudo aconteceu como Ele tinha dito.', { items: ['jar', 'house'], layout: 'two', anim: 'float' }, 'VJ 72.4–6'),
      say('“Desejei muito esta Páscoa.”', 'Era a última. Com a voz embargada, Jesus disse que queria comê-la com eles antes do Seu sofrimento. O cordeiro sempre apontou para Ele.', { items: ['lamp', 'sheep'], layout: 'two', anim: 'pulse' }, 'VJ 72.9', { q: 'Tenho desejado ansiosamente comer convosco esta Páscoa, antes do Meu sofrimento.' }),
      say('Ninguém quis lavar os pés.', 'Os discípulos discutiam quem seria o maior. Havia bacia, jarro e toalha, mas nenhum se ofereceu. Então Jesus se levantou, cingiu a toalha e começou a lavar.', { items: ['basin', 'towel'], layout: 'two', anim: 'float' }, 'VJ 73.3–6', { hl: 'os discípulos não queriam fazer o papel de servo de seus irmãos' }),
      widget('lavapes', 'Lave os pés', 'Esfregue com o dedo até ficarem limpos.'),
      say('Servir, não ser servido.', 'Sem uma palavra dura, Jesus ensinou pelo exemplo. Os discípulos se envergonharam do ciúme, e só então estavam prontos para ouvir.', { items: ['basin', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 73.7', { q: 'Porque Eu vos dei o exemplo, para que, como Eu vos fiz, façais vós também.' }),
      say('Pão partido, cálice da nova aliança.', 'Jesus partiu o pão e passou o cálice: lembrança de que o Seu corpo seria partido e o Seu sangue derramado. Até que Ele venha.', { items: ['bread', 'chalice'], layout: 'two', anim: 'float' }, 'VJ 76.1–2, 76.4'),
      say('Orou também por nós.', 'Jesus consolou os amigos: iria preparar um lugar e voltaria. E orou para que todos fossem um, e por quantos viessem a crer, inclusive nós.', { items: ['hands', 'dove'], layout: 'two', anim: 'pulse' }, 'VJ 77.8–12', { q: 'a fim de que todos sejam um' }),
      refl('Que serviço pequeno e escondido você pode fazer por alguém hoje, sem esperar que percebam?'),
    ],
  },

  {
    id: 'getsemani', n: 11, title: 'Getsêmani',
    hook: 'Na noite mais difícil, uma oração: “Seja feita a Tua vontade”.',
    icon: 'olive-tree', scene: 'night',
    theme: { a: '#10183a', b: '#243a73', ink: '#f1e8d2', accent: '#9db9ee', dark: true },
    recap: 'Sozinho no jardim, Jesus escolheu a vontade do Pai e salvar a humanidade a qualquer custo. E ainda teve ternura com os que dormiam.',
    book: 'Cap. 13, “Angústia no Getsêmani” (pp. 79–83)',
    ponte: 'Então ouviram passos: a multidão que vinha prendê-Lo.',
    cards: [
      say('Uma vida de oração.', 'Jesus passava muitas horas a sós com Deus, pedindo sabedoria e força. O livro lembra que Ele confiava no Pai com a simplicidade de uma criança, e que, sem Ele, nada podemos fazer.', { items: ['olive-tree', 'moon'], layout: 'two', anim: 'float' }, 'VJ 79.1–4', { q: 'Sem Mim nada podeis fazer.' }),
      say('“Ficai aqui e vigiai comigo.”', 'Perto do jardim, Jesus se calou: o peso do pecado do mundo caía sobre Ele. Deixou os outros na entrada e levou Pedro, Tiago e João, pedindo que ficassem ali e vigiassem. Foi um pouco adiante e caiu em oração.', { items: ['moon', 'hands'], layout: 'two', anim: 'pulse' }, 'VJ 80.4', { q: 'Ficai aqui e vigiai comigo.' }),
      say('“Não seja como Eu quero.”', 'Três vezes Jesus orou. A resposta foi a entrega: “não seja como Eu quero, e sim como Tu queres”. E decidiu salvar a humanidade a qualquer custo.', { items: ['lamp', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 80.7, 81.8', { q: 'Todavia, não seja como Eu quero, e sim como Tu queres.' }),
      widget('vigia', 'Vigiai e orai', 'Segure o botão e fique em vigília.'),
      say('Os amigos dormiam.', 'Jesus voltou à procura de um gesto de apoio, mas Pedro, Tiago e João dormiam. Ele perguntou: “Não pudeste vigiar nem uma hora?”.', { items: ['moon', 'feet'], layout: 'two', anim: 'float' }, 'VJ 80.8–11'),
      say('E Ele não os reprovou.', 'Em vez de cobrar, Jesus os desculpou. O livro chama isso de um exemplo de ternura e piedoso amor.', { items: ['heart', 'hands'], layout: 'two', anim: 'pulse' }, 'VJ 81.3', { q: 'O espírito, na verdade, está pronto, mas a carne é fraca.' }),
      say('Um anjo o fortaleceu.', 'No silêncio do Céu, um anjo desceu para consolá-Lo. Ele não estava só: o Pai sofria com o Filho, e a paz voltou ao Seu rosto.', { items: ['angel', 'star'], layout: 'two', anim: 'float' }, 'VJ 83.2–4'),
      refl('Que decisão difícil você precisa entregar a Deus, dizendo com sinceridade: “seja feita a Tua vontade”?'),
    ],
  },

  {
    id: 'preso-e-julgado', n: 12, title: 'Preso e julgado',
    hook: 'Calmo diante dos que O acusavam: o Rei que não se defendeu com violência.',
    icon: 'scroll', scene: 'plain',
    theme: { a: '#1f2733', b: '#3d4a60', ink: '#eef1f8', accent: '#c9d6f0', dark: true },
    recap: 'Jesus respondeu ao mal com calma, cuidou de quem O seguia e escolheu o silêncio. Pilatos soube a verdade e cedeu à pressão.',
    book: 'Cap. 14, “Traição e prisão de Jesus” (pp. 85–93) e Cap. 15, “O julgamento de Cristo” (pp. 95–102)',
    ponte: 'E a sentença chegou: o Calvário.',
    cards: [
      say('“Sou Eu.”', 'Jesus saiu ao encontro dos que vinham prendê-Lo e perguntou: “A quem buscais?”. Depois pediu que deixassem os amigos irem. Pensava neles primeiro.', { items: ['lantern', 'sandals'], layout: 'two', anim: 'float' }, 'VJ 85.1–2, 86.3–4', { hl: 'A Jesus, o Nazareno' }),
      say('“Amigo, para que vieste?”', 'Judas se aproximou com um beijo, e Jesus o chamou de amigo. O livro vê ali um exemplo de tolerância, amor e simpatia até com quem nos fere.', { items: ['heart', 'dove'], layout: 'two', anim: 'sway' }, 'VJ 86.5, 86.7', { q: 'Amigo, para que vieste?' }),
      say('“Embainha a tua espada.”', 'Pedro puxou a espada e feriu o servo do sacerdote. Jesus disse “Deixai, basta”, tocou a orelha ferida e a curou. Podia pedir legiões de anjos, e não pediu.', { items: ['sword', 'hands'], layout: 'two', anim: 'bounce' }, 'VJ 86.9–10, 87.1'),
      say('Os amigos fugiram, e Ele seguiu.', 'Sem entender, os discípulos deixaram o Mestre sozinho. Jesus já tinha avisado que isso aconteceria, e que o Pai continuaria com Ele.', { items: ['moon', 'feet'], layout: 'two', anim: 'float' }, 'VJ 87.3–4', { q: 'contudo, não estou só, porque o Pai está comigo' }),
      say('Como um cordeiro, em silêncio.', 'Diante dos juízes, as acusações não se sustentavam e Jesus quase não respondeu. O profeta tinha descrito esse silêncio séculos antes.', { items: ['sheep', 'scroll'], layout: 'two', anim: 'sway' }, 'VJ 88.8, 89.1', { q: 'como cordeiro foi levado ao matadouro' }),
      widget('cenario', 'Como você responde?', 'Três situações do dia a dia.'),
      say('“Que é a verdade?”', 'Pilatos sentiu que Jesus falava a verdade. Perguntou “que é a verdade?”, mas não esperou a resposta: a multidão gritava lá fora, e ele voltou a olhar para o momento.', { items: ['book', 'scroll'], layout: 'two', anim: 'float' }, 'VJ 97.4–6', { q: 'Todo aquele que é da verdade ouve a Minha voz.' }),
      say('Quando a pressão fala mais alto.', 'Pilatos declarou várias vezes que não achava crime algum. Mas preferiu perder um inocente a perder a sua posição. Lavar as mãos não apagou a decisão.', { items: ['basin', 'scroll'], layout: 'two', anim: 'float' }, 'VJ 101.13–14', { q: 'Preferiu sacrificar uma vida inocente a perder sua autoridade terrena.' }),
      refl('Em que situação é mais difícil, para você, escolher o certo quando a pressão aumenta?'),
    ],
  },

  {
    id: 'a-cruz', n: 13, title: 'A cruz',
    hook: '“Pai, perdoa-lhes”: o amor no ponto mais alto.',
    icon: 'cross', scene: 'night',
    theme: { a: '#1d1b30', b: '#4a3a66', ink: '#f6ecd8', accent: '#f5c453', dark: true },
    recap: 'Jesus podia ter descido da cruz, mas ficou por amor a nós. E pediu perdão até para quem não entendia.',
    book: 'Cap. 16, “A glória do Calvário” (pp. 105–108) e Cap. 17, “Ressurreição e vitória” (pp. 111–114)',
    ponte: 'Ao pôr do sol, um sepulcro novo, uma pedra grande… e a noite mais escura antes do amanhecer.',
    cards: [
      say('O peso que virou graça.', 'Jesus não aguentou mais carregar a cruz, e obrigaram Simão de Cirene, que passava ali. Ele nem era seguidor, mas depois se sentiu sempre grato por ter carregado.', { items: ['cross', 'feet'], layout: 'two', anim: 'float' }, 'VJ 105.4, 106.1'),
      say('“Pai, perdoa-lhes.”', 'No meio do sofrimento, Jesus pensou nos que O feriam. Teve pena da ignorância deles e orou por todos, inclusive por cada um de nós.', { items: ['heart', 'hands'], layout: 'two', anim: 'pulse' }, 'VJ 108.1–2', { q: 'Pai, perdoa-lhes, porque não sabem o que fazem.' }),
      say('Escrito para todos lerem.', 'Pilatos mandou escrever o letreiro em latim, grego e hebraico: “Jesus Nazareno, o Rei dos judeus”. Quando pediram que mudasse, respondeu: “O que escrevi, escrevi”.', { items: ['scroll', 'crown'], layout: 'two', anim: 'sway' }, 'VJ 108.4–9'),
      say('Podia ter descido.', 'Zombaram: “desça da cruz, e creremos”. Mas se Ele tivesse descido, não poderíamos ser salvos. Por amor a nós, Jesus aceitou morrer.', { items: ['cross', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 108.14', { q: 'Por amor a nós, Ele Se dispôs a morrer.' }),
      widget('trevas', 'Do meio-dia às três', 'Arraste o relógio do sol.'),
      say('“Está consumado!”', 'A escuridão se abriu e Jesus exclamou com voz clara. A obra estava completa. A dor maior dEle era o peso do pecado do mundo e a separação do Pai.', { items: ['star', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 112.7–9, 111.1', { q: 'Está consumado!' }),
      say('Dois homens tomaram posição.', 'Quando os discípulos estavam sem esperança, José de Arimateia e Nicodemos, líderes ricos, pediram o corpo e o sepultaram com honra num sepulcro novo. Mostraram coragem.', { items: ['tomb', 'stone'], layout: 'two', anim: 'float' }, 'VJ 112.14–113.5'),
      refl('O amor de Jesus chegou ao ponto de perdoar. Há alguém a quem você precisa dizer “eu perdoo”?'),
    ],
  },

  {
    id: 'ressuscitou', n: 14, title: 'Ressuscitou!',
    hook: 'A noite mais escura antes do amanhecer, e uma voz que chama pelo nome.',
    icon: 'tomb', scene: 'dawn',
    theme: { a: '#ffe3b0', b: '#ffb48a', ink: '#4a2412', accent: '#d9533a', dark: false },
    recap: 'O túmulo ficou vazio: Jesus ressuscitou. Quem O procurava ouviu “não temais”, e Maria foi chamada pelo nome.',
    book: 'Cap. 17, “Ressuscitou!” (p. 114) e Cap. 18 (pp. 119–121)',
    ponte: 'Naquele mesmo dia, dois discípulos caminhavam tristes para Emaús. Alguém se juntou a eles.',
    cards: [
      say('Selo e guarda na pedra.', 'A entrada do sepulcro foi fechada com uma grande pedra e selada, e soldados montaram guarda. Parecia que nada sairia dali.', { items: ['stone', 'moon'], layout: 'two', anim: 'float' }, 'VJ 114.1–4', { hl: 'A entrada do sepulcro havia sido fechada com uma grande pedra e foi guardada com a máxima segurança' }),
      say('A hora mais escura.', 'A noite se arrastava e chegou a hora mais escura antes do amanhecer. Então o céu se iluminou: um anjo poderoso foi enviado.', { items: ['moon', 'star'], layout: 'two', anim: 'float' }, 'VJ 114.6–7'),
      widget('pedra', 'Role a pedra', 'Arraste a pedra para o lado.'),
      say('“Eu sou a ressurreição e a vida.”', 'A pedra rolou como se fosse um seixo. O anjo chamou, e Jesus saiu do sepulcro, vencedor. A multidão de anjos O adorou.', { items: ['tomb', 'sunrise'], layout: 'two', anim: 'pulse' }, 'VJ 114.12, 114.14', { q: 'Eu sou a ressurreição e a vida.' }),
      say('As mulheres foram cedo.', 'No sábado elas descansaram, segundo o mandamento. Ao amanhecer do primeiro dia da semana foram ao túmulo com perfumes: a pedra tinha sido removida e o túmulo estava vazio.', { items: ['sunrise', 'jar'], layout: 'two', anim: 'float' }, 'VJ 119.2–4, 120.1–2'),
      say('“Não temais.”', 'Os anjos disseram: Ele não está aqui, ressuscitou! Ide depressa e contai. E perguntaram: por que buscar entre os mortos Aquele que vive?', { items: ['angel', 'tomb'], layout: 'two', anim: 'pulse' }, 'VJ 120.4, 120.6', { q: 'Por que buscais entre os mortos ao que vive?' }),
      say('“Maria!”', 'Maria Madalena ficou chorando junto à sepultura. Pensou que falava com o jardineiro, até ouvir seu nome. Reconheceu a voz: “Raboni!”.', { items: ['heart', 'sunrise'], layout: 'two', anim: 'bounce' }, 'VJ 121.3–4', { q: 'Maria!' }),
      refl('Se Jesus chamasse você pelo nome hoje, o que gostaria de dizer a Ele?'),
    ],
  },

  {
    id: 'paz-seja-convosco', n: 15, title: 'Paz seja convosco',
    hook: 'Emaús: um Estranho na estrada, o pão partido e uma promessa: “Estou convosco”.',
    icon: 'bread', scene: 'dusk',
    theme: { a: '#ffd8b0', b: '#c9a8e8', ink: '#2d2150', accent: '#6a4fa3', dark: false },
    recap: 'Jesus caminha com quem está triste, explica a Palavra e se mostra no partir do pão. E promete: estou convosco todos os dias.',
    book: 'Cap. 19 (pp. 123–125) e Cap. 20, “A ascensão triunfal” (pp. 127–129)',
    ponte: 'Ele subiu, mas prometeu voltar. E já prepara um lugar.',
    cards: [
      say('Dois discípulos, uma estrada triste.', 'Na tarde da ressurreição, dois discípulos voltavam para Emaús, perplexos com tudo o que tinha acontecido. Sem notar, caminhavam ao lado do próprio Jesus.', { items: ['sandals', 'house'], layout: 'two', anim: 'float' }, 'VJ 123.1–4'),
      say('Ele abriu a Palavra.', 'O Estranho perguntou o que os preocupava e explicou as Escrituras, de Moisés a todos os profetas. Não fez milagre: ensinou, para que a fé se firmasse na Palavra.', { items: ['scroll', 'book'], layout: 'two', anim: 'sway' }, 'VJ 124.3–5'),
      widget('emaus', 'A estrada de Emaús', 'Caminhe, ouça e parta o pão.'),
      say('“Fica conosco.”', 'Ao pôr do sol, Jesus fez menção de seguir adiante, mas eles pediram: “Fica conosco”. Ele ficou, abençoou o pão e eles O reconheceram. Esqueceram a fome e correram para contar.', { items: ['bread', 'lantern'], layout: 'two', anim: 'pulse' }, 'VJ 124.8–125.3', { q: 'Fica conosco, porque é tarde e o dia já declina.' }),
      say('“Paz seja convosco!”', 'Enquanto contavam, Jesus apareceu. Mostrou as mãos e comeu com eles, e o medo virou fé e alegria. Tomé, que duvidava, disse: “Senhor meu e Deus meu!”.', { items: ['dove', 'hands'], layout: 'two', anim: 'pulse' }, 'VJ 125.5–6, 125.8', { q: 'Paz seja convosco!' }),
      say('Todos podem ser testemunhas.', 'Nem todos pregam em igrejas, mas todos podem ajudar alguém: servir quem sofre, confortar os abatidos e contar do amor que perdoa.', { items: ['speech', 'globe'], layout: 'two', anim: 'float' }, 'VJ 125.14', { q: 'todos podem ajudar as pessoas individualmente' }),
      say('“Estou convosco todos os dias.”', 'No Monte das Oliveiras, de mãos estendidas para abençoar, Jesus subiu numa nuvem de glória. Deixou uma promessa que vale também hoje.', { items: ['cloud', 'star'], layout: 'two', anim: 'float' }, 'VJ 127.3', { q: 'Eis que estou convosco todos os dias até à consumação do século.' }),
      say('Levantai, ó portais.', 'No Céu, os anjos abriram as portas para o Rei da Glória. Jesus intercede pelo Seu povo diante do Pai, e o Céu todo canta.', { items: ['gate', 'crown'], layout: 'two', anim: 'pulse' }, 'VJ 129.1–9, 129.15', { q: 'Digno é o Cordeiro que foi morto de receber o poder, e riqueza, e sabedoria, e força, e honra, e glória, e louvor.' }),
      refl('Em qual “estrada de Emaús” você caminha agora, e o que mudaria se soubesse que Jesus anda ao seu lado?'),
    ],
  },

  {
    id: 'lar-que-ele-prepara', n: 16, title: 'O lar que Ele prepara',
    hook: 'Ele voltará e prepara um lugar sem lágrimas.',
    icon: 'tree', scene: 'garden',
    theme: { a: '#e8f6d8', b: '#b8e0f0', ink: '#173a2f', accent: '#2b8a63', dark: false },
    recap: 'Jesus prometeu voltar. Vigiar é viver servindo, e o futuro que Ele prepara é uma Terra renovada, sem luto nem dor.',
    book: 'Cap. 21, “Quando Cristo voltará?” (pp. 131–134), Cap. 22, “O juízo final” (pp. 137–139) e Cap. 23, “A eterna felicidade” (pp. 141–144)',
    ponte: 'E agora? O que fazer com tudo o que você viu?',
    cards: [
      say('Uma promessa antes de partir.', 'Jesus disse que na casa do Pai há muitas moradas, que iria preparar um lugar e voltaria para buscar os Seus.', { items: ['house', 'star'], layout: 'two', anim: 'pulse' }, 'VJ 131.1', { q: 'voltarei e vos receberei para Mim mesmo, para que, onde Eu estou, estejais vós também' }),
      say('Será visto por todos.', 'Jesus voltará como foi: numa nuvem, com os anjos. Será tão claro quanto um relâmpago de um lado ao outro do céu. Ninguém precisará procurá-Lo escondido.', { items: ['lightning', 'cloud'], layout: 'two', anim: 'float' }, 'VJ 131.2–3, 133.4'),
      say('Sem data, mas com ânimo.', 'Ninguém sabe o dia nem a hora. Jesus falou de sinais, como as folhas que anunciam o verão, e deixou ânimo: “erguei a vossa cabeça”.', { items: ['seedling', 'sunrise'], layout: 'two', anim: 'float' }, 'VJ 133.5, 134.5', { q: 'exultai e erguei a vossa cabeça; porque a vossa redenção se aproxima' }),
      say('Vigiar é servir.', 'O livro lembra: enquanto esperamos, não ficamos parados. Saber que Ele está perto deve nos levar a trabalhar com mais dedicação pelos outros.', { items: ['lamp', 'hands'], layout: 'two', anim: 'pulse' }, 'VJ 138.2–4', { q: 'Saber que Ele está às portas, deve nos levar a trabalhar com mais dedicação pela salvação de nossos semelhantes' }),
      say('Famílias reunidas.', 'Ele virá para ressuscitar os mortos em Cristo e reunir as famílias que a morte separou. Um pouco mais, e Ele enxugará toda lágrima.', { items: ['heart', 'house'], layout: 'two', anim: 'bounce' }, 'VJ 134.2–4', { q: 'Ainda um pouco e Ele enxugará dos olhos toda lágrima.' }),
      say('Uma Terra renovada.', 'O livro descreve um novo céu e uma nova Terra: o Pastor guiando o rebanho a fontes de água viva, a árvore da vida, rios cristalinos, colinas verdes. Um lar.', { items: ['river', 'tree', 'sheep'], layout: 'three', anim: 'float' }, 'VJ 142.4, 142.7'),
      widget('florescer', 'O deserto vai florescer', 'Arraste e veja a Terra mudar.'),
      say('O lobo com o cordeiro.', 'Casas construídas e habitadas, vinhas plantadas e comidas, o lobo ao lado do cordeiro, e um pequenino os guiando. Não haverá luto, nem pranto, nem dor.', { items: ['wolf', 'sheep', 'house'], layout: 'three', anim: 'float' }, 'VJ 144.2–5', { q: 'O lobo habitará com o cordeiro' }),
      refl('Se Jesus voltasse em breve, que gesto de cuidado você gostaria que Ele encontrasse você fazendo?'),
    ],
  },

  {
    id: 'proximo-passo', n: 17, title: 'Seu próximo passo',
    hook: 'Sete gestos pequenos, uma frase para levar e um convite.',
    icon: 'feet', scene: 'plain',
    theme: { a: '#fff0c2', b: '#ffd5a0', ink: '#3a2410', accent: '#c9633c', dark: false },
    recap: 'Conhecer Jesus é caminhar com Ele: orar de manhã, servir, perdoar, repartir e contar a quem você ama.',
    book: 'O livro inteiro: 23 capítulos em três seções. Cada parada indica os capítulos certos',
    ponte: '',
    cards: [
      say('O caminho continua.', 'Jesus andou entre as pessoas fazendo o bem e convida a seguir o mesmo caminho, um passo de cada vez.', { items: ['sandals', 'star'], layout: 'two', anim: 'float' }, 'VJ 58.6', { q: 'Jesus andou de um lado para outro fazendo o bem.' }),
      widget('plano', 'Plano de 7 dias', 'Um gesto pequeno por dia. Marque quando fizer.'),
      widget('frase', 'Leve uma frase', 'Vire a carta e guarde.'),
      say('Quem você convida?', 'André chamou Simão. Filipe chamou Natanael: o primeiro trouxe o irmão, o outro, o amigo. Que tal convidar alguém para conhecer este caminho?', { items: ['speech', 'heart'], layout: 'two', anim: 'pulse' }, 'VJ 38.12', { q: 'o primeiro trouxe seu irmão; o outro, seu amigo' }),
      widget('compartilhar', 'Convide alguém', 'Link, texto e uma imagem para stories.'),
      refl('Depois desta jornada, qual é o seu próximo passo com Jesus?'),
    ],
  },
];

// Versão curta (60 segundos) para quem tem pressa: aparece acima da lista de paradas.
export const RESUMO = {
  id: 'em-60-segundos', n: 0, title: 'O livro em 60 segundos',
  hook: 'Seis cartões com o coração do livro.',
  icon: 'clock', scene: 'dawn',
  theme: { a: '#d3e3f7', b: '#ffe1ae', ink: '#1a2b5a', accent: '#34509a', dark: false },
  recap: 'Jesus veio perto, serviu, deu a vida, venceu a morte e prometeu voltar para nos levar ao lar que prepara.',
  book: 'O livro inteiro (23 capítulos). Cada uma das dezessete paradas indica os capítulos certos',
  ponte: 'Gostou? A jornada completa mostra cada cena com mais detalhe.',
  cards: [
    say('Ele veio para ficar perto.', 'Sem lugar na hospedaria, o Rei do Céu nasceu numa manjedoura. Por amor a nós, trocou as riquezas do Céu pela pobreza da Terra.', { items: ['manger', 'star'], layout: 'two', anim: 'pulse' }, 'VJ 10.3'),
    say('Cresceu como um de nós.', 'Menino de aldeia, carpinteiro, jovem de oração: Jesus viveu entre os pobres e mostrou que entende cada dificuldade.', { items: ['hammer', 'house'], layout: 'two', anim: 'float' }, 'VJ 19.2–3'),
    say('Passou fazendo o bem.', 'Curou, ensinou, consolou e foi atrás de quem estava perdido, como um pastor que conhece cada ovelha pelo nome.', { items: ['sheep', 'hands', 'heart'], layout: 'three', anim: 'float' }, 'VJ 58.5–6'),
    say('Serviu e deu a vida.', 'Lavou os pés dos amigos, orou no jardim e perdoou na cruz. Por amor a nós, aceitou morrer.', { items: ['basin', 'olive-tree', 'cross'], layout: 'three', anim: 'float' }, 'VJ 73.6–7'),
    say('Venceu a morte.', 'No primeiro dia da semana, o túmulo estava vazio. Jesus ressuscitou e chamou Maria pelo nome. “Não temais.”', { items: ['tomb', 'sunrise'], layout: 'two', anim: 'pulse' }, 'VJ 120.4'),
    say('E vai voltar.', 'Prometeu preparar um lugar e voltar para nos buscar. Até lá: “estou convosco todos os dias”.', { items: ['house', 'star', 'cloud'], layout: 'three', anim: 'float' }, 'VJ 131.1, 127.3'),
  ],
};

export const BY_ID = { ...Object.fromEntries(STORIES.map((s) => [s.id, s])), [RESUMO.id]: RESUMO };

// Frases do livro, conferidas pelo gerador. Usadas no sorteio "Leve uma frase".
export const FRASES = [
  { q: 'Cuida de cada um como se não houvesse mais ninguém no mundo todo.', ref: 'VJ 56.2', glosa: 'Para Jesus, você nunca é só mais um na multidão.' },
  { q: 'Ele iluminará o lar mais pobre e alegrará o coração mais triste.', ref: 'VJ 22.14', glosa: 'Onde Jesus entra, a casa se enche de luz.' },
  { q: 'Em casa e onde quer que pudesse estar, era como a luz do sol.', ref: 'VJ 20.3', glosa: 'Um jeito de ser luz sem fazer barulho.' },
  { q: 'Tudo o que fazia era bem feito.', ref: 'VJ 23.1', glosa: 'Até o trabalho simples pode honrar a Deus.' },
  { q: 'O sábado foi estabelecido por causa do homem, e não o homem por causa do sábado.', ref: 'VJ 50.5', glosa: 'O descanso é um presente, e não um peso.' },
  { q: 'Um coração bondoso e compassivo vale mais do que todas as riquezas do mundo.', ref: 'VJ 47.10', glosa: 'A bondade é a riqueza que ninguém tira.' },
  { q: 'o primeiro trouxe seu irmão; o outro, seu amigo', ref: 'VJ 38.12', glosa: 'Quem conhece Jesus quer que o amigo conheça também.' },
  { q: 'também vós deveis lavar os pés uns dos outros', ref: 'VJ 73.7', glosa: 'Servir é o jeito de Jesus ser grande.' },
  { q: 'Devemos oferecer a Cristo o melhor de tudo o que temos', ref: 'VJ 16.8', glosa: 'Presente de verdade sai do melhor que temos.' },
  { q: 'Deus escolhe pessoas humildes para serem Suas testemunhas.', ref: 'VJ 13.12', glosa: 'Ninguém é pequeno demais para ser escolhido.' },
  { q: 'Jamais considerou o ser humano de pouco valor', ref: 'VJ 28.8', glosa: 'Para Jesus, ninguém é pouca coisa.' },
  { q: 'Nem todos podem pregar nas igrejas, mas todos podem ajudar as pessoas individualmente.', ref: 'VJ 125.14', glosa: 'Todo gesto de ajuda é testemunho.' },
  { q: 'O bom Pastor está procurando você.', ref: 'VJ 56.16', glosa: 'Nenhuma ovelha é esquecida.' },
  { q: 'Que exemplo de ternura e piedoso amor o Salvador nos deu!', ref: 'VJ 81.3', glosa: 'Até para corrigir, Jesus usou ternura.' },
  { q: 'Por amor a nós, Ele Se dispôs a morrer.', ref: 'VJ 108.14', glosa: 'O amor foi até o fim.' },
  { q: 'Eu sou a ressurreição e a vida.', ref: 'VJ 114.14', glosa: 'A última palavra é de vida.' },
  { q: 'Eis que estou convosco todos os dias até à consumação do século.', ref: 'VJ 127.3', glosa: 'Você não caminha sozinho.' },
  { q: 'Os humildes de espírito são aqueles que reconhecem sua própria pecaminosidade e necessidade espiritual.', ref: 'VJ 45.5', glosa: 'Ser humilde é saber que precisamos de ajuda.' },
];

// Citações usadas nos cartões, reunidas para a conferência automática (as das interações ficam nos próprios módulos: ver widgets/*.js, export REFS).
export function todasCitacoes() {
  const out = [];
  for (const s of [...STORIES, RESUMO]) for (const c of s.cards) { if (c.q) out.push(c.q); if (c.hl) out.push(c.hl); }
  for (const f of FRASES) out.push(f.q);
  return out;
}
