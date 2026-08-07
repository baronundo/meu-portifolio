/* ==========================================================================
   PARTICLES.JS
   Sistema leve de partículas em Canvas puro para o background do Hero.
   Sem dependências externas.
   ========================================================================== */

(() => {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let particles = [];
  let width = 0;
  let height = 0;
  let animationId = null;

  const PARTICLE_COLOR = 'rgba(59, 130, 246, 0.5)';
  const LINE_COLOR = 'rgba(139, 92, 246, 0.12)';
  const MAX_DISTANCE = 130;
  const PARTICLE_COUNT_DIVISOR = 12000; // menor = mais partículas

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.8 + 0.6;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR;
      ctx.fill();
    }
  }

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;

    const count = Math.min(90, Math.floor((width * height) / PARTICLE_COUNT_DIVISOR));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_DISTANCE) {
          ctx.beginPath();
          ctx.strokeStyle = LINE_COLOR;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  function init() {
    resize();

    if (prefersReducedMotion) {
      // Desenha um único frame estático e não anima, respeitando a preferência do usuário.
      particles.forEach((p) => p.draw());
      return;
    }

    if (animationId) cancelAnimationFrame(animationId);
    animate();
  }

  window.addEventListener('resize', () => {
    resize();
  });

  init();
})();
