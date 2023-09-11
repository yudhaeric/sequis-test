import React from 'react'
import Image from 'next/image'

export default function HeaderMobile() {
  return (
    <div>
      <div className='flex justify-between items-center mb-7 lg:hidden'>
        <div className='flex items-end bg-[#FF6B01] w-52 h-20 pl-4 pb-2'>
          <h1 className='uppercase font-bold'><span className='line-through'>logoooooo</span> <br/> web developer </h1>
        </div>
        <Image
          src="/hamburger-menu.png"
          width={30}
          height={30}
          alt='Menu Icon'
        />
      </div>
    </div>
  )
}
