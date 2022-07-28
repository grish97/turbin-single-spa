import mongoose, { ConnectOptions } from "mongoose";

const uri = process.env.DB_URI || "";

export default function connectDb() {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then((e) => console.log("MongoDB ready"))
    .catch(console.error);
}
