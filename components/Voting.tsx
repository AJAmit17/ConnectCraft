"use client"

import React from 'react'
import Image from 'next/image';
import { downvoteQuestions, upvoteAnswer, upvoteQuestions } from '@/actions/question.action';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  type: any;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Voting = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved
}: Props) => {

  const pathname = usePathname();
  // const route = useRouter();
  const handleSave = () => {

  }

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestions({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }
      else if (type === "Answer") {
        // await upvoteAnswer({
        //   answerId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname,
        // })
      }
    }

    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestions({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }
      else if (type === "Answer") {
        // await upvoteAnswer({
        //   answerId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname,
        // })
      }
    }
  }

  return (
    <div className='flex gap-5'>
      <div className='flex items-center justify-center gap-2.5'>
        <div className='flex items-center justify-center gap-1.5'>
          <Image
            src={hasupVoted ? "/assets/icons/upvoted.svg" : "/assets/icons/upvote.svg"}
            alt="UpVoting"
            width={20}
            height={20}
            className=' cursor-pointer'
            onClick={() => handleVote('upvote')}
          />

          <div className='flex items-center justify-center min-h-[18px] rounded-sm p-1'>
            <p>
              {upvotes}
            </p>
          </div>
        </div>

        <div className='flex items-center justify-center gap-1.5'>
          <Image
            src={hasdownVoted ? "/assets/icons/downvoted.svg" : "/assets/icons/downvote.svg"}
            alt="DownVoting"
            width={20}
            height={20}
            className=' cursor-pointer'
            onClick={() => handleVote('downvote')}
          />

          <div className='flex items-center justify-center min-h-[18px] rounded-sm p-1'>
            <p>
              {downvotes}
            </p>
          </div>
        </div>
      </div>

      <Image
        src={hasSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star-red.svg"}
        alt="Star Icon"
        width={20}
        height={20}
        className=' cursor-pointer'
        // onClick={() => handleVote('downvote')}
      />
    </div>
  )
}

export default Voting;