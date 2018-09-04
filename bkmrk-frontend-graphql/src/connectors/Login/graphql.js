import React from 'react';
import Helmet from 'react-helmet';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginComponent from '../../components/Login';
import Content from '../../components/Content';
import Auth from '../../components/Auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      errorMessage: null,
      redirectSuccess: false,
    };
  }
  sendData(d) {
    this.props
      .login({
        variables: d,
      })
      .then(({ data }) => {
        const { token } = data.login;
        Auth.setToken(token);
        this.setState(() => {
          return { redirectSuccess: true };
        });
        this.props.auth({
          variables: {
            isAuthenticated: true,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message.toString().replace('GraphQL error: ', '');
        this.setState(() => {
          return { errorMessage };
        });
      });
  }
  render() {
    if (this.state.redirectSuccess) {
      return <Redirect to="/" />;
    }
    const { sending, errorMessage } = this.state;
    return (
      <Content>
        <Helmet title="Anmelden | bkmrk" />
        <LoginComponent
          errorMessage={errorMessage}
          sending={sending}
          sendData={data => this.sendData(data)}
        />
      </Content>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  auth: PropTypes.func,
};

// We use the gql tag to parse our query string into a query document
const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const auth = gql`
  mutation auth($isAuthenticated: Boolean!) {
    auth(isAuthenticated: $isAuthenticated) @client
  }
`;

export default compose(graphql(login, { name: 'login' }), graphql(auth, { name: 'auth' }))(Login);
