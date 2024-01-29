import Questions from '@/components/forms/Questions'
import React from 'react'

const Page = () => {
  return (
    <div>
        <h1 className=' text-3xl font-bold'>Ask Question</h1>
        <div className='mt-9'>
            <Questions />
        </div>
    </div>
  )
}

export default Page