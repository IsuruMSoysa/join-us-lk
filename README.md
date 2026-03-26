# join-us-lk - Invitation Platform

`join-us-lk` is a commercial invitation platform for event websites with:
- Dynamic template rendering
- Firebase-backed site configuration, invitees, and RSVPs
- Admin panel for creating and managing client sites
- Client portal for RSVP viewing, invitee links, and Excel export

## Tech Stack

- React + Vite + TypeScript
- Firebase (Auth, Firestore)
- Tailwind CSS

## Getting Started

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and fill Firebase variables.
3. Run development server:
   `npm run dev`
4. Type-check:
   `npm run lint`

## Environment Variables

Use the values in `.env.example`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_BASE_URL=http://localhost:3000
```

## Routes

- `/` - Business landing page
- `/admin/login` - Admin login
- `/admin/*` - Admin management area
- `/portal` - Client Google sign-in + approval check
- `/portal/dashboard` - Client RSVP and invitee dashboard
- `/:siteSlug` - Event website
- `/:siteSlug/:inviteeSlug` - Personalized invite link

## Gallery Images (Manual URLs)

Use direct image URLs in the admin gallery fields. Recommended sources:

- Public files under your hosting path (for example `/images/photo-1.webp`)
- Direct Google Cloud Storage object URLs
  (`https://storage.googleapis.com/<bucket>/<object-path>`)

The app renders gallery image URLs exactly as entered.
