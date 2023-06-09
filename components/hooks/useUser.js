import { useState, useEffect } from 'react'
import { authStateChange } from '@/firebase/client'
import { useRouter } from 'next/router'

export const USER_STATUS = {
  LOGGED_IN: true,
  LOGGED_OUT: null,
  UNKNOWN: undefined
}

export default function useUser () {
  const [user, setUser] = useState(USER_STATUS.UNKNOWN)
  const [status, setStatus] = useState(USER_STATUS.UNKNOWN)
  const router = useRouter()

  useEffect(() => {
    authStateChange({ setUser, setStatus })
  }, [])

  useEffect(() => {
    if (router.pathname === '/') return
    status === USER_STATUS.LOGGED_OUT && router.push('/')
  }, [router, status])

  return user
}
