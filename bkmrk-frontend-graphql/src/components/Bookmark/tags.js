import React from 'react';
import styled from 'styled-components';
import { Link as BrowserLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Tag = (data) => {
  return <Link to={`/tag/${data.id}`}>{data.title}</Link>;
};

const Link = styled(BrowserLink)`
  color: var(--text-color);
  font-size: 0.9em;
  text-decoration: none;
  display: block;
  &:before {
    content: '#';
  }
  margin-right: 0.4em;
  &:hover {
    text-decoration: underline;
  }
`;

const Tags = ({ tags }) => {
  return <TagsGrid>{tags.map(tag => <Tag key={tag.id} {...tag} />)}</TagsGrid>;
};

Tags.propTypes = {
  tags: PropTypes.array,
};

const TagsGrid = styled.div`
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  margin: 0.5em 0 0;
  padding: 0.5em 40px 0.5em 0;
`;

export default Tags;
