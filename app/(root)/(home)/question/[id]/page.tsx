import { URLProps } from '@/Types';
import { getAnswers } from '@/actions/answer.action';
import { getQuestionsById } from '@/actions/question.action'
import { getUserById } from '@/actions/user.action';
import Rendertags from '@/components/Rendertags';
import Voting from '@/components/Voting';
import AnswersCard from '@/components/cards/AnswersCard';
import Answers from '@/components/forms/Answers';
import Matric from '@/components/matric';
import ParseHtml from '@/components/parseHTML';
import { ApiList } from '@/components/ui/api-list';
import { Separator } from '@/components/ui/separator';
import { formatTimeAgo } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export async function generateMetadata({
    params,
}: Omit<URLProps, "searchParams">): Promise<Metadata> {
    const question = await getQuestionsById({ questionId: params.id });

    return {
        title: `${question.title} | ConnectCraft`,
    };
}

//@ts-ignore
const QuestionPage = async ({ searchParams, params }) => {
    const result = await getQuestionsById({ questionId: params.id });
    if (!result) return null;
    // console.log(result)

    const { userId: clerkId } = auth();

    let mongoUser;

    if (clerkId) {
        mongoUser = await getUserById({ userId: clerkId })
    }
    else{
        redirect("/sign-in");
    }

    return (
        <>
            <div className='flex-start w-full flex-col'>
                <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                    <Link
                        href={`/profile/${result.author.clerkId}`}
                        className='flex items-center justify-start gap-1'
                    >
                        <Image
                            src={result.author.picture}
                            alt={result.author.name}
                            width={22}
                            height={22}
                            className='rounded-full'
                        />
                        <p className=''>
                            {result.author.name}
                        </p>
                    </Link>
                    <div className='flex justify-end'>
                        <Voting
                            type="Question"
                            itemId={JSON.stringify(result._id)}
                            userId={JSON.stringify(mongoUser._id)}
                            upvotes={result.upvoted.length}
                            downvotes={result.downvoted.length}
                            hasupVoted={result.upvoted.includes(mongoUser._id)}
                            hasdownVoted={result.downvoted.includes(mongoUser._id)}
                            hasSaved={mongoUser?.saved.includes(result._id)}
                        />
                    </div>
                </div>
                <h2 className='font-semibold mt-3.5 w-full text-left'>
                    {result.title}
                </h2>
            </div>

            <div className='mb-8 mt-5 flex flex-wrap gap-4'>
                <Matric
                    imgUrl='/assets/icons/clock.svg'
                    alt="Upvotes"
                    value={`${formatTimeAgo(result.createdAt)}`}
                    title=""
                />
                <Matric
                    imgUrl='/assets/icons/message.svg'
                    alt="Messages"
                    value={(result.answers.length)}
                    title=" Answers"
                />
                <Matric
                    imgUrl='/assets/icons/eye.svg'
                    alt="Views"
                    value={(result.views)}
                    title=" Views"
                />
            </div>

            <ParseHtml data={result.content} />

            <div className='mt-8 flex flex-wrap gap-3'>
                {result.tags.map((tag: any) => (
                    <Rendertags
                        key={tag._id}
                        _id={tag._id}
                        name={tag.name}
                        showCount={false}
                        totalQuestions={0}
                    />
                ))}
            </div>

            <AnswersCard
                questionId={result._id}
                userId={mongoUser._id}
                totalAnswers={result.answers.length}
            />

            <Answers
                question={result.content}
                questionId={result._id}
                authorId={JSON.stringify(mongoUser._id)}
            />

            <Separator className="my-10" orientation="horizontal" />

            <div>
                <div className="mb-6">
                    <h2 className="text-3xl font-bold tracking-tight">API</h2>
                    <p className="text-sm text-muted-foreground">
                        API Calls for Questions
                    </p>
                </div>
                <ApiList entityName="question" entityIdName={''} />
            </div>
        </>
    )
}

export default QuestionPage;