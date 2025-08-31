// app/trekking/mardi-himal-trek/page.tsx
"use client";

import { useEffect } from "react";
import { useTrekkingContext } from "../TrekkingContext";
import OverviewSection from "@/components/Trekking/Overview";
import GlassSeparator from "@/components/Trekking/GlassSeperator";
import ItinerarySection from "@/components/Trekking/ItinerarySection";
import IncludeExcludeSection from "@/components/Trekking/IncludeAndExcludeSection";
import FAQSection from "@/components/Trekking/FAQSection";
import ContactForm from "@/components/Contact/ContactForm";
import HowMardiTreksHelpsSection from "@/components/Trekking/HowMardiTreksHelpSection";
import GallerySection from "@/components/Trekking/Gallery";

export default function MardiHimalTrekPage() {
  const { setSiteTitle, setBackgroundImage, setCurrentRoute } = useTrekkingContext();

  useEffect(() => {
    setSiteTitle("Mardi Himal Trek");
    setBackgroundImage("/images/mardi-himal-bg.jpg");
    setCurrentRoute("mardi-himal-trek");
  }, [setSiteTitle, setBackgroundImage, setCurrentRoute]);


interface OverviewItem {
  heading: string;
  description: string;
}
  // Example 2: Adventure Page Data
  const OverviewInfo: OverviewItem[] = [
    {
      heading: 'Rapid Booking',
      description: 'Secure your adventure spot quickly.'
    },
    {
      heading: 'Safe Exploration',
      description: 'Explore with confidence and safety.'
    },
    {
      heading: 'Progress Updates',
      description: 'Get live updates on your adventure.'
    },
    {
      heading: 'Group Expeditions',
      description: 'Join others for a thrilling group adventure.'
    },
    {
      heading: 'Personalized Trips',
      description: 'Create a trip that matches your style.'
    },
    {
      heading: 'hi',
      description: 'Sync adventure details across devices.'
    }
  ];

  return (
    <>
    <OverviewSection title="Overview for Mardi Himal Trek" info={OverviewInfo} />
    <GlassSeparator />
    <ItinerarySection
  title="Langtang Valley Trek Itinerary"
  shortDescription="Explore the day-by-day breakdown of the Langtang Valley Trek with cultural insights and scenic highlights."
  items={[
    {
      heading: "Day 1: Arrival in Kathmandu",
      description: "Welcome to Nepal! Meet your trekking guide and prepare for the adventure."
    },
    {
      heading: "Day 2: Drive to Syabrubesi",
      description: "A scenic drive through hills and rivers to reach the trek starting point."
    },
    {
      heading: "Day 3: Trek to Lama Hotel",
      description: "Walk through forests and villages with stunning mountain views."
    }
  ]}
/>
<GlassSeparator />
<IncludeExcludeSection
  title="Everest Base Camp Trek Inclusions & Exclusions"
  shortInfo="Here’s what is covered and not covered in your Everest Base Camp Trek package."
  included={[
    "Airport pick-up and drop-off",
    "Accommodation in Kathmandu (2 nights)",
    "All trekking permits",
    "Three meals per day during trek",
    "Professional English-speaking guide"
  ]}
  excluded={[
    "International flights",
    "Nepal visa fee",
    "Personal expenses (laundry, WiFi, etc.)",
    "Travel insurance",
    "Tips for guide and porter"
  ]}
/>
<GlassSeparator />
<HowMardiTreksHelpsSection/>
<GlassSeparator />
<GallerySection 
       title="Mardi Himal Trek Gallery"
        shortDescription="Discover the beauty of Mardi Himal Trek through our gallery of stunning images."
        images={[
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-5.jpg",
            alt: "Good view of Mardi Himal Trek",
            caption: "Good view of Mardi Himal Trek",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-1.jpg",
            alt: "On the way to Mardi Himal Trek",
            caption: "On the way to Mardi Himal Trek",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-6.jpg",
            alt: "Enjoying the Mardi Himal View",
            caption: "Enjoying the Mardi Himal View",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-2-1024x768.jpg",
            alt: "Group of people enjoying at Mardi Treks",
            caption: "Group of people enjoying at Mardi Treks",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-3-1024x768.jpg",
            alt: "Mardi Himal Trek",
            caption: "Mardi Himal Trek",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-4.jpg",
            alt: "Solo traveler at Mardi Himal Trek",
            caption: "Solo traveler at Mardi Himal Trek",
          },{
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-5.jpg",
            alt: "Good view of Mardi Himal Trek",
            caption: "Good view of Mardi Himal Trek",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-1.jpg",
            alt: "On the way to Mardi Himal Trek",
            caption: "On the way to Mardi Himal Trek",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-6.jpg",
            alt: "Enjoying the Mardi Himal View",
            caption: "Enjoying the Mardi Himal View",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-2-1024x768.jpg",
            alt: "Group of people enjoying at Mardi Treks",
            caption: "Group of people enjoying at Mardi Treks",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-3-1024x768.jpg",
            alt: "Mardi Himal Trek",
            caption: "Mardi Himal Trek",
          },
          {
            src: "https://marditreks.com/wp-content/uploads/2025/07/Mardi-Himal-Trek-4.jpg",
            alt: "Solo traveler at Mardi Himal Trek",
            caption: "Solo traveler at Mardi Himal Trek",
          },
        ]}
      />
<GlassSeparator />
<FAQSection
  title="Frequently Asked Questions"
  shortDescription="Got questions? We've got answers."
  items={[
    {
      question: "Day 1: Arrival in Kathmandu",
      answer: "Welcome to Nepal! Meet your trekking guide and prepare for the adventure."
    },
    {
      question: "Day 2: Drive to Syabrubesi",
      answer: "A scenic drive through hills and rivers to reach the trek starting point."
    },
    {
      question: "Day 3: Trek to Lama Hotel",
      answer: "Walk through forests and villages with stunning mountain views."
    }
  ]}
/>
<ContactForm/>
    </>
  );
}