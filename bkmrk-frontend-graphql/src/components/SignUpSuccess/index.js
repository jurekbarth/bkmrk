import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import H2 from '../H2';
import P from '../P';
import Content from '../Content';

const SignUpSuccess = () => {
  return (
    <Content>
      <Helmet title="Erfolgreich angemeldet | bkmrk" />
      <Wrapper>
        <H2>Nur noch ein letzter Schritt</H2>
        <P>
          Du hast du hast dich erfolgreich registriert. Wir haben dir eine Email geschickt mit einem
          Aktivierungslink. Klicke auf den Link in der Email, um deinen Account zu aktivieren.
        </P>
      </Wrapper>
    </Content>
  );
};

const Wrapper = styled.div`
  max-width: 40em;
`;

export default SignUpSuccess;
