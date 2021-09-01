import { VFC } from 'react'
import { Response } from '../types/types'
import { ShopItem} from './ShopItem'

interface Props {
  response: Response
}

export const ShopList: VFC<Props> = ({ response }) => {
  return (
    <ul className="mx-4">
      {response?.results.shop.map((shop) => (
        <ShopItem key={shop.id} shop={shop} />
      ))}
    </ul>
  )
}
