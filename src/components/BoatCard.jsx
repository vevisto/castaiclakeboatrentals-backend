import { BASE_URL } from "@/constant/constant";
import Image from "next/image";


export default function BoatCard({ boat, isSelected, onSelect }) {
    if (!boat) return null;
    return (
        <div
            onClick={() => onSelect(boat)}
            className={`border rounded p-4 cursor-pointer text-[#808080] transition-all hover:shadow-md ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
        >
            {
                boat.images?.[0] &&
                <Image
                    width={200}
                    height={200}
                    src={`${BASE_URL}/${boat.images?.[0]}`}
                    alt={boat.name}
                    className="rounded w-full h-[120px] object-cover mb-2"
                />
            }
            <h3 className=" text-lg text-[#808080] "> Boat name:  <span className="text-[#88907B] ">{boat.boatName}</span> </h3>
            <h4 className=" text-lg">Boat status: <span className="text-[#88907B]">{boat.status}</span> </h4>
            <p className="text-sm text-gray-500 line-clamp-2">{boat.description}</p>
        </div>
    )
};