import { VFC } from 'react'
import Link from 'next/link'
import { Shop } from '../types/types'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedShop } from '../slices/uiSlice'
// import Image from 'next/image'

interface Props {
  shop: Shop
}

export const ShopItem: VFC<Props> = ({ shop }) => {
  const dispatch = useDispatch()
  const selectedShop = useSelector(setSelectedShop)
  const handlerDetailClick = (shop:Shop) => ()=> {
    dispatch(setSelectedShop({ ...selectedShop, ...shop}))
  }
  
  return (
    <li key={shop.name} className="my-2 ">
      <div className="grid grid-cols-10">
        <div className="col-span-1 self-center">
          <div>
            {/* <img src={shop.photo.mobile.s} alt={shop.name} /> */}
          </div>
        </div>
        <div className="ml-1 col-span-8">
          <div className="text-lg mt-2 mr-2">
            <Link href={"posts/" + shop.name}>
              <a target="_blank" rel="noreferrer" onClick={handlerDetailClick(shop)}>{shop.name}</a>
            </Link>
          </div>

          <div className="text-xs mt-2 mr-2 pb-2">
            <div className="text-xs">
              <span className="font-medium">{shop.genre.name}</span>
              <span className="ml-4">{shop.catch}</span>
            </div>
            <p className="mt-1"> {shop.access}</p>
          </div>
        </div>
      </div>
      <hr></hr>
    </li>
  )
}