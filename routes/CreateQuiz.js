import express from "express";
import {Quiz} from '../models/QuizSchema.js'

const quizRouter = express.Router();


quizRouter.post('/quizzes/create', async (req, res) => {
  try {
    const { deadline, questions } = req.body;

    const formattedQuestions = questions.map((question) => {
      const options = question.options.map((optionText, index) => ({
        text: optionText,
        isCorrect: index === question.correctOption,
      }));

      return {
        question: question.question,
        options: options,
        correctOption: question.correctOption,
      };
    });

    const newQuiz = new Quiz({
      deadline: new Date(deadline),
      questions: formattedQuestions,
    });

    const savedQuiz = await newQuiz.save();

    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//To get all Quizzes:
quizRouter.get('/quizzes', async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get a single Quiz by ID
  async function getQuizById(req, res, next) {
    try {
      const quizById = await Quiz.findById(req.params.id);
      if (quizById == null) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      res.quizById = quizById;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

  quizRouter.get("/quizzes/:id", getQuizById, (req, res) => {
    res.json(res.quizById);
  });
  

  //Create a New Quiz:
  quizRouter.post('/quizzes/new', async (req, res) => {
    const newQuiz = new Quiz(req.body);
    try {
      const savedQuiz = await newQuiz.save();
      res.status(201).json(savedQuiz);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    
  });
  
  //Create Quizz
// quizRouter.post("/quizzes/create", async (req, res) => {
//     try {
//     const { deadline, questions } = req.body;
//     console.log('questions',questions)
//     console.log('req Body: ', req.body)
//     const newQuiz = new Quiz({
//     deadline,
//     questions
//     });
//     const savedQuiz = await newQuiz.save();
//     res.status(201).json(savedQuiz);
//     } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//     }
//     });

  //Update a Quiz:
// Update a Quiz
// quizRouter.put("/quizzes/:id/update", getQuizById, async (req, res) => {
//   if (req.body.deadline != null) {
//     res.quizById.deadline = req.body.deadline;
//   }
//   if (req.body.questions != null) {
//     res.quizById.questions = req.body.questions;
//   }
//   try {
//     const updatedQuiz = await res.quizById.save();
//     res.json(updatedQuiz);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

  
quizRouter.put("/quizzes/:id/update", getQuizById, async (req, res) => {
  try {
    const { id } = req.params;
    const { deadline, quizData } = req.body;

    const questions = quizData.map((question) => {
      const options = question.options.map((optionText, index) => ({
        text: optionText,
        isCorrect: index === question.correctOption,
      }));

      return {
        question: question.question,
        options: options,
      };
    });

    res.quizById.deadline = deadline;
    res.quizById.questions = questions;

    const updatedQuiz = await res.quizById.save();

    res.json(updatedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Delete a Quiz
quizRouter.delete("/quizzes/:id/delete", getQuizById, async (req, res) => {
  try {
    await Quiz.deleteOne({ _id: res.quizById._id });
    res.json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  export default quizRouter;


















