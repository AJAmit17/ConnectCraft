"use server";

import Tag, { ITag } from "@/Database/tag.model";
import { connectToDB } from "@/lib/mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTagByIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import User from "@/Database/user.model";
import { FilterQuery } from "mongoose";
import Question from "@/Database/question.model";

export async function GetTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDB();

    const { userId, limit = 2 } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User Not Found");

    const interactions = await Question.aggregate([
      { $match: { author: userId } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    // find the tags from the interactions
    const tags = await Tag.find({
      _id: { $in: interactions.map((i) => i._id) },
    });

    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDB();

    const { searchQuery, filter, page = 1, pageSize = 12 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    query.questions = { $not: { $size: 0 } };

    const tags = await Tag.find(query).skip(skipAmount).limit(pageSize);

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDB();
    const { tagId, page = 1, pageSize = 7, searchQuery } = params;

    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    // @ts-ignore
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1, // +1 to check if there is next page
      },

      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const isNext = tag.questions.length > pageSize;

    const questions = tag.questions;
    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
  }
}

export async function getPopularTags() {
  try {
    connectToDB();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
  }
}

export async function getTagById(params: GetTagByIdParams) {
  try {
    connectToDB();

    const { tagId } = params;

    const tag = await Tag.findOne({
      _id: tagId,
    });

    return tag;
  } catch (error) {
    console.log(error);
  }
}
