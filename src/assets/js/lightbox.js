(function () {
  "use strict";

  var root = document.querySelector(".gallery[data-gallery]");
  if (!root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll("a.gallery-item"));
  if (!items.length) return;

  // Native <dialog>: webbläsaren sköter top layer, inert bakgrund,
  // fokusfång, Esc/backstängning och återlämning av fokus.
  var lb = document.createElement("dialog");
  lb.className = "lightbox";
  lb.setAttribute("aria-label", "Bildvisning");
  lb.innerHTML =
    '<button class="lb-close" type="button" aria-label="Stäng" autofocus>&times;</button>' +
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
    var webp = a.getAttribute("data-webp");

    var picture = document.createElement("picture");
    if (webp) {
      var source = document.createElement("source");
      source.type = "image/webp";
      source.srcset = webp;
      picture.appendChild(source);
    }
    var img = document.createElement("img");
    img.className = "lb-img";
    img.src = a.getAttribute("href");
    img.alt = (itemImg && itemImg.getAttribute("alt")) || "";
    img.decoding = "async";
    picture.appendChild(img);
    stage.replaceChildren(picture);

    caption.textContent = current + 1 + " av " + items.length;
    preload(current + 1);
    preload(current - 1);
  }

  function show(i) {
    render(i);
    lb.showModal();
  }

  items.forEach(function (a, idx) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      show(idx);
    });
  });

  closeBtn.addEventListener("click", function () {
    lb.close();
  });
  prevBtn.addEventListener("click", function () {
    render(current - 1);
  });
  nextBtn.addEventListener("click", function () {
    render(current + 1);
  });

  // Klick på den mörka ytan (dialogens egen bakgrund) stänger
  lb.addEventListener("click", function (e) {
    if (e.target === lb) lb.close();
  });

  // Rensa bilden när dialogen stängs (Esc, klick eller stängknappen)
  lb.addEventListener("close", function () {
    stage.replaceChildren();
  });

  document.addEventListener("keydown", function (e) {
    if (!lb.open) return;
    if (e.key === "ArrowLeft") {
      render(current - 1);
      return;
    }
    if (e.key === "ArrowRight") {
      render(current + 1);
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
