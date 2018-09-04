import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import H2 from '../H2';
import P from '../P';
import Content from '../Content';

const VerifyEmail = ({ state }) => {
  if (state === null) {
    return (
      <Content>
        <Helmet title="Emailadresse verifizieren | bkmrk" />
        <H2>Wir verifizieren gerade deine Email...</H2>
        <P>Bitte schließe diesen Seite nicht.</P>
      </Content>
    );
  } else if (state === false) {
    return (
      <Content>
        <Helmet title="Fehler | bkmrk" />
        <H2>Das ist wohl etwas schief gelaufen :(</H2>
      </Content>
    );
  }
  return (
    <Content>
      <Helmet title="Emailadresse verifiziert | bkmrk" />
      <H2>Danke!</H2>
      <P>Du hast deine Email verifiziert. Du kannst jetzt voll loslegen! Viel Spaß :)</P>
    </Content>
  );
};

VerifyEmail.propTypes = {
  state: PropTypes.any,
};

export default VerifyEmail;
