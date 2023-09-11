import React, { useState, useEffect } from 'react';
import HeaderMobile from './header-mobile';
import HeaderDesktop from './header-desktop';

export default function Header({categories, articles, selectedCategory, handleCategoryArticle}) {
  return (
    <div>
      <HeaderMobile/>
      <HeaderDesktop
        categories={categories}
        articles={articles}
        selectedCategory={selectedCategory}
        handleCategoryArticle={handleCategoryArticle}
      />
    </div>
  )
}
