"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

interface Sanctuary {
  _id: string;
  name: string;
  imageUrl: string;
  country: string;
  stateOrRegion: string;
}

const SanctuaryList: React.FC = () => {
  const [sanctuaries, setSanctuaries] = useState<Sanctuary[]>([]);
  const [filteredSanctuaries, setFilteredSanctuaries] = useState<Sanctuary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>(""); // New state for search term

  useEffect(() => {
    const fetchSanctuaries = async () => {
      try {
        const response = await fetch("https://wildlife-be.onrender.com/api/sanctuaries");
        const data: Sanctuary[] = await response.json();
        setSanctuaries(data);
        setFilteredSanctuaries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sanctuaries:", error);
        setLoading(false);
      }
    };

    fetchSanctuaries();
  }, []);

  // Effect to handle filtering based on region and search term
  useEffect(() => {
    let tempSanctuaries = [...sanctuaries];

    // Filter by region
    if (filter !== "All") {
      tempSanctuaries = tempSanctuaries.filter((s) =>
        s.country.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      tempSanctuaries = tempSanctuaries.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSanctuaries(tempSanctuaries);
  }, [filter, searchTerm, sanctuaries]);

  const handleFilterChange = (region: string) => {
    setFilter(region);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSanctuaryClick = (sanctuaryName: string) => {
    const sanctuaryLinks: { [key: string]: string } = {
      "Sanctuary One": "https://sanctuaryone.org/",
      "Blue Barn Farm and Sanctuary": "https://www.bluebarnsanctuary.org/",
      "Welcome Home Animal Sanctuary": "https://www.welcomehomesanctuary.com/",
      "Animal Rescue League of Boston": "https://www.arlboston.org/",
      "Arthur's Acres Animal Sanctuary": "https://www.arthursacresanimalsanctuary.org/",
      "Farm of the Free": "https://www.farmofthefree.org/", // Corrected empty string key
    };

    const redirectUrl = sanctuaryLinks[sanctuaryName];
    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
    } else {
      const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(
        sanctuaryName.replace(/ /g, "_")
      )}`;
      window.open(wikiUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-primary">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-primary min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-green-700 to-green-500 text-white p-8 text-center">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://wallpapercave.com/wp/wp7507088.jpg')`,
            }}
          ></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mt-20">Sanctuaries Around the World</h1>
            <p className="mt-4 text-lg">
              Discover the most beautiful and diverse sanctuaries protecting wildlife across the globe.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-2xl font-bold text-green-600">2000+</h3>
            <p className="text-gray-600">Sanctuaries Worldwide</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-600">150+</h3>
            <p className="text-gray-600">Countries Covered</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-600">50%</h3>
            <p className="text-gray-600">Endangered Species Protected</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-600">500+</h3>
            <p className="text-gray-600">Conservation Projects</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="container mx-auto p-6 mt-6">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search sanctuaries by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {["All", "Africa", "India", "New Zealand", "Kenya", "United Kingdom", "USA"].map(
              (region) => (
                <button
                  key={region}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    filter === region
                      ? "bg-green-700 text-white"
                      : "bg-white text-gray-800 hover:bg-green-500 hover:text-white"
                  }`}
                  onClick={() => handleFilterChange(region)}
                >
                  {region}
                </button>
              )
            )}
          </div>
        </div>

        {/* Sanctuary List */}
        <div className="container mx-auto p-6">
          {filteredSanctuaries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredSanctuaries.map((sanctuary) => (
                <div
                  key={sanctuary._id}
                  onClick={() => handleSanctuaryClick(sanctuary.name)}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                >
                  <img
                    src={sanctuary.imageUrl}
                    alt={sanctuary.name}
                    className="w-full h-48 object-cover" // Changed to 'object-cover' for better image fitting
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-green-600">{sanctuary.name}</h2>
                    <p className="text-gray-700">
                      <span className="font-medium">Country:</span> {sanctuary.country}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">State/Region:</span> {sanctuary.stateOrRegion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No sanctuaries found.</p>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-green-700 to-green-500 text-white py-12 text-center">
          <h2 className="text-3xl font-bold">Join the Conservation Effort</h2>
          <p className="mt-4 text-lg">
            Explore sanctuaries, learn about conservation efforts, and contribute to protecting wildlife.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-green-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </>
  );
};

export default SanctuaryList;
