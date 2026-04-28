/* =============================================
   Portfolio Script — Gurmeet Gupta
   ============================================= */

/* ---- CUSTOM CURSOR ---- */
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover state on interactive elements
document.querySelectorAll('a, button, .stack-cell, .proj-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
});

/* ---- NAV SCROLL ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- SCROLL REVEAL (Intersection Observer) ---- */
// Elements with .reveal-up that are NOT in the hero get their animation triggered on scroll
// Hero elements play immediately via CSS animation
const heroSection = document.querySelector('.hero');
const revealEls = document.querySelectorAll('.reveal-up');

// Mark hero children to skip IO (they animate on load)
revealEls.forEach(el => {
  if (heroSection.contains(el)) {
    // already animating via CSS; just make sure it's visible after delay
    return;
  }
  // Reset opacity so IO controls them
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.animation = 'none';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !heroSection.contains(entry.target)) {
      const delay = entry.target.style.animationDelay || '0s';
      entry.target.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}`;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  if (!heroSection.contains(el)) observer.observe(el);
});

/* ---- STACK GRID STAGGER on scroll ---- */
const stackCells = document.querySelectorAll('.stack-cell');
const stackObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      stackCells.forEach((cell, i) => {
        setTimeout(() => {
          cell.style.transition = `opacity 0.5s ease ${i * 40}ms, transform 0.5s ease ${i * 40}ms, background 0.2s`;
          cell.style.opacity = '1';
          cell.style.transform = 'translateY(0)';
        }, i * 40);
      });
      stackObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

// Initial state for stack cells
stackCells.forEach(cell => {
  cell.style.opacity = '0';
  cell.style.transform = 'translateY(20px)';
});
if (stackCells.length) stackObserver.observe(stackCells[0].closest('.stack-grid'));

/* ---- ACTIVE NAV LINK on scroll ---- */
const sections = document.querySelectorAll('section[id], .hero[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---- PROJ ITEM hover: underline title ---- */
// Handled entirely via CSS

/* ---- TICKER: pause on hover ---- */
const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
  tickerTrack.addEventListener('mouseenter', () => {
    tickerTrack.style.animationPlayState = 'paused';
  });
  tickerTrack.addEventListener('mouseleave', () => {
    tickerTrack.style.animationPlayState = 'running';
  });
}
