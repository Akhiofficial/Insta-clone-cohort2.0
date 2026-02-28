import React, { useState, useRef, useEffect } from 'react'
import "../style/createpost.scss";
import { usePost } from '../hook/usePost';

import { useNavigate } from 'react-router';


const CreatePost = () => {


    const [caption, setCaption] = useState("");
    const postImageInputFieldRef = useRef(null);

    const navigate = useNavigate();

    const { loading, handleCreatePost, handleGetFeed } = usePost();


    async function handleSubmit(e) {
        e.preventDefault();

        const file = postImageInputFieldRef.current.files[0];

        await handleCreatePost(file, caption);

        navigate("/");
    }

    useEffect(() => {
        handleGetFeed();
    }, []); 

    if (loading) {
        return <main><h1>Loading...</h1></main>
    }

    return (
        <main className='create-post-page'>
            <div className="form-container">
                <h1>Create Post</h1>
                <form onSubmit={handleSubmit}>
                    <label className="post-image-label" htmlFor="postImage">Select Image</label>
                    <input ref={postImageInputFieldRef} hidden type="file" name="post-image" id="postImage" />
                    <input
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        type="text" placeholder='caption' name="caption" id="caption" />
                    <button className="button primary-button" type='submit'>Create Post</button>
                </form>
            </div>

        </main>
    )
}

export default CreatePost