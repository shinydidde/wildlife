// StatsCard.tsx
interface StatsCardProps {
    title: string;
    value: string; // Ensure the property is named `value`
    description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h4 className="text-lg font-bold text-green-600">{title}</h4>
            <p className="text-4xl font-extrabold text-gray-800 mt-2">{value}</p>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
        </div>
    );
};

export default StatsCard;
