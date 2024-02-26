import Link from 'next/link'
import React from 'react'
import { Badge } from './ui/badge'

interface TagProps {
    _id: number | string,
    name: string,
    totalQuestions?: number
    showCount?: boolean
}
const Rendertags = ({
    _id,
    name,
    totalQuestions,
    showCount
}: TagProps) => {
    return (
        <Link
            href={`/tags/${_id}`}
            className='flex justify-between gap-2'
        >
            <Badge className=' bg-violet-600 text-white rounded-md border-none px-4 py-2 uppercase'>{name}</Badge>

            {showCount && <p className='text-sm'>{totalQuestions}</p>}
        </Link>
    )
}

export default Rendertags