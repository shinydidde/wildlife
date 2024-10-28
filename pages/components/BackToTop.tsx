// src/components/BackToTop.tsx
import React, { useEffect, useState } from 'react';

const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleScroll = () => {
        if (window.scrollY > 300) { // Adjust the scroll position to your liking
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        isVisible && (
            <button
                onClick={handleScrollToTop}
                className="fixed bottom-4 right-4 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition duration-300"
                aria-label="Back to top"
            >
                ↑
            </button>
        )
    );
};

export default BackToTop;
