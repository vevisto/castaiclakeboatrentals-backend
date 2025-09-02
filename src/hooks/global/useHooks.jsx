import { BACKEND_URL, RENT_DURATION } from "@/constant/constant";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useBookingData = ({ selectedDate, dateTime, setBoatAvailableMessage }) => {
    const [boatData, setBoatData] = useState([]);
    const [boatCategoryData, setBoatCategoryData] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                const [categoryRes, inventoryRes] = await Promise.all([
                    fetch(`${BACKEND_URL}/boat-category`),
                    fetch(`${BACKEND_URL}/inventory`),
                ]);

                let boats = [];
                boats = await handleFindBoat(selectedDate, dateTime, setBoatAvailableMessage);
                setBoatData(boats);
                const [categories, inventory] = await Promise.all([
                    categoryRes.json(),
                    inventoryRes.json(),
                ]);

                setBoatCategoryData(categories?.data || []);
                setInventoryData(inventory?.data || []);
            } catch (err) {
                console.error("Error loading categories/inventory:", err);
                setError(err);
                setBoatCategoryData([]);
                setInventoryData([]);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const findBoat = async (selectedDate, dateTime = "full_day") => {
        try {
            setLoading(true);
            setError(null);

            let boats = [];
            if (selectedDate && dateTime) {
                boats = await handleFindBoat(selectedDate, dateTime, setBoatAvailableMessage);
            } else {
                const boatRes = await fetch(`${BACKEND_URL}/boat`);
                const boatJson = await boatRes.json();
                boats = boatJson?.data || [];
            }

            setBoatData(boats);
        } catch (err) {
            console.error("Error fetching boats:", err);
            setError(err);
            setBoatData([]);
        } finally {
            setLoading(false);
        }
    };

    return { boatData, boatCategoryData, inventoryData, loading, error, findBoat };
};

export const handleFindBoat = async (selectedDate, dateTime = "full_day", setBoatAvailableMessage) => {
    try {
        if (!selectedDate) {
            throw new Error("Selected date is required to check availability.");
        }

        const res = await fetch(
            `${BACKEND_URL}/check-availability?date=${selectedDate}&rentTime=${dateTime}`
        );

        if (!res.ok) {
            throw new Error(`Error fetching availability: ${res.statusText}`);
        }

        const data = await res.json();
        // if (res?.status === 201) {
        //     toast.error(data?.message);
        // }
        setBoatAvailableMessage(data?.message);
        return data?.data || [];
    } catch (error) {
        console.error("handleFindBoat error:", error);
        return [];
    }
};

export const useBookingState = (dateType) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBoat, setSelectedBoat] = useState(null);
    const [selectedExtras, setSelectedExtras] = useState({});
    const [rentDuration, setRentDuration] = useState(dateType || RENT_DURATION.FULL_DAY);
    const [halfDayTime, setHalfDayTime] = useState("");
    const [rentalDate, setRentalDate] = useState('');

    return {
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
    };
};