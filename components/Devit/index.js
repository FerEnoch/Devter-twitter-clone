import Avatar from '@/components/Avatar'
import style from './style'

export default function Devit ({ name, avatar, username, message, id }) {
  return (
    <>
      <style jsx>{style}</style>
      <article>
        <div>
          <Avatar
            src={avatar}
            alt={name}
            title={username}
            width={49}
            height={49}
          />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>
    </>
  )
}
