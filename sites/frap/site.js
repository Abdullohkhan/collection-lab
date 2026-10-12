(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var all = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* catalog dropdown (click + keyboard; hover handled in CSS on desktop) */
  var dropBtn = $('.drop-btn'), drop = $('.drop');
  dropBtn.addEventListener('click', function () {
    var open = drop.classList.toggle('open');
    dropBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function (e) { if (!drop.contains(e.target)) { drop.classList.remove('open'); dropBtn.setAttribute('aria-expanded', 'false'); } });

  /* search: filters category tiles live */
  var q = $('#q'), tiles = all('.tile'), empty = $('#empty');
  function filter(term) {
    term = (term || '').trim().toLowerCase();
    var shown = 0;
    tiles.forEach(function (t) {
      var ok = !term || t.textContent.toLowerCase().indexOf(term) > -1;
      t.hidden = !ok; if (ok) shown++;
    });
    empty.hidden = shown > 0;
  }
  q.addEventListener('input', function () { filter(q.value); });
  $('[data-search-toggle]').addEventListener('click', function (e) {
    var s = $('#search'), open = s.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) q.focus(); else { q.value = ''; filter(''); }
  });
  /* choosing a category in the dropdown filters by its name */
  all('[data-cat]').forEach(function (a) {
    a.addEventListener('click', function () {
      var key = a.getAttribute('data-cat');
      tiles.forEach(function (t) { t.hidden = t.getAttribute('data-key') !== key; });
      empty.hidden = tiles.some(function (t) { return !t.hidden; });
      q.value = '';
      drop.classList.remove('open');
    });
  });
  all('[data-all]').forEach(function (a) { a.addEventListener('click', function () { q.value = ''; filter(''); }); });
  document.addEventListener('langchange', function () { filter(q.value); });

  /* cart counter (demo) */
  var n = 0, count = $('#count');
  function bump() { n++; count.textContent = n; count.hidden = false; window.Site.toastKey('ui.added'); }
  all('[data-add]').forEach(function (b) { b.addEventListener('click', bump); });
  $('#cart').addEventListener('click', function () { window.Site.toastKey('ui.demo'); });
})();
