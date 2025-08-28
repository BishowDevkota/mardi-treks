"use client";
import React from 'react'

const Map = () => {
  const directions = [
    {
      id: 1,
      step: "Start from Kathmandu",
      direction: "Head west towards Pokhara via Prithvi Highway",
      distance: "200 km",
      icon: "🚗"
    },
    {
      id: 2,
      step: "Reach Pokhara",
      direction: "Go north towards Kande from Pokhara city center",
      distance: "45 km",
      icon: "🏔️"
    },
    {
      id: 3,
      step: "Kande to Deurali",
      direction: "Trek northeast through forest trail",
      distance: "3.5 km",
      icon: "🥾"
    },
    {
      id: 4,
      step: "Deurali to Forest Camp",
      direction: "Continue north through rhododendron forest",
      distance: "2 km",
      icon: "🌲"
    },
    {
      id: 5,
      step: "Forest Camp to High Camp",
      direction: "Climb northwest, steep ascent begins",
      distance: "1.5 km",
      icon: "⛰️"
    },
    {
      id: 6,
      step: "High Camp to Mardi Himal Base Camp",
      direction: "Head north to reach the final destination",
      distance: "2 km",
      icon: "🏁"
    }
  ];

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      {/* Floating glass orbs - subtle and dark */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-white/5 rounded-full animate-float"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-white/3 rounded-full animate-float animation-delay-1000"></div>
      <div className="absolute bottom-32 left-40 w-3 h-3 bg-white/7 rounded-full animate-float animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif tracking-tight">
            Location & Directions
          </h1>
          <div className="w-32 h-1 bg-white/30 rounded-full mx-auto"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column - Map */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-black/40 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] p-8">
            {/* Shining Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            
            {/* Map Title */}
            <div className="relative mb-6 z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif tracking-tight text-center">
                Interactive Map
              </h2>
            </div>

            {/* Map container with dark glass frame */}
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-lg">
                {/* Dark glass overlay on map */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
                
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d878.9868092293134!2d83.9652045!3d28.2089156!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39959540016c5cfd%3A0xf05c28cd913c5f8e!2sMardi%20Treks!5e0!3m2!1sen!2snp!4v1753875931869!5m2!1sen!2snp" 
                  width="100%" 
                  height="400" 
                  style={{ border: 0 }} 
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative z-0 rounded-2xl"
                />
                
                {/* Corner accents - subtle and dark */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-lg"></div>
              </div>
            </div>

            {/* Location info dark glass panel */}
            <div className="mt-6 backdrop-blur-lg bg-black/30 rounded-xl border border-white/20 p-4 relative z-10">
              <div className="flex items-center justify-center space-x-2 text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Mardi Treks - Pokhara, Nepal</span>
              </div>
            </div>
          </div>

          {/* Right Column - Directions */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-black/40 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] p-8">
            {/* Shining Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            
            {/* Directions Title */}
            <div className="relative mb-6 z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif tracking-tight text-center">
                Trek Directions
              </h2>
            </div>

            {/* Directions List */}
            <div className="relative z-10 space-y-4 max-h-96 overflow-y-auto">
              {directions.map((direction, index) => (
                <div key={direction.id} className="backdrop-blur-lg bg-black/30 rounded-xl border border-white/20 p-4 hover:bg-black/40 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-lg">
                        {direction.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold text-sm">
                          Step {index + 1}: {direction.step}
                        </h3>
                        <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                          {direction.distance}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {direction.direction}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Panel */}
            <div className="mt-6 backdrop-blur-lg bg-black/30 rounded-xl border border-white/20 p-4 relative z-10">
              <div className="flex items-center justify-between text-white/80">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Total Trek Distance</span>
                </div>
                <span className="text-sm font-bold text-white">~254 km</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating action buttons */}
        <div className="absolute -bottom-6 right-8 flex space-x-4">
          <button className="group relative w-16 h-16 backdrop-blur-xl bg-black/40 rounded-full border border-white/30 shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden">
            {/* Button shining effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            
            <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
              <svg className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </button>
          
          <button className="group relative w-16 h-16 backdrop-blur-xl bg-black/40 rounded-full border border-white/30 shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden">
            {/* Button shining effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
            
            <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
              <svg className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}

export default Map