import React, { useState, useRef, useEffect } from 'react'
import "../style/createpost.scss";
import { usePost } from '../hooks/usePost';
import loadingGif from "../../../assets/Loading.gif";
import { useNavigate } from 'react-router';
import { Image as ImageIcon, Plus, X, Upload } from 'lucide-react';

const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const [preview, setPreview] = useState(null);
    const postImageInputFieldRef = useRef(null);
    const navigate = useNavigate();

    const { postLoading, feedLoading, handleCreatePost, handleGetFeed } = usePost();

    useEffect(() => {
        handleGetFeed();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        setPreview(null);
        if (postImageInputFieldRef.current) {
            postImageInputFieldRef.current.value = "";
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const file = postImageInputFieldRef.current.files[0];

        if (!file) {
            alert("Please select an image first");
            return;
        }

        await handleCreatePost(file, caption);
        navigate("/");
    }

    if (postLoading || feedLoading) {
        return (
            <div className="loading-container">
                <img src={loadingGif} alt="loading..." />
            </div>
        );
    }

    return (
        <main className='create-post-page'>
            <div className="form-container">
                <h1>Create Post</h1>

                <form onSubmit={handleSubmit}>
                    <div
                        className="upload-zone"
                        onClick={() => postImageInputFieldRef.current.click()}
                    >
                        {preview ? (
                            <>
                                <img src={preview} alt="Preview" className="preview-image" />
                                <button type="button" className="remove-image" onClick={handleRemoveImage}>
                                    <X size={18} />
                                </button>
                            </>
                        ) : (
                            <div className="upload-placeholder">
                                <Upload size={48} strokeWidth={1.5} />
                                <span>Click to upload post image</span>
                                <small style={{ color: 'rgba(255,255,255,0.2)' }}>Supports JPG, PNG, WEBP</small>
                            </div>
                        )}
                    </div>

                    <input
                        ref={postImageInputFieldRef}
                        hidden
                        type="file"
                        name="post-image"
                        id="postImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <div className="input-group">
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder='Write a caption catching attention...'
                            name="caption"
                            id="caption"
                        />
                    </div>

                    <button className="primary-button" type='submit' disabled={postLoading || !preview}>
                        {postLoading ? "Uploading..." : "Share Post"}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost