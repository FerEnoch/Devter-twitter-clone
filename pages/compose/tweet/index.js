import Button from '@/components/Button'
import style from './style'
import { useState } from 'react'
import useUser from '@/components/hooks/useUser'
import { addDevit } from '@/firebase/client'
import { useRouter } from 'next/router'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export default function ComposeTweet () {
  const user = useUser()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const router = useRouter()

  const handleChange = e => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatarURL,
      content: message,
      userId: user.uid,
      userName: user.username
    })
      .then(() => {
        setMessage('')
        router.push('/home')
      })
      .catch(error => {
        setStatus(COMPOSE_STATES.ERROR)
        console.log('sending to database error table */***')
        console.table(
          {
            'error //-->': error
          }
        )
      })
  }

  const isButtonDisabled = (status === COMPOSE_STATES.LOADING) || message.length === 0

  return (
    <>
      <div />
      <style jsx>{style}</style>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='Qué está pasando...?'
          value={message}
          onChange={handleChange}
        />
        <div>
          <Button disabled={isButtonDisabled}>Devitear</Button>
        </div>
      </form>
    </>
  )
}
