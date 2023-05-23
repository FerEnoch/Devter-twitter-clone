import { useState, useEffect } from 'react'
import { authStateChange } from '@/firebase/client'
import { useRouter } from 'next/router'

export const userStatus = {
  LOGGED_IN: true,
  LOGGED_OUT: null,
  UNKNOWN: undefined
}

export default function useUser () {
  const [user, setUser] = useState(userStatus.UNKNOWN)
  const [status, setStatus] = useState(userStatus.UNKNOWN)
  const router = useRouter()

  useEffect(() => {
    authStateChange({ setUser, setStatus })
  }, [])

  useEffect(() => {
    status === userStatus.LOGGED_OUT && router.push('/')
  }, [router, status])

  return user
}
