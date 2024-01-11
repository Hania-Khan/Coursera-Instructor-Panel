import mongoose, { connect } from "mongoose";

const quizSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: false
  },
    deadline: Date,
    questions: [
      {
        question: String,
        options: [
          {
            text: String,
            isCorrect: Boolean,
          },
        ],
        correctOption: Number,
      },
    ],
});


const Quiz =mongoose.model("quiz",quizSchema)


export { Quiz };