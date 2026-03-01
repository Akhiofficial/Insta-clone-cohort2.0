import React from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import { useEffect } from 'react'
import Nav from '../../shared/components/Nav'
import RightSidebar from '../components/RightSidebar'
import loading from '../../../assets/Loading.gif';

const Feed = () => {

  const { feed, handleGetFeed, feedLoading, handleLikePost, handleUnlikePost, handleSavePost, handleUnsavePost } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (feedLoading || !feed) {
    return <main className='loading-screen'><img src={loading} alt="loading" /></main>
  }

  return (
    <main className='feed-page'>
      <Nav />

      <div className="main-content">
        <div className="feed">
          <div className="posts">
            {feed.map((post) => (
              <Post
                key={post._id}
                post={post}
                user={post.user}
                loading={feedLoading}
                handleLikePost={handleLikePost}
                handleUnlikePost={handleUnlikePost}
                handleSavePost={handleSavePost}
                handleUnsavePost={handleUnsavePost}
              />
            ))}
          </div>
        </div>
      </div>

      <RightSidebar />
    </main>
  )
}

export default Feed