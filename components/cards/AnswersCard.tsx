import React from 'react'
import Filter from '../search/filter';
import { AnswerFilters } from '@/constants/filter';
import { getAnswers } from '@/actions/answer.action';
import Link from 'next/link';
import Image from 'next/image';
import ParseHtml from '../parseHTML';
import Voting from '../Voting';

interface Props {
    questionId: string;
    userId: string;
    totalAnswers: number;
    page?: number;
    filter?: number;
}

const AnswersCard = async ({
    questionId,
    userId,
    totalAnswers,
    page,
    filter
}: Props) => {

    const answers = await getAnswers({ questionId });

    // console.log(answers);

    return (
        <div className='mt-13'>
            <div className='flex items-center justify-between mt-20'>
                <h3 className='font-bold'>{totalAnswers} Answers</h3>
                <Filter
                    filters={AnswerFilters}
                    otherClasses={''}
                    containerClasses={''}
                />
            </div>
            <div>
                {answers.answers.map((ans => (
                    <article key={ans._id} className='border-b py-10'>
                        <div className='flex items-center justify-between'>
                            <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                                <Link
                                    href={`/profile/${ans.author.clerkId}`}
                                    className="flex flex-1 items-start gap-1 sm:items-center"
                                >
                                    <Image
                                        src={ans.author.picture}
                                        alt="testing"
                                        width={20}
                                        height={20}
                                        className="rounded-full object-cover max-sm:mt-0.5"
                                    />
                                    <div className='flex flex-col sm:flex-row sm:items-center'>
                                        <p className='font-semibold'>{ans.author.name}</p>
                                        <p className='mt-0.5 ml-0.5 line-clamp-1'>
                                            <span className='max-sm:hidden'>
                                                - answered{" "} 2 days back
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className='flex justify-end'>
                                <Voting
                                    type="Answer"
                                    itemId={JSON.stringify(ans._id)}
                                    userId={JSON.stringify(userId)}
                                    upvotes={ans.upvoted.length}
                                    downvotes={ans.downvoted.length}
                                    hasupVoted={ans.upvoted.includes(userId)}
                                    hasdownVoted={ans.downvoted.includes(userId)}
                                />
                            </div>
                        </div>
                        <ParseHtml data={ans.content} />
                    </article>
                )))}
            </div>
        </div>
    )
}

export default AnswersCard