import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({

  donorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Donor",
    required:true
  },

  homeId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Home",
    required:false   // ⭐ IMPORTANT
  },

  volunteerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Volunteer",
  },

  /* TYPE */
  type:{
    type:String,
    enum:["money","items"],
    default:"items"
  },

  /* MONEY */
  amount:Number,
  paymentMethod:String,

  /* ITEMS */
  items:[
    {
      category:String,
      description:String,
      quantity:String
    }
  ],

  donorAddress:String,
  homeAddress:String,

  donorLocation:{
    lat:Number,
    lng:Number
  },

  homeLocation:{
    lat:Number,
    lng:Number
  },

  volunteerLocation:{
    latitude:Number,
    longitude:Number
  },

  status:{
    type:String,
    default:"Pending"
  },

  otp:String

},{timestamps:true});

export default mongoose.model("Donation", donationSchema);
