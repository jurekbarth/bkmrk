import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Error = ({ errorMessage }) => {
  if (errorMessage) {
    return <ErrorMessage>{errorMessage}</ErrorMessage>;
  }
  return null;
};

Error.propTypes = {
  errorMessage: PropTypes.string,
};

const ErrorMessage = styled.p`
  margin: 0.2em 0 0 0;
  color: red;
  font-size: 0.9em;
`;

export default Error;
