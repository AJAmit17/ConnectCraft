import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Rendertags from './Rendertags'

const RightSideBar = () => {
  const hotQ = [
    {
      _id: 1,
      title: 'How do I get started with Next.js?'
    },
    {
      _id: 2,
      title: 'How do I get started with Next.js?'
    },
    {
      _id: 3,
      title: 'How do I get started with Next.js?'
    },
    {
      _id: 4,
      title: 'How do I get started with Next.js?'
    },
    {
      _id: 5,
      title: 'How do I get started with Next.js?'
    }
  ]

  const PopTags = [
    {
      _id: 1,
      name: 'Next.js',
      totalQuestions: 5
    },
    {
      _id: 2,
      name: 'sdjkbvolskdnfpas.js',
      totalQuestions: 5
    },
    {
      _id: 3,
      name: 'Nsdfsdfsdfext.js',
      totalQuestions: 5
    },
    {
      _id: 4,
      name: 'Nexfsdfsdt.js',
      totalQuestions: 5
    },
    {
      _id: 5,
      name: 'Nexsdft.js',
      totalQuestions: 5
    }
  ]

  return (
    <section className='bg-muted sticky right-0 top-0 h-screen flex-col justify-between overflow-y-auto p-6 pt-36 shadow-white-300 dark:shadow-none lg:w-[290px] hidden lg:flex custom-scrollbar'>
      <div>
        <h3 className="text-3xl font-bold">Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {hotQ.map((item) => {
            return (
              <Link
                href={`/questions/${item._id}`}
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
          {PopTags.map((item) => {
            return (
              <Rendertags
                key={item._id}
                _id={item._id}
                name={item.name}
                totalQuestions={item.totalQuestions}
                showCount
              />
            )
          })}
        </div>
      </div>

      <div>
        test2
      </div>
    </section>
  )
}

export default RightSideBar