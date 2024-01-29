import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string(),
  explanation: z.string(),
  tags: z.array(z.string()),
});
