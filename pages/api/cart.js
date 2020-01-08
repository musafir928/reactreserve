import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import connectDB from "../../utils/connectDb";

connectDB();

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handelGetRequest(req, res);
      break;
    case "PUT":
      await handelPutRequest(req, res);
      break;
    case "DELETE":
      await handelDelete(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

async function handelGetRequest(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product"
    });
    res.status(200).json(cart.products);
  } catch (err) {
    console.error(err);
    res.status(403).send("please login again");
  }
}

async function handelPutRequest(req, res) {
  const { quantity, productId } = req.body;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // Get user cart based on user id
    const cart = await Cart.findOne({ user: userId });
    // check if product already exists in cart
    const productExists = cart.products.some(e =>
      ObjectId(productId).equals(e.product)
    );
    // if so, increment the quantity by provided number
    if (productExists) {
      await Cart.findOneAndUpdate(
        { _id: cart._id, "products.product": productId },

        { $inc: { "products.$.quantity": quantity } }
      );
    } else {
      //  if no exists
      const newProduct = { quantity, product: productId };
      await Cart.findOneAndUpdate(
        {
          _id: cart._id
        },
        { $addToSet: { products: newProduct } }
      );
    }
    res.status(200).send("Cart Updated");
  } catch (err) {
    console.error(err);
    res.status(403).send("please login again");
  }
}

async function handelDelete(req, res) {
  const { productId } = req.query;
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Product"
    });
    res.status(200).json(cart.products);
  } catch (err) {
    console.error(err);
    res.status(403).send("please login again");
  }
}
