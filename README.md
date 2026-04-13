# OneAI Mirror Web — Production Postgres + Vercel Edition

This package is the **production-ready deployment version** of OneAI Mirror Web.

It includes:
- Next.js App Router
- Prisma with **PostgreSQL**
- Migration files checked in
- OneAI API enrichment hook
- Vercel-friendly build flow
- Shareable result pages

---

## 1. Stack

- **Frontend:** Next.js 15 App Router
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Deploy target:** Vercel
- **AI layer:** external OneAI endpoint via REST

---

## 2. Local run with Postgres

Create `.env.local` from `.env.example` and point it to a real Postgres database.

```bash
cp .env.example .env.local
npm install
npm run prisma:deploy
npm run dev
```

Then open:

```bash
http://localhost:3000
```

> This edition is intentionally not configured for SQLite. It is meant for production-style Postgres from the start.

---

## 3. Environment variables

Use these in `.env.local` for local dev and in **Vercel Project Settings → Environment Variables** for production.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
ONEAI_API_BASE_URL="https://your-oneai-api.com"
ONEAI_API_KEY=""
ONEAI_MODEL="oneai-mirror-v1"
ONEAI_TIMEOUT_MS="12000"
```

### Notes
- `DATABASE_URL`: your main Postgres connection string.
- `DIRECT_URL`: optional but recommended for Prisma migrations.
- `NEXT_PUBLIC_APP_URL`: must be your deployed domain for correct links and metadata.
- `ONEAI_*`: optional. If omitted, the app falls back to the built-in rules engine.

---

## 4. Vercel deployment

### Step 1
Push this project to GitHub.

### Step 2
Import it into Vercel.

### Step 3
Set the following Environment Variables in Vercel:
- `DATABASE_URL`
- `DIRECT_URL` (if available)
- `NEXT_PUBLIC_APP_URL`
- `ONEAI_API_BASE_URL` (optional)
- `ONEAI_API_KEY` (optional)
- `ONEAI_MODEL` (optional)
- `ONEAI_TIMEOUT_MS` (optional)

### Step 4
Use this build command in Vercel if you want to override defaults:

```bash
npm run vercel-build
```

This command runs:
- `prisma generate`
- `prisma migrate deploy`
- `next build`

### Step 5
Deploy.

---

## 5. Database migration flow

This package already contains a checked-in initial migration:

```bash
prisma/migrations/20260413_init/
```

### For production
Run:

```bash
npm run prisma:deploy
```

### For new schema changes during development
Run:

```bash
npx prisma migrate dev --name your_change_name
```

Then commit the new migration files.

---

## 6. OneAI integration

If configured, the app sends a POST request to:

```bash
{ONEAI_API_BASE_URL}/mirror
```

Headers:
- `Authorization: Bearer <ONEAI_API_KEY>`
- `x-api-key: <ONEAI_API_KEY>`
- `x-oneai-model: <ONEAI_MODEL>`

Request body shape:

```json
{
  "input": "I only care about winning.",
  "worldType": "hyper-competitive-order",
  "scores": {
    "trust": 50,
    "cooperation": 35,
    "empathy": 20,
    "stability": 50,
    "conflict": 65,
    "openness": 50,
    "extraction": 80,
    "longTermism": 40
  },
  "summary": "Base summary",
  "shockLine": "Base shock line",
  "consequences": ["...", "...", "..."]
}
```

Expected response:

```json
{
  "summary": "Everything becomes a race against everyone else.",
  "shockLine": "This world keeps moving, but it forgets how to belong.",
  "consequences": [
    "People optimize for comparison.",
    "Burnout becomes a cultural baseline.",
    "Coordination erodes under constant status pressure."
  ]
}
```

If OneAI fails or is not configured, the built-in rules engine still returns a complete result.

---

## 7. Production notes

### Recommended database providers
- Neon
- Supabase Postgres
- Railway Postgres
- Vercel Postgres

### Recommended settings
- Use SSL-enabled Postgres URLs.
- Prefer pooled `DATABASE_URL` if your provider offers it.
- Use `DIRECT_URL` for migrations when available.

### Important
If you change the domain after deploy, update:

```env
NEXT_PUBLIC_APP_URL
```

Otherwise copied links and metadata may point to the wrong host.

---

## 8. Useful commands

```bash
npm install
npm run prisma:generate
npm run prisma:deploy
npm run dev
npm run build
npm run start
npm run vercel-build
```

---

## 9. Project structure

```bash
app/
  api/
    simulate/
    health/
  result/[id]/
  about/
components/
lib/
  db.ts
  oneai.ts
  prisma.ts
  simulation-service.ts
  utils.ts
  validation.ts
  world-engine.ts
prisma/
  migrations/
  schema.prisma
types/
```

---

## 10. Best next upgrades

- Dynamic OG image route
- Explore / leaderboard page
- Analytics event table
- Rate limiting
- Bot deep links
- Share image generation

---

## 11. Vercel sanity checklist

Before deployment, confirm:
- Postgres database is created
- `DATABASE_URL` is valid
- `NEXT_PUBLIC_APP_URL` matches the final domain
- `npm run vercel-build` works locally or in CI
- Migrations are committed

