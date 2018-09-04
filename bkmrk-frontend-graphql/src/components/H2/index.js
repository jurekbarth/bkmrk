import styled from 'styled-components';

import media from '../../media';

const H2 = styled.h2`
  color: var(--black);
  font-size: 1.8em;
  ${media.tablet`
    font-size: 2.5em;
  `};
`;

export default H2;
