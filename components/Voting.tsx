"use client"

import React, { useEffect } from 'react'
import Image from 'next/image';
import {
  downvoteAnswer,
  downvoteQuestions,
  upvoteAnswer,
  upvoteQuestions
} from '@/actions/question.action';
import { usePathname, useRouter } from 'next/navigation';
import { toggleSave } from '@/actions/user.action';
import { viewQuestions } from '@/actions/interaction.action';


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
  const router = useRouter();
  const handleSave = async () => {
    await toggleSave({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname
    })

    console.log("saved")
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
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
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
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }
    }
  }

  useEffect(()=>{
    viewQuestions({
      questionId: JSON.parse(itemId),
      userId: userId? JSON.parse(userId) : undefined,
    })
    console.log("viewed");
  },[itemId, userId, pathname, router]);

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

      {type === "Question" && (
        <Image
          src={hasSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star-red.svg"}
          alt="Star Icon"
          width={20}
          height={20}
          className=' cursor-pointer'
          onClick={handleSave}
        />
      )}
    </div>
  )
}

export default Voting;