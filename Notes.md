# Notes

## Issues

- come up with a cleaner way to reload the page after a new image is uploaded

## To DO

Moved to Jira

## Prisma

create new migration after changing schema
npx prisma migrate dev --name update_name_notes

seed data
npx prisma db seed

check db with prisma studio
npx prisma studio

## API Details

/api/users/
POST - creates new user
GET - gets all users

/api/users/[email]/
GET - gets user by email
DELETE - delete user by email

/api/pets/
GET - gets all pets
POST - create new pet

/api/pets/[id]/
GET - gets pet by id
PUT - updates pet by id
DELETE - deletes pet by id
