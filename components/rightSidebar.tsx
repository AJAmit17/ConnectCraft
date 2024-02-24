import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Rendertags from './Rendertags'
import { getHotQuestion } from '@/actions/question.action'
import { getPopularTags } from '@/actions/tag.action'

const RightSideBar = async() => {
  const hotQ = await getHotQuestion();
  const PopTags = await getPopularTags();

  return (
    <section className='bg-primary-foreground sticky right-0 top-0 h-screen flex-col justify-between overflow-y-auto p-6 pt-36 shadow-white-300 dark:shadow-none lg:w-[290px] hidden lg:flex custom-scrollbar border-l-2'>
      <div>
        <h3 className="text-3xl font-bold">Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {
            //@ts-ignore
            hotQ.map((item) => {
            return (
              <Link
                href={`/question/${item._id}`}
                key={item._id}
                className='flex cursor-pointer items-center justify-between gap-7'
              >
                <p>{item.title}</p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  width={20}
                  height={20}
                  alt="Chevron Right"
                />
              </Link>
            )
          })}
        </div>
      </div>

      <div className='mt-16'>
        <h3 className='text-3xl font-bold'>Popular Tags</h3>
        <div className='mt-7 flex w-full flex-col gap-4'>
          {
          //@ts-ignore
          PopTags.map((item) => {
            return (
              <Rendertags
                key={item._id}
                _id={item._id}
                name={item.name}
                totalQuestions={item.numberOfQuestions}
                showCount
              />
            )
          })}
        </div>
      </div>

      {/* <div>
        test2
      </div> */}
    </section>
  )
}

export default RightSideBar