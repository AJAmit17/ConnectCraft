import Experiment from "@/Database/experiment.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const experiments = await Experiment.find({});

    if (!experiments) {
      console.error("[EXPERIMENT_GET] No experiments found");
      return new NextResponse("No experiments found", { status: 404 });
    }

    return NextResponse.json({ experiments });
  } catch (error) {
    console.error("[EXPERIMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}