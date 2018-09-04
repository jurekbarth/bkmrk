import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import media from '../../media';

// import Grid from '../Grid';

import Bookmark from '../Bookmark';
import Content from '../Content';

import Sidebar from '../../connectors/Sidebar/graphql';

const Dashboard = ({
  tagCount = 0, tag = null, data, deleteLink,
}) => {
  return (
    <StyledDiv>
      <Helmet title={tag !== null ? `${tag} (${tagCount}) | bkmrk` : 'Dashboard | bkmrk'} />
      <Content>
        <Grid>
          <Sidebar />
          <div>
            {tag ? (
              <H4>
                Tag: {tag} ({tagCount})
              </H4>
            ) : null}
            <Wrapper>
              {data.map(l => <Bookmark deleteLink={deleteLink} key={l.uuid} {...l} />)}
            </Wrapper>
          </div>
        </Grid>
      </Content>
    </StyledDiv>
  );
};

Dashboard.propTypes = {
  data: PropTypes.array,
  tagCount: PropTypes.number,
  tag: PropTypes.string,
  deleteLink: PropTypes.func,
};

const H4 = styled.h4`
  margin-top: 0;
  text-transform: uppercase;
  color: var(--text-color);
`;

const StyledDiv = styled.div`
  padding: 0 0 5em;
`;

const Grid = styled.div`
  display: grid;
  grid-column-gap: 20px;
  ${media.tablet`
    grid-template-columns: 200px auto;
  `};
`;

const Wrapper = styled.div`
  display: grid;
  display: grid;
  grid-gap: 20px;
  justify-items: stretch;
  align-items: stretch;
  grid-auto-rows: auto;
  ${media.tablet`
    grid-template-columns: 1fr 1fr 1fr;
  `};
`;

export default Dashboard;
