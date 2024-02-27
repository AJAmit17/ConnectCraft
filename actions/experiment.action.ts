"use server";

import Experiment from "@/Database/experiment.model";
import { connectToDB } from "@/lib/mongoose";
import { GetExperimentByIdParams, GetExperimentParams } from "./shared.types";

export async function getAllExperiment() {
  try {
    await connectToDB();

    const experiments = await Experiment.find({});

    return { experiments};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createExperiment(params: GetExperimentParams) {
  try {
    await connectToDB();

    const {
      year,
      aceYear,
      Branch,
      CCode,
      CName,
      ExpNo,
      ExpName,
      ExpDesc,
      ExpSoln,
    } = params;

    const experiment = await Experiment.create({
      year,
      aceYear,
      Branch,
      CCode,
      CName,
      ExpNo,
      ExpName,
      ExpDesc,
      ExpSoln,
    });

    return { experiment };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExperimentById(params: GetExperimentByIdParams) {
  try {
    await connectToDB();

    const { experimentId } = params;

    const experiment = await Experiment.findById(experimentId);

    return  experiment ;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
