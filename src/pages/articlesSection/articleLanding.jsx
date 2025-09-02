'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function ArticleLandingPage({ ArticlesData = [] }) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filteredArticles = useMemo(() => {
    if (!search.trim()) return [];
    return ArticlesData.filter((article) =>
      [article?.title, article?.name]
        .some(field => field?.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, ArticlesData]);

  const handleNavigate = (id) => {
    router.push(`/articles/${id}`);
  };

  return (
    <div className="h-auto justify-center mb-8 mx-auto relative flex flex-col w-full max-w-[1300px] max-md:px-[1rem]">
      {/* Hero section */}
      <section
        className="relative w-full h-[520px] rounded-[40px] lg:rounded-[80px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(/image/article.png)` }}
      >
        <div className="absolute inset-0 rounded-[40px] lg:rounded-[80px] bg-black/14 mix-blend-multiply z-0"></div>

        <div className="relative z-10 text-center text-white w-full px-4 max-w-[1200px]">
          <h1 className="text-[40px] lg:text-[80px] poppins-semibold leading-tight tracking-wider">
            Castaic Lake <span className="relative inline-block poppins-semibold">Adventures</span><br />
            and <span className="relative inline-block poppins-semibold">Insights</span>
          </h1>
          <p className="mt-9 poppins-regular text-[#F2EFE9] text-[16px] lg:text-[20px]">
            Browse our articles, guides, and news to plan your perfect lake<br />
            getaway and create unforgettable memories
          </p>
        </div>

        {/* Search bar */}
   <div className="absolute z-50 max-w-[90rem] bg-[#d8d3cc] rounded-[12px] lg:rounded-[24px] py-3 px-4 -bottom-[30px] left-1/2 transform -translate-x-1/2 shadow-lg w-[90%] md:w-[70%]">
  {/* Search input with SVG icon */}
  <div className="flex items-center border border-gray-300 rounded-full w-full h-12 md:h-14 px-4 gap-2 bg-white shadow-sm">
    {/* SVG Search Icon */}
    

    <input
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search article here..."
      className="flex-grow h-full px-2 bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm md:text-base"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
      />
    </svg>
  </div>

  {/* Search result list */}
  {search.trim() && (
    <div className=" absolute inset-x-0 py-1 rounded-b-md px-2 md:px-0 h-[300px] overflow-y-scroll">
      {filteredArticles.length > 0 ? (
        <ul className="bg-white rounded-b-md shadow-md max-w-2xl mx-auto">
          {filteredArticles.map((article) => (
            <li
              key={article.id}
              onClick={() => handleNavigate(article._id)}
              className="p-3 md:p-4 cursor-pointer hover:bg-gray-100 transition text-sm md:text-base"
            >
              {article.title || article.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="  bg-[white] p-5 text-center text-gray-500 mt-4 text-sm md:text-base">
          No matching articles found.
        </p>
      )}
    </div>
  )}
</div>

      </section>


    </div>
  );
}
