// src/pages/forum.tsx
import React from 'react';
import Forum from './components/Forum';
import Header from './components/Header';
import Footer from './components/Footer';

const ForumPage: React.FC = () => {
    return (
        <>
            <Header theme='dark' />
            <div className="container mx-auto my-8 mt-32">
                <Forum />
            </div>
            <Footer />
        </>
    );
};

export default ForumPage;
