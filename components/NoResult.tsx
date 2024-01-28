import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

interface NoResultProps {
    title: string,
    description: string,
    href: string,
    BtnHeading: string
}

const NoResult = ({
    title,
    description,
    href,
    BtnHeading
}: NoResultProps) => {
    return (
        <div className='mt-10 flex w-full flex-col items-center justify-center'>
            <Image
                width={270}
                height={200}
                alt='No results'
                src='/assets/images/light-illustration.png'
                className='block object-contain dark:hidden'
            />

            <Image
                width={270}
                height={200}
                alt='No results'
                src='/assets/images/dark-illustration.png'
                className='object-contain dark:block hidden'
            />


            <h2 className='text-2xl font-bold text-center max-w-md pt-4'>{title}</h2>
            <p className='text-center max-w-md p-4'>{description}</p>

            <Link href={`${href}`} >
                <Button className=' bg-violet-700 text-white px-6 py-5'>{BtnHeading}</Button>
            </Link>
        </div>
    )
}

export default NoResult