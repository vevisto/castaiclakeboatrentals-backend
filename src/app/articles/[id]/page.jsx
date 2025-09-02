// app/articles/[id]/page.jsx

import ArticleDetailPage from '@/pages/articlesSection/ArticleDetailspage';
import React from 'react';

export default async function Page({ params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:5000/api/article/${id}`, {
    cache: 'no-store',
  });


  if (!res.ok) {
    return <div>Article not found.</div>;
  }

  const article = await res.json();

  return (
    <div>
      <ArticleDetailPage article={article?.data} />
    </div>
  );
}
