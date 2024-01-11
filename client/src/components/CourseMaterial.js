import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UploadCourseMaterial = () => {

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    videoLectures: null,
    slides: null,
    handouts: null,
    announcement: ""
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/courses');
      const courses = response.data;
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const addOrUpdateCourseMaterial = async (courseId, courseData) => {
    try {
      let response;
      console.log('Course Data:', courseData)
    if (courseId) {
      response = await axios.put(`http://localhost:8000/courses/${courseId}/material`, courseData);
      setSuccessMessage("Course Material updated successfully.");
    } else {
      response = await axios.post(`http://localhost:8000/courses/${courseId}/material`, courseData);
      setSuccessMessage("Course Material Added successfully.");
    }
      // console.log('Course Data:',response.data);
      fetchCourses();
    } catch (error) {
      console.error(error);
    }
  };
 
  
  
  const deleteCourseMaterial = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/courses/${courseId}/material`);
      console.log(response.data);
      fetchCourses();
    } catch (error) {
      console.error(error);
    }
  };

  const editCourse = (courseId) => {
    const courseData = {
      handouts: formData.handouts,
      slides: formData.slides,
      videoLectures: formData.videoLectures,
      announcement: formData.announcement
    };

    addOrUpdateCourseMaterial(courseId, courseData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0]
    }));
  };

  const handleSubmit = (event, courseId) => {
    event.preventDefault();
    
    const courseData = new FormData();
    
    if (formData.videoLectures) {
      courseData.append("videoLectures", formData.videoLectures);
    }
    if (formData.slides) {
      courseData.append("slides", formData.slides);
    }
    if (formData.handouts) {
      courseData.append("handouts", formData.handouts);
    }
    
    courseData.append("announcement", formData.announcement);
  
    console.log('Form Data', formData)
    addOrUpdateCourseMaterial(courseId, courseData);
  };

  
  // const handleSubmit = async (event, courseId) => {
  //   event.preventDefault();
    
  //   const courseData = new FormData();
    
  //   if (formData.videoLectures) {
  //     courseData.append("videoLectures", formData.videoLectures);
  //   }
  //   if (formData.slides) {
  //     courseData.append("slides", formData.slides);
  //   }
  //   if (formData.handouts) {
  //     courseData.append("handouts", formData.handouts);
  //   }
    
  //   courseData.append("announcement", formData.announcement);
  
  //   try {
  //     await addOrUpdateCourseMaterial(courseId, courseData);
  //     setSuccessMessage(courseId ? "Course Material updated successfully." : "Course Material added successfully.");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  const showCourseMaterialForm = (courseId) => {
    setSelectedCourse(courseId);
  };

  const hideCourseMaterialForm = () => {
    setSelectedCourse(null);
  };

  const handleDelete = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course material?")) {
      deleteCourseMaterial(courseId);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <h1 className="text-white mr-3">Courses</h1>
        <Link to="/home" className="text-white">Home</Link>
        <Link to="/quizzes/create" className="text-white">Create Quiz</Link>
      </nav>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {courses.map((course) => (
        <div className="card mt-3" key={course._id}>
          <div className="card-body">
            <h2 className="card-title">{course.title}</h2>
            <p className="card-text">{course.description}</p>
            {selectedCourse === course._id ? (
              <form onSubmit={(event) => handleSubmit(event, course._id)}>
                <label htmlFor="videoLectures">Video Lectures</label>
                <input
                  type="file"
                  name="videoLectures"
                  id="videoLectures"
                  onChange={handleFileChange}
                />
                <br />
                <label htmlFor="slides">Slides</label>
                <input
                  type="file"
                  name="slides"
                  id="slides"
                  onChange={handleFileChange}
                />
                <br />
                <label htmlFor="handouts">Handouts</label>
                <input
                  type="file"
                  name="handouts"
                  id="handouts"
                  onChange={handleFileChange}
                />
                <br />
                <label htmlFor="announcement">Announcement</label>
                <input
                  type="text"
                  name="announcement"
                  id="announcement"
                  value={formData.announcement}
                  onChange={handleChange}
                />
                <br />
                <button className="btn btn-primary me-2" type="button" onClick={hideCourseMaterialForm}>Hide</button>
                <button className="btn btn-primary me-2" type="submit">Save</button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(course._id)}>Delete </button>
              </form>
            ) : (
              <div>
                <button className="btn btn-primary me-2" onClick={() => showCourseMaterialForm(course._id)}>ADD Material</button>
                {/* <button className="btn btn-danger" onClick={() => handleDelete(course._id)}>Delete Material</button> */}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadCourseMaterial;
