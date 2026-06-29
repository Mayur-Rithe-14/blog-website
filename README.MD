# 📝 Blogify - MERN Stack Blogging Platform

A modern, full-stack blogging platform built with the **MERN Stack** that enables users to create, edit, and share blog posts with a beautiful and responsive interface. Blogify includes authentication, image uploads, real-time comments, user profiles, and a clean Medium-inspired writing experience.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

### 📝 Blog Management

- Create Blog Posts
- Edit Posts
- Delete Posts
- Upload Cover Images
- Category Selection
- Responsive Blog Cards

### 💬 Real-Time Comments

- Add Comments
- Reply to Comments
- Nested Comment Threads
- Delete Own Comments
- Socket.IO Real-Time Updates

### 👤 User Profile

- Edit Username
- Update Bio
- Upload Profile Picture
- View Personal Blog Posts
- Instagram/Medium Inspired Profile Layout

### 🔍 Search

- Search Blogs by Title
- Instant Filtering

### 🎨 UI/UX

- Responsive Design
- Modern Interface
- Medium Inspired Editor
- Beautiful Cards
- Clean Typography
- Mobile Friendly

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- React Icons
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Authentication

- JSON Web Token (JWT)
- bcryptjs

## File Upload

- Multer

## Real-Time

- Socket.IO

---

# 📁 Project Structure

```text
Blogify/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
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

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/blogify.git

cd blogify
```

---

## 2️⃣ Install Dependencies

### Client

```bash
cd client

npm install
```

### Server

```bash
cd ../server

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# ▶️ Run the Project

### Start Backend

```bash
cd server

npm run dev
```

### Start Frontend

```bash
cd client

npm run dev
```

Visit:

```text
http://localhost:5173
```

---

# 📸 Screenshots

- 🏠 Home Page
- 🔐 Login & Registration
- ✍️ Create Blog
- 📝 Edit Blog
- 📖 Blog Details
- 💬 Real-Time Comments
- 👤 User Profile
- 🔍 Search Blogs
- 📱 Responsive Design

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

---

## Posts

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | `/api/posts`     |
| GET    | `/api/posts/:id` |
| POST   | `/api/posts`     |
| PUT    | `/api/posts/:id` |
| DELETE | `/api/posts/:id` |

---

## Comments

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | `/api/comments/:postId` |
| POST   | `/api/comments/:postId` |
| DELETE | `/api/comments/:id`     |

---

## Users

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | `/api/users/profile` |
| PUT    | `/api/users/profile` |

---

# 🖼 Image Upload

Blogify uses **Multer** to upload:

- Blog Cover Images
- User Profile Images

Uploaded files are stored inside:

```text
server/uploads/
```

and served from:

```text
http://localhost:5000/uploads/
```

---

# ⚡ Socket.IO Features

- Live Comments
- Instant Comment Updates
- Delete Comment Events
- Room-based Communication

---

# 🚀 Future Improvements

- ❤️ Like System
- 🔖 Bookmark Posts
- 👥 Follow Users
- 🌙 Dark Mode
- 📊 Reading Analytics
- 🏷 Tags
- 🔔 Notifications
- 📱 Progressive Web App (PWA)
- ✍ Rich Text Editor
- ☁ Cloudinary Image Storage
- 📧 Email Verification
- 🔐 Forgot Password
- 🔍 Advanced Search & Filters

---

# 📚 Learning Outcomes

This project demonstrates practical implementation of:

- React Hooks
- Context API
- REST APIs
- JWT Authentication
- CRUD Operations
- MongoDB Relationships
- File Uploads using Multer
- Socket.IO Integration
- Responsive UI Design
- Protected Routes
- MERN Stack Architecture

---

# 👨‍💻 Author

**Mayur Rithe**

**Full-Stack MERN Developer** passionate about building modern, responsive, and scalable web applications while continuously learning new technologies.

### Connect with Me

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile
- Portfolio: https://yourportfolio.com

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

Your support motivates future improvements and helps others discover the project.

**Happy Coding! 🚀**
