import React from 'react'
import './CategoryBlogPost.css'

const CategoryBlogPost = ({ post }) => {
  const PF = 'http://localhost:8080/images/'

  return (
    <>
      {post.length > 0 &&
        post.map(post => (
          <a key={post._id} className='blogLink' href={`/post/${post._id}`}>
            <div className='container'>
              <img src={PF + post.img} />
              <div className='content'>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <p class='time'>{new Date(post.createdAt).toDateString()}</p>
              </div>
            </div>
          </a>
        ))}
    </>
  )
}

export default CategoryBlogPost
