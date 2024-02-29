"use server";

import Experiment from "@/Database/experiment.model";
import { connectToDB } from "@/lib/mongoose";
import {
  GetExperimentByIdParams,
  GetExperimentParams,
  getExpByCCode,
} from "./shared.types";
import { FilterQuery } from "mongoose";

export async function getAllExperiment(params: GetExperimentParams) {
  try {
    await connectToDB();

    const { searchQuery } = params;

    const query: FilterQuery<typeof Experiment> = {};

    if (searchQuery) {
      query.$or = [
        { aceYear: { $regex: new RegExp(searchQuery, "i") } },
        { Branch: { $regex: new RegExp(searchQuery, "i") } },
        { CCode: { $regex: new RegExp(searchQuery, "i") } },
        { CName: { $regex: new RegExp(searchQuery, "i") } },
        { ExpName: { $regex: new RegExp(searchQuery, "i") } },
        { ExpDesc: { $regex: new RegExp(searchQuery, "i") } },
        { ExpSoln: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const experiments = await Experiment.find(query);

    return { experiments };
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

    return experiment;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpeimentsByCCode(params: getExpByCCode) {
  try {
    await connectToDB();

    const { CCode } = params;

    const experiment = await Experiment.find({ CCode });

    return { experiment };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
