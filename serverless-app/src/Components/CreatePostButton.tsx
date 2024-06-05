import React, { useState } from 'react';
import './CreatePostButton.css'; // Import the stylesheet
 

interface CreatePostProps {
    onCreate: (title: string, imageUrl: string, description: string, filename: string) => void;
}

const CreatePostButton: React.FC<CreatePostProps> = ({ onCreate }) => {
    const [title, setTitle] = useState('');
    const [imageurl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [filename, setFileName] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(title)
        console.log(imageurl)
        console.log(description)
        onCreate(title, imageurl, description, filename);
        setTitle('')
        setDescription('')
        setImageUrl('')
        setFileName('')
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImageUrl(reader.result.toString());
                    setFileName(file.name)
                }
            };
            reader.readAsDataURL(file);
        }
    };
    

    return (
        <div className="form-container"> {/* Use the container for styling */}
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input-field"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <input type="file" onChange={handleFileChange} accept="image/*" className="input-field" required/>
                <textarea
                    className="input-textarea"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <button type="submit" className="submit-button">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePostButton;
