import React, { ChangeEvent } from 'react';

interface DocumentaryProps {
    videoId: string;
    title: string;
    description: string;
    category: string;
    liked: boolean;
    onLike: () => void;
    comment: string;
    onCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void; // Updated type here
}

const DocumentaryVideo: React.FC<DocumentaryProps> = ({ videoId, title, description, category, liked, onLike, comment, onCommentChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <iframe
                className="w-full h-64 mb-4 rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

            {/* Documentary Title */}
            <h2 className="text-2xl font-bold text-green-600 mb-2">{title}</h2>

            {/* Documentary Category */}
            <p className="text-sm text-gray-500 mb-4">{category}</p>

            {/* Documentary Description */}
            <p className="text-gray-700">{description}</p>

            {/* Like Button */}
            <button
                onClick={onLike}
                className={`mt-4 w-full py-2 rounded-lg ${liked ? 'bg-red-600' : 'bg-green-600'} text-white`}
            >
                {liked ? 'Liked' : 'Like'}
            </button>

            {/* Comment Section */}
            <div className="mt-4">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={onCommentChange}  // No error now
                />
            </div>

            {/* Social Interaction Buttons */}
            <div className="mt-4 flex space-x-4 justify-between">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200">Share</button>
            </div>
        </div>
    );
};

export default DocumentaryVideo;
