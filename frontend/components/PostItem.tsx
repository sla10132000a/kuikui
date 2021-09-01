import { VFC } from 'react'
import { useAppMutate } from '../hooks/useAppMutate'
import { Post } from '../types/types'
import { useRef } from 'react'

interface Props {
  post: Post
}

export const PostItem: VFC<Props> = ({ post　}) => {
  const { createLikeMutation, deleteLikeMutation } = useAppMutate()
  const inputPostIdRef = useRef<HTMLInputElement>(null)
  const postIdValue = inputPostIdRef.current?.value

  const inputShopIdIdRef = useRef<HTMLInputElement>(null)
  const shopIdValue = inputShopIdIdRef.current?.value

  const inputUserIdRef = useRef<HTMLInputElement>(null)
  const userIdValue = inputUserIdRef.current?.value

  const clickLikeHandler = (e) => {
    e.preventDefault()

    createLikeMutation.mutate({
      userId: Number(userIdValue),
      postId: Number(postIdValue),
    })
  }

  const clickDeleteLikeHandler = (e) => {
    e.preventDefault()
    deleteLikeMutation.mutate({
      userId: Number(userIdValue),
      postId: Number(postIdValue),
    })
  }

  return (
    <li key={post.id} className="my-4 border-black border-2 bg-yellow-100">
      <h4>
        <strong className="border-b-2 border-dotted font-bold text-2xl">
          {post.title}
        </strong>
      </h4>
      <div className="mt-1">{post.description}</div>
      <input
        type="hidden"
        name="postId"
        value={post.id}
        ref={inputPostIdRef}
      ></input>
      <input
        type="hidden"
        name="shopId"
        value={post.shopId}
        ref={inputShopIdIdRef}
      ></input>
      <input type="hidden" name="userId" value={1} ref={inputUserIdRef}></input>

      {post.likes[0]?.userId !== 1 ? (
        <button className="mt-2 mr-2" onClick={clickLikeHandler}>いいね</button>
      ) : (
        <button className="mt-2 mr-2" onClick={clickDeleteLikeHandler}>いいね取り消し</button>
      )}
    </li>
  )
}