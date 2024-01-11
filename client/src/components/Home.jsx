import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import React, { useState } from 'react';
import b1Image from "./b1.jpg";
import b2Image from "./b2.jpg";
import "../style/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () =>{
  const location = useLocation();
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate("/quizzes/create");
  };

  const handleUploadCourseMaterial = () => {
    navigate("/courses");
  };

  const handlePostAssignment = () => {
    navigate("/assignment");
  };

  const handleManageStudents = () => {
    navigate("/manage-students");
  };

  const handleRespondToFeedback = () => {
    navigate("/respond-to-feedback");
  };

  const handleMonitorStudentProgress = () => {
    navigate("/monitor-student-progress");
  };

  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="homepage">
      <div className="taskbar">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div
              className="box"
              onClick={handleCreateQuiz}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(70%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(100%)";
              }}
            >
              <Link to="/quizzes/create">
                <div className="box-background">
                  <img
                    src={b1Image}
                    alt="Image 1"
                    className="img-fluid rounded"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="box-content">
                    <h2 className="box-title">Create Quiz</h2>
                    <p className="box-description">
                      Create a quiz for your students to take
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div
              className="box"
              onClick={handlePostAssignment}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(70%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(100%)";
              }}
            >
              <Link to="/assignment">
                <div className="box-background">
                  <img
                    src={b2Image}
                    alt="Image 2"
                    className="img-fluid rounded"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="box-content">
                    <h2 className="box-title">Post Assignment</h2>
                    <p className="box-description">
                      Post an assignment for your students
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div
              className="box"
              onClick={handleUploadCourseMaterial}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(70%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(100%)";
              }}
            >
              <Link to="/courses">
                <div className="box-background">
                  <img
                    src={b2Image}
                    alt="Image 2"
                    className="img-fluid rounded"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="box-content">
                    <h2 className="box-title">Upload Course Material</h2>
                    <p className="box-description">
                      Select the Course to upload its content
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div
              className="box"
              onClick={handleRespondToFeedback}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(70%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(100%)";
              }}
            >
              <Link to="/respond-to-feedback">
                <div className="box-background">
                  <img
                    src={b1Image}
                    alt="Image 1"
                    className="img-fluid rounded"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="box-content">
                    <h2 className="box-title">Respond To Feedback</h2>
                    <p className="box-description">
                      View Comments by Students
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div
              className="box"
              onClick={handleMonitorStudentProgress}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(70%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(100%)";
              }}
            >
              <Link to="/monitor-student-progress">
                <div className="box-background">
                  <img
                    src={b1Image}
                    alt="Image 1"
                    className="img-fluid rounded"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="box-content">
                    <h2 className="box-title">Monitor Student Progress</h2>
                    <p className="box-description">View Students Progress</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div
              className="box"
              onClick={handleManageStudents}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(70%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(100%)";
              }}
            >
              <Link to="/manage-students">
                <div className="box-background">
                  <img
                    src={b2Image}
                    alt="Image 2"
                    className="img-fluid rounded"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="box-content">
                    <h2 className="box-title">Manage Students</h2>
                    <p className="box-description">Manage students</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Add more rows and boxes */}
      </div>
    </div>
  );
}

