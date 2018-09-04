import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import P from '../P';
import Content from '../Content';

const AddButton = () => <StyledAddButton to="/link/new" />;

const StyledAddButton = styled(RouterLink)`
  z-index: 999;
  position: fixed;
  bottom: 16px;
  right: 16px;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  background-color: var(--button);
  text-shadow: var(--button-text-shadow);
  color: white;
  display: flex;
  cursor: pointer;
  box-shadow: var(--box-shadow);
  text-decoration: none;
  &:before {
    content: '+';
    font-weight: 200;
    font-size: 2em;
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Footer = ({ isAuthenticated = false }) => (
  <StyledDiv>
    <Content>
      <Wrapper>
        <P>© bkmrk 2018</P>
        <Link to="/imprint">Impressum</Link>
        <Link to="/privacy">Datenschutz</Link>
        <Link to="/contact">Kontakt</Link>
        {isAuthenticated ? null : <Link to="/login">Anmelden</Link>}
        {isAuthenticated ? null : <Link to="/signup">Registrieren</Link>}
      </Wrapper>
    </Content>
    {isAuthenticated && window.innerWidth < 650 ? <AddButton /> : null}
  </StyledDiv>
);

Footer.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const Link = styled(RouterLink)`
  color: var(--text-color);
  text-decoration: none;
  margin: 0 0 0 1em;
  padding: 0.3em;
  &:hover {
    color: var(--text-color-hightlight);
  }
`;

const Wrapper = styled.div`
  margin: 3em 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const StyledDiv = styled.div`
  border-top: 2px solid var(--border-color);
`;

export default Footer;
