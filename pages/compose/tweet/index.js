import Button from '@/components/Button'
import style from './style'
import { useState } from 'react'

export default function ComposeTweet () {
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

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
          <Button>Devitear</Button>
        </div>
      </form>
    </>
  )
}
