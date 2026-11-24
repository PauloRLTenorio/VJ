// Troca de ilustrações por imagens (por exemplo, geradas no Gemini) SEM mexer no código.
// 1) Coloque o arquivo em assets/img/ (de preferência .webp ou .jpg).
// 2) Preencha a chave abaixo com o caminho. Se a chave ficar vazia (''), o site usa a ilustração SVG padrão.
// A lista de chaves, proporções e prompts sugeridos está em docs/imagens-gemini.md.
// Regra de reverência do projeto: nenhuma imagem mostra o rosto de Jesus nem de pessoas sagradas (símbolos, objetos, paisagens, luz).
export const IMAGENS = {
  // capa da página inicial (fundo do herói, opcional)
  'hero': '',
  // uma imagem por parada, usada como "capa" no cartão final e na lista de paradas
  'parada-1': '', 'parada-2': '', 'parada-3': '', 'parada-4': '', 'parada-5': '', 'parada-6': '',
  'parada-7': '', 'parada-8': '', 'parada-9': '', 'parada-10': '', 'parada-11': '', 'parada-12': '',
  'parada-13': '', 'parada-14': '', 'parada-15': '', 'parada-16': '', 'parada-17': '',
  // imagem de compartilhamento (Open Graph), 1200x630
  'og': '',
};

export const img = (k) => IMAGENS[k] || '';
