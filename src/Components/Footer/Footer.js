import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='footerContainer'>
        <div class='firstHalf'>
          <div className='siteMapContainer'>
            <h3>Sitemap</h3>
            <ul>
              <Link to='/'>
                <li className='footerSitemapLinks'>Home</li>
              </Link>
              <Link to='#'>
                <li className='footerSitemapLinks'>Blogs</li>
              </Link>
              <Link to='/update-profile'>
                <li className='footerSitemapLinks'>Profile</li>
              </Link>
            </ul>
          </div>
          <div className='contactUsInfo'>
            <h3>Get in touch</h3>
            <ul>
              <li>
                <i class='fa-solid fa-phone'></i>090 XXX XXXX
              </li>
              <li>
                <i class='fa-solid fa-envelope'></i>dare@gmail.com
              </li>
              <li>
                <i class='fa-solid fa-location-dot'></i>Queens landing Block 78
              </li>
            </ul>
          </div>
        </div>

        <div className='comInfo'>
          <h3>ErrandBoy Inc.</h3>
          <h3>© Copyright 2023</h3>
        </div>
      </div>
    </>
  )
}

export default Footer
