import styles from '@/styles/components/Button_styles'

export default function Button ({ disabled, children, onClick }) {
  return (
    <>
      <style jsx>{styles}</style>
      <button
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}
