import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { Layout } from '../../components/Layout'
import { PostList } from '../../components/PostList'
import { setSelectedShop, selectShop } from '../../slices/uiSlice'
import { useQueryShop } from '../../hooks/useQueryShop'
import { useAppMutate } from '../../hooks/useAppMutate'
import { Shop } from '../../types/types'

import {
  Model,
  openModal,
  afterOpenModal,
  closeModal,
  submitHandler,
  title,
  description,
} from '../../components/Model'

export default function Post({ post }) {
  const router = useRouter()
  const { data, setKeyword, enabled, setEnabled } = useQueryShop()

  const dispatch = useDispatch()
  // const handlerPostClick = (shop: Shop) => () => {
  //   dispatch(setSelectedShop({ ...selectedShop, ...shop }))
  // }
  const [userId, setUserId] = useState(1)
  const { createPostMutation } = useAppMutate()
  // const selectedShop = useSelector(selectShop)

  useEffect(() => {
    const { name } = router.query
    if (!name) return

    setKeyword(name as string)
    setEnabled(true)
  }, [router.query])

  interface postMutationProp {
    userId: number
    shopId: string
    title: string
    description: string
  }

  const submitHandler =
    (props: postMutationProp) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createPostMutation.mutate(props)
    }

  return (
    <Layout key={data?.results.shop[0].id} title={data?.results.shop[0].name}>
      <>
        <div className="grid grid-cols-16">
          <h4>{data?.results.shop[0].name}</h4>
        </div>

        <div className="grid grid-cols-16">
          <h4>最寄り駅： {data?.results.shop[0].station_name}</h4>
        </div>

        <div className="grid grid-cols-16">
          <h4>ジャンル： {data?.results.shop[0].genre.name}</h4>
        </div>

        <div className="grid grid-cols-16">
          <h4>予算： {data?.results.shop[0].budget.name}</h4>
        </div>

        <div className="grid grid-cols-16">
          <h4> 定休日： {data?.results.shop[0].close}</h4>
        </div>

        <div className="col-span-2 self-center">
          <div>
            {/* <img src={data?.results.shop[0].photo.pc.l} /> */}
          </div>
        </div>

        {/*----------------- 投稿 -----------------*/}
        <div className="w-10/12">
          <hr className="mt-10"></hr>

          <div className="flex">
            <h3>口コミ</h3>
            <button className="ml-auto" onClick={openModal}>
              投稿
            </button>
          </div>

          {/* -------------- 投稿一覧 --------------*/}
          <PostList shopId={data?.results.shop[0].id}></PostList>

          {/* -------------- 店舗詳細--------------*/}
          <hr className="mt-10"></hr>
          <div>
            <h3>店舗情報（詳細）</h3>
          </div>
          <div>
            <h4>店舗基本情報</h4>
            <table>
              <tbody>
                <tr>
                  <th>店名</th>
                  <td>{data?.results.shop[0].name}</td>
                </tr>
                <tr>
                  <th>ジャンル</th>
                  <td>{data?.results.shop[0].genre.name}</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>{data?.results.shop[0].address}</td>
                </tr>
                <tr>
                  <th>交通手段</th>
                  <td>{data?.results.shop[0].access}</td>
                </tr>
                <tr>
                  <th>食べログ</th>
                  <td>
                    <a target="_blank" rel="noreferrer" href={data?.results.shop[0].urls.pc}>
                      リンク
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* -------------- モーダル --------------*/}
        <Model submitHandler={submitHandler} postMutationProp={{userId, shopId:data?.results.shop[0].id}}></Model>
      </>
    </Layout>
  )
}