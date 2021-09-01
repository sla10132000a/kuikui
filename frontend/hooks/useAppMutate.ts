import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'

import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import {
  CREATE_POST,
  CREATE_LIKE,
  DELETE_LIKE,
} from '../queries/queries'
import { Post, CreatePost, CreateLike, DeleteLike } from '../types/types'
const cookie = new Cookie()
// const endpoint = process.env.NEXT_PUBLIC_URL
const endpoint = "/graphql"

let graphQLClient: GraphQLClient

export const useAppMutate = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        "access-token": `${cookie.get('access-token')}`,
        "client": `${cookie.get('client')}`,
        "uid": `${cookie.get('uid')}`,
        "expiry": `${cookie.get('expiry')}`,
      },
    })
  }, [cookie.get('access-token'), cookie.get('client'), cookie.get('uid'), cookie.get('expiry')])
  

  const createPostMutation = useMutation(
    (post: CreatePost) => graphQLClient.request(CREATE_POST, { userId:post.userId, shopId:post.shopId, title: post.title, description:post.description }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('posts');
      },
      onError: () => {
      },
    }
  )

  const createLikeMutation = useMutation(
    (like: CreateLike) => graphQLClient.request(CREATE_LIKE, { userId:like.userId, postId:like.postId}),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('posts');
      },
      onError: () => {
      },
    }
  )

  const deleteLikeMutation = useMutation(
    (like: DeleteLike) => graphQLClient.request(DELETE_LIKE, { userId:like.userId, postId:like.postId}),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('posts');
      },
      onError: () => {
      },
    }
  )
 
  return {
    createPostMutation,
    createLikeMutation,
    deleteLikeMutation,
  }
}
