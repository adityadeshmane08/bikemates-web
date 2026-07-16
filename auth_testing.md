# Emergent Auth (Google) Testing Playbook

## Create Test User & Session (uses DB_NAME from backend/.env)
Use the mongo shell against the app database. Insert into `users` and `user_sessions`.
- users: { user_id (custom UUID), email, name, picture, created_at }
- user_sessions: { user_id, session_token, expires_at (now+7d), created_at }

## Backend API
- GET /api/auth/me with header `Authorization: Bearer <session_token>` OR cookie `session_token` -> returns user JSON
- POST /api/auth/session with JSON {"session_id": "..."} -> exchanges via Emergent, sets httpOnly cookie, returns user
- POST /api/auth/logout -> deletes session, clears cookie

## Browser Testing
Set cookie `session_token` (httpOnly, secure, sameSite None, path /) then load /dashboard.

## Success
- /api/auth/me returns user (not 401)
- /dashboard loads without redirect to /login
