import style from './styles'
import { useState, useEffect } from 'react'
import Devit from '@/components/Devit'
import useUser from '@/components/hooks/useUser'

export default function HomePage () {
  const [timeline, setTimeline] = useState(null)
  const user = useUser()
  console.table(
    {
      'userFromHome //--> ': user,
      'user //-->': user
    }
  )

  useEffect(() => {
    user &&
      fetch('http://localhost:3000/api/statuses/home_timeline')
        .then(res => res.json())
        .then(setTimeline)
        .catch(err => console.log('err //--> ', err)
        )
  }, [user])

  return (
    <>
      <style jsx>{style}</style>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {
          timeline &&
            timeline.map(({ name, avatar, username, message, id }) => {
              return (
                <Devit
                  key={id}
                  width={49}
                  height={49}
                  src={avatar}
                  alt={name}
                  title={username}
                  username={username}
                  message={message}
                  avatar={avatar}
                  name={name}
                />
              )
            })
          }
      </section>
      <nav>
        my nav
      </nav>
    </>
  )
}
