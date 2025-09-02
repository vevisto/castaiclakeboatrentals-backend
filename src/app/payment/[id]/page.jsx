'use client'
import { BACKEND_URL, BASE_URL } from '@/constant/constant';
import { Check, Download } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import generateReceipt from '../generate';
import { SvgIcon10, SvgIcon2, SvgIcon3, SvgIcon4, SvgIcon9 } from '@/components/svg';
import Activities from '@/components/ActivityComponent';

export default function Page() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchBookingById = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/booking/${id}`);
                if (!response.ok) throw new Error('Failed to fetch booking data');
                const data = await response.json();
                setBooking(data?.data);
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };
        fetchBookingById();
    }, [id]);

    const formattedDate = booking?.updatedAt
        ? new Date(booking.updatedAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '';

    const downloadContract = () => {
        window.open(`/download-contract/${booking?.contractId}`, '_blank');
    };

    return (
        <div className="min-h-screen  flex  max-w-[800px] mx-auto items-center justify-center p-4">
            <div className=" w-full  rounded-2xl  md:p-8">
                {/* Success Icon */}
                <div className="flex  flex-row md:justify-center mb-6">
                    <div className="  w-full  rounded-full flex items-center justify-center">
                        <SvgIcon9 />

                    </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-8">
                    <h1 className="text-xl font-semibold text-gray-800 mb-2">
                        Transaction successful!
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Find your receipt in your inbox at {booking?.userId?.email}.
                    </p>
                </div>

                {/* Transaction Details Card */}
                <div className='border border-[#C5C5C5]  rounded-xl p-6 mb-6'>
                    <div className=" flex flex-col  md:flex-row md:justify-between ">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-[#21252C] mb-1">
                                    {booking?.boatId?.name}
                                </h2>
                                <p className="text-sm text-gray-500">{formattedDate}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={downloadContract}
                                className=" bg-[#88907B] w-fit text-[white] font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download Contract
                            </button>
                            <button
                                onClick={() => booking && generateReceipt(booking)} // ⬅ call generateReceipt
                                className=" bg-[#88907B] w-fit text-[white] font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download Receipt
                            </button>
                        </div>

                    </div>
                    <div className='w-full'>
                        <SvgIcon10 />
                    </div>

                    <div>

                        {booking?.boatId &&
                            <div>  <div>
                                <p className="text-[27px] font-semibold"> {booking?.boatId?.name}
                                </p>
                                <div className=" mt-3 flex gap-4">

                                    {booking?.boatId?.images?.map((item, index) => (
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
                                            <span className="text-[#21252C]" > {booking?.guestCount} People </span>    <span className="text-[#808080]" >{booking?.boatId?.maxPeople} people max</span></div> </div>
                                    <div className="flex gap-5 md:ml-7 md:items-center " >
                                        <div  >
                                            <SvgIcon3 />
                                        </div>

                                        <div className="flex  flex-col md:flex-row flex-wrap  gap-2">
                                            {booking?.boatId?.feature?.map((item, id) => (
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
                                    <Activities selectedTitles={booking?.boatId?.perfectFor || ["Fishings", "Family Outings",]} />
                                    <div></div>
                                </div>
                            </div>

                            </div>


                        }
                    </div>
                </div>


            </div>
        </div>
    )
}
