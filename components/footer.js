import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <div className='flex flex-col items-center w-full bg-[#1E1F21]'>
      <div className='my-16 w-[90%] lg:flex lg:justify-between lg:items-center lg:my-10'>
        <div className='flex items-center justify-center mb-10 lg:mb-1'>
          <Image
            className='lg:w-[54px] lg:h-[54px]'
            src="/sequisinlab-logo.png"
            width={67}
            height={67}
            alt='Sequis Innovation Lab Logo'
          />
          <h2 className='text-white font-bold text-lg leading-6 lg:text-sm lg:leading-4'>Sequis<br/>Innovation<br/>Lab</h2>
        </div>
        <div>
          <p className='text-[#FF6B01] text-center font-semibold mb-3 lg:text-start lg:mb-1'>The more that you read, the more things you will know. The more that you learn, the more places you&rsquo;ll go.</p>
          <p className='text-[#e8e8e8] text-center lg:text-start'>Created by the <span className='underline'>Innovation Lab</span> for testing web development skills.</p>
        </div>
      </div>
    </div>
  )
}
