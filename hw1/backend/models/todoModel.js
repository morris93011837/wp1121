import mongoose from "mongoose";

// Create a schema
const todoSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    topic: {
      type: Number,
      required: true,
    },
    emoji: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  // The second argument is an options object.
  // In this case, we want to rename _id to id and remove __v
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    // This option is to make sure that when a new document is created,
    // the timestamps will be added automatically.
    // You can comment this out to see the difference.
    timestamps: true,
  },
);

// Create a model
const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;
