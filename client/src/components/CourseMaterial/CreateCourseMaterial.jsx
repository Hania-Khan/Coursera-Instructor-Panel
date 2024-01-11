import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';


export const CreateCourseMaterial = () => {
    const { courseId } = useParams();
    
  const [handouts, setHandouts] = useState("");
  const [slides, setSlides] = useState("");
  const [videoLectures, setVideoLectures] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const handleHandoutsChange = (e) => {
    setHandouts(e.target.value);
  };

  const handleSlidesChange = (e) => {
    setSlides(e.target.value);
  };

  const handleVideoLecturesChange = (e) => {
    setVideoLectures(e.target.value);
  };

  const handleAnnouncementChange = (e) => {
    setAnnouncement(e.target.value);
  };

  const addCourseMaterial = () => {
    const materialData = {
      handouts: handouts,
      slides: slides,
      videoLectures: videoLectures,
      announcement: announcement,
    };

    console.log(courseId, " Course ID")
    axios
      .post(`http://localhost:8000/courses/${courseId}/material`, materialData)
      .then((response) => {
        console.log("Course material added successfully:", response.data);
        // Perform any additional actions after successfully adding the course material
      })
      .catch((error) => {
        console.error("Error adding course material:", error);
      });
  };

  const deleteCourseMaterial = () => {
    axios
      .delete(`http://localhost:8000/courses/${courseId}/material/`)
      .then((response) => {
        console.log("Course material deleted successfully:", response.data);
        setHandouts(null);
        setSlides(null);
        setVideoLectures(null);
        setAnnouncement(null);
        // Perform any additional actions after successfully deleting the course material
      })
      .catch((error) => {
        console.error("Error deleting course material:", error);
      });
  };

  return (
    <div>
      <h2>Add Course Material</h2>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group controlId="handouts">
              <Form.Label>Handouts:</Form.Label>
              <Form.Control
                type="text"
                value={handouts || ""}
                onChange={handleHandoutsChange}
              />
            </Form.Group>
            <Form.Group controlId="slides">
              <Form.Label>Slides:</Form.Label>
              <Form.Control
                type="text"
                value={slides || ""}
                onChange={handleSlidesChange}
              />
            </Form.Group>
            <Form.Group controlId="videoLectures">
              <Form.Label>Video Lectures:</Form.Label>
              <Form.Control
                type="text"
                value={videoLectures || ""}
                onChange={handleVideoLecturesChange}
              />
            </Form.Group>
            <Form.Group controlId="announcement">
              <Form.Label>Announcement:</Form.Label>
              <Form.Control
                type="text"
                value={announcement || ""}
                onChange={handleAnnouncementChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={addCourseMaterial}>
              Add Material
            </Button>
            <Button variant="danger" onClick={() => deleteCourseMaterial(courseId)}>
              Delete Material
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};