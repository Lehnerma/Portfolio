# Portfolio

Personal portfolio of **Maximilian Lehner**, Frontend Developer. Live at [max-lehner.at](https://max-lehner.at).

A single-page Angular app with a playful, hand-made look (stickers, ripped paper, a custom cursor) on top of a clean and structured layout. Fully bilingual (German / English).

![Portfolio landing page](docs/screenshot.png)

## Features

- **Sections:** landing, about me, skills, projects, comments, contact
- **Project showcase** with a detail page per project (`/project/:id`), each linking to the live demo and the GitHub repo
- **Bilingual UI** (DE / EN) via a language switch, powered by typed translation files
- **Playful details:** peelable stickers, ripped-paper dividers, animated and underlined titles, custom cursor, drag and arrow hints
- **Contact form** with validation, toast feedback and a small PHP backend (mail and Discord)
- **Legal pages:** imprint and privacy policy, in both languages
- **Accessibility:** WCAG AA as the baseline

## Tech Stack

| Area      | Technology                                                      |
| --------- | --------------------------------------------------------------- |
| Framework | Angular 22 (standalone components, signals, lazy-loaded routes) |
| Language  | TypeScript (strict)                                             |
| Styling   | SCSS with a modular global structure                            |
| Testing   | Vitest via `ng test`                                            |
| Quality   | ESLint, Stylelint, Prettier                                     |
| Backend   | PHP endpoint with PHPMailer (contact form only)                 |
| Delivery  | Static build, GitHub Actions, rsync over SSH                    |

The app is built as a **static** site: no server-side rendering, the build output is just files that any web server can host.

## Projects

Currently showcased:

| Project  | Stack                               | Live                                                      | Code                                            |
| -------- | ----------------------------------- | --------------------------------------------------------- | ----------------------------------------------- |
| Join     | HTML, CSS, JavaScript               | [join.max-lehner.at](https://join.max-lehner.at)          | [GitHub](https://github.com/Lehnerma/join-3135) |
| Poll-app | Angular, SCSS, TypeScript, Supabase | [poll-app.max-lehner.at](https://poll-app.max-lehner.at/) | [GitHub](https://github.com/Lehnerma/PollApp)   |
| Sharkie  | HTML, CSS, JavaScript               | [sharkie.max-lehner.at](https://sharkie.max-lehner.at)    | [GitHub](https://github.com/Lehnerma/sharkie)   |

Personal projects will be added over time.

### Adding a project

1. Add the preview image to `public/assets/img/` (WebP recommended).
2. Add an entry to `src/app/data/projects.data.ts` (`id`, `name`, `imgSrc`, `stack`, `liveUrl`, `githubUrl`, `route`, `devStack`).
3. Add the new `id` to the `ProjectId` type and the project texts to the DE and EN translation files in `src/app/data/i18n/`.

## Getting Started

### Prerequisites

- Node.js 22
- npm

### Install and run

```bash
npm install
npm start
```

The dev server runs on `http://localhost:4200/` and reloads on changes. Requests to `/api` are proxied to `http://localhost:8080` (see `proxy.conf.json`).

### Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm start`            | Start the dev server                |
| `npm run build`        | Production build into `dist/`       |
| `npm run watch`        | Development build in watch mode     |
| `npm test`             | Run unit tests (Vitest)             |
| `npm run lint`         | ESLint for TypeScript and templates |
| `npm run lint:styles`  | Stylelint for SCSS                  |
| `npm run format`       | Format everything with Prettier     |
| `npm run format:check` | Check formatting (used in CI)       |

### Contact form locally

The form posts to `public/api/contact.php`. To test it locally you need PHP, see [`server/README.md`](server/README.md) for the setup, a dev mode that only logs mails, and `curl` test scenarios.

## Project Structure

```text
src/
  app/
    components/   Reusable visual building blocks (sticker, ripped paper, project window, ...)
    sections/     Page sections (landing, about-me, skills, projects, comments, main-footer)
    pages/        Routed pages (home, project-detail, imprint, privacy-policy)
    shared/       Shared UI (head-nav, buttons, contact form, toast, language switch, ...)
    services/     Contact, language and toast services
    data/         Static content: projects, skills, navigation, i18n (de / en)
    interfaces/   Shared TypeScript types
  styles/         Global SCSS: abstracts, base, components, layout, themes
public/
  assets/         Fonts, icons, images, stickers, backgrounds
  api/            PHP contact endpoint (PHPMailer)
server/           Server setup notes and config template for the contact form
```

Content (texts, projects, skills) lives in `src/app/data/`, so it can be changed without touching components.

## Styling

Global styles in `src/styles/` follow a layered SCSS structure:

- `abstracts`: colors, variables, functions, mixins
- `base`: reset, fonts, typography, keyframes, cursor
- `components`: buttons, images, navigation
- `layout` and `themes`: page layout and theming

Component styles stay in the component's own `.scss` file. Fonts are self-hosted (Bricolage Grotesque, Kalam).

## Code Quality

- **ESLint** enforces TypeScript quality and file structure, **Stylelint** checks SCSS, **Prettier** handles formatting.
- All three run in CI on every push and pull request to `main` (`.github/workflows/quality.yml`).
- Conventions: standalone components, signals for state, native control flow (`@if`, `@for`), `inject()` over constructor injection, readable names over abbreviations. Details are in `.claude/CLAUDE.md`.

## Deployment

Deployment is automated with GitHub Actions (`.github/workflows/deploy.yml`):

1. A pull request is merged into `main` (or the workflow is started manually).
2. The app is built with `npm ci` and `npm run build -- --configuration production`.
3. `dist/portfolio/browser/` is uploaded to the web server via `rsync` over SSH.

Required repository configuration:

- **Secrets:** `SSH_USER`, `SSH_HOST`, `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`, optional `SSH_PORT`
- **Variables:** `DEPLOY_PATH`

`public/.htaccess` handles HTTPS redirect, client-side routing fallback to `index.html`, compression, caching and basic security headers. The contact form secrets are kept outside the repository, see `server/README.md`.

## Contact

Feel free to reach out via the contact form on the [portfolio](https://max-lehner.at), on [LinkedIn](https://www.linkedin.com/in/maximilian-lehner-7744a2276/) or on [GitHub](https://github.com/Lehnerma).
