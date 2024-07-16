import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'


function Home() {
const [posts, setPosts] = useState([])
const authStatus=useSelector((state)=>state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {   
        return (
            <div className='py-8 mt-4 text-center p-3'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>Login to read Post</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return( authStatus?(
        <div className='w-full py-8 '>
            <Container>
                <div className='flex flex-wrap gap-4'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='py-2 w-1/4'>
                            <PostCard  {...post} className/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    ):null
)
}

export default Home
