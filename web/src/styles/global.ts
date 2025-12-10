import { colors } from './colors';

export const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${colors.background};
    color: ${colors.text};
  }

  button {
    font-family: inherit;
  }

  a {
    color: inherit;
  }

  button:hover {
    opacity: 0.8;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: block;
  }
`;
