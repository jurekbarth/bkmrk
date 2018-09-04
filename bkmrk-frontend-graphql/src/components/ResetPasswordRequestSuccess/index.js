import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import H2 from '../H2';
import P from '../P';
import Content from '../Content';
import ExternalLink from '../ExternalLink';

const ResetPasswordRequestSuccess = () => (
  <Content>
    <Helmet title="Wir haben die Post geschickt | bkmrk" />
    <Wrapper>
      <H2>Noch ein letzter Schritt...</H2>
      <P>Wir haben dir eine Email geschickt mit einem Link zum zurücksetzen deines Passworts.</P>
      <P>
        Du hast keine Email bekommen? Schreib uns doch an{' '}
        <ExternalLink href="mailto:hi@bkmrk.space">hi@bkmrk.space</ExternalLink>
      </P>
    </Wrapper>
  </Content>
);

const Wrapper = styled.div`
  margin-bottom: 4em;
  max-width: 30em;
`;

export default ResetPasswordRequestSuccess;
