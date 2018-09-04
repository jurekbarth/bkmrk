import React from 'react';
import styled from 'styled-components';

import media from '../../media';

const Stripes = () => {
  return (
    <StyledStripes>
      <Span1 />
      <Span2 />
      <Span3 />
      <Span4 />
      <Span5 />
    </StyledStripes>
  );
};

const StyledStripes = styled.div`
  position: absolute;
  background: linear-gradient(150deg, #53f 15%, #05d5ff 70%, #a6ffcb 94%);
  width: 100vw;
  top: 0;
  left: 0;
  overflow: hidden;
  transform: skewY(-12deg);
  transform-origin: 0;
  height: 440px;
  ${media.tablet`
    height: 760px;
  `};
`;

const Span1 = styled.span`
  position: absolute;
  height: 110px;
  width: 50%;
  left: -16.66666%;
  background-color: #53f;
  ${media.tablet`
    height: 190px;
    width: 33.33333%;
    left: -16.66666%;
  `};
`;

const Span2 = styled.span`
  position: absolute;
  height: 190px;
  width: 33.33333%;
  left: 16.66666%;
  right: auto;
  background-color: #4553ff;
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

const Span3 = styled.span`
  position: absolute;
  height: 190px;
  width: 33.33333%;
  left: 49.99999%;
  background-color: #4f40ff;
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

const Span4 = styled.span`
  position: absolute;
  height: 110px;
  width: 50%;
  right: -16.66666%;
  top: 380px;
  background-color: #25ddf5;
  ${media.tablet`
    height: 190px;
    width: 33.33333%;
    right: -16.66666%;
  `};
`;

const Span5 = styled.span`
  position: absolute;
  height: 190px;
  width: 33.33333%;
  bottom: 0;
  background-color: #1fa2ff;
  display: none;
  ${media.tablet`
    display: block;
  `};
`;

export default Stripes;
