import mongoose, { Schema, Document, Model } from "mongoose";

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel: Model<ITodo> =
  mongoose.models.todo || mongoose.model<ITodo>("todo", TodoSchema);

export default TodoModel;
