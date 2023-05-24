import style from './styles'
import { useState, useEffect } from 'react'
import Devit from '@/components/Devit'
import useUser from '@/components/hooks/useUser'
import { fetchLatestDevits } from '@/firebase/client'

export default function HomePage () {
  const [timeline, setTimeline] = useState(null)
  const user = useUser()

  useEffect(() => {
    // user &&
    //   fetch('http://localhost:3000/api/statuses/home_timeline')
    //     .then(res => res.json())
    //     .then(setTimeline)
    //     .catch(err => console.log('err //--> ', err)
    // )
    user && fetchLatestDevits()
      .then(setTimeline)
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
            timeline.map(({
              id,
              name,
              createdAt,
              avatar,
              userName,
              content,
              userId
            }) => {
              return (
                <Devit
                  key={id}
                  width={49}
                  height={49}
                  src={avatar}
                  alt={userName}
                  title={userName}
                  userName={userName}
                  content={content}
                  avatar={avatar}
                  name={name}
                  userId={userId}
                  createdAt={createdAt}
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
