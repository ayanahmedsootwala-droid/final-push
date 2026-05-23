# XYZ Automobiles — Complete Source Archive (v29)

Generated: 5/23/2026, 12:34:39 AM
Version: v29
Total files packaged: 438

## What's new in v29
- Brand name & logo now sync across the entire site (Header, Footer, Login, Register, Blog, Contact)
- New SiteSettingsContext with Supabase Realtime — settings propagate instantly to every component
- Footer text (copyright) now reads from the admin panel (footer_text key)
- Social links in Footer and Contact page now use correct keys (social_facebook, social_instagram, etc.)
- ContactPage: all contact details pulled from admin settings; showroom map removed
- BlogPage: site name in hero label pulled from admin settings
- .env.example added with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY placeholders
- src/services/ folder preserved in archive (.keep placeholder)

## Structure
```
xyz-automobiles/
  index.html
  package.json
  vite.config.ts
  vite.config.dev.ts
  tailwind.config.js
  postcss.config.js
  tsconfig*.json
  components.json
  biome.json
  sgconfig.yml
  pnpm-workspace.yaml
  pnpm-lock.yaml
  .env.example
  README.md
  .gitignore
  src/           → All React/TypeScript/CSS source files
  supabase/      → Supabase config, migrations, edge functions
  .skills/       → Skill definitions and references
  .rules/        → Linting and validation rules
  public/        → Static assets (favicon, logos, SVGs)
```

## Setup
1. `pnpm install`
2. Copy `.env.example` to `.env` and fill in VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
3. `pnpm dev`
