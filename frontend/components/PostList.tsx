import { VFC } from 'react'
import { useQueryPosts } from '../hooks/useQueryPosts'
import { PostItem } from './PostItem'

interface Props {
  shopId: string
}
export const PostList: VFC<Props> = ({ shopId }) => {
  const { data } = useQueryPosts(shopId)

  return (
    <>
      <ul>
        {data?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </>
  )
}
