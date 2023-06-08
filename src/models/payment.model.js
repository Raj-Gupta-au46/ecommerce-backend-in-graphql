import mongoose, { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: "Pending",
      required: true,
    },
  },
  { timestamps: true }
);
const Payment = model("Payment", paymentSchema);
export default Payment;
