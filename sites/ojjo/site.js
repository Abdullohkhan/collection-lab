(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var all = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  var DATA = [
    { id: 1, type: 'pendant', brand: 'Aurum', price: 175000, img: 'p4' },
    { id: 2, type: 'ring', brand: 'Lumière', price: 64000, img: 'p11' },
    { id: 3, type: 'earrings', brand: 'Nord Gem', price: 42000, img: 'p6' },
    { id: 4, type: 'watch', brand: 'Aurum', price: 210000, img: 'p15' },
    { id: 5, type: 'bracelet', brand: 'Lumière', price: 38000, img: 'p9' },
    { id: 6, type: 'cufflinks', brand: 'Nord Gem', price: 27000, img: 'p12' },
    { id: 7, type: 'ring', brand: 'Aurum', price: 128000, img: 'p14' },
    { id: 8, type: 'pendant', brand: 'Nord Gem', price: 55000, img: 'p5' },
    { id: 9, type: 'ring', brand: 'Nord Gem', price: 91000, img: 'p7' },
    { id: 10, type: 'bracelet', brand: 'Aurum', price: 149000, img: 'p2' },
    { id: 11, type: 'earrings', brand: 'Aurum', price: 112000, img: 'p13' },
    { id: 12, type: 'watch', brand: 'Lumière', price: 183000, img: 'p15' }
  ];
  var EVENTS = {
    wedding: function (p) { return p.type === 'ring'; },
    him: function (p) { return p.type === 'cufflinks' || p.type === 'watch'; },
    her: function (p) { return p.type === 'earrings' || p.type === 'pendant' || p.type === 'bracelet'; },
    partner: function (p) { return p.type === 'ring' || p.type === 'pendant'; },
    collections: function () { return true; },
    rare: function (p) { return p.price > 100000; }
  };
  var PAGE = 6, shown = PAGE, ev = null, term = '';
  var grid = $('#products'), empty = $('#empty'), more = $('#more');

  function fmt(n) { return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  function list() {
    var b = $('#fBrand').value, pr = $('#fPrice').value, ty = $('#fType').value, so = $('#fSort').value;
    var r = DATA.filter(function (p) {
      if (b && p.brand !== b) return false;
      if (pr === 'lo' && p.price > 100000) return false;
      if (pr === 'hi' && p.price <= 100000) return false;
      if (ty && p.type !== ty) return false;
      if (ev && !EVENTS[ev](p)) return false;
      if (term) {
        var hay = (window.Site.t('type.' + p.type) + ' ' + p.brand).toLowerCase();
        if (hay.indexOf(term) < 0) return false;
      }
      return true;
    });
    if (so === 'asc') r.sort(function (a, c) { return a.price - c.price; });
    if (so === 'desc') r.sort(function (a, c) { return c.price - a.price; });
    return r;
  }

  function render() {
    var r = list();
    grid.innerHTML = '';
    r.slice(0, shown).forEach(function (p) {
      var el = document.createElement('article');
      el.className = 'product';
      el.innerHTML = '<img loading="lazy" alt="" src="img/' + p.img + '.jpg"><h3>' + window.Site.t('type.' + p.type) + '</h3><h4>' + p.brand + '</h4><button type="button" data-fav>' + fmt(p.price) + '</button>';
      grid.appendChild(el);
    });
    empty.hidden = r.length > 0;
    more.hidden = r.length <= shown;
  }

  grid.addEventListener('click', function (e) {
    if (e.target.closest('[data-fav]')) window.Site.toastKey('cat.added');
  });
  more.addEventListener('click', function () { shown += PAGE; render(); });
  ['#fBrand', '#fPrice', '#fType', '#fSort'].forEach(function (s) {
    $(s).addEventListener('change', function () { shown = PAGE; render(); });
  });

  function scrollToCatalog() { $('#catalog').scrollIntoView({ behavior: 'smooth' }); }
  $('#tabs').addEventListener('click', function (e) {
    var t = e.target.closest('[data-ev]'); if (!t) return;
    all('.tab').forEach(function (x) { x.classList.toggle('active', x === t); });
    ev = t.getAttribute('data-ev'); $('#fType').value = ''; shown = PAGE; render(); scrollToCatalog();
  });
  all('.cat').forEach(function (c) {
    c.addEventListener('click', function () {
      ev = null; all('.tab').forEach(function (x) { x.classList.remove('active'); });
      $('#fType').value = c.getAttribute('data-type'); shown = PAGE; render(); scrollToCatalog();
    });
  });

  /* search popover */
  var pop = $('#searchPop'), input = $('#searchInput');
  var open = $('[data-search-open]');
  if (open) open.addEventListener('click', function () { pop.hidden = !pop.hidden; if (!pop.hidden) input.focus(); });
  pop.addEventListener('submit', function (e) {
    e.preventDefault(); term = input.value.trim().toLowerCase(); shown = PAGE; render(); scrollToCatalog();
  });
  input.addEventListener('input', function () { if (!input.value) { term = ''; shown = PAGE; render(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') pop.hidden = true; });

  document.addEventListener('langchange', render);
  render();
})();
