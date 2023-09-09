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

  return (
    <div className='flex flex-col items-center'>
      {/* Header */}
      <div className='flex mb-7 justify-between items-center gap-8 w-full pl-4 pr-8'>
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
      {/* Article Section */}
      <div className='grid grid-cols-1 gap-6 w-[85%] lg:grid-cols-2'>
        {articles.map((article) => (
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
    </div>
  );
}
