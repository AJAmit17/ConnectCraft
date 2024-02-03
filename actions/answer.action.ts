"use server";

import Answer from "@/Database/answer.model";
import { connectToDB } from "@/lib/mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/Database/question.model";
import { revalidatePath } from "next/cache";

export async function CreateAnswer(params: CreateAnswerParams) {
  try {
    connectToDB();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // console.log(newAnswer);

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
