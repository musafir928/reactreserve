import mongoose from "mongoose";
const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    // Use existing db connection
    console.log(`using existing db connection`);
    return;
  }
  // make new db connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(`db connected...`);

  // if the db is connected
  connection.isConnected = db.connections[0].readyState;
}

export default connectDB;
