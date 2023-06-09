import Button from '@/components/Button'
import style from './style'
import { useEffect, useState } from 'react'
import useUser from '@/components/hooks/useUser'
import { addDevit, uploadImage } from '@/firebase/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getDownloadURL } from 'firebase/storage'
import Image from 'next/image'
import Avatar from '@/components/Avatar'
import NavLayout from '@/components/NavigationLayout/NavLayout'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTweet () {
  const user = useUser()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const router = useRouter()
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imageURL, setImageURL] = useState(null)

  useEffect(() => {
    if (task) {
      const onChange = () => {}
      const onError = () => {}
      const onCompleted = () => {
        console.log('completed upload!')
        getDownloadURL(task.snapshot.ref).then(setImageURL)
      }
      task.on('state_changed', onChange, onError, onCompleted)
    }
  }, [task])

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
      userName: user.username,
      img: imageURL
    })
      .then(() => {
        setMessage('')
        router.push('/home')
      })
      .catch(error => {
        setStatus(COMPOSE_STATES.ERROR)
        console.table(
          {
            'sending to database error */*** //-->': error
          }
        )
      })
  }

  const isButtonDisabled = (status === COMPOSE_STATES.LOADING) || message.length === 0

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const uploadTask = uploadImage(file)
    setTask(uploadTask)
  }

  return (
    <>
      <Head>
        <title>Crear Devit</title>
      </Head>
      <style jsx>{style}</style>
      <NavLayout title='Devitear'>
        <div />
        <section className='form-container'>
          {
     user &&
       <figure className='avatar-container'>
         <Avatar
           alt={user.username}
           src={user.avatarURL}
           width={49}
           height={49}
         />
       </figure>
      }
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder='Qué está pasando...?'
              value={message}
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={
            `${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? 'dashed'
            : ''}`
          }
            />
            {
        imageURL &&
          <section className='remove-img'>
            <Button onClick={() => setImageURL(null)}>
              X
            </Button>
            <Image
              height={300}
              width={500}
              alt='Devit image'
              src={imageURL}
            />
          </section>
         }
            <div>
              <Button disabled={isButtonDisabled}>Send it!</Button>
            </div>
          </form>
        </section>
      </NavLayout>
    </>
  )
}
