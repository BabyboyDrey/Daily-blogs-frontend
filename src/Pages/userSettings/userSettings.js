import React, { useState, useContext } from 'react'
import './userSettings.css'
import axios from 'axios'
import { Context } from '../../context/Context'
import { tabTitle } from '../../genFunctions'
import { server } from '../../server'

const UserSettings = () => {
  tabTitle('User setting')
  const [image, setImage] = useState(null)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState(false)

  const { user, dispatch } = useContext(Context)

  console.log(user)
  const PF = `https://daily-blogs-backend.onrender.com/images/`

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'UPDATE_START' })
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    }

    if (image) {
      const data = new FormData()
      const imageName = Date.now() + image.name

      data.append('name', imageName)
      data.append('file', imageName)
      updatedUser.profilePic = imageName
      try {
        await axios.post(`${server}/upload`, data)
      } catch (err) {
        console.log(err)
      }
    }

    try {
      const res = await axios.put(`${server}/user/` + user._id, updatedUser)
      setSuccess(true)
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data })
    } catch (err) {
      console.log(err.response.data)
      dispatch({ type: 'UPDATE_FAILURE' })
    }
  }

  return (
    <>
      <div className='containerUS'>
        <div className='h1container'>
          {success ? (
            <h1 style={{ color: 'green' }}>Profile Updated!</h1>
          ) : (
            <h1>Update Profile</h1>
          )}
        </div>
        <div className='IMGcontainer'>
          <img
            src={image ? URL.createObjectURL(image) : PF + user?.profilePic}
          />
        </div>
        <form onSubmit={handleSubmit} className='containerForm'>
          <input
            onChange={e => {
              setImage(e.target.files[0])
            }}
            type='file'
            placeholder='Select File'
          ></input>
          <input
            type='text'
            onChange={e => {
              setUsername(e.target.value)
            }}
            value={username}
            placeholder='Username'
          ></input>
          <input
            type='text'
            onChange={e => {
              setEmail(e.target.value)
            }}
            value={email}
            placeholder='Email'
          ></input>

          <input
            type='text'
            onChange={e => {
              setPassword(e.target.value)
            }}
            value={password}
            placeholder='Password'
          ></input>
          <input
            type='text'
            onChange={e => {
              setConfirmPassword(e.target.value)
            }}
            value={confirmPassword}
            placeholder='Confirm Password'
          ></input>
          <button>Update</button>
        </form>
      </div>
    </>
  )
}

export default UserSettings
