"use server";

import User from "@/Database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDB } from "@/lib/mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/Database/question.model";
import Tag from "@/Database/tag.model";

export async function getUserById(params: any) {
  try {
    connectToDB();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDB();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDB();

    const { clerkId, updateData, path } = params;

    await User.findByIdAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDB();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const userQuestionIds = await Question.find({
      author: user._id,
    }).distinct("_id");

    await Question.deleteMany({ author: user._id });

    const deleteUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUser(params: GetAllUsersParams) {
  try {
    connectToDB();

    // const { page = 1, pageSize = 10, filter, searchQuery } = params;

    const user = await User.find({}).sort({ createdAt: -1 });

    return { user };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSave(params: ToggleSaveQuestionParams) {
  try {
    connectToDB();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      // remove questions from saved
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    }
    else{
      // add questions to saved
      await User.findByIdAndUpdate(
        userId,
        { $addToSet : { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDB();

    const {clerkId, page = 1, pageSize = 10, filter, searchQuery} = params;

    const query: FilterQuery<typeof Question> = searchQuery 
    ? { title: { $regex: new RegExp(searchQuery, "i")} } 
    : {  } ;

    const user = await User.findOne({clerkId}).populate({
      path: "saved",
      match: query,
      options : {
        sort : {createdAt : -1},
      },
      populate : [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ]
    })

    if(!user){
      throw new Error("User not found")
    }
    
    const savedQuestions = user.saved;

    return { questions : savedQuestions};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function getAllUser(params:GetAllUsersParams) {
//   try {
//     connectToDB();
//     let pageSize = params.pageSize || DEFAULT_PAGESIZE;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
