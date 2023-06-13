import Button from '@/components/Button'
import style from '@/styles/compose/devit/devit_styles'
import { useEffect, useRef, useState } from 'react'
import useUser from '@/components/hooks/useUser'
import { addDevit, uploadImage } from '@/firebase/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getDownloadURL } from 'firebase/storage'
import Image from 'next/image'
import Avatar from '@/components/Avatar'
import NavLayout from '@/components/NavigationLayout'
import Picture from '@/components/Icons/Picture'

const COMPOSE_STATES = {
  UNKNOWN_USER: 0,
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
  const [status, setStatus] = useState(COMPOSE_STATES.UNKNOWN_USER)
  const router = useRouter()
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const uploadPictureRef = useRef()
  const [completeImgLoading, setCompleteImgLoading] = useState(null)

  useEffect(() => {
    if (task) {
      const onChange = () => {}
      const onError = () => {}
      const onCompleted = () => {
        getDownloadURL(task.snapshot.ref).then(setImageURL)
        setDrag(DRAG_IMAGE_STATES.COMPLETE)
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
    setImageURL(null)
    setDrag(DRAG_IMAGE_STATES.UPLOADING)
    const file = e.dataTransfer.files[0]
    const uploadTask = uploadImage(file)
    setTask(uploadTask)
  }

  const handleUploadImageButton = (e) => {
    setImageURL(null)
    setDrag(DRAG_IMAGE_STATES.UPLOADING)
    const pictureFile = uploadPictureRef.current.files[0]
    const uploadTask = uploadImage(pictureFile)
    setTask(uploadTask)
  }

  const imgBackgroundFill = completeImgLoading ? 'completed' : 'loading'

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
            drag !== DRAG_IMAGE_STATES.UPLOADING && !imageURL &&
              (
                <div className='upload_picture'>
                  <label htmlFor='upload_picture'>
                    <Picture />
                  </label>
                  <input
                    type='file'
                    name='devit_picture'
                    id='upload_picture'
                    accept='image/*,.pdf'
                    ref={uploadPictureRef}
                    onChange={handleUploadImageButton}
                  />
                </div>
              )
            }
            {
            drag === DRAG_IMAGE_STATES.UPLOADING &&
             (
               <div className='loading-spinner'>
                 <Image
                   src='/spinner.gif'
                   alt='Loading spinner'
                   width={160}
                   height={135}
                 />
               </div>
             )
            }
            {
            imageURL &&
              <section className='remove-img'>
                <Button onClick={() => {
                  setDrag(DRAG_IMAGE_STATES.NONE)
                  setImageURL(null)
                }}
                >
                  X
                </Button>
                <Image
                  height={300}
                  width={500}
                  alt='Devit image'
                  src={imageURL}
                  onLoadingComplete={() => { setCompleteImgLoading(true) }}
                  className={imgBackgroundFill}
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
