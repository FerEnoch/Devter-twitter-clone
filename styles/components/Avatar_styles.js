import css from 'styled-jsx/css'

export default css`
  :global(.avatar) {
  border-radius: 99px;
}

 :global(.avatar)+strong {
  margin-left: 8px;
}

  .container {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
`
