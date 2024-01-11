import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ViewQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editQuizId, setEditQuizId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedOptions, setEditedOptions] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleEditQuiz = (quizId) => {
    const selectedQuiz = quizzes.find((quiz) => quiz._id === quizId);
    if (selectedQuiz) {
      setEditQuizId(quizId);
      setEditedQuestion(selectedQuiz.question);
      setEditedOptions(selectedQuiz.options.map(option => option.text));
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:8000/quizzes/${quizId}/delete`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      setShowDeleteMessage(true);
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleQuestionChange = (event) => {
    setEditedQuestion(event.target.value);
  };

  const handleOptionChange = (index, event) => {
    const updatedOptions = [...editedOptions];
    updatedOptions[index] = event.target.value;
    setEditedOptions(updatedOptions);
  };

  const handleSaveChanges = () => {
    // Handle saving the edited question and options
    console.log('Save changes:', editedQuestion, editedOptions);
  };

  return (
    <div>
      <h2>Quizzes</h2>
      {showDeleteMessage && <p>Quiz deleted successfully!</p>}
      {quizzes.length > 0 ? (
        quizzes.map((quiz, index) => (
          <div className="card" key={quiz._id}>
            <div className="card-header">
              <h3 className="card-title">Quiz {index + 1}: {quiz.title}</h3>
              <div className="card-buttons">
                {editQuizId === quiz._id ? (
                  <div>
                    <textarea value={editedQuestion} onChange={handleQuestionChange} />
                    {editedOptions.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label>Option {optionIndex + 1}</label>
                        <textarea
                          value={option}
                          onChange={(event) => handleOptionChange(optionIndex, event)}
                        />
                      </div>
                    ))}
                    <button onClick={handleSaveChanges}>Save</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEditQuiz(quiz._id)}>Edit</button>
                    <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
            <div className="card-body">
              <p>Deadline: {quiz.deadline}</p>
              {quiz.questions && quiz.questions.map((question, questionIndex) => (
                <div key={question._id}>
                  <p>Question {questionIndex + 1}: {question.question}</p>
                  <ul>
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex}>{option.text}</li>
                    ))}
                  </ul>
                  <p>Correct Option: {question.correctOption}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No quizzes found.</p>
      )}
    </div>
  );
};
