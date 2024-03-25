import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { GetTopInteractedTags } from '@/actions/tag.action';
import { Badge } from '../ui/badge';
import Rendertags from '../Rendertags';

interface Props {
    user: {
        _id: string;
        clerkId: string;
        picture: string;
        name: string;
        username: string
    }
}

const UserCard = async ({ user }: Props) => {

    const interactedTags = await GetTopInteractedTags({ userId: user._id })
    return (
        <Link
            href={`/profile/${user.clerkId}`}
            className="gap-6 xs:w-[260px] max-sm:min-w-full"
        >
            <article className='bg-primary-foreground w-full flex flex-col items-center justify-center border p-8 rounded-2xl'>
                <Image
                    src={user.picture}
                    alt="User Profile Picture"
                    width={100}
                    height={100}
                    className='rounded-full'
                />

                <div className='mt-4 text-center font-semibold'>
                    <h3 className=' line-clamp-1'>
                        {user.name}
                    </h3>
                    <p className=' mt-2'>{user.username}</p>
                </div>

                <div className='mt-5'>
                    {interactedTags.length > 0
                        ? (
                            <div className='flex items-center gap-2'>
                                {interactedTags.map((tag) => (
                                    <Rendertags
                                        key={tag._id}
                                        _id={tag._id}
                                        name={tag.name}
                                        showCount={false} totalQuestions={0}
                                    />
                                ))}
                            </div>
                        )
                        : (
                            <Badge>
                                No Top Interacted Tags
                            </Badge>
                        )
                    }
                </div>
            </article>
        </Link>
    )
}

export default UserCard