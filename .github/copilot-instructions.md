<!-- Copilot / AI agent instructions for InsurAI (InsureAI-react-app) -->
# Copilot instructions — InsurAI (client)

This file gives targeted, actionable guidance for AI coding agents working on this repository. Keep responses concise and reference repository files when making code changes.

1) Repo overview (big picture)
- The project is a client-side React SPA built with **Vite**. Key entry files: `index.html`, `src/main.jsx`, `src/App.jsx`.
- Routing: `react-router-dom` is used in `src/App.jsx`. Pages/components live in `src/components` (e.g. `Home.jsx`, `Login.jsx`, `Register.jsx`, `AdminDashboard.jsx`, `Navbar.jsx`).
- API integration: all HTTP calls should use the preconfigured Axios instance in `src/api/axios.js`. The base URL is configured from `import.meta.env.VITE_API_URL` (fallback `http://localhost:8080/api`).

2) Build / dev / lint workflows (exact commands)
- Local dev: `npm run dev` (runs `vite`)
- Production build: `npm run build` (runs `vite build`)
- Preview build locally: `npm run preview` (runs `vite preview`)
- Linting: `npm run lint` (runs `eslint .`). Use `eslint.config.js` for rule sources.

3) Project-specific conventions and patterns
- File layout: components live in `src/components`, styles in `src/index.css` and `src/App.css`. Tailwind is configured (`tailwind.config.js`, `postcss.config.cjs`).
- HTTP: use the default `api` export from `src/api/axios.js` to make requests. The instance includes a response interceptor that clears `localStorage.token` on 401s. Do not create ad-hoc axios instances unless necessary.
- Auth token: token storage is handled in `localStorage` (see axios interceptor); when implementing auth flows, read/write the token using the same keys already used in the codebase (search for `localStorage` if unsure).
- Router: pages are registered in `src/App.jsx` with `Routes` and `Route`. Keep route components as default exports matching filenames (PascalCase).

4) Important files to inspect before changing behavior
- `src/api/axios.js` — single axios instance, baseURL uses `VITE_API_URL`.
- `src/App.jsx` — central router and where shared layout (`Navbar`, `About`) is composed.
- `package.json` — scripts and dependency versions (notably `vite`, `react`, `react-router-dom`, `axios`).
- `vite.config.js` — dev server and plugin config (useful when changing dev/build behavior).

5) Safe change rules for AI agents
- When modifying network calls, update only `src/api/axios.js` or create well-documented wrappers. Keep interceptor behavior (401 handling) unless explicitly asked to change it.
- Prefer small, well-scoped PRs: one component/feature per change.
- Follow existing naming patterns (PascalCase component filenames, default exports for components).
- Do not remove Tailwind or PostCSS configs; changes to styling should preserve the existing pipeline.

6) Examples (how to implement common tasks)
- Add a new page: create `src/components/MyPage.jsx`, add a `Route` in `src/App.jsx`, and link it from `Navbar.jsx`.
- Make an API call in a component: `import api from '../api/axios'` then `const resp = await api.get('/my-endpoint')`.

7) Where to run tests / manual verification
- There are no automated tests in this template. Verify changes locally with `npm run dev` and exercise routes and API behavior. Use `npm run build` + `npm run preview` to validate production build.

8) Additional notes for reviewers
- Keep dependency upgrades minimal and test dev/build after changes to `vite` or `@vitejs/plugin-react`.
- If you need to change the API base URL for CI/deploy, prefer using a `.env` file and `VITE_API_URL` rather than hardcoding values.

If anything above is unclear or you want more examples (unit tests, component patterns, CI configuration), tell me what to expand and I'll iterate.
