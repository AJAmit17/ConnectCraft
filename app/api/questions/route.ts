import Question from "@/Database/question.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const questions = await Question.find({});

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("[QUESTIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}