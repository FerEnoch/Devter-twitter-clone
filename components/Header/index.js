import style from '@/styles/components/Header_styles'

export default function Header ({ title }) {
  return (
    <>
      <style jsx>{style}</style>
      <header>
        <h2>
          {title}
        </h2>
      </header>
    </>
  )
}
