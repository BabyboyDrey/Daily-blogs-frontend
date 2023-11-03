import React, { useState } from 'react'
import './SignUpPage.css'
import axios from 'axios'
import { tabTitle } from '../../genFunctions'

const SignUpPage = () => {
  tabTitle(`Sign up page`)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError(false)

    try {
      const res = await axios.post('/auth/sign-up', {
        username,
        email,
        password
      })
      console.log(res)
      res.data && window.location.replace('/login') // window.history.replaceState(null, '', document.referrer)
    } catch (err) {
      setError(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='allemcompassing'>
          <div className='allContaining'>
            <div className='signUpPageContainer'>
              <h1>Hi, Sign up here</h1>
              <input
                onChange={e => {
                  setUsername(e.target.value)
                  console.log(username)
                }}
                type='text'
                placeholder='Username'
                value={username}
              ></input>
              <input
                onChange={e => {
                  setEmail(e.target.value)
                }}
                value={email}
                type='text'
                placeholder='Email'
              ></input>
              <input
                onChange={e => {
                  setPassword(e.target.value)
                }}
                value={password}
                type='text'
                placeholder='Password'
              ></input>
              <div className='loginLink'>
                <div>
                  <span>Already a member?</span>
                  <a href='/login'>Login here!</a>
                </div>
              </div>
              <button>Sign Up</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default SignUpPage
