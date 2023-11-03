import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [navActive, setNavActive] = useState(false)
  const [closing, setClosing] = useState(false)

  const toggleNav = () => {
    if (!navActive) {
      setNavActive(true)
      console.log(`1 navActive: ${navActive}`)
      setClosing(true)
    } else {
      setClosing(true)
      setTimeout(() => {
        setNavActive(false)
        console.log(`2 navActive: ${navActive}`)
        setClosing(false)
      }, 600)
    }
  }

  useEffect(() => {
    if (navActive) {
      document.body.style.position = 'fixed'
    } else {
      document.body.style.position = 'static'
    }
  }, [navActive])

  return (
    <nav>
      <a className='logoLink' href='/'>
        <div className='logo'>
          <span className='brandDaily'>daily</span>
          <span className='brandBlogs'>Blogs</span>
        </div>
      </a>

      {navActive && (
        <ul
          className={`nav-links ${navActive ? 'nav-active' : ''} ${
            closing ? 'nav-closing' : ''
          }`}
        >
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='#'>Blog</a>
          </li>
          <li>
            <a href='/update-profile'>Profile</a>
          </li>
        </ul>
      )}
      <div
        className={`burger ${navActive ? 'active' : ''}`}
        onClick={toggleNav}
      >
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
      </div>
    </nav>
  )
}

export default Header
