import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import VerifyEmailComponent from '../../components/VerifyEmail';

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validation: null,
    };
  }
  componentWillMount() {
    const { token } = this.props.match.params;
    if (token.length > 10) {
      this.props
        .validateUserEmail({
          variables: { token },
        })
        .then(({ data }) => {
          console.log('got data', data);
          if (data.validateUserEmail.success === true) {
            this.setState({ validation: true });
          } else {
            this.setState({ validation: false });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ validation: false });
        });
    } else {
      this.setState({ validation: false });
    }
  }
  render() {
    return <VerifyEmailComponent state={this.state.validation} />;
  }
}

VerifyEmail.propTypes = {
  match: PropTypes.object,
  validateUserEmail: PropTypes.func,
};

// We use the gql tag to parse our query string into a query document
const validateUserEmail = gql`
  mutation validateUserEmail($token: String!) {
    validateUserEmail(token: $token) {
      success
    }
  }
`;

export default graphql(validateUserEmail, { name: 'validateUserEmail' })(VerifyEmail);
