(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-collapsible");
  if (!toggle || !menu) return;

  function setExpanded(value) {
    toggle.setAttribute("aria-expanded", value ? "true" : "false");
  }

  function isVisible() {
    return toggle.offsetParent !== null;
  }

  toggle.addEventListener("click", function () {
    setExpanded(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Stäng menyn när en länk väljs (relevant för ankarlänkar på samma sida)
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setExpanded(false);
  });

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true" &&
      isVisible()
    ) {
      setExpanded(false);
      toggle.focus();
    }
  });
})();
