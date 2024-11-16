import Experiment from "@/Database/experiment.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { experimentId: string } }) {
  try {
    await connectToDB();

    const experiment = await Experiment.findById(params.experimentId).lean();

    if (!experiment) {
      console.error("[EXPERIMENT_ID_GET] No experiment found");
      return new NextResponse("No experiment found", { status: 404 });
    }

    return NextResponse.json(
      { experiment },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("[EXPERIMENT_ID_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}