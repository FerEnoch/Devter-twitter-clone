import { useState, useEffect } from 'react'
import Devit from '@/components/Devit'
import useUser from '@/components/hooks/useUser'
import { listenLatestDevits } from '@/firebase/client'
import Head from 'next/head'
import NavLayout from '@/components/NavigationLayout/NavLayout'
// import Header from '@/components/Header/Header'
// import Navbar from '@/components/Navbar/Navbar'

export default function HomePage () {
  const [timeline, setTimeline] = useState(null)
  const user = useUser()

  useEffect(() => {
    const unsubscribe = user && listenLatestDevits(setTimeline)
    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devit</title>
      </Head>
      <style jsx>{`
    section {
      flex: 1
      padding-right: 18px;
    }
      `}
      </style>
      <NavLayout title='Inicio'>
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
              img,
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
                  id={id}
                  createdAt={createdAt}
                  img={img}
                />
              )
            })
          }
        </section>
      </NavLayout>
    </>
  )
}
