'use client';
import { BASE_URL } from '@/constant/constant';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

// ✅ Strip HTML and limit words for excerpt
const getExcerpt = (htmlString, wordLimit = 1) => {
  const plainText = htmlString?.replace(/<[^>]+>/g, ''); // Remove HTML tags
  const words = plainText?.split(/\s+/);

  if (words.length <= wordLimit) return plainText;
  return words.slice(0, wordLimit).join(' ') + '...';
};

// ✅ Custom Hook to fetch all articles
export function useAllArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_BASE}/article`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setArticles(data?.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
}

// ✅ Component to display article list
export default function ArticleList() {
  const { articles, loading, error } = useAllArticles();
  console.log(articles, "articles")

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-[1300px] py-6 px-4 mx-auto">
      <div className="grid md:grid-cols-3  gap-6">
        {articles &&articles?.slice(0, 3).map((article) => {

          const splitContent = (htmlString, wordsPerChunk = 10) => {
            const plainText = htmlString?.replace(/<[^>]+>/g, '');
            const words = plainText?.split(/\s+/);

            const chunks = [];
            for (let i = 0; i < words.length; i += wordsPerChunk) {
              chunks.push(words.slice(i, i + wordsPerChunk).join(' ') + ' .......');
            }

            return chunks.join('<br/><br/>');
          }
          return (
            <Link href={`/articles/${article?._id}`} key={article.id} className="pb-5    ">

              <Image
                src={`${BASE_URL}/${article.image}`}
                alt={article?.title}
                width={400}
                height={250}
                className="w-[410.67px] rounded-[40px]  h-[280px] object-cover"
              />

              <div className="p-4">
                {/* {new Date(article?.createdAt
            ).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })} */}

                <div className="">
                  <h3 className="text-[24px] font-medium mb-2">{article?.title}</h3>
                  <div className="text-sm text-gray-600 h-[20px] ">     <div
                    className="text-[16px] text-[#808080] h-[40px]  overflow-hidden "
                    dangerouslySetInnerHTML={{
                      __html: article?.description && splitContent(article?.description),
                    }} /></div>
                </div>
              </div>

            </Link>
          )
        })}
      </div>
    </div>
  );
}
