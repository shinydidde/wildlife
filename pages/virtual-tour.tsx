// src/pages/virtual-tour.tsx
import React from 'react';
import WildlifeVirtualTour from './components/WildlifeVirtualTour';
import Header from './components/Header';

const VirtualTourPage: React.FC = () => {
    return (
        <>
            <Header />
        <div className="container mx-auto my-8">
            <h1 className="text-4xl font-bold text-center">Virtual Wildlife Tours</h1>
            <WildlifeVirtualTour />
        </div>
        </>
    );
};

export default VirtualTourPage;
