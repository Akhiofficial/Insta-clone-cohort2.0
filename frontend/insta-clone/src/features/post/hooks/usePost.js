import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../store/post.context";
import { createPost } from "../services/post.api";
import { likePost } from "../services/post.api";
import { unlikePost } from "../services/post.api";
import { savePost } from "../services/post.api";
import { unsavePost } from "../services/post.api";

export const usePost = () => {

    const context = useContext(PostContext);

    if (!context) {
        throw new Error("usePost must be used within PostContextProvider");
    }
    const {
        post, setPost,
        feedLoading, setFeedLoading,
        postLoading, setPostLoading,
        feed, setFeed
    } = context;

    const handleGetFeed = async () => {
        setFeedLoading(true);
        try {
            const data = await getFeed();
            setFeed(data.posts);
        } catch (err) {
            console.error("Failed to fetch feed", err);
        } finally {
            setFeedLoading(false);
        }
    }


    const handleCreatePost = async (imageFile, caption) => {
        setPostLoading(true);
        try {
            const data = await createPost(imageFile, caption);
            setFeed([data.post, ...feed]);
        } catch (err) {
            console.error("Failed to create post", err);
        } finally {
            setPostLoading(false);
        }
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
        feedLoading,
        postLoading,
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
