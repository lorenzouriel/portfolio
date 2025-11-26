# Lorenzo Uriel's Portfolio 🚀

[![Jekyll](https://img.shields.io/badge/Jekyll-CC0000?style=for-the-badge&logo=Jekyll&logoColor=white)](https://jekyllrb.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=GitHub%20Pages&logoColor=white)](https://pages.github.com/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

> A bilingual, fully responsive portfolio website showcasing data engineering, DevOps, and AI projects with modern tech stack.

**Live Site:** [lorenzouriel.com](https://lorenzouriel.com)

---

## ✨ Features

### 🌐 Bilingual Support (EN/PT)
- Seamless language switching between English and Portuguese
- Automatic content translation for all UI elements
- Individual project translations with fallback support
- Fixed language switcher in top-right corner

### 📱 Fully Responsive Design
- Mobile-first approach optimized for all screen sizes
- Tablet and phone specific breakpoints
- Responsive typography, spacing, and images
- Touch-friendly navigation and buttons

### 🎨 Modern Portfolio Features
- Hero section with GitHub avatar integration
- 9 featured projects with bilingual support
- Project cards with images, tags, and descriptions
- Social media integration (LinkedIn, GitHub, Medium)
- Calendly scheduling widget
- Pagination for project listings

### 🛠️ Developer-Friendly
- Jekyll static site generator
- SASS/SCSS modular styling
- Bootstrap 3 responsive grid
- Font Awesome icons
- Smooth scroll animations (WOW.js)
- Google Analytics ready

---

## 🚀 Quick Start

### Prerequisites

- Ruby 2.7+
- Jekyll 4.0+
- Bundler
- Git

### Installation

```bash
# 1. Clone repository
git clone https://github.com/lorenzouriel/portfolio.git
cd portfolio

# 2. Install dependencies
gem install bundler
bundle install

# 3. Run local server
bundle exec jekyll serve

# 4. Open browser
# Visit http://localhost:4000
```

### Configuration

Edit `_config.yml` with your information:

```yaml
title: "Your Name"
email: 'your.email@example.com'
description: "Your bio description"
url: "https://yoursite.com"

# Social Links
github_username: 'your-github'
linkedin_username: 'your-linkedin'
medium_username: 'medium.com/@your-handle'
calendly_username: 'your-calendly/meeting'

# Analytics
google_analytics: 'G-XXXXXXXXXX'
```

---

## 📁 Project Structure

```
portfolio/
├── _data/
│   └── translations.yml          # Bilingual translations (EN/PT)
├── _includes/
│   ├── home-hero.html           # Hero section with bio
│   ├── language-switcher.html   # EN/PT toggle
│   ├── post-content.html        # Project card template
│   ├── header.html              # Site header
│   └── footer.html              # Site footer
├── _layouts/
│   ├── home.html                # Homepage (pagination)
│   ├── inner.html               # Project detail pages
│   └── default.html             # Base layout
├── _posts/
│   └── 2025-*-*.md              # Project markdown files
├── _sass/
│   └── bootstrap/               # Bootstrap styles
├── css/
│   └── style.scss               # Main stylesheet
├── js/
│   ├── language-switcher.js     # Language switching logic
│   └── wow.min.js               # Scroll animations
├── img/posts/                   # Project images
├── pt/index.html                # Portuguese homepage
├── index.html                   # English homepage
└── _config.yml                  # Jekyll configuration
```

---

## 🌐 Bilingual System

### How It Works

**Two Language Versions:**
- **English (`/`)** - Default, uses pagination
- **Portuguese (`/pt/`)** - Shows all projects

**Language Switcher:**
- Fixed in top-right corner
- Active language highlighted in orange
- Smooth URL transitions

### Adding Translations

#### 1. UI Elements (`_data/translations.yml`)

```yaml
en:
  site_title: "Hello. I'm Lorenzo Uriel."
  latest_work: "Latest Work"
  visit_project: "Visit Project"

pt:
  site_title: "Olá. Eu sou Lorenzo Uriel."
  latest_work: "Últimos Trabalhos"
  visit_project: "Visitar Projeto"
```

#### 2. Project Posts

Add to your markdown front matter:

```yaml
---
title: "Project Title"
title_pt: "Título do Projeto"
lead_text: "Project description in English"
lead_text_pt: "Descrição do projeto em português"
---
```

**See [HOW_TO_TRANSLATE_POSTS.md](HOW_TO_TRANSLATE_POSTS.md) for detailed guide.**

---

## 📝 Creating New Projects

1. Create file in `_posts/` with format: `YYYY-MM-DD-project-name.md`

2. Add front matter:

```yaml
---
layout: inner
position: left  # alternates with 'right'
title: "Your Project Title"
title_pt: "Título do Seu Projeto"
date: 2025-01-01 12:00:00
categories: category1 category2
tags: Tag1 Tag2 Tag3
featured_image: '/img/posts/your-image.png'
project_link: 'https://github.com/username/repo'
button_icon: 'github'  # github, medium, or external-link
lead_text: "Short English description"
lead_text_pt: "Descrição curta em português"
---

Your detailed project content in Markdown...
```

3. Add featured image to `img/posts/` (recommended: 1200x600px)

---

## 🎨 Customization

### Colors

Edit in `css/style.scss`:

```scss
$primary: #0a0a0a;      // Dark text
$secondary: #FF7B7B;    // Accent color
```

### Responsive Breakpoints

```scss
@include bp-xsmall { }  // ≤ 768px (phones)
@include bp-small { }   // 770px - 990px (tablets)
@include bp-medium { }  // 992px - 1195px (tablets landscape)
@include bp-large { }   // ≥ 1200px (desktops)
```

### Social Links

Update in `_config.yml`:

```yaml
github_username: 'your-username'
linkedin_username: 'your-profile'
medium_username: 'medium.com/@handle'
calendly_username: 'user/meeting-type'
```

---

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub
2. Settings → Pages
3. Select `master` branch
4. Save

**Custom Domain:**
- Add `CNAME` file with your domain
- Configure DNS records

### Manual Build

```bash
bundle exec jekyll build
# Deploy _site/ folder to your server
```

### Netlify/Vercel

**Build command:** `jekyll build`
**Publish directory:** `_site`

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Generator** | Jekyll 4.x, Ruby, Liquid |
| **Frontend** | Bootstrap 3, SASS, JavaScript ES6 |
| **Icons** | Font Awesome 4.5 |
| **Animations** | WOW.js, Animate.css |
| **Fonts** | Open Sans, Merriweather |
| **Analytics** | Google Analytics |
| **Integrations** | Calendly |

---

## 📚 Documentation

- [BILINGUAL_SETUP.md](BILINGUAL_SETUP.md) - Complete bilingual guide
- [HOW_TO_TRANSLATE_POSTS.md](HOW_TO_TRANSLATE_POSTS.md) - Translation tutorial
- [LANGUAGE_GUIDE.md](LANGUAGE_GUIDE.md) - Language system docs
- [TRANSLATION_STATUS.md](TRANSLATION_STATUS.md) - What's translated

---

## 📊 Portfolio Stats

- **9 Featured Projects** - All bilingual
- **2 Languages** - English & Portuguese
- **100% Responsive** - All devices
- **SEO Optimized** - Semantic HTML
- **Fast Loading** - Optimized assets

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 👤 Author

**Lorenzo Uriel**

- Website: [lorenzouriel.com](https://lorenzouriel.com)
- GitHub: [@lorenzouriel](https://github.com/lorenzouriel)
- LinkedIn: [@lorenzo-uriel](https://linkedin.com/in/lorenzo-uriel)
- Medium: [@lorenzouriel](https://medium.com/@lorenzouriel)

---

## 🙏 Credits

- [Jekyll](https://jekyllrb.com/) - Static site generator
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [WOW.js](https://wowjs.uk/) - Animations
- [Phantom Theme](https://github.com/jamigibbs/phantom) - Original inspiration

---

**Built with ❤️ by Lorenzo Uriel** | **Feito com ❤️ por Lorenzo Uriel**
