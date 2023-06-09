import { colors } from '@/styles/theme'
import css from 'styled-jsx/css'

export default css`
nav {
  align-items: center;
  background: #fff;
  bottom: 0;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  position: sticky;
  min-height: 49px;
  width: 100%;
}

nav > a {
  flex: 1 1 auto;
  height: 100%;
}

nav > :global(a:hover) {
  background: radial-gradient(circle at center, #0099ff22 30%, transparent 26%);
  background-position: center;
  background-size: 40px 40px;
  background-repeat: no-repeat;
}

nav > a:hover > :global(svg) {
  stroke: ${colors.secondary}
}
`
