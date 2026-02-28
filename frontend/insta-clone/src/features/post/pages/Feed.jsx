import React from 'react'
import "../style/feed.scss"
import Post from '../components/post'
import { usePost } from '../hook/usePost'
import { useEffect } from 'react'
import Nav from '../../shared/components/Nav' 

const Feed = () => {

  const { feed, handleGetFeed, loading, handleLikePost, handleUnlikePost } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if(loading || !feed ){
    return <main><h1>Feed is loading</h1></main>
  }

  

  return (
    <main className='feed-page'>
      <Nav />
      <div className="feed">
        <div className="posts">
          {feed.map((post) => (
          <Post 
            key={post._id} 
            post={post} 
            user={post.user} 
            loading={loading}
            handleLikePost={handleLikePost}
            handleUnlikePost={handleUnlikePost}
          />
        ))}
          
        </div>
      </div>
    </main>
  )


}

export default Feed