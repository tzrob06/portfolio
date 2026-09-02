# Thomas Z. Roberts | Personal Portfolio & Web Platform

[![Live Demo](https://img.shields.io/badge/Live_Site-tzrob06.github.io%2Fportfolio-4ade80?style=for-the-badge&logo=githubpages&logoColor=black)](https://tzrob06.github.io/portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A modern, responsive, and dynamic personal portfolio web platform designed for **Thomas Z. Roberts**, an Engineering and Computer Science student at Trinity College (Class of 2028). 

The platform features an integrated client-side Content Management System (CMS) with an administrative control panel, allowing real-time content updates, theme customization, image compression, and 1-click live synchronization to GitHub Pages.

---

## 🏛️ Academic & Professional Summary

* **Scholar**: Thomas Z. Roberts
* **Institution**: Trinity College (Hartford, CT) · Class of 2028
* **Major**: B.S. in Engineering & Computer Science
* **Honors**: Deans' Scholar, Faculty Honors Recipient
* **Leadership & Experience**: Quantitative Tutor at Aetna Quantitative Center, Member of Trinity Computer Science Club & Running Club

---

## ✨ System Architecture & Key Features

### 1. Modern Responsive UI / UX
* **Design Aesthetic**: Modern dark-mode editorial theme (*Forest Obsidian*) with clean typography, glowing accents, and glassmorphism elements.
* **Performance-First**: Pure vanilla HTML5, CSS3, and modern ES6+ JavaScript without bloated external dependencies.
* **Cross-Device Compatibility**: Fully optimized for desktops, tablets, and mobile devices with fluid CSS Grid and Flexbox layouts.
* **Accessibility**: Semantic HTML landmarks, ARIA labels, high contrast ratios, and keyboard navigation support.

### 2. Integrated Client-Side CMS & Admin Dashboard (`admin.html`)
* **Secure Local Authentication**: Password-protected administrative interface for site configuration.
* **Dynamic Content Management**: Edit profile bios, headlines, university information, employment/tutoring history, projects, and skills without editing code.
* **Real-Time Theming Engine**: Switch between pre-configured palettes (*Forest Obsidian, Midnight Charcoal, Sage Light, Deep Cosmos, Warm Espresso*) or define custom CSS variable color schemes and typography.
* **In-Browser Image Optimization**: Client-side canvas compression engine that downscales high-resolution camera photos (~10–20MB) to lightweight web assets (~60–80KB) with drag-and-drop and clipboard paste support.

### 3. GitHub REST API Live Sync & Continuous Delivery
* **1-Click Live Publishing**: Push local CMS changes directly to the remote repository via the GitHub Contents REST API (`data.json`), triggering immediate deployment on GitHub Pages.
* **Automated Data Hydration**: Visitors fetch cached-busted configuration from `data.json` for persistent, real-time updates across all remote browsers.
* **Mobile Synchronization**: URL hash payload encoding allows instant configuration transfer across devices.

### 4. Direct Email Inbox Integration & Message Archive
* **Serverless Contact Delivery**: Seamless form submission powered by Web3Forms / Formspree with direct inbox delivery.
* **In-App Message Archive**: Submissions are archived within the Admin Inbox tab for review, search, and status tracking.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5 / CSS3 / JavaScript (ES6+) | Vanilla client-side web application |
| **Typography** | Inter, Space Grotesk, Outfit, Playfair Display | Google Fonts CDN |
| **Data Layer** | JSON (`data.json`) / Web Storage API | Declarative structured schema with `localStorage` fallback |
| **API Integration** | GitHub REST API v3 / Web3Forms API | Remote repository commits and serverless email delivery |
| **Hosting & CI/CD**| GitHub Pages | Static web hosting and continuous deployment |

---

## 📁 Repository Structure

```plaintext
portfolio/
├── index.html        # Public portfolio homepage
├── admin.html        # Administrative CMS and settings dashboard
├── style.css         # Core stylesheet, animations, and CSS custom property theme tokens
├── script.js         # Public application controller, theme applier, and data hydrator
├── admin.js          # Admin controller, image compressor, and GitHub API publisher
├── data.json         # Structured content database for portfolio configuration
└── README.md         # Project documentation and system specification
```

---

## 🚀 Getting Started

### Local Development
To run this project locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tzrob06/portfolio.git
   cd portfolio
   ```

2. **Open in any modern web browser**:
   * Double-click `index.html` to view the public portfolio.
   * Double-click `admin.html` to access the administrative dashboard (Default password: `admin123`).

3. **Or serve via a local HTTP server**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (npx)
   npx serve .
   ```

---

## 🔒 Security & Privacy

* GitHub Personal Access Tokens and Admin authentication credentials are stored locally in client `localStorage` and are never committed to version control.
* Email dispatch keys are obfuscated through declarative endpoint bindings.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use and adapt for academic and personal portfolios.

---

## 📬 Contact & Connect

* **Website**: [tzrob06.github.io/portfolio](https://tzrob06.github.io/portfolio/)
* **LinkedIn**: [linkedin.com/in/thomaszroberts](https://www.linkedin.com/in/thomaszroberts/)
* **GitHub**: [@tzrob06](https://github.com/tzrob06)
