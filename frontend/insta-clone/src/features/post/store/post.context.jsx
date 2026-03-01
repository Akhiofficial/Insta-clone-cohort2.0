import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [post, setPost] = useState(null);
    const [feed, setFeed] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [requests, setRequests] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    // Granular loading states to prevent unmounting loops
    const [feedLoading, setFeedLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false);

    // Global success/error messages for temporary notifications
    const [successMessage, setSuccessMessage] = useState(null);

    return (
        <PostContext.Provider value={{
            post, setPost,
            feed, setFeed,
            followers, setFollowers,
            following, setFollowing,
            requests, setRequests,
            allUsers, setAllUsers,
            feedLoading, setFeedLoading,
            userLoading, setUserLoading,
            postLoading, setPostLoading,
            successMessage, setSuccessMessage
        }}>
            {children}
        </PostContext.Provider>
    )
}
