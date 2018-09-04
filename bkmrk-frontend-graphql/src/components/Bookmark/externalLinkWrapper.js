import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ExternalLinkWrapper = ({ url, children }) => (
  <StyledA href={url} target="_blank">
    {children}
  </StyledA>
);

ExternalLinkWrapper.propTypes = {
  url: PropTypes.string,
  children: PropTypes.any,
};

const StyledA = styled.a`
  text-decoration: none;
  color: inherit;
`;

export default ExternalLinkWrapper;
