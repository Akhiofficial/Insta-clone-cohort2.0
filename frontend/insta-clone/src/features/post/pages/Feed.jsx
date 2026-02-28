import React from 'react'
import "../style/feed.scss"
import Post from '../components/post'
import { usePost } from '../hook/usePost'
import { useEffect } from 'react'
 

const Feed = () => {

  const { feed, handleGetFeed, loading} = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if(loading || !feed ){
    return <main><h1>Feed is loading</h1></main>
  }

  

  return (
    <main className='feed-page'>
      <div className="feed">
        <div className="posts">
          {feed.map((post) => (
          <Post 
            key={post._id} 
            post={post} 
            user={post.user} 
          />
        ))}
          
        </div>
      </div>
    </main>
  )


}

export default Feed