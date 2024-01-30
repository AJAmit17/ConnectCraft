"use server";

import User from "@/Database/user.model";
import { connectToDB } from "@/lib/mongoose";

export async function getUserById(params: any) {
  try {
    connectToDB();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } 
  catch (error){
    console.log(error);
    throw error;
  }
}