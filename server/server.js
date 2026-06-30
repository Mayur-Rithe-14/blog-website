import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";
import path from "path";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// ✅ Make io accessible in controllers
app.set("io", io);

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("Blog API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.use("/uploads", express.static("uploads"));

// ================= SOCKET =================
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN POST ROOM
  socket.on("join-post", (postId) => {
    socket.join(`post_${postId}`);
    console.log(`Joined room: post_${postId}`);
  });

  // LEAVE POST ROOM
  socket.on("leave-post", (postId) => {
    socket.leave(`post_${postId}`);
    console.log(`Left room: post_${postId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
