import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

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


    return {
        loading,
        feed,
        post,
        handleGetFeed
    }
}
