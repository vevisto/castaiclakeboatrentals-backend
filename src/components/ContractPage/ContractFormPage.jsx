import { useEffect, useState } from "react"
import { VideoContract } from "./VideoContract"
import { Step1, Step10, Step11, Step12, Step12A, Step12B, Step13, Step14, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step9A } from "./StepForm"
import { Heading, HeadingTitle, Passengers } from "./PassengerForm"
import { BACKEND_URL } from "@/constant/constant"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import WistiaVideo from "./videoSection"

export const ContractFormPage = ({ guestCount, bookingId, booking }) => {
    const [selected, setSelected] = useState("renter")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const [passengerFiles, setPassengerFiles] = useState({
        passenger1: null,
        passenger2: null,
        passenger3: null,
        passenger4: null,
        passenger5: null
    })

    const [formData, setFormData] = useState({
        passengerInfo: Array.from({ length: guestCount }, () => ({
            fullName: '',
            email: '',
            phone: '',
            address: '',
            isDrivingLicense: false,
            drivingLicenseNumber: ''
        })),
        renterInfo: selected,
        renterDetailsInfo: false,
        bookingId: bookingId,
        isInspectionAgree: false,
        isLifeJacketAndSafetyAgree: false,
        isCastaicLakeAgree: false,
        isRenterWarrantyAgree: false,
        isSafetyVideoAgree: false,
        isSignatureAgree: false,
    });

    const handleInputChange = (passengerIndex, field, value) => {
        const updatedPassengers = [...formData.passengerInfo];

        // ensure passenger object exists
        if (!updatedPassengers[passengerIndex]) {
            updatedPassengers[passengerIndex] = {
                fullName: '',
                email: '',
                phone: '',
                address: '',
                isDrivingLicense: false,
                drivingLicenseNumber: ''
            };
        }

        updatedPassengers[passengerIndex][field] = value;
        setFormData({ ...formData, passengerInfo: updatedPassengers });
    };

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            passengerInfo: Array.from({ length: guestCount }, (_, i) =>
                prev.passengerInfo[i] || {
                    fullName: '',
                    email: '',
                    phone: '',
                    address: '',
                    isDrivingLicense: false,
                    drivingLicenseNumber: ''
                }
            )
        }));
    }, [guestCount]);

    const handleSubmit = async () => {
        console.log(formData, "formData");
        console.log(passengerFiles, "passengerFiles");
        setIsLoading(true)
        try {
            const payload = new FormData();

            // stringify array/object fields
            payload.append("passengerInfo", JSON.stringify(formData.passengerInfo));
            payload.append("renterInfo", JSON.stringify(formData.renterInfo));
            payload.append("bookingId", formData.bookingId);

            // boolean fields → convert to string
            payload.append("isInspectionAgree", JSON.stringify(formData.isInspectionAgree));
            payload.append("renterDetailsInfo", JSON.stringify(formData.renterDetailsInfo));
            payload.append("isLifeJacketAndSafetyAgree", JSON.stringify(formData.isLifeJacketAndSafetyAgree));
            payload.append("isCastaicLakeAgree", JSON.stringify(formData.isCastaicLakeAgree));
            payload.append("isRenterWarrantyAgree", JSON.stringify(formData.isRenterWarrantyAgree));
            payload.append("isSafetyVideoAgree", JSON.stringify(formData.isSafetyVideoAgree));
            payload.append("isSignatureAgree", JSON.stringify(formData.isSignatureAgree));

            // file uploads
            for (let i = 0; i < guestCount; i++) {
                if (passengerFiles[`passenger${i + 1}`]) {
                    payload.append(
                        `passenger${i + 1}`,
                        passengerFiles[`passenger${i + 1}`].file
                    );
                }
            }

            const res = await fetch(`${BACKEND_URL}/contract-document`, {
                method: "POST",
                body: payload,
            });

            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                router.push(`/payment/${bookingId}`);
                setIsLoading(false)
            }
            setIsLoading(false)
            console.log(data, "response from backend");
        } catch (error) {
            console.error("Submit error:", error);
            toast.error(error.message);
            setIsLoading(false)
        }
    };




    return (
        <div className="py-5 px-5 lg:px-50">
            {/* <VideoContract /> */}
            <WistiaVideo />

            <div className="flex py-10 mt-5 flex-col border border-gray-400 p-5 rounded-4xl gap-12">
                <HeadingTitle />
                <div>
                    <Heading title={"1. Renter Information"} />
                    <Step1 setSelected={setSelected} selected={selected} />
                    <Passengers guestCount={guestCount} formData={formData} handleInputChange={handleInputChange} />
                </div>
                <div>
                    <Heading title={"2. RENTAL DETAILS"} />
                    <Step2
                        booking={booking}
                        isChecked={formData.renterDetailsInfo}
                        onChange={(checked) => setFormData({ ...formData, renterDetailsInfo: checked })}
                    />
                </div>
                <div>
                    <Heading title={"3. INSPECTION OF EQUIPMENT AND SAFETY INVENTORY"} />
                    <Step3
                        isChecked={formData.isInspectionAgree}
                        onChange={(checked) => setFormData({ ...formData, isInspectionAgree: checked })}
                    />
                </div>
                <div>
                    <Heading title={"4. DAMAGE, CLEANING, DEPOSIT, AND CREDIT CARD AUTHORIZATION"} />
                    <Step4 />
                </div>
                <div>
                    <Heading title={"5. PROHIBITED ACTIVITIES"} />
                    <Step5 />
                </div>
                <div>
                    <Heading title={"6. LIFE JACKETS & SAFETY"} />
                    <Step6
                        isChecked={formData.isLifeJacketAndSafetyAgree}
                        onChange={(checked) => setFormData({ ...formData, isLifeJacketAndSafetyAgree: checked })}
                    />
                </div>
                <div>
                    <Heading title={"7. CASTAIC LAKE HAZARD NOTICE"} />
                    <Step7
                        isChecked={formData.isCastaicLakeAgree}
                        onChange={(checked) => setFormData({ ...formData, isCastaicLakeAgree: checked })}
                    />
                </div>
                <div>
                    <Heading title={"8. RENTER WARRANTIES"} />
                    <Step8
                        guestCount={guestCount}
                        isChecked={formData.isRenterWarrantyAgree}
                        onChange={(checked) => setFormData({ ...formData, isRenterWarrantyAgree: checked })}
                    />
                </div>
                <div>
                    <Heading title={"9. CANCELLATION & WEATHER POLICY"} />
                    <Step9 />
                </div>
                <div>
                    <Heading title={"9A. COMPANY INSURANCE DISCLOSURE"} />
                    <Step9A />
                </div>
                <div>
                    <Heading title={"10. RELEASE OF LIABILITY"} />
                    <Step10 />
                </div>
                <div>
                    <Heading title={"11. INDEMNIFICATION"} />
                    <Step11 />
                </div>
                <div>
                    <Heading title={"12. GOVERNING LAW"} />
                    <Step12 />
                </div>
                <div>
                    <Heading title={"12A. SAFETY VIDEO ACKNOWLEDGEMENT"} />
                    <Step12A
                        isChecked={formData.isSafetyVideoAgree}
                        onChange={(checked) => setFormData({ ...formData, isSafetyVideoAgree: checked })}
                    />
                </div>
                <div>
                    <Heading title={"12B. CASTAIC LAKE RULES & REGULATIONS"} />
                    <Step12B />
                </div>
                <div>
                    <Heading title={"13. ENTIRE AGREEMENT"} />
                    <Step13 />
                </div>
                <div>
                    <Heading title={"14. SIGNATURES"} />
                    <Step14
                        booking={booking}
                        guestCount={guestCount}
                        passengerFiles={passengerFiles}
                        setPassengerFiles={setPassengerFiles}
                        isChecked={formData.isSignatureAgree}
                        onChange={(checked) =>
                            setFormData({ ...formData, isSignatureAgree: checked })
                        }
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        type="button"
                        disabled={isLoading}
                        className="bg-[#88907B] text-white py-2 px-4 rounded-xl cursor-pointer">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
