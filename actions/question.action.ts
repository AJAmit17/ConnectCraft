"use server";

import Question from "@/Database/question.model";
import Tag from "@/Database/tag.model";
import { connectToDB } from "@/lib/mongoose";
import {
  CreateQuestionParams,
  GetAnswersParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/Database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDB();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDB();

    const { title, content, tags, author, path } = params;

    // creating a Question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // create a tag or get them if they exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log("error", error);
  }
}

export async function getQuestionsById(params: GetQuestionByIdParams) {
  try {
    connectToDB();

    const { questionId } = params;

    const questions = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteQuestions(params: QuestionVoteParams) {
  try {
    connectToDB();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvoted: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvoted: userId },
        $push: { upvoted: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvoted: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestions(params: QuestionVoteParams) {
  try {
    connectToDB();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvoted: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { upvoted: userId },
        $push: { downvoted: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvoted: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: GetAnswersParams) {
  try {
    connectToDB();

    const { questionId, sortBy, page, pageSize } = params;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
