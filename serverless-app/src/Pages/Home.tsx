import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostButton from '../Components/CreatePostButton';
import PostList from '../Components/PostList';
import { fetchPosts, getAuthenticationToken, postData, postImage } from '../lambda-calls/LambdaCalls';
import './Home.css'; // Import the stylesheet

interface Post {
    id: number;
    title: string;
    imageurl: string;
    description: string;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const auth = getAuthenticationToken()

    const handleCreatePost = (title: string, imageurl: string, description: string, filename: string) => {
        let newPost = { id: Date.now(), title, imageurl, description };
        setPosts(prevPosts => [...prevPosts, newPost]);
        let dam = imageurl.split(",")
        console.log(filename, dam[1])
        postImage(filename, dam[1])
        .then(data => {
            console.log(data)

            postData({...newPost, userid: auth.id, imageurl: `https://storage.googleapis.com/profile-images15/${filename}`})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    };

    useEffect(() => {
        fetchPosts()
        .then(data => {
            setPosts(data);
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className="container">
            <div className="left-panel">
                <CreatePostButton onCreate={handleCreatePost} />
            </div>
            <div className="right-panel">
                <h1 className="posts-title">Posts</h1>
                <PostList posts={posts} />
            </div>
        </div>
    );
};

export default Home;
