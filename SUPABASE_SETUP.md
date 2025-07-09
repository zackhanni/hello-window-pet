# Supabase Migration Guide

This guide will help you set up your Supabase database to replace Prisma.

## Prerequisites

You already have your Supabase environment variables set up:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Database Setup

### 1. Create Tables

Run the SQL migration in your Supabase SQL editor:

```sql
-- Copy and paste the contents of supabase-migration.sql
```

### 2. Seed Data

Run the seed data in your Supabase SQL editor:

```sql
-- Copy and paste the contents of supabase-seed.sql
```

## Key Changes Made

### Database Schema Changes

- **Table names**: Changed from PascalCase to snake_case

  - `User` → `users`
  - `Pet` → `pets`

- **Column names**: Changed from camelCase to snake_case

  - `userId` → `user_id`
  - `imageUrl` → `image_url`
  - `createdAt` → `created_at`

- **ID generation**: Using UUID instead of CUID
  - Supabase uses `gen_random_uuid()` for ID generation

### API Changes

All API routes have been updated to use Supabase instead of Prisma:

- ✅ `/api/health` - Health check
- ✅ `/api/users` - User management
- ✅ `/api/users/[email]` - User by email
- ✅ `/api/pets` - Pet management
- ✅ `/api/pets/[id]` - Pet by ID
- ✅ `/api/users/user/[id]/pets` - User's pets

### Helper Functions

Updated `lib/userAndPetHelpers.ts` to use Supabase queries instead of Prisma.

## Testing

1. **Health Check**: Visit `/api/health` to verify database connection
2. **API Endpoints**: Test all your existing API endpoints
3. **Frontend**: Verify that your frontend still works with the new data structure

## Deployment

1. **Vercel**: The build should now work without Prisma dependencies
2. **Environment Variables**: Ensure your Supabase environment variables are set in Vercel
3. **Database**: Make sure your Supabase database is accessible from Vercel

## Troubleshooting

### Common Issues

1. **Row Level Security (RLS)**: If you get permission errors, check the RLS policies in Supabase
2. **Column Names**: Make sure all references use the new snake_case column names
3. **ID Types**: UUIDs are used instead of CUIDs

### Debugging

- Check the browser console for Supabase errors
- Use the Supabase dashboard to inspect your data
- Test API endpoints directly to isolate issues

## Cleanup

After confirming everything works:

1. Remove the `prisma/` directory
2. Remove `lib/prisma.ts`
3. Remove `supabase-migration.sql` and `supabase-seed.sql` (after running them)
4. Remove this `SUPABASE_SETUP.md` file

## Benefits

- ✅ Better Vercel compatibility
- ✅ Real-time subscriptions (if needed)
- ✅ Built-in authentication (if needed)
- ✅ Better performance with edge functions
- ✅ No more Prisma connection issues
