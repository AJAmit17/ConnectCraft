
import { ParamsProps } from "@/Types";
import { getQuestionsById } from "@/actions/question.action";
import { getUserById } from "@/actions/user.action";
import Questions from "@/components/forms/Questions";
import { auth } from "@clerk/nextjs";

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionsById({ questionId: params.id });

  return (
    <>
      <h1 className="font-bold">Ask a Question</h1>
      <div className="mt-9">
        <Questions
          type="Edit"
          monogoUserId={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Page;