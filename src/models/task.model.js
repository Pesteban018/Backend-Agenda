import mongoose from "mongoose";

const taskSchemas = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
      default: Date.now,
    },


    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchemas);
