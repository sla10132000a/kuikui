import { rawRequest } from 'graphql-request'
import { useQuery } from 'react-query'
import { Post } from '../types/types'
import { GET_POSTS } from '../queries/queries'
import { useState } from 'react'
import Cookie from 'universal-cookie'

interface PostRes {
  post: Post[]
}

export const useQueryPosts = (shopId: String) => {
  const initialResponse: Post[] = null
  const [data, setData] = useState(initialResponse)
  const cookie = new Cookie()

  console.log("shopId:", shopId)
  if (!shopId) return {};

  const fetchPosts = async () => {
    const { data, extensions, headers, status } = await rawRequest<PostRes>(
      '/graphql',
      GET_POSTS,
      { shopId: shopId },
      { "access-token": cookie.get('access-token'), "client": cookie.get('client'), "uid": cookie.get('uid'), "expiry": cookie.get('expiry'), "Authorization": `Bearer ${cookie.get('access-token')}` }
    )

    if (headers.get['access-token']) {
      cookie.set('access-token', headers.get['access-token'], {
        path: '/',
        encode: (value: string) => {
          return value
        },
      })
      cookie.set('client', headers.get['client'], {
        path: '/',
        encode: (value: string) => {
          return value
        },
      })
      cookie.set('uid', headers.get['uid'], {
        path: '/',
        encode: (value: string) => {
          return value
        },
      })

      cookie.set('expiry', headers.get['expiry'], {
        path: '/',
        encode: (value: string) => {
          return value
        },
      })
    }

    setData(data.post)
    return data.post
  }

  useQuery<Post[], Error>({
    queryKey: 'posts',
    queryFn: fetchPosts,
    staleTime: 10,
    refetchOnWindowFocus: false,
  })

  return {
    data,
  }
}