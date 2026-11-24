#!/usr/bin/env python3
"""Gera js/data/egw.js: para cada parágrafo do livro "Vida de Jesus" (código de referência do EGW: "VJ 9.1" = página 9, parágrafo 1),
o ID do parágrafo no site do EGW (m.egwwritings.org/pt/book/1727.<página do site>#<id>), e CONFERE se TODAS as referências do site
apontam para o lugar certo (existem, estão em ordem, o capítulo/título existe e cada frase citada está na passagem indicada).

Entradas (ficam em _trabalho/, FORA do git, porque são texto do livro):
  _trabalho/egw/paras.json     parágrafos do site, baixados por scripts/baixar_egw.py (id, tag, ref, text)
  _trabalho/egw/paginas.json   "páginas" do site (início de cada uma): o link usa <livro>.<início da página do site>#<id do parágrafo>
Saída: js/data/egw.js — só números (IDs) e as frases curtas que o site já cita. Nenhum trecho do livro além delas.

Formato das referências escritas no site (js/**/*.js e index.html):
  VJ 10.6            página 10, parágrafo 6
  VJ 10.6–8          parágrafos 6 a 8 da página 10
  VJ 11.2–13.4       de 11.2 até 13.4
  VJ 9–13            páginas 9 a 13 (abre o começo da página 9)
  VJ 10.6, 13.2 e 16.8   lista (cada item é um link); separadores: vírgula, ponto e vírgula ou " e "
  Cap. 5             capítulo 5 (numeração do site: os 23 capítulos do livro, em ordem)
  Cap. 1, “O líder celestial”   subtítulo (h3/h4) do capítulo 1
  Caps. 3 e 4        dois capítulos
Uso (na raiz do projeto):  python3 scripts/gerar_links_egw.py [pasta]
  sem argumento: o site (a raiz);  com 'desenvolvimento': gera/confere js/data/egw.js dessa pasta.
Sai com erro se alguma referência não bater com o livro (passagem inexistente, fora de ordem, capítulo/título inexistente, frase fora da passagem).
"""
import json
import os
import re
import subprocess
import sys
import unicodedata
import urllib.parse

RAIZ_REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
_args = [a for a in sys.argv[1:] if not a.startswith('--')]
RAIZ = os.path.join(RAIZ_REPO, _args[0]) if _args else RAIZ_REPO  # a pasta do site que está sendo gerada/conferida
TRAB = os.path.join(RAIZ_REPO, '_trabalho')
EGW = os.path.join(TRAB, 'egw')
SAIDA = os.path.join(RAIZ, 'js', 'data', 'egw.js')
PREFIXO = 'VJ'


def chave(s):
    """Só letras e números, minúsculas, sem acento: compara textos ignorando hífen de fim de linha, espaços e pontuação."""
    s = unicodedata.normalize('NFKD', s.lower())
    return re.sub(r'[^a-z0-9]', '', ''.join(c for c in s if not unicodedata.combining(c)))


# ------------------------------------------------------------------ o livro, como o site do EGW o entrega
def carregar_site():
    paras = json.load(open(os.path.join(EGW, 'paras.json'), encoding='utf-8'))
    paginas = json.load(open(os.path.join(EGW, 'paginas.json'), encoding='utf-8'))
    pag_de = {}
    for p in paginas:
        for i in p['ids']:
            pag_de[i] = p['inicio']
    por_id = {p['id']: p for p in paras}
    ordem = {p['id']: k for k, p in enumerate(paras)}
    # capítulos = <h3> em ordem (o livro não os numera); cap_de[id] = número do capítulo
    cap_de, atual, caps, titulos = {}, 0, {}, {}
    for p in paras:
        if p['tag'] == 'h3':
            atual += 1
            caps[atual] = p['id']
        if p['tag'] in ('h3', 'h4') and atual:
            titulos[(atual, chave(p['text']))] = p['id']
        cap_de[p['id']] = atual
    # (página, parágrafo) -> id  e  página -> primeiro item da página
    refs, pag_ini = {}, {}
    for p in paras:
        m = re.fullmatch(rf'{PREFIXO} (\d+)(?:\.(\d+))?', p['ref'])
        if not m:
            continue
        pg, pa = int(m.group(1)), m.group(2)
        pag_ini.setdefault(pg, p['id'])
        if pa is not None:
            if (pg, int(pa)) in refs:
                raise SystemExit(f'referência repetida no livro: {p["ref"]}')
            refs[(pg, int(pa))] = p['id']
    return paras, por_id, ordem, pag_de, cap_de, caps, titulos, refs, pag_ini


# ------------------------------------------------------------------ referências usadas no site
N = r'\d{1,3}'
ITEM = rf'(?:{N}\.\d{{1,2}}(?:\s*[–-]\s*{N}(?:\.\d{{1,2}})?)?|{N}(?:\s*[–-]\s*{N})?)'
SEP = r'(?:\s*[,;]\s*|\s+e\s+)'
RE_VJ = re.compile(rf'\b{PREFIXO}\s+({ITEM}(?:{SEP}{ITEM})*)')
RE_CAP = re.compile(r'\b(Caps?\.)\s*(\d{1,2})(?:\s+e\s+(\d{1,2}))?(?:,\s*“([^”]{3,100})”)?')
RE_ITEM = re.compile(rf'^({N})(?:\.(\d{{1,2}}))?(?:\s*[–-]\s*({N})(?:\.(\d{{1,2}}))?)?$')


def itens(lista):
    """'10.6–8, 13.2' -> [((10,6),(10,8)), ((13,2),(13,2))]; item de página: ((9,None),(13,None))"""
    out = []
    for it in re.split(SEP, lista):
        m = RE_ITEM.match(it.strip())
        p1, n1, p2, n2 = m.group(1), m.group(2), m.group(3), m.group(4)
        if n1 is not None:
            ini = (int(p1), int(n1))
            if p2 is None:
                fim = ini
            elif n2 is None:
                fim = (int(p1), int(p2))  # "10.6–8": mesmo capítulo/página, até o parágrafo 8
            else:
                fim = (int(p2), int(n2))
        else:
            ini = (int(p1), None)
            fim = (int(p2), None) if p2 else ini
        out.append((ini, fim))
    return out


def referencias_do_site():
    """[(match, arquivo)] com todas as referências ao livro escritas no código do site."""
    achados = []
    for pasta, _, arqs in os.walk(os.path.join(RAIZ, 'js')):
        for a in arqs:
            if a.endswith('.js') and a not in ('egw.js', 'refs.js'):
                achados.append(os.path.join(pasta, a))
    achados.append(os.path.join(RAIZ, 'index.html'))
    out_vj, out_cap = [], []
    for f in achados:
        t = open(f, encoding='utf-8').read()
        for m in RE_VJ.finditer(t):
            out_vj.append((m, os.path.relpath(f, RAIZ)))
        for m in RE_CAP.finditer(t):
            out_cap.append((m, os.path.relpath(f, RAIZ)))
    return out_vj, out_cap


def citacoes_do_site():
    js = ("import {STORIES,RESUMO,FRASES} from './js/data/stories.js';import {readdirSync} from 'node:fs';const o=[];"
          "for(const s of [...STORIES,RESUMO])for(const c of s.cards){if(c.q)o.push({q:c.q,ref:c.ref});if(c.hl)o.push({q:c.hl,ref:c.ref});}"
          "for(const f of FRASES)o.push({q:f.q,ref:f.ref});"
          # cada interação que traz trecho do livro exporta REFS = [{ q | hl, ref }]
          "for(const f of readdirSync('./js/ui/widgets')){if(f==='index.js'||f==='util.js'||!f.endsWith('.js'))continue;"
          "const m=await import('./js/ui/widgets/'+f);for(const x of m.REFS||[])o.push({q:x.q||x.hl,ref:x.ref});}"
          "console.log(JSON.stringify(o));")
    r = subprocess.run(['node', '--input-type=module', '-e', js], cwd=RAIZ, capture_output=True, text=True)
    if r.returncode:
        raise SystemExit('não consegui ler as citações do site:\n' + r.stderr[-1500:])
    return json.loads(r.stdout)


def enc(s):
    return urllib.parse.quote(s, safe='').replace('-', '%2D')


def limpa(x):
    return x.strip(' .,;:!?“”"\'()[]—')


def diretiva(sub):
    """Texto do destaque (#:~:text=) que o navegador aplica na página do livro."""
    ws = sub.split()
    if len(ws) <= 8:
        return enc(limpa(sub))
    return enc(limpa(' '.join(ws[:4]))) + ',' + enc(limpa(' '.join(ws[-4:])))


def diretiva2(ini, fim):
    """Destaque de um trecho longo: do começo (ini) ao fim (fim), sem guardar o meio."""
    return enc(limpa(ini)) + ',' + enc(limpa(fim))


def main():
    erros, avisos = [], []
    paras, por_id, ordem, pag_de, cap_de, caps, titulos, refs, pag_ini = carregar_site()
    print(f'Site: {len(paras)} itens, {len(refs)} parágrafos numerados (página.parágrafo), {len(caps)} capítulos')

    def alvo_ini(ini):
        pg, pa = ini
        return refs.get((pg, pa)) if pa is not None else pag_ini.get(pg)

    def ids_da_passagem(ini, fim):
        """ids dos parágrafos de 'ini' até 'fim' (em ordem de leitura)"""
        a, b = alvo_ini(ini), None
        if fim[1] is not None:
            b = refs.get(fim)
        else:  # fim por página: até o último item da página
            b = max((i for i, p in por_id.items() if re.fullmatch(rf'{PREFIXO} {fim[0]}(\.\d+)?', p['ref'])), default=None)
        if a is None or b is None or ordem[a] > ordem[b]:
            return None
        return [p['id'] for p in paras[ordem[a]:ordem[b] + 1] if p['tag'] == 'p']

    # ---- confere cada referência escrita no site
    usadas = set()
    vj, cap = referencias_do_site()
    for m, arq in vj:
        for ini, fim in itens(m.group(1)):
            if alvo_ini(ini) is None:
                erros.append(f'{arq}: "{m.group(0)}" — {PREFIXO} {ini[0]}{"." + str(ini[1]) if ini[1] else ""} não existe no livro')
                continue
            if ids_da_passagem(ini, fim) is None:
                erros.append(f'{arq}: "{m.group(0)}" — o fim da faixa não existe ou está antes do começo')
                continue
            usadas.add(ini)

    pedidos = set()
    for m, arq in cap:
        rot, c1, c2, titulo = m.groups()
        c1 = int(c1)
        if c1 not in caps:
            erros.append(f'{arq}: "{m.group(0)}" — capítulo inexistente (o livro tem {len(caps)})')
            continue
        if c2 and int(c2) not in caps:
            erros.append(f'{arq}: "{m.group(0)}" — capítulo {c2} inexistente')
        if titulo:
            pedidos.add((c1, titulo))

    # ---- subtítulos citados ("Cap. 1, “O líder celestial”")
    tit_out = {}
    for c1, titulo in sorted(pedidos):
        i = titulos.get((c1, chave(titulo)))
        if i is None:
            erros.append(f'título não encontrado no capítulo {c1}: “{titulo}”')
        else:
            tit_out[f'{c1}:{titulo}'] = i

    # ---- citações literais: em qual parágrafo está cada frase? (confere todos os pares frase+referência)
    cit = {}
    for par in citacoes_do_site():
        q, ref = par['q'], par['ref']
        todos = []
        for m in RE_VJ.finditer(ref or ''):
            for ini, fim in itens(m.group(1)):
                todos += ids_da_passagem(ini, fim) or []
        if not todos:
            erros.append(f'citação sem referência válida ({ref}): “{q}”')
            continue
        partes = q.split(' … ')
        achou = next((por_id[i] for i in todos if all(chave(x) in chave(por_id[i]['text']) for x in partes)), None)
        if achou is None:
            erros.append(f'a frase não está na passagem indicada ({ref}): “{q}”')
            continue

        def acha(x):
            return re.search(r'\W+'.join(re.escape(w) for w in re.findall(r'\w+', x)), achou['text'], flags=re.IGNORECASE)

        if len(partes) == 2:  # "início … fim": destaca do começo ao fim, mas só as pontas ficam guardadas aqui
            m1, m2 = acha(partes[0]), acha(partes[1])
            if not (m1 and m2 and m1.start() < m2.start()):
                erros.append(f'as pontas da frase não estão em ordem na passagem ({ref}): “{q}”')
                continue
            frag = diretiva2(m1.group(0), m2.group(0))
        elif len(partes) == 1:
            mm = acha(q)
            if not mm:
                avisos.append(f'sem destaque (texto não localizado literalmente): “{q}”')
            frag = diretiva(mm.group(0)) if mm else ''
        else:
            erros.append(f'frase com mais de um " … ": “{q}”')
            continue
        destino = [pag_de[achou['id']], achou['id'], frag]
        if q in cit and cit[q][1] != destino[1]:
            erros.append(f'a mesma frase aparece com referências que levam a parágrafos diferentes: “{q}” ({ref})')
        cit.setdefault(q, destino)

    # ---- saída
    def par(i):
        return f'[{pag_de[i]}, {i}]'

    def bloco(itens_, por_linha):
        linhas = [', '.join(itens_[i:i + por_linha]) for i in range(0, len(itens_), por_linha)]
        return '{\n  ' + ',\n  '.join(linhas) + ',\n}'

    refs_js = [f'"{pg}.{pa}": {par(i)}' for (pg, pa), i in sorted(refs.items())]
    pags_js = [f'"{pg}": {par(i)}' for pg, i in sorted(pag_ini.items())]
    corpo = [
        '// GERADO por scripts/gerar_links_egw.py — não edite à mão. Só números: IDs dos parágrafos do livro no site do Ellen G. White Writings',
        '// (m.egwwritings.org/pt/book/1727.<página do site>#<parágrafo>), mais as frases curtas que o site já cita (para destacá-las na página do livro).',
        '// Chaves: CAPS = nº do capítulo (1–23, na ordem do livro) -> [página do site, parágrafo]; REFS = "página.parágrafo" do livro impresso -> [página do site, parágrafo];',
        '// PAGS = página do livro impresso -> primeiro item dela; TITULOS = subtítulos citados ("capítulo:título"); CITACOES = frase -> destino com destaque.',
        '',
        'export const CAPS = ' + bloco([f'{k}: {par(v)}' for k, v in sorted(caps.items())], 6) + ';',
        '',
        'export const REFS = ' + bloco(refs_js, 5) + ';',
        '',
        'export const PAGS = ' + bloco(pags_js, 6) + ';',
        '',
        'export const TITULOS = {\n' + ''.join(f'  {json.dumps(k, ensure_ascii=False)}: {par(i)},\n' for k, i in sorted(tit_out.items())) + '};',
        '',
        'export const CITACOES = {\n' + ''.join(f'  {json.dumps(q, ensure_ascii=False)}: {{ u: [{v[0]}, {v[1]}, {json.dumps(v[2])}] }},\n' for q, v in sorted(cit.items())) + '};',
        '',
    ]
    fonte = '\n'.join(corpo)
    print(f'referências conferidas: {len(usadas)} passagens distintas; capítulos citados: {len(cap)}; títulos: {len(tit_out)}; citações com destino: {len(cit)}')
    for a in avisos:
        print('aviso:', a)
    if erros:
        print('\nERROS:')
        for e in erros:
            print(' -', e)
        if '--forcar' not in sys.argv:
            sys.exit(1)
        print('(--forcar: escrevendo mesmo assim)')
    open(SAIDA, 'w', encoding='utf-8').write(fonte)
    print('escrevi', os.path.relpath(SAIDA, RAIZ), f'({len(fonte)} bytes)')


if __name__ == '__main__':
    main()
