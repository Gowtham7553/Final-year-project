import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
{
  homeName: {
    type: String,
    required: true,
  },

  registrationNumber: {
    type: String,
    unique: true,
    required: true,
  },

  representativeName: String,
  phone: String,

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  about: String,
  capacity: String,

  // 📸 profile/cover image
  image: String,

  address:{
    street:String,
    city:String,
    zipCode:String
  },

  role:{
    type:String,
    default:"Home"
  },

  // ⭐ VERY IMPORTANT FOR LOGIN
  approved:{
    type:Boolean,
    default:true   // auto approve after register
  }

},
{timestamps:true}
);

export default mongoose.model("Home", homeSchema);
