import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  :root {
    --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --black: #252525;
    --red: #e00519;
    --background-color: #F5F5F5;
    --text-color: #6b7c93;
    --text-color-highlight: #32325d;
    --border-color: rgba(207, 215, 223, 0.25);

    --link-color: #6772e5;
    --link-color-highlight: #32325d;

    --button: #3ecf8e;
    --button-text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);

    --box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    --box-shadow-hover: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    --box-shadow-active: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
  html,
  body {
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    > {
      box-sizing: inherit;
    }
  }
  body {
    font-family: var(--font);
    color: var(--black);
    background-color: var(--background-color);
    overflow-x: hidden;
  }
`;
