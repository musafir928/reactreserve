import mongoose from "mongoose";
import shortid from "shortid";

const { String, Number, ObjectId } = mongoose.Schema.Types;

const CartSchema = new mongoose.Schema({
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
  ]
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
