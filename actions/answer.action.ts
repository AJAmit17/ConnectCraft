"use server";

import Answer from "@/Database/answer.model";
import { connectToDB } from "@/lib/mongoose";
import {
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/Database/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/Database/interaction.model";

export async function CreateAnswer(params: CreateAnswerParams) {
  try {
    connectToDB();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDB();

    const { questionId, sortBy, page, pageSize } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDB();

    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    await answer.deleteOne({ _id: answerId }); // delete the answer

    // remove the answer from the question's answer array
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );

    // delete all interactions related to the answer
    await Interaction.deleteMany({ answers: answerId });

    revalidatePath(path);
  } catch (error) {}
}
