import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import authService from '../appwrite/auth'



function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        
        console.log(authService.getCurrentUser());
        appwriteService.getPosts().then((posts) => {
            if (posts) {
               
                setPosts(posts.documents)
            }
        })
    }, [])
   

    if (posts.length === 0) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-gray-200 to-gray-600 text-gray-800'>
                <Container className='p-4'>
                    <div className='flex flex-wrap justify-center'>
                        <div className='w-full text-center mb-8'>
                            <h1 className='text-4xl font-bold mb-4'>Welcome to Mega Blog</h1>
                            <p className='text-xl'>Your one-stop destination for the latest and greatest blog posts.</p>
                        </div>
                        <div className='p-4 w-full md:w-1/2 lg:w-1/3 bg-gray-400 rounded-lg shadow-md text-gray-800'>
                            <h2 className='text-2xl font-bold mb-4 hover:text-gray-500 transition duration-300'>Login to Read Posts</h2>
                            <p className='mb-4'>Sign in to access a wide variety of posts from different authors.</p>
                            <Link to={'/login'}>
                                <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-2'>
                                    <span>Login</span>
                                    <FaArrowRightLong />
                                </button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (authStatus ? (
        <div className='w-full py-8 '>
            <Container>
                <div className='flex flex-wrap '>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-full md:p-3 md:w-1/4'>
                            <PostCard  {...post} className />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ) : null
    )
}

export default Home
