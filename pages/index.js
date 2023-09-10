import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Homepage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Memanggil API route /api/articles
    axios.get('/api/articles')
      .then((response) => {
        const data = response.data.data;
        setArticles(data);
      })
      .catch((error) => {
        console.error('Error articles data not found:', error);
      });
  }, []);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Memanggil API route /api/categories
    axios.get('/api/categories')
      .then((response) => {
        const data = response.data.data;
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error categories data not found:', error);
      });
  }, []);
  
  const categoryTopID = [1, 2, 3];
  const categoryTop = categories.filter(category => categoryTopID.includes(category.id));

  const categoryBottomID = [4, 5, 6];
  const categoryBottom = categories.filter(category => categoryBottomID.includes(category.id));

  const [selectedCategory, setSelectedCategory] = useState("All Articles");

  const handleCategoryArticle = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
  };

  const [filteredArticles, setFilteredArticles] = useState([]);
  const [showMoreCount, setShowMoreCount] = useState(10);
  const [showMoreArticleButton, setShowMoreArticleButton] = useState(false);

  const handleShowMoreArticle = () => {
    setShowMoreCount(showMoreCount + 10);
  }

  useEffect(() => {
    let newFilteredArticles;
  
    if (selectedCategory === "All Articles") {
      // Filter dan urutkan artikel
      newFilteredArticles = articles
        .filter(article => article.is_featured === false)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      // Filter artikel berdasarkan kategori yang dipilih
      newFilteredArticles = articles.filter(article => article.categories.title === selectedCategory);
    }
  
    // Set jumlah artikel yang akan ditampilkan
    const articlesToShow = newFilteredArticles.slice(0, showMoreCount);
  
    // Atur state filteredArticles dan tombol "More Articles"
    setFilteredArticles(articlesToShow);
  
    // Atur tombol "More Articles" berdasarkan apakah ada lebih banyak artikel yang tersedia
    if (showMoreCount >= newFilteredArticles.length) {
      setShowMoreArticleButton(false);
    } else {
      setShowMoreArticleButton(true);
    }
  }, [selectedCategory, articles, showMoreCount]);

  return (
    <div className='flex flex-col items-center'>
      {/* Header */}
      <header className='w-[90%] lg:w-[95%]'>
        {/* Mobile */}
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
        {/* Desktop */}
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
      </header>
      {/* Article Section */}
      <div className='grid grid-cols-1 gap-6 w-[85%] lg:grid-cols-2'>
        {filteredArticles.map((article) => (
          <div key={article.id} className='flex flex-col items-center'>
            <Image
              className='rounded-xl w-[600px] h-[200px] lg:h-[400px]'
              src={article.image}
              width={600}
              height={450}
              alt='Image Article'
            />
            <div className='border-2 border-solid border-black rounded-full mt-7 px-3'>
              <h5 className='uppercase text-sm'>By <span className='font-bold'>{article.author}</span></h5>
            </div>
            <h2 className='mt-4 text-center text-xl font-semibold'>{article.title}</h2>
          </div>
        ))}
      </div>
      {showMoreArticleButton && (
        <button
          id='moreArticlesButton'
          className='mt-16 px-14 py-4 border border-black'
          onClick={() => handleShowMoreArticle()}
        >
          MORE ARTICLES
        </button>
      )}
    </div>
  );
}
