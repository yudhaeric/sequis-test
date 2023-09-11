import React, { useState, useEffect } from 'react';
import CategoryMobile from './category-mobile';
import HeaderDesktop from './header-desktop';
import Image from 'next/image';

export default function Header({
  articles,
  categories,
  selectedCategory,
  handleCategoryArticle,
}) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)

  const handleCloseHeader = () => {
    setShowCategoryMenu(!showCategoryMenu)
  }

  return (
    <div>
      {/* Header Mobile */}
      <header className='w-[95%]'>
        {showCategoryMenu && (
          <CategoryMobile 
            handleCloseHeader={handleCloseHeader}
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryArticle={handleCategoryArticle}
          />
        )}
        <div className='flex justify-between items-center mb-7 lg:hidden'>
          <div className='flex items-end bg-[#FF6B01] w-52 h-20 pl-4 pb-2'>
            <h1 className='uppercase font-bold'><span className='line-through'>logoooooo</span> <br/> web developer </h1>
          </div>
          <button onClick={() => {setShowCategoryMenu(true)}}>
            <Image
              className=''
              src="/hamburger-menu.png"
              width={30}
              height={30}
              alt='Menu Icon'
            />
          </button>
        </div>
        <HeaderDesktop
          categories={categories}
          articles={articles}
          selectedCategory={selectedCategory}
          handleCategoryArticle={handleCategoryArticle}
        />
      </header>
    </div>
  )
}
