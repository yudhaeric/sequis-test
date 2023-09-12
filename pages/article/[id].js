import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import axios from 'axios';
import Image from 'next/image';
import Footer from '../../components/footer';

export default function DetailArticle() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetch(`/api/articles`)
      .then((response) => response.json())
      .then((data) => {
        const foundArticle = data.data.find((item) => item.id === parseInt(id));
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          console.error('Artikel tidak ditemukan');
        }
      });
  }, [id]);

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

  // Tanggal dalam format ISO
  const dateString = article.created_at;

  // Ubah tanggal menjadi objek Date
  const date = new Date(dateString);

  // Daftar nama bulan
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Dapatkan nama bulan dan tahun
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Format ulang tanggal sesuai dengan format yang diinginkan
  const formattedDate = `PUBLISHED ${month} ${day}, ${year}`;

  return (
    <div className='w-full flex flex-col items-center'>
      <header className='w-[90%] lg:w-[100%]'>
        <Header
          articles={articles}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryArticle={handleCategoryArticle}
        />
      </header>
      {/* Article */}
      <div className='w-[90%] lg:w-[100%]'>
        <Image
          className='w-full lg:mx-[6%] lg:w-[89%] lg:h-[500px] lg:rounded-lg'
          src={article.image}
          width={900}
          height={500}
          alt='Image Article'
        />
        <div className='relative bg-white rounded-tr-xl w-[200px] h-[50px] mt-[-50px] z-10 lg:mx-[6%]'>
          <p className='uppercase text-[9px] mx-[15%] font-semibold pt-2'>{formattedDate}</p>
          <p className='uppercase text-[12px] mx-[15%]'> BY <span className='font-bold'>{article.author}</span></p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-[80%] lg:w-[75%]'>
        <h1 className='text-[32px] text-center font-bold my-6 lg:text-[44px]'>{article.title}</h1>
        <h3 className='text-[22px] text-center font-zilla-reguler lg:text-[24px] lg:w-[80%]'>{article.summary}</h3>
        <div className='w-[95%] border-b border-b-black my-7 lg:w-full'></div>
        <div className='w-[95%] text-[18px] mb-10 font-zilla-reguler lg:w-[80%]'>{article.content}</div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
