import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    caterer: { type: mongoose.Schema.Types.ObjectId, ref: "Caterer", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    eventDate: { type: Date, required: true },
    eventAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    guestCount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    specialInstructions: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);