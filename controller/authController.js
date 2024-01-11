
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Instructor } from '../models/instructorSchema.js';
import { setInstructor, authenticateToken } from '../middleware/authMiddleware.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "public" directory
router.use(express.static(path.join(__dirname, '../../client')));

// Serve the Signup page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/src/components/Signup.js'));
});
// Signup
router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Instructor.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const instructor = new Instructor({
      email,
      password: hashedPassword,
    });

    await instructor.save();

    const token = setInstructor(instructor);

    res.status(201).json({ instructor: instructor, token: token });
    console.log("Signup Successful") 
  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});


// Serve the login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/src/components/Login.js'));
});

// Login

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const instructor = await Instructor.findOne({ email: email });

    if (!instructor) {
      return res.status(404).json({ msg: 'No such email found' });
    }

    const isPasswordValid = await bcrypt.compare(password, instructor.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const token = setInstructor(instructor);
    return res.status(201).json({ instructor: instructor, token: token });

  } catch (err) {
    next(err); // Pass the error to the error handling middleware
  }
});

// Protected route that requires authentication token
router.get('/protected', authenticateToken, (req, res) => {
  res.send('You have accessed the protected route.');
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Something went wrong' });
});

export default router;
