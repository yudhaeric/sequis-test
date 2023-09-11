import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import axios from 'axios';

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

  return (
    <div className='flex flex-col items-center'>
      <header className='w-[90%] lg:w-[95%]'>
        <Header
          articles={articles}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryArticle={handleCategoryArticle}
        />
      </header>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
}
