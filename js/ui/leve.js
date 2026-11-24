// Bloco "Leve com você": copiar o link e mostrar o QR Code em tela cheia (conversas, grupos, palestras).
// O QR em si é um arquivo estático (assets/qr.svg), gerado por scripts/gerar_qr.mjs a partir do endereço canônico.
const $ = (s) => document.querySelector(s);

export function mountLeve({ toast }) {
  const copiar = $('#leveCopiar'), tela = $('#leveTela'), dlg = $('#qrfull');
  const canon = document.querySelector('link[rel="canonical"]');
  const url = (canon && canon.href) || location.href.split('#')[0];

  if (copiar) {
    copiar.hidden = false;
    copiar.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(url); toast('Link copiado!'); } catch (e) { toast(url); }
    });
  }
  if (tela && dlg && typeof dlg.showModal === 'function') {
    tela.hidden = false;
    tela.addEventListener('click', () => { try { dlg.showModal(); } catch (e) { /* já aberto */ } });
    // fecha pelo botão ou ao tocar fora do cartão; Esc já fecha sozinho
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg || (e.target.closest && e.target.closest('[data-fechar]'))) dlg.close();
    });
  }
}
