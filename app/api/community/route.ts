import User from "@/Database/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const user = await User.find({});

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[COMMUNITY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}