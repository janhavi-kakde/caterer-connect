import mongoose from "mongoose";

const catererSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  price: Number,
  rating: Number,
  image: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
},
  location: {
    lat: Number,
    lng: Number
  },
  
},
{ timestamps: true });

export default mongoose.model("Caterer", catererSchema);