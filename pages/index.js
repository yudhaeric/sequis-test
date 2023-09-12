import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import Head from "next/head";

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

  const [selectedCategory, setSelectedCategory] = useState("All Articles");

  const handleCategoryArticle = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
  };

  const [filteredArticles, setFilteredArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
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

    let featuredArticles = articles.filter(article => article.is_featured === true).slice(0, 3);
    setFeaturedArticles(featuredArticles);

  }, [selectedCategory, articles, showMoreCount]);

  return (
    <div className='flex flex-col items-center'>
      <Head>
        <title>Explore & Discover</title>
      </Head>
      <header className='w-[90%] lg:w-[95%]'>
        <Header
          articles={articles}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryArticle={handleCategoryArticle}
        />
      </header>
      {/* Article Section */}
      <div className='grid grid-cols-1 gap-6 w-[85%] lg:grid-cols-2 lg:px-1'>
        {filteredArticles.map((article) => (
          <div key={article.id}>
            <a href={`/article/${article.id}`} className='flex flex-col items-center'>
              <Image
                className='rounded-xl w-[600px] h-[200px] lg:h-[400px] lg:rounded-lg'
                src={article.image}
                width={600}
                height={450}
                alt='Image Article'
              />
              <div className='border-2 border-solid border-black rounded-full mt-7 px-3'>
                <h5 className='uppercase text-sm'>By <span className='font-bold'>{article.author}</span></h5>
              </div>
              <h2 className='mt-4 text-center text-xl font-semibold'>{article.title}</h2>
            </a>
          </div>
        ))}
      </div>
      {showMoreArticleButton && (
        <button
          id='moreArticlesButton'
          className='mt-16 px-14 py-4 border-2 border-black'
          onClick={() => handleShowMoreArticle()}
        >
          MORE ARTICLES
        </button>
      )}
      {/* Featured Article Section */}
      <div className='flex flex-col items-center w-full mt-16 bg-black'>
        <div className='flex flex-col justify-center items-center text-white w-[90%] mt-10 lg:mt-16'>
          <h1 className='text-[34px] font-bold lg:text-[44px]'>Empowering Minds</h1>
          <p className='mt-3 opacity-80 text-[24px] text-center'>Insights and Strategies for Personal and Professional Growth</p>
          <div className='grid grid-cols-1 my-10 lg:grid-cols-3'>
            {featuredArticles.map((article) => (
              <div key={article.id}>
                <a href={`/article/${article.id}`}>
                  <Image
                    className='rounded-xl w-[600px] h-[200px] lg:w-[350px] lg:h-[250px]'
                    src={article.image}
                    width={600}
                    height={450}
                    alt='Image Article'
                  />
                  <div className='border-2 border-solid border-white w-[60%] rounded-full mt-7 py-1 mx-[20%] lg:w-[45%] lg:mx-[25%]'>
                    <h5 className='uppercase text-sm text-center lg:text-[11px]'>By <span className='font-bold'>{article.author}</span></h5>
                  </div>
                  <h2 className='my-5 text-center text-[26px] lg:text-[20px]'>{article.title}</h2>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
