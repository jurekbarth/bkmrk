import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import H2 from '../H2';
import H3 from '../H3';
import P from '../P';
import Content from '../Content';
import ExternalLink from '../ExternalLink';

const Contact = () => (
  <Content>
    <Helmet title="Kontakt | bkmrk" />
    <Wrapper>
      <H2>Kontakt</H2>
      <H3>Wir freuen uns, von dir zu hören!</H3>
      <P>
        Dir fehlt ein bestimmtes Feature oder du hast eine grandiose Idee? Du möchtest einfach nur
        Hallo sagen? Ganz egal was du uns mitteilen willst, dein Feedback ist uns wichtig. Schreib
        uns doch an <ExternalLink href="mailto:hi@bkmrk.space">hi@bkmrk.space</ExternalLink>
      </P>
    </Wrapper>
  </Content>
);

const Wrapper = styled.div`
  margin-bottom: 4em;
  max-width: 30em;
`;

export default Contact;
