'use client';
import { BACKEND_URL } from '@/constant/constant';
import SvgImage from '@/hooks/svgImage/SvgImage';
import { Calendar, Minus, Plus, Users, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";


const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    onClick={onClick}   // 👈 must pass this
    ref={ref}           // 👈 must forward ref
   className="cursor-pointer text-[13px] w-full  max-md:pl-13       max-md:text-end bg-[#f1f1f1] rounded-lg text-[#808080]"
  >
    {value || "When?"}
  </button>
));

const BoatRentalBooking = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(null);
  const [OpenGuest, setOpenGuest] = useState(false);

  const [openDay, setopenDay] = useState(false);

  const [boatTypes, setBoatTypes] = useState([]);
  const [guestCount, setGuestCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showBoatDropdown, setShowBoatDropdown] = useState(false);
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loading, setLoading] = useState(false);


  const [dayType, setDayType] = useState('');
  const [showTimeSlotPopup, setShowTimeSlotPopup] = useState(false);

  const isDayDisabled = (date) => {
    const day = date.getDay();
    return day === 1 || day === 2;
  };
  useEffect(() => {
    const fetchBoatTypes = async () => {
      if (categoryTypes.length > 0 && categoryTypes[activeCategory]) {
        try {
          const categoryId = categoryTypes[activeCategory]._id;
          const response = await fetch(`${BACKEND_URL}/boat/category/${categoryId}`);
          const data = await response.json();
          setBoatTypes(data?.data || []);
          setSelectedBoat(null);
        } catch (error) {
          console.error('Error fetching boat types:', error);
        }
      }
    };
    fetchBoatTypes();
  }, [activeCategory, categoryTypes]);

  useEffect(() => {
    const fetchCategoryTypes = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/boat-category`);
        const data = await response.json();
        const categories = data?.data || [];
        setCategoryTypes(categories);

        if (categories.length > 0) {
          setSelectedCategoryId(categories[0]._id);
          setActiveCategory(0);
        }
      } catch (error) {
        console.error('Error fetching category types:', error);
      }
    };
    fetchCategoryTypes();
  }, []);

//   const incrementGuests = () => {
//   setGuestCount((prev) => (prev < 5 ? prev + 1 : prev));
// };
//   const decrementGuests = () => setGuestCount((prev) => Math.max(0, prev - 1));

  const handleCategoryClick = (index, selectedCategoryId) => {
    setSelectedCategoryId(selectedCategoryId);
    setActiveCategory(index);
    setShowBoatDropdown(true);
  };

  const handleFindBoat = () => {
    if (!selectedCategoryId) {
      toast.error('Please select a boat type');
      return;
    }
    if (!startDate) {
      toast.error('Please select a date');
      return;
    }
    if (!guestCount) {
      toast.error('Please select a guest count');
      return;
    }
    if (dayType !== 'full_day' && dayType !== 'half_day_morning' && dayType !== 'half_day_evening') {
      toast.error('Please select a valid day type');
      return;
    }
    const selectedDate = startDate.toLocaleDateString("en-CA");


    setLoading(true);
    setTimeout(() => {
      router.push(
        `/booking?boatId=${selectedCategoryId}&rentDate=${selectedDate}&nbrGuest=${guestCount}&dayType=${dayType}`
      );
      setLoading(false);
    }, 1000);


  };



  return (
    <div className="flex w-full    max-lg:px-[4%] flex-col items-center justify-center">
      <div className="flex flex-col   max-lg:gap-4 lg:flex-row  gap-0 justify-center w-full max-w-4xl">

        {/* Categories */}
        <div className="flex h-[65px] items-center bg-[#f1f1f1]    border border-gray-200 rounded-2xl overflow-hidden">
          {categoryTypes?.slice(0, 2).map((category, index) => {
            const isFishing = category.name === 'Fishing';
            const isActive = activeCategory === index; // now purely by index

            return (
              <div key={index} className="relative h-full   max-lg:w-full group flex">
                <label
                  className={`flex items-center px-4 h-full  max-lg:w-full  text-sm font-medium cursor-pointer transition-all
          ${isActive ? 'bg-[#F6F5F0] text-[#21252C]' : 'bg-white text-gray-500'}
          ${!isFishing ? 'opacity-60' : ''}`}
                >
                  <div className="  flex flex-col max-lg:w-full  ">
                    <div className="flex   lg:gap-14 justify-between">
                      <span><SvgImage src={category?.icon} /></span>
                      <span>
                        <input
                          type="radio"
                          name="boat-category"
                          className="accent-[#7A846E]"
                          checked={isActive}
                          disabled={!isFishing}
                          onChange={() => {
                            if (isFishing) handleCategoryClick(index, category._id);
                          }}
                        />
                      </span>
                    </div>
                    <span>{category.name}</span>
                  </div>
                </label>

                {!isFishing && (
                  <div className="absolute z-50 bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-[10px] px-2 py-1 rounded shadow whitespace-nowrap pointer-events-none">
                    We are not available now
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Date & Guests */}
        <div className="flex    max-lg:w-full flex-col   max-lg:gap-4    lg:flex-row  lg:bg-[#f1f1f1] lg:border border-gray-200 rounded-2xl overflow-hidden lg:ml-2">
          {/* Rent Date */}
          <div className="flex max-lg:w-full  lg:flex-col bg-[#f1f1f1] max-lg:grid max-lg:grid-cols-2 px-4 py-4 lg:py-2 max-lg:rounded-4xl   border lg:border-r  max-lg:gap-4 border-gray-200 lg:min-w-[150px]">
            <div className="text-[14px] text-nowrap   flex  items-center  text-[#808080]">Rent Date</div>



       <div className='  text-start max-md:text-end' >  
<DatePicker
  selected={startDate}  // ✅ Add this - tells DatePicker what date is selected
  onChange={(date) => setStartDate(date)}
  filterDate={(date) => !isDayDisabled(date)}
  dayClassName={(date) => (isDayDisabled(date) ? "disabled-day" : undefined)}
  minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
  dateFormat="MMM dd, yyyy"  // ✅ Add this - formats the date display
  customInput={<CustomInput />}
  popperClassName="z-50"
  popperPlacement="left-start"
  shouldCloseOnSelect={true}
  onClickOutside={() => setStartDate(startDate)}
/>




</div>
          </div>

     {/* Select Day */}
{/* Select Day */}
<div className="lg:flex  max-lg:grid max-lg:grid-cols-2   rounded-4xl lg:flex-col px-4 py-4 lg:py-2 border lg:border-r bg-[#f1f1f1] border-gray-200 lg:min-w-[180px]">
  <span className="text-[14px] flex items-center text-[#808080]">Select Day</span>

  <div
    className="text-[13px] max-lg:text-end text-[#808080] cursor-pointer mt-1"
    onClick={() => setShowTimeSlotPopup(true)}
  >
    {dayType === "full_day"
      ? "Full Day"
      : dayType === "half_day_morning"
      ? "Half Day (Morning)"
      : dayType === "half_day_evening"
      ? "Half Day (Evening)"
      : "Rent Time?"}
  </div>
</div>

{/* Time Slot Popup */}
{showTimeSlotPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-5 rounded-lg shadow-lg w-80 relative">
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
        onClick={() => setShowTimeSlotPopup(false)}
      >
        <X size={16} />
      </button>
      <h2 className="text-lg text-[#21252C] font-semibold mb-3">Select Day / Time</h2>
      <div className="flex flex-col gap-3">
        {/* Full Day */}
        <label className="flex items-center text-[#21252C] gap-2 py-2 cursor-pointer">
          <input
            type="radio"
            name="time-slot"
            value="full_day"
            checked={dayType === "full_day"}
            onChange={() => setDayType("full_day")}
            className="accent-[#88907B]"
          />
          Full Day
        </label>

        {/* Half Day Morning */}
        <label className="flex items-center text-[#21252C] gap-2 py-2 cursor-pointer">
          <input
            type="radio"
            name="time-slot"
            value="half_day_morning"
            checked={dayType === "half_day_morning"}
            onChange={() => setDayType("half_day_morning")}
            className="accent-[#88907B]"
          />
          Half Day - Morning
        </label>

        {/* Half Day Evening */}
        <label className="flex items-center text-[#21252C] gap-2 py-2 cursor-pointer">
          <input
            type="radio"
            name="time-slot"
            value="half_day_evening"
            checked={dayType === "half_day_evening"}
            onChange={() => setDayType("half_day_evening")}
            className="accent-[#88907B]"
          />
          Half Day - Evening
        </label>
      </div>

      <button
        type="button"
        className="bg-[#7A846E] text-white px-4 py-2 rounded-full w-full mt-4"
        onClick={() => setShowTimeSlotPopup(false)}
      >
        Confirm
      </button>
    </div>
  </div>
)}




          {/* Guests */}
       {/* Guests */}
{/* Guests */}
<div className="flex bg-[#f1f1f1] max-lg:justify-between lg:flex-col px-4 py-4 lg:py-2 border max-lg:rounded-4xl border-gray-200 rou max-lg:w-full lg:min-w-[150px]">
  <span className="text-[14px] text-nowrap text-[#808080]">Number of Guests</span>
  <div className="flex items-center  gap-2 w-full">
    {OpenGuest ? (
      // Guest Count Popup
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg w-72 relative">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            onClick={() => setOpenGuest(false)}
          >
            <X size={16} />
          </button>
          <h2 className="text-lg text-[#21252C] font-semibold mb-3">Select Number of Guests</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setGuestCount(Math.max(0, guestCount - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-50"
              disabled={guestCount === 0}
            >
              <Minus size={12} color="#88907B" />
            </button>
            <span className="text-[16px] text-[#21252C] font-medium">{guestCount}</span>
            <button
              onClick={() => setGuestCount(Math.min(4, guestCount + 1))}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >
              <Plus size={12} color="#88907B" />
            </button>
          </div>

          <button
            type="button"
            className="bg-[#7A846E] text-white px-4 py-2 rounded-full w-full mt-6"
            onClick={() => setOpenGuest(false)}
          >
            Confirm
          </button>
        </div>
      </div>
    ) : (
      <button
        type="button"
        onClick={() => setOpenGuest(true)}
        className="text-[13px] h-full text-[#808080] justify-end w-full flex  py-1 items-center md:justify-center"
      >
        {guestCount > 0 ? `${guestCount} Guest${guestCount > 1 ? 's' : ''}` : "Who’s in?"}
      </button>
    )}
  </div>
</div>


          {/* Button */}
              <div className='h-full flex  max-lg:w-full   items-center lg:mr-2.5'>
            <button
              onClick={handleFindBoat}
              disabled={loading}
              className="bg-[#7A846E] h-fit max-lg:w-full flex justify-center py-3  text-white px-5  lg:ml-2 rounded-full text-sm font-medium hover:bg-[#6B7462] transition-all"
            >

              {loading ? "Loading..." : (<p className='flex text-nowrap gap-3'>Find Boat <span><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.75 3.75L18 10M18 10L11.75 16.25M18 10H3" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</span> </p>) }
            </button>
          </div>
        </div>


      </div>

      {(showBoatDropdown || showGuestPicker) && (
        <div
          className="fixed inset-0"
          onClick={() => {
            setShowBoatDropdown(false);
            setShowGuestPicker(false);
          }}
        />
      )}

      

    </div>
  );
};

export default BoatRentalBooking;
