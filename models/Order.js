import mongoose from "mongoose";
import shortid from "shortid";

const { String, Number, ObjectId } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User"
    },
    products: [
      {
        quantity: {
          type: Number,
          default: 1
        },
        product: {
          type: ObjectId,
          ref: "Product"
        }
      }
    ],
    email: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Cart.order ||
  mongoose.model("Order", OrderSchema);
