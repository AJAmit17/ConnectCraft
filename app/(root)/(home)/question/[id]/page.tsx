import { getQuestionsById } from '@/actions/question.action'
import Rendertags from '@/components/Rendertags';
import Answers from '@/components/forms/Answers';
import Matric from '@/components/matric';
import ParseHtml from '@/components/parseHTML';
import { formatTimeAgo } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Page = async ({ params, searchParams }: any) => {
    const result = await getQuestionsById({ questionId: params.id });
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
                        voting
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
                {result.tags.map((tag) => (
                    <Rendertags
                        key={tag._id}
                        _id={tag._id}
                        name={tag.name}
                        showCount={false}
                        totalQuestions={0}
                    />
                ))}
            </div>

            <Answers />
        </>
    )
}

export default Page