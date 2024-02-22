import { SearchParamsProps } from "@/Types";
import QuestionCard from "./cards/QuestionCard";
import { getUserQuestions } from "@/actions/user.action";

interface Props extends SearchParamsProps {
    userId: string;
    clerkId?: string;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
    const result = await getUserQuestions({ userId });

    return (
        <>
            {result?.questions.map((item: any) => (
                <QuestionCard
                    key={item._id}
                    _id={item._id}
                    clerkId={clerkId}
                    title={item.title}
                    tags={item.tags}
                    author={item.author}
                    upvotes={item.upvotes}
                    answers={item.answers}
                    views={item.views}
                    createdAt={item.createdAt}
                    type="Profile"
                />
            ))}
        </>
    );
};

export default QuestionTab;