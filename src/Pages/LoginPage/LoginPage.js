import React, { useRef, useContext } from 'react'
import { Context } from '../../context/Context'
import './LoginPage.css'
import axios from 'axios'
import { tabTitle } from '../../genFunctions'

const LoginPage = () => {
  tabTitle(`Login page`)
  const emailRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching } = useContext(Context)

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await axios.post('/auth/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      res.data && window.location.replace('/create-post')
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' })
      console.log(err.response.data)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='allemcompassing'>
          <div className='allContaining'>
            <div className='LoginPageContainer'>
              <h1>Hey, Welcome Back!</h1>
              <input ref={emailRef} type='text' placeholder='Email'></input>
              <input
                ref={passwordRef}
                type='password'
                placeholder='Password'
              ></input>
              <div className='signUpLink'>
                <div>
                  <span>Not a member?</span>
                  <a href='/sign-up'>Sign up here!</a>
                </div>
              </div>
              <button
                style={
                  !isFetching
                    ? { backgroundColor: '#fae5df', color: '#de5429' }
                    : null
                }
                disabled={isFetching}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default LoginPage
