import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import media from '../../media';

import Logo from '../Logo';
import AddLink from '../../connectors/AddLink/graphql';

const MenuItem = ({ to, children }) => (
  <StyledMenuItem>
    <StyledLink to={to}>{children}</StyledLink>
  </StyledMenuItem>
);

MenuItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any,
};

const StyledMenuItem = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5em;
  transition: color 0.15s ease;
  font-size: 0.9em;
  &:hover {
    color: hsla(0, 0%, 100%, 0.5);
  }
  ${media.tablet`
    font-size: 1rem;
    margin-left: 2em;
  `};
`;

const MenuItemButton = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  text-decoration: none;
  padding: 0.5em;
  transition: color 0.15s ease;
  margin-left: 2em;
  cursor: pointer;
  &:hover {
    color: hsla(0, 0%, 100%, 0.5);
  }
`;

const Menu = () => (
  <StyledMenu>
    <MenuItem to="/signup">Registrieren</MenuItem>
    <MenuItem to="/login">Anmelden</MenuItem>
  </StyledMenu>
);

const AuthMenu = ({ toggleAddLink }) => (
  <StyledMenu>
    {window.innerWidth > 650 ? (
      <StyledMenuItem>
        <MenuItemButton onClick={() => toggleAddLink()}>Hinzufügen</MenuItemButton>
      </StyledMenuItem>
    ) : null}
    <MenuItem to="/settings">Einstellungen</MenuItem>
    <MenuItem to="/logout">Abmelden</MenuItem>
  </StyledMenu>
);

AuthMenu.propTypes = {
  toggleAddLink: PropTypes.func,
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addLink: false,
    };
  }
  toggleAddLink() {
    this.setState((prevState) => {
      return { addLink: !prevState.addLink };
    });
  }
  render() {
    const { addLink } = this.state;
    const { isAuthenticated = false } = this.props;
    return (
      <div>
        <HeaderWrapper>
          <StyledHeader>
            <Logo color="#ffffff" />
            {isAuthenticated ? <AuthMenu toggleAddLink={() => this.toggleAddLink()} /> : <Menu />}
          </StyledHeader>
        </HeaderWrapper>
        {isAuthenticated && addLink ? <AddLink toggleAddLink={() => this.toggleAddLink()} /> : null}
      </div>
    );
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const HeaderWrapper = styled.div`
  position: relative;
  background: linear-gradient(150deg, #53f 15%, #229aff 70%, #2cdff2 94%);
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 500;
  max-width: 68em;
  margin: 0 auto;
  padding: 0 1em;
`;

const StyledMenu = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
`;

export default Header;
