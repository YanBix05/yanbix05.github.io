# Fean Yan Droz Sehi Bi — Personal Portfolio

A clean, modern, responsive personal portfolio website built with plain
HTML5, CSS3 and JavaScript — no frameworks, no build step, and easy to
host for free on GitHub Pages.

**Live preview (after deployment):** `https://USERNAME.github.io/`

---

## Project structure

```
portfolio/
├── index.html          Main page — all section content lives here
├── css/
│   └── style.css        Styling, layout, light/dark theme tokens
├── js/
│   └── script.js         Theme toggle, mobile menu, animations, GitHub API, contact form
├── assets/
│   ├── profile.svg       Placeholder avatar (swap for profile.jpg)
│   ├── profile.jpg       ← add your own photo here
│   ├── resume.pdf        ← add your own CV/resume PDF here
│   └── README.md         Notes on the two files above
└── README.md             This file
```

---

## Features

- Dark / light mode, saved in the browser and respecting the visitor's
  OS-level preference on first visit
- Fully responsive: desktop, tablet and mobile layouts
- Smooth scrolling and a subtle scroll-reveal animation (respects
  `prefers-reduced-motion` for accessibility)
- Categorized skill cards with plain-language levels (Familiar /
  Intermediate / Learning) — no invented percentages
- Project cards linking out to GitHub
- A live "GitHub repositories" section that calls the public GitHub API,
  with a graceful fallback message if the API is unavailable or your
  username hasn't been set yet
- A contact form that opens the visitor's email client via a `mailto:`
  link (no backend/server required)
- Semantic HTML, alt text, visible focus states and a skip-to-content
  link for accessibility
- SEO meta tags (title, description, Open Graph) for better link previews

---

## 1. Running it locally

No build tools or installation required — it's static HTML/CSS/JS.

**Option A — just open the file**
Double-click `index.html` (or right-click → Open with → your browser).

**Option B — use a local server (recommended)**
A local server avoids some browser restrictions (useful once you add
real content/fetch calls). If you have Python installed:

```bash
cd portfolio
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## 2. Customizing your content

Before deploying, search `index.html` and `js/script.js` for these
placeholders and replace them with your own details:

| Placeholder | Where | Replace with |
|---|---|---|
| `USERNAME` | `index.html` (GitHub/LinkedIn links), `js/script.js` (`GITHUB_USERNAME`) | Your actual GitHub username |
| `linkedin.com/in/USERNAME` | `index.html` | Your actual LinkedIn URL |
| `your.email@example.com` | `index.html`, `js/script.js` (`RECIPIENT_EMAIL`) | Your actual email address |
| `assets/profile.svg` | `index.html` hero section | Change to `assets/profile.jpg` once you've added a real photo |
| `assets/resume.pdf` | `index.html` "Download CV" button | Add your actual resume PDF with this exact filename |

See `assets/README.md` for details on the two files you need to add.

---

## 3. Uploading to GitHub

1. Create a new repository on GitHub.
   - If you want the site at `https://USERNAME.github.io/` (no extra path),
     name the repository exactly `USERNAME.github.io`.
   - Any other repository name also works — your site will just be served
     from `https://USERNAME.github.io/repository-name/` instead.
2. From inside the `portfolio` folder, run:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

(Replace `USERNAME` and `REPO-NAME` with your actual GitHub username and
repository name.)

---

## 4. Deploying with GitHub Pages

1. On GitHub, open your repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Choose the **main** branch and the **/ (root)** folder, then **Save**.
5. Wait a minute or two — GitHub will give you a live URL at the top of
   the Pages settings page.

Every time you push new changes to the `main` branch, the live site
updates automatically within a minute or two.

---

## 5. Suggestions for improving the portfolio as you grow

- **Add more projects** as you build them — just copy an existing
  `<article class="card project-card">` block in `index.html` and edit it.
- **Add a "Live Demo" button** to any project card once you deploy a
  working demo somewhere (e.g. a small web app on GitHub Pages or
  Render) — copy the existing GitHub button and point it at the demo URL.
- **Add earlier education entries** using the commented template inside
  the Education section of `index.html`.
- **Add certifications** (if you complete any) as a new section, following
  the same `.card` pattern used for skills/projects.
- **Replace the mailto contact form** with a real backend later (e.g.
  Formspree, Netlify Forms, or your own small API) once you're
  comfortable — the form's HTML structure will work with most of these
  services with minimal changes.
- **Add unit/accessibility testing** (e.g. Lighthouse in Chrome DevTools)
  periodically to keep performance and accessibility scores high as the
  site grows.
- **Consider a blog/notes section** if you start writing about what
  you're learning — this is a strong signal for internship and graduate
  applications.

---

## Notes

This site intentionally avoids inventing any achievements, certifications,
companies or job titles beyond what was provided — update the content
directly in `index.html` as your experience grows.
