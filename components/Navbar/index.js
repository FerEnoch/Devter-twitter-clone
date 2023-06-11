import Create from '@/components/Icons/Create'
import Link from 'next/link'
import Home from '@/components/Icons/Home'
import style from '@/styles/components/Navbar_styles'

export default function Navbar () {
  return (
    <>
      <style jsx>{style}</style>
      <nav>
        <Link href='/home'>
          <Home />
        </Link>
        <Link href='/compose/devit'>
          <Create />
        </Link>
      </nav>
    </>
  )
}
