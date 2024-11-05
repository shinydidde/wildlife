// src/components/Forum.tsx
import React, { useState } from 'react';

const Forum: React.FC = () => {
    const [posts, setPosts] = useState<{ id: number; content: string }[]>([]);
    const [newPost, setNewPost] = useState("");

    const handlePostSubmit = () => {
        if (newPost.trim()) {
            setPosts([...posts, { id: posts.length + 1, content: newPost }]);
            setNewPost("");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Wildlife Discussion Forum</h2>
            <div className="mb-4">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="border p-2 w-full rounded"
                />
                <button onClick={handlePostSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                    Post
                </button>
            </div>
            <div>
                {posts.map((post) => (
                    <div key={post.id} className="border-b py-2">
                        {post.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;
