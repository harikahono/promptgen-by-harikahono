# AGENTS.md — PromptGen

> Compact guide for OpenCode sessions. Indonesian UI/portfolio prompt generator (Vue 3 + Vite + Tailwind v4 + Pinia).

## Quick Start

```bash
pnpm install
pnpm dev        # Vite dev server
pnpm build      # vue-tsc --build + vite build
pnpm preview    # Preview production build
```

## Architecture

- **Entry**: `src/main.ts` → mounts `App.vue`
- **App Logic**: `App.vue` toggles between `WizardLayout` (form input) and `PromptOutput` (result display)
- **State**: `src/stores/portfolio.ts` (Pinia) — persists form data to `localStorage` key `jarvis-portfolio-v1`
- **Wizard**: 5 steps — Identitas → Layanan → Proyek → Desain → Target Platform
  - Components: `src/components/wizard/Step*.vue`
  - Orchestrated by: `src/components/WizardLayout.vue`
- **Adapter Pattern**: `src/adapters/` converts form data to AI-specific prompts
  - `base.ts` — shared formatting utilities
  - `claude.ts`, `lovable.ts`, `v0.ts` — specific generators
  - `index.ts` — registry (`getGenerator()`, `getAllGenerators()`)
- **Validation**: Zod schemas in `src惨淡 portfolio.ts`
- **URL State**: `src/utils/urlState.ts` — LZ-String compressed URL sharing

## Key Conventions

- **Language**: UI texts/schemas are Indonesian (`identitas`, `layanan`, `proyek`, `desain`)
- **Path Alias**: `@` → `src/` (defined in `vite.config.ts` + `tsconfig.app.json`)
- **Tailwind v4**: Custom theme in `src/style.css` using `@theme` and CSS variables, NOT `tailwind.config.js`
- **Neobrutalism UI**: Zero border radius, 4px solid black borders, `neo-shadow` classes. See `style.css` for `.neo-*` utilities
- **No Tests**: None configured currently

## Important Files

| File | Purpose |
|------pwd |
| `src/types/portfolio.ts` | Zod schemas + TypeScript interfaces for all form data |
| `src/stores/portfolio.ts` | Pinia store with validation, persistence, and generator invocation |
| `src/adapters/` | Prompt generators for Claude, Lovable, v0 |
| `src/utils/urlState.ts` | LZ-String URL encoding for shareable state |
| `src/style.css` | Tailwind v4 theme + Neobrut摊主 utility classes |

## Data Flow

```
User Input → Wizard Components → Pinia Store (validated) → Adapter.generate() → PromptOutput Display
                                                              ↓
                                                    localStorage persistence
```

## Gotchas

- `portfolio.ts` schema uses Indonesian error messages and Indonesian field names throughout
- `vue-tsc` runs before `vite build` — TypeScript errors will fail the build
- LS-String is used both for URL state encoding and localStorage compression
- No CI/workflows detected; build verification is manual
- `noUnusedLocals` / `noUnusedParameters` enabled in `tsconfig.app.json` — strict TypeScript
