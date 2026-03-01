import React, { useState, useEffect } from 'react';
import Nav from '../../shared/components/Nav';
import '../style/profilePage.scss';
import {
    Users,
    UserPlus,
    UserPlus2,
    ShieldAlert,
    Search,
    ChevronDown,
    Clock,
    CheckCircle2
} from 'lucide-react';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../../auth/hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    const {
        followers,
        following,
        requests,
        allUsers,
        userLoading,
        successMessage,
        handleFetchFollowers,
        handleFetchFollowing,
        handleFetchRequests,
        handleFetchAllUsers,
        handleAcceptRequest,
        handleRejectRequest,
        handleUnfollowUser,
        handleFollowUser,
        error: networkError
    } = useUser();

    const [activeTab, setActiveTab] = useState('Followers');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch initial data based on active tab
    useEffect(() => {
        if (user?.username) {
            if (activeTab === 'Followers') handleFetchFollowers(user.username);
            if (activeTab === 'Following') handleFetchFollowing(user.username);
            if (activeTab === 'Requests') handleFetchRequests();
        }
        // Always fetch suggestions/all users for the sidebar
        handleFetchAllUsers();
    }, [activeTab, user?.username]);

    const networkItems = [
        { name: 'Followers', icon: <Users size={20} />, badge: user?.followersCount || 0 },
        { name: 'Following', icon: <UserPlus2 size={20} />, badge: user?.followingCount || 0 },
        { name: 'Requests', icon: <Clock size={20} />, badge: requests?.length || 0 },
        { name: 'Blocked', icon: <ShieldAlert size={20} /> },
    ];

    const trends = [
        '#Web3UI', '#Glassmorphism', '#GenerativeAI', '#Tokyovibes', '#DesignSystem'
    ];

    const renderList = () => {
        if (userLoading && activeTab !== 'Suggestions') {
            return <div className="loading-state">Loading {activeTab.toLowerCase()}...</div>;
        }

        let list = [];
        if (activeTab === 'Followers') list = followers;
        if (activeTab === 'Following') list = following;
        if (activeTab === 'Requests') list = requests;

        if (!list || list.length === 0) {
            return <div className="empty-state">No {activeTab.toLowerCase()} found.</div>;
        }

        return list
            .filter(u => u.username.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((u) => (
                <div key={u.username} className="user-card">
                    <div className="user-info">
                        <img src={u.profileImage} alt={u.name} className="avatar" />
                        <div className="details">
                            <span className="name">{u.name}</span>
                            <span className="username">@{u.username}</span>
                            {activeTab === 'Followers' && <span className="follows-you">Follows you</span>}
                        </div>
                    </div>
                    <div className="actions">
                        {activeTab === 'Requests' ? (
                            <>
                                <button onClick={() => handleAcceptRequest(u.username)} className="action-btn primary">Accept</button>
                                <button onClick={() => handleRejectRequest(u.username)} className="action-btn">Reject</button>
                            </>
                        ) : activeTab === 'Following' ? (
                            <button onClick={() => handleUnfollowUser(u.username)} className="action-btn">Unfollow</button>
                        ) : (
                            <button
                                onClick={() => u.isFollowing && u.followStatus === 'accepted' ? handleUnfollowUser(u.username) : handleFollowUser(u.username)}
                                className={`action-btn ${u.isFollowing ? 'secondary' : 'primary'}`}
                                disabled={u.isFollowing && u.followStatus === 'pending'}
                            >
                                {u.isFollowing ? (
                                    u.followStatus === 'pending' ? 'Requested' : 'Unfollow'
                                ) : 'Follow back'}
                            </button>
                        )}
                    </div>
                </div>
            ));
    };

    return (
        <div className="profile-page">
            <Nav />

            <aside className="network-panel">
                <h2>Network</h2>
                <ul className="network-links">
                    {networkItems.map((item) => (
                        <li
                            key={item.name}
                            className={`network-item ${activeTab === item.name ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.name)}
                        >
                            <div className="item-content">
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                            {item.badge > 0 && <span className="badge">{item.badge}</span>}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="followers-container">
                <header className="header">
                    <h2>{activeTab}</h2>
                    <div className="sort-by">
                        Sort by: <span>Recent</span> <ChevronDown size={16} />
                    </div>
                </header>

                {successMessage && (
                    <div className="success-banner" style={{
                        backgroundColor: 'rgba(0, 255, 0, 0.1)',
                        color: '#00c853',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: '1px solid rgba(0, 255, 0, 0.2)'
                    }}>
                        <CheckCircle2 size={18} />
                        {successMessage}
                    </div>
                )}

                {networkError && (
                    <div className="error-banner" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
                        {networkError}
                    </div>
                )}

                <div className="search-bar">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab.toLowerCase()}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="followers-list">
                    {renderList()}
                </div>
            </main>

            <aside className="profile-sidebar">
                <div className="section">
                    <h3>Trending Trends</h3>
                    <div className="trends-list">
                        {trends.map(trend => (
                            <span key={trend} className="trend-tag">{trend}</span>
                        ))}
                    </div>
                </div>

                <div className="section">
                    <h3>Suggested for you</h3>
                    <div className="suggestions-list">
                        {allUsers && allUsers.length > 0 ? (
                            allUsers.slice(0, 5).map(u => (
                                <div key={u.username} className="suggestion-card">
                                    <div className="user-info">
                                        <img src={u.profileImage} alt={u.username} className="avatar" />
                                        <span className="username">{u.username}</span>
                                    </div>
                                    <span
                                        className="follow-link"
                                        onClick={() => {
                                            if (u.isFollowing) {
                                                if (u.followStatus === 'accepted') handleUnfollowUser(u.username);
                                            } else {
                                                handleFollowUser(u.username);
                                            }
                                        }}
                                        style={{
                                            cursor: (u.isFollowing && u.followStatus === 'pending') ? 'default' : 'pointer',
                                            color: u.isFollowing ? (u.followStatus === 'pending' ? '#8e8e8e' : '#ff007a') : '#ff007a',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {u.isFollowing ? (
                                            u.followStatus === 'pending' ? 'REQUESTED' : 'UNFOLLOW'
                                        ) : 'FOLLOW'}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="empty-msg">No suggestions available</div>
                        )}
                    </div>
                </div>

                <footer className="footer-links">
                    <div className="links">
                        <span>About</span> • <span>Help</span> • <span>Press</span> • <span>API</span> • <span>Jobs</span> • <span>Privacy</span> • <span>Terms</span>
                    </div>
                    <p className="copyright">© 2026 INSTANEXT BY NEXTLABS</p>
                </footer>
            </aside>
        </div>
    );
};

export default Profile;