import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AQIContext = createContext();

export function AQIProvider({ children }) {
  const [aqi, setAqi] = useState(() => {
    // Load from localStorage or default
    const stored = localStorage.getItem('current_aqi');
    return stored ? Number(stored) : 150; // Default to moderate/unhealthy
  });

  const [location, setLocation] = useState(() => {
    const stored = localStorage.getItem('current_location');
    return stored ? JSON.parse(stored) : null;
  });

  const [locationName, setLocationName] = useState(() => {
    return localStorage.getItem('current_location_name') || 'Unknown Location';
  });

  // Generate random AQI value (realistic range for Pakistan: 50-300)
  const generateRandomAQI = useCallback(() => {
    // Weighted random: more likely to be in unhealthy ranges (100-200)
    const rand = Math.random();
    let newAQI;
    
    if (rand < 0.3) {
      // 30% chance: Good to Moderate (50-100)
      newAQI = 50 + Math.random() * 50;
    } else if (rand < 0.7) {
      // 40% chance: Unhealthy for Sensitive Groups (100-150)
      newAQI = 100 + Math.random() * 50;
    } else if (rand < 0.9) {
      // 20% chance: Unhealthy (150-200)
      newAQI = 150 + Math.random() * 50;
    } else {
      // 10% chance: Very Unhealthy (200-300)
      newAQI = 200 + Math.random() * 100;
    }
    
    // Add some variation to current AQI (±10) for gradual changes
    const variation = (Math.random() - 0.5) * 20;
    newAQI = Math.max(0, Math.min(500, aqi + variation));
    
    return Math.round(newAQI);
  }, [aqi]);

  // Update AQI periodically (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      const newAQI = generateRandomAQI();
      setAqi(newAQI);
      localStorage.setItem('current_aqi', String(newAQI));
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [generateRandomAQI]);

  // Persist AQI to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('current_aqi', String(aqi));
  }, [aqi]);

  // Get AQI color based on value
  const getAQIColor = useCallback((aqiValue = aqi) => {
    if (aqiValue >= 201) return 'bg-purple-700'; // Very Unhealthy / Hazardous
    if (aqiValue >= 151) return 'bg-red-600'; // Unhealthy
    if (aqiValue >= 101) return 'bg-orange-500'; // Unhealthy for Sensitive Groups
    if (aqiValue >= 51) return 'bg-yellow-400'; // Moderate
    return 'bg-green-500'; // Good
  }, [aqi]);

  // Get AQI status text
  const getAQIStatus = useCallback((aqiValue = aqi) => {
    if (aqiValue >= 201) return 'Very Unhealthy / Hazardous';
    if (aqiValue >= 151) return 'Unhealthy';
    if (aqiValue >= 101) return 'Unhealthy for Sensitive Groups';
    if (aqiValue >= 51) return 'Moderate';
    return 'Good';
  }, [aqi]);

  // Get AQI level key for guidance
  const getAQILevel = useCallback((aqiValue = aqi) => {
    if (aqiValue >= 201) return 'very_unhealthy';
    if (aqiValue >= 151) return 'unhealthy';
    if (aqiValue >= 101) return 'usg';
    if (aqiValue >= 51) return 'moderate';
    return 'good';
  }, [aqi]);

  // Update location
  const updateLocation = useCallback((newLocation, name) => {
    setLocation(newLocation);
    setLocationName(name || 'Unknown Location');
    if (newLocation) {
      localStorage.setItem('current_location', JSON.stringify(newLocation));
    }
    if (name) {
      localStorage.setItem('current_location_name', name);
    }
  }, []);

  // Manually refresh AQI
  const refreshAQI = useCallback(() => {
    const newAQI = generateRandomAQI();
    setAqi(newAQI);
  }, [generateRandomAQI]);

  const value = {
    aqi,
    location,
    locationName,
    setAqi,
    updateLocation,
    refreshAQI,
    getAQIColor,
    getAQIStatus,
    getAQILevel,
  };

  return <AQIContext.Provider value={value}>{children}</AQIContext.Provider>;
}

export function useAQI() {
  const context = useContext(AQIContext);
  if (!context) {
    throw new Error('useAQI must be used within an AQIProvider');
  }
  return context;
}

