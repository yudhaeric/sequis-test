import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeaderDesktop({categories, articles, selectedCategory, handleCategoryArticle}) {
  const categoryTopID = [1, 2, 3];
  const categoryTop = categories.filter(category => categoryTopID.includes(category.id));

  const categoryBottomID = [4, 5, 6];
  const categoryBottom = categories.filter(category => categoryBottomID.includes(category.id));

  return (
    <div className='flex w-full justify-between mobile:hidden'>
      <Image
        src="/logo.png"
        width={70}
        height={120}
        alt='Logo'
      />
      <div className='grid grid-cols-3 items-center gap-x-7 mr-[70px]'>
        {categoryTop.map((category) => (
          <div key={category.id}>
            <a 
              onClick={() => handleCategoryArticle(category.title)} 
              className={`${selectedCategory === category.title ? 'text-[#FF6B01]' : ''} cursor-pointer font-bold`}
            >
              {category.title}
            </a>
          </div>
        ))}
        {categoryBottom.map((category) => (
          <div key={category.id} className='mt-[-80px]'>
            <a 
              onClick={() => handleCategoryArticle(category.title)} 
              className={`${selectedCategory === category.title ? 'text-[#FF6B01]' : ''} cursor-pointer font-bold`}
            >
              {category.title}
            </a>
            <div className='border-b-4 border-black w-64 mt-3'/>
          </div>
        ))}
      </div>
    </div>
  )
}
