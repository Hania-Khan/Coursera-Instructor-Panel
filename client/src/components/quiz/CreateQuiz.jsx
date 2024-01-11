import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { Quiz } from './path/to/your/mongoose/model';

export const Quiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ number: 1, question: '', options: ['', '', '', ''], correctOption: 0 }]);
  const [deadline, setDeadline] = useState('');
    const [successMessage, setSuccessMessage] = useState("");

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctOption = parseInt(e.target.value, 10);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const questionNumber = questions.length + 1;
    setQuestions([...questions, { number: questionNumber, question: '', options: ['', '', '', ''], correctOption: 0 }]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };
  const saveQuiz = () => {
    const quizData = {
      title: quizTitle,
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options.filter((option) => option !== ''),
        correctOption: q.correctOption,
      })),
      deadline: deadline,
    };

    console.log(saveQuiz, " saved quizzes")
    axios
      .post('http://localhost:8000/quizzes/create', quizData)
      .then((response) => {
        console.log('Quiz saved successfully:', response.data);
        setSuccessMessage("Quiz Saved successfully.");
      })
      .catch((error) => {
        console.error('Error saving quiz:', error);
      });
  };

  return (
    <Container>
      <h2>Create Quiz</h2>
      <Form>
        <Form.Group controlId="quizTitle">
          <Form.Label>Quiz Title:</Form.Label>
          <Form.Control type="text" value={quizTitle} onChange={handleQuizTitleChange} />
        </Form.Group>
        <Form.Group controlId="deadline">
  <Form.Label>Deadline:</Form.Label>
  <Form.Control type="date" value={deadline} onChange={handleDeadlineChange} />
</Form.Group>
        <h3>Questions:</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <Form.Group controlId={`question${index}`}>
              <Form.Label>Question {question.number}:</Form.Label>
              <Form.Control type="text" value={question.question} onChange={(e) => handleQuestionChange(e, index)} />
            </Form.Group>
            <h5>Options:</h5>
            {question.options.map((option, optionIndex) => (
              <Form.Group key={optionIndex} controlId={`option${index}-${optionIndex}`}>
                <Form.Label>Option {optionIndex + 1}:</Form.Label>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index, optionIndex)}
                />
              </Form.Group>
            ))}
            <Form.Group>
              <Form.Label>Correct Option:</Form.Label>
              <Form.Control
                as="select"
                value={question.correctOption}
                onChange={(e) => handleCorrectOptionChange(e, index)}
              >
                {question.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={optionIndex}>
                    Option {optionIndex + 1}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="danger" onClick={() => removeQuestion(index)}>
              Remove Question
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={addQuestion}>
          Add Question
        </Button>
        <Button variant="success" onClick={saveQuiz}>
          Save Quiz
        </Button>
      </Form>
    </Container>
  );
};