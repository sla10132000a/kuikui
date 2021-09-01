import { useQuery } from 'react-query'
import axios from 'axios';
import { useState } from 'react'
import { Response } from '../types/types'

export const useQueryShop = () => {
  const [enabled, setEnabled] = useState(false)
  const initialResponse: Response = null
  const [data, setData] = useState(initialResponse)
  const [keyword, setKeyword] = useState('')

  useQuery<Response, Error>(
    'shops',
    async () => {
      const { data } = await axios
        .get(
          `/api/search?key=daad1edd856a5021&format=json&keyword=${keyword}&count=10`
          // window.location.hostname + `/api/search?key=daad1edd856a5021&format=json&keyword=${keyword}&count=10`
          // `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=daad1edd856a5021&format=json&large_area=Z011/search?key=daad1edd856a5021&format=json&keyword=${keyword}&count=10`
          
          )
        .finally(() => setEnabled(false))
      setData(data)
      return data
    },
    { enabled: enabled }
  )

  return {
    data,
    keyword,
    setKeyword,
    enabled,
    setEnabled
  }
}