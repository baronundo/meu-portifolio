/* ==========================================================================
   SCRIPT.JS
   Lógica geral do site: navbar, menu mobile, scroll reveal, typing effect,
   cursor personalizado, contadores, filtro de projetos, formulário e
   botão voltar ao topo.
   ========================================================================== */

/* ==========================================================================
   DADOS EDITÁVEIS
   Para adicionar/remover uma competência ou um item de formação, mexa
   SOMENTE nestes dois arrays. O card/timeline é montado automaticamente
   pelo JS (renderSkills / renderEducation), então o layout nunca sai do
   enquadramento — não é preciso copiar/colar ou fechar tags HTML na mão.
   ========================================================================== */

const skillsData = [
  { name: 'HTML', level: 90, desc: 'Estruturação semântica e acessível de páginas web.' },
  { name: 'CSS', level: 88, desc: 'Layouts responsivos, animações e design systems.' },
  { name: 'JavaScript', level: 85, desc: 'Lógica de front-end, DOM e integrações com APIs.' },
  { name: 'Node.js', level: 75, desc: 'APIs REST e serviços back-end em JavaScript.' },
  { name: 'React', level: 80, desc: 'Interfaces reativas e componentizadas.' },
  { name: 'PHP', level: 65, desc: 'Desenvolvimento back-end e sistemas web.' },
  { name: 'Java', level: 70, desc: 'Programação orientada a objetos e sistemas robustos.' },
  { name: 'Python', level: 78, desc: 'Automação, scripts e análise de dados.' },
  { name: 'SQL', level: 82, desc: 'Consultas, modelagem e otimização de dados.' },
  { name: 'Git', level: 88, desc: 'Controle de versão e fluxo colaborativo.' },
  { name: 'GitHub', level: 88, desc: 'Colaboração, CI/CD e versionamento de projetos.' },
  { name: 'APIs REST', level: 80, desc: 'Design e consumo de APIs RESTful.' },
  { name: 'AWS', level: 60, desc: 'Serviços de nuvem para deploy e infraestrutura.' },
  { name: 'MySQL', level: 78, desc: 'Bancos de dados relacionais e performance de queries.' },
  { name: 'Banco de Dados', level: 75, desc: 'Modelagem relacional e não relacional.' },
  { name: 'Redes', level: 65, desc: 'Fundamentos de redes e infraestrutura.' },
  { name: 'Segurança da Informação', level: 68, desc: 'Boas práticas de segurança em aplicações web.' }
  // Para adicionar uma nova competência, copie a linha acima e ajuste:
  // { name: 'Nome da tecnologia', level: 0-100, desc: 'Descrição curta.' },
];

const educationData = [
  {
    date: '2022 — Presente',
    title: 'Nome da Faculdade',
    subtitle: 'Curso — Análise e Desenvolvimento de Sistemas',
    desc: 'Descrição breve do curso e principais aprendizados.'
  },
  {
    date: '2023',
    title: 'Nome do Curso',
    subtitle: 'Plataforma / Instituição',
    desc: 'Descrição breve do curso.'
  },
  {
    date: '2024',
    title: 'Nome da Certificação',
    subtitle: 'Instituição certificadora',
    desc: 'Descrição breve da certificação.'
  }
  // Para adicionar uma formação/curso/certificação, copie o bloco acima e ajuste:
  // { date: 'Ano', title: 'Nome', subtitle: 'Instituição', desc: 'Descrição breve.' },
];

/* --------------------------------------------------------------------------
   RENDERIZAÇÃO DINÂMICA DE COMPETÊNCIAS
   -------------------------------------------------------------------------- */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  grid.innerHTML = skillsData
    .map(
      (skill) => `
        <article class="skill-card" data-reveal data-level="${skill.level}">
          <div class="skill-card__icon">${skill.name.slice(0, 2).toUpperCase()}</div>
          <h3 class="skill-card__name">${skill.name}</h3>
          <div class="skill-card__bar"><div class="skill-card__bar-fill"></div></div>
          <p class="skill-card__desc">${skill.desc}</p>
        </article>`
    )
    .join('');
}

/* --------------------------------------------------------------------------
   RENDERIZAÇÃO DINÂMICA DE FORMAÇÃO (TIMELINE)
   -------------------------------------------------------------------------- */
function renderEducation() {
  const timeline = document.getElementById('educationTimeline');
  if (!timeline) return;

  timeline.innerHTML = educationData
    .map(
      (item) => `
        <div class="timeline__item" data-reveal>
          <div class="timeline__dot"></div>
          <div class="timeline__content">
            <span class="timeline__date">${item.date}</span>
            <h3 class="timeline__title">${item.title}</h3>
            <p class="timeline__subtitle">${item.subtitle}</p>
            <p class="timeline__desc">${item.desc}</p>
          </div>
        </div>`
    )
    .join('');
}

/* --------------------------------------------------------------------------
   BARRAS DE PROGRESSO DAS COMPETÊNCIAS
   -------------------------------------------------------------------------- */
function initSkillBars() {
  const cards = document.querySelectorAll('.skill-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const card = entry.target;
        const fill = card.querySelector('.skill-card__bar-fill');
        const level = card.getAttribute('data-level') || 0;

        if (fill) fill.style.width = `${level}%`;
        observer.unobserve(card);
      });
    },
    { threshold: 0.4 }
  );

  cards.forEach((card) => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', () => {
  hidePreloader();
  initNavbar();
  initMobileMenu();
  initActiveSectionIndicator();
  renderSkills();
  renderEducation();
  initScrollReveal();
  initSkillBars();
  initTypingEffect();
  initCustomCursor();
  initCounters();
  initProjectFilter();
  initContactForm();
  initBackToTop();
  initMap();
  initAuth();
  initChat();
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
