import React, { useEffect } from 'react';
import '../style/rightSidebar.scss';
import { useAuth } from '../../auth/hooks/useAuth';
import { useUser } from '../hooks/useUser';

const RightSidebar = () => {
    const { user } = useAuth();
    const { allUsers, handleFetchAllUsers, handleFollowUser } = useUser();

    useEffect(() => {
        handleFetchAllUsers();
    }, []);

    const trends = ['#Web3UI', '#Glassmorphism', '#GenerativeAI', '#Tokyovibes'];

    return (
        <aside className="right-sidebar">
            <div className="user-profile-summary">
                <div className="user-info">
                    <img src={user?.profileImage || "https://i.pravatar.cc/150?u=joshua"} alt="profile" />
                    <div className="text text-info">
                        <p className="username">{user?.username || "guest"}</p>
                        <p className="full-name">{user?.name || "Guest User"}</p>
                    </div>
                </div>
                <button className="switch-btn">SWITCH</button>
            </div>

            <div className="suggestions">
                <div className="section-header">
                    <span>Suggestions for you</span>
                    <button className="see-all">See All</button>
                </div>
                <div className="suggestion-list">
                    {allUsers && allUsers.length > 0 ? (
                        allUsers.slice(0, 5).map(u => (
                            <div key={u.username} className="suggestion-item">
                                <div className="info">
                                    <img src={u.profileImage} alt={u.username} />
                                    <div className="text">
                                        <p className="username">{u.username}</p>
                                        <p className="detail">{u.name}</p>
                                    </div>
                                </div>
                                <button
                                    className={`follow-btn ${u.isFollowing ? 'following' : ''}`}
                                    onClick={() => {
                                        if (u.isFollowing) {
                                            if (u.followStatus === 'pending') return; // Cannot unfollow if pending (or maybe we can? let's stick to accepted)
                                            handleUnfollowUser(u.username);
                                        } else {
                                            handleFollowUser(u.username);
                                        }
                                    }}
                                    style={{
                                        cursor: (u.isFollowing && u.followStatus === 'pending') ? 'default' : 'pointer',
                                        opacity: (u.isFollowing && u.followStatus === 'pending') ? 0.7 : 1
                                    }}
                                >
                                    {u.isFollowing ? (
                                        u.followStatus === 'pending' ? 'REQUESTED' : 'UNFOLLOW'
                                    ) : 'FOLLOW'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="empty-msg">No other users found</p>
                    )}
                </div>
            </div>

            <div className="trends">
                <p className="section-title">Trending Trends</p>
                <div className="trend-tags">
                    {trends.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </div>

            <footer className="sidebar-footer">
                <nav>
                    <a href="#">About</a>
                    <a href="#">Help</a>
                    <a href="#">Press</a>
                    <a href="#">API</a>
                    <a href="#">Jobs</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </nav>
                <p>© 2025 INSTANEXT BY NEXULABS</p>
            </footer>
        </aside>
    );
};

export default RightSidebar;
