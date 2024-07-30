import React, { useState,useEffect} from 'react'
import { Container, Loader, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                setLoading(false)
            }
        })
    }, [])   

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap justify-center items-center'>
                    {loading?(<Loader/>):(
                    posts.map((post) => (
                        <div key={post.$id} className=' w-full md:p-2 md:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    )

                    )
                )}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
