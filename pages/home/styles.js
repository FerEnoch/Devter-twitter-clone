import css from 'styled-jsx/css'

export default css`
    header {
      align-items: center;
      background: #ffffffaa;
      backdrop-filter: blur(3px);
      border-bottom: 1px solid #ccc;
      height: 49px;
      display: flex;
      position: sticky;
      top: 0;
      width: 100%;
    }

    h2 {
     font-size: 21px;
     font-weight: 800;
     padding: 15px;
    }

    nav {
      background: #fff;
      bottom: 0;
      border-top: 1px solid #eee;
      position: sticky;
      height: 49px;
      width: 100%;
    }
`
