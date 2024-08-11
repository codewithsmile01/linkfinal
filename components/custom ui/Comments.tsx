import React from 'react'
import { IPostDocument } from '@/models/post.model'
import Comment from './Comment'
import { comment } from 'postcss'

const Comments = ({ post }: { post: IPostDocument }) => {
    return (
        <div>
            {
                post?.comments?.map((comment: any) => {
                    return (
                        <Comment
                            key={comment._id}
                            comment={comment}
                        />
                    )
                })
            }
        </div>
    )
}

export default Comments
