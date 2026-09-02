// Site-wide behaviour. Replaces the template's assets/js/main.js, which relied
// on libraries being present as globals from <script> tags.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import GLightbox from 'glightbox';

const select = <T extends Element = Element>(selector: string): T | null =>
  document.querySelector<T>(selector);

const selectAll = <T extends Element = Element>(selector: string): T[] =>
  Array.from(document.querySelectorAll<T>(selector));

/** Scrolls to an element, accounting for the fixed header's height. */
function scrollTo(el: Element): void {
  const header = select<HTMLElement>('#header');
  let offset = header?.offsetHeight ?? 0;
  if (!header?.classList.contains('header-scrolled')) {
    offset -= 20;
  }
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - offset,
    behavior: 'smooth',
  });
}

/** Highlights the nav link matching the section currently in view. */
function updateActiveNavLink(): void {
  const position = window.scrollY + 200;
  for (const link of selectAll<HTMLAnchorElement>('#navbar .scrollto')) {
    const hash = link.hash;
    if (!hash) continue;

    const section = document.querySelector<HTMLElement>(hash);
    if (!section) continue;

    const inView = position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight;
    link.classList.toggle('active', inView);
  }
}

/** Adds the compact-header class once the page is scrolled. */
function updateHeaderScrolled(): void {
  const header = select('#header');
  if (header) header.classList.toggle('header-scrolled', window.scrollY > 100);

  const backToTop = select('.back-to-top');
  if (backToTop) backToTop.classList.toggle('active', window.scrollY > 100);
}

function initNavigation(): void {
  // Smooth-scroll only when the target exists on this page; otherwise let the
  // browser follow the link to the homepage as normal.
  for (const link of selectAll<HTMLAnchorElement>('.scrollto')) {
    link.addEventListener('click', (event) => {
      if (!link.hash) return;
      const target = document.querySelector(link.hash);
      if (!target) return;

      event.preventDefault();

      const navbar = select('#navbar');
      if (navbar?.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        select('.mobile-nav-toggle')?.setAttribute('aria-expanded', 'false');
      }
      scrollTo(target);
    });
  }

  const toggle = select<HTMLButtonElement>('.mobile-nav-toggle');
  const navbar = select('#navbar');
  toggle?.addEventListener('click', () => {
    const open = navbar?.classList.toggle('navbar-mobile') ?? false;
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Mobile dropdowns expand on tap rather than hover.
  for (const item of selectAll('.navbar .dropdown > a')) {
    item.addEventListener('click', (event) => {
      if (!select('#navbar')?.classList.contains('navbar-mobile')) return;
      event.preventDefault();
      item.nextElementSibling?.classList.toggle('dropdown-active');
    });
  }
}

/** Animates the demographics progress bars when they scroll into view. */
function initSkillBars(): void {
  const skillsContent = select('.skills-content');
  if (!skillsContent) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      for (const bar of selectAll<HTMLElement>('.progress .progress-bar')) {
        bar.style.width = `${bar.getAttribute('aria-valuenow')}%`;
      }
      observer.disconnect();
    },
    { threshold: 0.2 }
  );
  observer.observe(skillsContent);
}

/** Year filter for the robot grid. */
function initRobotFilter(): void {
  const filters = selectAll<HTMLButtonElement>('#portfolio-filters button');
  const items = selectAll<HTMLElement>('.portfolio-item');
  if (filters.length === 0) return;

  for (const filter of filters) {
    filter.addEventListener('click', () => {
      for (const other of filters) {
        other.classList.remove('filter-active');
        other.setAttribute('aria-pressed', 'false');
      }
      filter.classList.add('filter-active');
      filter.setAttribute('aria-pressed', 'true');

      const wanted = filter.dataset.filter;
      for (const item of items) {
        const show = wanted === '*' || item.dataset.filter === wanted;
        item.hidden = !show;
      }
      AOS.refresh();
    });
  }
}

function init(): void {
  updateHeaderScrolled();
  updateActiveNavLink();
  initNavigation();
  initSkillBars();
  initRobotFilter();

  window.addEventListener('scroll', () => {
    updateHeaderScrolled();
    updateActiveNavLink();
  });

  GLightbox({ selector: '.glightbox' });
  GLightbox({ selector: '.portfolio-lightbox' });

  AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
