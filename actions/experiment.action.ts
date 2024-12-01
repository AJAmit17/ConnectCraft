"use server";

import Experiment from "@/Database/experiment.model";
import { connectToDB } from "@/lib/mongoose";
import {
  EditExperimentParams,
  GetExperimentByIdParams,
  GetExperimentParams,
} from "./shared.types";
import { FilterQuery } from "mongoose";

export async function getAllExperiment(params: GetExperimentParams) {
  try {
    await connectToDB();

    const { searchQuery, page = 1, pageSize = 8 } = params;

    const skipAmount = (page - 1) * pageSize;

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
        { youtubeLink: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const experiments = await Experiment.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const totalExperiment = await Experiment.countDocuments(query);

    const isNext = totalExperiment > skipAmount + experiments.length;

    return { experiments, isNext };
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
      youtubeLink, 
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
      youtubeLink,
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

export async function editExperiment(params: EditExperimentParams) {
  try {
    await connectToDB();

    const {
      _id,
      year,
      aceYear,
      Branch,
      CCode,
      CName,
      ExpNo,
      ExpName,
      ExpDesc,
      ExpSoln,
      youtubeLink,
    } = params;

    const experiment = await Experiment.findById(_id);

    if (!experiment) {
      throw new Error("Experiment not found");
    }

    experiment.year = year;
    experiment.aceYear = aceYear;
    experiment.Branch = Branch;
    experiment.CCode = CCode;
    experiment.CName = CName;
    experiment.ExpNo = ExpNo;
    experiment.ExpName = ExpName;
    experiment.ExpDesc = ExpDesc;
    experiment.ExpSoln = ExpSoln;
    experiment.youtubeLink = youtubeLink;

    await experiment.save();

    return experiment;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
