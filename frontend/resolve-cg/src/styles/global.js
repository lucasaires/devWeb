import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
      --white: #fff;

      --gray-100: #e1e1e6;
      --gray-500: #666;

      --gray-850: #1f2729;

      --yellow-500: #eba417;
  }

  body {
      background: var(--gray-500);
      color: var(--white);
  }

  button{
      cursor: pointer;
  }

  a{
      color: inherit;
      text-decoration: none;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;

    display:flex;
    align-items: center;
    justify-content: center;
}

.react-modal-content{
  width: 100%;
  max-width: 576px;
  background: var(--gray-100);
  padding: 3rem;
  position: relative;
}

`;

export default GlobalStyle;
