import Product from "../../models/Product";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handelGetRequest(req, res);
      break;
    case "DELETE":
      await handelDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handelGetRequest(req, res) {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
}

async function handelDeleteRequest(req, res) {
  const { _id } = req.query;
  await Product.findOneAndDelete({ _id });
  res.status(204).json({});
}
