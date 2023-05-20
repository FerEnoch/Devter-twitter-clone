import { colors } from '@/styles/theme'
import css from 'styled-jsx/css'

export default css`
  button {
    align-items: center;
    background-color: ${colors.black};
    border-radius: 9999px;
    border: 0;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-size: 16px;
    font-weight: 600;
    padding: 4px 24px;
    transition: opacity .3s ease;
  }

  button > :global(svg) {
    margin-right: 8px;
  }

  button:hover {
    opacity: .7;
  }

`
