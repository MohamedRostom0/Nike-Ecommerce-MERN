import mongoose from "mongoose";

const connectToDB = async (uri = process.env.MONGO_URI) => {
  try {
    const conn = await mongoose.connect(uri);

    console.log(
      `MongoDB Connected: Host=${conn.connection.host}, Port=${conn.connection.port}, Database=${conn.connection.name}, State=${conn.connection.readyState}`
    );
  } catch (e) {
    console.log(e.message);
  }
};

export default connectToDB;
