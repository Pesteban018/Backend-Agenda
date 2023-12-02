import {connect} from 'mongoose';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const db = process.env.MONGO_URL;
console.log(db)
export const connectDB = async () => {
  try {
      await connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log('DB Connected');
  } catch (error) {
      console.log(error);
      process.exit(1);
  }

}
