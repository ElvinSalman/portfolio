# Portfolio — Elvin Salmanov

Personal portfolio built with Next.js Pages Router, React 18, Tailwind CSS 3, next-themes and next-i18next. English, Russian and Azerbaijani translations live in public/locales.

Production: https://elvinsalman.vercel.app
Repository and deployment branch: ElvinSalman/portfolio, master.

## Development

Use Node.js 22 and npm. The committed package-lock.json is the single dependency lockfile.

```sh
npm ci
npm run dev
```

## Verification

```sh
npm run lint
npm test
npm run build
npm start
```

Contact tests mock EmailJS; they never send mail. The form retains its existing EmailJS public key, service and template. Delivery and domain restrictions must be checked in the owner's EmailJS dashboard. Never commit private credentials or .env.local.

The optional GITHUB_AUTH_TOKEN environment variable is used only on the server for the latest-repositories feed. Public requests work without it; failures show a GitHub fallback link.

## Content and deployment

Project and social links are in constants/data.js. Career content is translated in public/locales/{en,ru,az}/common.json. Keep the translation keys aligned.

Push verified changes to master to use the existing Vercel Git integration. Do not create a second Vercel project. Verify the resulting GitHub deployment status and production pages after pushing.

PostCSS and i18next-fs-backend overrides pin patched transitive versions while retaining Next.js 15 and next-i18next 15. Review these when upgrading their parents.
