import css from 'styled-jsx/css'

import { breakpoints } from '../../styles/theme'
import { addOpacityToColor } from '@/styles/utils'

const mainBoxShadow = addOpacityToColor('#000000', 0.15)

export default css`
  main {
       background: #fff;
       border-radius: 10px;
       box-shadow: 0 10px 25px ${mainBoxShadow};
       display: flex;
       flex-direction: column;
       height: 90vh;
       overflow-x: hidden;
       overflow-y: auto;
       position: relative;
       width: 100%;
     }
   
    @media (min-width: ${breakpoints.mobile}) {
     main {
       height: 90vh;
       width: ${breakpoints.mobile}
     }
    }
`
