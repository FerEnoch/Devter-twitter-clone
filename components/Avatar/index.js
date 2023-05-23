import Image from 'next/image'
import styles from './styles.module.css'

export default function Avatar ({ alt, src, width, height, text, withText }) {
  return (
    <div className={styles.container}>
      <Image
        alt={alt}
        src={src}
        title={alt}
        width={width}
        height={height}
        className={styles.avatar}
      />
      {
        withText &&
          <strong>{text || alt}</strong>
      }
    </div>
  )
}
