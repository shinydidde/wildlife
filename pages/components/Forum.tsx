import React, { useState } from 'react';

const Forum: React.FC = () => {
    const [posts, setPosts] = useState<{ id: number; content: string; user: string; likes: number; dislikes: number; avatar: string; replies: string[] }[]>([]);
    const [newPost, setNewPost] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [newReply, setNewReply] = useState("");

    const handlePostSubmit = () => {
        if (newPost.trim()) {
            const newPostData = {
                id: posts.length + 1,
                content: newPost,
                user: 'User', // Placeholder user
                likes: 0,
                dislikes: 0,
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg', // Placeholder avatar
                replies: [],
            };
            setPosts([...posts, newPostData]);
            setNewPost("");
        }
    };

    const handleLike = (postId: number) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    const handleDislike = (postId: number) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
        ));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleReplySubmit = (postId: number) => {
        if (newReply.trim()) {
            const updatedPosts = posts.map(post =>
                post.id === postId
                ? { ...post, replies: [...post.replies, newReply] }
                : post
            );
            setPosts(updatedPosts);
            setNewReply("");
        }
    };

    const filteredPosts = posts.filter(post =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            {/* Search bar */}
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search posts..."
                    className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <h2 className="text-3xl font-bold text-center mb-6">Wildlife Discussion Forum</h2>

            {/* Create a new post */}
            <div className="mb-6">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                />
                <button
                    onClick={handlePostSubmit}
                    className="bg-green-900 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-700 transition duration-300"
                >
                    Post
                </button>
            </div>

            {/* Posts display */}
            <div>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <div key={post.id} className="border-b py-4 flex justify-between items-start hover:bg-gray-100 transition-all duration-300">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                    <img src={post.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <div className="font-semibold text-blue-700">{post.user}</div>
                                        <div className="text-gray-700">{post.content}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2 text-gray-500">
                                    <div>
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className="text-green-500 hover:text-green-600 px-2 py-1 transition duration-200"
                                        >
                                            👍 {post.likes}
                                        </button>
                                        <button
                                            onClick={() => handleDislike(post.id)}
                                            className="text-red-500 hover:text-red-600 px-2 py-1 transition duration-200"
                                        >
                                            👎 {post.dislikes}
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => handleReplySubmit(post.id)}
                                            className="text-blue-500 hover:text-blue-600 px-2 py-1 transition duration-200"
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </div>

                                {/* Replies section */}
                                {post.replies.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-gray-800">Replies:</h3>
                                        {post.replies.map((reply, index) => (
                                            <div key={index} className="ml-6 mt-2 text-gray-700">
                                                {reply}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add a reply */}
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={newReply}
                                        onChange={(e) => setNewReply(e.target.value)}
                                        placeholder="Add a reply..."
                                        className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No posts found</div>
                )}
            </div>
        </div>
    );
};

export default Forum;
