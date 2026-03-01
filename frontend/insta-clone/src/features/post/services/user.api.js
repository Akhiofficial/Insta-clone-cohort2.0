import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export async function fetchFollowers(username) {
    const response = await api.get(`/api/users/followers/${username}`);
    return response.data;
}

export async function fetchFollowing(username) {
    const response = await api.get(`/api/users/following/${username}`);
    return response.data;
}

export async function fetchPendingRequests() {
    const response = await api.get("/api/users/requests");
    return response.data;
}

export async function followUser(username) {
    const response = await api.post(`/api/users/follow/${username}`);
    return response.data;
}

export async function unfollowUser(username) {
    const response = await api.post(`/api/users/unfollow/${username}`);
    return response.data;
}

export async function acceptFollowRequest(username) {
    const response = await api.post(`/api/users/accept/${username}`);
    return response.data;
}

export async function rejectFollowRequest(username) {
    const response = await api.post(`/api/users/reject/${username}`);
    return response.data;
}
export async function fetchAllUsers() {
    const response = await api.get("/api/users/all");
    return response.data;
}
