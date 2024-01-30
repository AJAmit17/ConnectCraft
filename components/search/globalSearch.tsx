import React from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"

const GlobalSearch = () => {
    return (
        <div className=' relative w-full max-w-[600px] max-lg:hidden'>
            <div className=' relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
                <Image
                    src="/assets/icons/search.svg"
                    alt='Search'
                    width={24}
                    height={24}
                    className=' cursor-pointer text-transparent'
                    loading='lazy'
                />
                <Input
                    type='text'
                    placeholder='Search Gloabally..'
                    className='bg-input flex h-9 w-full rounded-md border border-slate-200 px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 border-none shadow-none outline-none'
                />
            </div>
        </div>
    )
}

export default GlobalSearch;