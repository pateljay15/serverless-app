import React, { useEffect, useState } from 'react';
import './Profile.css'; // Ensure this CSS file includes appropriate styles
import { fetchProfile, getAuthenticationToken, updateProfile } from '../../lambda-calls/LambdaCalls';

type ProfileType = {
  name: string;
  email: string;
  status: string;
  bio: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileType>({ 
    name: '', 
    email: '', 
    status: '', 
    bio: '' 
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const auth = getAuthenticationToken()

  useEffect(() => {
        fetchProfile(auth.id.toString())
        .then(data => {
            console.log(data);
            setProfile({
                ...profile,
                name: data?.name,
                email: data?.email,
                status: data?.status,
                bio: data?.bio
            });
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleProfileUpdate = () => {
    let requestData = {
        collectionName: "profile",
        documentId: auth.id.toString(),
        newKeyValue: profile
    }
    updateProfile(requestData)
    .then(data => {
        console.log(data)
        handleCloseEditDialog();
    })
    .catch(err => console.log(err))

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {profile.name || "Please update your name."}</p>
      <p><strong>Email:</strong> {profile.email || "Please add your email address."}</p>
      <p><strong>Status:</strong> {profile.status || "Please set your current status."}</p>
      <p><strong>Bio:</strong> {profile.bio || "Please share something about yourself in your bio."}</p>
      <button onClick={handleOpenEditDialog}>Edit Profile</button>

      {editDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <span className="close-button" onClick={handleCloseEditDialog}>&times;</span>
            <h2>Edit Your Profile</h2>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} />

            <label htmlFor="status">Status</label>
            <input type="text" id="status" name="status" value={profile.status} onChange={handleChange} />

            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} rows={3} />

            <button onClick={handleProfileUpdate}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
