import Activities from "@/components/ActivityComponent";
import { SvgIcon1, SvgIcon2, SvgIcon3, SvgIcon4, SvgIcon5 } from "@/components/svg";
import { BACKEND_URL, BASE_URL, DEPOSIT_AMOUNT, RENT_DURATION } from "@/constant/constant";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BoatSelection from "./BoatSelection";
import BookingSummary from "./BookingSummary";
import CategorySelector from "./CategorySelector";
import CustomerForm from "./CustomerForm";
import DurationSelector from "./DurationSelector";
import ExtraFacilities from "./ExtraFacilities";
import toast from "react-hot-toast";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useBookingData, useBookingState } from "@/hooks/global/useHooks";

const CreateBookingForm = ({ isEdit = false, boatType = 'Fishing', nbrGuest, rentDate, dayType }) => {
    const bookingState = useBookingState(dayType);
    const stripe = useStripe();
    const elements = useElements();
    const [durationPrice, setDurationPrice] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [guestCount, setGuestCount] = useState(Number(nbrGuest));
    const [selectedDate, setSelectedDate] = useState(rentDate);
    const [dateTime, setDateTime] = useState(dayType);
    const [selectedBoatData, setSelectedBoatData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [boatAvailableMessage, setBoatAvailableMessage] = useState('');
    console.log(boatAvailableMessage, 'boatAvailableMessage')

    const [waitingList, setWaitingList] = useState({
        name: "",
        phone: ""
    });
    const router = useRouter();
    // const { boatData, boatCategoryData, inventoryData, loading, error } = useBookingData
    // (selectedDate, dateTime);
    const { boatData, boatCategoryData, inventoryData, findBoat, loading } = useBookingData({ selectedDate: selectedDate, dateTime: dateTime, setBoatAvailableMessage });
    //  toast.error(boatAvailableMessage)
    const {
        selectedCategory,
        setSelectedCategory,
        selectedBoat,
        setSelectedBoat,
        selectedExtras,
        setSelectedExtras,
        rentDuration,
        setRentDuration,
        halfDayTime,
        setHalfDayTime,
        rentalDate,
        setRentalDate
    } = bookingState;

    // Form handling
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            addressLineTo: "",
            city: "",
            state: "",
            zipCode: "",
            paymentMethod: "stripe",
        },
        onSubmit: async (values) => {
            try {
                if (!selectedCategory) {
                    toast.error("Please select a category");
                    return;
                }
                if (!selectedBoatData) {
                    toast.error("Please select a boat");
                    return;
                }
                if (
                    !values?.firstName ||
                    !values?.lastName ||
                    !values?.email ||
                    !values?.phone ||
                    !values?.address ||
                    !values?.city ||
                    !values?.state ||
                    !values?.zipCode ||
                    !values?.addressLineTo
                ) {
                    toast.error("Please enter all customer details");
                    return;
                }

                setIsLoading(true);

                // Step 1: Create / update customer
                const res = await fetch(`${BACKEND_URL}/customer`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phone: values.phone,
                        address: values.address,
                        addressLineTo: values.addressLineTo,
                        city: values.city,
                        state: values.state,
                        zipCode: values.zipCode,
                    }),
                });

                const customerRes = await res.json();
                if (!customerRes?.success || !customerRes?.data?._id) {
                    setIsLoading(false);
                    toast.error("Customer creation failed");
                    return;
                }

                // Step 2: Prepare booking payload
                const bookingData = {
                    userId: customerRes?.data?._id,
                    boatId: selectedBoatData?._id,
                    boatType: selectedCategory?.name,
                    guestCount,
                    inventory: Object.entries(selectedExtras).map(([productId, { qty }]) => ({
                        productId,
                        quantity: qty,
                    })),
                    amountPaid: total.toString(),
                    depositAmount: DEPOSIT_AMOUNT, // fixed deposit (in dollars)
                    rentTime: rentDuration,
                    rentalDate: selectedDate || new Date().toISOString().split("T")[0],
                    paymentMethod: "stripe",
                };

                // Step 3: Create payment intent (NOT the booking yet)
                const bookingResRaw = await fetch(`${BACKEND_URL}/booking`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookingData),
                });

                const bookingRes = await bookingResRaw.json();
                if (!bookingRes?.success) {
                    setIsLoading(false);
                    toast.error(bookingRes?.message || "Failed to initiate booking");
                    return;
                }

                // Step 4: Handle Stripe payment
                const clientSecret = bookingRes.data?.clientSecret;
                const paymentIntentId = bookingRes.data?.paymentIntentId;

                if (!clientSecret || !paymentIntentId) {
                    setIsLoading(false);
                    toast.error("Payment setup failed: missing payment details");
                    return;
                }

                const cardElement = elements.getElement(CardElement);
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: `${values.firstName} ${values.lastName}`,
                            email: values.email,
                            phone: values.phone,
                        },
                    },
                });

                if (error) {
                    setIsLoading(false);
                    toast.error(error.message || "Payment failed");
                    return;
                }

                // Step 5: Confirm booking ONLY if payment succeeded
                if (paymentIntent?.status === "succeeded") {
                    try {
                        // Confirm the booking with the backend
                        const confirmBookingRes = await fetch(`${BACKEND_URL}/booking/confirm`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                paymentIntentId: paymentIntentId,
                                bookingData: bookingData // Send booking data again for confirmation
                            }),
                        });

                        const confirmRes = await confirmBookingRes.json();

                        if (confirmRes?.success) {
                            toast.success("Payment successful! Booking confirmed.");
                            router.push(`/contract-form/${confirmRes?.data?.booking?._id}`);

                            // Step 6: Cleanup  
                            formik.resetForm();
                            setSelectedCategory(null);
                            setSelectedBoat(null);
                            setSelectedExtras({});
                            setRentalDate("");
                        } else {
                            // Payment succeeded but booking failed (rare edge case)
                            toast.error(confirmRes?.message || "Booking confirmation failed. Please contact support.");
                            console.error("Payment succeeded but booking failed:", confirmRes);
                        }
                    } catch (confirmError) {
                        console.error("Booking confirmation error:", confirmError);
                        toast.error("Booking confirmation failed. Please contact support with your payment confirmation.");
                    }
                } else {
                    toast.error("Payment failed. Please try again.");
                }

                setIsLoading(false);

            } catch (error) {
                console.error("Booking submission error:", error);
                setIsLoading(false);
                toast.error("Something went wrong");
            }
        }
    });

    // Event handlers
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedBoat(null); // Reset boat selection when category changes
    };

    const handleExtraChange = (id, price, delta) => {
        setSelectedExtras((prev) => {
            const qty = Math.max(0, (prev[id]?.qty || 0) + delta);
            if (qty === 0) {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            }
            return {
                ...prev,
                [id]: { qty, price },
            };
        });
    };

    // Helper function to convert duration and time to rent time enum
    const getRentTimeValue = (duration, halfDayTime) => {
        if (duration === 'Full Day') {
            return 'full_day';
        }
        return halfDayTime === 'Morning' ? 'half_day_morning' : 'half_day_evening';
    };

    // Computed values
    const filteredBoats = useMemo(() => {
        if (!selectedCategory) return [];
        return boatData.filter((boat) => boat.boatCategory === selectedCategory._id);
    }, [boatData, selectedCategory]);
    const totalExtras = useMemo(() => {
        return Object.values(selectedExtras).reduce(
            (sum, { qty, price }) => sum + qty * price,
            0
        );
    }, [selectedExtras]);

    const total = durationPrice + totalExtras + DEPOSIT_AMOUNT;

    useEffect(() => {
        if (rentDuration) {
            if (rentDuration === RENT_DURATION.FULL_DAY) {
                setDurationPrice(selectedBoatData?.fullDayPrice || 0);
            } else {
                setDurationPrice(selectedBoatData?.halfDayPrice || 0);
            }
        }
    }, [rentDuration, selectedBoatData, halfDayTime]);



    useEffect(() => {
        if (filteredBoats && filteredBoats.length > 0 && !selectedBoat) {
            setSelectedBoat(filteredBoats[0]);
        }
    }, [filteredBoats, selectedBoat, setSelectedBoat]);
    // In CreateBookingForm, add this useEffect:
    useEffect(() => {
        if (boatCategoryData && boatCategoryData.length > 0 && !selectedCategory) {
            const fishingCategory = boatCategoryData.find(cat =>
                cat.name && cat.name.toLowerCase() === 'fishing'
            );
            if (fishingCategory) {
                setSelectedCategory(fishingCategory);
            }
        }
    }, [boatCategoryData, selectedCategory, setSelectedCategory]);

    useEffect(() => {
        if (!selectedBoat) return;

        const fetchBoatData = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/boat/${selectedBoat?._id}`);
                const data = await res.json();
                if (data?.success) {
                    setSelectedBoatData(data.data);
                }
            } catch (error) {
                console.error("Error fetching boat by ID:", error);
            }
        };

        fetchBoatData();
    }, [selectedBoat]);

    const handleWaitingListChange = (event) => {
        setWaitingList({
            ...waitingList,
            [event.target.name]: event.target.value,
        });
    }

    const handleWaitingList = async () => {
        if (!waitingList?.name || !waitingList?.phone) {
            toast.error("Please enter your name, phone number.");
        }
        try {
            const res = await fetch(`${BACKEND_URL}/waiting-list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: waitingList?.name,

                    phone: waitingList?.phone,
                }),
            })
            const data = await res.json();
            if (data?.success) {
                toast.success("You have been added to the waiting list.");
                setWaitingList({ name: '', phone: '' });
                router.push("/");
            }
        } catch (error) {

        }
    }

    const handleFindBoatClick = () => {
        if (!selectedDate) return toast.error("Please select a date");
        if (!dateTime) return toast.error("Please select a day type");
        findBoat(selectedDate, dateTime);
    };

    return (
        <div className="max-w-7xl    mb-4 mx-auto">

            <form onSubmit={formik.handleSubmit}>
                <div className=" ">
                    {/* Left Column - Boat Selection */}
                    <div className="  " >
                        {!showForm && (
                            <div className=" ">


                                <div className=" ">
                                    <div className=" max-md:px-[4%]">
                                        <CategorySelector
                                            categories={boatCategoryData}
                                            onCategorySelect={handleCategorySelect}
                                            defaultCategory={boatType}
                                            rentDate={rentDate}
                                            nbrGuest={nbrGuest}
                                            guestCount={guestCount}
                                            selectedDate={selectedDate}
                                            setGuestCount={setGuestCount}
                                            setSelectedDate={setSelectedDate}
                                            dayType={dateTime}
                                            setDayType={setDateTime}
                                            findBoat={handleFindBoatClick}
                                        />
                                    </div>
                                </div>

                                <div className="py-3 w-full  overflow-hidden" >
                                    <SvgIcon1 />
                                </div>

                                {filteredBoats.length === 0 && !loading && (
                                    <div className="grid grid-cols-1 md:grid-cols-[67%_30%] md:border md:border-[#C5C5C5]  rounded-4xl   px-[2%] md:gap-[3%] " >



                                        <div className=" max-md:border max-md:my-7  max-md:border-[#C5C5C5] px-[4%] py-8  rounded-4xl ">

                                            <div>
                                                <div>
                                                    <div className="flex gap-5 flex-col ">
                                                        <p className="text-red-400 italic text-[14px] ">{boatAvailableMessage}</p>
                                                        <p className="text-[27px] text-start font-semibold"> Fishing Boat
                                                        </p>

                                                    </div>
                                                    <div className=" mt-3    grid grid-cols-2 md:grid-cols-4  gap-4">

                                                        {["/image/f1.png", "/image/f2.png", "/image/f3.png", "/image/f4.png",

                                                        ].map((item, index) => (
                                                            <div className="" key={index}>
                                                                <img

                                                                    src={item}
                                                                    alt='img'
                                                                    className=" w-[200px] h-[200px] rounded-lg object-cover mb-2"
                                                                />

                                                            </div>
                                                        ))}
                                                    </div>



                                                    <div className=" flex py-4 flex-col md:flex-row gap-3" >
                                                        <div className="flex  gap-4 md:items-center" > <div>
                                                            <SvgIcon2 />
                                                        </div>
                                                            <div className="flex gap-1 flex-col">
                                                                <span className="text-[#21252C]" > {guestCount} People </span>    <span className="text-[#808080]" >{selectedBoatData?.maxPeople || '5'} people max</span></div> </div>
                                                        <div className="flex gap-5 md:ml-7 md:items-center " >
                                                            <div  >
                                                                <SvgIcon3 />
                                                            </div>

                                                            <div className="flex  flex-col md:flex-row flex-wrap  gap-2">
                                                                {['Storage compartments', 'Insurance', 'Sunscreen and sun protection'].map((item, id) => (
                                                                    <span
                                                                        key={id}
                                                                        className="px-5 py-3 bg-[#F2EFE9] text-[#808080] h-fit rounded-full text-sm font-medium"
                                                                    >
                                                                        {item}

                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="border border-[#C5C5C5]  text-[#808080] text-[16px] font-[400]  px-2 py-2 flex gap-3 rounded-2xl">
                                                        <span>
                                                            <SvgIcon4 />
                                                        </span>
                                                        <p>Safety Equipments Included: Life jackets, first aid kits, flares, navigation lights, and throwable floatation devices.</p>
                                                    </div>
                                                    <div className="py-4"> <h3 className="text-[#808080] text-[20px] text-center " >Perfect for</h3>
                                                        <Activities selectedTitles={["Fishing", "Family Outings",]} />
                                                        <div></div>
                                                    </div>



                                                </div>

                                                <div className="py-4 w-full overflow-hidden ">

                                                    <SvgIcon5 />

                                                </div>



                                                <>


                                                    <ExtraFacilities
                                                        total={total}
                                                        inventoryData={inventoryData}
                                                        selectedExtras={selectedExtras}
                                                        onExtraChange={handleExtraChange}
                                                    />
                                                    <div className="    ">
                                                        <BookingSummary
                                                            rentDate={rentDate}
                                                            selectedBoat={selectedBoat}
                                                            rentDuration={rentDuration}
                                                            selectedExtras={selectedExtras}
                                                            inventoryData={inventoryData}
                                                            basePrice={durationPrice}
                                                            totalExtras={totalExtras}
                                                            total={total}
                                                            setShowForm={setShowForm}
                                                            showForm={showForm}

                                                        />
                                                    </div>
                                                </>


                                            </div>



                                        </div>


                                        <div className="">




                                            <div >
                                                <DurationSelector
                                                    rentDuration={rentDuration}
                                                    onDurationChange={setRentDuration}
                                                    halfDayTime={halfDayTime}
                                                    onHalfDayTimeChange={setHalfDayTime}

                                                />
                                            </div>


                                            {/* Form Section */}
                                            <div className="flex flex-col justify-center">



                                                <form className="flex flex-col border border-[#C5C5C5] rounded-4xl py-4 px-3 gap-3 w-full max-w-sm">
                                                    <p className="mb-4  text-[15px] w-full italic text-center  text-[#808080]">
                                                        Boat is currently fully booked. Leave your details to get notified when it's available for rent.
                                                    </p>


                                                    {/* Email */}
                                                    {/* <input
                                                        type="email"
                                                        placeholder="example@mail.com"
                                                        name="email"
                                                        value={waitingList.email}
                                                        onChange={handleWaitingListChange}
                                                        className="border border-gray-300 rounded-4xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    /> */}

                                                    {/* Or */}
                                                    {/* <div className="text-center text-[#808080] text-sm">or</div> */}

                                                    {/* Phone */}
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={waitingList.phone}
                                                        onChange={handleWaitingListChange}
                                                        placeholder="(+1) 012 345 678"
                                                        className="border border-gray-300 rounded-4xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    />
                                                    {/* Name */}
                                                    <input
                                                        type="text"
                                                        placeholder="Your Name"
                                                        name="name"
                                                        value={waitingList.name}
                                                        onChange={handleWaitingListChange}
                                                        className="border border-gray-300 rounded-4xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    />

                                                    {/* Submit Button */}
                                                    <button
                                                        type="button"
                                                        onClick={handleWaitingList}
                                                        className="border border-[#C5C5C5]  text-[#21252C] rounded-4xl px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Notify Me
                                                    </button>
                                                </form>
                                            </div>


                                            <div className=" flex" >
                                                <BookingSummary
                                                    rentDate={rentDate}
                                                    selectedBoat={selectedBoat || "fishing "}
                                                    rentDuration={rentDuration}
                                                    selectedExtras={selectedExtras}
                                                    inventoryData={inventoryData}
                                                    basePrice={durationPrice}
                                                    totalExtras={totalExtras}
                                                    total={total}
                                                    setShowForm={setShowForm}
                                                    showForm={showForm}
                                                    isLoading={isLoading}
                                                />
                                            </div>







                                        </div>
                                    </div>
                                )}










                                {/* when there is boat section */}



                                {
                                    loading && (
                                        <div className="flex items-center justify-center h-screen">
                                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                                        </div>
                                    )
                                }

                                {filteredBoats.length !== 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-[67%_30%] md:border md:border-[#C5C5C5]  rounded-4xl   px-[2%] gap-[3%] " >



                                        <div className=" max-md:border max-md:my-7  max-md:border-[#C5C5C5] px-[4%] py-8  rounded-4xl ">
                                            {selectedBoat &&
                                                <div>  <div>
                                                    <p className="text-[27px] font-semibold"> {selectedBoatData?.name}
                                                    </p>
                                                    <div className=" mt-3   grid  grid-cols-2  md:grid-cols-4 gap-4">

                                                        {selectedBoatData?.images?.map((item, index) => (
                                                            <div className="" key={index}>
                                                                <img

                                                                    src={`${BASE_URL}/${item}`}
                                                                    alt={`Boat image ${index + 1}`}
                                                                    className=" w-[200px] h-[200px] rounded-lg object-cover mb-2"
                                                                />

                                                            </div>
                                                        ))}
                                                    </div>



                                                    <div className=" flex py-4 flex-col md:flex-row gap-3" >
                                                        <div className="flex  gap-4 md:items-center" > <div>
                                                            <SvgIcon2 />
                                                        </div>
                                                            <div className="flex gap-1 flex-col">
                                                                <span className="text-[#21252C]" > {guestCount} People </span>    <span className="text-[#808080]" >{selectedBoatData?.maxPeople} people max</span></div> </div>
                                                        <div className="flex gap-5 md:ml-7 md:items-center " >
                                                            <div  >
                                                                <SvgIcon3 />
                                                            </div>

                                                            <div className="flex  flex-col md:flex-row flex-wrap  gap-2">
                                                                {selectedBoatData?.feature?.map((item, id) => (
                                                                    <span
                                                                        key={id}
                                                                        className="px-5 py-3 bg-[#F2EFE9] text-[#808080] h-fit rounded-full text-sm font-medium"
                                                                    >
                                                                        {item}

                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="border border-[#C5C5C5]  text-[#808080] text-[16px] font-[400]  px-2 py-2 flex gap-3 rounded-2xl">
                                                        <span>
                                                            <SvgIcon4 />
                                                        </span> <p>Safety Equipments Included: Life jackets, first aid kits, flares, navigation lights, and throwable floatation devices.</p> </div>
                                                    <div className="py-4"> <h3 className="text-[#808080] text-[20px] text-center " >Perfect for</h3>
                                                        <Activities selectedTitles={selectedBoat?.perfectFor || ["Fishings", "Family Outings",]} />
                                                        <div></div>
                                                    </div>



                                                </div>

                                                    <div className="py-4 w-full overflow-hidden ">

                                                        <SvgIcon5 />

                                                    </div>
                                                    <div className="md:hidden">
                                                        <DurationSelector
                                                            rentDuration={rentDuration}
                                                            onDurationChange={setRentDuration}
                                                            halfDayTime={halfDayTime}
                                                            onHalfDayTimeChange={setHalfDayTime}

                                                        />
                                                        <div className="py-4 w-full overflow-hidden ">

                                                            <SvgIcon5 />

                                                        </div>
                                                    </div>

                                                    {selectedBoat && (
                                                        <>


                                                            <ExtraFacilities
                                                                inventoryData={inventoryData}
                                                                selectedExtras={selectedExtras}
                                                                onExtraChange={handleExtraChange}
                                                            />
                                                            <div className="flex  md:hidden   ">
                                                                <BookingSummary
                                                                    selectedBoat={selectedBoat}
                                                                    rentDuration={rentDuration}
                                                                    selectedExtras={selectedExtras}
                                                                    inventoryData={inventoryData}
                                                                    basePrice={durationPrice}
                                                                    totalExtras={totalExtras}
                                                                    total={total}
                                                                    setShowForm={setShowForm}
                                                                    showForm={showForm}
                                                                    rentDate={rentDate}
                                                                />
                                                            </div>
                                                        </>
                                                    )}

                                                </div>


                                            }
                                        </div>
                                        {!showForm && !selectedBoat &&
                                            <div className="">
                                                {selectedCategory && filteredBoats.length > 0 && (
                                                    <BoatSelection
                                                        boats={boatData}
                                                        selectedBoat={selectedBoat}
                                                        onBoatSelect={setSelectedBoat}
                                                    />
                                                )}
                                            </div>
                                        }

                                        <div className="">
                                            {selectedBoat && !showForm && (


                                                <>
                                                    <div className="max-md:hidden">
                                                        <DurationSelector
                                                            rentDuration={rentDuration}
                                                            onDurationChange={setRentDuration}
                                                            halfDayTime={halfDayTime}
                                                            onHalfDayTimeChange={setHalfDayTime}

                                                        />
                                                    </div>
                                                    <div className="hidden md:flex ">
                                                        <BookingSummary
                                                            rentDate={rentDate}
                                                            selectedBoat={selectedBoat}
                                                            rentDuration={rentDuration}
                                                            selectedExtras={selectedExtras}
                                                            inventoryData={inventoryData}
                                                            basePrice={durationPrice}
                                                            totalExtras={totalExtras}
                                                            total={total}
                                                            setShowForm={setShowForm}
                                                            showForm={showForm}
                                                            isLoading={isLoading}
                                                        />
                                                    </div>

                                                </>

                                            )
                                            }

                                        </div>
                                    </div>
                                )}





                            </div>

                        )}
                    </div>
                    <div className="space-y-6">

                        {selectedBoat && showForm && (
                            <div className="  grid  grid-cols-1 max-md:mx-[13px] max-md:px-5  my-4 md:my-2 border border-[#808080] rounded-4xl py-4 md:grid-cols-[67%_30%] gap-2 " >   <div className=" flex w-full  " >




                                <div className=" w-full   md:px-[7%] ">


                                    <div className="flex gap-8" >


                                        {showForm && (
                                            <>

                                                <svg onClick={() => {
                                                    setShowForm(!showForm);

                                                }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </>)}

                                        <h4 className="font-semibold text-[#808080] text-[16px] mb-4">Checkout & Personal Information</h4>

                                    </div>



                                    <CustomerForm formik={formik} />


                                </div>

                            </div>
                                <div>

                                    {showForm &&
                                        <>
                                            <BookingSummary
                                                rentDate={rentDate}
                                                selectedBoat={selectedBoat}
                                                rentDuration={rentDuration}
                                                selectedExtras={selectedExtras}
                                                inventoryData={inventoryData}
                                                basePrice={durationPrice}
                                                totalExtras={totalExtras}
                                                total={total}
                                                setShowForm={setShowForm}
                                                showForm={showForm}
                                                isLoading={isLoading}
                                            />
                                            <div className="mx-3">
                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="mt-6 w-full  bg-[#88907B] disabled:bg-gray-400 
                           text-[white]  py-3 rounded-lg font-medium transition-colors"
                                                >
                                                    {isLoading ? "Loading..." : "Confirm Booking"}
                                                </button>
                                            </div>
                                        </>
                                    }
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateBookingForm;