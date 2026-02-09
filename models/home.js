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
  capacity:String,

  // 📸 image
  image:String,

  address:{
    street:String,
    city:String,
    zipCode:String
  },

  // 📍 GPS LOCATION (FOR DELIVERY)
  location:{
    latitude:{
      type:Number,
      default:0
    },
    longitude:{
      type:Number,
      default:0
    }
  },

  // 📍 full readable address from map
  fullAddress:{
    type:String,
    default:""
  },

  role:{
    type:String,
    default:"Home"
  },

  approved:{
    type:Boolean,
    default:true
  }

},
{timestamps:true}
);

export default mongoose.model("Home", homeSchema);
