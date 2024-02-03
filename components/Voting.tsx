"use client"

import React from 'react'
import Image from 'next/image';

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

  const handleSave = () => {

  }

  const handleVote = (action: string) => {

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
          // onClick={(e) => (e)}
          />

          <div className='flex items-center justify-center min-h-[18px] rounded-sm p-1'>
            <p>
              {upvotes}
            </p>
          </div>
        </div>

        <div className='flex items-center justify-center gap-1.5'>
          <Image
            src={hasupVoted ? "/assets/icons/downvoted.svg" : "/assets/icons/downvote.svg"}
            alt="DownVoting"
            width={20}
            height={20}
            className=' cursor-pointer'
          // onClick={(e) => (e)}
          />

          <div className='flex items-center justify-center min-h-[18px] rounded-sm p-1'>
            <p>
              {upvotes}
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
      // onClick={(e) => (e)}
      />
    </div>
  )
}

export default Voting