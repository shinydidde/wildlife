// src/components/WildlifeVirtualTour.tsx
import React from 'react';

const WildlifeVirtualTour: React.FC = () => {
    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">Take a Virtual Tour of the Serengeti</h2>
            <iframe
                src="https://www.youtube.com/watch?v=45y7Lcs02i0"
                width="100%"
                height="500"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default WildlifeVirtualTour;
