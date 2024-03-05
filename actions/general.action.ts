"use server";

import Answer from "@/Database/answer.model";
import Question from "@/Database/question.model";
import Tag from "@/Database/tag.model";
import User from "@/Database/user.model";
import { connectToDB } from "@/lib/mongoose";
import { SearchParams } from "./shared.types";
import Experiment from "@/Database/experiment.model";


const searchableTypes = ["question", "user", "answer", "tag"];

export async function globalSearch(params: SearchParams) {
  try {
    connectToDB();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
      { model: Experiment, searchField: "ExpName", type: "experiment" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !searchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERY-THING

      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item: any) => ({
            title:
              type === "answer"
                ? `Answer containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      // SEARCH IN THE SPECIFIED MODEL TYPE
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((item: any) => ({
        title:
          type === "answer"
            ? `Answer containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }

    // @ts-ignore
    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global results: ${error}`);
    throw error;
  }
}