import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import H2 from '../H2';
import P from '../P';
import Content from '../Content';
import Link from '../Link';

const NotFound = () => (
  <Content>
    <Helmet title="404 | bkmrk" />
    <Wrapper>
      <H2>Die Seite konnte nicht gefunden werden!</H2>
      <P>
        Am besten du fängst wieder auf der <Link to="/">Startseite</Link> an.
      </P>
    </Wrapper>
  </Content>
);

const Wrapper = styled.div`
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default NotFound;
