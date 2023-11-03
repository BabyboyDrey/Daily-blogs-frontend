import Header from './Components/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import Footer from './Components/Footer/Footer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom'
import SinglePost from './Pages/SinglePost/SinglePost'
import LoginPage from './Pages/LoginPage/LoginPage'
import SignUpPage from './Pages/SignUpPage/SignUpPage'
import CreatePost from './Pages/CreatePost/CreatePost'
import UserSettings from './Pages/userSettings/userSettings'
import { Context } from './context/Context'
import { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App () {
  const { user } = useContext(Context)
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position='bottom-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/post/:id' element={<SinglePost />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/sign-up' element={<SignUpPage />}></Route>
          <Route
            path={'/create-post'}
            element={user ? <CreatePost /> : <SignUpPage />}
          ></Route>
          <Route
            path={'/update-profile'}
            element={user ? <UserSettings /> : <SignUpPage />}
          ></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
