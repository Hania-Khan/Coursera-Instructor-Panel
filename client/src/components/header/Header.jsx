import React from 'react';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <a className="navbar-brand text-white" href="#">Our Coursera</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
          <a className="nav-link text-white" href="/home">Home</a>
          </li>
          <li className="nav-item active">
          <a className="nav-link text-white" href="/courses">Courses</a>
          </li>
          <li className="nav-item active">
          <a className="nav-link text-white" href="/quizzes/create">Add Quiz</a>
          </li>
          <li className="nav-item active">
          <a className="nav-link text-white" href="/quizzes">View Quiz</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link text-white" href="/courses/:courseId/material">Create Course Material</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link text-white" href="/courses/:courseId/material">View Course Material</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link text-white" href="#">Services</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link text-white" href="/login">Logout</a>
          </li>

        </ul>
      </div>
    </nav>
  );
};
