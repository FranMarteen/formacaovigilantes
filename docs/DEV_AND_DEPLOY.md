# Local Dev and Deploy (Root workflow)

This repo contains a Next.js app inside `vercel-setup/` and content in the sibling `content/` folder. We set up root-level scripts so you can work from the repository root while ensuring builds can access `content/`.

Requirements
- Node.js 18.17+ (Next.js 14 requirement)
- npm 9+ recommended

Root-level commands
- Install deps for the app:
  - `npm run install`
    - Internally runs `npm --prefix vercel-setup ci` (falls back to `install` if needed)
- Start dev server:
  - `npm run dev`
  - The server will choose a free port. If 3000/3001 are in use, it will use the next available (e.g. 3002).
  - Open the printed URL, e.g. http://localhost:3002
- Start dev on a specific port:
  - `npm run dev -- -p 3005`
- Lint:
  - `npm run lint`
- Build (SSR/SSG):
  - `npm run build`
- Static export + RSS:
  - `npm run export`
  - Output will be generated under `vercel-setup/out`

Notes on content loading
- `vercel-setup/src/lib/mdx.js` looks for a `content/` folder:
  1) First inside `vercel-setup/content`
  2) If not found, it falls back to `../content` (the repo root)
- Because we run from the repo root, the `../content` path is available during local dev and CI/CD (Vercel) as long as the build context is the repository root.

Quick checks if you see a blank page
- Confirm the dev server URL (terminal output) and open that exact port (e.g., http://localhost:3002).
- Try the test page /test:
  - http://localhost:PORT/test
  - This page renders a simple message to confirm the server is serving routes.
- If the test route works but `/` looks blank, open browser devtools and check the Console for runtime errors.
- If you changed ports during quick restarts, a hard refresh (Ctrl+F5) may help.
- If necessary, clear the `.next` cache (stop the server, then remove `vercel-setup/.next`) and start again.

Vercel configuration (recommended)
- Project Settings → General:
  - Root Directory: the repository root (NOT `vercel-setup`)
- Build & Output Settings:
  - Install Command:
    - `cd vercel-setup && npm ci`
  - Build Command:
    - `cd vercel-setup && npm run build && npm run export`
  - Output Directory:
    - `vercel-setup/out`
- Why:
  - The app uses `fs` to read from `../content` at build time. Setting the Vercel Root Directory to the repo root ensures the `content/` folder is included in the build context and available to the Next.js build/export process.

Troubleshooting ports on Windows
- If 3000/3001 are occupied, Next will automatically select the next free port (shown in the terminal).
- You can also explicitly select a port with: `npm run dev -- -p 3005`.
