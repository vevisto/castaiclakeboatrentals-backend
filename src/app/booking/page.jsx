'use client';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_API_KEY } from '@/constant/constant';
import CreateBookingForm from '@/components/CreateBookingForm';

const stripePromise = loadStripe(STRIPE_API_KEY);

export default function Page({ searchParams }) {
    const boatId = searchParams.boatId || null;
    const rentDate = searchParams.rentDate || null;
    const nbrGuest = searchParams.nbrGuest || 0;
    const dayType = searchParams.dayType || "full_day";

    return (
        <div className="relative">
            <Elements stripe={stripePromise}>
                {boatId && (
                    <CreateBookingForm
                        boatType={boatId}
                        rentDate={rentDate}
                        nbrGuest={nbrGuest}
                        dayType={dayType}
                    />
                )}
            </Elements>
        </div>
    );
}
