# ✨ Blogify - Modern MERN Blog Platform

A modern full-stack blogging platform built using the **MERN Stack** where users can register, authenticate, create blogs, upload images, edit posts, comment in real-time, and manage their personal profile.

> Designed with a clean, Medium-inspired UI and deployed using **Vercel** (Frontend) and **Render** (Backend).

---

## 🌐 Live Demo

### 🚀 Frontend

https://blog-website-git-main-mayur-rithe-s-projects.vercel.app

### ⚙️ Backend API

https://blogify-backend-d2j2.onrender.com

---

## 📸 Application Preview

<p align="center">
  <img src="./screenshots/home.png" width="45%">
  <img src="./screenshots/article.png" width="45%">
</p>

<p align="center">
  <img src="./screenshots/create-post.png" width="45%">
  <img src="./screenshots/edit-post.png" width="45%">
</p>

<p align="center">
  <img src="./screenshots/profile.png" width="45%">
  <img src="./screenshots/register.png" width="45%">
</p>

---

# 🚀 Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

---

## Blog Management

- Create Blog
- Edit Blog
- Delete Blog
- View All Blogs
- Read Full Article
- Responsive Blog Cards
- Category Support

---

## Image Upload

- Upload cover image from device
- Multer integration
- Image preview before publishing
- Images stored on server

---

## User Profile

- Premium Instagram/Medium-inspired Profile UI
- Update Username
- Update Bio
- Upload Profile Picture
- View Personal Articles
- Post Counter

---

## Comments

- Add Comments
- View Comments
- Real-time updates using Socket.io

---

## Search

- Search blogs by title
- Instant filtering

---

## UI

- Modern Responsive Design
- Mobile Friendly
- Medium-inspired Editor
- Clean Typography
- Smooth Animations
- Premium Cards

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- React Icons
- Framer Motion
- Socket.io Client
- CSS3

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Socket.io
- bcryptjs

---

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# 📂 Project Structure

```
blog-website/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/blog-website.git

cd blog-website
```

---

## Backend Setup

```bash
cd server

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

CLIENT_URL=http://localhost:5173
```

Run Backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api

VITE_SOCKET_URL=http://localhost:5000
```

Run Frontend

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication

```
POST   /api/auth/register

POST   /api/auth/login
```

---

## Posts

```
GET     /api/posts

GET     /api/posts/:id

POST    /api/posts

PUT     /api/posts/:id

DELETE  /api/posts/:id
```

---

## Comments

```
GET     /api/comments/:postId

POST    /api/comments/:postId
```

---

## User

```
GET     /api/users/profile

PUT     /api/users/profile
```

---

# 🎯 Future Improvements

- ❤️ Like Posts
- 🔖 Bookmark Articles
- 👥 Follow Authors
- 🌙 Dark Mode
- 📊 Dashboard Analytics
- 🏷 Tags
- 📑 Rich Text Editor
- 🔔 Notifications
- 📱 Progressive Web App
- 📤 Cloudinary Image Storage
- 🔍 Advanced Search
- 📈 Trending Articles

---

# 📈 Learning Outcomes

This project demonstrates practical experience with:

- MERN Stack Development
- REST APIs
- JWT Authentication
- MongoDB Relationships
- File Upload using Multer
- Socket.io
- Protected Routes
- CRUD Operations
- Deployment (Render + Vercel)
- Responsive UI Design
- Git & GitHub Workflow

---

# 👨‍💻 Author

**Mayur Rithe**

GitHub:
https://github.com/Mayur-Rithe-14

LinkedIn:
https://www.linkedin.com/in/mayur-rithe/

Portfolio:
https://personal-portfolio-1-cqic.onrender.com

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the MIT License.

Feel free to use it for learning and personal projects.
