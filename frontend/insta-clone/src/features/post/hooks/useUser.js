import { useContext, useState } from "react";
import { PostContext } from "../store/post.context";
import * as userApi from "../services/user.api";

export function useUser() {
    const {
        followers, setFollowers,
        following, setFollowing,
        requests, setRequests,
        allUsers, setAllUsers,
        userLoading, setUserLoading,
        successMessage, setSuccessMessage
    } = useContext(PostContext);

    const [error, setError] = useState(null);

    const showTemporarySuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    const handleFetchFollowers = async (username) => {
        setUserLoading(true);
        try {
            const data = await userApi.fetchFollowers(username);
            setFollowers(data.followers);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch followers");
        } finally {
            setUserLoading(false);
        }
    };

    const handleFetchFollowing = async (username) => {
        setUserLoading(true);
        try {
            const data = await userApi.fetchFollowing(username);
            setFollowing(data.following);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch following");
        } finally {
            setUserLoading(false);
        }
    };

    const handleFetchRequests = async () => {
        setUserLoading(true);
        try {
            const data = await userApi.fetchPendingRequests();
            setRequests(data.requests);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch requests");
        } finally {
            setUserLoading(false);
        }
    };

    const handleFetchAllUsers = async () => {
        setUserLoading(true);
        try {
            const data = await userApi.fetchAllUsers();
            setAllUsers(data.users);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch users");
        } finally {
            setUserLoading(false);
        }
    };

    const handleFollowUser = async (username) => {
        try {
            const response = await userApi.followUser(username);
            showTemporarySuccess(response.message || `You are now following ${username}`);
            // Refetch to get updated status
            handleFetchAllUsers();
        } catch (err) {
            if (err.response?.status === 409) {
                // If already following, just refresh the list to sync UI
                handleFetchAllUsers();
            } else {
                setError(err.response?.data?.message || "Failed to follow user");
            }
        }
    };

    const handleUnfollowUser = async (username) => {
        try {
            const response = await userApi.unfollowUser(username);
            showTemporarySuccess(response.message || `You unfollowed ${username}`);
            setFollowing(prev => prev.filter(u => u.username !== username));
            handleFetchAllUsers();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to unfollow user");
        }
    };

    const handleAcceptRequest = async (username) => {
        try {
            const response = await userApi.acceptFollowRequest(username);
            showTemporarySuccess(response.message || "Request accepted");
            setRequests(prev => prev.filter(u => u.username !== username));
            handleFetchAllUsers();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to accept request");
        }
    };

    const handleRejectRequest = async (username) => {
        try {
            const response = await userApi.rejectFollowRequest(username);
            showTemporarySuccess(response.message || "Request rejected");
            setRequests(prev => prev.filter(u => u.username !== username));
            handleFetchAllUsers();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reject request");
        }
    };

    return {
        followers,
        following,
        requests,
        allUsers,
        userLoading,
        successMessage,
        error,
        handleFetchFollowers,
        handleFetchFollowing,
        handleFetchRequests,
        handleFetchAllUsers,
        handleFollowUser,
        handleUnfollowUser,
        handleAcceptRequest,
        handleRejectRequest
    };
}
