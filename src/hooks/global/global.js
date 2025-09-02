import { BACKEND_URL } from "@/constant/constant";
import { useCallback, useEffect, useState } from "react";


export const useBoatData = (id) => {
  const [boatData, setBoatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBoat = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/boat/${id}`);
      if (!res.ok) throw new Error('Failed to fetch boat data');
      const json = await res.json();
      setBoatData(json?.data);
    } catch (e) {
      console.error('Error fetching boat:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchBoat();
  }, [id, fetchBoat]);

  return { boatData, loading, error };
};

export const useInventoryData = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [facilities, setFacilities] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/inventory`);
      if (!res.ok) throw new Error('Failed to fetch inventory');
      const json = await res.json();
      const data = json?.data || [];
      
      setInventoryData(data);
      
      // Initialize facilities with 0 quantities
      const initialFacilities = {};
      data.forEach(item => {
        initialFacilities[item.productName] = 0;
      });
      setFacilities(initialFacilities);
    } catch (e) {
      console.error('Error fetching inventory:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const updateFacilityQty = useCallback((name, delta) => {
    setFacilities(prev => ({
      ...prev,
      [name]: Math.max(0, (prev[name] || 0) + delta)
    }));
  }, []);

  const resetFacilities = useCallback(() => {
    setFacilities(prev => {
      const reset = {};
      Object.keys(prev).forEach(key => (reset[key] = 0));
      return reset;
    });
  }, []);

  return { 
    inventoryData, 
    facilities, 
    loading, 
    updateFacilityQty, 
    resetFacilities 
  };
};