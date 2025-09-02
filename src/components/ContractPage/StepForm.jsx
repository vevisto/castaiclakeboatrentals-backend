import { useState } from "react"
export const Step1 = ({ setSelected, selected }) => {

    const options = [
        { id: "renter", label: "Renter Only" },
        { id: "fisherman", label: "Renter + Fisherman/Fishermen" },
        { id: "parent", label: "Parent + Child/Children" },
    ]

    return (
        <div className="flex flex-col gap-2">
            <span className="text-gray-700 font-medium">Rental Type</span>
            <div className="flex flex-col md:flex-row  gap-4">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => setSelected(option.id)}
                        className={`px-5 py-3 rounded-xl border  flex items-center gap-2 
                            ${selected === option.id
                                ? "border-gray-600 bg-[#f5f3f0] text-gray-900"
                                : "border-gray-300 bg-white text-gray-500"
                            }`}
                    >
                        {/* Circle radio indicator */}
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                            ${selected === option.id ? "border-[#88907B]" : "border-gray-400"}`}>
                            {selected === option.id && <span className="w-2.5 h-2.5 rounded-full bg-[#88907B]"></span>}
                        </span>
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export const Step2 = ({ isChecked, onChange, booking }) => {
    console.log(booking, "booking");
    return (
        <div className="flex flex-col gap-6 mt-6 p-6 rounded-2xl">
            <div className="grid grid-cols-2 gap-6 text-gray-800">
                <div>
                    <p className="text-sm text-gray-500">Boat Identification</p>
                    <p className="font-medium">Fishing Boats</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Rental Date</p>
                    <p className="font-medium">{booking?.rentalDate}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Rental Time</p>
                    <p className="font-medium">{booking?.rentTime}</p>
                </div>
               
                <div>
                    <p className="text-sm text-gray-500">Total Number of Persons Onboard</p>
                    <p className="font-medium">{booking?.guestCount}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Number of Life Jackets provided</p>
                    <p className="font-medium">{booking?.guestCount}</p>
                </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start gap-4 mt-4">
                <div className="flex items-center gap-2 border border-[#C5C5C5] px-4 py-2 rounded-lg">
                    <span className="text-gray-600">Sign</span>
                    <input
                        type="checkbox"
                        className="w-5 h-5 border-gray-400"
                        checked={isChecked}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                </div>
                <p className="text-gray-500 text-sm">
                    I confirm that I have received a life jacket for each person onboard and
                    understand the safety instructions provided for each individual on board and
                    have ensured they are instructed to wear them. I understand that failing to wear
                    a life jacket increases the risk of serious injury or death, and the Company is
                    not liable for any outcome resulting from non-use.
                </p>
            </div>
        </div>
    );
};
export const Step3 = ({ isChecked, onChange }) => {
    const items = [
        "Live fishing well (Renter must understand proper use to avoid water overflow or imbalance that could affect vessel safety)",
        "U.S. Coast Guard–approved life jackets (1 per person)",
        "Throwable flotation device (Type IV)",
        "Fire extinguisher (charged and functional)",
        "Emergency whistle or horn",
        "Anchor and anchor line",
        "Paddle or oar",
        "First aid kit",
        "Onboard map of Castaic Lake restricted zones",
        "GPS tracking system for safety monitoring and location verification",
        "Fuel tank (filled appropriately for rental duration)"
    ];

    return (
        <div className="flex flex-col gap-6 mt-6  p-6 rounded-2xl">
            <p className="text-gray-600 text-sm">
                The Company certifies that the boat and motor are in good mechanical and physical condition...
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-sm">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <div className="flex items-start gap-4 mt-4">
                <div className="flex items-center gap-2 border border-[#C5C5C5] px-4 py-2 rounded-lg">
                    <span className="text-gray-600">Sign</span>
                    <input
                        type="checkbox"
                        className="w-5 h-5 border-gray-400"
                        checked={isChecked}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                </div>
                <p className="text-gray-500 text-sm">
                    I acknowledge the Safety & Inventory Checklist has been reviewed and all required items are present on board.
                </p>
            </div>
        </div>
    );
};



export const Step4 = () => {
    const items = [
        "Repairs or replacement of damaged or lost items",
        "Excessive cleaning (defined as requiring more than standard wash down)",
        "Late returns ($50 per hour, billed in 15 min increments)"
    ];
    return (
        <div className="flex flex-col gap-6 mt-6  p-6 rounded-2xl">
            <p className="text-gray-600 text-sm">
                The Company certifies that the boat and motor are in good mechanical and physical condition.
                The Renter agrees to inspect the Boat prior to use and accepts it in its current condition.
                Any damage or issues must be reported before departure. Failure to report pre-existing damage
                waives the Renter’s right to contest post-rental damage assessments.
            </p>
            <p className="text-gray-600 text-sm">The Renter authorizes the Company to charge the credit card on file for any costs associated
                with:</p>
            <ul className="list-disc pl-6 text-gray-700 text-sm">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
export const Step5 = () => {
    const items = [
        "Operating the boat while under the influence of alcohol or drugs",
        "Smoking onboard",
        "Exceeding rated capacity of the boat",
        "Allowing unauthorized persons or pets over 25 lbs",
        "Swimming or jumping from the boat",
        "Operating during periods of reduced visibility (e.g., fog, dusk, rain) without authorization",
        "Operating the boat in a reckless, aggressive, or disruptive manner that endangers others or draws the attention of lake enforcement personnel or lifeguards",
    ];
    return (
        <div className="flex flex-col gap-6 mt-6  p-6 rounded-2xl">
            <p className="text-gray-600 text-sm">
                The following activities are prohibited and will result in immediate termination of this Agreement with no refund:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-sm">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <p className="text-gray-600 text-sm">
                Important: Any citation, official warning, or disciplinary report received from Castaic Lake authorities or lifeguards due to unprofessional behavior or violation of lake rules will result in the immediate termination of the rental agreement and may lead to a permanent ban from renting boats from the Company in the future.
            </p>
        </div>
    )
}
export const Step6 = ({ isChecked, onChange }) => {
    const items = [
        "All children under 13 must wear a life jacket at all times while the vessel is underway.",
        "Life jackets must be worn by all persons swimming or wading from the vessel.",
    ];
    const items2 = [
        "That they have received enough life jackets for each person on board",
        "That all persons on board have been instructed on proper usage",
        "That all passengers are required to wear life jackets at all times while on the vessel",
        "That removing or failing to wear a life jacket at any time during the rental period is done at the individual’s own risk and voids all liability coverage by the Company for any injuries, accidents, or fatalities that may occur as a result"
    ]
    const items3 = [
        "Remain within the boundaries clearly marked on the lake map provided on board",
        "Obey all posted speed limits on the lake and within coves",
    ]
    return (
        <div className="flex flex-col gap-6 mt-6  p-6 rounded-2xl">
            <p className="text-gray-600 text-sm">
                California law requires that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-sm">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <p className="text-gray-600 text-sm">
                The Company provides U.S. Coast Guard approved Type I, II, or III life jackets for all
                passengers. The Renter acknowledges:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-sm">
                {items2.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <p className="text-gray-600 text-sm">
                Important: Passengers are not permitted to exit the boat at any location except designated
                launch ramps or docks approved for parking. Exiting the boat at undesignated shoreline
                areas or open water is strictly prohibited and done at the passenger’s own risk.
            </p>
            <p className="text-gray-600 text-sm">
                In the event of a true emergency (such as fire or immediate threat to life), passengers
                must first put on their life jackets before entering the water. Leaving the vessel is
                permitted only when absolutely necessary for safety and should be reported to the
                Company as soon as possible
            </p>
            <p className="text-gray-600 text-sm">
                Renter and all Participants also acknowledge and agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-sm">
                {items3.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div className="flex items-start gap-4 mt-4">
                <div className="flex items-center gap-2 border border-[#C5C5C5] px-4 py-2 rounded-lg">
                    <span className="text-gray-600">Sign</span>
                    <input
                        type="checkbox"
                        className="w-5 h-5 border-gray-400"
                        checked={isChecked}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                </div>
                <p className="text-gray-500 text-sm">
                    I agree to remain within marked lake boundaries and obey all speed limits,
                    understanding penalties for violations.
                </p>
            </div>
        </div>
    )
}
export const Step7 = ({ isChecked, onChange }) => {
    const items = [
        "Submerged rocks and sudden depth changes",
        "Wildlife including snakes, fish, and insects",
        "Boat traffic and wake turbulence"
    ];

    return (
        <div className="flex flex-col gap-6 mt-6  p-6 rounded-2xl">
            <p className="text-gray-600 text-sm">
                Renter acknowledges that Castaic Lake contains natural hazards including, but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 text-sm">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <p className="text-gray-600 text-sm">
                This is to prevent accidents and ensure the safety of all passengers. Passengers must remain
                on board at all times unless safely docked at approved ramps. Pets are not permitted to swim
            </p>
            <div className="flex items-start gap-4 mt-4">
                <div className="flex items-center gap-2 border border-[#C5C5C5] px-4 py-2 rounded-lg">
                    <span className="text-gray-600">Sign</span>
                    <input
                        type="checkbox"
                        className="w-5 h-5 border-gray-400"
                        checked={isChecked}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                </div>
                <p className="text-gray-500 text-sm">
                    I understand that swimming from the fishing boats is strictly prohibited and
                    may result in fines or termination of the rental.
                </p>
            </div>
        </div>
    )
}

export const Step8 = ({ guestCount = 1, isChecked, onChange }) => {

    const items = [
        "They are familiar with safe boat operation and state boating laws",
        "They will comply with all safety protocols and posted signage",
        "They understand and accept all risks involved in boat operation, including personal injury, death, or property damage.The Renter further acknowledges that they are the designated operator of the vessel and are fully responsible for the safe operation of the boat, similar to being the driver of a motor vehicle.Any accidents, collisions, injuries, or violations that occur due to their actions or negligence shall be their sole legal and financial responsibility"
    ]
    return (
        <div className="flex flex-col gap-8 mt-6">
            <p className="text-gray-600 text-sm">Designated Operator Requirement: If more than one person is present in the boat, the
                Renter must identify who will operate the vessel. Only the designated operator is
                permitted to drive. All additional passengers must acknowledge that they will not operate
                the vessel under any circumstance.</p>
           
            <p className="text-gray-600 text-sm">
                We strongly encourage all renters to obtain and carry a valid California Boater Card, which
                promotes safe boating practices and is recommended by the State of California. While it
                is not currently mandatory for all adult renters, it reflects a commitment to responsible
                boating.
            </p>
            <p className="text-gray-600 text-sm">
                We strongly encourage all renters to obtain and carry a valid California Boater Card, which
                promotes safe boating practices and is recommended by the State of California. While it is
                not currently mandatory for all adult renters, it reflects a commitment to responsible boating.
            </p>
            <p className="text-gray-600 text-sm">
                By signing this Agreement, the Renter affirms that:
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-sm">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div className="flex items-start gap-4 mt-4">
                <div className="flex items-center gap-2 border border-[#C5C5C5] px-4 py-2 rounded-lg">
                    <span className="text-gray-600">Sign</span>
                    <input
                        type="checkbox"
                        className="w-5 h-5 border-gray-400"
                        checked={isChecked}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                </div>
                <p className="text-gray-500 text-sm">
                    I understand and accept all risks and affirm I am the designated vessel
                    operator, fully responsible for all actions.
                </p>
            </div>
        </div>
    )
}
export const Step9 = () => {
    const items = [
        "Cancellations made more than 48 hours prior to the scheduled rental time are eligible for a 50% refund of the total rental fee",
        "Cancellations made between 24 and 48 hours prior to the rental time are eligible for a 25% refund.",
        "Cancellations made within 24 hours of the rental time are non refundable.",
        "At the discretion of the Company, the Renter may be allowed to reschedule their rental to another available date. Rescheduling is subject to availability and approval.",
        "If the Company cancels due to inclement weather or unsafe conditions, a full refund or rescheduling option will be provided. No refunds will be issued once the vessel leaves the dock."
    ]
    return (
        <div className="flex flex-col gap-8 mt-6">
            <ul className="list-disc pl-6 text-gray-700 text-sm">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}


export const Step9A = () => {
    return (
        <div className="flex flex-col gap-8 mt-6">
            <p className="text-gray-600 text-sm">Castaic Lake Boat Rentals maintains commercial general liability insurance as required
                by California law. However, this insurance does not extend coverage to renters or passengers for incidents arising from negligence, violation of rental terms, or unsafe behavior. Renters are solely responsible for any damages, injuries, or losses resulting from their use of the vessel
            </p>
        </div>
    )
}

export const Step10 = () => {
    return (
        <div className="flex flex-col gap-8 mt-6">
            <p className="text-gray-600 text-sm">
                Castaic Lake Boat Rentals maintains commercial general liability insurance as required by
                California law. However, this insurance does not extend coverage to renters or passengers for
                incidents arising from negligence, violation of rental terms, or unsafe behavior. Renters are
                solely responsible for any damages, injuries, or losses resulting from their use of the vessel.
            </p>
        </div>
    )
}
export const Step11 = () => {
    return (
        <div className="flex flex-col gap-8 mt-6">
            <p className="text-gray-600 text-sm">
                Renter agrees to indemnify, defend, and hold harmless the Company from any claims,
                including attorney fees, brought by third parties or other participants arising from their use of
                the Boat
            </p>
        </div>
    )
}
export const Step12 = () => {
    return (
        <div className="flex flex-col gap-8 mt-6">
            <p className="text-gray-600 text-sm">
                This Agreement shall be governed by and construed in accordance with the laws of the State
                of California. Jurisdiction for any disputes shall lie in Los Angeles County
            </p>
        </div>
    )
}
export const Step12A = ({ isChecked, onChange }) => {
    return (
        <div className="flex flex-col gap-8 mt-6">
            <p className="text-gray-600 text-sm">
                I confirm that I have watched the required safety instruction video in full and understand all
                procedures and expectations for safe boat operation.
            </p>

            <div className="flex items-start gap-4 mt-4">
                <div className="flex items-center gap-2 border border-[#C5C5C5] px-4 py-2 rounded-lg">
                    <span className="text-gray-600">Sign</span>
                    <input
                        type="checkbox"
                        className="w-5 h-5 border-gray-400"
                        checked={isChecked}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                </div>
                <p className="text-gray-500 text-sm">
                    I acknowledge and approve that I have fully watched and understood the
                    video presented in this contract.
                </p>
            </div>
        </div>
    )
}

export const Step12B = () => {
    return (
        <div className="flex flex-col gap-8 mt-6">
            <p className="text-sm text-gray-600">
                <span className="font-semibold text-black">Adherence to Lake Hours:</span> All boats must return before the posted Castaic Lake closing time. Violation may result in fines issued by lake authorities. The Renter is responsible for any penalties.
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold text-black">No Alcohol Policy:</span>
                Alcohol is strictly prohibited aboard all vessels. Possession or
                consumption will result in rental termination and may involve reporting to authorities.
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold text-black">Buoys, Signage, and Boundaries:</span>
                All renters must comply with posted lake signage and
                buoy instructions on and off the water. Failure to do so may result in fines, termination of
                rental, or banning from future rentals.
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold text-black">Lagoon Speed Limit:</span>
                The speed limit in the lagoon area is 10 mph. Renters must obey
                posted speed limits across all areas of the lake.
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold text-black">Parking Fees:</span>
                Castaic Lake charges daily parking fees that are the sole responsibility of
                the renter. These are separate from rental fees
            </p>

            <div className="flex items-start gap-4 mt-4">
                <div className="flex items-center gap-2 border border-[#C5C5C5] px-4 py-2 rounded-lg">
                    <span className="text-gray-600">Sign</span>
                    <input type="checkbox" className="w-5 h-5 border-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">
                    I have received and reviewed the Castaic Lake Rules and Regulations
                    document and agree to comply with all posted and written requirements.
                </p>
            </div>
        </div>
    );
};

export const Step13 = () => {
    return (
        <div className="flex flex-col gap-8 mt-6">
            <p className="text-gray-600 text-sm">
                This Agreement contains the entire understanding between the parties and supersedes any
                prior agreements, verbal or written. No modifications shall be valid unless in writing
                signed by both parties.
            </p>
        </div>
    )
}

export const Step14 = ({
    guestCount = 1,
    remainingSignatures = 0,
    passengerFiles,
    setPassengerFiles,
    isChecked,
    onChange,
    booking
}) => {
    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        let fileData = null;

        if (file.type.startsWith("image/")) {
            fileData = {
                file,
                preview: URL.createObjectURL(file),
                type: "image",
            };
        } else if (file.type === "application/pdf") {
            fileData = {
                file,
                preview: null,
                type: "pdf",
            };
        }


        setPassengerFiles((prev) => ({
            ...prev,
            [`passenger${index + 1}`]: fileData,
        }));
    };
    const renderUploadCard = (label, index) => {
        const fileData = passengerFiles[`passenger${index + 1}`];

        return (
            <div key={index} className="flex flex-col items-center text-center">
                <label className="font-medium text-gray-800 mb-2">{label}</label>

                <label className="cursor-pointer border-2 border-gray-200 bg-gray-50 rounded-md px-6 py-2 text-[#88907B] text-sm font-medium flex items-center gap-2 hover:border-green-400 transition">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3M12 4v4"
                        />
                    </svg>
                    Upload Files
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, index)}
                    />
                </label>

                {/* File Preview */}
                {fileData && fileData.type === "image" && (
                    <img
                        src={fileData.preview}
                        alt="Uploaded Preview"
                        className="mt-2 rounded shadow w-24 h-24 object-cover"
                    />
                )}
                {fileData && fileData.type === "pdf" && (
                    <p className="mt-2 text-xs text-gray-500">{fileData.file.name}</p>
                )}

                <p className="text-xs mt-1 text-gray-500">.JPG or .PDF file required</p>
            </div>
        );
    };
    return (
        <div className="flex flex-col gap-8 mt-6 text-sm text-gray-600">
            {/* Legal Agreement */}
            <p>
                By signing below, I agree to all terms listed in this document. I affirm I am of legal age and
                authorized to enter this contract. I acknowledge receipt of the correct number of life jackets
                and confirm that all persons on board have been instructed in their required use.
            </p>

            {/* Date and Name */}
            <div className="flex justify-between text-black font-medium">
                <div>
                    <p className="text-xs text-gray-600">Date</p>
                    <p className="mt-1">{booking?.rentalDate}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-600">Renter’s Printed Name</p>
                    <p className="mt-1">{booking?.userId?.firstName} {booking?.userId?.lastName}</p>
                </div>
            </div>

            {/* Renter Signature */}
            <div className="flex items-center gap-2 mt-2">
                <button className="border rounded px-4 py-1 text-sm">Sign</button>
                <label>Renter’s Signature</label>
            </div>

            {/* Passenger Signatures */}
            {guestCount > 1 && (
                <div>
                    <p className="text-gray-600 text-sm mb-2">
                        Participants (if different from Renter or multiple passengers)
                    </p>

                    {[...Array(guestCount - 1)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                            <button className="border rounded px-4 py-1 text-sm">Sign</button>
                            <label>Passenger {i + 2}</label>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload IDs Section */}
            <div className="mt-6">
                <p className="text-center text-gray-800 font-semibold uppercase">Upload IDs</p>
                <p className="text-center text-gray-600 text-sm mt-1">
                    Upload ID Card or Driver License for each passenger who will drive
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    {[...Array(guestCount)].map((_, i) => {
                        const label = i === 0 ? "Renter’s" : `Passenger ${i + 1}`;
                        return renderUploadCard(label, i);
                    })}
                </div>
            </div>

            {/* Signature Warning */}
            {remainingSignatures > 0 && (
                <div className="border border-orange-300 bg-orange-50 text-orange-700 px-4 py-3 rounded mt-6 text-sm flex items-start gap-2">
                    <svg
                        className="w-5 h-5 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m0-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                        />
                    </svg>
                    <span>
                        You have <strong>({remainingSignatures})</strong> signatures left to complete your
                        document. Please review and sign to finalize.
                    </span>
                </div>
            )}
        </div>
    );
};





