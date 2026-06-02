'use strict';

// Preloader functionality
window.addEventListener('load', function () {
  const preloader = document.querySelector('[data-preloader]');
  if (preloader) {
    preloader.classList.add('loaded');
    // Remove preloader from DOM after animation completes
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }
});


setTimeout(() => {
  const preloader = document.querySelector('[data-preloader]');
  if (preloader && !preloader.classList.contains('loaded')) {
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  }
}, 2500);


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
(function() {
  const canvas = document.getElementById('cursor-bg');
  const ctx = canvas.getContext('2d');
  let W, H, mx = 0, my = 0, tx = 0, ty = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    tx = mx = W / 2; ty = my = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  function draw() {
    mx += (tx - mx) * 0.06;
    my += (ty - my) * 0.06;
    ctx.clearRect(0, 0, W, H);

    // Base gradient
    const bg = ctx.createRadialGradient(W*.3, H*.25, 0, W*.3, H*.25, Math.max(W,H)*.9);
    bg.addColorStop(0, '#0b1a2e');
    bg.addColorStop(0.5, '#060e18');
    bg.addColorStop(1, '#020810');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Static blue pools
    const r1 = ctx.createRadialGradient(W*.1, H*.1, 0, W*.1, H*.1, W*.5);
    r1.addColorStop(0, 'rgba(30,111,202,0.18)'); r1.addColorStop(1, 'transparent');
    ctx.fillStyle = r1; ctx.fillRect(0, 0, W, H);

    const r2 = ctx.createRadialGradient(W*.85, H*.75, 0, W*.85, H*.75, W*.45);
    r2.addColorStop(0, 'rgba(16,60,130,0.15)'); r2.addColorStop(1, 'transparent');
    ctx.fillStyle = r2; ctx.fillRect(0, 0, W, H);

    // Cursor glow
    const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
    glow.addColorStop(0, 'rgba(45,140,240,0.14)');
    glow.addColorStop(0.5, 'rgba(30,111,202,0.06)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(draw);
  }
  draw();
})();
(function () {
  const canvas = document.getElementById('preloader-glow');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, mx, my, tx, ty, running = true;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    mx = tx = W / 2;
    my = ty = H / 2;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  function draw() {
    if (!running) return;
    mx += (tx - mx) * 0.06;
    my += (ty - my) * 0.06;
    ctx.clearRect(0, 0, W, H);

    const r1 = ctx.createRadialGradient(W * 0.2, H * 0.3, 0, W * 0.2, H * 0.3, W * 0.6);
    r1.addColorStop(0, 'rgba(30,111,202,0.18)');
    r1.addColorStop(1, 'transparent');
    ctx.fillStyle = r1;
    ctx.fillRect(0, 0, W, H);

    const r2 = ctx.createRadialGradient(W * 0.8, H * 0.7, 0, W * 0.8, H * 0.7, W * 0.5);
    r2.addColorStop(0, 'rgba(16,60,130,0.15)');
    r2.addColorStop(1, 'transparent');
    ctx.fillStyle = r2;
    ctx.fillRect(0, 0, W, H);

    const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
    glow.addColorStop(0, 'rgba(45,140,240,0.15)');
    glow.addColorStop(0.5, 'rgba(30,111,202,0.07)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(draw);
  }
  draw();

  // stop the loop once preloader hides
  document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('[data-preloader]');
    if (preloader) {
      const observer = new MutationObserver(() => {
        if (preloader.classList.contains('loaded')) {
          running = false;
        }
      });
      observer.observe(preloader, { attributes: true });
    }
  });
})();
(function () {
  function applyCardGlow(selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  }

applyCardGlow(
  '.service-item, .content-card, .project-item > a, .blog-post-item > a, .sidebar, .sidebar-cta, .timeline-item, .skills-item, .testimonials-modal'
);
})();