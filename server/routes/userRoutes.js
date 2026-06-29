import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {getProfile, updateProfile} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.put("/profile", protect, upload.single("profileImage"), updateProfile);

export default router;
