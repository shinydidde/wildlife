import React from 'react';

const WildlifeVirtualTour: React.FC = () => {
    return (
        <div className="my-8 p-6 rounded-lg shadow-md bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Take a Virtual Tour of the Serengeti</h2>
            <div className="relative w-full h-64 mb-6">
                <iframe
                    src="https://www.youtube.com/embed/45y7Lcs02i0"
                    width="100%"
                    height="500"
                    frameBorder="0"
                    allowFullScreen
                    title="Serengeti Virtual Tour"
                    className="rounded-lg"
                ></iframe>
            </div>
            <p className="text-lg text-gray-700 mt-4">
                The Serengeti is one of the most famous and biologically diverse ecosystems in the world. Take a virtual tour and witness the spectacular wildlife and the annual migration that attracts millions of animals each year.
            </p>
        </div>
    );
};

export default WildlifeVirtualTour;
