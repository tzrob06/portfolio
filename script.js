// ─── THEME PRESETS ────────────────────────────────────────────────────────────
const THEME_PRESETS = {
  forest: {
    name: "Forest Obsidian",
    font: "'Inter', sans-serif",
    radius: "12px",
    colors: {
      bg: "#0b120e",
      bgSubtle: "#111c16",
      bgCard: "#16251e",
      bgCardAlt: "#1c2f26",
      border: "#263d31",
      borderFocus: "#4ade80",
      text: "#ecf4ee",
      textMid: "#a3c2b0",
      textMuted: "#708e7d",
      accent: "#52b788",
      accentBright: "#4ade80",
      accentDark: "#2d6a4f",
      accentGlow: "rgba(82, 183, 136, 0.18)",
      accentBadge: "rgba(82, 183, 136, 0.15)"
    }
  },
  charcoal: {
    name: "Midnight Charcoal",
    font: "'Inter', sans-serif",
    radius: "10px",
    colors: {
      bg: "#0d1117",
      bgSubtle: "#161b22",
      bgCard: "#21262d",
      bgCardAlt: "#282e36",
      border: "#30363d",
      borderFocus: "#38bdf8",
      text: "#f0f6fc",
      textMid: "#c9d1d9",
      textMuted: "#8b949e",
      accent: "#38bdf8",
      accentBright: "#7dd3fc",
      accentDark: "#0369a1",
      accentGlow: "rgba(56, 189, 248, 0.2)",
      accentBadge: "rgba(56, 189, 248, 0.15)"
    }
  },
  sageLight: {
    name: "Sage & Linen (Light)",
    font: "'Inter', sans-serif",
    radius: "12px",
    colors: {
      bg: "#f6f8f5",
      bgSubtle: "#edf1eb",
      bgCard: "#ffffff",
      bgCardAlt: "#e2e8e0",
      border: "#d0dbcd",
      borderFocus: "#386641",
      text: "#1a241b",
      textMid: "#405443",
      textMuted: "#718573",
      accent: "#386641",
      accentBright: "#2d5234",
      accentDark: "#1e3723",
      accentGlow: "rgba(56, 102, 65, 0.15)",
      accentBadge: "rgba(56, 102, 65, 0.12)"
    }
  },
  indigo: {
    name: "Deep Cosmos",
    font: "'Inter', sans-serif",
    radius: "14px",
    colors: {
      bg: "#0a0c14",
      bgSubtle: "#101422",
      bgCard: "#171c30",
      bgCardAlt: "#1f2640",
      border: "#283254",
      borderFocus: "#818cf8",
      text: "#f1f5f9",
      textMid: "#cbd5e1",
      textMuted: "#64748b",
      accent: "#818cf8",
      accentBright: "#a5b4fc",
      accentDark: "#4338ca",
      accentGlow: "rgba(129, 140, 248, 0.2)",
      accentBadge: "rgba(129, 140, 248, 0.15)"
    }
  },
  amber: {
    name: "Warm Espresso",
    font: "'Inter', sans-serif",
    radius: "10px",
    colors: {
      bg: "#120e0b",
      bgSubtle: "#1c1612",
      bgCard: "#271f1a",
      bgCardAlt: "#342a23",
      border: "#3d3027",
      borderFocus: "#f59e0b",
      text: "#faf5ef",
      textMid: "#d8c7b8",
      textMuted: "#8e7d70",
      accent: "#f59e0b",
      accentBright: "#fbbf24",
      accentDark: "#b45309",
      accentGlow: "rgba(245, 158, 11, 0.2)",
      accentBadge: "rgba(245, 158, 11, 0.15)"
    }
  }
};

// ─── DEFAULT PORTFOLIO DATA ───────────────────────────────────────────────────
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
  headings: {
    siteTitle: "Portfolio",
    navAbout: "About",
    navExperience: "Experience",
    navProjects: "Projects",
    navSkills: "Skills",
    navContact: "Contact",
    heroBtnProjects: "View My Work",
    heroBtnContact: "Get In Touch",
    aboutEyebrow: "About",
    aboutPrefix: "Hello, I'm",
    aboutBtn: "Let's Connect",
    experienceEyebrow: "Experience",
    experienceTitlePrefix: "Work &",
    experienceTitleAccent: "Experience",
    projectsEyebrow: "Projects",
    projectsTitlePrefix: "Selected",
    projectsTitleAccent: "Projects",
    skillsEyebrow: "Capabilities",
    skillsTitlePrefix: "Skills &",
    skillsTitleAccent: "Strengths",
    contactEyebrow: "Contact",
    contactTitlePrefix: "Get In",
    contactTitleAccent: "Touch",
    contactBtn: "Send Message"
  },
  theme: {
    preset: "forest",
    font: "'Inter', sans-serif",
    radius: "12px",
    colors: THEME_PRESETS.forest.colors
  },
  experience: [
    {
      id: 1,
      role: "Student Research Assistant",
      company: "University Innovation Lab",
      location: "On-Campus",
      startDate: "Sep 2023",
      endDate: "Present",
      description: "Assisting faculty with data collection, user testing, and synthesizing research insights into presentations."
    },
    {
      id: 2,
      role: "Design & Content Intern",
      company: "Creative Studio",
      location: "Remote",
      startDate: "Jun 2023",
      endDate: "Aug 2023",
      description: "Collaborated with the creative team on digital assets, brand guidelines, and presentation collateral for client briefs."
    }
  ],
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
  contact: {
    email: "you@email.com",
    location: "Your City",
    message: "Have a project in mind, an internship opportunity, or just want to say hi? My inbox is always open.",
    formspreeUrl: "",
    web3formsKey: ""
  },
  inbox: []
};

// ─── APPLY THEME VARIABLES ────────────────────────────────────────────────────
function applyTheme(themeConfig) {
  const root = document.documentElement;
  const theme = themeConfig || DEFAULTS.theme;
  const c = theme.colors || (THEME_PRESETS[theme.preset] ? THEME_PRESETS[theme.preset].colors : THEME_PRESETS.forest.colors);

  if (theme.font) root.style.setProperty('--font-family', theme.font);
  if (theme.radius) root.style.setProperty('--radius', theme.radius);

  if (c) {
    if (c.bg) root.style.setProperty('--bg', c.bg);
    if (c.bgSubtle) root.style.setProperty('--bg-subtle', c.bgSubtle);
    if (c.bgCard) root.style.setProperty('--bg-card', c.bgCard);
    if (c.bgCardAlt) root.style.setProperty('--bg-card-alt', c.bgCardAlt);
    if (c.border) root.style.setProperty('--border', c.border);
    if (c.borderFocus) root.style.setProperty('--border-focus', c.borderFocus);
    if (c.text) root.style.setProperty('--text', c.text);
    if (c.textMid) root.style.setProperty('--text-mid', c.textMid);
    if (c.textMuted) root.style.setProperty('--text-muted', c.textMuted);
    if (c.accent) root.style.setProperty('--green', c.accent);
    if (c.accentBright) root.style.setProperty('--green-bright', c.accentBright);
    if (c.accentDark) root.style.setProperty('--green-dark', c.accentDark);
    if (c.accentGlow) root.style.setProperty('--green-glow', c.accentGlow);
    if (c.accentBadge) root.style.setProperty('--green-badge', c.accentBadge);
  }
}

// ─── LOAD DATA FROM LOCALSTORAGE OR URL / DATA.JSON ───────────────────────────
function getData() {
  try {
    // 1. Check for URL sync parameter (e.g. sent from desktop to mobile)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#sync=')) {
      const raw = decodeURIComponent(hash.substring(6));
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        localStorage.setItem('portfolio_data', JSON.stringify(parsed));
        history.replaceState(null, '', window.location.pathname);
        return mergeDefaults(parsed);
      }
    }

    // 2. Check localStorage
    const stored = localStorage.getItem('portfolio_data');
    if (stored) {
      const parsed = JSON.parse(stored);
      return mergeDefaults(parsed);
    }
  } catch(e) {}
  return DEFAULTS;
}

function mergeDefaults(parsed) {
  return {
    ...DEFAULTS,
    ...parsed,
    profile: { ...DEFAULTS.profile, ...(parsed.profile || {}) },
    headings: { ...DEFAULTS.headings, ...(parsed.headings || {}) },
    theme: { ...DEFAULTS.theme, ...(parsed.theme || {}) },
    experience: parsed.experience || DEFAULTS.experience,
    projects: parsed.projects || DEFAULTS.projects,
    skills: parsed.skills || DEFAULTS.skills,
    social: { ...DEFAULTS.social, ...(parsed.social || {}) },
    contact: { ...DEFAULTS.contact, ...(parsed.contact || {}) },
    inbox: parsed.inbox || []
  };
}

async function syncRemoteData() {
  // Always fetch latest data.json from repository with cache busting so visitors see published updates
  try {
    const res = await fetch('data.json?t=' + Date.now());
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json === 'object') {
        localStorage.setItem('portfolio_data', JSON.stringify(json));
        render();
      }
    }
  } catch(e) {}
}

// ─── RENDER PORTFOLIO ─────────────────────────────────────────────────────────
function render() {
  const d = getData();
  applyTheme(d.theme);

  const p = d.profile || DEFAULTS.profile;
  const h = d.headings || DEFAULTS.headings;

  // Site title
  if (h.siteTitle) {
    document.title = h.siteTitle;
    const pt = document.getElementById('page-title');
    if (pt) pt.textContent = h.siteTitle;
  }

  // Navbar monogram & links
  const monogram = document.getElementById('monogram');
  if (monogram) monogram.textContent = p.monogram || initials(p.name);
  setText('nav-link-about', h.navAbout);
  setText('nav-link-experience', h.navExperience);
  setText('nav-link-projects', h.navProjects);
  setText('nav-link-skills', h.navSkills);
  setText('nav-link-contact', h.navContact);

  // Hero
  setText('hero-name', p.name);
  setText('hero-tagline', p.tagline);
  setText('hero-school', p.school ? p.school + (p.program ? ' · ' + p.program : '') : '');
  setText('hero-availability-text', p.availability || 'Open to internships & collaborations');
  setText('hero-btn-projects', h.heroBtnProjects);
  setText('hero-btn-contact', h.heroBtnContact);
  setPhoto('hero-photo', p.photo);

  // About
  setText('about-eyebrow', h.aboutEyebrow);
  setText('about-heading-prefix', h.aboutPrefix);
  setText('about-name', p.name);
  setText('about-bio', p.bio);
  setText('about-location', p.location);
  setText('about-email', p.email);
  setText('about-school', p.school);
  setText('about-program', p.program);
  setText('about-connect-btn', h.aboutBtn);
  setAttr('about-email-link', 'href', 'mailto:' + p.email);
  setPhoto('about-photo', p.photo);

  // Experience section labels & list
  setText('experience-eyebrow', h.experienceEyebrow);
  setText('experience-title-prefix', h.experienceTitlePrefix);
  setText('experience-title-accent', h.experienceTitleAccent);
  renderExperience(d.experience || DEFAULTS.experience);

  // Projects section labels & list
  setText('projects-eyebrow', h.projectsEyebrow);
  setText('projects-title-prefix', h.projectsTitlePrefix);
  setText('projects-title-accent', h.projectsTitleAccent);
  renderProjects(d.projects || DEFAULTS.projects);

  // Skills section labels & list
  setText('skills-eyebrow', h.skillsEyebrow);
  setText('skills-title-prefix', h.skillsTitlePrefix);
  setText('skills-title-accent', h.skillsTitleAccent);
  renderSkills(d.skills || DEFAULTS.skills);

  // Contact section labels
  setText('contact-eyebrow', h.contactEyebrow);
  setText('contact-title-prefix', h.contactTitlePrefix);
  setText('contact-title-accent', h.contactTitleAccent);
  const contact = d.contact || DEFAULTS.contact;
  setText('contact-message', contact.message);
  setText('contact-email-val', contact.email || p.email);
  setAttr('contact-email-val', 'href', 'mailto:' + (contact.email || p.email));
  setText('contact-location-val', contact.location || p.location);
  
  const submitBtn = document.getElementById('contact-submit-btn');
  if (submitBtn && h.contactBtn) {
    submitBtn.innerHTML = `${h.contactBtn} <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
  }

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

function renderExperience(experienceList) {
  const container = document.getElementById('experience-list');
  if (!container) return;
  container.innerHTML = '';
  experienceList.forEach(exp => {
    const card = document.createElement('div');
    card.className = 'experience-card';
    const locHtml = exp.location ? `<span class="exp-company-loc">&middot; ${exp.location}</span>` : '';
    const dateRange = (exp.startDate || '') + (exp.startDate && exp.endDate ? ' – ' : '') + (exp.endDate || '');
    card.innerHTML = `
      <div class="exp-header">
        <h3 class="exp-role">${exp.role || 'Position'}</h3>
        ${dateRange ? `<span class="exp-period">${dateRange}</span>` : ''}
      </div>
      <div class="exp-company">${exp.company || 'Company / Organization'} ${locHtml}</div>
      <p class="exp-desc">${exp.description || ''}</p>
    `;
    container.appendChild(card);
  });
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

// ─── CONTACT FORM HANDLER WITH EMAIL DELIVERY ─────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusBanner = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origHtml = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sending message...';

    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const subject = document.getElementById('c-subject').value.trim();
    const message = document.getElementById('c-message').value.trim();

    const data = getData();
    const contactConfig = data.contact || {};
    const formspreeUrl = contactConfig.formspreeUrl;
    const web3formsKey = contactConfig.web3formsKey;
    const recipientEmail = contactConfig.email || (data.profile && data.profile.email) || 'you@email.com';

    // 1. Archive in local storage inbox backup
    if (!data.inbox) data.inbox = [];
    data.inbox.unshift({
      id: Date.now(),
      date: new Date().toLocaleString(),
      name: name,
      email: email,
      subject: subject || 'No Subject',
      message: message,
      read: false
    });
    localStorage.setItem('portfolio_data', JSON.stringify(data));

    // 2. Deliver to real email inbox
    try {
      if (web3formsKey && web3formsKey.trim() !== '') {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3formsKey.trim(),
            name: name,
            email: email,
            subject: subject || `Portfolio message from ${name}`,
            message: message,
            from_name: name
          })
        });

        const json = await response.json();
        btn.disabled = false;
        btn.innerHTML = origHtml;

        if (response.status === 200 && json.success) {
          if (statusBanner) {
            statusBanner.style.color = 'var(--green-bright)';
            statusBanner.style.borderColor = 'var(--border)';
            statusBanner.textContent = '✓ Message sent! Delivered directly to inbox.';
            statusBanner.classList.add('visible');
            form.reset();
            setTimeout(() => statusBanner.classList.remove('visible'), 6000);
          }
        } else {
          // If Web3Forms returned an error message
          if (statusBanner) {
            statusBanner.style.color = '#f87171';
            statusBanner.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            statusBanner.textContent = json.message || 'Error submitting form. Please verify your Web3Forms Access Key.';
            statusBanner.classList.add('visible');
            setTimeout(() => statusBanner.classList.remove('visible'), 8000);
          }
        }
      } else if (formspreeUrl && formspreeUrl.trim() !== '') {
        const response = await fetch(formspreeUrl.trim(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });
        btn.disabled = false;
        btn.innerHTML = origHtml;

        if (response.ok) {
          if (statusBanner) {
            statusBanner.style.color = 'var(--green-bright)';
            statusBanner.style.borderColor = 'var(--border)';
            statusBanner.textContent = '✓ Message sent! Delivered to inbox.';
            statusBanner.classList.add('visible');
            form.reset();
            setTimeout(() => statusBanner.classList.remove('visible'), 6000);
          }
        } else {
          throw new Error('Formspree response not ok');
        }
      } else {
        // Fallback: Opens email client with pre-filled details
        btn.disabled = false;
        btn.innerHTML = origHtml;
        window.open(`mailto:${recipientEmail}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`);
        if (statusBanner) {
          statusBanner.style.color = 'var(--green-bright)';
          statusBanner.style.borderColor = 'var(--border)';
          statusBanner.textContent = '✓ Message opened in email client & archived in Admin Inbox.';
          statusBanner.classList.add('visible');
          form.reset();
          setTimeout(() => statusBanner.classList.remove('visible'), 6000);
        }
      }
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = origHtml;
      window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      if (statusBanner) {
        statusBanner.style.color = 'var(--green-bright)';
        statusBanner.style.borderColor = 'var(--border)';
        statusBanner.textContent = '✓ Message archived in Admin Inbox.';
        statusBanner.classList.add('visible');
        form.reset();
        setTimeout(() => statusBanner.classList.remove('visible'), 6000);
      }
    }
  });
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function setText(id, val) { const el = document.getElementById(id); if (el && val !== undefined) el.textContent = val; }
function setAttr(id, attr, val) { const el = document.getElementById(id); if (el && val) el.setAttribute(attr, val); }
function setPhoto(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  if (url && url.trim() !== '') {
    el.style.backgroundImage = 'url("' + url.trim() + '")';
    el.classList.add('has-photo');
  } else {
    el.style.backgroundImage = '';
    el.classList.remove('has-photo');
  }
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

// ─── INITIAL RENDER ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  render();
  initNavbar();
  initScrollReveal();
  initContactForm();
  syncRemoteData();
});