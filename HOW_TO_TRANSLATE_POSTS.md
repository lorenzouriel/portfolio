# How to Translate Your Blog Posts to Portuguese

## Quick Guide

To make your posts appear in Portuguese, you need to add two fields to each post's front matter:
- `title_pt` - Portuguese title
- `lead_text_pt` - Portuguese description/excerpt

## Example

### Before (English only):
```yaml
---
layout: inner
position: left
title: "Azure Data Platform with Terraform"
lead_text: "Complete Infrastructure-as-Code setup for deploying a comprehensive Azure data platform with Terraform, including Data Lake, Databricks, Synapse Analytics, and Event Hub."
---
```

### After (Bilingual):
```yaml
---
layout: inner
position: left
title: "Azure Data Platform with Terraform"
title_pt: "Plataforma de Dados Azure com Terraform"
lead_text: "Complete Infrastructure-as-Code setup for deploying a comprehensive Azure data platform with Terraform, including Data Lake, Databricks, Synapse Analytics, and Event Hub."
lead_text_pt: "Configuração completa de Infraestrutura como Código para implantar uma plataforma de dados Azure abrangente com Terraform, incluindo Data Lake, Databricks, Synapse Analytics e Event Hub."
---
```

## Your Posts to Translate

Here's a template for each of your posts. Copy and paste these into your markdown files:

### 1. Free DW OLAP Sales Analysis
**File:** `_posts/2025-11-01-free-dw-olap-sales-analysis.md`

Add these lines:
```yaml
title_pt: "Análise de Vendas DW OLAP Gratuita"
lead_text_pt: "[Add Portuguese description here]"
```

### 2. CI/CD SQL Server Multi-Environment
**File:** `_posts/2025-11-10-cicd-sql-server-multi-env.md`

Add these lines:
```yaml
title_pt: "CI/CD SQL Server Multi-Ambiente"
lead_text_pt: "[Add Portuguese description here]"
```

### 3. Observability Stack
**File:** `_posts/2025-11-12-observability-stack.md`

Add these lines:
```yaml
title_pt: "Stack de Observabilidade"
lead_text_pt: "[Add Portuguese description here]"
```

### 4. Airflow 3 Setup
**File:** `_posts/2025-11-15-airflow3-setup.md`

Add these lines:
```yaml
title_pt: "Configuração Airflow 3"
lead_text_pt: "[Add Portuguese description here]"
```

### 5. Azure Data Platform Terraform ✅
**File:** `_posts/2025-11-16-azure-data-platform-terraform.md`

**Already done!** This one is already translated as an example.

### 6. Data Eyes
**File:** `_posts/2025-11-18-data-eyes.md`

Add these lines:
```yaml
title_pt: "Data Eyes"
lead_text_pt: "[Add Portuguese description here]"
```

### 7. MSSQL MCP Python
**File:** `_posts/2025-11-19-mssql-mcp-python.md`

Add these lines:
```yaml
title_pt: "MSSQL MCP Python"
lead_text_pt: "[Add Portuguese description here]"
```

### 8. Automated Infra SQL Ansible
**File:** `_posts/2025-11-20-automated-infra-sql-ansible.md`

Add these lines:
```yaml
title_pt: "Infraestrutura SQL Automatizada com Ansible"
lead_text_pt: "[Add Portuguese description here]"
```

### 9. Ask Junior
**File:** `_posts/2025-11-22-ask-junior.md`

Add these lines:
```yaml
title_pt: "Ask Junior"
lead_text_pt: "[Add Portuguese description here]"
```

## Step-by-Step Process

For each post:

1. **Open the markdown file** in your editor
2. **Find the front matter** (between the `---` markers at the top)
3. **Add two new lines** after the `title:` and `lead_text:` fields:
   - `title_pt: "Your Portuguese Title"`
   - `lead_text_pt: "Your Portuguese description"`
4. **Save the file**
5. **Restart Jekyll** (the changes will appear)

## How It Works

The template automatically checks:
- If the current language is Portuguese (`current_lang == 'pt'`)
- If the post has a `title_pt` field
- If both are true, it shows the Portuguese version
- Otherwise, it falls back to English

## Optional: Translate Tags

If you want to translate tags too, you can add a `tags_pt` field:

```yaml
tags: Terraform Azure IaC Data-Platform
tags_pt: Terraform Azure IaC Plataforma-Dados
```

Then update `_includes/post-content.html` to use them.

## Testing

After adding translations:

1. **Visit English page:** `http://localhost:4000/`
   - Should show English titles and descriptions

2. **Visit Portuguese page:** `http://localhost:4000/pt/`
   - Should show Portuguese titles and descriptions

3. **Test switcher:** Click EN/PT to toggle

## Translation Tips

- Keep technical terms in English if commonly used (Terraform, Azure, CI/CD)
- Translate the descriptive parts
- Keep it concise - Portuguese tends to be longer than English
- Use ChatGPT or Google Translate for help, then refine

## Need Help?

If you want, I can help translate the `lead_text` for all your posts. Just ask!
