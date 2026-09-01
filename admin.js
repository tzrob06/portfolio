// ─── ADMIN AUTHENTICATION & MANAGEMENT (DARK GREEN THEME) ─────────────────────────

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
  populateProjectsTab();
  populateSkillsTab();
  populateContactTab();
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
    });
  });
}

// ─── PROFILE TAB ──────────────────────────────────────────────────────────────
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

// ─── PROJECTS TAB ─────────────────────────────────────────────────────────────
function populateProjectsTab() {
  renderProjectsAdminList();

  document.getElementById('add-project-btn').addEventListener('click', () => {
    openProjectModal();
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

// ─── CONTACT & SOCIAL TAB ─────────────────────────────────────────────────────
function populateContactTab() {
  const d = getData();
  const contact = d.contact || DEFAULTS.contact;
  const social = d.social || DEFAULTS.social;

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

  // Export JSON
  document.getElementById('export-json-btn').addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(getData(), null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', 'portfolio_backup.json');
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
    if (confirm('Are you sure you want to reset all data and password to defaults? This cannot be undone.')) {
      localStorage.removeItem('portfolio_data');
      localStorage.removeItem('portfolio_password');
      alert('Reset complete.');
      location.reload();
    }
  });
}

// ─── MODAL HELPERS ────────────────────────────────────────────────────────────
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