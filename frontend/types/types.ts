export interface Post {
  id: string
  title: string
  description: string
  shopId: string
  likes:{userId:number}
}

export interface CreatePost {
  userId: number
  shopId: string
  title: string
  description: string
}

export interface CreateLike {
  userId: number
  postId: number
}

export interface DeleteLike {
  userId: number
  postId: number
}


export interface EditPost {
  id: number
}
export interface Keyword {
  keyword: string
}
export interface Selectlogin {
  islogin: boolean
}
export type Shop = {
  name:string
  access: number
  address:string
  urls:{pc:string}
  photo:{mobile:{s:string},pc:{l:string}}
  genre:{name:string}
  catch:string
  id: string
  station_name: string
  budget:{name:string}
  close: string
}

export type Response = {
  results:{
    shop: Shop[]
  }
}