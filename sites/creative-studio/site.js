(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* testimonial slider */
  var track = document.getElementById('track'), dots = document.getElementById('dots');
  var slides = track.children, n = slides.length, i = 0, timer;
  for (var k = 0; k < n; k++) {
    (function (k) {
      var d = document.createElement('button'); d.type = 'button'; d.className = 'dot'; d.setAttribute('aria-label', (k + 1) + '/' + n);
      d.addEventListener('click', function () { go(k); restart(); }); dots.appendChild(d);
    })(k);
  }
  function go(x) {
    i = (x + n) % n;
    track.style.transform = 'translateX(' + (-100 * i) + '%)';
    Array.prototype.forEach.call(dots.children, function (d, j) { d.setAttribute('aria-current', j === i ? 'true' : 'false'); });
  }
  function restart() { clearInterval(timer); if (!reduce) timer = setInterval(function () { go(i + 1); }, 6000); }
  document.getElementById('prev').addEventListener('click', function () { go(i - 1); restart(); });
  document.getElementById('next').addEventListener('click', function () { go(i + 1); restart(); });
  document.getElementById('slider').addEventListener('mouseenter', function () { clearInterval(timer); });
  document.getElementById('slider').addEventListener('mouseleave', restart);
  go(0); restart();

  /* count-up facts when scrolled into view */
  var counters = document.querySelectorAll('[data-count]');
  function run(el) {
    var end = +el.getAttribute('data-count');
    if (reduce) { el.textContent = end; return; }
    var t0 = null;
    function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1200, 1); el.textContent = Math.round(end * p); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }); }, { threshold: .4 });
    counters.forEach(function (c) { io.observe(c); });
  } else counters.forEach(function (c) { c.textContent = c.getAttribute('data-count'); });
})();
