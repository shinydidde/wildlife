import React, { useEffect, useState } from 'react';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, ArcElement, PointElement, LineElement } from 'chart.js';
import Header from './components/Header';
import Footer from './components/Footer';

// Register necessary chart elements
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
    PointElement, // Register PointElement for line and scatter charts
    LineElement   // Register LineElement for line charts
);

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
    const [categoryFilter, setCategoryFilter] = useState<string>(''); // Category filter state
    const [conservationFilter, setConservationFilter] = useState<string>(''); // Conservation filter state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://wildlife-be.onrender.com/api/animals');
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

    // Prepare data for the category count chart
    const categoriesCount = data.reduce((acc: Record<string, number>, animal: Animal) => {
        const category = animal.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const categoryChartData = {
        labels: Object.keys(categoriesCount),
        datasets: [
            {
                label: 'Number of Animals by Category',
                data: Object.values(categoriesCount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    // Prepare data for the conservation status chart
    const conservationCount = data.reduce((acc: Record<string, number>, animal: Animal) => {
        const status = animal.stateConservationRank;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const conservationChartData = {
        labels: Object.keys(conservationCount),
        datasets: [
            {
                label: 'Number of Animals by Conservation Status',
                data: Object.values(conservationCount),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    // New Data: Animals by Taxonomic Group
    const taxonomicGroupCount = data.reduce((acc: Record<string, number>, animal: Animal) => {
        const group = animal.taxonomicGroup;
        acc[group] = (acc[group] || 0) + 1;
        return acc;
    }, {});

    const taxonomicGroupChartData = {
        labels: Object.keys(taxonomicGroupCount),
        datasets: [
            {
                label: 'Animals Count by Taxonomic Group',
                data: Object.values(taxonomicGroupCount),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    };

    // New Data: Distribution of Animals
    const distributionStatusCount = data.reduce((acc: Record<string, number>, animal: Animal) => {
        const status = animal.distributionStatus;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const distributionPieChartData = {
        labels: Object.keys(distributionStatusCount),
        datasets: [
            {
                label: 'Distribution of Animals',
                data: Object.values(distributionStatusCount),
                backgroundColor: ['#FFCD56', '#FF6384', '#36A2EB', '#4BC0C0'],
            },
        ],
    };

    return (
        <>
            <Header theme='dark'/>
            <div className="container mx-auto my-8 p-6 mt-32 bg-gray-50 rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold text-center text-green-700 mb-8">Wildlife Data Visualization</h1>

                {/* Category Filter Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Filter by Category</h2>
                    <select
                        className="mb-6 p-3 w-full md:w-1/4 bg-white border rounded-md shadow-md"
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {Object.keys(categoriesCount).map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Animals Count by Category</h2>
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <Bar
                            data={{
                                ...categoryChartData,
                                datasets: [{
                                    ...categoryChartData.datasets[0],
                                    data: categoryFilter ? categoryChartData.datasets[0].data.filter((_, index) => categoryChartData.labels[index] === categoryFilter) : categoryChartData.datasets[0].data
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Distribution of Animals by Category',
                                        font: { size: 18 },
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => `${context.dataset.label}: ${context.raw}`,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Conservation Status Filter Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Filter by Conservation Status</h2>
                    <select
                        className="mb-6 p-3 w-full md:w-1/4 bg-white border rounded-md shadow-md"
                        onChange={(e) => setConservationFilter(e.target.value)}
                    >
                        <option value="">All Conservation Status</option>
                        {Object.keys(conservationCount).map((status, index) => (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>

                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Animals Count by Conservation Status</h2>
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <Bar
                            data={{
                                ...conservationChartData,
                                datasets: [{
                                    ...conservationChartData.datasets[0],
                                    data: conservationFilter ? conservationChartData.datasets[0].data.filter((_, index) => conservationChartData.labels[index] === conservationFilter) : conservationChartData.datasets[0].data
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Animals Conservation Status Overview',
                                        font: { size: 18 },
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => `${context.dataset.label}: ${context.raw}`,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Additional Graphs - Pie and Radar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Animals by Conservation Status - Pie Chart</h2>
                        <Pie data={conservationChartData} options={{ responsive: true }} />
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Conservation Status per Category - Radar Chart</h2>
                        <Radar data={conservationChartData} options={{ responsive: true }} />
                    </div>
                </div>

                 {/* Additional Graphs - New Charts */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Animals by Taxonomic Group</h2>
                        <Bar data={taxonomicGroupChartData} options={{ responsive: true }} />
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Distribution of Animals</h2>
                        <Pie data={distributionPieChartData} options={{ responsive: true }} />
                    </div>
                </div>

                {/* Download Report Button */}
                <div className="mt-12 text-center">
                    <button className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200">
                        Download Full Report
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Graphs;
