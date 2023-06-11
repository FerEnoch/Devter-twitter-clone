import Image from 'next/image'
import style from '@/styles/components/Avatar_styles'

export default function Avatar ({ alt, src, width, height, text, withText }) {
  return (
    <>
      <style jsx>{style}</style>
      <div className='container'>
        <Image
          alt={alt}
          src={src}
          title={alt}
          width={width}
          height={height}
          className='avatar'
        />
        {
        withText &&
          <strong>{text || alt}</strong>
      }
      </div>
    </>
  )
}
