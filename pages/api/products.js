import Product from "../../models/Product";
import connectDB from "../../utils/connectDb";

connectDB();

export default async (req, res) => {
  const { page, size } = req.query;
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products = [];
  const total = await Product.countDocuments();
  const totalPages = Math.ceil(total / pageSize);
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.find()
      .skip(skips)
      .limit(pageSize);
  }
  // const products = await Product.find();
  res.status(200).json({ products, totalPages });
};
