"use client";


import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function ComingSoon() {
  return (
    <div className="flex  bg-yellow-800 flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4 text-center"
      >
      
      {/* Overlay for better readability */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <h1 className={`${pacifico.className} text-5xl md:text-6xl text-yellow-400 mb-4`}>
          Coming Soon
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl">
          Exciting new trips are on the way! Stay tuned for breathtaking destinations and unforgettable experiences.
        </p>
        
        
       
       
      </div>
    </div>
  );
}
