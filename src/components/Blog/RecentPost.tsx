'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import GlassButton from '../Bottons/GlassButton';

interface Slide {
  url: string;
  alt: string;
  caption: string;
  trekUrl: string;
}

const slides: Slide[] = [
  {
    url: '/images/slide1.webp',
    alt: 'Annapurna Region',
    caption: 'Annapurna Region',
    trekUrl: '/trekking/annapurna-region/',
  },
  {
    url: '/images/slide2.jpg',
    alt: 'Everest Region',
    caption: 'Everest Region',
    trekUrl: '/trekking/everest-region/',
  },
  {
    url: '/images/slide3.jpg',
    alt: 'Langtang Region',
    caption: 'Langtang Region',
    trekUrl: '/trekking/langtang-region/',
  },
];

const Carousel: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      const promises = slides.map((slide) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = slide.url;
          img.onload = () => resolve();
          img.onerror = () => {
            console.error(`Image ${slide.url} failed to load`);
            resolve();
          };
        })
      );
      await Promise.all(promises);
      setIsLoading(false);
    };

    loadImages();

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  if (!slides.length) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="relative rounded-3xl overflow-hidden bg-gray-800/30 backdrop-blur-xl border border-white/10 shadow-2xl group">
        {/* Shimmer Overlay for Carousel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800 ease-in-out z-10"></div>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="w-10 h-10 border-4 border-white/25 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        <div className="relative flex h-[300px] transition-transform duration-500 ease-in-out">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`min-w-full h-full relative ${index === slideIndex ? 'block' : 'hidden'}`}
              onClick={() => window.location.href = slide.trekUrl}
            >
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                className="object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
                priority={index === 0}
              />
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 rounded-3xl z-10"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.05) 100%)`,
                }}
              ></div>
              <div className="absolute bottom-3 left-3 z-20">
                <GlassButton label={slide.caption} href={slide.trekUrl} />
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute overflow-hidden left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg group/button z-30"
          onClick={prevSlide}
          onKeyDown={(e) => handleKeyDown(e, prevSlide)}
          aria-label="Previous slide"
          tabIndex={0}
        >
          {/* Shimmer Overlay for Button */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-600 ease-in-out"></div>
          &lt;
        </button>
        <button
          className="absolute overflow-hidden right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg group/button z-30"
          onClick={nextSlide}
          onKeyDown={(e) => handleKeyDown(e, nextSlide)}
          aria-label="Next slide"
          tabIndex={0}
        >
          {/* Shimmer Overlay for Button */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-600 ease-in-out"></div>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
