import { Minus, Plus } from "lucide-react";

export default function ExtraFacilityItem({ item, quantity, onQuantityChange }) {
  return (
    <div className="border-1 border-[#808080] p-3 rounded-4xl flex justify-between items-center">
      <div>
        <h5 className="font-medium text-[20px] text-[#21252C]">
          {item.productName}
        </h5>

        {/* ✅ Show productType if available */}
        {item.productType?.name && (
          <p className="text-[16px] text-[#21252C]">{item.productType.name}</p>
        )}
      </div>

      <div className="flex items-center h-full space-x-2">
        <p className="text-[20px] md:text-[24px] text-[#21252C]">${item.price}</p>
        <div className="h-full border-1 border-[#C5C5C5]" />
        <button
          type="button"
          onClick={() => onQuantityChange(item._id, item.price, -1)}
          className="p-1 bg-[#808080] rounded disabled:opacity-50"
          disabled={quantity === 0}
        >
          <Minus size={16} color="white" />
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          type="button"
          onClick={() => onQuantityChange(item._id, item.price, 1)}
          className="p-1 bg-[#808080] rounded"
        >
          <Plus size={16} color="white" />
        </button>
      </div>
    </div>
  )
};
