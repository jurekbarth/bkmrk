import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MoreIcon from '../MoreIcon';

import Tags from './tags';
import ExternalLinkWrapper from './externalLinkWrapper';
import Overlay from './overlay';
import Image from './image';

class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false,
    };
  }
  toggleOverlay() {
    this.setState((prevState) => {
      return { overlay: !prevState.overlay };
    });
  }
  render() {
    const { overlay } = this.state;
    const {
      uuid, title, excerpt, url, tags, crawl, image, deleteLink,
    } = this.props;
    const urlParts = url.split('/');
    const baseUrl = urlParts[2];
    return (
      <StyledDiv>
        <a href={url} target="_blank">
          <Image crawl={crawl} image={image} uuid={uuid} />
        </a>
        <InfoWrapper>
          <ExternalLinkWrapper url={url}>
            <BaseUrl>{baseUrl}</BaseUrl>
            <Title>{crawl ? 'Wir suchen gerade noch die Infos zusammen...' : title}</Title>
          </ExternalLinkWrapper>
          <ExternalLinkWrapper url={url}>
            <Excerpt>{excerpt}</Excerpt>
          </ExternalLinkWrapper>
          {tags.length > 0 ? <Tags tags={tags} /> : null}
        </InfoWrapper>
        <MoreButton onClick={() => this.toggleOverlay()}>
          <MoreIcon />
        </MoreButton>
        {overlay ? (
          <Overlay deleteLink={deleteLink} uuid={uuid} toggleOverlay={() => this.toggleOverlay()} />
        ) : null}
      </StyledDiv>
    );
  }
}

Bookmark.propTypes = {
  uuid: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
  url: PropTypes.string,
  tags: PropTypes.array,
  crawl: PropTypes.bool,
  image: PropTypes.string,
  deleteLink: PropTypes.func,
};

const StyledDiv = styled.div`
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

const MoreButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 0.4em;
  color: var(--text-color);
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: var(--links-color-highlight);
  }
`;

const InfoWrapper = styled.div`
  position: relative;
  padding: 0.5em;
  border-top: 1px solid var(--border-color);
`;

const Title = styled.h4`
  margin: 0.5em 0;
`;

const BaseUrl = styled.p`
  margin: 0;
  font-size: 0.8em;
  color: var(--text-color);
`;
const Excerpt = styled.p`
  font-size: 0.9em;
  color: var(--text-color);
  margin: 0;
`;

export default Bookmark;
