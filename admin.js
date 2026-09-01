// ─── ADMIN AUTHENTICATION & MANAGEMENT ──────────────────────────────────────────

const DEFAULT_PASSWORD = 'admin123';

function getAdminPassword() {
  return localStorage.getItem('portfolio_password') || DEFAULT_PASSWORD;
}

function isAuthenticated() {
  return sessionStorage.getItem('portfolio_admin_auth') === 'true';
}

function authenticate(password) {
  if (password === getAdminPassword()) {
    sessionStorage.setItem('portfolio_admin_auth', 'true');
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem('portfolio_admin_auth');
  location.reload();
}

function saveData(data) {
  localStorage.setItem('portfolio_data', JSON.stringify(data));
}

// ─── INIT ADMIN VIEW ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const loginView = document.getElementById('login-view');
  const adminView = document.getElementById('admin-view');

  // Apply current theme to admin panel too!
  const d = getData();
  if (typeof applyTheme === 'function') {
    applyTheme(d.theme);
  }

  if (isAuthenticated()) {
    loginView.style.display = 'none';
    adminView.style.display = 'flex';
    loadAdminDashboard();
  } else {
    loginView.style.display = 'flex';
    adminView.style.display = 'none';
    setupLoginForm();
  }
});

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────
function setupLoginForm() {
  const form = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('password-input').value;
    if (authenticate(pass)) {
      location.reload();
    } else {
      errorMsg.classList.add('show');
    }
  });
}

// ─── DASHBOARD LOGIC ──────────────────────────────────────────────────────────
function loadAdminDashboard() {
  setupTabs();
  populateProfileTab();
  populateHeadingsTab();
  populateProjectsTab();
  populateSkillsTab();
  populateInboxTab();
  populateContactTab();
  populateThemeTab();
  setupSettingsTab();

  document.getElementById('logout-btn').addEventListener('click', logout);
  setupModals();
}

// ─── TAB NAVIGATION ───────────────────────────────────────────────────────────
function setupTabs() {
  const tabs = document.querySelectorAll('.admin-tab');
  const contents = document.querySelectorAll('.admin-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(`tab-${tab.dataset.tab}`);
      if (target) target.classList.add('active');

      if (tab.dataset.tab === 'inbox') {
        renderInboxList();
      }
    });
  });
}

// ─── PROFILE TAB & IMAGE UPLOAD ───────────────────────────────────────────────
function populateProfileTab() {
  const d = getData();
  const p = d.profile || DEFAULTS.profile;

  document.getElementById('sidebar-name').textContent = p.name || 'Your Name';
  document.getElementById('sidebar-logo').textContent = p.monogram || initials(p.name);

  document.getElementById('prof-name').value = p.name || '';
  document.getElementById('prof-monogram').value = p.monogram || '';
  document.getElementById('prof-tagline').value = p.tagline || '';
  document.getElementById('prof-school').value = p.school || '';
  document.getElementById('prof-program').value = p.program || '';
  document.getElementById('prof-availability').value = p.availability || '';
  document.getElementById('prof-location').value = p.location || '';
  document.getElementById('prof-photo').value = p.photo || '';
  document.getElementById('prof-bio').value = p.bio || '';

  updatePhotoThumb('prof-photo-thumb', 'prof-photo-remove', p.photo);

  // Handle URL input change
  const photoInput = document.getElementById('prof-photo');
  photoInput.addEventListener('input', () => {
    updatePhotoThumb('prof-photo-thumb', 'prof-photo-remove', photoInput.value.trim());
  });

  // Handle File upload
  const fileInput = document.getElementById('prof-photo-file');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      photoInput.value = base64;
      updatePhotoThumb('prof-photo-thumb', 'prof-photo-remove', base64);
    };
    reader.readAsDataURL(file);
  });

  // Handle Remove Photo button
  document.getElementById('prof-photo-remove').addEventListener('click', () => {
    photoInput.value = '';
    fileInput.value = '';
    updatePhotoThumb('prof-photo-thumb', 'prof-photo-remove', '');
  });

  const form = document.getElementById('profile-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentData = getData();
    currentData.profile = {
      name: document.getElementById('prof-name').value.trim(),
      monogram: document.getElementById('prof-monogram').value.trim(),
      tagline: document.getElementById('prof-tagline').value.trim(),
      school: document.getElementById('prof-school').value.trim(),
      program: document.getElementById('prof-program').value.trim(),
      availability: document.getElementById('prof-availability').value.trim(),
      location: document.getElementById('prof-location').value.trim(),
      photo: document.getElementById('prof-photo').value.trim(),
      bio: document.getElementById('prof-bio').value.trim()
    };
    saveData(currentData);
    showSaveMsg('profile-save-msg');
    document.getElementById('sidebar-name').textContent = currentData.profile.name;
    document.getElementById('sidebar-logo').textContent = currentData.profile.monogram || initials(currentData.profile.name);
  });
}

// ─── HEADINGS & LABELS TAB ───────────────────────────────────────────────────
function populateHeadingsTab() {
  const d = getData();
  const h = d.headings || DEFAULTS.headings;

  setInputValue('hd-site-title', h.siteTitle || 'Portfolio');
  setInputValue('hd-nav-about', h.navAbout || 'About');
  setInputValue('hd-nav-projects', h.navProjects || 'Projects');
  setInputValue('hd-nav-skills', h.navSkills || 'Skills');
  setInputValue('hd-nav-contact', h.navContact || 'Contact');

  setInputValue('hd-hero-btn-projects', h.heroBtnProjects || 'View My Work');
  setInputValue('hd-hero-btn-contact', h.heroBtnContact || 'Get In Touch');

  setInputValue('hd-about-eyebrow', h.aboutEyebrow || 'About');
  setInputValue('hd-about-prefix', h.aboutPrefix || "Hello, I'm");
  setInputValue('hd-about-btn', h.aboutBtn || "Let's Connect");

  setInputValue('hd-proj-eyebrow', h.projectsEyebrow || 'Work');
  setInputValue('hd-proj-title-prefix', h.projectsTitlePrefix || 'Selected');
  setInputValue('hd-proj-title-accent', h.projectsTitleAccent || 'Projects');

  setInputValue('hd-skill-eyebrow', h.skillsEyebrow || 'Capabilities');
  setInputValue('hd-skill-title-prefix', h.skillsTitlePrefix || 'Skills &');
  setInputValue('hd-skill-title-accent', h.skillsTitleAccent || 'Strengths');

  setInputValue('hd-contact-eyebrow', h.contactEyebrow || 'Contact');
  setInputValue('hd-contact-title-prefix', h.contactTitlePrefix || 'Get In');
  setInputValue('hd-contact-title-accent', h.contactTitleAccent || 'Touch');
  setInputValue('hd-contact-btn', h.contactBtn || 'Send Message');

  const form = document.getElementById('headings-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentData = getData();
    currentData.headings = {
      siteTitle: getInputValue('hd-site-title'),
      navAbout: getInputValue('hd-nav-about'),
      navProjects: getInputValue('hd-nav-projects'),
      navSkills: getInputValue('hd-nav-skills'),
      navContact: getInputValue('hd-nav-contact'),

      heroBtnProjects: getInputValue('hd-hero-btn-projects'),
      heroBtnContact: getInputValue('hd-hero-btn-contact'),

      aboutEyebrow: getInputValue('hd-about-eyebrow'),
      aboutPrefix: getInputValue('hd-about-prefix'),
      aboutBtn: getInputValue('hd-about-btn'),

      projectsEyebrow: getInputValue('hd-proj-eyebrow'),
      projectsTitlePrefix: getInputValue('hd-proj-title-prefix'),
      projectsTitleAccent: getInputValue('hd-proj-title-accent'),

      skillsEyebrow: getInputValue('hd-skill-eyebrow'),
      skillsTitlePrefix: getInputValue('hd-skill-title-prefix'),
      skillsTitleAccent: getInputValue('hd-skill-title-accent'),

      contactEyebrow: getInputValue('hd-contact-eyebrow'),
      contactTitlePrefix: getInputValue('hd-contact-title-prefix'),
      contactTitleAccent: getInputValue('hd-contact-title-accent'),
      contactBtn: getInputValue('hd-contact-btn')
    };

    saveData(currentData);
    showSaveMsg('headings-save-msg');
  });
}

function setInputValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function getInputValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function updatePhotoThumb(thumbId, removeBtnId, url) {
  const thumb = document.getElementById(thumbId);
  const removeBtn = document.getElementById(removeBtnId);
  if (!thumb) return;

  if (url && url.length > 0) {
    thumb.style.backgroundImage = `url('${url}')`;
    thumb.textContent = '';
    if (removeBtn) removeBtn.style.display = 'inline-block';
  } else {
    thumb.style.backgroundImage = '';
    thumb.textContent = 'No Image';
    if (removeBtn) removeBtn.style.display = 'none';
  }
}

// ─── INBOX & MESSAGES TAB ─────────────────────────────────────────────────────
function populateInboxTab() {
  renderInboxList();
  document.getElementById('clear-inbox-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all messages from your inbox archive?')) {
      const currentData = getData();
      currentData.inbox = [];
      saveData(currentData);
      renderInboxList();
    }
  });
}

function renderInboxList() {
  const container = document.getElementById('inbox-list');
  const badge = document.getElementById('inbox-badge');
  const d = getData();
  const list = d.inbox || [];
  container.innerHTML = '';

  const unreadCount = list.filter(m => !m.read).length;
  if (badge) {
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  if (list.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); font-size:0.875rem; text-align:center; padding:2rem 0;">No messages received yet. When visitors fill out your contact form, submissions will appear here!</p>';
    return;
  }

  list.forEach(msg => {
    const card = document.createElement('div');
    card.className = `inbox-card ${!msg.read ? 'unread' : ''}`;
    card.innerHTML = `
      <div class="inbox-header">
        <div>
          <span class="inbox-sender">${msg.name || 'Anonymous'}</span>
          <a href="mailto:${msg.email}" class="inbox-email">${msg.email || 'No email provided'}</a>
        </div>
        <span class="inbox-date">${msg.date || ''}</span>
      </div>
      <div class="inbox-subject">Subject: ${msg.subject || 'No Subject'}</div>
      <div class="inbox-body">${msg.message || ''}</div>
      <div class="inbox-actions">
        <a href="mailto:${msg.email}?subject=${encodeURIComponent('Re: ' + (msg.subject || 'Portfolio Inquiry'))}" class="btn btn-ghost" style="padding:0.35rem 0.75rem; font-size:0.8rem;">Reply via Email</a>
        <button type="button" class="btn btn-ghost" style="padding:0.35rem 0.75rem; font-size:0.8rem;" onclick="toggleReadMessage(${msg.id})">${msg.read ? 'Mark Unread' : 'Mark as Read'}</button>
        <button type="button" class="btn btn-danger" style="padding:0.35rem 0.75rem; font-size:0.8rem;" onclick="deleteMessage(${msg.id})">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.toggleReadMessage = function(id) {
  const currentData = getData();
  const msg = (currentData.inbox || []).find(m => m.id === id);
  if (msg) {
    msg.read = !msg.read;
    saveData(currentData);
    renderInboxList();
  }
};

window.deleteMessage = function(id) {
  const currentData = getData();
  currentData.inbox = (currentData.inbox || []).filter(m => m.id !== id);
  saveData(currentData);
  renderInboxList();
};

// ─── PROJECTS TAB & IMAGE UPLOAD ──────────────────────────────────────────────
function populateProjectsTab() {
  renderProjectsAdminList();

  document.getElementById('add-project-btn').addEventListener('click', () => {
    openProjectModal();
  });

  // Project Modal Image Upload handlers
  const pmImageInput = document.getElementById('pm-image');
  pmImageInput.addEventListener('input', () => {
    updatePhotoThumb('pm-image-thumb', 'pm-image-remove', pmImageInput.value.trim());
  });

  const pmFileInput = document.getElementById('pm-image-file');
  pmFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      pmImageInput.value = base64;
      updatePhotoThumb('pm-image-thumb', 'pm-image-remove', base64);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('pm-image-remove').addEventListener('click', () => {
    pmImageInput.value = '';
    pmFileInput.value = '';
    updatePhotoThumb('pm-image-thumb', 'pm-image-remove', '');
  });

  const form = document.getElementById('project-modal-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('pm-id').value;
    const currentData = getData();
    if (!currentData.projects) currentData.projects = [];

    const projectObj = {
      id: id ? parseInt(id, 10) : Date.now(),
      title: document.getElementById('pm-title').value.trim(),
      year: document.getElementById('pm-year').value.trim(),
      category: document.getElementById('pm-category').value.trim(),
      image: document.getElementById('pm-image').value.trim(),
      link: document.getElementById('pm-link').value.trim(),
      description: document.getElementById('pm-desc').value.trim()
    };

    if (id) {
      const idx = currentData.projects.findIndex(p => p.id === parseInt(id, 10));
      if (idx !== -1) currentData.projects[idx] = projectObj;
    } else {
      currentData.projects.push(projectObj);
    }

    saveData(currentData);
    closeModal('project-modal');
    renderProjectsAdminList();
  });
}

function renderProjectsAdminList() {
  const container = document.getElementById('projects-list');
  const d = getData();
  const list = d.projects || [];
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); font-size:0.875rem;">No projects added yet.</p>';
    return;
  }

  list.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <div class="item-row-body">
        <div class="item-row-title">${item.title} <span style="font-weight:400; color:var(--text-muted); font-size:0.75rem;">(${item.year || 'N/A'}) &middot; ${item.category || 'General'}</span></div>
        <div class="item-row-desc">${item.description}</div>
      </div>
      <div class="item-row-actions">
        <button type="button" onclick="editProject(${item.id})">Edit</button>
        <button type="button" class="delete" onclick="deleteProject(${item.id})">Delete</button>
      </div>
    `;
    container.appendChild(row);
  });
}

window.editProject = function(id) {
  const d = getData();
  const proj = (d.projects || []).find(p => p.id === id);
  if (!proj) return;
  openProjectModal(proj);
};

window.deleteProject = function(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  const currentData = getData();
  currentData.projects = (currentData.projects || []).filter(p => p.id !== id);
  saveData(currentData);
  renderProjectsAdminList();
};

function openProjectModal(item = null) {
  document.getElementById('project-modal-title').textContent = item ? 'Edit Project' : 'Add Project';
  document.getElementById('pm-id').value = item ? item.id : '';
  document.getElementById('pm-title').value = item ? item.title : '';
  document.getElementById('pm-year').value = item ? item.year : '';
  document.getElementById('pm-category').value = item ? item.category : '';
  document.getElementById('pm-image').value = item ? item.image : '';
  document.getElementById('pm-link').value = item ? item.link : '';
  document.getElementById('pm-desc').value = item ? item.description : '';
  updatePhotoThumb('pm-image-thumb', 'pm-image-remove', item ? item.image : '');
  openModal('project-modal');
}

// ─── SKILLS TAB ───────────────────────────────────────────────────────────────
function populateSkillsTab() {
  renderSkillsAdminList();

  document.getElementById('add-skill-btn').addEventListener('click', () => {
    openSkillModal();
  });

  const form = document.getElementById('skill-modal-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('sm-id').value;
    const currentData = getData();
    if (!currentData.skills) currentData.skills = [];

    const skillObj = {
      id: id ? parseInt(id, 10) : Date.now(),
      title: document.getElementById('sm-title').value.trim(),
      description: document.getElementById('sm-desc').value.trim()
    };

    if (id) {
      const idx = currentData.skills.findIndex(s => s.id === parseInt(id, 10));
      if (idx !== -1) currentData.skills[idx] = skillObj;
    } else {
      currentData.skills.push(skillObj);
    }

    saveData(currentData);
    closeModal('skill-modal');
    renderSkillsAdminList();
  });
}

function renderSkillsAdminList() {
  const container = document.getElementById('skills-list');
  const d = getData();
  const list = d.skills || [];
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); font-size:0.875rem;">No skills added yet.</p>';
    return;
  }

  list.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <div class="item-row-body">
        <div class="item-row-title">${item.title}</div>
        <div class="item-row-desc">${item.description}</div>
      </div>
      <div class="item-row-actions">
        <button type="button" onclick="editSkill(${item.id})">Edit</button>
        <button type="button" class="delete" onclick="deleteSkill(${item.id})">Delete</button>
      </div>
    `;
    container.appendChild(row);
  });
}

window.editSkill = function(id) {
  const d = getData();
  const skill = (d.skills || []).find(s => s.id === id);
  if (!skill) return;
  openSkillModal(skill);
};

window.deleteSkill = function(id) {
  if (!confirm('Are you sure you want to delete this skill?')) return;
  const currentData = getData();
  currentData.skills = (currentData.skills || []).filter(s => s.id !== id);
  saveData(currentData);
  renderSkillsAdminList();
};

function openSkillModal(item = null) {
  document.getElementById('skill-modal-title').textContent = item ? 'Edit Skill' : 'Add Skill';
  document.getElementById('sm-id').value = item ? item.id : '';
  document.getElementById('sm-title').value = item ? item.title : '';
  document.getElementById('sm-desc').value = item ? item.description : '';
  openModal('skill-modal');
}

// ─── CONTACT & EMAIL SETUP TAB ────────────────────────────────────────────────
function populateContactTab() {
  const d = getData();
  const contact = d.contact || DEFAULTS.contact;
  const social = d.social || DEFAULTS.social;

  document.getElementById('contact-formspree').value = contact.formspreeUrl || '';
  document.getElementById('contact-web3forms').value = contact.web3formsKey || '';

  document.getElementById('contact-email').value = contact.email || '';
  document.getElementById('contact-loc').value = contact.location || '';
  document.getElementById('contact-msg-input').value = contact.message || '';

  document.getElementById('soc-linkedin').value = social.linkedin || '';
  document.getElementById('soc-github').value = social.github || '';
  document.getElementById('soc-twitter').value = social.twitter || '';
  document.getElementById('soc-instagram').value = social.instagram || '';

  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentData = getData();
    currentData.contact = {
      formspreeUrl: document.getElementById('contact-formspree').value.trim(),
      web3formsKey: document.getElementById('contact-web3forms').value.trim(),
      email: document.getElementById('contact-email').value.trim(),
      location: document.getElementById('contact-loc').value.trim(),
      message: document.getElementById('contact-msg-input').value.trim()
    };
    currentData.social = {
      linkedin: document.getElementById('soc-linkedin').value.trim(),
      github: document.getElementById('soc-github').value.trim(),
      twitter: document.getElementById('soc-twitter').value.trim(),
      instagram: document.getElementById('soc-instagram').value.trim()
    };
    saveData(currentData);
    showSaveMsg('contact-save-msg');
  });
}

// ─── THEME & APPEARANCE TAB ───────────────────────────────────────────────────
function populateThemeTab() {
  const d = getData();
  const theme = d.theme || DEFAULTS.theme;
  const c = theme.colors || THEME_PRESETS.forest.colors;

  // Render presets
  const presetsContainer = document.getElementById('theme-presets-container');
  presetsContainer.innerHTML = '';
  Object.keys(THEME_PRESETS).forEach(key => {
    const p = THEME_PRESETS[key];
    const card = document.createElement('div');
    card.className = `theme-preset-card ${theme.preset === key ? 'active' : ''}`;
    card.innerHTML = `
      <div class="preset-colors-row">
        <span class="preset-color-dot" style="background:${p.colors.bg}"></span>
        <span class="preset-color-dot" style="background:${p.colors.bgCard}"></span>
        <span class="preset-color-dot" style="background:${p.colors.accent}"></span>
        <span class="preset-color-dot" style="background:${p.colors.accentBright}"></span>
      </div>
      <div class="preset-name">${p.name}</div>
    `;
    card.addEventListener('click', () => {
      selectThemePreset(key);
    });
    presetsContainer.appendChild(card);
  });

  // Set pickers values
  setColorPicker('col-bg', 'hex-bg', c.bg || '#0b120e');
  setColorPicker('col-card', 'hex-card', c.bgCard || '#16251e');
  setColorPicker('col-accent', 'hex-accent', c.accent || '#52b788');
  setColorPicker('col-bright', 'hex-bright', c.accentBright || '#4ade80');
  setColorPicker('col-border', 'hex-border', c.border || '#263d31');
  setColorPicker('col-text', 'hex-text', c.text || '#ecf4ee');

  if (theme.font) document.getElementById('theme-font').value = theme.font;
  if (theme.radius) document.getElementById('theme-radius').value = theme.radius;

  // Custom Theme Form Submit
  const form = document.getElementById('custom-theme-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentData = getData();
    const bg = document.getElementById('col-bg').value;
    const bgCard = document.getElementById('col-card').value;
    const accent = document.getElementById('col-accent').value;
    const accentBright = document.getElementById('col-bright').value;
    const border = document.getElementById('col-border').value;
    const text = document.getElementById('col-text').value;

    currentData.theme = {
      preset: 'custom',
      font: document.getElementById('theme-font').value,
      radius: document.getElementById('theme-radius').value,
      colors: {
        bg: bg,
        bgSubtle: bgCard,
        bgCard: bgCard,
        bgCardAlt: bgCard,
        border: border,
        borderFocus: accentBright,
        text: text,
        textMid: text,
        textMuted: border,
        accent: accent,
        accentBright: accentBright,
        accentDark: accent,
        accentGlow: hexToRgba(accent, 0.2),
        accentBadge: hexToRgba(accent, 0.15)
      }
    };

    saveData(currentData);
    applyTheme(currentData.theme);
    showSaveMsg('theme-save-msg');
  });
}

function selectThemePreset(key) {
  const p = THEME_PRESETS[key];
  if (!p) return;

  const currentData = getData();
  currentData.theme = {
    preset: key,
    font: p.font,
    radius: p.radius,
    colors: p.colors
  };

  saveData(currentData);
  applyTheme(currentData.theme);

  // Update UI pickers
  setColorPicker('col-bg', 'hex-bg', p.colors.bg);
  setColorPicker('col-card', 'hex-card', p.colors.bgCard);
  setColorPicker('col-accent', 'hex-accent', p.colors.accent);
  setColorPicker('col-bright', 'hex-bright', p.colors.accentBright);
  setColorPicker('col-border', 'hex-border', p.colors.border);
  setColorPicker('col-text', 'hex-text', p.colors.text);

  if (p.font) document.getElementById('theme-font').value = p.font;
  if (p.radius) document.getElementById('theme-radius').value = p.radius;

  // Update active state in cards
  document.querySelectorAll('.theme-preset-card').forEach((el, idx) => {
    el.classList.toggle('active', Object.keys(THEME_PRESETS)[idx] === key);
  });

  showSaveMsg('theme-save-msg');
}

function setColorPicker(inputId, hexId, value) {
  const input = document.getElementById(inputId);
  const hex = document.getElementById(hexId);
  if (!input) return;
  input.value = value;
  if (hex) hex.textContent = value;

  input.oninput = () => {
    if (hex) hex.textContent = input.value;
  };
}

function hexToRgba(hex, alpha) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${alpha})`;
  }
  return hex;
}

// ─── SETTINGS TAB ─────────────────────────────────────────────────────────────
function setupSettingsTab() {
  // Password change
  const passForm = document.getElementById('password-change-form');
  passForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const p1 = document.getElementById('new-password').value;
    const p2 = document.getElementById('confirm-password').value;
    if (p1 !== p2) {
      alert('Passwords do not match.');
      return;
    }
    localStorage.setItem('portfolio_password', p1);
    showSaveMsg('password-save-msg');
    passForm.reset();
  });

  // Copy Mobile Sync Link
  const syncBtn = document.getElementById('copy-sync-link-btn');
  if (syncBtn) {
    syncBtn.addEventListener('click', () => {
      const data = getData();
      const currentUrl = window.location.href.split('#')[0];
      const indexUrl = currentUrl.replace(/admin\.html$/, 'index.html');
      const syncUrl = indexUrl + '#sync=' + encodeURIComponent(JSON.stringify(data));
      
      navigator.clipboard.writeText(syncUrl).then(() => {
        showSaveMsg('sync-link-msg');
      }).catch(() => {
        prompt('Copy this link and open it on your phone:', syncUrl);
      });
    });
  }

  // Copy Data JSON
  const copyJsonBtn = document.getElementById('copy-json-btn');
  if (copyJsonBtn) {
    copyJsonBtn.addEventListener('click', () => {
      const jsonStr = JSON.stringify(getData(), null, 2);
      navigator.clipboard.writeText(jsonStr).then(() => {
        alert('✓ Portfolio JSON copied to clipboard!');
      }).catch(() => {
        prompt('Copy your portfolio JSON data:', jsonStr);
      });
    });
  }

  // Export JSON
  document.getElementById('export-json-btn').addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(getData(), null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'data.json');
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  // Import JSON
  const importInput = document.getElementById('import-json-input');
  importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && typeof parsed === 'object') {
          saveData(parsed);
          alert('Backup restored successfully!');
          location.reload();
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  });

  // Reset to defaults
  document.getElementById('reset-defaults-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all data, theme, and password to defaults? This cannot be undone.')) {
      localStorage.removeItem('portfolio_data');
      localStorage.removeItem('portfolio_password');
      alert('Reset complete.');
      location.reload();
    }
  });
}

// ─── MODAL HELPERS ────────────────────────────────────────────────────
function setupModals() {
  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', () => {
      const modalId = el.getAttribute('data-modal');
      closeModal(modalId);
    });
  });
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.removeAttribute('hidden');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.setAttribute('hidden', '');
}

function showSaveMsg(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}