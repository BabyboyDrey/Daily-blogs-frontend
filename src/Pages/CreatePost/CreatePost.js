import React, { useContext } from 'react'
import './CreatePost.css'
import axios from 'axios'
import { useState } from 'react'
import { Context } from '../../context/Context'
import { toast } from 'react-toastify'
import { tabTitle } from '../../genFunctions'
import { server } from '../../server'

const CreatePost = () => {
  tabTitle('Create Post')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)

  const { user } = useContext(Context)

  const handleSubmit = async e => {
    e.preventDefault()

    const newForm = new FormData()
    newForm.append('file', image)
    newForm.append('username', user.username)
    newForm.append('title', title)
    newForm.append('content', content)
    newForm.append('category', category)

    try {
      await axios
        .post(`${server}/post/createPost`, newForm)
        .then(r => toast.success('Post created'))
        .catch(err => toast.error(err))
    } catch (err) {
      toast.error(err)
      console.log('err in handleSubmit:', err)
    }
  }

  return (
    <>
      <div className='containerCP'>
        <div className={image ? 'h1container' : 'h1containerImage'}>
          <h1>Create Post</h1>
        </div>
        {image && (
          <div className='IMGCP'>
            <img src={URL.createObjectURL(image)} />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='containerForm'
          encType='multipart/form-data'
        >
          <input
            onChange={e => {
              setImage(e.target.files[0])
            }}
            type='file'
            placeholder='Select File'
          ></input>
          <input
            onChange={e => {
              setTitle(e.target.value)
              console.log(title)
            }}
            type='text'
            value={title}
            placeholder='Title'
          ></input>
          <textarea
            onChange={e => {
              setContent(e.target.value)
              console.log(content)
            }}
            value={content}
            placeholder='Content'
            rows='10'
            cols='30'
          ></textarea>
          <input
            onChange={e => {
              setCategory(e.target.value)
            }}
            value={category}
            type='text'
            placeholder='Category'
          ></input>
          <button type='submit'>Publish</button>
        </form>
      </div>
    </>
  )
}

export default CreatePost
