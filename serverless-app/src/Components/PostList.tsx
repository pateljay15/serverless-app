import React from 'react';
import PostCard from './PostCard';

interface Post {
    id: number;
    title: string;
    imageurl: string;
    description: string;
}

interface PostsListProps {
    posts: Post[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
    return (
        <div style={{ overflowY: 'scroll', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {posts.map(post => (
                <PostCard key={post.id} title={post.title} imageurl={post.imageurl} description={post.description} />
            ))}
        </div>
    );
};

export default PostsList;
