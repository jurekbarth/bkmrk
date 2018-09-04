import React from 'react';
import styled, { keyframes } from 'styled-components';

const images = [1, 3, 5, 7, 9, 11, 13, 15];

const images2 = [2, 4, 6, 8, 10, 12, 14];

const Websites = () => (
  <Grid>
    <Col>{images.map(el => <Image delay={el} key={el} src={`/websites/Image${el}.png`} />)}</Col>
    <Col>{images2.map(el => <Image delay={el} key={el} src={`/websites/Image${el}.png`} />)}</Col>
  </Grid>
);

const SlideImage = keyframes`
  0% {
    opacity: 0;
    transform: translate(3px, 12px)
  }
  100% {
    opacity: 1;
    transform: translate(0, 0)
  }
`;

const Grid = styled.div`
  width: 40vw;
  position: absolute;
  transform: translate(6px, 25px) rotate(-12deg);
  transform-origin: 0;
  z-index: 100;
  right: -100px;
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  flex: 1 1;
  margin-right: 1em;
`;

const delayer = (props) => {
  const delay = props.delay * 0.066666667;
  return `${delay}s`;
};

const Image = styled.img`
  width: 100%;
  margin-bottom: 1em;
  opacity: 0;
  animation-name: ${SlideImage};
  animation-duration: 0.2s;
  animation-direction: alternate;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-delay: ${props => delayer(props)};
`;

export default Websites;
