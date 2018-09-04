import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: 1px solid rgba(167, 173, 179, 0.25);
  padding: 0.5em 0 0.1em;
  outline: none;
  transition: all 0.15s ease;
  &:focus {
    border-color: rgba(94, 98, 101, 0.25);
  }
`;

export default Input;
