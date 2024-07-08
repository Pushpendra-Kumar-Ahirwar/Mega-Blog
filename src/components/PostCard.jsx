import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
    $id,
    featuredImage,
    title,
}) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full rounded-xl p-4 bg-gray-100'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-lg' />
                </div>
                <h2 className='text-lg font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
