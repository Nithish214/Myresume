# Resume Website — MERN Stack

A full-stack personal resume/portfolio site for Nithish Kumar, built with
React (Vite) on the frontend and Node.js/Express + MongoDB on the backend.
Includes a recruiter contact form that writes to MongoDB through a real API,
plus a lightweight admin dashboard for reviewing submissions.

---

## 1. Project Folder Structure

```
resume-website/
├── package.json                # root convenience scripts (run client+server together)
│
├── client/                     # React + Vite frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   ├── public/
│   │   └── ADD_YOUR_RESUME_HERE.txt   # drop resume.pdf here
│   └── src/
│       ├── main.jsx             # React entry point, wraps app in ThemeProvider + Router
│       ├── App.jsx              # route definitions (/ and /admin)
│       ├── index.css            # Tailwind directives + design system classes
│       ├── context/
│       │   └── ThemeContext.jsx # light/dark mode state + localStorage sync
│       ├── hooks/
│       │   └── useReveal.js     # IntersectionObserver scroll-reveal hook
│       ├── data/
│       │   └── resumeData.js    # ALL resume content lives here
│       ├── services/
│       │   └── api.js           # Axios client + API calls
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ThemeToggle.jsx
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── Experience.jsx
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx
│       │   ├── Education.jsx
│       │   ├── Contact.jsx      # recruiter contact form
│       │   └── Footer.jsx
│       └── pages/
│           ├── Home.jsx         # composes all sections above
│           └── Admin.jsx        # password-gated submissions dashboard
│
└── server/                      # Express + MongoDB backend
    ├── server.js                 # app entry point
    ├── package.json
    ├── .env.example
    ├── config/
    │   └── db.js                 # Mongoose connection
    ├── models/
    │   └── Contact.js             # recruiter contact schema
    ├── controllers/
    │   └── contactController.js   # create / list / get-by-id logic
    ├── routes/
    │   └── contactRoutes.js       # /api/contacts routes
    └── middleware/
        ├── validateContact.js     # express-validator rules
        └── errorHandler.js        # centralized error responses
```

---

## 2. Package Installation Commands

You need **Node.js 18+** and a running **MongoDB** instance (local or Atlas).

```bash
# From the resume-website/ root folder:

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

Optional convenience: install `concurrently` at the root so you can run both
apps with a single command later:

```bash
# From resume-website/ root
npm install
```

---

## 3. Environment Variables (.env)

**server/.env** (copy from `server/.env.example`):
```
MONGO_URI=mongodb://127.0.0.1:27017/resume-website
PORT=5000
CLIENT_URL=http://localhost:5173
ADMIN_PASSWORD=changeme123
```

**client/.env** (copy from `client/.env.example`):
```
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_PASSWORD=changeme123
```

> Keep `ADMIN_PASSWORD` and `VITE_ADMIN_PASSWORD` the same value if you want
> the visual "Admin" login on the client to be meaningful. Remember: this is
> a client-side check only — see the comment block at the top of
> `client/src/pages/Admin.jsx` for how to upgrade it to real JWT auth.

---

## 4. Running Client and Server Locally

**Option A — two terminals (recommended while learning):**

```bash
# Terminal 1
cd server
npm run dev        # starts Express on http://localhost:5000

# Terminal 2
cd client
npm run dev        # starts Vite on http://localhost:5173
```

**Option B — one command from the root** (after `npm install` at the root):

```bash
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## 5. How to Test the Contact Form Submission

**A. Through the UI**
1. Make sure MongoDB is running and the server started without errors
   (you should see `MongoDB connected: ...` and `Server running on
   http://localhost:5000` in the server terminal).
2. Go to http://localhost:5173, scroll to the contact section (or click
   "Contact Me").
3. Try submitting with empty fields first — you should see inline validation
   errors and no network request fires.
4. Fill in all fields validly and submit. You should see a loading spinner,
   then a success message.
5. Confirm it saved by visiting **http://localhost:5173/admin**, logging in
   with your `ADMIN_PASSWORD`, and checking the submission appears.

**B. Directly against the API (useful for backend-only testing)**

```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "recruiterName": "Jane Doe",
    "companyName": "Acme Corp",
    "workEmail": "jane@acme.com",
    "phoneNumber": "+353 1 234 5678",
    "jobTitle": "Senior SRE",
    "message": "We have a role that matches your background.",
    "preferredCallbackTime": "Weekdays after 3pm"
  }'
```

Then list submissions:
```bash
curl http://localhost:5000/api/contacts
```

---

## 6. How to Deploy the MERN App

**Database — MongoDB Atlas**
1. Create a free cluster at mongodb.com/atlas.
2. Create a database user and allow network access (or `0.0.0.0/0` for
   simplicity while learning).
3. Copy the connection string into your production `MONGO_URI`.

**Backend — Render / Railway / Fly.io (any Node host works)**
1. Push the `server/` folder as its own deployable service (or point the
   host at the repo root with `server` as the working directory).
2. Set environment variables in the host's dashboard: `MONGO_URI`, `PORT`
   (most hosts set this automatically), `CLIENT_URL` (your deployed
   frontend URL), `ADMIN_PASSWORD`.
3. Build/start command: `npm install && npm start`.

**Frontend — Vercel / Netlify**
1. Set the project root to `client/`.
2. Build command: `npm run build`. Output directory: `dist`.
3. Set environment variables: `VITE_API_URL` (your deployed backend URL +
   `/api`), `VITE_ADMIN_PASSWORD`.
4. Deploy — Vercel/Netlify will give you a public URL.

**After deploying:** update the backend's `CLIENT_URL` to match your live
frontend domain so CORS allows requests from it, and redeploy the backend.

---

## 7. Suggestions for Future Improvements

- **Real authentication**: replace the mock admin password with a proper
  login endpoint issuing JWTs, and protect `GET /api/contacts` server-side.
- **Rate limiting**: add `express-rate-limit` to `/api/contacts` to prevent
  spam submissions.
- **Email notifications**: send yourself an email (e.g. via Nodemailer or
  Resend) whenever a new recruiter submission comes in.
- **Pagination**: paginate `GET /api/contacts` once submissions grow.
- **Automated tests**: add Jest/Supertest tests for the API and
  React Testing Library tests for the contact form.
- **CMS-style content**: move `resumeData.js` into MongoDB with its own
  admin-editable UI, so content updates don't require a redeploy.
- **Analytics**: track which projects/sections recruiters engage with most.
- **CI/CD**: add a GitHub Actions workflow to run lint/tests and deploy on
  merge to main.

---

## Design Notes

The visual language draws from cloud monitoring/observability dashboards —
a fitting fit for a Cloud Ops/SRE resume. The signature element is the
"system status" panel in the hero (an "available" pulse indicator next to
live-feeling stats), echoed subtly in the nav logo and footer. Monospace
type (JetBrains Mono) is reserved for data, labels and timestamps; Sora
handles headings; Inter carries body text. Both light and dark themes are
fully supported via Tailwind's class-based dark mode.
