/* =====================================================================
   script.js
   All the interactive behavior for the portfolio, in small, commented
   pieces. Each feature is wrapped in its own function so you can read,
   change or remove any one part without breaking the others.
===================================================================== */

/* ---------------------------------------------------------------------
   1. DARK / LIGHT THEME TOGGLE
   - Reads the saved preference from localStorage (if any)
   - Falls back to the visitor's OS-level preference
   - Saves the choice so it persists on the next visit
--------------------------------------------------------------------- */
function initTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply the saved theme, or fall back to the OS preference
  if (saved === 'dark' || (!saved && prefersDark)) {
    root.setAttribute('data-theme', 'dark');
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

/* ---------------------------------------------------------------------
   2. MOBILE NAVIGATION MENU
   Toggles the nav links open/closed on small screens and closes the
   menu again once a link is tapped.
--------------------------------------------------------------------- */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------------------
   3. SCROLL-REVEAL ANIMATION
   Uses IntersectionObserver (a built-in browser API) to add the
   "in-view" class to each section as it scrolls into the viewport.
   This is intentionally subtle and respects prefers-reduced-motion
   (handled in CSS).
--------------------------------------------------------------------- */
function initScrollReveal() {
  const sections = document.querySelectorAll('.reveal');

  // Only hide-then-reveal once JS has confirmed it's running. Sections
  // are visible by default in the CSS, so a page with JS disabled (or a
  // script error) still shows all content normally.
  sections.forEach((section) => section.classList.add('js-reveal-init'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------------------
   4. GITHUB REPOSITORIES (live, via the public GitHub API)
   Fetches the visitor's public repos and renders them as cards.
   If the request fails for any reason (offline, rate-limited, or the
   USERNAME placeholder hasn't been changed yet), a friendly fallback
   message is shown instead so the page never looks broken.
--------------------------------------------------------------------- */
async function loadGitHubRepos() {
  const GITHUB_USERNAME = 'USERNAME'; // <-- replace with your real GitHub username
  const repoGrid = document.getElementById('repoGrid');

  // Don't even attempt the request until the placeholder has been replaced
  if (GITHUB_USERNAME === 'YanBix05') {
    repoGrid.innerHTML = `
      <div class="repo-fallback">
        Set your real GitHub username in js/script.js (YanBix05) to load your repositories here automatically.
      </div>`;
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${YanBix05}/repos?sort=updated&per_page=6`
    );

    if (!response.ok) throw new Error('GitHub API request failed');

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      repoGrid.innerHTML = `<div class="repo-fallback">No public repositories found yet.</div>`;
      return;
    }

    repoGrid.innerHTML = repos
      .map(
        (repo) => `
        <article class="card repo-card">
          <h3>${repo.name}</h3>
          <p>${repo.description ? repo.description : 'No description provided.'}</p>
          <div class="tag-row">
            ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
            <span class="tag">★ ${repo.stargazers_count}</span>
          </div>
          <div class="btn-row">
            <a href="${repo.html_url}" class="btn btn-outline btn-sm" target="_blank" rel="noopener">View Repo</a>
          </div>
        </article>`
      )
      .join('');
  } catch (error) {
    // Network error, rate limit, or API unavailable — fail gracefully
    repoGrid.innerHTML = `
      <div class="repo-fallback">
        Live repositories couldn't be loaded right now. Visit the GitHub profile link above instead.
      </div>`;
    console.warn('GitHub API fetch failed:', error);
  }
}

/* ---------------------------------------------------------------------
   5. CONTACT FORM (mailto — no backend)
   Since this is a static site with no server, the form builds a
   mailto: link from the entered values and opens the visitor's email
   client with everything pre-filled.
--------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const RECIPIENT_EMAIL = 'yandrozbix@gmail.com'; // <-- replace with your real email

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);

    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  });
}

/* ---------------------------------------------------------------------
   6. FOOTER YEAR
   Keeps the copyright year in the footer accurate without manual edits.
--------------------------------------------------------------------- */
function setFooterYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------------------
   INITIALIZE EVERYTHING ONCE THE PAGE HAS LOADED
--------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollReveal();
  loadGitHubRepos();
  initContactForm();
  setFooterYear();
});
