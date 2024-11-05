// src/components/Banner.tsx
import React from 'react';
import FallingLeaves from './FallingLeaves'; // Import the FallingLeaves component

// http://www.joyfulhedgehogs.com/uploads/1/1/5/0/11507248/bannersnek_3.jpg

const Banner: React.FC = () => {
  return (
    <div className="relative py-16">
      <FallingLeaves />
      <div className="container mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-green-600">Explore the Wild</h2>
        <h1 className="text-5xl font-extrabold text-green-700 mt-4">Discover Fascinating Animals & Their Habitats</h1>
      </div>
      <div className="absolute inset-0">
        <img
          src="https://soundwaterstewards.org/wp-content/uploads/2021/07/header-red-star.jpg"
          alt="Discover Fascinating Animals & Their Habitats"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
    </div>
  );
};

export default Banner;
