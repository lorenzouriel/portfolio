# Translation Status

## What's Being Translated

The following content now automatically translates between English and Portuguese:

### ✅ Home Page (`/` and `/pt/`)
- **Site Title**: "Hello. I'm Lorenzo Uriel." → "Olá. Eu sou Lorenzo Uriel."
- **Site Description**: Full bio text
- **Latest Work Section**: "Latest Work" → "Últimos Trabalhos"
- **Calendly Text**: "If you or your company needs help..." → "Se você ou sua empresa precisa de ajuda..."
- **Calendly Link**: "get in contact here" → "entre em contato aqui"
- **Project Buttons**: "Visit Project" → "Visitar Projeto"
- **Footer**: "© 2025 Lorenzo Uriel" (same in both languages)

### Static Elements (Not Translated)
These remain the same in both languages:
- Social media button labels (LinkedIn, Github, Medium)
- Your name and profile image
- Project titles and descriptions (these are in the markdown files)
- Tags and categories

## How to Test

1. **Start Jekyll server:**
   ```bash
   bundle exec jekyll serve
   ```

2. **Visit pages:**
   - English: `http://localhost:4000/`
   - Portuguese: `http://localhost:4000/pt/`

3. **Test the switcher:**
   - Click "EN" or "PT" in the top-right corner
   - Content should change language

## Adding More Translations

Edit `_data/translations.yml` to add new translatable strings:

```yaml
en:
  new_key: "English text"

pt:
  new_key: "Texto em português"
```

Then use in templates:
```liquid
{% assign current_lang = page.lang | default: site.default_lang %}
{% assign t = site.data.translations[current_lang] %}

{{ t.new_key }}
```

## Creating Bilingual Blog Posts

For blog posts, you can create separate versions:

**English:** `_posts/2025-11-16-azure-data-platform-terraform.md`
```yaml
---
layout: inner
title: "Azure Data Platform with Terraform"
lang: en
---
```

**Portuguese:** `_posts/2025-11-16-azure-data-platform-terraform-pt.md`
```yaml
---
layout: inner
title: "Plataforma de Dados Azure com Terraform"
lang: pt
---
```

## Notes

- The language switcher appears fixed in the top-right corner
- The active language is highlighted in orange
- All responsive improvements work on both language versions
- You need to **restart Jekyll** after modifying `_config.yml`
