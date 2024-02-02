"use server";

import Answer from "@/Database/answer.model";
import { connectToDB } from "@/lib/mongoose";
import { CreateAnswerParams } from "./shared.types";
import Question from "@/Database/question.model";
import { revalidatePath } from "next/cache";

export async function CreateAnswer(params: CreateAnswerParams) {
  try {
    connectToDB();

    const { content, author, question, path } = params;

    const newAnswer = new Answer({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
