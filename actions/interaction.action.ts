"use server"

import { connectToDB } from "@/lib/mongoose";
import { ViewQuestionParams } from "./shared.types";
import Question from "@/Database/question.model";
import Interaction from "@/Database/interaction.model";

export async function viewQuestions(params: ViewQuestionParams) {
    try{
        await connectToDB();

        const { userId, questionId } = params;

        await Question.findByIdAndUpdate(questionId,{
            $inc : {views: 1}
        });

        if(userId){
            const existingInteraction = await Interaction.findOne({
                user: userId,
                action : "view",
                question: questionId
            })

            if(existingInteraction) return console.log("User has already viewd.");

            await Interaction.create({
                user: userId,
                action : "view",
                question: questionId
            });
        }
    }
    catch (error){
        console.log(error);
        throw error;
    }
}