## Debug Routes

### Check if env variables are accessible

https://do-you-see-my-cat.vercel.app/api/debug

### Check server connection status

https://do-you-see-my-cat.vercel.app/api/health

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
