import css from 'styled-jsx/css'
import { colors } from '@/styles/theme'

export default css`
section {
  display: grid;
  height: 100%;
  place-content: center;
  place-items: center;
}

h1 {
  color: ${colors.primary};
  font-weight: 800;
  margin-bottom: 16px;
  font-size: 24px;
}

h2 {
  color: ${colors.secondary};
  font-size: 21px;
  text-align: center;
}

div {
  margin-top: 16px
}
`
