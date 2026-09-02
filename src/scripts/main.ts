import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import GLightbox from 'glightbox';

const select = <T extends Element = Element>(selector: string): T | null => document.querySelector<T>(selector);
const selectAll = <T extends Element = Element>(selector: string): T[] => Array.from(document.querySelectorAll<T>(selector));
const stillness = matchMedia('(prefers-reduced-motion: reduce)');

function scrollTo(el: Element): void {
  const offset = select<HTMLElement>('#header')?.offsetHeight ?? 0;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}

function updateActiveNavLink(): void {
  const position = window.scrollY + 200;
  for (const link of selectAll<HTMLAnchorElement>('#navbar .scrollto')) {
    if (!link.hash) continue;
    const section = document.querySelector<HTMLElement>(link.hash);
    if (!section) continue;
    const inView = position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight;
    link.classList.toggle('active', inView);
  }
}

function updateHeaderScrolled(): void {
  const scrolled = window.scrollY > 100;
  select('#header')?.classList.toggle('header-scrolled', scrolled);
  select('.back-to-top')?.classList.toggle('active', scrolled);
}

function initNavigation(): void {
  const navbar = select('#navbar');
  const toggle = select<HTMLButtonElement>('.mobile-nav-toggle');
  const closeMenu = (): void => {
    navbar?.classList.remove('navbar-mobile');
    toggle?.setAttribute('aria-expanded', 'false');
  };
  // smooth-scroll only for targets on this page; other links navigate normally
  for (const link of selectAll<HTMLAnchorElement>('.scrollto')) {
    link.addEventListener('click', (event) => {
      const target = link.hash && document.querySelector(link.hash);
      if (!target) return;
      event.preventDefault();
      closeMenu();
      scrollTo(target);
    });
  }
  toggle?.addEventListener('click', () => {
    const open = navbar?.classList.toggle('navbar-mobile') ?? false;
    toggle.setAttribute('aria-expanded', String(open));
  });
  for (const item of selectAll('.navbar .dropdown > a')) {
    item.addEventListener('click', (event) => {
      if (!navbar?.classList.contains('navbar-mobile')) return;
      event.preventDefault();
      item.nextElementSibling?.classList.toggle('dropdown-active');
    });
  }
}

function initRobotFilter(): void {
  const filters = selectAll<HTMLButtonElement>('#portfolio-filters button');
  const items = selectAll<HTMLElement>('.portfolio-item');
  for (const filter of filters) {
    filter.addEventListener('click', () => {
      for (const other of filters) {
        other.classList.toggle('active', other === filter);
        other.setAttribute('aria-pressed', String(other === filter));
      }
      for (const item of items) item.hidden = filter.dataset.filter !== '*' && item.dataset.filter !== filter.dataset.filter;
      AOS.refresh();
    });
  }
}

// [data-parallax="speed"] shifts with scroll relative to the viewport centre;
// data-parallax-min gates it to viewports at least that wide.
function initParallax(): void {
  const layers = selectAll<HTMLElement>('[data-parallax]');
  if (layers.length === 0 || stillness.matches) return;
  let ticking = false;
  const update = (): void => {
    ticking = false;
    const mid = innerHeight / 2;
    for (const layer of layers) {
      if (innerWidth < Number(layer.dataset.parallaxMin ?? 0)) {
        layer.style.transform = '';
        continue;
      }
      const parent = layer.offsetParent as HTMLElement;
      const top = parent.getBoundingClientRect().top + layer.offsetTop;
      let shift = (top + layer.offsetHeight / 2 - mid) * Number(layer.dataset.parallax);
      // cover layers may never expose their parent's edges
      if ('parallaxCover' in layer.dataset)
        shift = Math.min(Math.max(shift, parent.offsetHeight - layer.offsetTop - layer.offsetHeight), -layer.offsetTop);
      layer.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    }
  };
  const schedule = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
}

function init(): void {
  updateHeaderScrolled();
  updateActiveNavLink();
  initNavigation();
  initRobotFilter();
  initParallax();
  addEventListener('scroll', () => {
    updateHeaderScrolled();
    updateActiveNavLink();
  }, { passive: true });
  GLightbox({ selector: '.glightbox' });
  GLightbox({ selector: '.portfolio-lightbox' });
  AOS.init({ duration: 600, easing: 'ease-out-cubic', once: true, offset: 60, disable: stillness.matches });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
