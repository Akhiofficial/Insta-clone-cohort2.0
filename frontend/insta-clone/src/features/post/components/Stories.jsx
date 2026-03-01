import React from 'react';
import '../style/stories.scss';

const Stories = () => {
    const stories = [
        { id: 1, username: 'alex_design', img: 'https://i.pravatar.cc/150?u=alex', isCurrent: true },
        { id: 2, username: 'sophie_ai', img: 'https://i.pravatar.cc/150?u=sophie' },
        { id: 3, username: 'tech_vitals', img: 'https://i.pravatar.cc/150?u=tech' },
        { id: 4, username: 'wanderer', img: 'https://i.pravatar.cc/150?u=wander' },
        { id: 5, username: 'mark_z', img: 'https://i.pravatar.cc/150?u=mark' },
    ];

    return (
        <div className="stories-container">
            <div className="story your-story">
                <div className="img-wrapper current-user">
                    <img src="https://i.pravatar.cc/150?u=me" alt="Your story" />
                    <div className="add-icon">+</div>
                </div>
                <span className="username">Your Story</span>
            </div>
            {stories.map(story => (
                <div key={story.id} className="story">
                    <div className="img-wrapper">
                        <img src={story.img} alt={story.username} />
                    </div>
                    <span className="username">{story.username}</span>
                </div>
            ))}
        </div>
    );
};

export default Stories;
