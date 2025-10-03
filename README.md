# Proxima — AI Job Finder

> Proxima is an AI-powered job finder that analyzes a user's skills and preferences, matches them with the best job opportunities, and sends instant email alerts when new matching jobs appear.

This repository is a Next.js TypeScript app using Tailwind for styling. It includes API routes and utilities for matching users to jobs and sending email notifications (example implementations live under `app/api` and `utils`).

## Key features

- AI-powered job matching (server-side logic to compare users' skills against job listings)
- Instant email notifications when new matching jobs are found
- Personalized dashboard for tracking applications, saving jobs, and managing alerts
- Integrates with Firebase (admin utilities included) and an email provider (SMTP/SendGrid)

## Repo layout (important files)

- `app/` — Next.js app directory (pages and layout). The main landing page is `app/page.tsx`.
- `app/api/` — serverless API routes (example: `findUsersWithSkills.ts`, `sendJobNotification.ts`)
- `utils/` — firebase helpers and configuration: `firebase-admin.ts`, `firebaseConfig.ts`
- `components/` — React components used across the app
- `lib/` — types and utility helpers

## Requirements

- Node.js 18+ (recommended) or the version supported by Next.js in `package.json`
- npm or yarn
- A Firebase project (for user/job storage and server-side operations) if you want to use the included Firebase helpers
- An email provider: SMTP credentials or a service like SendGrid (the repo includes API routes that expect to send email)

## Environment variables

Create a `.env.local` at the project root and add the variables needed by your chosen integrations. Example keys used by this project (adjust names to your concrete implementation):

```
# Firebase (service account for admin SDK)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# If the project uses the Firebase config on the client
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id

# Email provider (example SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
FROM_EMAIL=hello@yourdomain.com

# Or (example) SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=hello@yourdomain.com
```

Notes:

- If you store the Firebase private key in an environment variable, preserve newlines using `\n` sequences or use a file and load it in your server code.
- Do not commit `.env.local` or any secrets to source control.

## Run locally (PowerShell)

1. Install dependencies

```powershell
npm install
# or
npm ci
```

2. Run in development mode

```powershell
npm run dev
```

3. Build and run production

```powershell
npm run build
npm start
```

## Testing email/job-alert flow locally

- Make sure your `.env.local` contains valid email provider credentials.
- Seed or create a test user with skills in your database (the repo includes example Firebase helpers to do this).
- Trigger the `sendJobNotification` API route (for example, via a local client POST or a server-side script) to simulate sending an alert. See `app/api/sendJobNotification.ts`.

Example (simple curl against local dev server):

```powershell
# Replace body fields with what your API expects
curl -X POST http://localhost:3000/api/sendJobNotification -H "Content-Type: application/json" -d '{"email":"test@example.com","jobTitle":"Senior Engineer","jobLink":"https://example.com/job/1"}'
```

## Developer notes

- Matching logic: the repo contains `findUsersWithSkills.ts` which shows how users can be queried based on skills; review and adapt it to your matching criteria (skill weights, experience, location, remote flags, salary bands).
- Email sending: the `sendJobNotification.ts` route is an example entrypoint. You can integrate SendGrid, Nodemailer (SMTP), SES, etc. For high volume, use a transactional email provider and batching.
- Security: Keep admin keys on the server only. Use the server-side Next.js API routes for sending emails; never expose service credentials on the client.

## Contributing

Contributions are welcome. Please open issues for bugs or feature requests. For larger changes, open a pull request describing the change and how to test it.

## License

This project includes a `LICENSE` file in the repository root. Please review it for license details.

---

If you'd like, I can also add a sample `.env.local.example`, a troubleshooting section showing common pitfalls (Firebase private key formatting, email provider rejections), or wire a basic SendGrid example into the `sendJobNotification` API route. Which would you prefer next?
