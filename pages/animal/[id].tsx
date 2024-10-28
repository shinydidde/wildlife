// src/pages/animal/[id].tsx
import { useRouter } from 'next/router';
import React from 'react';

const AnimalDetail: React.FC = () => {
    const router = useRouter();
    const { commonName, scientificName, country, behavior, conservationStatus, imageUrl } = router.query;
    console.log(router.query)

    // Type assertion to ensure the values are strings
    const commonNameStr = typeof commonName === 'string' ? commonName : '';
    const scientificNameStr = typeof scientificName === 'string' ? scientificName : '';
    const countryStr = typeof country === 'string' ? country : '';
    const behaviorStr = typeof behavior === 'string' ? behavior : '';
    const conservationStatusStr = typeof conservationStatus === 'string' ? conservationStatus : '';
    const imageUrlStr = typeof imageUrl === 'string' ? imageUrl : '';

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <img src={imageUrlStr} alt={commonNameStr} className="w-full h-60 object-cover" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-green-600">{commonNameStr}</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mt-2">
                        Scientific Name: <span className="text-gray-500">{scientificNameStr}</span>
                    </h2>
                    <h3 className="text-lg font-semibold mt-4">Country: {countryStr}</h3>
                    <p className="text-gray-600"></p>
                    <h3 className="text-lg font-semibold mt-4">Behavior</h3>
                    <p className="text-gray-600">{behaviorStr}</p>
                    <h3 className="text-lg font-semibold mt-4">Conservation Status</h3>
                    <p className="text-gray-600">{conservationStatusStr}</p>
                </div>
            </div>
        </div>
    );
};

export default AnimalDetail;
