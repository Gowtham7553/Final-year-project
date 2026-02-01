import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    homeName: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    representativeName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    address: {
      street: String,
      city: String,
      zipCode: String,
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    capacity: {
      type: Number,
      default: 0,
    },

    needsDescription: {
      type: String,
    },

    needsTags: {
      type: [String], // ["Food", "Medical"]
      default: [],
    },

    verificationDocument: {
      type: String, // file URL or filename
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

    role: {
      type: String,
      default: "Home",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Home", homeSchema);
