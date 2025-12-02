import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { ITask } from "../types/task.types";

export interface TaskDocument extends ITask, Document {
    _id: Types.ObjectId;
}

const TaskSchema = new Schema<TaskDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed", "overdue"],
      default: "todo",
    },
    dueDate: { type: Date, required: true },
    attachment: { type: String },
  },
  { timestamps: true }
);

export const TaskModel: Model<TaskDocument> =
  mongoose.model<TaskDocument>("Task", TaskSchema);
