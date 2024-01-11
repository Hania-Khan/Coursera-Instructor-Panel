import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  file: {
    data: Buffer,
    contentType: String
  },
  submissions: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      file: {
        data: Buffer,
        contentType: String
      },
      grade: {
        type: Number
      }
    }
  ]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export { Assignment };
