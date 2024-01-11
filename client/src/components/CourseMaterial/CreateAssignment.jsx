import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export const Assignment = () => {
  const { courseId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const addAssignment = () => {
    const assignmentData = {
      title,
      description,
      deadline,
    };

    axios
      .post(`http://localhost:8000/assignment/${courseId}`, assignmentData)
      .then((response) => {
        console.log("Assignment created successfully:", response.data);
        // Perform any additional actions after successfully creating the assignment
      })
      .catch((error) => {
        console.error("Error creating assignment:", error);
      });

    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setDeadline('');
  };

  const deleteAssignment = () => {
    axios
      .delete(`http://localhost:8000/assignment/${courseId}`, { data: { courseId } })
      .then((response) => {
        console.log("Assignment deleted successfully:", response.data);
        // Perform any additional actions after successfully deleting the assignment
      })
      .catch((error) => {
        console.error("Error deleting assignment:", error);
      });
  };

  return (
    <div>
      <h2>Create Assignment</h2>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDeadline">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            value={deadline}
            onChange={handleDeadlineChange}
            required
          />
        </Form.Group>

        <Button variant="primary" onClick={addAssignment}>
          Add Assignment
        </Button>
        <Button variant="danger" onClick={deleteAssignment}>
          Delete Assignment
        </Button>
      </Form>
    </div>
  );
};
