import User from "@/Database/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(req: Request, { params: clerkId }) {
  try {
    await connectToDB();

    const user = await User.findOne({ clerkId : clerkId.id });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("[PROFILE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
