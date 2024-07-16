import React, { useState } from 'react'
import { Button, Logo, Input, Loader } from './index'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading,setLoading]=useState(false)

    const login = async (data) => {
        setError('')
        setLoading(true)
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate('/')

            }
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    const handlegooglelogin=async()=>{
        setError('')
        setLoading(true)
        try {
            await authService.googlelogin();
        } catch (error) {
            console.log("Error in google login", error)
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-full mt-8 mb-8 '>
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10`}>
                <div
                    className='flex justify-center mb-2'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Log in to your account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have an account&nbsp;
                    <Link
                        to='/signup'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>
                    {error}
                </p>}
                <form onSubmit={handleSubmit(login)}
                    className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="Enter your email "
                            type="Email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter Your Password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type='submit' className='w-full' disabled={loading}>
                            {loading?<Loader/>:"Sign in"}
                        </Button>
                    </div>
                </form>
                <Button className='bg-white w-full flex justify-center items-center text-3xl mt-3' onClick={handlegooglelogin}>{<FcGoogle />}</Button>
            </div>

        </div>
    )
}

export default Login
