import Avatar from '@/components/Avatar'
import Image from 'next/image'
import useTimeAgo from '@/components/hooks/useTimeAgo'
import useDateTimeFormat from '@/components/hooks/useDateTimeFormat'
import Link from 'next/link'
import { useRouter } from 'next/router'

import style from '@/styles/components/Devit_styles'
import { useState } from 'react'

export default function Devit ({
  createdAt, name, avatar, userName, img, content, id
}) {
  const timestamp = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()
  const [completeImgLoading, setCompleteImgLoading] = useState(null)

  const articleClickHandler = (e) => {
    e.preventDefault()
    if (!router.pathname.includes('status')) router.push(`status/${id}`)
  }

  const imgBackgroundFill = completeImgLoading ? 'completed' : 'loading'

  return (
    <>
      <style jsx>{style}</style>
      <article onClick={articleClickHandler}>
        <div>
          <Avatar
            src={avatar}
            alt={userName}
            title={userName}
            width={49}
            height={49}
          />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> . </span>
            <Link href={`/status/${id}`}>
              <time title={createdAtFormated}>
                {timestamp}
              </time>
            </Link>
          </header>
          <p>{content}</p>
          {
          img &&
            <Image
              alt={`Image of the tweet by ${userName}`}
              width={200}
              height={100}
              src={img}
              onLoadingComplete={() => { setCompleteImgLoading(true) }}
              className={imgBackgroundFill}
            />
          }
        </section>
      </article>
    </>
  )
}
