import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import style from '@/styles/components/NavLayout_styles'

export default function NavLayout ({ children, title }) {
  return (
    <>
      <style jsx>{style}</style>
      <main>
        <Header title={title} />
        {children}
        <Navbar />
      </main>
    </>
  )
}
