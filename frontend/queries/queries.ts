import { gql } from 'graphql-request'

export const GET_POSTS = gql`
query GetPost($shopId: String!) {
  post(shopId: $shopId) {
    id
    title
    description
    shopId
    likes {
      userId
    }
  }
}
`
export const CREATE_POST = gql`
mutation createPost($userId: Int!, $shopId: String!, $title: String!, $description: String!){
  createPost(
    input:{
      userId: $userId
      shopId:$shopId
      title: $title
      description:$description
    }
  ){
    post {
      userId
      title
    }
  }
}
`

export const CREATE_LIKE = gql`
mutation CreateLike($userId: Int!, $postId: Int!){
  createLike(
    input:{
      userId: $userId
      postId: $postId
    }
  ) {
    result
  } 
}
`

export const DELETE_LIKE = gql`
mutation DeleteLike($postId: ID!, $userId: ID!) {
  deleteLike(input: {postId: $postId, userId: $userId}) {
     result
  }
}
`
