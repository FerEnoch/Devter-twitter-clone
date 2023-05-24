import Avatar from '@/components/Avatar'
import style from './style'

export default function Devit ({ createdAt, name, avatar, userName, content, id }) {
  return (
    <>
      <style jsx>{style}</style>
      <article>
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
            <time dateTime={createdAt}>{createdAt}</time>
          </header>
          <p>{content}</p>
        </section>
      </article>
    </>
  )
}
