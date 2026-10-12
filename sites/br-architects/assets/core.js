/*! collection-lab core: i18n (uz/en/ru) + dark/light theme + toast + menu. No dependencies. */
(function () {
  'use strict';
  var root = document.documentElement;
  var site = root.getAttribute('data-site') || 'site';
  var LANGS = ['uz', 'en', 'ru'];
  var LABELS = { uz: "O'zbekcha", en: 'English', ru: 'Русский' };

  function read(k) { try { return localStorage.getItem(site + ':' + k); } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(site + ':' + k, v); } catch (e) { /* storage blocked */ } }

  /* ---------- theme ---------- */
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function systemTheme() { return mq && mq.matches ? 'dark' : 'light'; }
  var theme = read('theme');
  if (theme !== 'dark' && theme !== 'light') theme = systemTheme();

  function applyTheme(next, persist) {
    theme = next;
    root.setAttribute('data-theme', next);
    root.setAttribute('data-bs-theme', next);
    root.style.colorScheme = next;
    if (persist) write('theme', next);
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
      btns[i].setAttribute('title', t(next === 'dark' ? 'ui.light' : 'ui.dark'));
      btns[i].setAttribute('aria-label', t(next === 'dark' ? 'ui.light' : 'ui.dark'));
    }
  }
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function () { if (!read('theme')) applyTheme(systemTheme(), false); });
  }

  /* ---------- i18n ---------- */
  var dict = window.SITE_I18N || {};
  var common = {
    uz: { 'ui.dark': "Qorong'i rejim", 'ui.light': 'Yorug\' rejim', 'ui.lang': 'Til', 'ui.demo': "Demo rejim: bu havola/amal ishlamaydi", 'ui.menu': 'Menyu', 'ui.close': 'Yopish', 'ui.top': 'Tepaga', 'ui.dev': 'Ishlab chiquvchi' },
    en: { 'ui.dark': 'Dark mode', 'ui.light': 'Light mode', 'ui.lang': 'Language', 'ui.demo': 'Demo mode: this link/action is not connected', 'ui.menu': 'Menu', 'ui.close': 'Close', 'ui.top': 'Back to top', 'ui.dev': 'Developed by' },
    ru: { 'ui.dark': 'Тёмная тема', 'ui.light': 'Светлая тема', 'ui.lang': 'Язык', 'ui.demo': 'Демо-режим: эта ссылка/действие не подключены', 'ui.menu': 'Меню', 'ui.close': 'Закрыть', 'ui.top': 'Наверх', 'ui.dev': 'Разработчик' }
  };
  var lang = read('lang');
  if (LANGS.indexOf(lang) < 0) lang = 'uz';

  function t(key) {
    var v = (dict[lang] && dict[lang][key]) || (common[lang] && common[lang][key]) ||
      (dict.uz && dict.uz[key]) || (common.uz && common.uz[key]);
    return v === undefined ? key : v;
  }

  function applyLang(next, persist) {
    lang = next;
    root.setAttribute('lang', next);
    if (persist) write('lang', next);
    var i, el, nodes = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = t(el.getAttribute('data-i18n'));
      else el.textContent = t(el.getAttribute('data-i18n'));
    }
    nodes = document.querySelectorAll('[data-i18n-attr]');
    for (i = 0; i < nodes.length; i++) {
      el = nodes[i];
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var p = pair.split(':');
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    }
    if (dict[next] && dict[next]['meta.title']) document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md && dict[next] && dict[next]['meta.description']) md.setAttribute('content', t('meta.description'));
    var btns = document.querySelectorAll('[data-lang]');
    for (i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-lang') === next ? 'true' : 'false');
    applyTheme(theme, false); // refresh theme button labels in new language
    document.dispatchEvent(new CustomEvent('langchange', { detail: next }));
  }

  /* ---------- toast ---------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'cl-toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-show'); }, 2800);
  }
  function toastKey(key) { toast(t(key)); }

  /* ---------- init ---------- */
  applyTheme(theme, false);

  function buildSwitchers() {
    var holders = document.querySelectorAll('[data-lang-switch]');
    for (var i = 0; i < holders.length; i++) {
      holders[i].setAttribute('role', 'group');
      holders[i].classList.add('cl-lang');
      holders[i].innerHTML = '';
      LANGS.forEach(function (l) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('data-lang', l);
        b.setAttribute('lang', l);
        b.setAttribute('title', LABELS[l]);
        b.setAttribute('aria-label', LABELS[l]);
        b.textContent = l.toUpperCase();
        holders[i].appendChild(b);
      });
    }
    var tb = document.querySelectorAll('[data-theme-toggle]');
    for (var j = 0; j < tb.length; j++) {
      tb[j].classList.add('cl-theme');
      tb[j].setAttribute('type', 'button');
      tb[j].innerHTML = '<svg class="cl-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="cl-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    }
  }

  function closeMenus(except) {
    var open = document.querySelectorAll('.is-menu-open');
    for (var i = 0; i < open.length; i++) if (open[i] !== except) setMenu(open[i], false);
  }
  function setMenu(menu, show) {
    menu.classList.toggle('is-menu-open', show);
    document.documentElement.classList.toggle('has-menu-open', !!document.querySelector('.is-menu-open'));
    var btns = document.querySelectorAll('[data-menu-toggle][aria-controls="' + menu.id + '"]');
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-expanded', show ? 'true' : 'false');
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-lang],[data-theme-toggle],[data-menu-toggle],[data-demo],a[href^="#"],[data-toast]') : null;
    if (!el) return;
    if (el.hasAttribute('data-lang')) { applyLang(el.getAttribute('data-lang'), true); return; }
    if (el.hasAttribute('data-theme-toggle')) { applyTheme(theme === 'dark' ? 'light' : 'dark', true); return; }
    if (el.hasAttribute('data-menu-toggle')) {
      var m = document.getElementById(el.getAttribute('aria-controls'));
      if (m) { var show = !m.classList.contains('is-menu-open'); closeMenus(m); setMenu(m, show); }
      return;
    }
    if (el.hasAttribute('data-demo')) { e.preventDefault(); toastKey('ui.demo'); return; }
    if (el.hasAttribute('data-toast')) { e.preventDefault(); toastKey(el.getAttribute('data-toast')); return; }
    if (el.tagName === 'A') {
      var h = el.getAttribute('href');
      if (h === '#') { e.preventDefault(); toastKey('ui.demo'); return; }
      closeMenus(null);
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenus(null); });

  /* forms: validate, then show a demo message instead of sending anywhere */
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f.hasAttribute || !f.hasAttribute('data-demo-form')) return;
    e.preventDefault();
    if (f.reportValidity && !f.reportValidity()) return;
    toastKey(f.getAttribute('data-demo-form') || 'ui.demo');
    f.reset();
  });

  document.addEventListener('DOMContentLoaded', function () {
    buildSwitchers();
    applyLang(lang, false);
  });

  window.Site = { t: t, toast: toast, toastKey: toastKey, lang: function () { return lang; }, theme: function () { return theme; } };
})();
