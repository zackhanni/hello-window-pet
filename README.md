# 🐾 Hello Window Pet

--- AKA ---

Do You See My Cat?

A full-stack Next.js application that allows users to register, upload, and view pets—especially cats. Built with Supabase for backend services and ImageKit for image hosting, the app is styled with ShadCN UI and tested using Playwright.

Live Site: [do-you-see-my-cat.vercel.app](https://do-you-see-my-cat.vercel.app)

---

## 🚀 Features

- User registration and management via Supabase
- Pet creation, editing, and deletion
- Image uploads stored and optimized with ImageKit
- REST API endpoints for both users and pets
- Debug and health check routes
- Clean and modern UI with ShadCN
- End-to-end testing with Playwright

---

## 🧰 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **Image Hosting**: [ImageKit](https://imagekit.io/)
- **UI Components**: [ShadCN](https://ui.shadcn.com/)
- **Testing**: [Playwright](https://playwright.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v18+
- A `.env.local` file with your Supabase and ImageKit credentials

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app locally.

---

## 🧪 Debug Routes

- **Environment Variables Check**
  [`/api/debug`](https://do-you-see-my-cat.vercel.app/api/debug)
  Confirms accessible environment variables.

- **Server Health Check**
  [`/api/health`](https://do-you-see-my-cat.vercel.app/api/health)
  Verifies server status and Supabase connection.

---

## 📦 API Reference

### 🧑 Users

#### `GET /api/users`

Fetch all users.

#### `POST /api/users`

Create a new user.
**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "Jane Doe"
}
```

#### `GET /api/users/[email]`

Get user by email.

#### `DELETE /api/users/[email]`

Delete user by email.

---

### 🐱 Pets

#### `GET /api/pets`

Fetch all pets.

#### `POST /api/pets`

Create a new pet.
**Request Body:**

```json
{
  "name": "Whiskers",
  "ownerEmail": "user@example.com",
  "imageUrl": "https://ik.imagekit.io/your_path/cat.jpg"
}
```

#### `GET /api/pets/[id]`

Fetch a specific pet by ID.

#### `PUT /api/pets/[id]`

Update pet details.
**Request Body:**

```json
{
  "name": "Mittens"
}
```

#### `DELETE /api/pets/[id]`

Delete a pet by ID.

---

## 🧪 Testing

This project uses **Playwright** for end-to-end testing.
Run tests with:

```bash
npx playwright test
```

---

## 📸 Image Hosting

Images are uploaded and stored via **ImageKit**. Make sure your ImageKit credentials are set in `.env.local`.

---

## 🌐 Deployment

The project is deployed on [Vercel](https://vercel.com). Push to the `main` branch to trigger deployment.

---

## 🧾 License

MIT
