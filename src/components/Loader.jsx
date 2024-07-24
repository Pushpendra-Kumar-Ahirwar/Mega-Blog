import React from 'react'
import LoadingIcons from 'react-loading-icons'

function Loader() {
    return (
        <div className='flex justify-center items-center'>
            <LoadingIcons.ThreeDots className='p-[8px]' />
        </div>
    )
}

export default Loader
