import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../../components/Loading';
import BookmarkDetailComponent from '../../components/BookmarkDetail';

import { links as LinksQuery } from '../Dashboard/graphql';

class BookmarkDetail extends React.Component {
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
          const dataCache = cache.readQuery({ query: LinksQuery });
          dataCache.links = dataCache.links.filter(l => l.uuid !== uuid);
          cache.writeQuery({ query: LinksQuery, data: dataCache });
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
    const { link, history } = this.props;
    if (link.loading) {
      return <Loading />;
    }
    return (
      <BookmarkDetailComponent history={history} deleteLink={this.deleteLink} data={link.link} />
    );
  }
}

BookmarkDetail.propTypes = {
  link: PropTypes.object,
  history: PropTypes.object,
  deleteLink: PropTypes.func,
};

// We use the gql tag to parse our query string into a query document
export const link = gql`
  query link($uuid: String!) {
    link(uuid: $uuid) {
      uuid
      url
      image
      crawl
      title
      author
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
  graphql(link, {
    name: 'link',
    options: ownProps => ({ variables: { uuid: ownProps.match.params.uuid } }),
  }),
  graphql(deleteLink, { name: 'deleteLink' }),
)(BookmarkDetail);
