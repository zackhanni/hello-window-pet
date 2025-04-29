# Notes

## Issues

- come up with a cleaner way to reload the page after a new image is uploaded

## To DO

- add sorting and filtering to cat list. practice useMemo, useCallback to optimize sorting/filtering
- use reducer instead of chaining multiple useState hooks together. to change pages, sortKey, and sort order.
- use skeleton components to keep up from being empty while db loads
- use React Query for managing and cashing server state (helps with data fetching, updating, and synch. automatic cashing.)
-

## Prisma

create new migration after changing schema
npx prisma migrate dev --name update_name_notes

seed data
npx prisma db seed

check db with prisma studio
npx prisma studio
