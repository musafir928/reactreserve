import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDB from "../../utils/connectDb";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    case "PUT":
      await handlePut(req, res);
      break;
    default:
      res.status(405).send(`method ${req.method} not allowed!`);
      break;
  }
};

async function handleGet(req, res) {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
}

async function handlePut(req, res) {
  const { _id, role } = req.body;
  await User.findOneAndUpdate({ _id }, { role });
  res.status(203).send(`user role updated`);
}
