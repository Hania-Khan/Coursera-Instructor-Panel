import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Instructor = mongoose.model("Instructor", instructorSchema);

export { Instructor };
