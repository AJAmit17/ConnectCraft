import Experiment from "@/Database/experiment.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const query = url.searchParams;

    const filter: any = {};
    if (query.has("name")) {
      filter.name = query.get("name");
    }
    if (query.has("status")) {
      filter.status = query.get("status");
    }

    const experiments = await Experiment.find(filter);

    if (!experiments || experiments.length === 0) {
      console.error("[EXPERIMENT_GET] No experiments found");
      return new NextResponse("No experiments found", { status: 404 });
    }

    return NextResponse.json({ experiments });
  } catch (error) {
    console.error("[EXPERIMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}