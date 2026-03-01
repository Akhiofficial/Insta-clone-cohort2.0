import React from 'react'
import "../style/post.scss"
import { MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from 'lucide-react'

const Post = ({ user, post, loading, handleLikePost, handleUnlikePost, handleSavePost, handleUnsavePost }) => {

    const isSaved = post.isSaved;

    return (
        <div className="post">
            {/* Post Header */}
            <div className="post-header">
                <div className="user-info">
                    <div className="img-wrapper">
                        <img src={user.profileImage} alt="user" />
                    </div>
                    <div className="text-info">
                        <p className="username">{user.username}</p>
                        <p className="location">Tokyo, Shinjuku District</p>
                    </div>
                </div>
                <div className="menu-icon">
                    <MoreHorizontal size={20} />
                </div>
            </div>

            {/* Post Image */}
            <div className="post-image">
                <img src={post.imgUrl} alt="post" />
            </div>

            {/* Post Actions */}
            <div className="post-actions">
                <div className="left-actions">
                    <Heart
                        size={24}
                        onClick={() => { post.isLiked ? handleUnlikePost(post._id) : handleLikePost(post._id) }}
                        className={post.isLiked ? "liked" : ""}
                        fill={post.isLiked ? "currentColor" : "none"}
                    />
                    <MessageCircle size={24} />
                    <Send size={24} />
                </div>
                <div className="right-actions">
                    <Bookmark
                        size={24}
                        onClick={() => { isSaved ? handleUnsavePost(post._id) : handleSavePost(post._id) }}
                        className={isSaved ? "saved" : ""}
                        fill={isSaved ? "currentColor" : "none"}
                    />
                </div>
            </div>

            {/* Post Details */}
            <div className="post-details">
                <p className="likes">12.4k likes</p>
                <div className="caption">
                    <span className="username">{user.username}</span>
                    <span className="text"> {post.caption}</span>
                    <div className="hashtags">
                        <span className="hashtag">#Web3UI</span> <span className="hashtag">#Glassmorphism</span> <span className="hashtag">#Design</span>
                    </div>
                </div>
                <p className="view-comments">View all 112 comments</p>
                <p className="time">2 HOURS AGO</p>
            </div>
        </div>
    )
}

export default Post
