'use client'
import { useState } from "react";
import  ExtraFacilityItem  from "./ExtraFacilityItem";
import { DEPOSIT_AMOUNT } from "@/constant/constant";

export default function ExtraFacilities ({ inventoryData, selectedExtras, onExtraChange, total }) {
  if (!inventoryData.length) return null;
  const [openbox, setOpenbox] = useState(false);

  // Group items by category name
  const groupedCategories = inventoryData.reduce((acc, item) => {
    const categoryName = item.category?.name || "Others";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(item);
    return acc;
  }, {});

  return (
    <div className="mb-6">
      <h4 className="font-semibold text-[20px] md:text-[24px] text-[#21252C] mb-3">Extra Facilities +</h4>
      <div className="flex  tex-[14px] md:text-[16px]  max-md:gap-3 md:justify-between text-[#808080] ">
        <p>Take Your Boat Experience to the Next Level</p>
        <div
          className={`bg-[#808080] rounded-md  py-2 flex items-center justify-center px-2 ${
            total === DEPOSIT_AMOUNT ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={total === DEPOSIT_AMOUNT ? undefined : () => setOpenbox(!openbox)}
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 16.25L12 8.75L4.5 16.25"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {openbox && (
        <>
          {Object.entries(groupedCategories).map(([categoryName, items]) => (
            <div key={categoryName} className="mb-4 my-4 ">
              <h3 className="text-lg text-[#808080] font-semibold mb-2">{categoryName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <ExtraFacilityItem
                    key={item._id}
                    item={item}
                    quantity={selectedExtras[item._id]?.qty || 0}
                    onQuantityChange={onExtraChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
