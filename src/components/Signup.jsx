import React, { useState } from 'react'
import { Button, Logo, Input, Loader } from './index'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";


function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showpass, setShowpass] = useState(false)

    const create = async (data) => {
        setError('')
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    setLoading(false)
                    dispatch(login(userData))
                }
                navigate('/login')
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    const showPassword = (e) => {
        e.preventDefault()
        setShowpass(!showpass)
    }

    const handlegooglelogin = async () => {
        setError(false)
        setLoading(true)
        try {
            await authService.googlelogin();
            setLoading(false)
        } catch (error) {
            setError(true)
            console.log("Error in google login", error)
        }
    }

    const handlegithublogin = async () => {
        setError('')
        setLoading(true)
        try {
            await authService.githublogin();
        } catch (error) {
            console.log("Error in google login", error)
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-full '>
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10`}>
                <div
                    className='flex justify-center mb-2'>
                    {/* <span className='inline-block w-full max-w-[100px]'> */}
                    <Logo width='100%' />
                    {/* </span> */}
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign up to create account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account&nbsp;
                    <Link
                        to='/login'
                        className='font-bold text-blue-700 text-primary transition-all duration-200 hover:underline'
                    >
                        Log In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>
                    {error}
                </p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name"
                            placeholder="Enter Your Name"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <div className='flex items-center relative'>
                            <Input
                                label="Password"
                                type={showpass ? "text" : "password"}
                                placeholder="Enter Your Password"
                                {...register("password", {
                                    required: true,
                                })}
                                className='flex-1'

                            />
                            <button className='text-2xl text-blue-700 absolute right-2 bottom-2' onClick={showPassword}>{showpass ? <IoEye /> : <IoMdEyeOff />}</button>
                        </div>
                        <Button type='submit' className='w-full  hover:bg-blue-800' disabled={loading}>
                            {loading ? <Loader /> : "Create Account"}
                        </Button>
                    </div>
                </form>

                <div className="flex items-center justify-center mt-6">
                    <h1 className="text-lg text-gray-700 border-t font-thin border-gray-300 pt-4 mt-2 w-full text-center">
                        Or Continue With
                    </h1>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-3 mt-4'>
                    <Button className="flex items-center justify-center w-auto px-4 py-2 bg-white text-white font-medium rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-2xl transition-all transition-200 hover:scale-110" onClick={handlegooglelogin}>{<FcGoogle />}</Button>
                    <Button className="flex items-center justify-center w-auto px-4 py-2 bg-gray-800 text-white font-medium rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 text-2xl transition-all transition-200 hover:scale-110" onClick={handlegithublogin}>{<FaGithub />}</Button>
                </div>
            </div>
        </div>
    )
}

export default Signup
