import { useCallback, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import { TAuthUser, TRole } from '@/types/index'

import { TDecodedToken } from '@/utils/authTokens'
import { useAuthStore } from '../../stores/auth.store'

type Props = {
  role: TRole
}

const AuthGuard:React.FC<Props> = ({
  role
}) => {
  const navigate = useNavigate()

  const setUser = useAuthStore(state => state.setUser)

  const initAuthStore = useCallback((user: TAuthUser) => {
    setUser(user)
  },[setUser])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login?redirect=no-token')
      return
    }
    const decodedToken: TDecodedToken = jwtDecode(token) as TDecodedToken
    if (role && decodedToken.role !== role) {
      navigate('/login?redirect=forbidden')
      return
    }

    initAuthStore(decodedToken)
  }, [initAuthStore, navigate, role])

  return (
    <Outlet/>
  )
}

export default AuthGuard