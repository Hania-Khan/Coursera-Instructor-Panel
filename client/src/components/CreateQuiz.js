// import { useNavigate, Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function CreateQuiz() {
//   const [deadline, setDeadline] = useState("");
//   const [numQuestions, setNumQuestions] = useState(1);
//   // const [questions, setQuestions] = useState(Array(numQuestions).fill({ 
//   //   question: "",
//   //   options: [
//   //     { text: "", isCorrect: false },
//   //     { text: "", isCorrect: false },
//   //     { text: "", isCorrect: false },
//   //     { text: "", isCorrect: false },
//   //   ],
//   // }));
//   const [questions, setQuestions] = useState([]); // Initialize questions state with an empty array

//   useEffect(() => {
//     const newQuestions = Array(numQuestions).fill().map(() => ({
//       question: "",
//       options: [
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//       ],
//     }));
  
//     setQuestions(newQuestions);
//   }, [numQuestions]);
  

//   const [createdQuiz, setCreatedQuiz] = useState(null);
//   const [submittedQuizzes, setSubmittedQuizzes] = useState([]);
//   const [selectedQuizIndex, setSelectedQuizIndex] = useState(null); // Added state to track selected quiz
//   const [showAllQuizzes, setShowAllQuizzes] = useState(false);
//   const [showSubmittedQuizzes, setShowSubmittedQuizzes] = useState(false);

//   const fetchSubmittedQuizzes = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/quizzes");
//       console.log("Submitted quizzes response:", response.data);
//       setSubmittedQuizzes(
//         response.data.map((quiz) => ({
//           ...quiz,
//           questions: quiz.questions || [],
//         }))
//       );
      
//     } catch (error) {
//       console.error("Error fetching submitted quizzes:", error);
//     }
//   };

// // ...
// useEffect(() => {
//   fetchSubmittedQuizzes();
// }, []);

// useEffect(() => {
//   const updateQuestionsForSelectedQuiz = () => {
//     if (selectedQuizIndex !== null) {
//       const newQuestions = Array(numQuestions).fill().map(() => ({
//         question: "",
//         options: [
//           { text: "", isCorrect: false },
//           { text: "", isCorrect: false },
//           { text: "", isCorrect: false },
//           { text: "", isCorrect: false },
//         ],
//       }));

//       setQuestions((prevState) => {
//         const updatedQuestions = [...prevState];
//         updatedQuestions[selectedQuizIndex].questions = newQuestions.slice();
//         return updatedQuestions;
//       });
//     }
//   };

//   updateQuestionsForSelectedQuiz();
// }, [numQuestions, selectedQuizIndex]);

// // ...

// // Render quizzes that are created at the moment
// const renderCreatedQuizzes = () => {
//   if (!createdQuiz) {
//     return null;
//   }

//   return (
//     <div className="created-quizzes">
//       <div className="quiz-box">
//       <h4>Quiz </h4>
//         <p>Deadline: {createdQuiz.deadline}</p>
//         {createdQuiz.questions && createdQuiz.questions.length > 0 && (
//           <ul>
//             {createdQuiz.questions.map((question, questionIndex) => (
//               <li key={questionIndex}>
//                 <p>
//                   Question {questionIndex + 1}: {question.question}
//                 </p>
//                 <ul>
//                   {question.options.map((option, optionIndex) => (
//                     <li key={optionIndex}>
//                       {option.text} {option.isCorrect && "(Correct)"}
//                     </li>
//                   ))}
//                 </ul>
//                 <button onClick={() => handleUpdateQuiz(questionIndex)}>Update Quiz</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

//   // Render submitted quizzes
//   const renderSubmittedQuizzes = () => {
//     if (!submittedQuizzes) {
//       return null;
//     }

//     return (
//       <div className="submitted-quizzes">
//         {submittedQuizzes.map((quiz, index) => (
//           <div className="quiz-box" key={index}>
//             <h4>Quiz {index + 1}</h4>
//             <p>Deadline: {quiz.deadline}</p>
//             {quiz.questions && quiz.questions.length > 0 && (
//               <ul>
//                 {quiz.questions.map((question, questionIndex) => (
//                   <li key={questionIndex}>
//                     <p>
//                       Question {questionIndex + 1}: {question.question}
//                     </p>
//                     <ul>
//                       {question.options.map((option, optionIndex) => (
//                         <li key={optionIndex}>
//                           {option.text} {option.isCorrect && "(Correct)"}
//                         </li>
//                       ))}
//                     </ul>
//                     <button onClick={() => handleUpdateQuiz(index)}>Update Quiz</button>
//                     {/* <button onClick={() => handleDeleteQuestion(index, questionIndex)}>
//                       Delete Question
//                     </button> */}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <button onClick={() => handleDeleteQuiz(index)}>Delete Quiz</button>
//           </div>
//         ))}
//       </div>
//     );
//   };
//   // Render all quizzes
//   const renderAllQuizzes = () => {
//     if (!submittedQuizzes) {
//       return null;
//     }

//     return (
//       <div className="all-quizzes">
//         {submittedQuizzes.map((quiz, index) => (
//           <div className="quiz-box" key={index}>
//             <h4>Quiz {index + 1}</h4>
//             <p>Deadline: {quiz.deadline}</p>
//             {quiz.questions && quiz.questions.length > 0 && (
//               <ul>
//                 {quiz.questions.map((question, questionIndex) => (
//                   <li key={questionIndex}>
//                     <p>
//                       Question {questionIndex + 1}: {question.question}
//                     </p>
//                     <ul>
//                       {question.options.map((option, optionIndex) => (
//                         <li key={optionIndex}>
//                           {option.text} {option.isCorrect && "(Correct)"}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                 ))}
//               </ul>
//             )}</div>
//           ))}
//         </div>
//       );
//     };

//   // ...

// const handleUpdateQuiz = (index) => {
//   setSelectedQuizIndex(index); // Set the selected quiz index

//   // Get the selected quiz data
//   const selectedQuiz = submittedQuizzes[index];
//   const { deadline, questions } = selectedQuiz;
//   console.log('Deadline',deadline);
//   console.log('questions:', questions);
//   console.log('Question Index', index)
//   // Update the form fields with the selected quiz data
//   setDeadline(deadline);
//   setNumQuestions(questions.length);
//   setQuestions(questions);

//   // Scroll to the top of the form
//   window.scrollTo({ top: 0, behavior: "smooth" });
// };


// // Update the handleSubmit function to handle quiz creation and updating
// // ...

// const handleSubmit = (event) => {
//   event.preventDefault();

//   const formattedDeadline = deadline.replace("T", " ").slice(0, 16);


//   const quizData = questions.map((question) => {
//     const correctOption = question.options.findIndex((option) => option.isCorrect);
//     console.log('question:', question);
//     return {
//       question: question.question,
//       options: question.options.map((option) => option.text),
//       correctOption: correctOption,
//     };
//   });
//   console.log ( 'selected index:',selectedQuizIndex);
//   if (selectedQuizIndex === null) {
//     // Creating a new quiz
//     console.log('quiz data:', quizData);
//     axios
//       .post("http://localhost:8000/quizzes/create", {
//         quizData,
//         deadline: formattedDeadline,
//       })
//       .then((response) => {
//         console.log("Quiz created:", response.data);
//         setCreatedQuiz(response.data);
//         setNumQuestions(1);
//         setQuestions([
//           {
//             question: "",
//             options: [
//               { text: "", isCorrect: false },
//               { text: "", isCorrect: false },
//               { text: "", isCorrect: false },
//               { text: "", isCorrect: false },
//             ],
//           },
//         ]);
//         fetchSubmittedQuizzes();
//       })
//       .catch((error) => {
//         console.error("Error creating quiz:", error);
//       });
//   } else {
//     // Updating an existing quiz
//     const selectedQuiz = submittedQuizzes[selectedQuizIndex];

//     axios
//       .put(`http://localhost:8000/quizzes/${selectedQuiz._id}/update`, {
//         quizData,
//         deadline: formattedDeadline,
//       })
//       .then((response) => {
//         console.log("Quiz updated:", response.data);
//         setSelectedQuizIndex(null); // Reset the selected quiz index
//         setDeadline("");
//         setNumQuestions(1);
//         setQuestions([
//           {
//             question: "",
//             options: [
//               { text: "", isCorrect: false },
//               { text: "", isCorrect: false },
//               { text: "", isCorrect: false },
//               { text: "", isCorrect: false },
//             ],
//           },
//         ]);
//         fetchSubmittedQuizzes(); // Fetch submitted quizzes again to display the updated data
//       })
//       .catch((error) => {
//         console.error("Error updating quiz:", error);
//       });
//   }
// };

// // ...


// // ...




//   const handleNumQuestionsChange = (event) => {
//     const num = parseInt(event.target.value);
//     setNumQuestions(num);
  
//     const newQuestions = Array(num).fill().map(() => ({
//       question: "",
//       options: [
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//       ],
//     }));
  
//     setQuestions(newQuestions);
//   };

  
  
//   const handleQuestionChange = (index, event) => {
//     const updatedQuestions = questions.map((question, questionIndex) => {
//       if (questionIndex === index) {
//         return { ...question, question: event.target.value };
//       }
//       return question;
//     });
//     setQuestions(updatedQuestions);
//   };
  
//   const handleOptionChange = (questionIndex, optionIndex, event) => {
//     const updatedQuestions = questions.map((question, qIndex) => {
//       if (qIndex === questionIndex) {
//         const updatedOptions = question.options.map((option, oIndex) => {
//           if (oIndex === optionIndex) {
//             return { ...option, text: event.target.value };
//           }
//           return option;
//         });
//         return { ...question, options: updatedOptions };
//       }
//       return question;
//     });
//     setQuestions(updatedQuestions);
//   };
  
  

//   const handleIsCorrectChange = (questionIndex, optionIndex, event) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options[optionIndex].isCorrect = event.target.checked;
//     setQuestions(updatedQuestions);
//   };
  

//   const handleDeleteQuestion = (quizIndex, questionIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions.splice(questionIndex, 1);
//     setQuestions(updatedQuestions);
//     setNumQuestions(numQuestions - 1);

//     if (createdQuiz) {
// axios
//   .delete(`http://localhost:8000/quizzes/${submittedQuizzes[quizIndex]._id}/delete/${questionIndex}`)

//         .then((response) => {
//           console.log("Question deleted:", response.data);
//           fetchSubmittedQuizzes();
//         })
//         .catch((error) => {
//           console.error("Error deleting question:", error);
//         });
//     }
//   };

//   const handleDeleteOption = (questionIndex, optionIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options.splice(optionIndex, 1);
//     setQuestions(updatedQuestions);
//   };

//   const handleAddQuestion = () => {
//     const newQuestion = {
//       question: "",
//       options: [
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//       ],
//     };
//     setQuestions([...questions, newQuestion]);
//     setNumQuestions(numQuestions + 1);
//   };

//   const handleAddOption = (questionIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].options.push({ text: "", isCorrect: false });
//     setQuestions(updatedQuestions);
//   };
  
//   const handleDeleteQuiz = (quizIndex) => {
//     axios
//       .delete(`http://localhost:8000/quizzes/${submittedQuizzes[quizIndex]._id}/delete`)
//       .then((response) => {
//         console.log("Quiz deleted:", response.data);
//         fetchSubmittedQuizzes();
//       })
//       .catch((error) => {
//         console.error("Error deleting quiz:", error);
//       });
//   };


//   return (
//     <div className="create-quiz">
//       <nav className="navbar navbar-dark bg-primary">
//         <h1 className="text-white mr-3">Quiz Management</h1>
//         <Link to="/home" className="text-white">Home</Link>
//       </nav>

//       <Routes>
//         <Route exact path="/quizzes" component={renderAllQuizzes} />
//         <Route exact path="/quizzes/:id/update" component={renderSubmittedQuizzes} />
//         {/* Add the new route here */}
//         {/* <Route exact path="/quizzes/new" component={NewQuiz} /> */}
//       </Routes>

//       <div className="container mt-4">
//         <div className="card mb-4">
//           <div className="card-body">
//             <h2 className="mb-4">Create Quiz</h2>
//             <label htmlFor="deadline">Deadline:</label>
//             {/* ... your existing code */}
//             <input
//         type="datetime-local"
//         id="deadline"
//         value={deadline}
//         onChange={(event) => setDeadline(event.target.value)}
//       />
//             {/* ... */}
//             <form onSubmit={handleSubmit}>
//               {/* ... your existing code */}
//               <div>
//           <label htmlFor="num-questions">Number of Questions:</label>
//           <input
//             type="number"
//             id="num-questions"
//             min="1"
//             value={numQuestions}
//             onChange={handleNumQuestionsChange}
//           />
//         </div>
//         {questions.map((question, questionIndex) => (
//           <div key={questionIndex}>
//             <div>
//               <label htmlFor={`question-${questionIndex}`}>Question {questionIndex + 1}:</label>
//               <input
//                 type="text"
//                 id={`question-${questionIndex}`}
//                 value={question.question}
//                 onChange={(event) => handleQuestionChange(questionIndex, event)}
//               />
//               {submittedQuizzes.length > 0 ? null : (
//                 <button type="button" onClick={() => handleDeleteQuestion(questionIndex)}>
//                   Delete Question
//                 </button>
//               )}
//               <button onClick={() => handleAddOption(questionIndex)}>Add Option</button>
//             </div>
//             {question.options.map((option, optionIndex) => (
//               <div key={optionIndex}>
//                 <label htmlFor={`option-${questionIndex}-${optionIndex}`}>
//                   Option {optionIndex + 1}:
//                 </label>
//                 <input
//                   type="text"
//                   id={`option-${questionIndex}-${optionIndex}`}
//                   value={option.text}
//                   onChange={(event) => handleOptionChange(questionIndex, optionIndex, event)}
//                 />
//                 <label htmlFor={`correct-${questionIndex}-${optionIndex}`}>
//                   <input
//                     type="radio"
//                     id={`correct-${questionIndex}-${optionIndex}`}
//                     name={`correct-option-${questionIndex}`}
//                     checked={option.isCorrect}
//                     onChange={(event) => handleIsCorrectChange(questionIndex, optionIndex, event)}
//                   />
//                   Correct
//                 </label>
//                 <button onClick={() => handleDeleteOption(questionIndex, optionIndex)}>
//                   Delete Option
//                 </button>
//               </div>
//             ))}
//           </div>
//         ))}
//         <button type="button" onClick={handleAddQuestion}>
//           Add Question
//         </button>
//         <button type="submit">Submit</button>
//               {/* ... */}
//             </form>
//           </div>
//         </div>
//         <div className="card mb-4">
//           <div className="card-body bg-success">
//             <h2 className="mb-4">Created Quizzes</h2>
//             {/* Display created quizzes */}
//             {renderCreatedQuizzes()}
//           </div>
//         </div>
//         <div className="card mb-4">
//           <div
//             className="card-body bg-warning"
//             onClick={() => setShowSubmittedQuizzes(!showSubmittedQuizzes)}
//             style={{ cursor: 'pointer' }}
//           >
//             <h2 className="mb-4">Edit Quizzes</h2>
//             {/* Display submitted quizzes */}
//             {showSubmittedQuizzes && renderSubmittedQuizzes()}
//           </div>
//         </div>

//         <div className="card">
//           <div
//             className="card-body bg-info"
//             onClick={() => setShowAllQuizzes(!showAllQuizzes)}
//             style={{ cursor: 'pointer' }}
//           >
//             <h2 className="mb-4">All Quizzes</h2>
//             {/* Display all quizzes */}
//             {showAllQuizzes && renderAllQuizzes()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateQuiz;










