import React, { useState } from 'react'
import { Button, Logo, Input, Loader } from './index'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc";


function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading ,setLoading]=useState(false)

    const create = async (data) => {
        setError('')
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = authService.getCurrentUser()
                if (userData){ 
                    setLoading(false)
                     dispatch(login(userData))}
                navigate('/')
            }
        } catch (error) {
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }

    const handlegooglelogin=async()=>{
        setError('')
        try {
            authService.googlelogin();
        } catch (error) {
            console.log("Error in google login", error)
        }
    }

    return (
        <div className='flex items-center justify-center w-full '>
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10`}>
                <div
                    className='flex justify-center mb-2'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>
                    Sign up to create account
                </h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account&nbsp;
                    <Link
                        to='/login'
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign In
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
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter Your Password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button type='submit' className='w-full' disabled={loading}>
                            {loading?<Loader/>:"Create Account"}
                        </Button>
                    </div>
                </form>
                    <Button className='bg-white w-full flex justify-center items-center text-3xl mt-3' onClick={handlegooglelogin}>{<FcGoogle />}</Button>
            </div>
        </div>
    )
}

export default Signup
