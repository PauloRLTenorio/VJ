// Gerador de QR Code (modo byte, correção M, versões 1 a 10). Sem dependências. Baseado no algoritmo padrão (ISO/IEC 18004).
// qrMatriz(texto) -> matriz de booleanos (true = módulo escuro). qrSVG(texto) -> string SVG. qrCanvas(canvas, texto, px).
const ECC_POR_BLOCO = [0, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26]; // nível M, versões 1..10
const NUM_BLOCOS = [0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5]; // nível M, versões 1..10... (v3 = 1 bloco)

const bit = (x, i) => ((x >>> i) & 1) !== 0;

function modulosBrutos(v) {
  let r = (16 * v + 128) * v + 64;
  if (v >= 2) { const n = Math.floor(v / 7) + 2; r -= (25 * n - 10) * n - 55; if (v >= 7) r -= 36; }
  return r;
}
const dadosCodewords = (v) => Math.floor(modulosBrutos(v) / 8) - ECC_POR_BLOCO[v] * NUM_BLOCOS[v];

function mul(x, y) { let z = 0; for (let i = 7; i >= 0; i--) { z = (z << 1) ^ ((z >>> 7) * 0x11d); z ^= ((y >>> i) & 1) * x; } return z; }
function rsGerador(grau) {
  const r = new Array(grau).fill(0); r[grau - 1] = 1;
  let raiz = 1;
  for (let i = 0; i < grau; i++) {
    for (let j = 0; j < grau; j++) { r[j] = mul(r[j], raiz); if (j + 1 < grau) r[j] ^= r[j + 1]; }
    raiz = mul(raiz, 2);
  }
  return r;
}
function rsResto(dados, div) {
  const r = div.map(() => 0);
  for (const b of dados) { const f = b ^ r.shift(); r.push(0); div.forEach((c, i) => { r[i] ^= mul(c, f); }); }
  return r;
}

export function qrMatriz(texto) {
  const bytes = Array.from(new TextEncoder().encode(texto));
  // 1) escolhe a menor versão que comporta
  let v = 1;
  for (; v <= 10; v++) {
    const bitsCont = v <= 9 ? 8 : 16;
    if (4 + bitsCont + bytes.length * 8 <= dadosCodewords(v) * 8) break;
  }
  if (v > 10) throw new Error('Texto longo demais para o QR Code interno');
  const capBits = dadosCodewords(v) * 8;

  // 2) bits de dados
  const bits = [];
  const poe = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
  poe(4, 4); poe(bytes.length, v <= 9 ? 8 : 16); bytes.forEach((b) => poe(b, 8));
  poe(0, Math.min(4, capBits - bits.length));
  poe(0, (8 - (bits.length % 8)) % 8);
  for (let pad = 0xec; bits.length < capBits; pad ^= 0xec ^ 0x11) poe(pad, 8);
  const dados = [];
  for (let i = 0; i < bits.length; i += 8) dados.push(parseInt(bits.slice(i, i + 8).join(''), 2));

  // 3) Reed-Solomon e intercalação
  const nb = NUM_BLOCOS[v], ecc = ECC_POR_BLOCO[v];
  const brutos = Math.floor(modulosBrutos(v) / 8);
  const curtos = nb - (brutos % nb), lenCurto = Math.floor(brutos / nb);
  const div = rsGerador(ecc), blocos = [];
  for (let i = 0, k = 0; i < nb; i++) {
    const d = dados.slice(k, k + lenCurto - ecc + (i < curtos ? 0 : 1)); k += d.length;
    const e = rsResto(d, div);
    if (i < curtos) d.push(0);
    blocos.push(d.concat(e));
  }
  const final = [];
  for (let i = 0; i < blocos[0].length; i++) blocos.forEach((b, j) => { if (i !== lenCurto - ecc || j >= curtos) final.push(b[i]); });

  // 4) matriz
  const n = 17 + 4 * v;
  const mod = Array.from({ length: n }, () => new Array(n).fill(false));
  const fun = Array.from({ length: n }, () => new Array(n).fill(false));
  const set = (x, y, d) => { mod[y][x] = d; fun[y][x] = true; };
  for (let i = 0; i < n; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
  const finder = (cx, cy) => {
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      const dist = Math.max(Math.abs(dx), Math.abs(dy)), x = cx + dx, y = cy + dy;
      if (x >= 0 && x < n && y >= 0 && y < n) set(x, y, dist !== 2 && dist !== 4);
    }
  };
  finder(3, 3); finder(n - 4, 3); finder(3, n - 4);
  if (v >= 2) {
    const k = Math.floor(v / 7) + 2;
    const passo = v === 32 ? 26 : Math.ceil((v * 4 + 4) / (k * 2 - 2)) * 2;
    const pos = [6]; for (let p = n - 7; pos.length < k; p -= passo) pos.splice(1, 0, p);
    pos.forEach((px, i) => pos.forEach((py, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === k - 1) || (i === k - 1 && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(px + dx, py + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));
  }
  const formato = (mask) => {
    const d = 0 << 3 | mask; let r = d;
    for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
    const b = ((d << 10) | r) ^ 0x5412;
    for (let i = 0; i <= 5; i++) set(8, i, bit(b, i));
    set(8, 7, bit(b, 6)); set(8, 8, bit(b, 7)); set(7, 8, bit(b, 8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, bit(b, i));
    for (let i = 0; i < 8; i++) set(n - 1 - i, 8, bit(b, i));
    for (let i = 8; i < 15; i++) set(8, n - 15 + i, bit(b, i));
    set(8, n - 8, true);
  };
  formato(0);
  if (v >= 7) {
    let r = v; for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1f25);
    const b = (v << 12) | r;
    for (let i = 0; i < 18; i++) { const c = bit(b, i), a = n - 11 + (i % 3), q = Math.floor(i / 3); set(a, q, c); set(q, a, c); }
  }
  // dados em zigue-zague
  let idx = 0;
  for (let dir = n - 1; dir >= 1; dir -= 2) {
    if (dir === 6) dir = 5;
    for (let vert = 0; vert < n; vert++) for (let j = 0; j < 2; j++) {
      const x = dir - j, sobe = ((dir + 1) & 2) === 0, y = sobe ? n - 1 - vert : vert;
      if (!fun[y][x] && idx < final.length * 8) { mod[y][x] = bit(final[idx >>> 3], 7 - (idx & 7)); idx++; }
    }
  }
  // 5) máscara de menor penalidade
  const aplica = (mask) => {
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      if (fun[y][x]) continue;
      let inv;
      switch (mask) {
        case 0: inv = (x + y) % 2 === 0; break;
        case 1: inv = y % 2 === 0; break;
        case 2: inv = x % 3 === 0; break;
        case 3: inv = (x + y) % 3 === 0; break;
        case 4: inv = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; break;
        case 5: inv = ((x * y) % 2) + ((x * y) % 3) === 0; break;
        case 6: inv = (((x * y) % 2) + ((x * y) % 3)) % 2 === 0; break;
        default: inv = (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
      }
      if (inv) mod[y][x] = !mod[y][x];
    }
  };
  // Penalidade (regras N1..N4 da norma): corridas, blocos 2x2, padrão parecido com o localizador, equilíbrio claro/escuro.
  const padroes = (h) => {
    const k = h[1];
    const nucleo = k > 0 && h[2] === k && h[3] === k * 3 && h[4] === k && h[5] === k;
    return (nucleo && h[0] >= k * 4 && h[6] >= k ? 1 : 0) + (nucleo && h[6] >= k * 4 && h[0] >= k ? 1 : 0);
  };
  const penal = () => {
    let p = 0;
    const linhas = (get) => {
      for (let a = 0; a < n; a++) {
        let cor = false, run = 0;
        const hist = [0, 0, 0, 0, 0, 0, 0];
        const add = (len) => { if (hist[0] === 0) len += n; hist.pop(); hist.unshift(len); };
        for (let b = 0; b < n; b++) {
          if (get(a, b) === cor) { run++; if (run === 5) p += 3; else if (run > 5) p++; }
          else { add(run); if (!cor) p += padroes(hist) * 40; cor = get(a, b); run = 1; }
        }
        if (cor) { add(run); run = 0; }
        run += n; add(run);
        p += padroes(hist) * 40;
      }
    };
    linhas((a, b) => mod[a][b]); linhas((a, b) => mod[b][a]);
    for (let y = 0; y < n - 1; y++) for (let x = 0; x < n - 1; x++) { const c = mod[y][x]; if (c === mod[y][x + 1] && c === mod[y + 1][x] && c === mod[y + 1][x + 1]) p += 3; }
    let escuros = 0; mod.forEach((l) => l.forEach((c) => { if (c) escuros++; }));
    p += (Math.ceil(Math.abs(escuros * 20 - n * n * 10) / (n * n)) - 1) * 10;
    return p;
  };
  let melhor = 0, menor = Infinity;
  for (let m = 0; m < 8; m++) { aplica(m); formato(m); const s = penal(); if (s < menor) { menor = s; melhor = m; } aplica(m); }
  aplica(melhor); formato(melhor);
  return mod;
}

export function qrSVG(texto, { margem = 4, escuro = '#000', claro = '#fff' } = {}) {
  const m = qrMatriz(texto), n = m.length, lado = n + margem * 2;
  let d = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n;) {
      if (!m[y][x]) { x++; continue; }
      let len = 0; while (x + len < n && m[y][x + len]) len++;
      d += `M${x + margem} ${y + margem}h${len}v1h-${len}z`; x += len;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lado} ${lado}" shape-rendering="crispEdges" role="img" aria-label="QR Code"><rect width="${lado}" height="${lado}" fill="${claro}"/><path fill="${escuro}" d="${d}"/></svg>`;
}

export function qrCanvas(canvas, texto, px = 640, margem = 4) {
  const m = qrMatriz(texto), n = m.length, esc = Math.floor(px / (n + margem * 2));
  const lado = esc * (n + margem * 2);
  canvas.width = lado; canvas.height = lado;
  const c = canvas.getContext('2d');
  c.fillStyle = '#fff'; c.fillRect(0, 0, lado, lado);
  c.fillStyle = '#000';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (m[y][x]) c.fillRect((x + margem) * esc, (y + margem) * esc, esc, esc);
  return canvas;
}
