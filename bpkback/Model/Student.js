import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  studentId: {
    type: String,
    required: [true, "Please enter a student Id"],
    minLength: [5, "student Id must be at least 5 characters"],
  },
  major: {
    type: String,
    required: true,
  },

  enrollmentDate: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Student = mongoose.model("Student", schema);
