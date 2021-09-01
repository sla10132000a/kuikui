import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import Cookie from 'universal-cookie'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogin, selectlogin } from '../slices/uiSlice'
// import axios from 'axios'
import { RepositoryClass } from '../repositories/RepositoryClass'

export const useAuth = () => {
  const cookie = new Cookie()
  const router = useRouter()
  const dispatch = useDispatch()
  const islogin = useSelector(selectlogin)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectMode, setSelectMode] = useState(false)

  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])
  const pwChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])
  const resetInput = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [])
  const toggleMode = useCallback(() => {
    setSelectMode(!selectMode)
  }, [selectMode])

  const handleSubmit = async (email, password) => {
    try {
      let repo = new RepositoryClass({})

      if (!selectMode) {
        await repo.post('/v1/auth', {
          email: email,
          password: password,
        })
      }

      let data = await repo.post('/v1/auth/sign_in', {
        email: email,
        password: password,
      })

      if (data.headers['access-token']) {
        cookie.set('access-token', data.headers['access-token'], {
          path: '/',
          encode: (value: string) => {
            return value
          },
        })
        cookie.set('client', data.headers['client'], {
          path: '/',
          encode: (value: string) => {
            return value
          },
        })
        cookie.set('uid', data.headers['uid'], {
          path: '/',
          encode: (value: string) => {
            return value
          },
        })

        cookie.set('expiry', data.headers['expiry'], {
          path: '/',
          encode: (value: string) => {
            return value
          },
        })
      }

      dispatch(
        setIsLogin({
          ...islogin,
          ...{ islogin: true },
        })
      )
      router.push('/search')
    } catch (e) {

      if(e.response.status && String(e.response.status).match(/4\d\d/) ){
        throw new Error("メールアドレスまたはパスワードが正しくありません。またはすでに登録されています。")
      } 
      else if (e.response.status && String(e.response.status).match(/5\d\d/) ){
        throw new Error("現在ご利用いただけません。")
      }
      else {
        throw new Error(e.message)
      }
    }
  }

  const submitUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        handleSubmit(email, password);
        resetInput();
      } catch (e) {
        throw new Error(e.message);
      }
    },
    [email, password, selectMode]
  )

  return {
    email,
    password,
    emailChange,
    pwChange,
    resetInput,
    selectMode,
    toggleMode,
    submitUser,
  }
}
