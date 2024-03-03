import Experiment from "@/Database/experiment.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const experiment = await Experiment.find({});

    return NextResponse.json({ experiment });
  } catch (error) {
    console.error("[EXPERIMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}