import { HomePageFilters } from '@/constants/filter'
import React from 'react'
import { Button } from './ui/button'

const HomeFilters = () => {
    const Active = "newest";

    return (
        <div className='mt-10 flex-wrap gap-3 md:flex'>
            {HomePageFilters.map((item) => (
                <Button 
                key={item.value}
                className={`bg-purple-500 text-white
                rounded-lg px-6 py-3 mx-1 capitalize shadow-none 
                ${Active === item.value ? "bg-violet-600" : ""}
                `}
                >
                    {item.name}
                </Button>
            ))}
        </div>
    )
}

export default HomeFilters