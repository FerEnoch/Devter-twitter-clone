import css from 'styled-jsx/css'
import { colors, fonts, breakpoints } from '@/styles/theme'
import { addOpacityToColor } from '@/styles/utils'

const backgroundColor = addOpacityToColor(colors.primary, 0.5)

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
      overflow: hidden;
      font-family: ${fonts.base}
    }

    textarea, input {
      font-family: ${fonts.base};
    }
`

export default css`
    div {
       display: grid;
       height: 100vh;
       place-items: center;
    }

     
    @media (min-width: ${breakpoints.mobile}) {
      div :global(main) {
       height: 90vh;
       width: ${breakpoints.mobile}
     }
    }
`
