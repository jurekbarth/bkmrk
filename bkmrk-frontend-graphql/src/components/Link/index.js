import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Link = styled(RouterLink)`
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.15s ease;
  &:hover {
    color: var(--link-color-highlight);
  }
`;

export default Link;
