import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: {
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

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    state: {
      type: String,
    },

    city: {
      type: String,
    },

    country: {
      type: String,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: String,
      default: "Donor",
    },
    profileImage: {
  type: String,
  default:"",
},

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Donor", donorSchema);
