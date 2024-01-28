import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    imgUrl: string,
    alt: string,
    value: number | string,
    title: string,
    href?: string,
    isAuthor?: boolean
}

const Matric = ({
    imgUrl,
    alt,
    value,
    title,
    href,
    isAuthor
}: Props) => {
    const metricContent = (
        <div className='flex gap-2'>
            <Image
                src={imgUrl}
                alt={alt}
                width={16}
                height={16}
                className={` object-contain ${href ? "rounded-full" : ""}`}
            />

            <p className='flex items-center gap-1'>
                {value}
                <span className={`line-clamp-1 ${isAuthor ? " max-sm:hidden font-bold" : ""}`}>
                    {title}
                </span>
            </p>
        </div>
    )

    return (
        <div className='flex justify-start items-center flex-wrap gap-1'>
            {href ? (
                <Link href={href}>
                    {metricContent}
                </Link>
            ) : (
                metricContent
            )}
        </div>
    )
}

export default Matric