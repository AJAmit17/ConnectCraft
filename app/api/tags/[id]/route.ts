import Tag from "@/Database/tag.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(req: Request, { params: tagId }) {
  try {
    await connectToDB();

    const tag = await Tag.findOne({ _id: tagId.id });

    return NextResponse.json({ tag });
  } catch (error) {
    console.error("[TAG_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}