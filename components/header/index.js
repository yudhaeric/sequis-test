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
        <div className='flex justify-between items-center mb-10 lg:hidden mt-7'>
          <Image
            className='w-[265px] h-[40px] pl-4'
            src="/logo.png"
            width={165}
            height={20}
            alt='Logo Mobile'
          />
          <button onClick={() => {setShowCategoryMenu(true)}}>
            <Image
              className=''
              src="/hamburger-menu.png"
              width={24}
              height={24}
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
