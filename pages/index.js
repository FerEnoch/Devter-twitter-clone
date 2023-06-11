import { loginWithGitHub } from '@/firebase/client'
import { useEffect } from 'react'
import AppLogo from '@/components/Icons/AppLogo'
import Button from '@/components/Button'
import GitHubLogo from '@/components/Icons/GitHub'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/index_styles'
import { useRouter } from 'next/router'
import useUser, { USER_STATUS } from '@/components/hooks/useUser'

export default function Home () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user, router])

  const handleClick = () => {
    loginWithGitHub()
      .catch(err => console.table(
        {
          'Somethin went wrong //-->': 'index-onClickButton->loginWithGitHub',
          'err.message //-->': err.message
        }
      )
      )
  }

  return (
    <>
      <Head>
        <title>Devter</title>
      </Head>
      <style jsx>{styles}</style>
      <section>
        <AppLogo
          width={70}
          height={50}
        />
        <h1>Devter</h1>
        <h2>Talk about development with developers</h2>
        <div>
          {
             user === USER_STATUS.UNKNOWN && (
               <Button onClick={handleClick}>
                 <GitHubLogo
                   width={24}
                   height={24}
                   fill='white'
                 />
                 Login with GitHub
               </Button>
             )
          }
          {
              user &&
              (
                <div>
                  <Image
                    src='/spinner.gif'
                    alt='Loading spinner'
                    width={160}
                    height={135}
                  />
                </div>
              )
          }
        </div>
      </section>
    </>
  )
}
