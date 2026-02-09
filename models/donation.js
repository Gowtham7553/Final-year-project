import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
{
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },

  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
  },

  // 📦 items
  items: [
    {
      category: String,
      description: String,
      quantity: String,
    },
  ],

  donorAddress: String,
  homeAddress: String,

  /* ================= LOCATION ================= */

  donorLocation: {
    lat: Number,
    lng: Number,
  },

  homeLocation: {
    lat: Number,
    lng: Number,
  },

  // 🚚 volunteer assigned
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer",
    default: null,
  },

  // 📍 live tracking
  volunteerLocation: {
    latitude: Number,
    longitude: Number,
  },

  // 🔐 OTP delivery confirmation
  otp: String,

  status: {
    type: String,
    default: "Pending",
    // Pending → Accepted → Picked → Delivered
  },

},
{ timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
