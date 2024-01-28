import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input'

interface CustomInputProps {
    route: string
    iconPosition: string
    imgSrc: string
    placeholder: string
    otherClasses: string
}

const LocalSearch = ({
    route,
    iconPosition,
    imgSrc,
    placeholder,
    otherClasses
}: CustomInputProps) => {
    return (
        <div className={`bg-input flex min-h-[56px] grow items-center gap-4 rounded-lg px-4 ${otherClasses}`}>
            {iconPosition === 'left' && (
                <Image
                    src={imgSrc}
                    alt='Search Icon'
                    width={24}
                    height={24}
                    className=' cursor-pointer'
                />
            )}

            <Input
            type='text'
            placeholder={placeholder}
            // onChange={() => {}}
            className='no-focus flex-1 border-none shadow-none outline-none'
            />
        </div>
    )
}

export default LocalSearch