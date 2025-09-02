import BoatCard from "./BoatCard";

export default function BoatSelectionPage({ boats, selectedBoat, onBoatSelect }) {
    if (!boats) return null;
    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            {boats.map((boat) => (
                <BoatCard
                    key={boat._id}
                    boat={boat}
                    isSelected={selectedBoat?._id === boat._id}
                    onSelect={onBoatSelect}
                />
            ))}
        </div>
    );
}
