import styles from './styles'

export default function Button ({ children, onClick }) {
  return (
    <>
      <style jsx>{styles}</style>
      <button onClick={onClick}>
        {children}
      </button>
    </>
  )
}
