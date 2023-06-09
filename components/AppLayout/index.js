// Es mejor poner los estilos acá que en _app.js
import styles, { globalStyles } from './styles'

export default function AppLayout ({ children }) {
  return (
    <>
      <div>
        {children}
      </div>
      <style jsx>{styles}</style>
      <style jsx global>{globalStyles}</style>
    </>
  )
}
