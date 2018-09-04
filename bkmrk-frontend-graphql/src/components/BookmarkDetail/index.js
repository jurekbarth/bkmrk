import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Content from '../Content';
import H3 from '../H3';
import P from '../P';
import ExternalLink from '../ExternalLink';
import Link from '../Link';
import Tags from '../Bookmark/tags';

const ArrowLeft = () => (
  <svg fill="inherit" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
    <path d="M0-.5h24v24H0z" fill="none" />
  </svg>
);

const cloudinaryUrl = (width, height, uuid) =>
  `https://res.cloudinary.com/dxdpmbqgi/image/upload/c_fill,f_auto,g_north,h_${height},q_auto:good,w_${width}/${uuid}`;

const DEV = process.env.NODE_ENV;

const BookmarkDetail = ({ data, history }) => {
  const {
    uuid, title, excerpt, url, author, tags,
  } = data;
  let width = window.innerWidth;
  if (width > 1056) {
    width = 1056;
  }
  const height = Math.floor(0.678571429 * width);
  const imageUrl = cloudinaryUrl(width, height, uuid);

  let readerBaseUrl = 'https://reader.bkmrk.space';
  if (DEV === 'development') {
    readerBaseUrl = 'http://localhost:3005';
  }
  return (
    <Content>
      <ExternalLink href={url} target="_blank">
        <Image src={imageUrl} alt="Website Screenshot" />
      </ExternalLink>
      <ButtonWrapper>
        <Backbutton onClick={() => history.goBack()}>
          <ArrowLeft />
          <span>Zurück zur Übersicht</span>
        </Backbutton>
        <ExternalLink href={`${readerBaseUrl}/${uuid}`} target="_blank">
          Reader öffnen
        </ExternalLink>
        <Link to={`/link/${uuid}/edit`}>Bearbeiten / Löschen</Link>
      </ButtonWrapper>
      <ExternalLink href={url} target="_blank">
        <H3>{title}</H3>
        {author ? <Author>-- {author}</Author> : null}
        <P>{excerpt}</P>
      </ExternalLink>
      {tags.length > 0 ? <Tags tags={tags} /> : null}
    </Content>
  );
};

BookmarkDetail.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
};

const ButtonWrapper = styled.div`
  margin: 1em 0;
  padding-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
`;

const Backbutton = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  align-items: center;
  padding: 0;
  cursor: pointer;
  color: var(--link-color);
  &:hover {
    color: var(--link-color-highlight);
  }
`;

const Author = styled.p`
  color: var(--text-color);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid var(--border-color);
  border-radius: 3px;
`;

export default BookmarkDetail;
