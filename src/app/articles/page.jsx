import React from 'react';
import ArticleLandingPage from '@/pages/articlesSection/articleLanding';
import LatestArticleSection from '@/pages/articlesSection/LatestArticleSection';
import { fetchGlobal } from '@/server-action/api';
import AllArticleSection from '@/pages/articlesSection/AllArticleSection';

export default async function Page() {
  let ArticlesData = [];

  try {
    const data = await fetchGlobal("/article");
    console.log(data,'data')

    if (!Array.isArray(data)) {
      throw new Error("Invalid Articles format.");
    }

    ArticlesData = data;
  } catch (error) {
    console.error("Failed to fetch Articles data:", error);

    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Failed to load articles</h1>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <ArticleLandingPage ArticlesData={ArticlesData} />
      <LatestArticleSection ArticlesData={ArticlesData} />
      <AllArticleSection  ArticlesData={ArticlesData}  />
    </div>
  );
}
