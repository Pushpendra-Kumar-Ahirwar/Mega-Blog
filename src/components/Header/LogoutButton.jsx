import React, { useState } from 'react'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'


function LogoutButton() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    
    const logoutHandler=()=>{
      setLoading(true)
        authService.logout().then(()=>{
            dispatch(logout())
            navigate('/login')
            setLoading(false)

        })
    }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>
      {loading? "Wait...": "Logout"}
    </button>
  )
}

export default LogoutButton
