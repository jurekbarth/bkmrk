import styled from 'styled-components';

const Button = styled.button`
  font-size: 0.9em;
  color: white;
  background-color: var(--button);
  text-shadow: var(--button-text-shadow);
  padding: 0.2em 0.5em;
  border-radius: 0.25em;
  border: none;
  position: relative;
  cursor: pointer;
  font-size: 1.1em;
  box-shadow: var(--box-shadow);
  transition: all 0.15s ease;
  outline: none;
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--box-shadow-hover);
  }
  &:active {
    transform: translateY(1px);
    box-shadow: var(--box-shadow-active);
  }
`;

export default Button;
