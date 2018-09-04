import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Auth from '../Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        (Auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }, // eslint-disable-line
            }}
          />
        ))
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

const Error = styled.p`
  color: red;
  font-size: 20px;
  font-weight: bold;
`;

const C = () => <Error>Error: Please pass a component...</Error>;

PrivateRoute.defaultProps = {
  component: C,
};

export default PrivateRoute;
