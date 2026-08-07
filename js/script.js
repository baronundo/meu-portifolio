/* ==========================================================================
   SCRIPT.JS
   Lógica geral do site: navbar, menu mobile, scroll reveal, typing effect,
   cursor personalizado, contadores, filtro de projetos, formulário e
   botão voltar ao topo.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  hidePreloader();
  initNavbar();
  initMobileMenu();
  initActiveSectionIndicator();
  initScrollReveal();
  initTypingEffect();
  initCustomCursor();
  initCounters();
  initProjectFilter();
  initContactForm();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   PRELOADER
   -------------------------------------------------------------------------- */
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    preloader.classList.add('is-hidden');
  });
}

/* --------------------------------------------------------------------------
   NAVBAR (fundo ao rolar)
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   MENU MOBILE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   INDICADOR DE SEÇÃO ATIVA NA NAVBAR
   -------------------------------------------------------------------------- */
function initActiveSectionIndicator() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const isMatch = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', isMatch);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
   SCROLL REVEAL (fade/slide via data-reveal)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

/* --------------------------------------------------------------------------
   TYPING EFFECT (cargo no Hero)
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const roles = [
    'Desenvolvedor Full Stack',
    'Front-End Developer',
    'Back-End Developer',
    'Entusiasta de UX/UI'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    el.textContent = currentRole.substring(0, charIndex);

    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  };

  type();
}

/* --------------------------------------------------------------------------
   CURSOR PERSONALIZADO
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  if (!cursor || !follower) return;

  // Desativa em dispositivos touch
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let followerX = 0;
  let followerY = 0;

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    followerX = e.clientX;
    followerY = e.clientY;
  });

  const animateFollower = () => {
    const currentLeft = parseFloat(follower.style.left) || followerX;
    const currentTop = parseFloat(follower.style.top) || followerY;

    const nextLeft = currentLeft + (followerX - currentLeft) * 0.15;
    const nextTop = currentTop + (followerY - currentTop) * 0.15;

    follower.style.left = `${nextLeft}px`;
    follower.style.top = `${nextTop}px`;

    requestAnimationFrame(animateFollower);
  };
  animateFollower();

  document.querySelectorAll('a, button, .skill-card, .project-card').forEach((el) => {
    el.addEventListener('mouseenter', () => follower.classList.add('is-active'));
    el.addEventListener('mouseleave', () => follower.classList.remove('is-active'));
  });
}

/* --------------------------------------------------------------------------
   CONTADORES ANIMADOS (Estatísticas)
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1500;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* --------------------------------------------------------------------------
   FILTRO DE PROJETOS
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const tech = card.getAttribute('data-tech') || '';
        const matches = filter === 'all' || tech.split(' ').includes(filter);
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   FORMULÁRIO DE CONTATO
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      showFeedback(feedback, 'Preencha todos os campos antes de enviar.', false);
      return;
    }

    if (!emailPattern.test(email)) {
      showFeedback(feedback, 'Informe um email válido.', false);
      return;
    }

    // Aqui entraria a integração real (EmailJS, Formspree, API própria etc.)
    showFeedback(feedback, 'Mensagem enviada com sucesso! Retorno em breve.', true);
    form.reset();
  });
}

function showFeedback(el, message, success) {
  el.textContent = message;
  el.classList.toggle('is-success', success);
  el.classList.toggle('is-error', !success);
}

/* --------------------------------------------------------------------------
   BOTÃO VOLTAR AO TOPO
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
