import { SearchParamsProps } from "@/Types";
import AnswersCard from "./cards/AnswersCard";
import AnswerCard from "./AnsCard";
import { getUserAnswers } from "@/actions/user.action";

interface Props extends SearchParamsProps {
    userId: string;
    clerkId?: string;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
    const result = await getUserAnswers({
        userId,
    });

    // console.log(result)
    return (
        <>
            {result?.answers.map((answer: any) => (
                <AnswerCard
                    key={answer._id}
                    clerkId={clerkId}
                    _id={answer._id}
                    question={answer.question}
                    author={answer.author}
                    upvotes={answer.upvoted.length}
                    createdAt={answer.createdAt}
                />
            ))}
        </>
    );
};

export default AnswerTab;