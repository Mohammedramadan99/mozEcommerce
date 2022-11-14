import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserAction } from '../../../store/usersSlice'
import { useRouter } from 'next/router'

function Login()
{
  const router = useRouter()
  const dispatch = useDispatch()
  const { userAuth } = useSelector(state => state.users)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = e =>
  {
    e.preventDefault()
    const userData = { email, password }
    dispatch(loginUserAction(userData))
  }
  useEffect(() =>
  {
    if (userAuth?._id)
    {
      router.push('/')
    }
  }, [userAuth?._id])

  return (
    <div className='login'>
      <div className="login__header">
        <div className="login__header__txt">
          login
        </div>
      </div>
      <div className="container">
        <form onSubmit={submitHandler} className="login__form">
          <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
          <input type="submit" value="login" />
        </form>
      </div>
    </div>
  )
}

export default Login