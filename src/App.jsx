import  React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './store/authSlice'
import authService  from './appwrite/auth'
import {Header,Footer} from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading? (
    <div className='w-full flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
         <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null

}

export default App
