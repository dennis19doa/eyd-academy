# EYD Academy

This repository contains the new **EYD Academy** learning portal for `eyd-bachata.com`.

## Current status

The current `main` branch contains the light green V4 learning-platform design with:

- public academy landing page
- student dashboard
- course library and progress
- Mentoring Block 6 learning flow
- Fundamentals course preview
- saved lessons and notes
- account/security screens
- password reset flow preview
- admin access-management preview

## Cloudflare Pages deployment

Recommended setup:

- Provider: Cloudflare Pages
- Git repository: `dennis19doa/eyd-academy`
- Production branch: `main`
- Framework preset: None / Static HTML
- Build command: `bash build.sh`
- Build output directory: `dist`

The build script copies the deployable site into `dist/`. The repository also includes `_headers` and `_redirects` files for Cloudflare Pages.

After the first deployment, Cloudflare will provide a temporary `*.pages.dev` URL. Test that URL before connecting `eyd-bachata.com`.

## Migration order

1. Deploy `main` to Cloudflare Pages.
2. Test the `pages.dev` site on desktop and mobile.
3. Add `eyd-bachata.com` as the custom domain in Cloudflare Pages.
4. Copy/verify all existing DNS records, especially MX/TXT records used for email.
5. Change nameservers only when the Cloudflare DNS zone is complete.
6. Verify the website and email after DNS propagation.
7. Only then cancel the IONOS web-hosting product that is no longer needed.
8. Do **not** cancel any IONOS domain-registration or email product until those services have also been deliberately migrated or retained.

## Important security note

The current portal is still a **front-end prototype**. Demo credentials, permissions and progress are browser-side and must not be used as the final production security model.

Before real students use the portal, production needs:

- secure authentication with email verification and password reset
- server-side roles and course entitlement checks
- a database for users, courses, progress, purchases and access grants
- protected/signed access for paid video and files
- administrator authorization enforced on the server
- audit logging and privacy/data-management workflows

## Demo accounts

**Admin**  
Email: `admin@eyd-preview.local`  
Password: `PreviewAdmin26!`

**Student**  
Email: `student@eyd-preview.local`  
Password: `PreviewStudent26!`
