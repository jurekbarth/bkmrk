import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../../components/Loading';
import SidebarComponent from '../../components/Sidebar';

class Sidebar extends React.Component {
  render() {
    const { tags } = this.props;
    if (tags.loading) {
      return <Loading />;
    }
    const { popular, recent } = tags;
    return <SidebarComponent recent={recent} popular={popular} />;
  }
}

Sidebar.propTypes = {
  tags: PropTypes.object,
};

// We use the gql tag to parse our query string into a query document
export const tags = gql`
  query {
    popular: tags(limit: 10, order: "POPULARITY") {
      id
      title
    }
    recent: tags(limit: 10, order: "LATEST_USAGE") {
      id
      title
    }
  }
`;

export default graphql(tags, { name: 'tags' })(Sidebar);
