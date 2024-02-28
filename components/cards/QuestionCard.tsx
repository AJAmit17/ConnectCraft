import Link from 'next/link';
import React from 'react'
import Rendertags from '../Rendertags';
import Matric from '../matric';
import { FormatLargeNumber, formatTimeAgo } from "@/lib/utils"
import Image from 'next/image';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../EditDeleteAction';

interface QCProps {
    _id: number;
    title: string;
    tags: {
        _id: number,
        name: string
    }[];
    author: {
        clerkId: any;
        _id: number,
        name: string,
        picture: string
    };
    upvotes: number;
    views: number;
    answers: Array<object>;
    createdAt: Date;
    type?: string;
    clerkId?: string;
}

const QuestionCard = ({
    clerkId,
    _id,
    title,
    tags,
    author,
    upvotes,
    views,
    answers,
    createdAt,
    type
}: QCProps) => {

    //@ts-ignore
    const showActionButtons = clerkId && clerkId === author.clerkId;

    return (
        <div className='bg-primary-foreground p-9 sm:px-11 rounded-[10px] shadow-xl'>
            <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row'>
                <div>
                    <span className=' text-sm line-clamp-1 flex'>{createdAt.toDateString()}</span>
                    <Link href={`/question/${_id}`}>
                        <h3 className=' text-2xl font-bold line-clamp-1 flex-1'>{title}</h3>
                    </Link>
                </div>

                <SignedIn>
                    {type === "Profile" && showActionButtons && (
                        <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
                    )}
                </SignedIn>
                
                {type === "Collection" && (
                    <Image
                        src="/assets/icons/star-filled.svg"
                        alt="star"
                        width={18}
                        height={18}
                        className="cursor-pointer"
                    />
                )}
            </div>

            <div>
                <div className='mt-3.5 flex flex-wrap gap-2'>
                    {tags.map((tag) => (
                        <Rendertags
                            key={tag._id}
                            _id={tag._id}
                            name={tag.name}
                            totalQuestions={0}
                            showCount={false}
                        />
                    ))}
                </div>
            </div>

            <div className='flex items-center justify-between mt-6 w-full flex-wrap'>
                <Matric
                    imgUrl={author.picture}
                    alt="User"
                    value={author.name}
                    href={`/profile/${author.clerkId}`}
                    isAuthor
                    title={formatTimeAgo(createdAt.getTime())}
                />
                <Matric
                    imgUrl='/assets/icons/like.svg'
                    alt="Upvotes"
                    value={(upvotes)}
                    title=" Votes"
                />
                <Matric
                    imgUrl='/assets/icons/message.svg'
                    alt="Messages"
                    value={(answers.length)}
                    title=" Answers"
                />
                <Matric
                    imgUrl='/assets/icons/eye.svg'
                    alt="Views"
                    value={(views)}
                    title=" Views"
                />
            </div>
        </div>
    );
};

export default QuestionCard;