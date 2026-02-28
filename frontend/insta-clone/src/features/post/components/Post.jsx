import React from 'react'


const Post = ({ user, post }) => {


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
                        <p className="location">Dummy location</p>
                    </div>
                </div>
                <div className="menu-icon">
                    <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                </div>
            </div>

            {/* Post Image */}
            <div className="post-image">
                <img src={post.imgUrl} alt="post" />
            </div>

            {/* Post Actions */}
            <div className="post-actions">
                <div className="left-actions">
                    <svg
                        className={post.isLiked ? "liked" : ""}
                        height="24" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path></svg>
                    <svg aria-label="Comment" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                    <svg aria-label="Share Post" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                </div>
                <div className="right-actions">
                    <svg aria-label="Save" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                </div>
            </div>

            {/* Post Details */}
            <div className="post-details">
                <p className="likes">12.4k likes</p>
                <div className="caption">
                    <span className="username">{post.username}</span>
                    <span className="text"> {post.caption}</span>
                </div>
                <p className="view-comments">View all 12 comments</p>
            </div>
        </div>
    )
}

export default Post