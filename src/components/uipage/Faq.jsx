"use client"
import { useState } from "react";

export default function Faq() {
  const faqs = [
    {
      question: "What type of boats do you offer at Castaic Lake Boat Rental?",
      answer: (
        <span>
          We offer brand new 15-foot Jon boats equipped with 15hp engines—perfect
          for fishing, relaxing, and exploring the calm waters of Castaic Lake.
          These boats are stable, easy to operate, and ideal for groups of up to 3 adults.
        </span>
      ),
    },
    {
      question: "Do I need a boating license to rent a boat at Castaic Lake?",
      answer: (
        <span>
          No boating license is required. However, all renters must be at least
          21 years old and present a valid driver’s license or government-issued
          photo ID at check-in.
        </span>
      ),
    },
    {
      question: "How many people can go on a rental boat?",
      answer: (
        <span>
          Each boat can safely accommodate a maximum of 3 adults. This ensures your
          comfort and meets all safety regulations for Castaic Lake.
        </span>
      ),
    },
    {
      question: "What rental options are available?",
      answer: (
        <ul className="list-disc pl-5 text-[#808080] space-y-1">
          <li>Half-day rentals</li>
          <li>Full-day rentals</li>
        </ul>
      ),
    },
    {
      question: "What’s included with my boat rental?",
      answer: (
        <>
          <ul className="list-disc pl-5 text-[#808080] space-y-1">
            <li>A 15ft Jon boat with 15hp engine</li>
            <li>Life jackets and all required safety gear</li>
            <li>Rod holder (holds up to 4 setups)</li>
            <li>3-gallon fuel tank, filled and ready to go</li>
          </ul>
          <p className="mt-2 italic">
            *There are no hidden fees—everything listed above is included in your rental price.
          </p>
        </>
      ),
    },
    {
      question: "Can I book my rental online?",
      answer: (
        <span>
          Yes! You can securely reserve your boat online through our website. We
          recommend booking early to guarantee availability—especially on weekends
          and holidays.
        </span>
      ),
    },
    {
      question: "What should I bring with me?",
      answer: (
        <>
          <ul className="list-disc pl-5 text-[#808080] space-y-1">
            <li>A valid photo ID</li>
            <li>Your California fishing license (if you plan to fish)</li>
            <li>Fishing gear</li>
            <li>A cooler for your snacks and drinks</li>
            <li>Sun protection (hat, sunglasses, sunscreen)</li>
            <li>Comfortable clothing for a day outdoors</li>
          </ul>
          <p className="mt-2 italic">
            *Snacks, drinks, and sun protection items are available to add during checkout.
            Please note: we do not provide coolers, so be sure to bring your own.
          </p>
        </>
      ),
    },
    {
      question: "What is your cancellation and rescheduling policy?",
      answer: (
        <>
          <ul className="list-disc pl-5 text-[#808080] space-y-1">
            <li>48+ hours before rental time: Full refund or free reschedule</li>
            <li>24–48 hours before rental time: 50% refund or free reschedule</li>
            <li>
              Less than 24 hours: No refund, but you may reschedule if you contact us
              at least 12 hours before launch time
            </li>
          </ul>
          <p className="mt-2 italic">
            *To make changes, simply contact us or manage your reservation online.
          </p>
        </>
      ),
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <div className="bg-[#F2EFE9] px-[8%] py-[56px]">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center">
          <p className="text-[#808080]">Frequently Asked Questions</p>
          <div className="text-[30px] text-[#21252C] leading-tight md:text-[56px] font-semibold text-center mb-4">
            <span>We've Got Answers to Your Most </span>
            <br className="max-md:hidden" />
            <span className="text-[#88907B]">Pressing Questions</span>
          </div>
        </div>

        <div className="mt-[4rem]">
          {visibleFaqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-[20px] cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-[20px] md:text-[24px] text-[#323232]">
                  {faq.question}
                </p>
                <div className="text-xl">
                  {openIndex === index ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19"
                        stroke="#88907B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M9 1.5V16.5M16.5 9H1.5"
                        stroke="#88907B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {openIndex === index && (
                <div className="mt-2 text-[16px] md:text-[20px] text-[#808080]">
                  {faq.answer}
                </div>
              )}

              <div className="py-7 overflow-hidden">
                       <svg width="1282" height="14" viewBox="0 0 1282 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 13L34.2961 3.88892C41.2073 1.99773 48.4996 1.99774 55.4109 3.88892L78.1495 10.1111C85.0608 12.0023 92.3531 12.0023 99.2643 10.1111L122.003 3.88892C128.914 1.99773 136.207 1.99774 143.118 3.88892L165.856 10.1111C172.768 12.0023 180.06 12.0023 186.971 10.1111L209.71 3.88892C216.621 1.99773 223.913 1.99774 230.825 3.88892L253.563 10.1111C260.475 12.0023 267.767 12.0023 274.678 10.1111L297.417 3.88892C304.328 1.99773 311.62 1.99774 318.532 3.88892L341.27 10.1111C348.182 12.0023 355.474 12.0023 362.385 10.1111L385.124 3.88892C392.035 1.99773 399.327 1.99774 406.239 3.88892L428.977 10.1111C435.888 12.0023 443.181 12.0023 450.092 10.1111L472.831 3.88892C479.742 1.99774 487.034 1.99774 493.945 3.88892L516.684 10.1111C523.595 12.0023 530.888 12.0023 537.799 10.1111L560.538 3.88892C567.449 1.99774 574.741 1.99773 581.652 3.88891L604.391 10.1111C611.302 12.0023 618.595 12.0023 625.506 10.1111L648.245 3.88892C655.156 1.99774 662.448 1.99774 669.359 3.88892L692.098 10.1111C699.009 12.0023 706.302 12.0023 713.213 10.1111L735.951 3.88892C742.863 1.99773 750.155 1.99774 757.066 3.88892L779.805 10.1111C786.716 12.0023 794.009 12.0023 800.92 10.1111L823.658 3.88892C830.57 1.99774 837.862 1.99774 844.773 3.88892L867.512 10.1111C874.423 12.0023 881.715 12.0023 888.627 10.1111L911.365 3.88892C918.277 1.99773 925.569 1.99774 932.48 3.88892L953.901 9.75051C961.639 11.8678 969.834 11.6097 977.423 9.00956L987.836 5.44189C996.24 2.56277 1005.36 2.56278 1013.77 5.44189L1022.86 8.55811C1031.26 11.4372 1040.39 11.4372 1048.79 8.55811L1057.89 5.44189C1066.29 2.56277 1075.41 2.56278 1083.82 5.44189L1092.91 8.55811C1101.31 11.4372 1110.44 11.4372 1118.84 8.55811L1127.94 5.44189C1136.34 2.56277 1145.46 2.56278 1153.87 5.44189L1162.96 8.55811C1171.36 11.4372 1180.49 11.4372 1188.89 8.55811L1197.99 5.44189C1206.39 2.56277 1215.51 2.56278 1223.91 5.44189L1233.01 8.55811C1241.41 11.4372 1250.54 11.4372 1258.94 8.55811L1281 1" stroke="#88907B" strokeLinecap="round"/>
</svg>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less button */}
<div className="  flex justify-start  " >
          {faqs.length > 4 && (
          <div className=" flex  mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#88907B] text-white px-8 py-3 rounded-[12px] font-medium flex items-center gap-2 mx-auto transition hover:bg-[#6f7c63]"
            >
              {showAll ? "Show Less FAQ" : "Show More FAQ"}
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                className={`transition-transform ${
                  showAll ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
</div>
      </div>
    </div>
  );
}
