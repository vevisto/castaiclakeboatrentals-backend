'use client'

import { Calendar, Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import SvgImage from '@/hooks/svgImage/SvgImage';
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="cursor-pointer w-full    h-full  flex  items-center px-3 bg-[#f1f1f1] rounded-md text-gray-700"
  >
    {value || "When?"}
  </div>
));


export default function CategorySelector({
  categories,
  onCategorySelect,
  defaultCategory,
  rentDate,
  nbrGuest,
  guestCount,
  setGuestCount,
  selectedDate,
  setSelectedDate,
  setDayType,
  dayType,
  findBoat
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  // const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showTimeSlotPopup, setShowTimeSlotPopup] = useState(false);
  const [OpenGuest, setOpenGuest] = useState(false);
  useEffect(() => {
    if (categories.length > 0) {
      let selectedCategory;

      if (defaultCategory) {
        if (typeof defaultCategory === "string") {
          selectedCategory = categories.find(
            (cat) =>
              cat.name?.toLowerCase() === defaultCategory.toLowerCase() ||
              cat._id === defaultCategory
          );
        } else if (typeof defaultCategory === "object" && defaultCategory._id) {
          selectedCategory = categories.find((cat) => cat._id === defaultCategory._id);
        }
      }

      if (!selectedCategory) {
        selectedCategory = categories[0];
      }

      if (selectedCategory && selectedCategoryId !== selectedCategory._id) {
        setSelectedCategoryId(selectedCategory._id);
        onCategorySelect(selectedCategory);
      }
    }
  }, [categories, defaultCategory]);

  const handleSelect = (category) => {
    if (category.name === "Fishing") {
      setSelectedCategoryId(category._id);
      onCategorySelect(category);
    } else {
      toast.error("We are not available now");
    }
  };

  const incrementGuests = () => setGuestCount((prev) => prev + 1);
  const decrementGuests = () => setGuestCount((prev) => Math.max(0, prev - 1));

  const onFindBoat = () => {
    if (!selectedCategoryId) return toast.error("Please select a category");
    if (!selectedDate) return toast.error("Please select a date");
    if (dayType === "half_day_pending") {
      setShowTimeSlotPopup(true);
      return;
    }
    if (!dayType) return toast.error("Please select a day type");

    console.log(selectedDate, "selectedDate");
    // ✅ Format date correctly
    // const formattedDate = selectedDate.toLocaleDateString("en-CA"); // YYYY-MM-DD

    const formattedDate = selectedDate.toISOString().split("T")[0];
    window.location.assign(
      `/booking?boatId=${selectedCategoryId}&rentDate=${formattedDate}&nbrGuest=${guestCount}&dayType=${dayType}`
    );


    findBoat(selectedDate, dayType);
  };
  ;

  return (
    <div className="flex w-full flex-row  max-md:flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row   flex-wrap gap-3 justify-center w-full  ">

        {/* Categories */}
        <div className="flex h-[65px] items-center bg-white border border-gray-200 rounded-2xl overflow-hidden w-full md:w-auto">
          {categories?.slice(0, 2).map((category, index) => {
            const isFishing = category.name === "Fishing";
            const isSelected = selectedCategoryId === category._id;

            return (
              <div key={index} className="relative h-full group flex flex-1">
                <label
                  className={`flex items-center px-4 h-full text-sm font-medium cursor-pointer transition-all w-full
                  ${isSelected ? 'bg-[#F6F5F0] text-[#21252C]' : 'bg-[#f1f1f1] text-gray-500'}
                  ${!isFishing ? 'opacity-60' : ''}`}
                >
                  <div className="flex flex-col w-full">
                    <div className="flex gap-4 justify-between items-center">
                      <span><SvgImage src={category?.icon} /></span>
                      <span>
                        <input
                          type="radio"
                          name="boat-category"

                          checked={isSelected}
                          disabled={!isFishing}
                          onChange={() => isFishing && handleSelect(category)}
                          className="accent-[#88907B]"
                        />
                      </span>
                    </div>
                    <span className="text-xs">{category.name}</span>
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
        <div className="flex flex-col max-md:gap-4 md:flex-row max-md:rounded-4xl  md:bg-[#f1f1f1] md:border border-gray-200 rounded-2xl overflow-hidden w-full md:w-auto">


          {/* Rent Date */}
          <div className="md:flex max-md:grid max-md:grid-cols-2 md:flex-col  bg-[#f1f1f1] text-[14px] px-4 max-md:py-4 py-2 border-b md:border-b-0 max-md:rounded-b-4xl md:border-r border-gray-200 w-full md:min-w-[150px]">
            <span className="text-xs text-gray-400">Rent Date</span>
<div className="max-md:text-end">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              filterDate={(date) => {
                const day = date.getDay();
                return day !== 1 && day !== 2;
              }}
              dayClassName={(date) =>
                date.getDay() === 1 || date.getDay() === 2 ? "disabled-day" : undefined
              }
               popperPlacement="left-start"
  shouldCloseOnSelect={true}
              popperClassName="z-50"
              minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
              placeholderText="When?"
              customInput={<CustomInput />}
            /></div>

          </div>


          {/* Select Day */}
          {/* Select Day */}
          <div className="max-md:grid max-md:grid-cols-2 bg-[#f1f1f1]  md:flex md:flex-col px-4 py-3 max-md:rounded-4xl border-b md:border-b-0   md:border-r border-gray-200 w-full md:min-w-[180px]">
            <span className="text-xs text-gray-400">Rent Time</span>
            <div
              className="text-[13px] text-[#808080] max-md:text-end cursor-pointer mt-1"
              onClick={() => setShowTimeSlotPopup(true)}
            >
              {dayType === "full_day"
                ? "Full Day"
                : dayType === "half_day_morning"
                  ? "Half Day - Morning"
                  : dayType === "half_day_evening"
                    ? "Half Day - Evening"
                    : "Select"}
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
                <h2 className="text-lg font-semibold mb-3">Select Rent Time</h2>

                {/* Full Day */}
                <label className="flex items-center text-gray-600 gap-2 py-2 border-b border-gray-100">
                  <input
                    type="radio"
                    name="day-type"
                    value="full_day"
                    checked={dayType === "full_day"}
                    onChange={() => setDayType("full_day")}
                    className="accent-[#88907B]"
                  />
                  Full Day
                </label>

                {/* Half Day - Morning */}
                <label className="flex items-center text-gray-600 gap-2 py-2">
                  <input
                    type="radio"
                    name="day-type"
                    value="half_day_morning"
                    checked={dayType === "half_day_morning"}
                    onChange={() => setDayType("half_day_morning")}
                    className="accent-[#88907B]"
                  />
                  Half Day - Morning
                </label>

                {/* Half Day - Evening */}
                <label className="flex items-center text-gray-600 gap-2 py-2">
                  <input
                    type="radio"
                    name="day-type"
                    value="half_day_evening"
                    checked={dayType === "half_day_evening"}
                    onChange={() => setDayType("half_day_evening")}
                    className="accent-[#88907B]"
                  />
                  Half Day - Evening
                </label>

                <button
                  type="button"
                  className="bg-[#7A846E] text-white px-4 py-2 rounded-full w-full mt-3"
                  onClick={() => setShowTimeSlotPopup(false)}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}



          {/* Guests */}
          {/* Guests */}
          <div className="flex bg-[#f1f1f1]  max-lg:justify-between  lg:flex-col px-4 py-4 lg:py-2 border max-lg:rounded-4xl border-gray-200 rou max-lg:w-full lg:min-w-[150px]">
            <span className="text-[14px] text-nowrap text-[#808080]">Number of Guests</span>
            <div className="flex items-center gap-2 w-full">
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
                    <h2 className="text-lg font-semibold mb-3">Select Number of Guests</h2>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <button type="button"
                        onClick={() => setGuestCount(Math.max(0, guestCount - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center disabled:opacity-50"
                        disabled={guestCount === 0}
                      >
                        <Minus size={12} color="#88907B" />
                      </button>
                      <span className="text-[16px] font-medium">{guestCount}</span>
                      <button
                        type="button"
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
                  className="text-[13px] h-full text-[#808080]  w-full flex max-md:justify-end items-center md:justify-center"
                >
                  {/* Display value after confirmation */}
                  {guestCount > 0 ? `${guestCount} Guest${guestCount > 1 ? 's' : ''}` : "Who’s in?"}
                </button>
              )}
            </div>
          </div>


          {/* Find Boat Button */}
          <div className='flex items-center justify-center p-2 w-full md:w-auto'>
            <button
              type="button"
              onClick={() => {
                onFindBoat();
              }}
              className="bg-[#7A846E] h-fit w-full text-nowrap text-white md:px-5 py-2 ml-2 rounded-full text-sm font-medium hover:bg-[#6B7462] transition-all"
            >
              Update and Search Availability →
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};
