
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch courses when the component mounts
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error getting courses:', error);
    }
  };

  const getCourseMaterial = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8000/courses/${courseId}/material`);
      const courseWithId = { ...response.data, _id: courseId };
      setSelectedCourse(courseWithId);
    } catch (error) {
      console.error('Error getting course material:', error);
    }
  };

  const deleteCourseMaterial = (courseId) => {
    console.log("Course ID [Delete]:", courseId);
    axios
      .delete(`http://localhost:8000/courses/${courseId}/material`)
      .then((response) => {
        console.log("Course material deleted successfully:", response.data);
        setSelectedCourse(null); // Set the selectedCourse to null to clear the text area
        // Perform any additional actions after successfully deleting the course material
      })
      .catch((error) => {
        console.error("Error deleting course material:", error);
      });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFieldChange = (event, field) => {
    setSelectedCourse((prevCourse) => ({
      ...prevCourse,
      [field]: event.target.value,
    }));
  };

  const handleUpdateClick = () => {
    console.log(selectedCourse); // Check the selectedCourse object before sending the request
    axios
      .put(`http://localhost:8000/courses/${selectedCourse._id}/material`, selectedCourse)
      .then((response) => {
        console.log("Course material updated successfully:", response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating course material:", error);
      });
  };

  return (
    <Container>
      <h2>Course List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Add Course Material</th>
            <th>View All Content</th>
            <th>Add Assignment</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.instructor}</td>
              <td>{course.duration}</td>
              <td>{course.price}</td>
              <td>
                <Link to={{ pathname: `/courses/${course._id}/material`, state: { courseId: course._id } }}>
                  <Button>Add Material</Button>
                </Link>
              </td>
              <td>
                <Button onClick={() => getCourseMaterial(course._id)}>View All Content</Button>
              </td>
              <td>
              <Link to={{ pathname: `/assignment/${course._id}`, state: { courseId: course._id } }}>
                  <Button>Add Assignment</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedCourse && (
        <div>
          <h3>{selectedCourse.title} Course Materials</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Handouts</th>
                <th>Slides</th>
                <th>Video Lectures</th>
                <th>Announcement</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      defaultValue={selectedCourse.handouts ? JSON.stringify(selectedCourse.handouts) : ''}
                      onChange={(e) => handleFieldChange(e, "handouts")}
                    />
                  ) : (
                    selectedCourse.handouts ? JSON.stringify(selectedCourse.handouts) : ''
                  )}
                </td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      defaultValue={selectedCourse.slides ? JSON.stringify(selectedCourse.slides) : ''}
                      onChange={(e) => handleFieldChange(e, "slides")}
                    />
                  ) : (
                    selectedCourse.slides ? JSON.stringify(selectedCourse.slides) : ''
                  )}
                </td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      defaultValue={selectedCourse.videoLectures ? JSON.stringify(selectedCourse.videoLectures) : ''}
                      onChange={(e) => handleFieldChange(e, "videoLectures")}
                    />
                  ) : (
                    selectedCourse.videoLectures ? JSON.stringify(selectedCourse.videoLectures) : ''
                  )}
                </td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      defaultValue={selectedCourse.announcement ? JSON.stringify(selectedCourse.announcement) : ''}
                      onChange={(e) => handleFieldChange(e, "announcement")}
                    />
                  ) : (
                    selectedCourse.announcement ? JSON.stringify(selectedCourse.announcement) : ''
                  )}
                </td>
                <td>
                  {editMode ? (
                    <Button onClick={handleUpdateClick}>Update</Button>
                  ) : (
                    <Button onClick={handleEditClick}>Edit</Button>
                  )}
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteCourseMaterial(selectedCourse._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};