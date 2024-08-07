import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'

const ProfilePhoto = ({ src }: { src: string }) => {
    return (
        <div>
            <Avatar className='cursor-pointer'>
                <AvatarImage src={src} alt='profile Photo' />
            </Avatar>
        </div>
    )
}

export default ProfilePhoto
