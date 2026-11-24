// Gera o QR Code do site como arquivo: assets/qr.svg e assets/qr.png (para slides, impressão, cartazes).
// Uso:
//   node scripts/gerar_qr.mjs                  -> usa o endereço canônico do index.html e grava em assets/
//   node scripts/gerar_qr.mjs "texto" pasta    -> grava pasta/qr.svg e pasta/qr.png (para testes)
// O mesmo gerador (js/ui/qr.js) roda no navegador, no bloco "Leve o site com você".
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { qrMatriz, qrSVG } from '../js/ui/qr.js';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function canonico() {
  const html = readFileSync(join(raiz, 'index.html'), 'utf8');
  const m = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!m) throw new Error('index.html sem <link rel="canonical">');
  return m[1];
}

// CRC32 para os blocos do PNG (a tabela é gerada uma vez)
const TAB = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (buf) => { let c = 0xffffffff; for (const b of buf) c = TAB[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const bloco = (tipo, dados) => {
  const t = Buffer.from(tipo, 'ascii'), len = Buffer.alloc(4), crc = Buffer.alloc(4);
  len.writeUInt32BE(dados.length); crc.writeUInt32BE(crc32(Buffer.concat([t, dados])));
  return Buffer.concat([len, t, dados, crc]);
};

function png(texto, margem = 4, alvo = 1000) {
  const m = qrMatriz(texto), n = m.length, esc = Math.ceil(alvo / (n + margem * 2)), lado = (n + margem * 2) * esc;
  const linhas = [];
  for (let y = 0; y < lado; y++) {
    const my = Math.floor(y / esc) - margem, linha = Buffer.alloc(lado + 1, 255); // 255 = claro; 1º byte = filtro 0
    linha[0] = 0;
    for (let x = 0; x < lado; x++) { const mx = Math.floor(x / esc) - margem; if (my >= 0 && my < n && mx >= 0 && mx < n && m[my][mx]) linha[x + 1] = 0; }
    linhas.push(linha);
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(lado, 0); ihdr.writeUInt32BE(lado, 4); ihdr[8] = 8; ihdr[9] = 0; // 8 bits, tons de cinza
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), bloco('IHDR', ihdr), bloco('IDAT', deflateSync(Buffer.concat(linhas), { level: 9 })), bloco('IEND', Buffer.alloc(0))]);
}

const [, , textoArg, pastaArg] = process.argv;
const texto = textoArg || canonico();
const pasta = pastaArg ? resolve(pastaArg) : join(raiz, 'assets');
mkdirSync(pasta, { recursive: true });
writeFileSync(join(pasta, 'qr.svg'), qrSVG(texto) + '\n');
writeFileSync(join(pasta, 'qr.png'), png(texto));
console.log(`QR de "${texto}" (${qrMatriz(texto).length}x${qrMatriz(texto).length} módulos) -> ${pasta}/qr.svg e qr.png`);
