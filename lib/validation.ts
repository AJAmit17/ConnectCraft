import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(5, {
    message: "Mininmum 5 Characters are required for Title!"
  }).max(150, {
    message: "Maximum 150 Characters are limit for Title!"
  }),
  explanation: z.string().min(50, {
    message: "Atleast 50 character are required!!"
  }),
  tags: z.array(z.string().min(1).max(15)).min(2, {
    message: "Atleast 2 tags are required!!"
  }).max(5),
});


export const AnswerSchema = z.object({
  answer: z.string().min(100, {
    message: "Atleast 50 character are required!!"
  }),
})


export const ExperimentSchema = z.object({
  year: z.number().int(),
  aceYear: z.string(),
  Branch: z.string(),
  CCode: z.string().min(7).max(8),
  CName: z.string(),
  ExpNo: z.number().int(),
  ExpName: z.string(),
  ExpDesc: z.string(),
  ExpSoln: z.string(),
  youtubeLink: z.string().url("Please enter a valid URL").optional(),
})