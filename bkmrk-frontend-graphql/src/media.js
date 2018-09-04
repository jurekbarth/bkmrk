import { css } from 'styled-components';

const sizes = {
  desktop: [1025, 6000],
  tablet: [651, 6000],
  phone: [0, 650],
};

// iterate through the sizes and create a media template
const targetMedia = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const minSize = sizes[label][0] / 16;
  const maxSize = sizes[label][1] / 16;
  // eslint-disable-next-line
  accumulator[label] = (...args) => css`
    @media (min-width: ${minSize}em) and (max-width: ${maxSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export default targetMedia;
