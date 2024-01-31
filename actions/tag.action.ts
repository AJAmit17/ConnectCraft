"use server";

import Tag from "@/Database/tag.model";
import { connectToDB } from "@/lib/mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";
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
