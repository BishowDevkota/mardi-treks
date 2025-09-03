"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Minus, Plus, Users, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';

// Interface for pricing data
interface PricingTier {
  minPersons: number;
  maxPersons: number;
  price: number;
}

interface TrekPricing {
  [key: string]: PricingTier[];
}


export interface BookingData {
  trekKey: string;
  trekName: string;
  persons: number;
  pricePerPerson: number;
  totalPrice: number;
  originalPrice: number;
  discountedPrice: number;
  totalOriginalPrice: number;
  paymentStatus: string;
  status: string;
  trekkingDays: number;
  returnDate:  Date; 
}

const TrekkingRightSideBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [persons, setPersons] = useState(1);
  const [pricingData, setPricingData] = useState<TrekPricing | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  // Traveler form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    phone: '',
    departureDate: ''
  });

  // Fetch pricing data
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch('/api/pricing');
        if (!response.ok) throw new Error('Failed to fetch pricing');
        const data = await response.json();
        setPricingData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pricing:', error);
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  const getCurrentTrekKey = (): string => {
    const pathSegments = pathname.split('/');
    const trekName = pathSegments[pathSegments.length - 1];
    return trekName === 'mardi-himal-trek-with-annapurna-base-camp'
      ? 'mardi-himal-trek-with-annapurna-base-camp'
      : trekName || 'mardi-himal-trek';
  };

  const currentTrekKey = getCurrentTrekKey();

  const getCurrentPrice = (): number => {
    if (!pricingData) return 0;
    const pricing = pricingData[currentTrekKey] || pricingData["mardi-himal-trek"];
    const tier = pricing.find(p => persons >= p.minPersons && persons <= p.maxPersons);
    return tier ? tier.price : pricing[pricing.length - 1].price;
  };

  const originalPricePerPerson = getCurrentPrice();
  const discountedPricePerPerson = Math.round(originalPricePerPerson * 0.9); // 10% off
  const totalOriginalPrice = originalPricePerPerson * persons;
  const totalDiscountedPrice = discountedPricePerPerson * persons;

  const getAllPricingTiers = () => {
    if (!pricingData) return [];
    const pricing = pricingData[currentTrekKey] || pricingData["mardi-himal-trek"];
    return pricing.map(tier => ({
      ...tier,
      label: tier.minPersons === tier.maxPersons 
        ? `${tier.minPersons} pax:`
        : tier.maxPersons === 999 
          ? `${tier.minPersons}+ pax:`
          : `${tier.minPersons}-${tier.maxPersons} pax:`,
      discountedPrice: Math.round(tier.price * 0.9)
    }));
  };

  const updatePersons = (newCount: number) => {
    setPersons(Math.max(1, Math.min(50, newCount)));
  };

  const getTrekDisplayName = (): string => {
    return currentTrekKey
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getBookingData = (): BookingData => {
  return {
    trekKey: currentTrekKey,
    trekName: getTrekDisplayName(),
    persons,
    pricePerPerson: originalPricePerPerson,
    totalPrice: totalDiscountedPrice,
    originalPrice: originalPricePerPerson,
    discountedPrice: discountedPricePerPerson,
    totalOriginalPrice,
    paymentStatus: "Pending",
    status: "Pending",
    trekkingDays: 0,
    returnDate: new Date(),
     // Added status
  };
};

const handleBookNow = () => {
    setShowForm(true);
  };

  const isFormValid = (): boolean => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.country.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.departureDate.trim() !== ''
    );
  };

  const handlePayNow = async () => {
    if (!isFormValid()) return;

    const bookingData = { ...getBookingData(), ...formData };
    setProcessingPayment(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error('Failed to create booking');
      const { bookingId } = await response.json();
      if (bookingId) {
        router.push(`/booking/${bookingId}`);
      } else {
        alert('Failed to create booking');
        setProcessingPayment(false);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking');
      setProcessingPayment(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="
        relative  sticky top-[100px] 
        w-[90%] left-[10%] bg-black/50 backdrop-blur-xl
        border border-gray-700/50 rounded-2xl
        shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        group transition-all duration-500 hover:scale-105
        overflow-hidden custom-scrollbar
      "
    >
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
      </div>

      {/* Discount badge */}
      {showForm ?  null: <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute right-0 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full shadow-md"
      >
        <span>
          10% OFF (
          <span className="line-through">${totalOriginalPrice}</span>{' '}
          <span className="text-gray-100 font-bold">${totalDiscountedPrice}</span>)
        </span>
      </motion.div>}

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-gray-700/50">
        <h3 className="text-lg top-2  top-4 relative flex items-center justify-center font-bold text-white tracking-tight">{showForm ? "Traveler's Information" : "Price Calculator"}</h3>

      </div>

      <div className="relative z-10 p-4 space-y-4">
        {loading ? (
          <div className="text-center text-gray-100">Loading pricing...</div>
        ) : !showForm ? (
          <>
            {/* Person counter */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-gray-100">
                <Users className="w-4 h-4 text-gray-200" />
                <h4 className="font-semibold text-xs uppercase tracking-wide">Group Size</h4>
              </div>
              <div className="flex items-center justify-center gap-2">
                <motion.button
                  onClick={() => updatePersons(persons - 1)}
                  disabled={persons <= 1}
                  className="
                    w-7 h-7 bg-gray-700/50 hover:bg-gray-600/50 disabled:bg-gray-800/30 
                    text-white font-bold rounded-md flex items-center justify-center 
                    transition-all duration-300 group/minus
                    disabled:cursor-not-allowed
                  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Minus className="w-4 h-4 relative z-10" />
                </motion.button>
                
                <span className="w-12 h-7 flex items-center justify-center text-base font-bold text-gray-100">
                  {persons}
                </span>
                
                <motion.button
                  onClick={() => updatePersons(persons + 1)}
                  className="
                    w-7 h-7 bg-gray-700/50 hover:bg-gray-600/50 
                    text-white font-bold rounded-md flex items-center justify-center 
                    transition-all duration-300 group/plus
                  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4 relative z-10" />
                </motion.button>
              </div>
            </div>

            {/* Price info */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-gray-300 text-xs font-medium uppercase tracking-wide">Price per Person:</span>
                <span className="text-gray-400 line-through text-sm">${originalPricePerPerson}</span>
                <span className="text-lg font-bold text-gray-100">${discountedPricePerPerson}</span>
              </div>
            </div>

            {/* Total and Savings */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800/30 rounded-lg p-2 border border-gray-700/50 relative overflow-hidden"
            >
              <div className="relative text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-gray-300 text-xs font-medium uppercase tracking-wide">Total:</span>
                  <span className="text-xl font-bold text-white">${totalDiscountedPrice}</span>
                  <span className="text-xs font-semibold text-gray-100">
                    (Save ${totalOriginalPrice - totalDiscountedPrice})
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Price tiers */}
            <div className="space-y-2">
              <div className="text-center text-gray-200 font-semibold text-xs uppercase tracking-wide">
                Group Pricing
              </div>
              <div className="space-y-1">
                {getAllPricingTiers().map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className={`
                      flex justify-between items-center p-2 rounded-lg 
                      transition-all duration-300
                      ${persons >= tier.minPersons && persons <= tier.maxPersons
                        ? 'bg-gray-800/80 border border-gray-600/80 shadow-lg'
                        : 'bg-gray-900/30 border border-gray-700/50'
                      }
                    `}
                  >
                    <span className={`
                      font-semibold text-xs relative z-10
                      ${persons >= tier.minPersons && persons <= tier.maxPersons 
                        ? 'text-white' 
                        : 'text-gray-200'
                      }
                    `}>
                      {tier.label}
                    </span>
                    <div className="flex items-center gap-1 relative z-10">
                      <span className="text-gray-400 line-through text-xs">${tier.price}</span>
                      <span className={`
                        font-bold text-xs
                        ${persons >= tier.minPersons && persons <= tier.maxPersons 
                          ? 'text-white' 
                          : 'text-gray-200'
                        }
                      `}>
                        ${tier.discountedPrice}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Book Now */}
            {/* <div>
              <motion.button
                onClick={handleBookNow}
                className="
                  group/button relative w-full bg-gray-700/50 hover:bg-gray-600/50 
                  text-white font-bold py-2.5 px-3 rounded-lg transition-all duration-300
                "
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center justify-center gap-1.5">
                  <Mountain className="w-4 h-4" />
                  <span className="font-bold tracking-wide text-sm">BOOK NOW</span>
                </div>
              </motion.button>
            </div> */}

            <motion.button
              onClick={handleBookNow}
              className={`
                w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-3 rounded-lg transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
              whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
            >
              <div className="relative flex items-center justify-center gap-1.5">
                <Mountain className="w-4 h-4" />
                <span className="font-bold tracking-wide text-sm">BOOK NOW</span>
              </div>
            </motion.button>
          </>
        ) : (
          // Traveler Info Form
          <div className="space-y-3">
            {[
              { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Full Name' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'Email' },
              { label: 'Country', name: 'country', type: 'text', placeholder: 'Country' },
              { label: 'Phone Number', name: 'phone', type: 'text', placeholder: 'Phone Number with country code' },
              { label: 'Trek Departure Date', name: 'departureDate', type: 'date', placeholder: 'Trek Departure Date' },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                {field.name === 'departureDate' && (
                  <label className="text-gray-300 text-xs font-medium mb-1">{field.label}</label>
                )}
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className="p-2 rounded-md bg-gray-900/40 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  required
                />
              </div>
            ))}

            {/* Payment summary */}
            <div className="bg-gray-800/30 rounded-lg p-2 border border-gray-700/50 text-center">
              <div className="text-gray-100 font-semibold text-sm">
                Paying for {persons} {persons > 1 ? 'persons' : 'person'}: ${totalDiscountedPrice} <br />
                You save: ${totalOriginalPrice - totalDiscountedPrice}
              </div>
            </div>

            {/* Pay Now */}
            <motion.button
              onClick={handlePayNow}
              disabled={!isFormValid() || processingPayment}
              className={`
                w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-3 rounded-lg transition-all duration-300
                 disabled:cursor-not-allowed
              `}
              whileHover={{ scale: isFormValid() ? 1.02 : 1 }}
              whileTap={{ scale: isFormValid() ? 0.98 : 1 }}
            >
              {processingPayment ? 'Processing...' : 'PAY NOW'}
            </motion.button>
          </div>
        )}
      </div>

      {/* Bottom accent */}
      <div className="h-0.5 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600"></div>
    </motion.div>
  );
};

export default TrekkingRightSideBar;