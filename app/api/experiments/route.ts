import Experiment from "@/Database/experiment.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const experiments = await Experiment.find({}).lean();

    if (!experiments || experiments.length === 0) {
      console.error("[EXPERIMENT_GET] No experiments found");
      return new NextResponse("No experiments found", { status: 404 });
    }

    return NextResponse.json(
      { experiments },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("[EXPERIMENT_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}