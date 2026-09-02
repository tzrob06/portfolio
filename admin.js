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
  try {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Error saving data to localStorage:', err);
    if (err.name === 'QuotaExceededError' || err.code === 22) {
      alert('⚠️ Browser storage quota exceeded. The image file is too large. Please select a smaller photo.');
    } else {
      alert('⚠️ Could not save settings: ' + err.message);
    }
    return false;
  }
}

// ─── IMAGE COMPRESSION & RESIZING UTILITY ──────────────────────────────────────
function compressImageFile(file, maxWidth = 800, maxHeight = 800, quality = 0.82, callback) {
  if (!file) return;
  
  // Show loading indicator in thumb if available
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      if (typeof callback === 'function') {
        callback(compressedDataUrl);
      }
    };
    img.onerror = () => {
      alert('⚠️ Unable to process this image format. Please select a standard JPG or PNG.');
    };
    img.src = e.target.result;
  };
  reader.onerror = () => {
    alert('⚠️ Could not read file from your device.');
  };
  reader.readAsDataURL(file);
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
  populateExperienceTab();
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

  // Handle Choose Image File button & thumbnail click
  const fileBtn = document.getElementById('prof-photo-btn');
  const fileInput = document.getElementById('prof-photo-file');
  const thumb = document.getElementById('prof-photo-thumb');

  if (fileBtn && fileInput) {
    fileBtn.addEventListener('click', () => fileInput.click());
  }
  if (thumb && fileInput) {
    thumb.addEventListener('click', () => fileInput.click());
    
    // Drag & drop
    thumb.addEventListener('dragover', (e) => { e.preventDefault(); thumb.style.borderColor = 'var(--green-bright)'; });
    thumb.addEventListener('dragleave', () => { thumb.style.borderColor = 'var(--border)'; });
    thumb.addEventListener('drop', (e) => {
      e.preventDefault();
      thumb.style.borderColor = 'var(--border)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processProfilePhoto(e.dataTransfer.files[0]);
      }
    });
  }

  function processProfilePhoto(file) {
    if (!file) return;
    if (thumb) thumb.textContent = 'Optimizing...';
    compressImageFile(file, 800, 800, 0.85, (compressedBase64) => {
      photoInput.value = compressedBase64;
      updatePhotoThumb('prof-photo-thumb', 'prof-photo-remove', compressedBase64);
    });
  }

  // Handle File upload with automatic compression
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        processProfilePhoto(e.target.files[0]);
      }
    });
  }

  // Handle Remove Photo button
  document.getElementById('prof-photo-remove').addEventListener('click', () => {
    photoInput.value = '';
    if (fileInput) fileInput.value = '';
    updatePhotoThumb('prof-photo-thumb', 'prof-photo-remove', '');
  });

  // Handle Resume (PDF or Link)
  const resumeInput = document.getElementById('prof-resume');
  const resumeBtn = document.getElementById('prof-resume-btn');
  const resumeFileInput = document.getElementById('prof-resume-file');
  const resumeRemoveBtn = document.getElementById('prof-resume-remove');
  const resumeStatus = document.getElementById('prof-resume-status');

  function updateResumeDisplay(url) {
    if (url && url.trim()) {
      if (resumeRemoveBtn) resumeRemoveBtn.style.display = 'inline-block';
      if (resumeStatus) {
        if (url.startsWith('data:application/pdf')) {
          resumeStatus.textContent = '✓ Embedded PDF attached';
          resumeStatus.style.color = 'var(--green-bright)';
        } else {
          resumeStatus.textContent = '✓ Resume link attached';
          resumeStatus.style.color = 'var(--green-bright)';
        }
      }
    } else {
      if (resumeRemoveBtn) resumeRemoveBtn.style.display = 'none';
      if (resumeStatus) {
        resumeStatus.textContent = 'No resume attached';
        resumeStatus.style.color = 'var(--text-muted)';
      }
    }
  }

  if (resumeInput) {
    resumeInput.value = p.resumeUrl || '';
    updateResumeDisplay(p.resumeUrl);

    resumeInput.addEventListener('input', () => {
      updateResumeDisplay(resumeInput.value.trim());
    });
  }

  if (resumeBtn && resumeFileInput) {
    resumeBtn.addEventListener('click', () => resumeFileInput.click());
  }

  if (resumeFileInput) {
    resumeFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert('Please select a valid PDF file.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('Notice: PDF file exceeds 2MB. For best performance, you can also upload your PDF to Google Drive or Dropbox and paste the share link.');
      }
      if (resumeStatus) resumeStatus.textContent = 'Reading PDF...';
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Pdf = event.target.result;
        if (resumeInput) resumeInput.value = base64Pdf;
        updateResumeDisplay(base64Pdf);
      };
      reader.onerror = () => {
        alert('Could not read PDF file.');
      };
      reader.readAsDataURL(file);
    });
  }

  if (resumeRemoveBtn) {
    resumeRemoveBtn.addEventListener('click', () => {
      if (resumeInput) resumeInput.value = '';
      if (resumeFileInput) resumeFileInput.value = '';
      updateResumeDisplay('');
    });
  }

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
      resumeUrl: (document.getElementById('prof-resume') ? document.getElementById('prof-resume').value.trim() : ''),
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
  setInputValue('hd-nav-experience', h.navExperience || 'Experience');
  setInputValue('hd-nav-projects', h.navProjects || 'Projects');
  setInputValue('hd-nav-skills', h.navSkills || 'Skills');
  setInputValue('hd-nav-contact', h.navContact || 'Contact');

  setInputValue('hd-hero-btn-projects', h.heroBtnProjects || 'View My Work');
  setInputValue('hd-hero-btn-contact', h.heroBtnContact || 'Get In Touch');

  setInputValue('hd-about-eyebrow', h.aboutEyebrow || 'About');
  setInputValue('hd-about-prefix', h.aboutPrefix || "Hello, I'm");
  setInputValue('hd-about-btn', h.aboutBtn || "Let's Connect");

  setInputValue('hd-exp-eyebrow', h.experienceEyebrow || 'Experience');
  setInputValue('hd-exp-title-prefix', h.experienceTitlePrefix || 'Work &');
  setInputValue('hd-exp-title-accent', h.experienceTitleAccent || 'Experience');

  setInputValue('hd-proj-eyebrow', h.projectsEyebrow || 'Projects');
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
      navExperience: getInputValue('hd-nav-experience'),
      navProjects: getInputValue('hd-nav-projects'),
      navSkills: getInputValue('hd-nav-skills'),
      navContact: getInputValue('hd-nav-contact'),

      heroBtnProjects: getInputValue('hd-hero-btn-projects'),
      heroBtnContact: getInputValue('hd-hero-btn-contact'),

      aboutEyebrow: getInputValue('hd-about-eyebrow'),
      aboutPrefix: getInputValue('hd-about-prefix'),
      aboutBtn: getInputValue('hd-about-btn'),

      experienceEyebrow: getInputValue('hd-exp-eyebrow'),
      experienceTitlePrefix: getInputValue('hd-exp-title-prefix'),
      experienceTitleAccent: getInputValue('hd-exp-title-accent'),

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

  if (url && url.trim().length > 0) {
    thumb.style.backgroundImage = 'url("' + url.trim() + '")';
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

// ─── EXPERIENCE TAB ───────────────────────────────────────────────────────────
function populateExperienceTab() {
  renderExperienceAdminList();

  const addBtn = document.getElementById('add-experience-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      openExperienceModal();
    });
  }

  const form = document.getElementById('experience-modal-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('em-id').value;
      const currentData = getData();
      if (!currentData.experience) currentData.experience = [];

      const expObj = {
        id: id ? parseInt(id, 10) : Date.now(),
        role: document.getElementById('em-role').value.trim(),
        company: document.getElementById('em-company').value.trim(),
        location: document.getElementById('em-location').value.trim(),
        startDate: document.getElementById('em-start-date').value.trim(),
        endDate: document.getElementById('em-end-date').value.trim(),
        description: document.getElementById('em-desc').value.trim()
      };

      if (id) {
        const idx = currentData.experience.findIndex(x => x.id === parseInt(id, 10));
        if (idx !== -1) currentData.experience[idx] = expObj;
      } else {
        currentData.experience.push(expObj);
      }

      saveData(currentData);
      closeModal('experience-modal');
      renderExperienceAdminList();
    });
  }
}

function renderExperienceAdminList() {
  const container = document.getElementById('experience-list');
  if (!container) return;
  const d = getData();
  const list = d.experience || [];
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); font-size:0.875rem;">No experience entries added yet.</p>';
    return;
  }

  list.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item-row';
    const dates = (item.startDate || '') + (item.startDate && item.endDate ? ' – ' : '') + (item.endDate || '');
    row.innerHTML = `
      <div class="item-row-body">
        <div class="item-row-title">${item.role} <span style="font-weight:400; color:var(--text-muted); font-size:0.75rem;">(${item.company || ''}${dates ? ' &middot; ' + dates : ''})</span></div>
        <div class="item-row-desc">${item.description}</div>
      </div>
      <div class="item-row-actions">
        <button type="button" onclick="editExperience(${item.id})">Edit</button>
        <button type="button" class="delete" onclick="deleteExperience(${item.id})">Delete</button>
      </div>
    `;
    container.appendChild(row);
  });
}

window.editExperience = function(id) {
  const d = getData();
  const exp = (d.experience || []).find(x => x.id === id);
  if (!exp) return;
  openExperienceModal(exp);
};

window.deleteExperience = function(id) {
  if (!confirm('Are you sure you want to delete this experience entry?')) return;
  const currentData = getData();
  currentData.experience = (currentData.experience || []).filter(x => x.id !== id);
  saveData(currentData);
  renderExperienceAdminList();
};

function openExperienceModal(item = null) {
  document.getElementById('experience-modal-title').textContent = item ? 'Edit Experience' : 'Add Experience';
  document.getElementById('em-id').value = item ? item.id : '';
  document.getElementById('em-role').value = item ? item.role : '';
  document.getElementById('em-company').value = item ? item.company : '';
  document.getElementById('em-location').value = item ? item.location : '';
  document.getElementById('em-start-date').value = item ? item.startDate : '';
  document.getElementById('em-end-date').value = item ? item.endDate : '';
  document.getElementById('em-desc').value = item ? item.description : '';
  openModal('experience-modal');
}

// ─── PROJECTS TAB & IMAGE UPLOAD ──────────────────────────────────────────────
function populateProjectsTab() {
  renderProjectsAdminList();

  document.getElementById('add-project-btn').addEventListener('click', () => {
    openProjectModal();
  });

  // Project Modal Image Upload handlers
  const pmImageInput = document.getElementById('pm-image');
  const pmFileBtn = document.getElementById('pm-image-btn');
  const pmFileInput = document.getElementById('pm-image-file');
  const pmThumb = document.getElementById('pm-image-thumb');

  pmImageInput.addEventListener('input', () => {
    updatePhotoThumb('pm-image-thumb', 'pm-image-remove', pmImageInput.value.trim());
  });

  if (pmFileBtn && pmFileInput) {
    pmFileBtn.addEventListener('click', () => pmFileInput.click());
  }
  if (pmThumb && pmFileInput) {
    pmThumb.addEventListener('click', () => pmFileInput.click());
    pmThumb.addEventListener('dragover', (e) => { e.preventDefault(); pmThumb.style.borderColor = 'var(--green-bright)'; });
    pmThumb.addEventListener('dragleave', () => { pmThumb.style.borderColor = 'var(--border)'; });
    pmThumb.addEventListener('drop', (e) => {
      e.preventDefault();
      pmThumb.style.borderColor = 'var(--border)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processProjectPhoto(e.dataTransfer.files[0]);
      }
    });
  }

  function processProjectPhoto(file) {
    if (!file) return;
    if (pmThumb) pmThumb.textContent = 'Optimizing...';
    compressImageFile(file, 800, 800, 0.85, (compressedBase64) => {
      pmImageInput.value = compressedBase64;
      updatePhotoThumb('pm-image-thumb', 'pm-image-remove', compressedBase64);
    });
  }

  if (pmFileInput) {
    pmFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        processProjectPhoto(e.target.files[0]);
      }
    });
  }

  document.getElementById('pm-image-remove').addEventListener('click', () => {
    pmImageInput.value = '';
    if (pmFileInput) pmFileInput.value = '';
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

// ─── CONTACT & EMAIL TAB ──────────────────────────────────────────────────────
function populateContactTab() {
  const d = getData();
  const c = d.contact || DEFAULTS.contact;
  const s = d.social || DEFAULTS.social;

  setInputValue('contact-formspree', c.formspreeUrl || '');
  setInputValue('contact-web3forms', c.web3formsKey || '');
  setInputValue('contact-email', c.email || (d.profile && d.profile.email) || '');
  setInputValue('contact-loc', c.location || (d.profile && d.profile.location) || '');
  setInputValue('contact-msg-input', c.message || '');

  setInputValue('soc-linkedin', s.linkedin || '');
  setInputValue('soc-github', s.github || '');
  setInputValue('soc-twitter', s.twitter || '');
  setInputValue('soc-instagram', s.instagram || '');

  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentData = getData();
    currentData.contact = {
      email: getInputValue('contact-email'),
      location: getInputValue('contact-loc'),
      message: getInputValue('contact-msg-input'),
      formspreeUrl: getInputValue('contact-formspree'),
      web3formsKey: getInputValue('contact-web3forms')
    };

    currentData.social = {
      linkedin: getInputValue('soc-linkedin'),
      github: getInputValue('soc-github'),
      twitter: getInputValue('soc-twitter'),
      instagram: getInputValue('soc-instagram')
    };

    saveData(currentData);
    showSaveMsg('contact-save-msg');
  });
}

// ─── THEME TAB ────────────────────────────────────────────────────────────────
function populateThemeTab() {
  const d = getData();
  const theme = d.theme || DEFAULTS.theme;

  // Render presets
  const presetsContainer = document.getElementById('theme-presets-container');
  presetsContainer.innerHTML = '';
  Object.keys(THEME_PRESETS).forEach(key => {
    const preset = THEME_PRESETS[key];
    const card = document.createElement('div');
    card.className = `theme-preset-card ${theme.preset === key ? 'active' : ''}`;
    card.innerHTML = `
      <div class="preset-name">${preset.name}</div>
      <div class="preset-swatches">
        <div class="preset-swatch" style="background:${preset.colors.bg}"></div>
        <div class="preset-swatch" style="background:${preset.colors.bgCard}"></div>
        <div class="preset-swatch" style="background:${preset.colors.accent}"></div>
        <div class="preset-swatch" style="background:${preset.colors.accentBright}"></div>
      </div>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.theme-preset-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const currentData = getData();
      currentData.theme = {
        preset: key,
        font: preset.font,
        radius: preset.radius,
        colors: { ...preset.colors }
      };
      saveData(currentData);
      applyTheme(currentData.theme);
      syncColorPickers(currentData.theme.colors);
      setInputValue('theme-font', preset.font);
      setInputValue('theme-radius', preset.radius);
      showSaveMsg('theme-save-msg');
    });
    presetsContainer.appendChild(card);
  });

  // Sync color pickers
  syncColorPickers(theme.colors || THEME_PRESETS.forest.colors);
  setInputValue('theme-font', theme.font || "'Inter', sans-serif");
  setInputValue('theme-radius', theme.radius || "12px");

  // Custom theme form
  const form = document.getElementById('custom-theme-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentData = getData();
    const colBg = getInputValue('col-bg');
    const colCard = getInputValue('col-card');
    const colAccent = getInputValue('col-accent');
    const colBright = getInputValue('col-bright');
    const colBorder = getInputValue('col-border');
    const colText = getInputValue('col-text');

    currentData.theme = {
      preset: 'custom',
      font: getInputValue('theme-font'),
      radius: getInputValue('theme-radius'),
      colors: {
        bg: colBg,
        bgSubtle: adjustColorBrightness(colBg, 12),
        bgCard: colCard,
        bgCardAlt: adjustColorBrightness(colCard, 10),
        border: colBorder,
        borderFocus: colBright,
        text: colText,
        textMid: adjustColorBrightness(colText, -25),
        textMuted: adjustColorBrightness(colText, -45),
        accent: colAccent,
        accentBright: colBright,
        accentDark: adjustColorBrightness(colAccent, -30),
        accentGlow: hexToRgba(colAccent, 0.2),
        accentBadge: hexToRgba(colAccent, 0.15)
      }
    };

    saveData(currentData);
    applyTheme(currentData.theme);
    showSaveMsg('theme-save-msg');
  });

  // Real-time color picker update listeners
  setupLiveColorPicker('col-bg', 'hex-bg');
  setupLiveColorPicker('col-card', 'hex-card');
  setupLiveColorPicker('col-accent', 'hex-accent');
  setupLiveColorPicker('col-bright', 'hex-bright');
  setupLiveColorPicker('col-border', 'hex-border');
  setupLiveColorPicker('col-text', 'hex-text');
}

function syncColorPickers(colors) {
  if (!colors) return;
  setColorValue('col-bg', 'hex-bg', colors.bg);
  setColorValue('col-card', 'hex-card', colors.bgCard);
  setColorValue('col-accent', 'hex-accent', colors.accent);
  setColorValue('col-bright', 'hex-bright', colors.accentBright);
  setColorValue('col-border', 'hex-border', colors.border);
  setColorValue('col-text', 'hex-text', colors.text);
}

function setColorValue(inputId, hexSpanId, val) {
  const el = document.getElementById(inputId);
  const span = document.getElementById(hexSpanId);
  if (el && val) el.value = val;
  if (span && val) span.textContent = val;
}

function setupLiveColorPicker(inputId, hexSpanId) {
  const el = document.getElementById(inputId);
  const span = document.getElementById(hexSpanId);
  if (el && span) {
    el.addEventListener('input', () => {
      span.textContent = el.value;
    });
  }
}

// ─── SETTINGS TAB (BACKUP, RESTORE & 1-CLICK GITHUB SYNC) ─────────────────────
function setupSettingsTab() {
  // Password change
  const passForm = document.getElementById('password-change-form');
  passForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPass = document.getElementById('new-password').value;
    const confPass = document.getElementById('confirm-password').value;
    if (newPass !== confPass) {
      alert('Passwords do not match!');
      return;
    }
    localStorage.setItem('portfolio_password', newPass);
    showSaveMsg('password-save-msg');
    passForm.reset();
  });

  // Mobile Sync Link
  document.getElementById('copy-sync-link-btn').addEventListener('click', () => {
    const dataStr = encodeURIComponent(JSON.stringify(getData()));
    const fullUrl = `${window.location.origin}${window.location.pathname.replace('admin.html', 'index.html')}#sync=${dataStr}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      const msg = document.getElementById('sync-link-msg');
      msg.classList.add('show');
      setTimeout(() => msg.classList.remove('show'), 6000);
    });
  });

  // Copy JSON
  document.getElementById('copy-json-btn').addEventListener('click', () => {
    const dataStr = JSON.stringify(getData(), null, 2);
    navigator.clipboard.writeText(dataStr).then(() => {
      alert('✓ Complete portfolio configuration JSON copied to clipboard!');
    });
  });

  // Download data.json
  document.getElementById('export-json-btn').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getData(), null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "data.json");
    dlAnchor.click();
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
        saveData(parsed);
        alert('✓ Portfolio data restored successfully! Reloading...');
        location.reload();
      } catch (err) {
        alert('⚠️ Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  });

  // Reset to Defaults
  document.getElementById('reset-defaults-btn').addEventListener('click', () => {
    if (confirm('⚠️ Are you sure you want to reset all portfolio data to defaults? This cannot be undone.')) {
      localStorage.removeItem('portfolio_data');
      alert('✓ Portfolio reset to default template. Reloading...');
      location.reload();
    }
  });

  // ─── 1-CLICK GITHUB PUBLISH & SYNC ──────────────────────────────────────────
  setupGitHubSync();
}

function setupGitHubSync() {
  const tokenInput = document.getElementById('gh-token');
  const publishBtn = document.getElementById('gh-publish-btn');
  const testBtn = document.getElementById('gh-test-btn');
  const saveTokenBtn = document.getElementById('gh-save-token-btn');
  const sidebarPublishBtn = document.getElementById('sidebar-publish-btn');
  const statusEl = document.getElementById('gh-publish-status');

  // Load saved token if any
  const savedToken = localStorage.getItem('portfolio_gh_token') || '';
  if (tokenInput && savedToken) {
    tokenInput.value = savedToken;
  }

  // Save token button
  if (saveTokenBtn) {
    saveTokenBtn.addEventListener('click', () => {
      const token = tokenInput.value.trim();
      if (token) {
        localStorage.setItem('portfolio_gh_token', token);
        showStatus(statusEl, '✓ GitHub Token saved securely in your browser!', 'var(--green-bright)');
      } else {
        localStorage.removeItem('portfolio_gh_token');
        showStatus(statusEl, 'Token removed.', 'var(--text-muted)');
      }
    });
  }

  // Test Connection button
  if (testBtn) {
    testBtn.addEventListener('click', async () => {
      const token = tokenInput.value.trim();
      if (!token) {
        showStatus(statusEl, '⚠️ Please enter a GitHub Personal Access Token first.', '#f87171');
        return;
      }
      showStatus(statusEl, 'Connecting to GitHub API...', 'var(--text-mid)');
      try {
        const userRes = await fetch('https://api.github.com/user', {
          headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
        });
        if (!userRes.ok) throw new Error('Invalid token or insufficient permissions.');
        const userData = await userRes.json();
        showStatus(statusEl, `✓ Connected to GitHub as @${userData.login}! Token is valid.`, 'var(--green-bright)');
      } catch (err) {
        showStatus(statusEl, `⚠️ GitHub Error: ${err.message}`, '#f87171');
      }
    });
  }

  // Publish to GitHub Handler
  async function handlePublish() {
    const token = tokenInput ? tokenInput.value.trim() : (localStorage.getItem('portfolio_gh_token') || '');
    if (!token) {
      // Switch to settings tab and highlight input
      document.querySelector('[data-tab="settings"]').click();
      if (tokenInput) tokenInput.focus();
      showStatus(statusEl, '⚠️ Please provide a GitHub Personal Access Token to publish.', '#f87171');
      return;
    }

    // Save token for future clicks
    localStorage.setItem('portfolio_gh_token', token);

    showStatus(statusEl, '⏳ Connecting to GitHub repository...', 'var(--text-mid)');
    if (publishBtn) publishBtn.disabled = true;

    try {
      // 1. Identify GitHub user and determine repo name from URL or origin
      const userRes = await fetch('https://api.github.com/user', {
        headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
      });
      if (!userRes.ok) throw new Error('Could not authenticate with GitHub token. Please check permissions.');
      const userData = await userRes.json();
      const owner = userData.login;

      // Extract repo name from path (e.g., /portfolio/ or fallback to portfolio)
      let repo = 'portfolio';
      const pathParts = window.location.pathname.split('/').filter(p => p && !p.endsWith('.html'));
      if (pathParts.length > 0) {
        repo = pathParts[0];
      }

      showStatus(statusEl, `⏳ Fetching repository ${owner}/${repo}...`, 'var(--text-mid)');

      // 2. Fetch current data.json file info to get its SHA (required for updating)
      let fileSha = null;
      try {
        const fileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/data.json`, {
          headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' }
        });
        if (fileRes.ok) {
          const fileData = await fileRes.json();
          fileSha = fileData.sha;
        }
      } catch (e) {}

      // 3. Prepare updated data.json content in base64
      const currentData = getData();
      const jsonContent = JSON.stringify(currentData, null, 2);
      
      // UTF-8 to Base64 (supporting all international characters and emojis)
      const utf8Bytes = new TextEncoder().encode(jsonContent);
      let binaryStr = '';
      const chunkSize = 8192;
      for (let i = 0; i < utf8Bytes.length; i += chunkSize) {
        binaryStr += String.fromCharCode.apply(null, utf8Bytes.subarray(i, i + chunkSize));
      }
      const base64Content = btoa(binaryStr);

      showStatus(statusEl, `⏳ Pushing updated data.json to GitHub (${owner}/${repo})...`, 'var(--text-mid)');

      // 4. Send PUT request to GitHub Contents API
      const putBody = {
        message: `Update portfolio content via Admin Dashboard (${new Date().toLocaleTimeString()})`,
        content: base64Content,
        branch: 'main'
      };
      if (fileSha) putBody.sha = fileSha;

      const pushRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/data.json`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(putBody)
      });

      if (!pushRes.ok) {
        const errJson = await pushRes.json();
        throw new Error(errJson.message || 'GitHub upload failed');
      }

      showStatus(
        statusEl,
        `✓ Success! Published directly to ${owner}/${repo}. GitHub Pages will update your live site in ~30 seconds!`,
        'var(--green-bright)'
      );
    } catch (err) {
      showStatus(statusEl, `⚠️ Publish failed: ${err.message}`, '#f87171');
    } finally {
      if (publishBtn) publishBtn.disabled = false;
    }
  }

  if (publishBtn) publishBtn.addEventListener('click', handlePublish);
  if (sidebarPublishBtn) sidebarPublishBtn.addEventListener('click', handlePublish);
}

function showStatus(el, msg, color = 'inherit') {
  if (!el) return;
  el.textContent = msg;
  el.style.color = color;
  el.classList.add('show');
}

// ─── MODAL CONTROLS ───────────────────────────────────────────────────────────
function setupModals() {
  document.querySelectorAll('.modal-close, [data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modal;
      if (modalId) closeModal(modalId);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.hidden = true;
      }
    });
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.hidden = false;
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.hidden = true;
}

function showSaveMsg(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
  }
}

// ─── COLOR UTILITIES ──────────────────────────────────────────────────────────
function adjustColorBrightness(hex, percent) {
  if (!hex || hex[0] !== '#') return hex;
  let num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00FF) + percent;
  let b = (num & 0x0000FF) + percent;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function hexToRgba(hex, alpha) {
  if (!hex || hex[0] !== '#') return hex;
  let num = parseInt(hex.slice(1), 16);
  let r = (num >> 16);
  let g = ((num >> 8) & 0x00FF);
  let b = (num & 0x0000FF);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
