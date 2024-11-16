
import Experiment from "@/Database/experiment.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

//@ts-ignore
export async function GET(req: Request, { params: experimentId }) {
  try {
    await connectToDB();

    const experiment = await Experiment.findById(experimentId.id);

    const changeStream = Experiment.watch();
    changeStream.close();

    return NextResponse.json(experiment);
  } catch (error) {
    console.error("[EXPERIMENT_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
