# EYD Academy — Interactive Preview

This repository contains the first interactive prototype of the new **EYD Academy** member platform for eyd-bachata.com.

## Preview accounts

**Admin**  
Email: `admin@eyd-preview.local`  
Password: `PreviewAdmin26!`

**Student**  
Email: `student@eyd-preview.local`  
Password: `PreviewStudent26!`

## Important security note

This is a **front-end design and interaction preview only**. The demo credentials and permission logic are intentionally visible in the browser code and must **not** be used as the production authentication system.

The production version should use:

- secure authentication with email verification, password reset, and session management
- server-side course entitlement checks
- an application database for users, courses, purchases, and access grants
- signed / expiring access for protected videos and files
- a server-enforced administrator role
- audit logs for access changes

## Included previews

- `index.html` — public academy / login preview
- `admin-preview.html` — direct admin dashboard preview
- `student-preview.html` — direct student dashboard preview

The visual prototype reuses EYD artwork and assets from the existing WordPress website export.