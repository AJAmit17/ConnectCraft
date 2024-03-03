import Question from "@/Database/question.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(req: Request, { params: questionId }) {
  try {
    await connectToDB();

    const question = await Question.findById(questionId.id);

    return NextResponse.json({ question });
  } catch (error) {
    console.error("[QUESTION_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}