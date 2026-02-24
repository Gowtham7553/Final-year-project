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
    default:"Open"
  }

},{timestamps:true});

export default mongoose.model("HelpRequest", helpRequestSchema);