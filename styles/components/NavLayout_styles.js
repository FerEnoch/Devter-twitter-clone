import css from 'styled-jsx/css'

import { addOpacityToColor } from '@/styles/utils'

const mainBoxShadow = addOpacityToColor('#000000', 0.15)

export default css`
  main {
       background: #fff;
       border-radius: 10px;
       box-shadow: 0 10px 25px ${mainBoxShadow};
       display: flex;
       flex-direction: column;
       height: 100vh;
       justify-content: space-between;
       overflow-x: hidden;
       overflow-y: auto;
       position: relative;
       width: 100%;
     }
`
