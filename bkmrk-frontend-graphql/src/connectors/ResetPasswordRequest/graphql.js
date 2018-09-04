import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import ResetPasswordRequestComponent from '../../components/ResetPasswordRequest';
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
    this.props
      .requestUserResetPassword({
        variables: d,
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
      return <Redirect to="/resetPassword/success" />;
    }
    const { sending, errorMessage } = this.state;
    return (
      <Content>
        <Helmet title="Passwort vergessen | bkmrk" />
        <ResetPasswordRequestComponent
          errorMessage={errorMessage}
          sending={sending}
          sendData={data => this.sendData(data)}
        />
      </Content>
    );
  }
}

ResetPasswordRequest.propTypes = {
  requestUserResetPassword: PropTypes.func,
};

// We use the gql tag to parse our query string into a query document
const requestUserResetPassword = gql`
  mutation requestUserResetPassword($email: String!) {
    requestUserResetPassword(email: $email) {
      success
    }
  }
`;

export default graphql(requestUserResetPassword, { name: 'requestUserResetPassword' })(ResetPasswordRequest);
