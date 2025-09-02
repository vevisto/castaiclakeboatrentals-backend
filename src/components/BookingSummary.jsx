import { DEPOSIT_AMOUNT } from "@/constant/constant";


export default function BookingSummary ({
  selectedBoat,
  rentDate,
  rentDuration,
  selectedExtras,
  inventoryData,
  basePrice,
  totalExtras,
  total,
  setShowForm,
  showForm = false,
  setIsBackDate = true,
  isLoading = false
}) {
  if (!selectedBoat) return null;

  return (
    <div className=" p-4 w-full  rounded-lg  ">
      {/* <h4 className="font-semibold text-lg mb-3">Booking Summary</h4> */}

      <div className="space-y-2 text-[#88907B]   mt-2 w-full ">
        <p className="flex justify-between"><strong className="text-[#21252C]" >{selectedBoat?.boatName}</strong> ${basePrice}</p>
        <p className="flex justify-between"><span className=" text-lg   text-[#21252C]">Rent Date:</span> {rentDate}</p>
        <p className="flex justify-between"><span className=" text-lg text-[#21252C]">Duration:</span> {rentDuration}</p>

        {Object.entries(selectedExtras).map(([id, { qty }]) => {
          const item = inventoryData.find((inv) => inv._id === id);
          return (
            <p key={id} className="text-md  w-full  flex justify-between ">
              <span>  {item?.productName} ×{qty} </span><span> ${item?.price * qty}</span>
            </p>
          );
        })}


        {/* <p className="flex justify-between"><strong className="text-[#21252C]">Extras Total:</strong> ${totalExtras}</p> */}
        <p className="flex justify-between"><span className=" text-lg text-[#21252C]">Deposit:</span> ${DEPOSIT_AMOUNT}</p>
        <p className="text-xl flex justify-between  text-[30px] font-bold text-[#21252C] ">Total: <span className="text-[#88907B] font-bold " >${total}</span></p>
      </div>

      <div className="relative inline-block w-full">
        {!showForm &&
          <button
            type="button"
            disabled={total === DEPOSIT_AMOUNT}
            onClick={() => {
              if (total > DEPOSIT_AMOUNT) {
                setShowForm(true);
                setIsBackDate(false);
              }
            }}
            className={`mt-6 w-full font-semibold text-white py-3 rounded-lg transition-colors
      ${total === DEPOSIT_AMOUNT ? "bg-gray-400 cursor-not-allowed" : "bg-[#88907B]"}`}
          >
            <div className="px-[4%] items-center flex justify-between">
              <span>Rent a boat</span>
              <span>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 1.5L19 9M19 9L11.5 16.5M19 9H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </button>
        }

        {total === 0 && (
          <span className="absolute left-1/2 transform -translate-x-1/2 -top-8
                     bg-black text-white text-sm px-2 py-1 rounded opacity-0
                     pointer-events-none transition-opacity
                     group-hover:opacity-100">
            Booking is full
          </span>
        )}
      </div>

    </div>
  );
};


