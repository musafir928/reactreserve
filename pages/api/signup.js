import connectDB from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //  user exists or not?
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`user already exists with email: ${email}`);
    }

    // hash new password
    const hash = await bcrypt.hash(password, 10);

    // create user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    console.log({ newUser });

    // create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    // send back the token to the frontend
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error... Please try again");
  }
};
