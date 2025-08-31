// app/trekking/TrekkingContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define pricing structure
interface PriceTier {
  minPersons: number;
  maxPersons: number;
  price: number;
}

// Define the shape of your context data
interface TrekkingContextType {
  siteTitle: string;
  backgroundImage: string;
  currentRoute: string;
  setSiteTitle: (title: string) => void;
  setBackgroundImage: (image: string) => void;
  setCurrentRoute: (route: string) => void;
  getPricingForRoute: (route: string) => PriceTier[];
}

// Pricing data for different routes
const PRICING_DATA: Record<string, PriceTier[]> = {
  "mardi-himal-trek": [
    { minPersons: 1, maxPersons: 1, price: 800 },
    { minPersons: 2, maxPersons: 2, price: 750 },
    { minPersons: 3, maxPersons: 5, price: 700 },
    { minPersons: 6, maxPersons: 9, price: 650 },
    { minPersons: 10, maxPersons: 12, price: 600 },
    { minPersons: 13, maxPersons: 999, price: 550 }
  ],
  "mardi-himal-trek-from-pokhara": [
    { minPersons: 1, maxPersons: 1, price: 550 },
    { minPersons: 2, maxPersons: 2, price: 520 },
    { minPersons: 3, maxPersons: 5, price: 490 },
    { minPersons: 6, maxPersons: 9, price: 460 },
    { minPersons: 10, maxPersons: 12, price: 430 },
    { minPersons: 13, maxPersons: 999, price: 400 }
  ],
  "mardi-himal-trek-with-annapurna-base-camp": [
    { minPersons: 1, maxPersons: 1, price: 950 },
    { minPersons: 2, maxPersons: 2, price: 930 },
    { minPersons: 3, maxPersons: 5, price: 910 },
    { minPersons: 6, maxPersons: 9, price: 890 },
    { minPersons: 10, maxPersons: 12, price: 870 },
    { minPersons: 13, maxPersons: 999, price: 850 }
  ]
};

// Create the context
const TrekkingContext = createContext<TrekkingContextType | undefined>(
  undefined
);

// Create a provider component
export function TrekkingProvider({ children }: { children: ReactNode }) {
  const [siteTitle, setSiteTitle] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [currentRoute, setCurrentRoute] = useState("");

  const getPricingForRoute = (route: string): PriceTier[] => {
    return PRICING_DATA[route] || [];
  };

  return (
    <TrekkingContext.Provider
      value={{ 
        siteTitle, 
        backgroundImage, 
        currentRoute,
        setSiteTitle, 
        setBackgroundImage,
        setCurrentRoute,
        getPricingForRoute
      }}
    >
      {children}
    </TrekkingContext.Provider>
  );
}

// Custom hook to use the context
export function useTrekkingContext() {
  const context = useContext(TrekkingContext);
  if (context === undefined) {
    throw new Error("useTrekkingContext must be used within a TrekkingProvider");
  }
  return context;
}

// Export types for use in other components
export type { PriceTier };