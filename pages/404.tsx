// pages/404.tsx

import React from 'react';
import Link from 'next/link';
import Header from './components/Header';

const NotFoundPage: React.FC = () => {
    return (
        <div className="bg-primary h-screen flex flex-col items-center justify-center text-center p-4">
            <Header theme="dark"/>
            <div className="flex justify-center mb-6">
                {/* Use an animal-themed image for the 404 error */}
                <img
                    src="https://i.imgur.com/5hO6yxS.gif"
                    alt="404 Error - Animal Theme"
                    className="w-2/3 md:w-1/2"
                />
            </div>

            <h1 className="text-4xl font-bold text-green-600 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-6">Oops! Looks like this page got lost in the wild.</p>
            <p className="text-lg text-gray-500 mb-8">The page you are looking for doesn&apos;t exist or may have been moved.</p>

            {/* Back to Home link */}
            <Link href="/" className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
