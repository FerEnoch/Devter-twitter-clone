import css from 'styled-jsx/css'

export default css`
    form {
      padding: 10px;
      width: 100%;
    }

    div { 
      padding: 15px;
    }

    section.form-container {
      flex: 1;
      display: flex;
      align-items: start;
    }

    textarea {
      border: 3px solid transparent;
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
      border-radius: 10px;
      height: auto;
      width: 100%;
    }

    section.remove-img {
      position: relative;
    }

    section > :global(button) {
      background-color: rgba(0, 0, 0, .75);
      border-radius: 9999px;
      border: 0;
      color: #fff;
      display: flex;
      font-size: 16px;
      height: 32px;
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
`
