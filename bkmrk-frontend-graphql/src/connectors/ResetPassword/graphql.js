import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ResetPassword from '../../components/ResetPassword';
import Content from '../../components/Content';

class ResetPasswordRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      errorMessage: null,
      redirectSuccess: false,
    };
  }
  sendData(d) {
    console.log(d);
    const { email, password } = d;
    const { token } = this.props.match.params;
    console.log(this.props.match.params.token);
    this.props
      .resetUserPassword({
        variables: {
          email,
          password,
          token,
        },
      })
      .then(({ data }) => {
        console.log(data);
        this.setState(() => {
          return { redirectSuccess: true };
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
      return <Redirect to="/login" />;
    }
    const { sending, errorMessage } = this.state;
    return (
      <Content>
        <Helmet title="Passwort vergessen | bkmrk" />
        <ResetPassword
          errorMessage={errorMessage}
          sending={sending}
          sendData={data => this.sendData(data)}
        />
      </Content>
    );
  }
}

ResetPasswordRequest.propTypes = {
  resetUserPassword: PropTypes.func,
  match: PropTypes.object,
};

// We use the gql tag to parse our query string into a query document
const resetUserPassword = gql`
  mutation resetUserPassword($email: String!, $token: String!, $password: String!) {
    resetUserPassword(email: $email, token: $token, password: $password) {
      success
    }
  }
`;

export default graphql(resetUserPassword, { name: 'resetUserPassword' })(ResetPasswordRequest);
