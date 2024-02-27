import { Schema, model, models, Document } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvoted: Schema.Types.ObjectId[];
  downvoted: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const QuestionSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    upvoted: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvoted: [{ type: Schema.Types.ObjectId, ref: "User" }],
    answers : [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;