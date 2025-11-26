# Bilingual Portfolio Setup - Complete Guide

## ✅ What's Working

Your portfolio now has full bilingual support with English and Portuguese!

### Pages Structure:
- **English**: `/` (uses pagination for posts)
- **Portuguese**: `/pt/` (shows all posts)

### What Translates:

| Element | English | Portuguese |
|---------|---------|------------|
| Site Title | "Hello. I'm Lorenzo Uriel." | "Olá. Eu sou Lorenzo Uriel." |
| Description | "Passionate about Data, Technology..." | "Apaixonado por Dados, Tecnologia..." |
| Section Header | "Latest Work" | "Últimos Trabalhos" |
| Calendly Text | "If you or your company needs help..." | "Se você ou sua empresa precisa..." |
| Calendly Link | "get in contact here" | "entre em contato aqui" |
| Project Button | "Visit Project" | "Visitar Projeto" |
| Footer | "© 2025 Lorenzo Uriel" | "© 2025 Lorenzo Uriel" |

## How It Works

### 1. Translation Data
All translations are stored in `_data/translations.yml`:
```yaml
en:
  site_title: "Hello. I'm Lorenzo Uriel."
  # ...

pt:
  site_title: "Olá. Eu sou Lorenzo Uriel."
  # ...
```

### 2. Language Detection
Each layout file detects the language from the page's front matter:
```liquid
{% assign current_lang = page.lang | default: site.default_lang %}
{% assign t = site.data.translations[current_lang] %}
```

### 3. Language Switcher
- Fixed position in top-right corner
- Shows: `EN | PT`
- Clicking toggles between `/` and `/pt/`
- Active language highlighted in orange

## File Structure

```
portfolio/
├── index.html              # English homepage (paginated)
├── pt/
│   └── index.html          # Portuguese homepage (all posts)
├── _data/
│   └── translations.yml    # Translation strings
├── _layouts/
│   ├── home.html          # Homepage layout (EN with pagination)
│   ├── default.html       # Default layout
│   └── inner.html         # Inner page layout
├── _includes/
│   ├── home-hero.html     # Hero section (uses translations)
│   ├── footer.html        # Footer (uses translations)
│   ├── post-content.html  # Post content (uses translations)
│   └── language-switcher.html  # Language switcher
├── js/
│   └── language-switcher.js    # Language switching logic
└── css/
    └── style.scss         # Includes language switcher styles
```

## Pagination vs All Posts

### English (`/`)
- Uses Jekyll pagination (10 posts per page)
- Navigation: Page 1, 2, 3, etc.
- Layout: `home.html`

### Portuguese (`/pt/`)
- Shows all posts on one page
- No pagination needed
- Custom layout inline in `pt/index.html`
- Posts sorted by date (newest first)

**Why different?**
Jekyll's `jekyll-paginate` v1 plugin only supports pagination at one path (the root `/`). For the Portuguese version, we show all posts directly, which is fine if you have fewer than ~20 posts.

## Adding More Translations

### 1. Add to Translation File
Edit `_data/translations.yml`:
```yaml
en:
  new_text: "English version"

pt:
  new_text: "Versão em português"
```

### 2. Use in Templates
```liquid
{{ t.new_text }}
```

### 3. Restart Jekyll
After modifying `_config.yml` or `_data/*.yml`, restart your server.

## Creating Bilingual Blog Posts

### Option 1: Same Posts, Translated UI
Keep your posts in English, just translate the UI elements (buttons, labels). This is what's currently implemented.

### Option 2: Separate Posts Per Language
Create duplicate posts with language tags:

**English Post:**
```yaml
---
title: "Azure Data Platform with Terraform"
lang: en
---
```

**Portuguese Post:**
```yaml
---
title: "Plataforma de Dados Azure com Terraform"
lang: pt
---
```

Then filter in `pt/index.html`:
```liquid
{% assign sorted_posts = site.posts | where: "lang", "pt" | sort: 'date' | reverse %}
```

## Testing

1. **Start Jekyll:**
   ```bash
   bundle exec jekyll serve
   ```

2. **Visit both versions:**
   - English: `http://localhost:4000/`
   - Portuguese: `http://localhost:4000/pt/`

3. **Test switcher:**
   - Click EN/PT in top-right
   - Verify translation changes
   - Check all posts appear on both versions

## Deployment

Both language versions will deploy together:
- `/` → English homepage
- `/pt/` → Portuguese homepage
- All posts accessible from both
- Language switcher works on all pages

## Customization

### Change Switcher Position
In `css/style.scss`:
```scss
.language-switcher {
  position: fixed;
  top: 20px;      // Adjust vertical position
  right: 20px;    // Adjust horizontal position
}
```

### Add Third Language
1. Add to `_config.yml`:
   ```yaml
   languages: ["en", "pt", "es"]
   ```

2. Add translations in `_data/translations.yml`:
   ```yaml
   es:
     site_title: "Hola. Soy Lorenzo Uriel."
     # ...
   ```

3. Create `es/index.html` (copy from `pt/index.html`)

4. Update `_includes/language-switcher.html` to add ES link

That's it! Your bilingual portfolio is fully configured and ready to use. 🎉
