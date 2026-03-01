import React from 'react';
import '../style/rightSidebar.scss';

const RightSidebar = () => {
    const suggestions = [
        { id: 1, username: 'creative_soul', img: 'https://i.pravatar.cc/150?u=creative', detail: 'Followed by alex_design + 4 others' },
        { id: 2, username: 'pixel_perfect', img: 'https://i.pravatar.cc/150?u=pixel', detail: 'New to InstaNext' },
        { id: 3, username: 'motion_guru', img: 'https://i.pravatar.cc/150?u=motion', detail: 'Followed by sophie_ai' },
    ];

    const trends = ['#Web3UI', '#Glassmorphism', '#GenerativeAI', '#Tokyovibes'];

    return (
        <aside className="right-sidebar">
            <div className="user-profile-summary">
                <div className="user-info">
                    <img src="https://i.pravatar.cc/150?u=joshua" alt="profile" />
                    <div className="text text-info">
                        <p className="username">joshua_next</p>
                        <p className="full-name">Joshua Miller</p>
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
                    {suggestions.map(s => (
                        <div key={s.id} className="suggestion-item">
                            <div className="info">
                                <img src={s.img} alt={s.username} />
                                <div className="text">
                                    <p className="username">{s.username}</p>
                                    <p className="detail">{s.detail}</p>
                                </div>
                            </div>
                            <button className="follow-btn">FOLLOW</button>
                        </div>
                    ))}
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
