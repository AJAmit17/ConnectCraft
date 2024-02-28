import { getUserById } from '@/actions/user.action';
import Questions from '@/components/forms/Questions'
import { auth } from '@clerk/nextjs';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
  title: "Ask a Question | ConnectCraft",
};

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className=' text-3xl font-bold'>Ask Question</h1>
      <div className='mt-9'>
        <Questions monogoUserId={JSON.stringify(mongoUser._id)}/>
      </div>
    </div>
  )
}

export default Page