import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(5,{
    message : "Mininmum 5 Characters are required for Title!"
  }).max(150,{
    message : "Maximum 150 Characters are limit for Title!"
  }),
  explanation: z.string().min(100,{
    message : "Atleast 100 character are required!!"
  }),
  tags: z.array(z.string().min(1).max(15)).min(2, {
    message: "Atleast 2 tags are required!!"
  }).max(5),
});


export const AnswerSchema = z.object({
  answer : z.string().min(100,{
    message : "Atleast 100 character are required!!"
  }),
})