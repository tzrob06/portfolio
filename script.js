// ─── DEFAULT PORTFOLIO DATA ───────────────────────────────────────────────────
// This is the fallback content. Edit via /admin.html or change defaults here.
const DEFAULTS = {
  profile: {
    name: "Your Name",
    monogram: "YN",
    tagline: "Student & Creative Thinker",
    bio: "I'm a student passionate about design, problem-solving, and building things that matter. Currently exploring opportunities to apply my skills in the real world.",
    photo: "",
    location: "Your City",
    email: "you@email.com",
    school: "Your University",
    program: "Your Field of Study",
    availability: "Open to internships & collaborations"
  },
  projects: [
    { id: 1, title: "Research Initiative", year: "2024", description: "A semester-long research project exploring emerging trends in my field. Developed a comprehensive report and presented findings to faculty.", category: "Research", link: "#", image: "" },
    { id: 2, title: "Collaborative Design Sprint", year: "2024", description: "Worked in a cross-functional team to design and prototype a solution for a real-world brief within 72 hours.", category: "Teamwork", link: "#", image: "" },
    { id: 3, title: "Independent Study Project", year: "2023", description: "Self-directed project combining my interests in visual communication and data. Presented at the end-of-year showcase.", category: "Creative", link: "#", image: "" },
    { id: 4, title: "Community Volunteer Work", year: "2023", description: "Led a team of peers to organize a community event, managing logistics, outreach, and on-the-day coordination.", category: "Leadership", link: "#", image: "" }
  ],
  skills: [
    { id: 1, title: "Research & Analysis", description: "Comfortable synthesizing information from diverse sources into clear, actionable insights." },
    { id: 2, title: "Communication", description: "Strong written and verbal skills — from academic papers to presentations and pitches." },
    { id: 3, title: "Project Management", description: "Experienced coordinating tasks, timelines, and people to deliver work on schedule." },
    { id: 4, title: "Creative Problem-Solving", description: "I approach challenges from multiple angles to find solutions that are both practical and imaginative." },
    { id: 5, title: "Collaboration", description: "Thrive in team environments and enjoy bringing out the best in the people I work with." },
    { id: 6, title: "Adaptability", description: "Quick to pick up new tools, contexts, and skills — I see every new challenge as a learning opportunity." }
  ],
  testimonials: [
    { id: 1, quote: "One of the most thoughtful and diligent students I have had the pleasure of teaching. Their work consistently goes above and beyond.", author: "Dr. A. Smith", role: "Professor, Your University" }
  ],
  social: { linkedin: "#", twitter: "", instagram: "", github: "#", custom: "" },
  contact: { email: "you@email.com", message: "Always open to interesting conversations, internship opportunities, or just a friendly hello." }
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

  // Navbar monogram + links
  const monogram = document.getElementById('monogram');
  if (monogram) monogram.textContent = p.monogram || initials(p.name);

  // Hero
  setText('hero-name', p.name);
  setText('hero-tagline', p.tagline);
  setText('hero-school', p.school ? p.school + ' · ' + p.program : '');
  setText('hero-availability', p.availability);
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

  // Testimonial
  const t = (d.testimonials || DEFAULTS.testimonials)[0];
  if (t) {
    setText('testimonial-quote', '"' + t.quote + '"');
    setText('testimonial-author', t.author);
    setText('testimonial-role', t.role);
  }

  // Contact
  const contact = d.contact || DEFAULTS.contact;
  setText('contact-email-display', contact.email);
  setAttr('contact-email-link', 'href', 'mailto:' + contact.email);
  setText('contact-message', contact.message);

  // Social links
  const s = d.social || DEFAULTS.social;
  toggleLink('social-linkedin', s.linkedin);
  toggleLink('social-twitter', s.twitter);
  toggleLink('social-instagram', s.instagram);
  toggleLink('social-github', s.github);

  // Footer
  setText('footer-name', p.name);
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
          <span class="project-category">${proj.category || ''}</span>
          <span class="project-year">${proj.year || ''}</span>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        ${proj.link && proj.link !== '#' ? `<a href="${proj.link}" class="project-link" target="_blank" rel="noopener">View Project →</a>` : ''}
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
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  render();
  initNavbar();
  initScrollReveal();
});