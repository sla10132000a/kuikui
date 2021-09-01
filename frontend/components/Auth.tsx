import { VFC } from 'react'
import { useAuth } from '../hooks/useAuth'
import { SwitchVerticalIcon } from '@heroicons/react/solid'

export const Auth: VFC = () => {
  const {
    selectMode,
    email,
    password,
    emailChange,
    pwChange,
    submitUser,
    toggleMode,
  } = useAuth()
  return (
    <>
      <form
        onSubmit={submitUser}
        className="mt-8 flex justify-center items-center flex-col"
      >
        <label>Email:</label>
        <input
          className="my-3 px-3 py-1 border border-gray-300"
          placeholder="email ?"
          type="text"
          value={email}
          onChange={emailChange}
        />

        <label>Password:</label>
        <input
          className="my-3 px-3 py-1 border border-gray-300"
          placeholder="password ?"
          type="password"
          value={password}
          onChange={pwChange}
        />

        <div className="mt-8 flex justify-center items-center">
          <button
            disabled={!email || !password}
            type="submit"
            className="disabled:opacity-40 ml-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
          >
            {selectMode ? 'SignIn' : 'SignUp'}
          </button>

          <SwitchVerticalIcon
            className="ml-5 h-5 w-5 text-blue-500 cursor-pointer"
            onClick={toggleMode}
          />
        </div>
      </form>
    </>
  )
}
