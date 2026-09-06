# InsurAI Frontend — Complete (Steps 1–12)

A full working React frontend for the InsurAI backend: browsing, apply flow,
document upload, Razorpay payment, appointment booking, and an admin
dashboard (policies / applications / appointments).

---

## 1. Run it

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

Your Spring Boot backend must be running on `http://localhost:8080`
(default `.env` value — see below).

---

## 2. Connect to your backend

Open `.env` in the project root:

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

- If your backend runs on a different port, change it here.
- After deployment (Step 12 below), you'll create a **separate**
  `.env.production` (or set the env var in Vercel) pointing at your
  deployed backend URL.

### Backend CORS — important

Your `SecurityConfig.java` already whitelists `http://localhost:5173` in
`corsConfigurationSource()`. When you deploy the frontend (e.g. to
`https://insurai.vercel.app`), add that URL to the `allowedOrigins` list
in the backend and redeploy the backend, otherwise the browser will block
every request with a CORS error.

### Razorpay

The Razorpay checkout script is loaded dynamically at payment time — no
extra frontend key setup needed. The `key-id` used to open the checkout
widget comes from your backend's `/payments/create-order` response
(`razorpayKeyId` field), which reads from your backend's
`application.yaml` → `razorpay.key-id`. So: **only the backend needs the
Razorpay Test keys**, the frontend automatically picks it up.

---

## 3. Add your real images

I could not embed your actual banner/icon files directly into the
generated project, so every image slot has an explicit placeholder with
a comment you can search for:

```jsx
{/* TODO: Replace with actual image - <description> */}
{/* # */}
```

**Search VS Code for `TODO: Replace` (Ctrl+Shift+F)** to jump to every
spot. The main ones:

| File | What to replace |
|---|---|
| `src/components/home/HeroCarousel.jsx` | 5 banner images (`image: null` → import your banner and assign it) |
| `src/components/layout/Header.jsx` | Logo icon → your logo image |
| `src/components/home/TrustSection.jsx` | Icon cards → your illustration images, if you'd rather use those instead of icons |

**How to wire an image in:**
1. Put the file in `src/assets/banners/` (or `icons/`, `illustrations/`, `logo/`) — rename to kebab-case, e.g. `health-insurance-banner.png`
2. At the top of the file that uses it: `import healthBanner from '@/assets/banners/health-insurance-banner.png';`
3. Replace `image: null` with `image: healthBanner`

---

## 4. What's implemented (maps to your backend modules)

| Frontend | Backend module it talks to |
|---|---|
| Login / Register | `/auth/**` |
| Home (category grid, hero) | `/policies` |
| Policy listing + detail + search | `/policies`, `/policies/category/{cat}`, `/policies/{id}` |
| Apply button → My Applications | `/applications/**` |
| Document upload panel (inside My Applications) | `/documents/**` |
| "Pay Premium" button → Razorpay checkout | `/payments/**` |
| Talk to an Advisor page | `/appointments/**` |
| Admin Dashboard → Policies tab | `/policies/admin/**` |
| Admin Dashboard → Applications tab (approve/reject) | `/applications/admin/**` |
| Admin Dashboard → Appointments tab | `/appointments/admin/**` |

**Not yet wired in the UI** (backend supports it, frontend doesn't have a
dedicated screen — add if you need it): admin document verification
screen (`/documents/admin/**` — currently only upload + status badge is
shown to the user, an admin verify button can be added to
`ManageApplications.jsx` later), UserProfile / UserActivity endpoints
(these feed the V3 recommendation engine, not user-facing yet).

---

## 5. Testing the full flow locally

1. Start backend (`localhost:8080`) and frontend (`localhost:5173`)
2. Register a new account → you land on Home, logged in
3. Browse Policies → click a policy → Apply Now
4. Go to "My Applications" → status is PENDING
5. Log in as your admin user (open a second browser / incognito window,
   or logout and log back in as admin) → Admin Dashboard → Applications
   tab → Approve
6. Back on the user account → My Applications → "Pay Premium" button now
   appears → click it → Razorpay test checkout opens
   (use Razorpay's test card: `4111 1111 1111 1111`, any future expiry, any CVV)
7. After payment, status becomes ACTIVE

---

## 6. Deployment (Step 12)

### Frontend → Vercel
1. Push this `frontend/` folder to GitHub (as part of your InsurAI repo)
2. [vercel.com](https://vercel.com) → New Project → import the repo →
   set **Root Directory** to `frontend`
3. Add environment variable: `VITE_API_BASE_URL` = your deployed backend
   URL + `/api/v1` (e.g. `https://insurai-backend.up.railway.app/api/v1`)
4. Deploy

### Backend → Railway or Render
1. Push backend to GitHub (already done per your earlier steps)
2. Create a new Railway/Render project from the repo, root directory
   pointing at your `backend/` folder
3. Add a MySQL database addon (Railway has one built in) — copy its
   connection URL into your backend's environment variables
   (`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`,
   `SPRING_DATASOURCE_PASSWORD` — Spring Boot reads these as env vars
   automatically, overriding `application.yaml`)
4. Add `JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` as env vars
   similarly (map them in `application.yaml` using `${JWT_SECRET}` syntax
   if not already using property placeholders)
5. Update `SecurityConfig.java`'s CORS `allowedOrigins` to include your
   Vercel frontend URL, redeploy backend

### After both are live
Update the frontend's `VITE_API_BASE_URL` on Vercel to the live backend
URL (not `localhost`), redeploy frontend. Test the full flow again on
the live URLs before putting the link on your resume.

---

## 7. Tech stack recap

Vite + React 18 · Tailwind CSS v4 · React Router v6 · Zustand ·
TanStack Query · React Hook Form + Zod · Axios (JWT interceptor) ·
Framer Motion · Recharts (installed, not yet used — add charts to Admin
Dashboard if you want visual stats) · Lucide icons · react-hot-toast
