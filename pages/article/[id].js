import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

  return (
    <div>
      <h1>Detail Artikel</h1>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
}
