"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Animal {
    commonName: string;
    scientificName: string;
    country: string;
    distributionStatus: string;
    federalListingStatus: string;
    globalConservationRank: string;
    stateConservationRank: string;
    taxonomicGroup: string;
    taxonomicSubGroup: string;
    imageUrl: string;
}

const AnimalDetail: React.FC = () => {
    const router = useRouter();
    const [animalDetails, setAnimalDetails] = useState<Animal | null>(null);

    useEffect(() => {
        // Check local storage for animal details
        const savedAnimalDetails = localStorage.getItem("animalDetails");
        if (savedAnimalDetails) {
            try {
                const parsedDetails: Animal = JSON.parse(savedAnimalDetails);
                setAnimalDetails(parsedDetails);
            } catch (error) {
                console.error("Failed to parse animal details from local storage:", error);
            }
        }
    }, []);

    // Fallback to router query if animalDetails is not available
    const animal: Partial<Animal> = animalDetails || (router.query as Partial<Animal>);

    // Destructure values, ensuring they are strings or fall back to empty strings
    const commonNameStr = animal.commonName ?? "";
    const scientificNameStr = animal.scientificName ?? "";
    const countryStr = animal.country ?? "";
    const distributionStatusStr = animal.distributionStatus ?? "";
    const federalListingStatusStr = animal.federalListingStatus ?? "";
    const globalConservationRankStr = animal.globalConservationRank ?? "";
    const stateConservationRankStr = animal.stateConservationRank ?? "";
    const taxonomicGroupStr = animal.taxonomicGroup ?? "";
    const taxonomicSubGroupStr = animal.taxonomicSubGroup ?? "";
    const imageUrlStr = animal.imageUrl ?? "";

    // Format Wikipedia URL
    const formattedCommonName = commonNameStr
        .toLowerCase()
        .replace(/ /g, "_")
        .replace(/’/g, "'")
        .replace(/_/g, "_");

    const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(formattedCommonName)}`;

    // Handle case where data is not yet available
    if (!commonNameStr)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
            </div>
        );

    return (
        <>
            <Header theme="dark"/>
            <div className="min-h-screen py-6 mt-12">
                <div className="container mx-auto flex flex-col md:flex-row gap-6">
                    {/* Animal Details Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-2/5">
                        <img
                            src={imageUrlStr}
                            alt={commonNameStr}
                            className="w-full h-64 object-cover rounded-md mb-4"
                        />
                        <h1 className="text-3xl font-bold text-green-700">{commonNameStr}</h1>
                        <h2 className="text-xl font-semibold text-gray-600 mt-2">
                            Scientific Name: <span className="text-gray-500">{scientificNameStr}</span>
                        </h2>
                        <div className="mt-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Country</h3>
                                <p className="text-gray-600">{countryStr}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Distribution Status</h3>
                                <p className="text-gray-600">{distributionStatusStr}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Federal Listing Status</h3>
                                <p className="text-gray-600">{federalListingStatusStr}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">State Conservation Rank</h3>
                                <p className="text-gray-600">{stateConservationRankStr}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Global Conservation Rank</h3>
                                <p className="text-gray-600">{globalConservationRankStr}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Taxonomic Group</h3>
                                <p className="text-gray-600">{taxonomicGroupStr}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">Taxonomic Subgroup</h3>
                                <p className="text-gray-600">{taxonomicSubGroupStr}</p>
                            </div>
                        </div>
                    </div>

                    {/* Wikipedia Iframe */}
                    <div className="bg-white rounded-lg shadow-md w-full md:w-3/5 p-6 flex flex-col space-y-6">
                        <div className="h-[50vh] md:h-full">
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
            </div>
            <Footer />
        </>
    );
};

export default AnimalDetail;
