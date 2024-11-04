// src/pages/graphs.tsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import Header from './components/Header';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const Graphs: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://wildlife-be.onrender.com/api/animals');
            const result = await response.json();
            setData(result);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Prepare data for the category count chart
    const categoriesCount = data.reduce((acc: any, animal: any) => {
        const category = animal.category;
        acc[category] = (acc[category] || 0) + 1; // Count occurrences of each category
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
            },
        ],
    };

    // Prepare data for the conservation status chart
    const conservationCount = data.reduce((acc: any, animal: any) => {
        const status = animal.stateConservationRank;
        acc[status] = (acc[status] || 0) + 1; // Count occurrences of each conservation status
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
            },
        ],
    };

    return (
        <>
            <Header />
            <div className="container mx-auto my-8">
                <h1 className="text-3xl font-bold mb-6">Wildlife Data Visualization</h1>

                <h2 className="text-2xl font-bold mb-4">Animals Count by Category</h2>
                <Bar data={categoryChartData} />

                <h2 className="text-2xl font-bold mb-4">Animals Count by Conservation Status</h2>
                <Bar data={conservationChartData} />
            </div>
        </>
    );
};

export default Graphs;
