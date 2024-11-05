// src/pages/forum.tsx
import React from 'react';
import Forum from './components/Forum';
import Header from './components/Header';

const ForumPage: React.FC = () => {
    return (
        <>
            <Header />
        <div className="container mx-auto my-8">
            <h1 className="text-4xl font-bold text-center">Wildlife Discussion Forum</h1>
            <Forum />
        </div>
        </>
    );
};

export default ForumPage;
