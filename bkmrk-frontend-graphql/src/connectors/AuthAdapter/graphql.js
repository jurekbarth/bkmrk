import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const AuthAdapter = (props) => {
  const { isAuthenticated } = props.getAuthState;
  return React.cloneElement(props.children, { isAuthenticated });
};

AuthAdapter.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const getAuthState = gql`
  query {
    isAuthenticated @client
  }
`;

export default graphql(getAuthState, { name: 'getAuthState' })(AuthAdapter);
