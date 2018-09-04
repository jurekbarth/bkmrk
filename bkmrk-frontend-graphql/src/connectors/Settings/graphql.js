import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../../components/Loading';
import UserSettings from '../../components/UserSettings';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      status: 0,
    };
  }
  updateUser(data) {
    this.setState(() => {
      return {
        status: 0,
      };
    });
    this.props
      .editUser({
        variables: data,
      })
      .then(({ data }) => {
        console.log('data from editUser', data);
        this.setState(() => {
          return {
            error: null,
            status: 2,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message.toString().replace('GraphQL error: ', '');
        this.setState(() => {
          return {
            error: errorMessage,
            status: 4,
          };
        });
      });
  }
  render() {
    const { user, history } = this.props;
    const { status, error } = this.state;
    if (user.loading) {
      return <Loading />;
    }
    return (
      <UserSettings
        error={error}
        status={status}
        history={history}
        updateUser={this.updateUser}
        data={user.user}
      />
    );
  }
}

Settings.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  editUser: PropTypes.func,
};

// We use the gql tag to parse our query string into a query document
export const user = gql`
  query {
    user {
      firstName
      lastName
      email
      emailVerified
    }
  }
`;

const editUser = gql`
  mutation editUser(
    $firstName: String
    $lastName: String
    $password: String
    $newPassword: String
  ) {
    editUser(
      firstName: $firstName
      lastName: $lastName
      password: $password
      newPassword: $newPassword
    ) {
      firstName
      lastName
      email
      emailVerified
    }
  }
`;

export default compose(graphql(user, { name: 'user' }), graphql(editUser, { name: 'editUser' }))(Settings);
