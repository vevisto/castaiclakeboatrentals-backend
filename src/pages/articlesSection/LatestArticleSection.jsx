import { BASE_URL } from "@/constant/constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LatestArticleSection({ ArticlesData = [] }) {
  const reversedArticles = [...ArticlesData].reverse();
  const featured = reversedArticles[0];
  const others = reversedArticles.slice(1, 4);

  if (!featured) {
    // No articles available fallback
    return (
      <div className="max-w-[1300px] mx-auto px-4 py-3">
        <h2 className="text-[32px] text-[#21252C] font-bold">Latest Articles</h2>
        <p className="text-[#808080] mb-8">No articles available</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto px-4 py-3">
      <h2 className="text-[32px]  font-semibold">Latest Articles</h2>
      <p className="text-[#808080] mb-8">
        Get Inspired with Our Latest Articles and Stories
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Featured Article */}
        <div className="flex-1">
          <Link
            href={`/articles/${featured?._id}`}
            className="bg-white transition-shadow duration-300 block h-full"
          >
            <div className="lg:w-[696px] h-[273px]">
              <Image
                src={`${BASE_URL}/${featured?.image}`}
                alt={featured?.title || "Featured article"}
                width={600}
                height={400}
                className="h-full w-full rounded-[40px] object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[24px] text-[#21252C] font-medium mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                {featured?.title}
              </h3>
              <div className="text-[#808080] text-[16px] line-clamp-3 leading-relaxed mb-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: featured?.description || "",
                  }}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* More Articles */}
        <div className="w-full lg:max-w-[700px]">
          <div className="bg-white rounded-[20px] p-3 h-full">
            {/* <h4 className="font-semibold text-gray-800 mb-4 text-lg">
              More Articles
            </h4> */}
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
              {others.length > 0 ? (
                others.map((article, index) => (
                  <Link
                    href={`/articles/${article?._id}`}
                    key={article?._id || index}
                    className="flex gap-4 items-start hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="w-[80px] h-[60px] overflow-hidden rounded-lg flex-shrink-0">
                      <Image
                        src={`${BASE_URL}/${article?.image}`}
                        alt={article?.title || "Article"}
                        width={80}
                        height={60}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-[24px] font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {article?.title}
                      </h5>
                      <div className="text-[16px] text-[#808080] line-clamp-2 mt-1">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: article?.description || "",
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No additional articles available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
