import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
{
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  phone: String,   // ⭐ add phone

  skills: {
    type: [String],
    default: [],
  },

  availability: String,

  image: String,   // ⭐ profile image

  // 🔥 ADD THIS PART HERE
  tasksAssigned: {
    type: Number,
    default: 0,
  },

  tasksCompleted: {
    type: Number,
    default: 0,
  },

  role: {
    type: String,
    default: "Volunteer",
  },
},
{
  timestamps: true,
}
);

export default mongoose.model("Volunteer", volunteerSchema);
