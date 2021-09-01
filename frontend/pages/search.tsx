import { useQueryShop } from '../hooks/useQueryShop'
import { Layout } from '../components/Layout'
import { ShopList } from '../components/ShopList'
import { selectKeyword, setSelectedKeyword } from '../slices/uiSlice'
import { useDispatch } from 'react-redux'

export default function Home() {
  const { data, keyword, setKeyword, setEnabled } = useQueryShop()
  const dispatch = useDispatch()

  return (
    <Layout title="home">
      <input
        value={keyword}
        type="search"
        name="query"
        className="rounded py-2 px-4 ml-4 text-left border-red-500"
        placeholder="キーワードを入力して下さい"
        onChange={(e) => {
          setKeyword(e.target.value)
          dispatch(
            setSelectedKeyword({
              ...selectKeyword,
              ...{ keyword: e.target.value },
            })
          )
        }}
      />
      <button
        onClick={() => {
          setEnabled(true)
        }}
        className="ml-2 text-white bg-red-500 rounded py-2 px-6 hover:opacity-75"
      >
        Search
      </button>
      <ShopList response={data}></ShopList>
    </Layout>
  )
}
