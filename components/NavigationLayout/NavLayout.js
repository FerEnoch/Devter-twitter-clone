import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import style from './style'

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
