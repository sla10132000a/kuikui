import Cookie from 'universal-cookie'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import {RepositoryClass} from '../repositories/RepositoryClass';
import { setIsLogin, selectlogin } from '../slices/uiSlice'

export default function Headers() {
  const cookie = new Cookie();
  const router = useRouter();
  const loginState = useSelector(selectlogin);
  const dispatch = useDispatch()

  const logout = async (e) => {
    e.preventDefault();

    try {
      let repo = new RepositoryClass({
        withCredentials: true,
        headers: {
          'access-token': cookie.get('access-token'),
          client: cookie.get('client'),
          uid: cookie.get('uid'),
          expiry: cookie.get('expiry'),
        },
      });
      await repo.delete('/v1/auth/sign_out',{});

      cookie.remove('access-token')
      cookie.remove('client')
      cookie.remove('uid')
      cookie.remove('expiry')

      dispatch(
        setIsLogin({
          ...loginState,
          ...{ islogin: false },
        })
      );

      router.push('/')
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return (
    <>
      <div className="header-2">
        <nav className="bg-white py-2 md:py-4">
          <div className="container px-4 mx-auto md:flex md:items-center">
            <div className="flex justify-between items-center">
              <a href="#" className="font-bold text-xl text-indigo-500">
                飲食店検索
              </a>
              <button
                className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
                id="navbar-toggle"
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>

            <div
              className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
              id="navbar-collapse"
            >
              {loginState.islogin ? (
                <a
                  href=""
                  className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
                  onClick={logout}
                >
                  Logout
                </a>
              ) : (
                ''
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
