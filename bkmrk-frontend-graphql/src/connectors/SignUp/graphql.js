import React from 'react';
import Helmet from 'react-helmet';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import SignUpComponent from '../../components/SignUp';
import Content from '../../components/Content';
import Auth from '../../components/Auth';

class SignUp extends React.Component {
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
      .register({
        variables: d,
      })
      .then(({ data }) => {
        console.log('got data', data);
        const { token } = data.registerUser;
        console.log(token);
        Auth.setToken(token);
        this.props.auth({
          variables: {
            isAuthenticated: true,
          },
        });
        this.setState(() => {
          return { redirectSuccess: true };
        });
      })
      .catch((error) => {
        console.log(error);
        const { message } = error;
        let errorMessage = message;
        if (message.startsWith("GraphQL error: There's already a user registered with email")) {
          errorMessage = 'email';
        }
        this.setState(() => {
          return { errorMessage };
        });
      });
  }
  render() {
    if (this.state.redirectSuccess) {
      return <Redirect to="/signup/success" />;
    }
    const { sending, errorMessage } = this.state;
    return (
      <Content>
        <Helmet title="Registrieren | bkmrk" />
        <SignUpComponent
          errorMessage={errorMessage}
          sending={sending}
          sendData={data => this.sendData(data)}
        />
      </Content>
    );
  }
}

SignUp.propTypes = {
  register: PropTypes.func,
  auth: PropTypes.func,
};

// We use the gql tag to parse our query string into a query document
const register = gql`
  mutation registerUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
    }
  }
`;

const auth = gql`
  mutation auth($isAuthenticated: Boolean!) {
    auth(isAuthenticated: $isAuthenticated) @client
  }
`;

export default compose(graphql(register, { name: 'register' }), graphql(auth, { name: 'auth' }))(SignUp);
