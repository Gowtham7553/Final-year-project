import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // or Donor
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    transactionId: {
      type: String,
      default: () => "TXN" + Date.now(),
    },

    status: {
      type: String,
      default: "SUCCESS",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
