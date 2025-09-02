'use client'

import { ContractFormPage } from "@/components/ContractPage/ContractFormPage";
import { BACKEND_URL } from "@/constant/constant";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function page() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

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

    return (
        <>
            <ContractFormPage booking={booking} guestCount={booking?.guestCount} bookingId={id} />
        </>
    )
}