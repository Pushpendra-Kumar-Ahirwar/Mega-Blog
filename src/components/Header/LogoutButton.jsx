import React from 'react'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function LogoutButton() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
            navigate('/login')

        })
    }

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default LogoutButton
