(function () {
  "use strict";

  var root = document.querySelector(".gallery[data-gallery]");
  if (!root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll("a.gallery-item"));
  if (!items.length) return;

  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Bildvisning");
  lb.setAttribute("tabindex", "-1");
  lb.innerHTML =
    '<button class="lb-close" type="button" aria-label="Stäng">&times;</button>' +
    '<button class="lb-prev" type="button" aria-label="Föregående bild">&#10094;</button>' +
    '<button class="lb-next" type="button" aria-label="Nästa bild">&#10095;</button>' +
    '<figure class="lb-stage"></figure>' +
    '<div class="lb-caption" role="status" aria-live="polite"></div>';
  document.body.appendChild(lb);

  var stage = lb.querySelector(".lb-stage");
  var caption = lb.querySelector(".lb-caption");
  var closeBtn = lb.querySelector(".lb-close");
  var prevBtn = lb.querySelector(".lb-prev");
  var nextBtn = lb.querySelector(".lb-next");
  var current = 0;
  var lastFocused = null;
  var preloaded = {};

  function preload(i) {
    if (!items.length) return;
    var a = items[(i + items.length) % items.length];
    var url = a.getAttribute("data-webp") || a.getAttribute("href");
    if (!url || preloaded[url]) return;
    preloaded[url] = true;
    var img = new Image();
    img.src = url;
  }

  function render(i) {
    if (!items.length) return;
    current = (i + items.length) % items.length;
    var a = items[current];
    var itemImg = a.querySelector("img");
    var alt = (itemImg && itemImg.getAttribute("alt")) || "";
    var webp = a.getAttribute("data-webp");
    stage.innerHTML =
      "<picture>" +
      (webp ? '<source type="image/webp" srcset="' + webp + '">' : "") +
      '<img class="lb-img" src="' + a.getAttribute("href") + '" alt="' + alt + '" decoding="async">' +
      "</picture>";
    caption.textContent = current + 1 + " av " + items.length;
    preload(current + 1);
    preload(current - 1);
  }

  function setBackgroundInert(value) {
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === lb) return;
      if (value) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  }

  function show(i) {
    lastFocused = document.activeElement;
    render(i);
    lb.classList.add("open");
    document.body.classList.add("lb-open");
    setBackgroundInert(true);
    closeBtn.focus();
  }

  function close() {
    lb.classList.remove("open");
    document.body.classList.remove("lb-open");
    stage.innerHTML = "";
    setBackgroundInert(false);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
    lastFocused = null;
  }

  items.forEach(function (a, idx) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      show(idx);
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () {
    render(current - 1);
  });
  nextBtn.addEventListener("click", function () {
    render(current + 1);
  });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowLeft") {
      render(current - 1);
      return;
    }
    if (e.key === "ArrowRight") {
      render(current + 1);
      return;
    }
    if (e.key === "Tab") {
      // Håll kvar fokus i dialogen
      var focusables = [closeBtn, prevBtn, nextBtn];
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (!lb.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  var sx = null;
  lb.addEventListener("touchstart", function (e) {
    sx = e.changedTouches[0].clientX;
  }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) render(current + (dx < 0 ? 1 : -1));
    sx = null;
  }, { passive: true });
})();
