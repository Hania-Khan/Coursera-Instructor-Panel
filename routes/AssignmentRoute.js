import express from 'express';
import mongoose from 'mongoose';
import { Assignment } from '../models/AssignmentSchema.js';
import { Course } from '../models/CourseMaterialSchema.js';
import { User } from '../models/user.js';
const assgnRouter = express.Router();
const user = mongoose.model('User');

// Add Assignment
assgnRouter.post('/assignment/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, deadline } = req.body;

    // Create the assignment
    const assignment = await Assignment.create({
      title,
      description,
      deadline,
      course: courseId,
    });

    // Update the corresponding Course document
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: { assignments: assignment._id } },
      { new: true }
    ).populate('assignments');

    if (!course) {
      throw new Error('Course not found');
    }

    res.status(201).json({ assignment, course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Read Assignment by ID
assgnRouter.get('/assignment/:courseId', async (req, res) => {
  try {
    const { courseId, id } = req.params;
    const assignment = await Assignment.findOne({ _id: id, course: courseId })
      .populate('course')
      .populate('submissions.student');
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ error: 'Assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Assignment
assgnRouter.put('/assignment/:courseId/:id', async (req, res) => {
  try {
    const { courseId, id } = req.params;
    const updatedAssignment = await Assignment.findOneAndUpdate(
      { _id: id, course: courseId },
      req.body,
      { new: true }
    );

    if (updatedAssignment) {
      res.json(updatedAssignment);
    } else {
      res.status(404).json({ error: 'Assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Delete Assignment
assgnRouter.delete('/assignment/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find the course by courseId and remove the assignment
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Remove the assignment from the course
    const assignmentId = req.body.assignmentId; // Assuming the assignmentId is sent in the request body
    course.assignments.pull(assignmentId);

    // Save the updated course document
    await course.save();

    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default assgnRouter;
