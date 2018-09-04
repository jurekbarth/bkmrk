import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CloseIcon from '../CloseIcon';
import Link from '../Link';
import ExternalLink from '../ExternalLink';

const DEV = process.env.NODE_ENV;

const Overlay = ({ toggleOverlay, uuid, deleteLink }) => {
  let baseUrl = 'https://reader.bkmrk.space';
  if (DEV === 'development') {
    baseUrl = 'http://localhost:3005';
  }
  return (
    <StyledOverlay>
      <p>
        <ExternalLink href={`${baseUrl}/${uuid}`} target="_blank">
          Reader öffnen
        </ExternalLink>
      </p>

      <p>
        <Link to={`/link/${uuid}`}>Details</Link>
      </p>
      <p>
        <Link to={`/link/${uuid}/edit`}>Bearbeiten</Link>
      </p>
      <DeleteButton onClick={() => deleteLink(uuid)}>Löschen</DeleteButton>
      <CloseButton onClick={() => toggleOverlay()}>
        <CloseIcon />
      </CloseButton>
    </StyledOverlay>
  );
};

Overlay.propTypes = {
  toggleOverlay: PropTypes.func,
  uuid: PropTypes.string,
  deleteLink: PropTypes.func,
};

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    color: var(--link-color-highlight);
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default Overlay;
