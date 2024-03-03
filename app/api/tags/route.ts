import Tag from "@/Database/tag.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const tag = await Tag.find({});

    return NextResponse.json({ tag });
  } catch (error) {
    console.error("[TAG_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}