import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../../components/Loading';
import BookmarkList from '../../components/BookmarkList';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.deleteLink = this.deleteLink.bind(this);
  }
  deleteLink(uuid) {
    this.props
      .deleteLink({
        variables: {
          uuid,
        },
        update: (cache) => {
          const dataCache = cache.readQuery({ query: links });
          dataCache.links = dataCache.links.filter(l => l.uuid !== uuid);
          cache.writeQuery({ query: links, data: dataCache });
        },
      })
      .then(({ data }) => {
        console.log('data from deletelink', data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { links } = this.props;
    if (links.loading) {
      return <Loading />;
    }
    const linkData = links.links;
    return <BookmarkList deleteLink={this.deleteLink} data={linkData} />;
  }
}

Dashboard.propTypes = {
  links: PropTypes.object,
  deleteLink: PropTypes.func,
};

// We use the gql tag to parse our query string into a query document
export const links = gql`
  query {
    links {
      uuid
      url
      image
      crawl
      title
      excerpt
      tags {
        id
        title
      }
    }
  }
`;

const deleteLink = gql`
  mutation deleteLink($uuid: String!) {
    deleteLink(uuid: $uuid) {
      success
    }
  }
`;

export default compose(
  graphql(links, {
    name: 'links',
    options: {
      pollInterval: 40000,
    },
  }),
  graphql(deleteLink, { name: 'deleteLink' }),
)(Dashboard);
