/* =========================================================================
   INMORTAL TATTS — interacción
   Vanilla JS, sin dependencias. Todo lo que anima usa transform/opacity.
   ========================================================================= */
(function () {
  'use strict';

  var doc = document;
  var body = doc.body;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Bloqueo de scroll compartido por intro, menú y lightbox.
     En iOS `overflow:hidden` sobre el body no detiene el scroll: hay que
     fijarlo y devolver la posición al liberarlo. */
  var scrollLock = (function () {
    var y = 0, depth = 0;
    return {
      on: function () {
        if (depth++ > 0) return;
        y = window.pageYOffset || doc.documentElement.scrollTop || 0;
        body.style.top = -y + 'px';
        body.classList.add('is-locked');
      },
      off: function () {
        if (depth === 0 || --depth > 0) return;
        body.classList.remove('is-locked');
        body.style.top = '';
        // 'instant': con scroll-behavior:smooth, un scrollTo normal se anima y
        // cualquier otro desplazamiento lo interrumpe a medio camino.
        try { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); }
        catch (e) { window.scrollTo(0, y); }
      }
    };
  })();

  var WA_NUMBER = '573214074562';
  var WA_BASE_TEXT = 'Hola, Inmortal Tatts. Quiero cotizar un tatuaje. Me gustaría recibir información sobre disponibilidad, precio y proceso de reserva.';

  /* ---------- 1. Intro cinematográfica ---------------------------------- */
  (function intro() {
    var seen = false;
    try { seen = sessionStorage.getItem('it-intro') === '1'; } catch (e) {}

    if (reduced || seen) {
      body.classList.add('intro-skip', 'is-ready');
      body.classList.remove('is-loading');
      return;
    }
    try { sessionStorage.setItem('it-intro', '1'); } catch (e) {}

    scrollLock.on();
    window.setTimeout(function () {
      body.classList.add('is-ready');
      body.classList.remove('is-loading');
      scrollLock.off();
    }, 3400);
  })();

  /* ---------- 2. Header, menú y scrollspy ------------------------------- */
  (function header() {
    var el = doc.getElementById('header');
    var burger = doc.getElementById('burger');
    var nav = doc.getElementById('nav');
    var links = Array.prototype.slice.call(nav.querySelectorAll('.nav__link'));

    var lastY = -1;
    function onScroll() {
      var y = window.pageYOffset;
      if ((y > 40) !== (lastY > 40)) el.classList.toggle('is-scrolled', y > 40);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var navOpen = false;
    function setNav(open) {
      if (open === navOpen) return;
      navOpen = open;
      body.classList.toggle('nav-open', open);
      if (open) scrollLock.on(); else scrollLock.off();
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }
    burger.addEventListener('click', function () {
      setNav(!body.classList.contains('nav-open'));
    });
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = doc.querySelector(a.getAttribute('href'));
        setNav(false);                       // libera el scroll primero
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
          history.replaceState(null, '', a.getAttribute('href'));
        }
      });
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        setNav(false);
        burger.focus();
      }
    });

    // Sección activa
    var sections = links.map(function (a) {
      return doc.querySelector(a.getAttribute('href'));
    }).filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }
  })();

  /* ---------- 3. Revelado por scroll ------------------------------------ */
  var revealObserver = null;
  (function reveals() {
    if (!('IntersectionObserver' in window)) return;
    revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(doc.querySelectorAll('[data-reveal]'), function (el) {
      revealObserver.observe(el);
    });
  })();

  function observeReveal(el) {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('is-visible');
  }

  /* ---------- 4. Parallax (transform vía --py, sólo GPU) ---------------- */
  (function parallax() {
    if (reduced) return;
    var items = Array.prototype.slice.call(doc.querySelectorAll('[data-parallax]'));
    if (!items.length) return;

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      items.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.08;
        var offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.setProperty('--py', offset.toFixed(2) + 'px');
      });
      ticking = false;
    }
    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    request();
  })();

  /* ---------- 5. Portafolio + filtros ----------------------------------- */
  var lightbox = (function () {
    var root = doc.getElementById('lightbox');
    var img = doc.getElementById('lbImg');
    var name = doc.getElementById('lbName');
    var cat = doc.getElementById('lbCat');
    var count = doc.getElementById('lbCount');
    var btnClose = doc.getElementById('lbClose');
    var btnPrev = doc.getElementById('lbPrev');
    var btnNext = doc.getElementById('lbNext');

    var list = [];
    var index = 0;
    var lastFocus = null;

    function render() {
      var item = list[index];
      if (!item) return;
      root.classList.remove('is-ready');
      var src = 'assets/img/portfolio/' + item.file + '.' + (item.ext ? item.ext[item.ext.length - 1] : 'jpg');
      img.onload = function () { root.classList.add('is-ready'); };
      img.src = src;
      img.alt = item.alt || item.name;
      name.textContent = item.placeholder ? 'Espacio reservado' : item.name;
      cat.textContent = item.cat || '';
      count.textContent = (index + 1) + ' / ' + list.length;
      var multi = list.length > 1;
      btnPrev.hidden = !multi;
      btnNext.hidden = !multi;
    }

    function open(items, i) {
      list = items;
      index = i;
      lastFocus = doc.activeElement;
      root.hidden = false;
      scrollLock.on();
      render();
      window.requestAnimationFrame(function () { root.classList.add('is-open'); });
      btnClose.focus();
    }

    function close() {
      root.classList.remove('is-open', 'is-ready');
      scrollLock.off();
      window.setTimeout(function () { root.hidden = true; img.src = ''; }, 350);
      // preventScroll: devolver el foco a la pieza movía la página unos píxeles.
      if (lastFocus && lastFocus.focus) {
        try { lastFocus.focus({ preventScroll: true }); } catch (e) { lastFocus.focus(); }
      }
    }

    function step(dir) {
      if (list.length < 2) return;
      index = (index + dir + list.length) % list.length;
      render();
    }

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { step(-1); });
    btnNext.addEventListener('click', function () { step(1); });
    root.addEventListener('click', function (e) {
      if (e.target === root) close();
    });
    doc.addEventListener('keydown', function (e) {
      if (root.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab') {
        // Foco contenido dentro del diálogo
        var focusables = [btnPrev, btnNext, btnClose].filter(function (b) { return !b.hidden; });
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Swipe en móvil
    var startX = null;
    root.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 55) step(dx < 0 ? 1 : -1);
      startX = null;
    }, { passive: true });

    return { open: open };
  })();

  (function gallery() {
    var grid = doc.getElementById('gallery');
    var filtersBox = doc.getElementById('filters');
    var empty = doc.getElementById('galleryEmpty');
    if (!grid) return;

    var data = Array.isArray(window.PORTFOLIO) ? window.PORTFOLIO : [];
    if (!data.length) {
      grid.hidden = true;
      empty.hidden = false;
      empty.textContent = 'El portafolio se publicará muy pronto.';
      return;
    }

    // Categorías reales: sólo las que tienen piezas publicadas.
    var cats = [];
    data.forEach(function (item) {
      if (item.cat && cats.indexOf(item.cat) === -1) cats.push(item.cat);
    });

    var current = 'all';
    var visible = data.slice();

    function tileFor(item, i) {
      var exts = item.ext || ['avif', 'webp', 'jpg'];
      var base = 'assets/img/portfolio/' + item.file;
      var fallback = base + '.' + exts[exts.length - 1];

      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'tile' + (item.placeholder ? ' tile--placeholder' : '');
      btn.setAttribute('data-cat', item.cat || '');
      btn.setAttribute('data-offset', String(i % 3));
      btn.setAttribute('aria-label', 'Ampliar: ' + (item.placeholder ? 'espacio reservado' : item.name));

      var html = '<picture>';
      if (exts.indexOf('avif') > -1) html += '<source type="image/avif" srcset="' + base + '.avif">';
      if (exts.indexOf('webp') > -1) html += '<source type="image/webp" srcset="' + base + '.webp">';
      html += '<img src="' + fallback + '" width="' + (item.w || 900) + '" height="' + (item.h || 1200) +
              '" loading="lazy" decoding="async" alt="' + (item.alt || item.name).replace(/"/g, '&quot;') + '"></picture>';
      html += '<span class="tile__veil"></span>';
      if (item.placeholder) html += '<span class="tile__badge">Próximamente</span>';
      html += '<span class="tile__info"><span class="tile__name">' + (item.placeholder ? 'Espacio reservado' : item.name) +
              '</span><span class="tile__cat">' + (item.cat || '') + '</span></span>';
      html += '<span class="tile__line"></span>';
      btn.innerHTML = html;

      btn.addEventListener('click', function () {
        lightbox.open(visible, visible.indexOf(item));
      });
      return btn;
    }

    function paint() {
      visible = current === 'all' ? data.slice() : data.filter(function (d) { return d.cat === current; });
      grid.innerHTML = '';
      visible.forEach(function (item, i) {
        var tile = tileFor(item, i);
        grid.appendChild(tile);
        if (reduced) tile.classList.add('is-visible');
        else observeReveal(tile);
      });
      empty.hidden = visible.length > 0;
    }

    // El filtro sólo tiene sentido con dos categorías o más.
    if (cats.length > 1) {
      var makeBtn = function (label, value) {
        var b = doc.createElement('button');
        b.type = 'button';
        b.className = 'filter' + (value === current ? ' is-active' : '');
        b.textContent = label;
        b.setAttribute('data-value', value);
        b.addEventListener('click', function () {
          current = value;
          Array.prototype.forEach.call(filtersBox.children, function (c) {
            c.classList.toggle('is-active', c === b);
          });
          paint();
        });
        return b;
      };
      filtersBox.appendChild(makeBtn('Todo', 'all'));
      cats.forEach(function (c) { filtersBox.appendChild(makeBtn(c, c)); });
    }

    // Las tiles usan la clase .tile para el reveal (comparte transición).
    paint();
  })();

  /* ---------- 6. Cursor personalizado ----------------------------------- */
  (function cursor() {
    if (!finePointer || reduced) return;
    var el = doc.querySelector('.cursor');
    var dot = el.querySelector('.cursor__dot');
    var ring = el.querySelector('.cursor__ring');
    var x = window.innerWidth / 2, y = window.innerHeight / 2;
    var rx = x, ry = y;
    var raf = null;

    function loop() {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
      raf = window.requestAnimationFrame(loop);
    }
    loop();

    // No se muestra hasta que el puntero se mueve de verdad.
    var moved = false;
    el.classList.add('is-hidden');
    doc.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      moved = true;
      el.classList.remove('is-hidden');
    });
    doc.addEventListener('mouseleave', function () { el.classList.add('is-hidden'); });
    doc.addEventListener('mouseenter', function () { if (moved) el.classList.remove('is-hidden'); });

    var hot = 'a, button, .tile, summary, input, select, textarea';
    doc.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(hot)) el.classList.add('is-active');
    });
    doc.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(hot)) el.classList.remove('is-active');
    });

    // Efecto magnético muy leve en los CTA
    Array.prototype.forEach.call(doc.querySelectorAll('[data-magnetic]'), function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var mx = (e.clientX - r.left - r.width / 2) * 0.12;
        var my = (e.clientY - r.top - r.height / 2) * 0.18;
        btn.style.transform = 'translate3d(' + mx.toFixed(2) + 'px,' + my.toFixed(2) + 'px,0)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });

    window.addEventListener('pagehide', function () {
      if (raf) window.cancelAnimationFrame(raf);
    });
  })();

  /* ---------- 7. Formulario → WhatsApp ---------------------------------- */
  (function quoteForm() {
    var form = doc.getElementById('quoteForm');
    if (!form) return;
    var status = doc.getElementById('formStatus');

    function val(n) {
      var f = form.elements[n];
      return f && f.value ? f.value.trim() : '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = ['nombre', 'whatsapp', 'idea'];
      var missing = null;

      required.forEach(function (n) {
        var field = form.elements[n];
        var wrap = field.closest('.field');
        var bad = !field.value.trim();
        wrap.classList.toggle('has-error', bad);
        if (bad && !missing) missing = field;
      });

      if (missing) {
        status.textContent = 'Completa nombre, WhatsApp y tu idea para continuar.';
        missing.focus();
        return;
      }

      var lines = [
        WA_BASE_TEXT,
        '',
        'Nombre: ' + val('nombre'),
        'WhatsApp: ' + val('whatsapp')
      ];
      if (val('email')) lines.push('Email: ' + val('email'));
      lines.push('Idea: ' + val('idea'));
      if (val('zona')) lines.push('Zona del cuerpo: ' + val('zona'));
      if (val('tamano')) lines.push('Tamaño: ' + val('tamano'));
      if (val('presupuesto')) lines.push('Presupuesto: ' + val('presupuesto'));
      if (val('referencias')) lines.push('Referencias: ' + val('referencias'));

      status.textContent = 'Abriendo WhatsApp…';
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });

    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('.field');
      if (wrap && wrap.classList.contains('has-error') && e.target.value.trim()) {
        wrap.classList.remove('has-error');
        status.textContent = '';
      }
    });
  })();

  /* ---------- 8. WhatsApp flotante y año -------------------------------- */
  (function floating() {
    var fab = doc.querySelector('.wa-float');
    var hero = doc.getElementById('inicio');
    if (!fab || !hero) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        fab.classList.toggle('is-visible', !entries[0].isIntersecting);
      }, { threshold: 0.15 });
      io.observe(hero);
    } else {
      fab.classList.add('is-visible');
    }

    var year = doc.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  })();
})();
