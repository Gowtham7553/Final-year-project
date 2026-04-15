import mongoose from "mongoose";

const helpRequestSchema = new mongoose.Schema({

  homeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Home",
    required:true
  },

  needType:String,
  urgency:String,
  description:String,

  aiPriorityScore:Number,

  blockchainHash:{
    type:String,
    default:""
  },

  status:{
    type:String,
    default:"pending"
  },

  /* 🔥 NEW FIELD (IMPORTANT) */
  pickupLocation:{
    latitude: Number,
    longitude: Number
  },

  otp: String

},{timestamps:true});

export default mongoose.model("HelpRequest", helpRequestSchema);