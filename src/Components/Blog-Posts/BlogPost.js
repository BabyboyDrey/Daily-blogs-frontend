import React, { useState, useEffect } from 'react'
import './BlogPost.css'
import axios from 'axios'
import { server } from '../../server'

const BlogPost = () => {
  const [postItems, setPostItems] = useState([])

  const PF = `https://daily-blogs-backend.onrender.com/images/`

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${server}/post/allPosts`)

        setPostItems(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [])

  return (
    <>
      {postItems.map(post => (
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

export default BlogPost
