import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Content from '../../components/Content';
import Auth from '../../components/Auth';
import H2 from '../../components/H2';
import P from '../../components/P';

class Logout extends React.Component {
  componentDidMount() {
    Auth.removeToken();
    this.props.auth({
      variables: {
        isAuthenticated: false,
      },
    });
  }
  render() {
    return (
      <Content>
        <Helmet title="Abmeldung erfolgreich | bkmrk" />
        <H2>Erfolgreich abgemeldet</H2>
        <P>Bis zum nächsten mal.</P>
      </Content>
    );
  }
}

Logout.propTypes = {
  auth: PropTypes.func,
};

const auth = gql`
  mutation auth($isAuthenticated: Boolean!) {
    auth(isAuthenticated: $isAuthenticated) @client
  }
`;

export default graphql(auth, { name: 'auth' })(Logout);
