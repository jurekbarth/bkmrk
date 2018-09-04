import styled from 'styled-components';

const ExternalLink = styled.a`
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.15s ease;
  &:hover {
    color: var(--link-color-highlight);
  }
`;

export default ExternalLink;
