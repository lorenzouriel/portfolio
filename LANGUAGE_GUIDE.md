# Language Switcher Guide

This portfolio now supports bilingual content (English and Portuguese).

## How It Works

### 1. Language Switcher
A fixed language switcher appears in the top-right corner of every page:
- **EN** - English version
- **PT** - Portuguese (Português) version

### 2. File Structure
```
portfolio/
├── index.html          # English homepage (default)
├── pt/
│   └── index.html      # Portuguese homepage
├── _data/
│   └── translations.yml # Translation strings
└── js/
    └── language-switcher.js # Language switching logic
```

### 3. Using Translations

#### In Your Templates
To use translated strings in your HTML templates:

```liquid
{% assign t = site.data.translations[page.lang] | default: site.data.translations[site.default_lang] %}

<h1>{{ t.site_title }}</h1>
<p>{{ t.site_description }}</p>
```

#### Adding New Translations
Edit `_data/translations.yml`:

```yaml
en:
  your_key: "Your English text"

pt:
  your_key: "Seu texto em português"
```

### 4. Creating Bilingual Pages

#### English Page (default)
Create pages normally in the root directory:
```
/about.html
/contact.html
```

#### Portuguese Page
Create the Portuguese version in the `pt/` directory:
```
/pt/about.html
/pt/contact.html
```

Add `lang: pt` to the front matter:
```yaml
---
layout: default
lang: pt
title: Sobre
---
```

### 5. Creating Bilingual Blog Posts

For blog posts, you can add a `lang` field to the front matter:

**English Post:**
```yaml
---
layout: inner
title: "My Project"
lang: en
---
```

**Portuguese Post:**
```yaml
---
layout: inner
title: "Meu Projeto"
lang: pt
---
```

### 6. Styling

The language switcher is styled in `css/style.scss` under the `.language-switcher` class. It's:
- Fixed to the top-right corner
- Fully responsive (adjusts for mobile)
- Has hover effects and active state indicators

### 7. URL Structure

- **English:** `https://lorenzouriel.com/`
- **Portuguese:** `https://lorenzouriel.com/pt/`

The JavaScript handles smooth transitions between languages while preserving the current page path.

## Customization

### Change Languages
Edit `_config.yml`:
```yaml
default_lang: en
languages: ["en", "pt", "es"]  # Add more languages
```

### Modify Switcher Position
In `css/style.scss`, adjust:
```scss
.language-switcher {
  position: fixed;
  top: 20px;    // Change vertical position
  right: 20px;  // Change horizontal position
}
```

### Add More Translations
Simply add new keys to `_data/translations.yml` for both languages.

## Example: Translating the Hero Section

**Original (home-hero.html):**
```liquid
{% assign t = site.data.translations[page.lang] | default: site.data.translations[site.default_lang] %}

<h1>{{ t.site_title }}</h1>
<p>{{ t.site_description }}</p>
```

This automatically shows the correct translation based on the current page's language!
