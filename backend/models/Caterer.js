import mongoose from "mongoose";

const catererSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  price: Number,
  rating: Number,
  image: String,
  location: {
    lat: Number,
    lng: Number
  }
});

export default mongoose.model("Caterer", catererSchema);