// Visualizador de histórias: cartões em tela cheia, com toque, deslize e teclado.
import { STORIES, BY_ID } from '../data/stories.js';
import { state } from '../state.js';
import { stageHTML, icon } from './art.js';
import { img } from '../data/imagens.js';
import { mountWidget } from './widgets/index.js';

import { LIVRO_PDF as PDF, LIVRO_PDF_OFFSET as PDF_OFFSET } from '../data/livro.js';
const $ = (s, r = document) => r.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// mistura duas cores #rrggbb (pct = quanto da cor b entra), para não depender de color-mix em navegadores antigos
const mixHex = (a, b, pct) => {
  const n = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [n(a), n(b)];
  return '#' + x.map((v, i) => Math.round(v * (1 - pct) + y[i] * pct).toString(16).padStart(2, '0')).join('');
};
const ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const ICON_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
const ICON_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';
const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4.6" height="14" rx="1.4"/><rect x="13.4" y="5" width="4.6" height="14" rx="1.4"/></svg>';
const ICON_SOUND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>';
const ICON_I = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>';

export class Viewer {
  constructor(root, hooks = {}) {
    this.root = root;
    this.hooks = hooks; // { onClose(), onNavigate(id, idx), onOpenStory(id) }
    this.story = null;
    this.idx = 0;
    this.cleanup = null;
    this.lastFocus = null;
    this._key = this._key.bind(this);
    this.auto = false;
    this.voice = false;
    this.timer = 0;
    this.fail = 0;
    if ('speechSynthesis' in window) { try { speechSynthesis.addEventListener('voiceschanged', () => this._syncTools()); } catch (e) { /* ignora */ } }
  }

  get isOpen() { return !this.root.hidden; }
  get id() { return this.story ? this.story.id : null; }

  open(id, idx = 0) {
    const story = BY_ID[id];
    if (!story) return;
    const reopen = this.isOpen;
    this.story = story;
    this.closing = false;
    this.titleBefore = this.titleBefore || document.title;
    document.title = `${story.n ? `Parada ${story.n}: ` : ''}${story.title} · VJ`;
    if (!reopen) this.lastFocus = document.activeElement;
    state.setLast(id);
    this.root.hidden = false;
    document.body.classList.add('is-locked');
    this._build();
    requestAnimationFrame(() => this.root.classList.add('is-open'));
    this.go(Math.max(0, Math.min(idx, this.total - 1)), 0, true);
    document.addEventListener('keydown', this._key);
    const f = $('.sv__frame', this.root);
    f && f.focus({ preventScroll: true });
  }

  get total() { return this.story.cards.length + 1; } // + cartão final

  _theme() {
    const t = this.story.theme;
    const sheet = t.dark ? mixHex(t.b, '#ffffff', 0.09) : mixHex(t.b, '#ffffff', 0.58);
    const glow = t.dark ? 'rgba(255, 226, 150, 0.13)' : 'rgba(255, 255, 255, 0.62)';
    return `--st-a:${t.a};--st-b:${t.b};--st-ink:${t.ink};--st-accent:${t.accent};--st-sheet:${sheet};--st-glow:${glow}`;
  }

  _build() {
    const s = this.story;
    this.root.innerHTML = `
      <div class="sv__frame" role="dialog" aria-modal="true" aria-label="${s.n ? `Parada ${s.n}: ` : ''}${esc(s.title)}" tabindex="-1" data-dark="${s.theme.dark ? 1 : 0}" style="${this._theme()}">
        <div class="sv__top">
          <div class="sv__bars" aria-hidden="true">${Array.from({ length: this.total }, () => '<i></i>').join('')}</div>
          <div class="sv__row">
            <div class="sv__ttl"><b>${s.n || '⏱'}</b><span>${esc(s.title)}</span></div>
            <div class="sv__tools">
              <button class="sv__tool" type="button" data-tool="sound" aria-pressed="false" aria-label="Narração em voz alta" title="Narração em voz alta" hidden>${ICON_SOUND}</button>
              <button class="sv__tool" type="button" data-tool="play" aria-pressed="false" aria-label="Reproduzir automaticamente" title="Reproduzir automaticamente">${ICON_PLAY}</button>
              <button class="sv__x" type="button" aria-label="Fechar história">${ICON_X}</button>
            </div>
          </div>
        </div>
        <div class="sv__card" id="svCard"></div>
        <div class="sv__nav">
          <button class="sv__prev" type="button" aria-label="Cartão anterior">${ICON_L}</button>
          <span class="sv__count" aria-hidden="true"></span>
          <button class="sv__next" type="button"><span>Continuar</span>${ICON_R}</button>
        </div>
        <div class="sv__sr" aria-live="polite" id="svLive"></div>
      </div>
      <button class="sv__arrow sv__arrow--prev" type="button" tabindex="-1" aria-label="Cartão anterior">${ICON_L}</button>
      <button class="sv__arrow sv__arrow--next" type="button" tabindex="-1" aria-label="Próximo cartão">${ICON_R}</button>`;
    const frame = $('.sv__frame', this.root);
    $('.sv__x', frame).addEventListener('click', () => this.close());
    $('[data-tool="play"]', frame).addEventListener('click', () => this._toggleAuto());
    $('[data-tool="sound"]', frame).addEventListener('click', () => this._toggleVoice());
    this._syncTools();
    $('.sv__prev', frame).addEventListener('click', () => this.prev());
    $('.sv__next', frame).addEventListener('click', () => this.next());
    $('.sv__arrow--prev', this.root).addEventListener('click', () => this.prev());
    $('.sv__arrow--next', this.root).addEventListener('click', () => this.next());
    this._gestures(frame);
    // ao sair para conferir um trecho no site do livro, a reprodução automática para (senão os cartões passariam sem você)
    frame.addEventListener('click', (e) => { if (this.auto && e.target.closest('a[data-egw]')) this._setAuto(false, 'Reprodução pausada.'); });
    this.frame = frame;
    this.cardEl = $('#svCard', frame);
    this._syncTools();
  }

  _gestures(frame) {
    let sx = 0, sy = 0, st = 0, tracking = false, blocked = false;
    frame.addEventListener('pointerdown', (e) => {
      tracking = true; sx = e.clientX; sy = e.clientY; st = Date.now();
      blocked = !!e.target.closest('[data-nonav], button, a, input, select, textarea, label, .sv__text .sv__q');
    });
    frame.addEventListener('pointercancel', () => { tracking = false; });
    frame.addEventListener('pointerup', (e) => {
      if (!tracking) return; tracking = false;
      if (blocked) return;
      const dx = e.clientX - sx, dy = e.clientY - sy, dt = Date.now() - st;
      if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? this.next() : this.prev(); return; }
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 500) {
        if (this.cardEl && this.cardEl.dataset.k === 'widget') return;
        const r = frame.getBoundingClientRect();
        const rel = (e.clientX - r.left) / r.width;
        rel < 0.3 ? this.prev() : this.next();
      }
    });
  }

  _key(e) {
    if (!this.isOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); this.close(); return; }
    const t = e.target;
    const typing = t && t.closest && t.closest('input[type="range"], input[type="text"], textarea, select');
    if (typing && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
    if (e.key === 'ArrowRight' || (e.key === 'PageDown')) { e.preventDefault(); this.next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); this.prev(); }
    else if (e.key === 'Tab') this._trap(e);
  }

  _trap(e) {
    const f = this.frame; if (!f) return;
    const els = [...f.querySelectorAll('button:not([disabled]), a[href], input, select, [tabindex="0"]')].filter((el) => el.offsetParent !== null);
    if (!els.length) return;
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  next() { if (this.idx < this.total - 1) { this.go(this.idx + 1, 1); this._tick(); } }
  prev() { if (this.idx > 0) { this.go(this.idx - 1, -1); this._tick(); } }
  _tick() { try { navigator.vibrate && navigator.vibrate(6); } catch (e) { /* sem vibração */ } }

  go(i, dir = 0, first = false) {
    this._clearPlay();
    if (this.cleanup) { try { this.cleanup(); } catch (e) { /* ignora */ } this.cleanup = null; }
    this.idx = i;
    const s = this.story;
    const isEnd = i >= s.cards.length;
    const card = isEnd ? null : s.cards[i];
    const el = this.cardEl;
    el.className = 'sv__card' + (dir > 0 ? ' is-next' : dir < 0 ? ' is-prev' : '');
    el.dataset.k = isEnd ? 'end' : card.k;
    this.frame.dataset.k = el.dataset.k;
    el.innerHTML = isEnd ? this._endHTML() : this._cardHTML(card);

    // progresso
    [...$('.sv__bars', this.frame).children].forEach((b, n) => {
      b.className = n < i ? 'is-done' : n === i ? 'is-now' : '';
    });
    $('.sv__count', this.frame).textContent = `${i + 1} / ${this.total}`;
    const prev = $('.sv__prev', this.frame); prev.disabled = i === 0;
    $('.sv__arrow--prev', this.root).disabled = i === 0;
    $('.sv__arrow--next', this.root).disabled = isEnd;
    const nxt = $('.sv__next', this.frame);
    nxt.hidden = isEnd;
    state.setPos(s.id, i);
    if (isEnd) state.setDone(s.id);
    this.hooks.onNavigate && this.hooks.onNavigate(s.id, i);

    // acessibilidade
    const live = $('#svLive', this.frame);
    live.textContent = isEnd ? `Parada concluída: ${s.title}` : `Cartão ${i + 1} de ${this.total}. ${card.big || ''} ${card.small || ''}`;

    // interações
    if (!isEnd && card.k === 'widget') {
      const host = $('.sv__wdg', el);
      const ctx = { story: s, card, next: () => this.next(), toast: (m) => this.hooks.toast && this.hooks.toast(m) };
      mountWidget(card.w, host, card, ctx).then((c) => { this.cleanup = c; }).catch((err) => {
        console.error(err);
        host.innerHTML = '<p class="sv__small">Não foi possível carregar este cartão. Toque em Continuar.</p>';
      });
    }
    if (isEnd) this._bindEnd();

    this._schedule();

    // dica de toque na primeira vez
    if (first && i === 0 && !state.hintSeen() && !matchMedia('(pointer: fine) and (hover: hover)').matches) {
      state.setHintSeen();
      this.frame.insertAdjacentHTML('beforeend', `<div class="sv__coach" aria-hidden="true"><div>${ICON_L}<span>voltar</span></div><div>${ICON_R}<span>toque para avançar</span></div></div>`);
      setTimeout(() => { const c = $('.sv__coach', this.frame); c && c.remove(); }, 3700);
    }
  }

  _cardHTML(c) {
    if (c.k === 'widget') {
      return `<div class="sv__text"><h2 class="sv__big">${esc(c.big)}</h2><p class="sv__small">${esc(c.small)}</p></div><div class="sv__wdg" data-nonav></div>`;
    }
    // data-q: junto da referência, o link do livro (js/ui/refs.js) também destaca esta frase na página do site oficial
    const q = c.q ? `<blockquote class="sv__q" data-q="${esc(c.hl || c.q)}">“${esc(c.q)}”<cite>${esc(c.ref || '')}</cite></blockquote>` : '';
    const note = c.note ? `<p class="sv__note">${ICON_I}<span>${esc(c.note)}</span></p>` : '';
    const links = c.links || (c.link ? [c.link] : []);
    const link = links.length ? `<div class="sv__links">${links.map((l, i) => `<a class="sv__btn ${i ? 'sv__btn--ghost' : 'sv__btn--pri'}" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.txt)}</a>`).join('')}</div>` : '';
    // hl: frase do livro (não aparece na tela) que o link de "No livro" destaca na página do site oficial, quando a referência é um parágrafo longo
    const ref = c.ref && !c.q ? `<span class="sv__ref"${c.hl ? ` data-q="${esc(c.hl)}"` : ''}>No livro: ${esc(c.ref)}</span>` : '';
    const slot = this.idx === 0 ? (img(`c-${this.story.n}-1`) || img(`parada-${this.story.n}`)) : img(`c-${this.story.n}-${this.idx + 1}`);
    return `<div class="sv__stage">${stageHTML(c.art, this.story.scene, slot)}</div>
      <div class="sv__text">
        <h2 class="sv__big">${esc(c.big)}</h2>
        ${c.small ? `<p class="sv__small">${esc(c.small)}</p>` : ''}
        ${q}${note}${link}${ref}
      </div>`;
  }

  _endHTML() {
    const s = this.story;
    const nxt = STORIES[STORIES.findIndex((x) => x.id === s.id) + 1];
    const all = s.n > 0 && STORIES.every((x) => x.id === s.id || state.isDone(x.id));
    const party = all ? `<div class="sv__party" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2, d = 120 + (i % 3) * 40; return `<i style="--bx:${(Math.cos(a) * d).toFixed(0)}%;--by:${(Math.sin(a) * d).toFixed(0)}%;animation-delay:${i * 40}ms"><svg viewBox="0 0 100 100"><use href="#s-${i % 3 === 0 ? 'star' : i % 3 === 1 ? 'heart' : 'dove'}"/></svg></i>`; }).join('')}</div>` : '';
    return `<div class="sv__stage">${stageHTML({ items: [s.icon, 'star', 'heart'], layout: 'three', anim: 'bounce' }, s.scene, img(`parada-${s.n}`))}${party}</div>
      <div class="sv__text sv__end">
        <h2 class="sv__big">${all ? 'Jornada completa!' : 'Parada concluída.'}</h2>
        <p class="sv__take"><b>Leve isto</b>${esc(s.recap)}</p>
        ${s.ponte ? `<p class="sv__ponte">${esc(s.ponte)}</p>` : ''}
        <p class="sv__read"><b>Para ler no livro:</b> ${esc(s.book)}.${s.pagina && PDF ? ` <a href="${PDF}#page=${s.pagina + PDF_OFFSET}" target="_blank" rel="noopener">Abrir no PDF (p. ${s.pagina})</a>` : ''}</p>
        <div class="sv__actions">
          ${nxt ? `<button class="sv__btn sv__btn--pri" type="button" data-act="next">Próxima: ${esc(nxt.title)}</button>` : `<button class="sv__btn sv__btn--pri" type="button" data-act="home">Voltar ao início</button>`}
          <button class="sv__btn sv__btn--ghost" type="button" data-act="share">Compartilhar</button>
          <button class="sv__btn sv__btn--ghost" type="button" data-act="again">Rever</button>
          <button class="sv__btn sv__btn--ghost" type="button" data-act="path">A jornada</button>
        </div>
      </div>`;
  }

  _bindEnd() {
    const s = this.story;
    const nxt = STORIES[STORIES.findIndex((x) => x.id === s.id) + 1];
    this.cardEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const act = b.dataset.act;
      if (act === 'next' && nxt) this.hooks.onOpenStory && this.hooks.onOpenStory(nxt.id);
      else if (act === 'share') this._share();
      else if (act === 'again') this.go(0, -1);
      else if (act === 'path' || act === 'home') this.close(act === 'path' ? '#jornada' : '#topo');
    });
  }

  // ---------- modo palestrante: reprodução automática e narração ----------
  _ptVoice() {
    if (!('speechSynthesis' in window)) return null;
    const vs = speechSynthesis.getVoices().filter((v) => /^pt/i.test(v.lang));
    return vs.find((v) => /pt[-_]BR/i.test(v.lang) && /google|luciana|felipe|francisca|microsoft/i.test(v.name)) || vs.find((v) => /pt[-_]BR/i.test(v.lang)) || vs[0] || null;
  }
  _syncTools() {
    if (!this.frame) return;
    const b = $('[data-tool="sound"]', this.frame);
    if (b) b.hidden = !this._ptVoice();
    const p = $('[data-tool="play"]', this.frame);
    if (p) { p.setAttribute('aria-pressed', String(this.auto)); p.innerHTML = this.auto ? ICON_PAUSE : ICON_PLAY; p.setAttribute('aria-label', this.auto ? 'Pausar reprodução' : 'Reproduzir automaticamente'); p.title = p.getAttribute('aria-label'); }
    if (b) b.setAttribute('aria-pressed', String(this.voice));
    this.frame.classList.toggle('is-auto', this.auto);
  }
  _toggleAuto() {
    if (this.auto) { this._setAuto(false); return; }
    this.auto = true; this._syncTools();
    if (this.idx >= this.total - 1) { this.go(0, -1); return; }
    const k = this.cardEl && this.cardEl.dataset.k;
    if (k === 'widget') this.next(); else this._schedule();
  }
  _toggleVoice() {
    this.voice = !this.voice; this._syncTools();
    if (this.voice) { if (!this.auto) { this.auto = true; this._syncTools(); } this._schedule(); }
    else { try { speechSynthesis.cancel(); } catch (e) { /* ignora */ } this._schedule(); }
  }
  _setAuto(on, aviso) {
    this.auto = on; this._clearPlay(); this._syncTools();
    if (aviso && this.hooks.toast) this.hooks.toast(aviso);
  }
  _clearPlay() {
    clearTimeout(this.timer); clearTimeout(this.fail); this.timer = 0; this.fail = 0;
    try { if ('speechSynthesis' in window) speechSynthesis.cancel(); } catch (e) { /* ignora */ }
  }
  _speech(c) {
    if (!c) return `Parada concluída. ${this.story.recap} ${this.story.ponte || ''}`;
    if (c.k === 'widget') return `${c.big}. ${c.pergunta || c.small || ''}`;
    return `${c.big} ${c.small || ''} ${c.q ? `O livro diz: ${c.q}.` : ''}`.replace(/\s+/g, ' ').trim();
  }
  _schedule() {
    clearTimeout(this.timer); clearTimeout(this.fail);
    if (!this.auto || !this.story) return;
    const isEnd = this.idx >= this.story.cards.length;
    const card = isEnd ? null : this.story.cards[this.idx];
    if (card && card.k === 'widget') { this._setAuto(false, 'Pausado na interação. Toque em ▶ para seguir.'); return; }
    const text = this._speech(card);
    const palavras = text.split(' ').length;
    const ms = Math.max(3400, Math.min(13000, 2400 + palavras * 330));
    const bar = $('.sv__bars i.is-now', this.frame);
    if (bar) bar.style.setProperty('--dur', ms + 'ms');
    const avancar = () => { if (!this.auto) return; if (isEnd) this._setAuto(false); else this.next(); };
    const v = this.voice ? this._ptVoice() : null;
    if (v) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = v.lang; u.voice = v; u.rate = 0.98;
      let feito = false;
      const fim = () => { if (feito) return; feito = true; clearTimeout(this.fail); this.timer = setTimeout(avancar, 700); };
      u.onend = fim; u.onerror = fim;
      try { speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) { this.timer = setTimeout(avancar, ms); return; }
      this.fail = setTimeout(fim, ms + 9000);
    } else if (!isEnd) {
      this.timer = setTimeout(avancar, ms);
    } else {
      this._setAuto(false);
    }
  }

  async _share() {
    const s = this.story;
    const data = { title: `VJ — ${s.title}`, text: s.hook, url: `https://paulorltenorio.github.io/VJ/#/h/${s.id}` };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); this.hooks.toast && this.hooks.toast('Link da parada copiado!'); }
    } catch (e) { /* cancelado */ }
  }

  close(scrollTo) {
    if (!this.isOpen || this.closing) return;
    this.closing = true;
    this.auto = false; this._clearPlay();
    if (this.titleBefore) { document.title = this.titleBefore; this.titleBefore = ''; }
    if (this.cleanup) { try { this.cleanup(); } catch (e) { /* ignora */ } this.cleanup = null; }
    document.removeEventListener('keydown', this._key);
    this.root.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    const done = () => { this.root.hidden = true; this.root.innerHTML = ''; };
    setTimeout(done, 280);
    const f = this.lastFocus; this.lastFocus = null;
    if (f && f.focus) { try { f.focus({ preventScroll: true }); } catch (e) { /* ignora */ } }
    this.story = null;
    this.hooks.onClose && this.hooks.onClose(scrollTo);
  }
}

export { icon };
