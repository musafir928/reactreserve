import connectDB from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // check to see if a user exists with the provided email
    const user = await User.findOne({ email }).select("+password");
    // if no user, return error
    if (!user) {
      return res.status(404).send("No user exists with this email");
    }
    // check to see if the provided password correct or no
    const passwordsMatch = await bcrypt.compare(password, user.password);
    // if password is correct, generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      // send that token to the client
      return res.status(200).json(token);
    } else {
      return res.status(401).send("Password not correct");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in user");
  }
};
