import Image from 'next/image'

export default function AppLogo ({ width, height }) {
  return (
    <Image
      width={width}
      height={height}
      src='/logo.png'
      alt='App logo: a blue V shape mixed with a bird'
    />
  )
}
