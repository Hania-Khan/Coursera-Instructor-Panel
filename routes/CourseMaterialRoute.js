import express from 'express';
const courseRouter = express.Router();
import { Course } from '../models/CourseMaterialSchema.js';

// Get all courses
courseRouter.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Add course material to a specific course
courseRouter.post('/courses/:courseId/material', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { handouts, slides, videoLectures, announcement } = req.body;

    console.log(req.params, "    ",req.body)
    // Find the course by courseId
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        handouts,
        slides,
        videoLectures,
        announcement
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get CourseMaterial for a specific course
courseRouter.get('/courses/:courseId/material', async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find the course by courseId and include the desired fields
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

      // Extract the desired fields from the course document
      const { handouts, slides, videoLectures, announcement } = course;

      const courseMaterial = {
        handouts,
        slides,
        videoLectures,
        announcement
      };

    res.status(200).json(courseMaterial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Get all CourseMaterial for all courses
courseRouter.get('/courses/material', async (req, res) => {
  try {
    const courses = await Course.find({}, 'material');
    const courseMaterial = courses.map(course => course.material);
    res.status(200).json(courseMaterial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Update course material for a specific course
courseRouter.put('/courses/:courseId/material', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { handouts, slides, videoLectures, announcement } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { handouts, slides, videoLectures, announcement },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




// Delete course material for a specific course
courseRouter.delete('/courses/:courseId/material', async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find the course by courseId and remove the course material
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Unset the course material fields
    course.handouts = undefined;
    course.slides = undefined;
    course.videoLectures = undefined;
    course.announcement = undefined;

    // Save the updated course document
    await course.save();

    res.status(200).json({ message: 'Course material deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default courseRouter;