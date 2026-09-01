const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 20); });

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => { navLinks.classList.toggle('open'); });
document.querySelectorAll('.nav-links a').forEach(link => { link.addEventListener('click', () => navLinks.classList.remove('open')); });

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.about-grid, .project-card, .skill-category, .contact-grid').forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });

document.querySelectorAll('.project-card').forEach((card, i) => { card.style.transitionDelay = `${i * 0.1}s`; });
document.querySelectorAll('.skill-category').forEach((cat, i) => { cat.style.transitionDelay = `${i * 0.1}s`; });

const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true; btn.textContent = 'Sending...';
  setTimeout(() => {
    btn.disabled = false; btn.textContent = 'Send Message';
    success.classList.add('visible');
    form.reset();
    setTimeout(() => success.classList.remove('visible'), 5000);
  }, 1200);
});

const greeting = document.querySelector('.hero-greeting');
if (greeting) {
  const text = greeting.textContent;
  greeting.textContent = '';
  greeting.style.borderRight = '2px solid var(--accent)';
  greeting.style.paddingRight = '4px';
  let i = 0;
  const type = () => {
    if (i < text.length) { greeting.textContent += text[i++]; setTimeout(type, 60); }
    else { setTimeout(() => { greeting.style.borderRight = 'none'; }, 800); }
  };
  setTimeout(type, 500);
}