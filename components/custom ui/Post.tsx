'use client'
import React from 'react'
import ProfilePhoto from '../shared/ProfilePhoto'
import { useUser } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { Badge } from '../ui/badge'
import { IPostDocument } from '@/models/post.model'
import PostContent from './PostContent'
import SocialOption from './SocialOption'
import ReactTimeago from 'react-timeago'
import { deletePostAction } from '@/lib/serveractions'

const Post = ({ post }: { post: IPostDocument }) => {

  const { user } = useUser()
  const fullName = post?.user?.firstName + " " + post?.user?.lastName;
  const loggedInUser = user?.id === post?.user?.userId;

  return (
    <div className=' bg-white my-2 mx2 md:mx-0 rounded-lg border border-gray-300'>
      <div className='flex items-center justify-between'>
        <ProfilePhoto src={post?.user?.profilePhoto!} />
        <div className='flex items-center justify-between w-full'>
          <div>
            <h1>
              {
                fullName
              }
            </h1>
            <Badge variant={'secondary'} className='ml-2'>
              You
            </Badge>
            <p className='text-xs text-gray-500'>
              @
              {
                user ? user?.username : 'username'
              }
            </p>
            <p className='text-xs text-gray-500'>
              <ReactTimeago date={new Date(post.createdAt)} />
            </p>
          </div>
        </div>
        <div>
          {
            loggedInUser && (
              <Button onClick={() => {
                const res = deletePostAction(post._id.toString())
              }}
                size={'icon'}
                className='rounded-full'
                variant={'outline'}
              >
                <Trash2 />
              </Button>
            )
          }
        </div>
      </div>
      <PostContent post={post} />
      <SocialOption post={post} />
    </div>
  )
}

export default Post
