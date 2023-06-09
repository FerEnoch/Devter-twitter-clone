import css from 'styled-jsx/css'

export default css`
  article {
    border-bottom: 1px solid #eee;
    display: flex;
    padding: 10px 15px;
  }

  article:hover {
    background: #f5f8fa;
    cursor: pointer;
  }

  div {
    padding-right: 10px;
  }

  p {
    margin: 0;
    line-height: 1.35em;
  }

  time {
    color: #555;
    font-size: 14px;
  }

  section > :global(img) {
    border-radius: 10px;
    height: auto;
    margin-top: 10px;
    width: 100%;
  }
  
  header > :global(a) {
    text-decoration: none;
  }

  header > :global(a):hover {
    text-decoration: underline;
  }
`
