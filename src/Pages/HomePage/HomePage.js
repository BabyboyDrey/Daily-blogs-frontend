import React, { useState, useEffect } from 'react'
import './HomePage.css'
import Frame1 from '../../Images/Frame4.png'
import BlogPost from '../../Components/Blog-Posts/BlogPost'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CategoryBlogPost from '../../Components/Category-Blog-Posts/Category-BlogPost'
import { tabTitle } from '../../genFunctions'
const HomePage = () => {
  tabTitle(`Home page`)
  const [catPosts, setCatPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])

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
  }, [])

  useEffect(() => {
    async function fetchAllPosts () {
      await axios
        .get('/post/allPosts')
        .then(r => {
          setAllPosts(r.data)
          console.log(`allPosts:`, allPosts)
        })
        .catch(err => {
          toast.error(err)
          console.log(`err:`, err)
        })
    }
    fetchAllPosts()
  }, [])

  return (
    <>
      <div className='homePageBody'>
        <div className='heroSect'>
          <div className='heroText'>
            <h1>Live</h1>
            <h1>Create</h1>
            <h1>Post</h1>
            <h1>Share</h1>
          </div>
          <div className='imgButtonsConatiner'>
            <img src={Frame1} alt='blue checked image' />
            <div className='heroSectButtons'>
              <Link to='/sign-up'>
                <button className='signUpButton'>Sign up</button>
              </Link>
              <Link to='/login'>
                <button className='loginButton'>Login</button>
              </Link>
            </div>
          </div>
        </div>
        <section className='blogsSection'>
          {allPosts.length > 0 ? (
            allPosts.map(p => (
              <div key={p._id} className='BlogPosts'>
                <BlogPost />
              </div>
            ))
          ) : (
            <div>
              <h2>No posts yet</h2>
            </div>
          )}
          <div className='CatBlogPosts'>
            <div className='catHr'>
              <div className='Categories'>
                <h2>Categories</h2>
                <hr></hr>
              </div>
            </div>

            <section className='catSection'>
              {catPosts.length > 0 ? (
                catPosts.map(p => (
                  <div className='CatBlogPost'>
                    <h3>{p._id}</h3>
                    <CategoryBlogPost post={p.books} />
                  </div>
                ))
              ) : (
                <div>
                  <h2>No posts yet</h2>
                </div>
              )}
            </section>
          </div>
        </section>

        <div className='CTA-container'>
          <h2>Experience Life - Share your experience for free</h2>
          <a href='/create-post'>
            <button>Craete Post</button>
          </a>
        </div>
        <div className='form'>
          <form>
            <h3>Reach out to us, we want to hear from you</h3>
            <input type='text' placeholder='Name'></input>
            <input type='text' placeholder='Email'></input>
            <textarea placeholder='Message' rows='3' cols='5'></textarea>
            <button>Send</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default HomePage
