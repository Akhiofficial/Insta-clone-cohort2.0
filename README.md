# Insta‑Clone (Cohort 2.0)

A full‑stack Instagram‑style clone built as part of the Sheriyans Coding School program. It demonstrates user authentication, image uploads, post creation, likes, comments, and a responsive feed.

## Features
- **User authentication** with JWT (sign‑up, login, protected routes)
- **Create posts** with image uploads via ImageKit
- **Like & unlike** posts – feed shows correct like status per user
- **Responsive UI** built with React and modern CSS (dark mode ready)
- **RESTful API** built with Express & Mongoose
- **Docker ready** (optional) for easy deployment

## Tech Stack
- **Frontend:** React, Vite, CSS (custom design, glassmorphism effects)
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Image storage:** ImageKit
- **Auth:** JWT, bcrypt
- **Testing:** Jest (unit tests) – can be added

## Getting Started
### Prerequisites
- Node.js (v20+)
- npm
- MongoDB instance (local or Atlas)
- ImageKit account (API keys in `.env`)

### Installation
```bash
# Clone the repo
git clone https://github.com/yourusername/insta-clone.git
cd insta-clone

# Install dependencies (both frontend & backend)
npm install          # installs root scripts that run both
cd backend && npm install && cd ..
cd frontend/insta-clone && npm install && cd ../..
```

### Environment Variables
Create a `.env` file in `backend/` with:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

### Running the App
```bash
# Start both servers (frontend on 5173, backend on 5000)
npm run dev
```
Open `http://localhost:5173` in your browser.

## API Overview
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and receive JWT |
| POST   | `/api/posts`         | Create a new post (auth required) |
| GET    | `/api/posts/feed`    | Get feed with like status |
| POST   | `/api/posts/:id/like`| Like a post |
| DELETE | `/api/posts/:id/like`| Unlike a post |
| GET    | `/api/posts/:id`     | Get post details |

## Contributing
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/xyz`)
3. Commit your changes
4. Open a Pull Request
