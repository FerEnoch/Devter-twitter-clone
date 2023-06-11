import css from 'styled-jsx/css'
import { addOpacityToColor } from '@/styles/utils'
import { colors } from '@/styles/theme'

const deleteButtonColor = addOpacityToColor(colors.black, 0.4)
const textareaBorderColor = addOpacityToColor(colors.secondary, 0.5)

export default css`
    form {
      padding: 10px;
      width: 100%;
      position: relative;
    }

    div { 
      padding: 15px;
    }

    section.form-container {
      align-items: start;
      display: flex;
      flex: 1;
    }

    textarea {
      border: 1px solid ${textareaBorderColor};
      border-radius: 10px;
      font-size: 15px;
      min-height: 200px;
      padding: 15px;
      outline: 0;
      padding: 15px;
      resize: none;
      width: 100%;
    }

    textarea.dashed {
      border: 3px dashed #09f;
    }

    section > :global(img) {
      background: center / contain no-repeat url('/spinner.gif');
      border-radius: 10px;
      height: auto;
      margin-top: 10px;
      width: 100%;
    }

    section > :global(img).completed {
      background: none;
    }

    section.remove-img {
      position: relative;
    }

    .loading-spinner {
      position: relative;
      transform: translate(125px, -20px);
    }

    section > :global(button) {
      background-color: ${deleteButtonColor};
      border-radius: 9999px;
      border: 0;
      color: #fff;
      display: flex;
      font-size: 11px;
      justify-content: center;
      position: absolute;
      right: 15px;
      top: 15px;
      width: 32px;
    }

    figure.avatar-container {
      padding-top: 20px;
      padding-left: 10px;
    }

    :global(nav) {
      padding-right: 18px;
    }

    input {
      position: absolute;
      visibility: hidden;
    }

    .upload_picture {
      position: absolute;
      bottom: 60px;
      right: 20px;
    }

    label:hover {  
      cursor: pointer;
    }
`
