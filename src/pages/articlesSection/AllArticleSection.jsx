"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/constant/constant";

export default function AllArticles({ ArticlesData = [] }) {
  // Helper function to split HTML content into chunks of words safely
  const splitContent = (htmlString, wordsPerChunk = 18) => {
    const plainText = htmlString ? htmlString.replace(/<[^>]+>/g, "") : "";
    const words = plainText.split(/\s+/);

    const chunks = [];
    for (let i = 0; i < words.length; i += wordsPerChunk) {
      chunks.push(words.slice(i, i + wordsPerChunk).join(" ") + " .......");
    }

    return chunks.join("<br/><br/>");
  };


    const splitContents = (htmlString, wordsPerChunk = 50) => {
    const plainText = htmlString ? htmlString.replace(/<[^>]+>/g, "") : "";
    const words = plainText.split(/\s+/);

    const chunks = [];
    for (let i = 0; i < words.length; i += wordsPerChunk) {
      chunks.push(words.slice(i, i + wordsPerChunk).join(" ") + " .......");
    }

    return chunks.join("<br/><br/>");
  };
  return (
    <div className="max-w-[1300px] mx-auto px-4 py-10">
      <h2 className="text-[32px] font-semibold mb-2">All Articles</h2>
      <p className="text-[#808080] text-[20px] mb-8">
        Browse Our Collection of Articles, Tips, and Stories
      </p>

      {/* First 3 articles */}
      <div className="grid md:grid-cols-3 gap-6">
        {ArticlesData?.slice(0, 3).map((article) => (
          <Link
            href={`/articles/${article?._id}`}
            key={article?._id}
            className="pb-5"
          >
            <Image
              src={`${BASE_URL}/${article?.image}`}
              alt={article?.title || "Article Image"}
              width={400}
              height={250}
              className="w-[3000px] rounded-[40px] h-[250px] object-cover"
            />
            <div className="p-4">
              <div>
                <h3 className="text-[24px] font-medium mb-2">{article?.title}</h3>
                <p className="text-[16px] text-[#808080] h-[20px]">
                  <div
                    className="text-sm text-[#808080] text-[16px]  h-[45px] overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: splitContent(article?.description || ''),
                    }}
                  />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Decorative SVG if more than 4 articles */}
      {ArticlesData?.length > 4 && (
        <div className="py-7 overflow-hidden">
       <svg width="1282" height="10" viewBox="0 0 1282 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1281 0.999965L1244.33 7.69044C1239.58 8.55634 1234.71 8.55634 1229.97 7.69044L1200.47 2.30954C1195.73 1.44364 1190.86 1.44364 1186.11 2.30954L1156.62 7.69044C1151.87 8.55634 1147.01 8.55634 1142.26 7.69045L1112.76 2.30955C1108.02 1.44365 1103.15 1.44365 1098.41 2.30955L1068.91 7.69045C1064.16 8.55635 1059.3 8.55635 1054.55 7.69045L1025.06 2.30955C1020.31 1.44366 1015.45 1.44365 1010.7 2.30955L981.204 7.69046C976.458 8.55636 971.594 8.55636 966.847 7.69046L937.351 2.30956C932.604 1.44366 927.74 1.44366 922.994 2.30956L893.497 7.69047C888.751 8.55637 883.887 8.55637 879.14 7.69047L849.644 2.30957C844.897 1.44367 840.033 1.44367 835.287 2.30957L805.791 7.69048C801.044 8.55637 796.18 8.55638 791.433 7.69048L761.937 2.30957C757.19 1.44368 752.326 1.44368 747.58 2.30958L718.084 7.69048C713.337 8.55638 708.473 8.55638 703.726 7.69049L674.23 2.30958C669.484 1.44369 664.619 1.44369 659.873 2.30958L630.377 7.69049C625.63 8.55639 620.766 8.55639 616.019 7.69049L586.523 2.30959C581.777 1.44369 576.913 1.44369 572.166 2.30959L542.67 7.6905C537.923 8.5564 533.059 8.5564 528.313 7.6905L498.816 2.3096C494.07 1.4437 489.206 1.4437 484.459 2.3096L454.963 7.69051C450.216 8.5564 445.352 8.55641 440.606 7.69051L411.109 2.3096C406.363 1.44371 401.499 1.44371 396.752 2.30961L367.256 7.69052C362.509 8.55641 357.645 8.55641 352.899 7.69051L324.303 2.47392C318.973 1.50148 313.5 1.62221 308.217 2.82879L290.106 6.96563C284.243 8.30469 278.154 8.30469 272.292 6.96564L255.081 3.03451C249.219 1.69545 243.13 1.69545 237.267 3.03451L220.056 6.96564C214.194 8.3047 208.105 8.3047 202.242 6.96564L185.031 3.03451C179.169 1.69546 173.08 1.69546 167.217 3.03451L150.007 6.96565C144.144 8.30471 138.055 8.30471 132.192 6.96565L114.982 3.03452C109.119 1.69546 103.03 1.69546 97.1676 3.03452L79.9567 6.96565C74.0942 8.30471 68.0052 8.30471 62.1427 6.96566L44.9319 3.03453C39.0694 1.69547 32.9804 1.69547 27.1178 3.03453L0.999982 9.00011" stroke="#88907B" stroke-width="2" stroke-linecap="round"/>
</svg>

        </div>
      )}

      {/* Article #4 */}
      <div className="grid md:grid-cols-1 gap-6">
        {ArticlesData?.slice(3, 4).map((article) => (
          <Link
            href={`/articles/${article?._id}`}
            key={article?._id}
            className="w-full  grid  grid-cols-1  lg:grid-cols-2 lg:flex-row gap-4 bg-white"
          >
            <div className="lg:w-[616px] h-[240px] flex">
              <Image
                src={`${BASE_URL}/${article.image}`}
                alt={article?.title || "Article Image"}
                width={500}
                height={500}
                quality={100}
                className="rounded-[24px] h-full w-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="p-2 flex flex-col w-full flex-grow">
                <h3 className="text-[24px] font-medium mb-1">{article?.title}</h3>
                <div className="text-sm text-[#808080] flex h-[200px] overflow-hidden w-full flex-grow">
                <div
                    className="text-[16px] text-[#808080] h-[45px] overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: splitContents(article?.description),
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
  {ArticlesData?.length > 4 && (
        <div className="py-7 overflow-hidden">
       <svg width="1282" height="10" viewBox="0 0 1282 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1281 0.999965L1244.33 7.69044C1239.58 8.55634 1234.71 8.55634 1229.97 7.69044L1200.47 2.30954C1195.73 1.44364 1190.86 1.44364 1186.11 2.30954L1156.62 7.69044C1151.87 8.55634 1147.01 8.55634 1142.26 7.69045L1112.76 2.30955C1108.02 1.44365 1103.15 1.44365 1098.41 2.30955L1068.91 7.69045C1064.16 8.55635 1059.3 8.55635 1054.55 7.69045L1025.06 2.30955C1020.31 1.44366 1015.45 1.44365 1010.7 2.30955L981.204 7.69046C976.458 8.55636 971.594 8.55636 966.847 7.69046L937.351 2.30956C932.604 1.44366 927.74 1.44366 922.994 2.30956L893.497 7.69047C888.751 8.55637 883.887 8.55637 879.14 7.69047L849.644 2.30957C844.897 1.44367 840.033 1.44367 835.287 2.30957L805.791 7.69048C801.044 8.55637 796.18 8.55638 791.433 7.69048L761.937 2.30957C757.19 1.44368 752.326 1.44368 747.58 2.30958L718.084 7.69048C713.337 8.55638 708.473 8.55638 703.726 7.69049L674.23 2.30958C669.484 1.44369 664.619 1.44369 659.873 2.30958L630.377 7.69049C625.63 8.55639 620.766 8.55639 616.019 7.69049L586.523 2.30959C581.777 1.44369 576.913 1.44369 572.166 2.30959L542.67 7.6905C537.923 8.5564 533.059 8.5564 528.313 7.6905L498.816 2.3096C494.07 1.4437 489.206 1.4437 484.459 2.3096L454.963 7.69051C450.216 8.5564 445.352 8.55641 440.606 7.69051L411.109 2.3096C406.363 1.44371 401.499 1.44371 396.752 2.30961L367.256 7.69052C362.509 8.55641 357.645 8.55641 352.899 7.69051L324.303 2.47392C318.973 1.50148 313.5 1.62221 308.217 2.82879L290.106 6.96563C284.243 8.30469 278.154 8.30469 272.292 6.96564L255.081 3.03451C249.219 1.69545 243.13 1.69545 237.267 3.03451L220.056 6.96564C214.194 8.3047 208.105 8.3047 202.242 6.96564L185.031 3.03451C179.169 1.69546 173.08 1.69546 167.217 3.03451L150.007 6.96565C144.144 8.30471 138.055 8.30471 132.192 6.96565L114.982 3.03452C109.119 1.69546 103.03 1.69546 97.1676 3.03452L79.9567 6.96565C74.0942 8.30471 68.0052 8.30471 62.1427 6.96566L44.9319 3.03453C39.0694 1.69547 32.9804 1.69547 27.1178 3.03453L0.999982 9.00011" stroke="#88907B" stroke-width="2" stroke-linecap="round"/>
</svg>

        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {ArticlesData?.slice(4).map((article) => (
          <Link
            href={`/articles/${article?._id}`}
            key={article?._id}
            className="pb-5"
          >
            <Image
              src={`${BASE_URL}/${article.image}`}
              alt={article?.title || "Article Image"}
              width={400}
              height={250}
              className="w-[410.67px] rounded-[40px] h-[280px] object-cover"
            />
            <div className="p-4">
              <div>
                <h3 className="text-[24px] font-medium mb-2">{article?.title}</h3>
                <div className="text-[16px] text-[#808080] h-[20px]">
                  <div
                    className="text-[16px] text-[#808080] h-[45px] overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: splitContent(article?.description),
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
