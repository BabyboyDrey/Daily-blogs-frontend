import React, { useContext, useEffect, useState } from 'react'
import './SinglePost.css'
import BlogPost from '../../Components/Blog-Posts/BlogPost'
import { useLocation } from 'react-router'
import { Context } from '../../context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'
import CategoryBlogPost from '../../Components/Category-Blog-Posts/Category-BlogPost'
import { tabTitle } from '../../genFunctions'

const SinglePost = () => {
  const location = useLocation()
  const path = location.pathname.split('/')[2]

  const PF = 'http://localhost:8080/images/'
  const { user } = useContext(Context)
  const [postItems, setPostItems] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [comment, setComment] = useState('')
  const [postComments, setPostComments] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [catPosts, setCatPosts] = useState([])
  tabTitle(`${postItems.title} Page`)
  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const res = await axios.get('/post/' + path)
        const postData = res.data
        setPostItems(postData)
        setTitle(postData.title)
        setContent(postData.content)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSinglePost()
  }, [path])

  useEffect(() => {
    if (path) {
      const fetchComments = async () => {
        await axios
          .get(`/post/get-post-comments/${path}`)
          .then(r => {
            setPostComments(r.data)
          })
          .catch(err => toast.error(err))
      }

      fetchComments()
    }
  }, [user, postItems, comment])

  useEffect(() => {
    async function fetchAllPosts () {
      await axios
        .get('/post/allPosts')
        .then(r => {
          const newFiles = r.data
          const newP = newFiles.filter(p => {
            return p.username === postItems.username
          })
          const moreAbtAuthor = newP.filter(p => {
            return p._id !== path
          })

          setAllPosts(moreAbtAuthor)
        })
        .catch(err => {
          toast.error(err)
          console.log(`err:`, err)
        })
    }
    fetchAllPosts()
  }, [path])

  const submitComment = async e => {
    e.preventDefault()

    const newComment = {
      user: user,
      comment: comment,
      blogPostId: path
    }

    await axios
      .post('/post/create-comment', newComment)
      .then(r => {
        toast.success('Comment sent!')
        setComment('')
      })
      .catch(err => toast.error(err))
  }

  useEffect(() => {
    async function fetchRelatedPosts () {
      await axios
        .get('/post/category-linked-books')
        .then(r => {
          setCatPosts(r.data)
        })
        .catch(err => toast.error(err))
    }
    fetchRelatedPosts()
  }, [path])

  return (
    <>
      <div className='PostContainer'>
        <div className='contentContainer'>
          <div className='TitleAuthor'>
            <div className='h1container'>
              <h1>{postItems.title}</h1>
            </div>

            <p>{postItems.username}</p>
          </div>
          <img className='img' src={PF + postItems.img}></img>
          <div className='contentTime'>
            <p>5 MIN READ</p>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: window.document.title,
                      url: window.document.location.href
                    })
                    .then(toast.success('Thanks for sharing'))
                    .catch(console.error)
                }
              }}
            >
              Share
            </button>
            <p>{new Date(postItems.createdAt).toDateString()}</p>
          </div>
          <div className='bodyContainer'>
            <p>{postItems.content}</p>
          </div>
          <div className='commentSection'>
            <textarea
              value={comment}
              onChange={e => {
                setComment(e.target.value)
              }}
              rows='5'
              cols='30'
              placeholder='Comment'
            ></textarea>
            <button type='submit' onClick={submitComment}>
              Submit
            </button>
          </div>
          <div className='commentsSect'>
            <div className='comments'>
              <div className='outer-bg-comments-container'>
                {postComments ? (
                  postComments.length > 0 &&
                  postComments.map((p, index) => (
                    <div className='inner-bg-comments-container' key={index}>
                      <h3>{p.comment}</h3>
                      <span>{p.user.username}</span>
                      <h2 className='h2-c'>
                        <hr />
                      </h2>
                    </div>
                  ))
                ) : (
                  <h2>Be the first to comment</h2>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className='moreAboutAuthor'>
          <h3>More about {postItems.username}</h3>
          <div className='Blogs'>
            {allPosts.length > 0 ? (
              allPosts.map(p => <BlogPost key={p._id} />)
            ) : (
              <div>
                <h2>No posts by {postItems.username}</h2>
              </div>
            )}
          </div>
        </div>
        <div className='categories'>
          <div className='catText'>
            <h3>Categories</h3>
            <hr></hr>
          </div>
          {catPosts.length > 0 ? (
            catPosts.map(p => (
              <div key={p._id} className='category'>
                <h4>{p._id}</h4>
                <CategoryBlogPost post={p.books} />
              </div>
            ))
          ) : (
            <div>
              <h2>No posts yet</h2>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SinglePost
