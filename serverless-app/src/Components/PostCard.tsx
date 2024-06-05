import React from 'react';

interface PostProps {
    title: string;
    imageurl: string;
    description: string;
}

const PostCard: React.FC<PostProps> = ({ title,imageurl, description }) => {
    return (
        <div style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', width: '300px' }}>
            
            <img src={imageurl} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default PostCard;
