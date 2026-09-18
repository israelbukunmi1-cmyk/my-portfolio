(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile nav ---------- */

  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("open", !open);
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("open");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */

  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("ready", "in-view");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(function (el) {
      el.classList.add("ready");
      observer.observe(el);
    });
  }

  /* ---------- Scroll progress bar ---------- */

  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  var updateProgress = function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var y = window.scrollY;
    progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  /* ---------- Back to top ---------- */

  var toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  document.body.appendChild(toTop);

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  window.addEventListener(
    "scroll",
    function () {
      toTop.classList.toggle("is-visible", window.scrollY > 640);
    },
    { passive: true }
  );

  /* ---------- Nav scrolled state ---------- */

  var stickyHeader = document.querySelector(".sticky");
  if (stickyHeader) {
    var onNavScroll = function () {
      stickyHeader.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    onNavScroll();
    window.addEventListener("scroll", onNavScroll, { passive: true });
  }

  /* ---------- Hero title letter stagger ---------- */

  var heroTitle = document.querySelector(".hero-title");
  if (heroTitle && !reduceMotion && !("ontouchstart" in window)) {
    var titleText = heroTitle.textContent.trim();
    heroTitle.removeAttribute("data-hero");
    heroTitle.setAttribute("aria-label", titleText);
    heroTitle.innerHTML = titleText
      .split("")
      .map(function (ch, i) {
        var safe = ch.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return '<span class="c" style="--di:' + (120 + i * 45) + 'ms">' + (ch === " " ? "&nbsp;" : safe) + "</span>";
      })
      .join("");
  }

  /* ---------- Rotating hero role ---------- */

  var wordEl = document.querySelector("[data-words]");
  if (wordEl) {
    var words = (wordEl.getAttribute("data-words") || "")
      .split("|")
      .map(function (w) {
        return w.trim();
      })
      .filter(Boolean);
    var wordIndex = 0;

    if (words.length > 1) {
      window.setInterval(function () {
        wordEl.classList.add("is-fade");
        window.setTimeout(function () {
          wordIndex = (wordIndex + 1) % words.length;
          wordEl.textContent = words[wordIndex];
          wordEl.classList.remove("is-fade");
        }, 320);
      }, 2600);
    }
  }

  /* ---------- Scroll spy (homepage only) ---------- */

  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (spyLinks.length) {
    var spyIds = spyLinks.map(function (a) {
      return a.getAttribute("href").slice(1);
    });
    var spySections = spyIds
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    var setActiveLink = function () {
      var currentId = "";
      spySections.forEach(function (s) {
        var r = s.getBoundingClientRect();
        if (r.top <= 160 && r.bottom >= 160) {
          currentId = s.id;
        }
      });
      spyLinks.forEach(function (a) {
        var active = a.getAttribute("href") === "#" + currentId;
        a.classList.toggle("is-active", active);
        if (a.classList.contains("nav-cta")) a.classList.remove("is-active");
      });
    };

    setActiveLink();
    window.addEventListener("scroll", setActiveLink, { passive: true });
    window.addEventListener("resize", setActiveLink);
  }

  /* ---------- Pointer-only effects (tilt + magnetic) ---------- */

  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var desktopWide = window.matchMedia("(min-width: 768px)").matches;

  if (finePointer && desktopWide && !reduceMotion) {
    /* Custom cursor + ambient glow */
    var cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";
    var cursorRing = document.createElement("div");
    cursorRing.className = "cursor-ring";
    var cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    document.body.appendChild(cursorGlow);
    document.body.classList.add("cursor-on");

    var cx = 0,
      cy = 0,
      rx = 0,
      ry = 0,
      gx = 0,
      gy = 0;

    document.addEventListener(
      "mousemove",
      function (e) {
        cx = e.clientX;
        cy = e.clientY;
        cursorDot.style.transform = "translate(" + cx + "px, " + cy + "px) translate(-50%, -50%)";
      },
      { passive: true }
    );

    (function cursorLoop() {
      rx += (cx - rx) * 0.18;
      ry += (cy - ry) * 0.18;
      gx += (cx - gx) * 0.09;
      gy += (cy - gy) * 0.09;
      cursorRing.style.transform = "translate(" + rx + "px, " + ry + "px) translate(-50%, -50%)";
      cursorGlow.style.transform = "translate(" + gx + "px, " + gy + "px) translate(-50%, -50%)";
      requestAnimationFrame(cursorLoop);
    })();

    document.addEventListener("mouseover", function (e) {
      var target = e.target.closest("a, button, .video-tile, [data-magnetic], .to-top");
      cursorRing.classList.toggle("is-link", !!target);
    });

    document.addEventListener("mouseout", function (e) {
      if (!e.relatedTarget) cursorRing.classList.remove("is-link");
    });

    /* 3D card tilt */
    var tiltables = document.querySelectorAll(".card, .contact-card");
    tiltables.forEach(function (el) {
      var moving = false;

      el.addEventListener("mouseenter", function () {
        moving = true;
        el.style.transition = "transform 0.12s ease-out";
      });

      el.addEventListener("mousemove", function (e) {
        if (!moving) return;
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        var tx = "perspective(900px) rotateY(" + (px * 5).toFixed(2) + "deg) rotateX(" + (-py * 5).toFixed(2) + "deg) translateY(-0.25rem)";
        el.style.transform = tx;
      });

      el.addEventListener("mouseleave", function () {
        moving = false;
        el.style.transform = "";
        el.style.transition = "";
      });
    });

    /* Magnetic buttons */
    var magnetic = document.querySelectorAll(".btn, .nav-links a.nav-cta");
    magnetic.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.25;
        el.style.transform = "translate(" + x.toFixed(1) + "px, " + y.toFixed(1) + "px)";
      });

      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }
})();