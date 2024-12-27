import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Register necessary chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface Animal {
    _id: string;
    commonName: string;
    scientificName: string;
    country: string;
    category: string;
    taxonomicGroup: string;
    taxonomicSubGroup: string;
    nyListingStatus: string;
    federalListingStatus: string;
    stateConservationRank: string;
    globalConservationRank: string;
    distributionStatus: string;
    imageUrl: string;
}

const Graphs: React.FC = () => {
    const [data, setData] = useState<Animal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>("category");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://wildlife-be.onrender.com/api/animals");
                const result: Animal[] = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
            </div>
        );
    }

    // Prepare data for charts
    const categoriesCount = data.reduce((acc: Record<string, number>, animal: Animal) => {
        acc[animal.category] = (acc[animal.category] || 0) + 1;
        return acc;
    }, {});

    const conservationCount = data.reduce((acc: Record<string, number>, animal: Animal) => {
        acc[animal.stateConservationRank] = (acc[animal.stateConservationRank] || 0) + 1;
        return acc;
    }, {});

    const taxonomicGroupCount = data.reduce((acc: Record<string, number>, animal: Animal) => {
        acc[animal.taxonomicGroup] = (acc[animal.taxonomicGroup] || 0) + 1;
        return acc;
    }, {});

    const distributionStatusCount = data.reduce((acc: Record<string, number>, animal: Animal) => {
        acc[animal.distributionStatus] = (acc[animal.distributionStatus] || 0) + 1;
        return acc;
    }, {});

    // Chart data
    const categoryChartData = { labels: Object.keys(categoriesCount), datasets: [{ data: Object.values(categoriesCount), backgroundColor: "rgba(75, 192, 192, 0.6)" }] };
    const conservationChartData = { labels: Object.keys(conservationCount), datasets: [{ data: Object.values(conservationCount), backgroundColor: "rgba(255, 99, 132, 0.6)" }] };
    const taxonomicGroupChartData = { labels: Object.keys(taxonomicGroupCount), datasets: [{ data: Object.values(taxonomicGroupCount), backgroundColor: "rgba(54, 162, 235, 0.6)" }] };
    const distributionPieChartData = { labels: Object.keys(distributionStatusCount), datasets: [{ data: Object.values(distributionStatusCount), backgroundColor: ["#FFCD56", "#FF6384", "#36A2EB", "#4BC0C0"] }] };

    return (
        <>
            <Header theme="dark" />
            <div className="container mx-auto mt-20 px-4 sm:px-8">
                <h1 className="text-4xl font-bold text-green-700 text-center mb-8">Wildlife Data Visualization</h1>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center mb-6 space-x-2 sm:space-x-4">
                    {["category", "conservation", "taxonomic", "distribution"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 text-sm sm:text-lg mb-2 font-semibold rounded-lg ${
                                activeTab === tab ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
                            } transition-colors duration-300`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "category" && "Category"}
                            {tab === "conservation" && "Conservation"}
                            {tab === "taxonomic" && "Taxonomic Group"}
                            {tab === "distribution" && "Distribution"}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {activeTab === "category" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Animals Count by Category</h2>
                            <p className="text-gray-600">
                                This bar graph shows the distribution of animals across various categories, highlighting the richness and diversity of wildlife species.
                            </p>
                            <Bar data={categoryChartData} options={{ responsive: true, plugins: { title: { display: true, text: "Number of Animals by Category" } } }} />
                        </div>
                    )}
                    {activeTab === "conservation" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Conservation Status Overview</h2>
                            <p className="text-gray-600">
                                The pie chart depicts the conservation status of animals, emphasizing their current ecological risks and vulnerabilities.
                            </p>
                            <Pie data={conservationChartData} options={{ responsive: true }} />
                        </div>
                    )}
                    {activeTab === "taxonomic" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Animals by Taxonomic Group</h2>
                            <p className="text-gray-600">
                                This bar graph categorizes animals based on their taxonomic groups, showcasing their evolutionary relationships.
                            </p>
                            <Bar data={taxonomicGroupChartData} options={{ responsive: true }} />
                        </div>
                    )}
                    {activeTab === "distribution" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800">Animal Distribution</h2>
                            <p className="text-gray-600">
                                The pie chart displays the geographical distribution of animals, providing insights into habitat preferences and range.
                            </p>
                            <Pie data={distributionPieChartData} options={{ responsive: true }} />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Graphs;
