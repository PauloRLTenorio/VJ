// "Convide alguém": link, texto e uma imagem vertical para stories/status (gerada no seu aparelho, com QR Code).
import { $, esc } from './util.js';
import { qrCanvas } from '../qr.js';

const SITE = 'https://paulorltenorio.github.io/VJ/';
const TXT = 'Ele veio para ficar perto. Uma jornada em cartões pela vida de Jesus, no seu ritmo.';

function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }

// converte um símbolo do sprite numa imagem (resolvendo as variáveis de cor)
function symbolImage(id) {
  const el = document.getElementById(`s-${id}`);
  if (!el) return Promise.resolve(null);
  const inner = el.innerHTML.replace(/var\((--[\w-]+)\)/g, (_, v) => cssVar(v) || '#888').replace(/url\(#g-glow\)/g, 'rgba(255,243,196,.55)');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="400" height="400">${inner}</svg>`;
  return new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });
}

function wrap(ctx, text, maxW) {
  const words = text.split(' '), lines = []; let cur = '';
  words.forEach((w) => { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
  if (cur) lines.push(cur); return lines;
}

// retângulo arredondado sem depender de ctx.roundRect (aparelhos mais antigos)
function rrPath(c, x, y, w, h, r) {
  c.beginPath(); c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

async function draw(canvas) {
  const W = 1080, H = 1920; canvas.width = W; canvas.height = H;
  const c = canvas.getContext('2d');
  // céu: da noite de Belém (em cima) à alvorada (embaixo)
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1c2a63'); g.addColorStop(0.42, '#4a5aa8'); g.addColorStop(0.7, '#ffcf9a'); g.addColorStop(1, '#ffe9c9');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  // estrelinhas
  c.fillStyle = 'rgba(255,244,214,.9)';
  [[120, 120, 3], [260, 260, 2.4], [420, 90, 2.8], [610, 200, 3.2], [760, 110, 2.4], [900, 300, 3], [180, 420, 2.2], [980, 480, 2.6], [70, 620, 2.4], [700, 520, 2]].forEach(([x, y, r]) => { c.beginPath(); c.arc(x, y, r * 1.6, 0, 7); c.fill(); });
  // brilho da estrela
  const sun = c.createRadialGradient(840, 380, 10, 840, 380, 380); sun.addColorStop(0, 'rgba(255,238,170,.95)'); sun.addColorStop(1, 'rgba(255,238,170,0)');
  c.fillStyle = sun; c.fillRect(0, 0, W, H);
  // colinas
  const hill = (y, col, amp) => { c.fillStyle = col; c.beginPath(); c.moveTo(0, H); c.lineTo(0, y); c.bezierCurveTo(W * .25, y - amp, W * .5, y + amp, W * .75, y - amp * .4); c.bezierCurveTo(W * .9, y - amp * .8, W, y - amp * .2, W, y); c.lineTo(W, H); c.closePath(); c.fill(); };
  hill(1500, '#8e9ac9', 90); hill(1640, '#5b6aa8', 80); hill(1780, '#2c3a7a', 60);
  try { await document.fonts.load('600 100px Newsreader'); await document.fonts.load('600 40px Inter'); } catch (e) { /* segue */ }
  const [star, manger, sunrise] = await Promise.all(['star', 'manger', 'tomb'].map(symbolImage));
  if (star) c.drawImage(star, 700, 90, 330, 330);
  if (manger) c.drawImage(manger, 130, 980, 360, 360);
  if (sunrise) c.drawImage(sunrise, 600, 990, 340, 340);
  c.fillStyle = '#fff4dc'; c.textAlign = 'left';
  c.font = '600 34px Inter, system-ui, sans-serif'; c.fillText('VJ · VIDA DE JESUS', 90, 200);
  c.font = '600 132px Newsreader, Georgia, serif';
  let y = 450; wrap(c, 'Ele veio para ficar perto.', 620).forEach((l) => { c.fillText(l, 90, y); y += 142; });
  c.font = '500 46px Inter, system-ui, sans-serif'; c.fillStyle = '#e8ebff';
  y += 20; wrap(c, 'Uma jornada em cartões pela vida de Jesus, de Belém ao lar que Ele prepara.', 640).forEach((l) => { c.fillText(l, 90, y); y += 66; });
  c.font = '700 44px Inter, system-ui, sans-serif'; c.fillStyle = '#fff8ea';
  c.fillText('paulorltenorio.github.io/VJ', 90, 1840);
  // QR Code no canto (preto sobre branco, com a margem exigida pela norma), para a câmera abrir o site direto da imagem
  try {
    const q = qrCanvas(document.createElement('canvas'), SITE, 300), s = q.width, x = W - 90 - s, yq = 1480;
    c.save(); c.shadowColor = 'rgba(10,18,45,.4)'; c.shadowBlur = 36; c.shadowOffsetY = 12;
    rrPath(c, x, yq, s, s, 28); c.fillStyle = '#fff'; c.fill(); c.restore();
    c.save(); rrPath(c, x, yq, s, s, 28); c.clip(); c.drawImage(q, x, yq); c.restore();
    c.font = '700 34px Inter, system-ui, sans-serif'; c.fillStyle = '#fff8ea'; c.textAlign = 'center';
    c.fillText('Aponte a câmera', x + s / 2, yq - 26); c.textAlign = 'left';
  } catch (e) { /* sem QR, a imagem continua válida */ }
}

export function mount(host, card, ctx) {
  host.innerHTML = `<div class="w w--split cp">
    <div class="w__main"><div class="cp__prev"><canvas id="cpC" aria-label="Pré-visualização da imagem para stories"></canvas></div></div>
    <div class="w__side"><div class="cp__box">
      <button type="button" class="w-btn w-btn--pri" id="cpShare">Compartilhar o link</button>
      <button type="button" class="w-btn" id="cpImg">Baixar imagem para stories</button>
      <button type="button" class="w-btn" id="cpCopy">Copiar o link</button>
    </div></div></div>`;
  const canvas = $('#cpC', host);
  draw(canvas);
  $('#cpShare', host).addEventListener('click', async () => {
    try { if (navigator.share) await navigator.share({ title: 'VJ — Vida de Jesus', text: TXT, url: SITE }); else { await navigator.clipboard.writeText(SITE); ctx.toast('Link copiado!'); } } catch (e) { /* cancelado */ }
  });
  $('#cpCopy', host).addEventListener('click', async () => { try { await navigator.clipboard.writeText(SITE); ctx.toast('Link copiado!'); } catch (e) { ctx.toast(SITE); } });
  $('#cpImg', host).addEventListener('click', () => {
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'vj-vida-de-jesus.png', { type: 'image/png' });
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text: TXT }); return; }
      } catch (e) { return; }
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'vj-vida-de-jesus.png'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      ctx.toast('Imagem baixada!');
    }, 'image/png');
  });
}
void esc;
