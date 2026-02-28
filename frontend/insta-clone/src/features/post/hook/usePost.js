import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";
import { createPost } from "../services/post.api";
import { likePost } from "../services/post.api";
import { unlikePost } from "../services/post.api";
import { savePost } from "../services/post.api";
import { unsavePost } from "../services/post.api";

export const usePost = () => {

    const context = useContext(PostContext);

    if(!context){
        throw new Error("usePost must be used within PostContextProvider");
    }
    const { post, setPost, loading, setLoading, feed, setFeed } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        const data = await getFeed();
        setFeed(data.posts);
        setLoading(false);
    }


    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true);
        const data = await createPost(imageFile, caption);
        setFeed([data.post, ...feed]);
        setLoading(false);
    }


    const handleLikePost = async (postId) => {
        const data = await likePost(postId);
        setFeed(data.posts);
        await handleGetFeed();
    }

    const handleUnlikePost = async (postId) => {
        const data = await unlikePost(postId);
        setFeed(data.posts);
        await handleGetFeed();
    }


    const handleSavePost = async (postId) => {
        const data = await savePost(postId);
        setFeed(data.posts);
        await handleGetFeed();
    }

    const handleUnsavePost = async (postId) => {
        const data = await unsavePost(postId);
        setFeed(data.posts);
        await handleGetFeed();
    }


    return {
        loading,
        feed,
        post,
        handleGetFeed,
        handleCreatePost,
        handleLikePost,
        handleUnlikePost,
        handleSavePost,
        handleUnsavePost
    }
}
