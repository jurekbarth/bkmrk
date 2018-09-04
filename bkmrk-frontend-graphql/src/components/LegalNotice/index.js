import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import H2 from '../H2';
import H3 from '../H3';
import P from '../P';
import Content from '../Content';

const LegalNotice = () => (
  <Content>
    <Helmet title="Impressum | bkmrk" />
    <Wrapper>
      <H2>Impressum nach §5 TMG</H2>
      <P>Jurek Barth</P>
      <P>Pelkhovenstr. 70, 80992 München, Deutschland</P>
      <H3>Kontakt</H3>
      <P>hi@bkmrk.space</P>
      <H3>Haftung für Inhalte</H3>
      <P>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
        Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
        allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
        allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
        ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
        von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </P>
    </Wrapper>
  </Content>
);

const Wrapper = styled.div`
  margin-bottom: 4em;
  max-width: 50em;
`;

export default LegalNotice;
