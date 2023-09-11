import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CategoryMobile({categories, selectedCategory, handleCategoryArticle, handleCloseHeader = () => {}}) {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full z-50'>
        <ul className='flex flex-col gap-7 items-end text-[16px] font-bold text-white absolute bg-white w-full h-full right-0 pt-5 animate-headerIn'>
          <li className='pr-5'>
            <button onClick={() => handleCloseHeader()}>
              <Image
                src="/close.png"
                width={25}
                height={25}
                alt=''
              />
            </button>
          </li>
          <div className='flex flex-col items-center w-full mt-5'>
            {categories.map((category) => (
              <li key={category.id} className='mt-3'>
                <a 
                  onClick={() => {
                    handleCategoryArticle(category.title);
                    handleCloseHeader();
                  }} 
                  className={`${selectedCategory === category.title ? 'text-[#FF6B01]' : 'text-black'} cursor-pointer font-bold text-[22px]`}
                >
                  {category.title}
                </a>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </>
  )
}
