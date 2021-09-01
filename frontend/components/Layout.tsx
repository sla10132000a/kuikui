import { ReactNode, VFC, useEffect } from 'react'
import Head from 'next/head'
import Headers from './Header'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogin, selectlogin } from '../slices/uiSlice'

interface Props {
  children: ReactNode
  title: string
}

export const Layout: VFC<Props> = ({ children, title = '' }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const cookie = new Cookie()
  const loginState = useSelector(selectlogin)

  useEffect(() => {

    if (cookie.get('access-token') != null) {
      dispatch(
        setIsLogin({
          ...loginState,
          ...{ islogin: true },
        })
      )
    }
    else  {
      router.push('/');
      dispatch(
        setIsLogin({
          ...loginState,
          ...{ islogin: false },
        })
      )
    }
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Headers></Headers>

      <main className="">
        {router.pathname !== '/' && !loginState.islogin ? '' : children}
      </main>
    </>
  )
}