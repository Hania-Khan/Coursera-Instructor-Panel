import express from "express";
import { signup, login } from "../controller/authController.js";
import {authenticateToken} from "../middleware/authMiddleware.js";

const router = express.Router();

// Signup route

router.post("/signup", signup);

// Login route
router.post("/login", login);

// Protected route that requires authentication token
router.get("/protected", authenticateToken, (req, res) => {
  res.send("You have accessed the protected route.");
});

export default router;
