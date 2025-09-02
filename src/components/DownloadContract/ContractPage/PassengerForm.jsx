
export const Passengers = ({ guestCount = 1, formData }) => {
    return (
        <div className="flex flex-col gap-8 mt-6">
            {Array.from({ length: guestCount }, (_, index) => (
                <div key={index} className="border border-[#C5C5C5] p-4 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Passenger {index + 1}
                    </h2>
                    <div className="flex flex-col gap-4 mt-3">
                        {/* Full Name */}
                        <div>
                            <label className="text-gray-600 text-sm">Full Name (Renter)</label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                name={`passengerInfo[${index}].fullName`}
                                className="w-full border border-[#C5C5C5] rounded-lg px-3 py-2 mt-1"
                                value={formData.passengerInfo[index]?.fullName || ''}
                                disabled={true}
                            />
                        </div>

                        {/* Email & Phone */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-gray-600 text-sm">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    name={`passengerInfo[${index}].email`}
                                    className="w-full border border-[#C5C5C5] rounded-lg px-3 py-2 mt-1"
                                    value={formData.passengerInfo[index]?.email || ''}
                                    disabled={true}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-gray-600 text-sm">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder=""
                                    className="w-full border border-[#C5C5C5] rounded-lg px-3 py-2 mt-1"
                                    name={`passengerInfo[${index}].phone`}
                                    value={formData.passengerInfo[index]?.phone || ''}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="text-gray-600 text-sm">Address</label>
                            <input
                                type="text"
                                placeholder="Type your address here"
                                className="w-full border border-[#C5C5C5] rounded-lg px-3 py-2 mt-1"
                                name={`passengerInfo[${index}].address`}
                                value={formData.passengerInfo[index]?.address || ''}
                                disabled={true}
                            />
                        </div>

                        {/* Driver's License */}
                        <div>
                            <label className="text-gray-600 text-sm">Driver's License State & No.</label>
                            <div className="flex items-center gap-3 mt-1">
                                <label className="flex items-center gap-2 bg-gray-300/80 px-4 py-2 rounded-md cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="accent-white"
                                        value={formData.passengerInfo[index]?.isDrivingLicense}
                                        checked={formData.passengerInfo[index]?.isDrivingLicense}
                                        disabled={true}
                                    />
                                    <span className="text-sm">Add as Driver</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="A123456"
                                    name={`passengerInfo[${index}].driversLicense`}
                                    className="flex-1 border border-[#C5C5C5] rounded-lg px-3 py-2"
                                    value={formData.passengerInfo[index]?.drivingLicenseNumber || ''}
                                    disabled={true}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}


export const Heading = ({ title }) => {
    return (<h1 className="text-2xl">{title}</h1>)
}
export const HeadingTitle = () => {
    return (
        <div className="flex flex-col  items-center text-center gap-5">
            <h1 className="text-3xl text-[#88907B]">Castaic Lake Boat Rental Agreement, Waiver & Release of Liability</h1>
            <h3 className="text-lg ">Date: 10 May 2025, 23.59.00</h3>
            <p>This Agreement is entered into by and between Castaic Lake Boat Rentals ( Company ) and
                the undersigned individual(s) ( Renter and Participants ) for the rental and use of watercraft
                ( Boat ) on the date and time specified below. This is a binding legal agreement and includes
                a release of liability and assumption of risk under California law</p>
        </div>
    )
}