// src/pages/animal/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AnimalDetail: React.FC = () => {
    const router = useRouter();
    const [animalDetails, setAnimalDetails] = useState<null>(null);

    useEffect(() => {
        // Check local storage for animal details
        const savedAnimalDetails = localStorage.getItem('animalDetails');
        if (savedAnimalDetails) {
            setAnimalDetails(JSON.parse(savedAnimalDetails));
        }
    }, []);

    // Fallback to router query if animalDetails is not available
    const animal = animalDetails || router.query;

    // Destructure values, ensuring they are strings or fall back to empty strings
    const commonNameStr = typeof animal.commonName === 'string' ? animal.commonName : '';
    const scientificNameStr = typeof animal.scientificName === 'string' ? animal.scientificName : '';
    const countryStr = typeof animal.country === 'string' ? animal.country : '';
    const distributionStatusStr = typeof animal.distributionStatus === 'string' ? animal.distributionStatus : '';
    const federalListingStatusStr = typeof animal.federalListingStatus === 'string' ? animal.federalListingStatus : '';
    const globalConservationRankStr = typeof animal.globalConservationRank === 'string' ? animal.globalConservationRank : '';
    const stateConservationRankStr = typeof animal.stateConservationRank === 'string' ? animal.stateConservationRank : '';
    const taxonomicGroupStr = typeof animal.taxonomicGroup === 'string' ? animal.taxonomicGroup : '';
    const taxonomicSubGroupStr = typeof animal.taxonomicSubGroup === 'string' ? animal.taxonomicSubGroup : '';
    const imageUrlStr = typeof animal.imageUrl === 'string' ? animal.imageUrl : '';

    // Generate the Wikipedia URL
    const formattedCommonName = commonNameStr
        .replace(/ /g, "_") // Replace spaces with underscores
        .replace(/’/g, "'"); // Replace typographic apostrophe with standard apostrophe

    const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(formattedCommonName)}`;

    // Handle case where data is not yet available
    if (!commonNameStr) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col p-6">
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 w-full">
                    {/* Animal Details Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-2/5">
                        <img src={imageUrlStr} alt={commonNameStr} className="w-full h-60 object-cover rounded-md" />
                        <h1 className="text-3xl font-bold text-green-600 mt-4">{commonNameStr}</h1>
                        <h2 className="text-xl font-semibold text-gray-700 mt-2">
                            Scientific Name: <span className="text-gray-500">{scientificNameStr}</span>
                        </h2>
                        <h3 className="text-lg font-semibold mt-4">Country</h3>
                        <p className="text-gray-600">{countryStr}</p>

                        <h3 className="text-lg font-semibold mt-4">Distribution Status</h3>
                        <p className="text-gray-600">{distributionStatusStr}</p>

                        <h3 className="text-lg font-semibold mt-4">Federal Listing Status</h3>
                        <p className="text-gray-600">{federalListingStatusStr}</p>

                        <h3 className="text-lg font-semibold mt-4">State Conservation Rank</h3>
                        <p className="text-gray-600">{stateConservationRankStr}</p>

                        <h3 className="text-lg font-semibold mt-4">Global Conservation Rank</h3>
                        <p className="text-gray-600">{globalConservationRankStr}</p>

                        <h3 className="text-lg font-semibold mt-4">Taxonomic Group</h3>
                        <p className="text-gray-600">{taxonomicGroupStr}</p>

                        <h3 className="text-lg font-semibold mt-4">Taxonomic Subgroup</h3>
                        <p className="text-gray-600">{taxonomicSubGroupStr}</p>
                    </div>

                    {/* Wikipedia Iframe Card */}
                    <div className="bg-white rounded-lg shadow-md w-full md:w-3/5 mt-4 md:mt-0 h-[90vh] md:h-auto">
                        <iframe
                            src={wikiUrl}
                            title={`Wikipedia - ${commonNameStr}`}
                            className="w-full h-full rounded-lg"
                            frameBorder="0"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default AnimalDetail;
