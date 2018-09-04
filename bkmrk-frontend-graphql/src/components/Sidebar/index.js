import React from 'react';
import styled from 'styled-components';
import { Link as BrowserLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import media from '../../media';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }
  toggle() {
    this.setState((prevState) => {
      return {
        isActive: !prevState.isActive,
      };
    });
  }
  render() {
    const { popular, recent } = this.props;
    const { isActive } = this.state;
    const isMobile = window.innerWidth < 651;
    if (isMobile && !isActive) {
      return (
        <StyledDiv>
          <SidebarButton onClick={() => this.toggle()}>
            <H4>Sidebar einblenden</H4>
          </SidebarButton>
        </StyledDiv>
      );
    }
    return (
      <StyledDiv>
        <H4 onClick={() => this.toggle()}>Häufig verwendet:</H4>
        <List>
          {popular.map(tag => (
            <Item key={`popular-${tag.id}`}>
              <Link to={`/tag/${tag.id}`}>{tag.title}</Link>
            </Item>
          ))}
        </List>
        <H4 onClick={() => this.toggle()}>Zuletzt verwendet:</H4>
        <List>
          {recent.map(tag => (
            <Item key={`recent-${tag.id}`}>
              <Link to={`/tag/${tag.id}`}>{tag.title}</Link>
            </Item>
          ))}
        </List>
      </StyledDiv>
    );
  }
}

Sidebar.propTypes = {
  popular: PropTypes.array,
  recent: PropTypes.array,
};

const SidebarButton = styled.div`
  padding: 0.5em 0;
`;

const Link = styled(BrowserLink)`
  color: inherit;
  text-decoration: none;
  &:before {
    content: '#';
  }
  &:hover {
    color: var(--link-color-highlight);
  }
`;

const StyledDiv = styled.div`
  border-bottom: 2px solid var(--border-color);
  margin-bottom: 1em;
  ${media.tablet`
    margin-bottom: 0;
    border-bottom: none;
    border-right: 2px solid var(--border-color);
    padding-right: 20px;
  `};
`;

const H4 = styled.h4`
  margin: 0;
  color: var(--text-color);
  text-transform: uppercase;
  font-size: 0.8em;
`;

const List = styled.ul`
  margin: 0 0 2em 0;
  padding: 0;
  list-style-type: none;
`;

const Item = styled.li`
  color: var(--text-color);
  margin: 0.7em 0;
  font-size: 0.9em;
`;

export default Sidebar;
