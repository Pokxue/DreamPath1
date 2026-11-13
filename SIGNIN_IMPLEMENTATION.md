# Sign-In Page Implementation with SQLite

## Overview
This implementation adds a complete authentication system to the DreamPath app using SQLite database with preset user credentials.

## Files Created/Modified

### New Files
1. **`src/lib/database.ts`** - SQLite database utility with:
   - User and progress tables
   - Preset user initialization (3 demo accounts)
   - Authentication functions (verify password, get user by email)
   - Progress sync functions (update user progress, update profile)

2. **`src/app/api/auth/signin/route.ts`** - Sign-in API endpoint:
   - Validates email/password against database
   - Sets httpOnly auth cookie on success
   - Returns user data (without password hash)

3. **`src/app/api/auth/signout/route.ts`** - Sign-out API endpoint:
   - Clears auth cookie
   - Returns success response

4. **`src/app/auth/signin/page.tsx`** - Sign-in page component:
   - Quick-select preset user buttons (Alex, Sarah, Jordan)
   - Manual email/password form
   - Show/hide password toggle
   - Form validation and error handling
   - Responsive design with dark/light mode support

5. **`src/contexts/AuthContext.tsx`** - Authentication context provider:
   - Manages auth state across the app
   - Loads user data from localStorage on mount
   - Provides signIn/signOut functions
   - Syncs with ProgressionStore

6. **`src/proxy.ts`** - Next.js 16 proxy (middleware replacement):
   - Protects routes requiring authentication
   - Redirects unauthenticated users to `/auth/signin`
   - Allows public routes (`/auth/signin`, `/auth/signup`)
   - Checks for `dreampath-auth` cookie

### Modified Files
1. **`src/app/layout.tsx`** - Wrapped app with AuthProvider
2. **`src/components/layout/Header.tsx`** - Added sign-out button when authenticated
3. **`src/stores/useProgressionStore.ts`** - Added:
   - `DatabaseUserData` interface
   - `loadUserData` action to sync from database
   - `clearUserData` action for sign-out
   - Updated persist config to exclude functions

## Preset Demo Accounts

| Email | Password | Name | Tier | Career Path |
|-------|----------|------|------|-------------|
| alex@dreampath.com | alex123 | Alex Rivera | Aurora (Ages 10-12) | Software Engineer |
| sarah@dreampath.com | sarah123 | Sarah Chen | Nebula (Ages 13-15) | Product Designer |
| jordan@dreampath.com | jordan123 | Jordan Kim | Starlight (Ages 7-9) | Future Doctor |

## Database Schema

### `users` table
- `id` (INTEGER PRIMARY KEY)
- `email` (TEXT UNIQUE)
- `password_hash` (TEXT)
- `name`, `handle`, `avatar_char`, `age`, `joined_date`
- `current_level`, `education_tier`, `active_career_id`
- `screen_time_used_minutes`, `screen_time_max_minutes`
- `read_aloud_enabled`, `sound_effects_enabled`, `reduce_motion`
- `color_mode`, `parent_name`, `parent_email`
- `streak_days`, `missions_completed`, `learning_time_minutes`

### `user_progress` table
- `id` (INTEGER PRIMARY KEY)
- `user_id` (INTEGER, FK to users)
- `total_xp`, `simulated_salary`
- `completed_quests` (JSON)
- `skills` (JSON)
- `achievements` (JSON)
- `career_progress` (JSON)

## Authentication Flow

1. **User visits protected route** → Proxy checks for `dreampath-auth` cookie
2. **No cookie** → Redirect to `/auth/signin?callbackUrl=...`
3. **User selects preset account or enters credentials** → POST to `/api/auth/signin`
4. **Valid credentials** → API sets httpOnly cookie, returns user data
5. **Client stores user data** → localStorage + ProgressionStore sync
6. **Redirect to callbackUrl** → Proxy allows access with cookie
7. **Sign out** → POST to `/api/auth/signout` → Clears cookie + localStorage + store

## Security Notes

- Passwords are hashed (demo implementation - replace with bcrypt in production)
- Auth cookie is httpOnly, secure (in production), sameSite=lax
- Middleware/proxy runs on edge for fast auth checks
- No sensitive data in localStorage (only user profile, not passwords)

## Testing

All three preset accounts work:
```bash
# Sign in as Alex
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"alex@dreampath.com","password":"alex123"}'

# Access protected route with cookie
curl -H "Cookie: dreampath-auth=authenticated" http://localhost:3001/

# Sign out
curl -X POST http://localhost:3001/api/auth/signout
```

## Future Improvements

1. Replace demo password hashing with bcrypt
2. Add JWT token support for API authentication
3. Implement refresh token rotation
4. Add email verification flow
5. Add password reset functionality
6. Add rate limiting to auth endpoints
7. Implement proper session management