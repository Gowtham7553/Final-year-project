import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
{
  homeName:{ type:String, required:true },

  registrationNumber:{
    type:String,
    unique:true,
    required:true
  },

  representativeName:String,
  phone:String,

  email:{
    type:String,
    unique:true,
    required:true
  },

  password:{
    type:String,
    required:true
  },

  about:String,

  // ✅ FIX (string → number)
  capacity:{
    type:Number,
    default:0
  },

  image:String,

  address:{
    street:String,
    city:String,
    zipCode:String
  },

  location:{
    latitude:{ type:Number, default:0 },
    longitude:{ type:Number, default:0 }
  },

  fullAddress:{ type:String, default:"" },

  role:{
    type:String,
    default:"Home"
  },

  approved:{
    type:Boolean,
    default:true
  },

  /* ===== AI FIELDS ===== */

  people:{
    type:Number,
    default:0
  },

  foodNeeded:{
    type:Boolean,
    default:true
  },

  medicalNeeded:{
    type:Boolean,
    default:false
  },

  lastDonationDays:{
    type:Number,
    default:5
  },

  priorityScore:{
    type:Number,
    default:0
  }

},
{timestamps:true}
);

export default mongoose.model("Home", homeSchema);