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
  lb.innerHTML =
    '<button class="lb-close" type="button" aria-label="Stäng">&times;</button>' +
    '<button class="lb-prev" type="button" aria-label="Föregående bild">&#10094;</button>' +
    '<button class="lb-next" type="button" aria-label="Nästa bild">&#10095;</button>' +
    '<figure class="lb-stage"></figure>' +
    '<div class="lb-caption"></div>';
  document.body.appendChild(lb);

  var stage = lb.querySelector(".lb-stage");
  var caption = lb.querySelector(".lb-caption");
  var current = 0;

  function render(i) {
    if (!items.length) return;
    current = (i + items.length) % items.length;
    var a = items[current];
    var alt = a.querySelector("img").getAttribute("alt") || "";
    stage.innerHTML =
      '<picture>' +
      '<source type="image/webp" srcset="' + a.getAttribute("data-webp") + '">' +
      '<img class="lb-img" src="' + a.getAttribute("href") + '" alt="' + alt + '">' +
      "</picture>";
    caption.textContent = (current + 1) + " / " + items.length;
  }

  function show(i) {
    render(i);
    lb.classList.add("open");
    document.body.classList.add("lb-open");
  }

  function close() {
    lb.classList.remove("open");
    document.body.classList.remove("lb-open");
    stage.innerHTML = "";
  }

  items.forEach(function (a, idx) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      show(idx);
    });
  });

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () {
    render(current - 1);
  });
  lb.querySelector(".lb-next").addEventListener("click", function () {
    render(current + 1);
  });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") render(current - 1);
    else if (e.key === "ArrowRight") render(current + 1);
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