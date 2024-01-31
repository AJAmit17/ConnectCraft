import { getUserById } from '@/actions/user.action';
import Questions from '@/components/forms/Questions'
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
  const { userId } = auth();

  // const userId = "123456";

  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });

  // console.log(mongoUser);

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