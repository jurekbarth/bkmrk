import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';

const AuthSkeleton = (props) => {
  return (
    <StyledDiv>
      <Header isAuthenticated />
      <Content>{props.children}</Content>
      <Footer isAuthenticated />
    </StyledDiv>
  );
};

AuthSkeleton.propTypes = {
  children: PropTypes.any,
};

const StyledDiv = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Content = styled.div``;

export default AuthSkeleton;
