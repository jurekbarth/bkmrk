import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const cloudinaryBaseUrl =
  'https://res.cloudinary.com/dxdpmbqgi/image/upload/c_fill,f_auto,g_north,h_190,q_auto:good,w_280/';

const Image = ({ crawl, image, uuid }) => {
  if (crawl) return null;
  if (image) return <StyledImage src={image} />;
  return <StyledImage src={`${cloudinaryBaseUrl}${uuid}.jpg`} />;
};

Image.propTypes = {
  crawl: PropTypes.bool,
  image: PropTypes.string,
  uuid: PropTypes.string,
};

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

export default Image;
