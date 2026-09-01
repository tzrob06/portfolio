// ─── DEFAULT PORTFOLIO DATA (DARK GREEN THEME) ───────────────────────────────
const DEFAULTS = {
  profile: {
    name: "Your Name",
    monogram: "YN",
    tagline: "Student & Creative Thinker",
    bio: "I'm a student passionate about design, problem-solving, and building things that matter. Currently exploring opportunities to apply my skills in the real world through internships and collaborative projects.",
    photo: "",
    location: "Your City",
    email: "you@email.com",
    school: "Your University",
    program: "Your Field of Study",
    availability: "Open to internships & collaborations"
  },
  projects: [
    { id: 1, title: "Research & Analysis Initiative", year: "2024", description: "A comprehensive project exploring emerging trends in sustainability and human-centered design. Synthesized findings into an actionable report and presentation.", category: "Research", link: "#", image: "" },
    { id: 2, title: "Collaborative Design Sprint", year: "2024", description: "Worked in a cross-functional student team to design, test, and prototype a user-centric solution for a real-world brief within 72 hours.", category: "Teamwork", link: "#", image: "" },
    { id: 3, title: "Independent Study Project", year: "2023", description: "Self-directed capstone project exploring visual communication and digital storytelling. Showcased at the university department exhibition.", category: "Creative", link: "#", image: "" },
    { id: 4, title: "Community Volunteer Work", year: "2023", description: "Coordinated outreach and logistics for a community initiative, managing peers and delivering on-the-ground support.", category: "Leadership", link: "#", image: "" }
  ],
  skills: [
    { id: 1, title: "Research & Synthesis", description: "Comfortable distilling complex datasets and literature into clear, actionable takeaways." },
    { id: 2, title: "Communication", description: "Strong written and presentation skills across academic, professional, and creative formats." },
    { id: 3, title: "Project Coordination", description: "Experienced in managing milestones, task allocation, and team deadlines smoothly." },
    { id: 4, title: "Creative Problem-Solving", description: "Approaching challenges with curiosity, iterative testing, and multidisciplinary ideas." },
    { id: 5, title: "Collaboration & Teamwork", description: "Thrive in diverse group settings and enjoy bringing out the best in team members." },
    { id: 6, title: "Adaptability & Growth", description: "Quick to learn new tools, technologies, and methodologies with high enthusiasm." }
  ],
  social: { linkedin: "#", github: "#", twitter: "", instagram: "" },
  contact: { email: "you@email.com", location: "Your City", message: "Have a project in mind, an internship opportunity, or just want to say hi? My inbox is always open." }
};

// ─── LOAD DATA FROM LOCALSTORAGE ─────────────────────────────────────────────
function getData() {
  try {
    const stored = localStorage.getItem('portfolio_data');
    if (stored) return JSON.parse(stored);
  } catch(e) {}
  return DEFAULTS;
}

// ─── RENDER PORTFOLIO ─────────────────────────────────────────────────────────
function render() {
  const d = getData();
  const p = d.profile || DEFAULTS.profile;

  // Navbar monogram
  const monogram = document.getElementById('monogram');
  if (monogram) monogram.textContent = p.monogram || initials(p.name);

  // Hero
  setText('hero-name', p.name);
  setText('hero-tagline', p.tagline);
  setText('hero-school', p.school ? p.school + (p.program ? ' · ' + p.program : '') : '');
  setText('hero-availability-text', p.availability || 'Open to internships & collaborations');
  setPhoto('hero-photo', p.photo);

  // About
  setText('about-name', p.name);
  setText('about-bio', p.bio);
  setText('about-location', p.location);
  setText('about-email', p.email);
  setText('about-school', p.school);
  setText('about-program', p.program);
  setAttr('about-email-link', 'href', 'mailto:' + p.email);
  setPhoto('about-photo', p.photo);

  // Projects
  renderProjects(d.projects || DEFAULTS.projects);

  // Skills
  renderSkills(d.skills || DEFAULTS.skills);

  // Contact
  const contact = d.contact || DEFAULTS.contact;
  setText('contact-message', contact.message);
  setText('contact-email-val', contact.email || p.email);
  setAttr('contact-email-val', 'href', 'mailto:' + (contact.email || p.email));
  setText('contact-location-val', contact.location || p.location);

  // Social links
  const s = d.social || DEFAULTS.social;
  toggleLink('social-linkedin', s.linkedin);
  toggleLink('social-github', s.github);
  toggleLink('social-twitter', s.twitter);
  toggleLink('social-instagram', s.instagram);

  // Footer
  setText('footer-name', `${p.name} · Student Portfolio`);
  setText('footer-monogram', p.monogram || initials(p.name));
}

function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';
  projects.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-card';
    const imgHtml = proj.image
      ? `<div class="project-img" style="background-image:url('${proj.image}')"></div>`
      : `<div class="project-img project-img-placeholder"><span>${proj.category || 'Project'}</span></div>`;
    card.innerHTML = `
      ${imgHtml}
      <div class="project-body">
        <div class="project-meta">
          <span class="project-category">${proj.category || 'General'}</span>
          <span class="project-year">${proj.year || ''}</span>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        ${proj.link && proj.link !== '#' ? `<a href="${proj.link}" class="project-link" target="_blank" rel="noopener">View Project &rarr;</a>` : ''}
      </div>`;
    grid.appendChild(card);
  });
}

function renderSkills(skills) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = '';
  skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML = `<h3 class="skill-title">${skill.title}</h3><p class="skill-desc">${skill.description}</p>`;
    grid.appendChild(card);
  });
}

// ─── CONTACT FORM HANDLER ─────────────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origHtml = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = origHtml;
      if (success) {
        success.classList.add('visible');
        form.reset();
        setTimeout(() => success.classList.remove('visible'), 5000);
      }
    }, 1000);
  });
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val || ''; }
function setAttr(id, attr, val) { const el = document.getElementById(id); if (el && val) el.setAttribute(attr, val); }
function setPhoto(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  if (url) { el.style.backgroundImage = `url('${url}')`; el.classList.add('has-photo'); }
  else { el.style.backgroundImage = ''; el.classList.remove('has-photo'); }
}
function toggleLink(id, href) {
  const el = document.getElementById(id);
  if (!el) return;
  if (href && href !== '#' && href !== '') { el.href = href; el.style.display = 'flex'; }
  else { el.style.display = 'none'; }
}
function initials(name) {
  if (!name) return 'YN';
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function initScrollReveal() {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));
  }
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  render();
  initNavbar();
  initScrollReveal();
  initContactForm();
});