import AppLayout from '@/components/AppLayout'
import Button from '@/components/Button'
import GitHubLogo from '@/components/Icons/GitHub'
import { authStateChange, loginWithGitHub } from '@/firebase/client'
import Head from 'next/head'
import Image from 'next/image'
import styles from './styles'
import { useEffect, useState } from 'react'

export default function Home () {
  const [user, setUser] = useState(undefined)

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch(error => {
        console.table(
          {
            'Something went wrong': ':(',
            'error.message //--> ': error.message,
            'error.code //--> ': error.code
          })
      })
  }

  useEffect(() => {
    authStateChange(setUser)
  }, [setUser])

  return (
    <>
      <Head>
        <title>Devter</title>
        <meta name='description' content='Clon de Twitter por FerEnøch_dev!' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
      </Head>
      <style jsx>{styles}</style>
      <AppLayout>
        <section>
          <Image
            width={70}
            height={50}
            src='/logo.png'
            alt='logo'
          />
          <h1>Devter</h1>
          <h2>Talk about development with developers</h2>
          <div>
            {
             !user
               ? (
                 <Button onClick={handleClick}>
                   <GitHubLogo
                     width={24}
                     height={24}
                     fill='white'
                   />
                   Login with GitHub
                 </Button>
                 )
               : (
                 <div>
                   <Image
                     width={60}
                     height={60}
                     src={user.avatarURL}
                     alt='User avatar'
                   />
                   <strong>{user.username}</strong>
                 </div>
                 )
            }
          </div>
        </section>
      </AppLayout>
    </>
  )
}
