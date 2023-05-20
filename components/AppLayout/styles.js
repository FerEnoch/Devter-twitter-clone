import css from 'styled-jsx/css'
import { breakpoints, colors, fonts } from '../../styles/theme'
import { addOpacityToColor } from '@/styles/utils'

const backgroundColor = addOpacityToColor(colors.primary, 0.5)
const mainBoxShadow = addOpacityToColor('#000000', 0.15)

export default css`
div {
   display: grid;
   height: 100vh;
   place-items: center;
}

main {
   background: #fff;
   border-radius: 10px;
   box-shadow: 0 10px 25px ${mainBoxShadow};
   height: 90vh;
   width: 100%;
 }

@media (min-width: ${breakpoints.mobile}) {
 main {
   height: 90vh;
   width: ${breakpoints.mobile}
 }
}
`

export const globalStyles = css.global`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  background-image:
   radial-gradient(${backgroundColor} 1px, #fdfdfd 1px), 
   radial-gradient(${backgroundColor} 1px, #fdfdfd 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
  font-family: ${fonts.base}
}
`
