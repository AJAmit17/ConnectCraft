"use server";

import Tag from "@/Database/tag.model";
import { connectToDB } from "@/lib/mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/Database/user.model";

export async function GetTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDB();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User Not Found");

    // dummy tags
    return [
      { _id: 1, name: "tag1" },
      { _id: 2, name: "tag2" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDB();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
