import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';

const Skeleton = (props) => {
  return (
    <StyledDiv>
      <Header stripes />
      {props.children}
      <Footer />
    </StyledDiv>
  );
};

Skeleton.propTypes = {
  children: PropTypes.any,
};

const StyledDiv = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

export default Skeleton;
