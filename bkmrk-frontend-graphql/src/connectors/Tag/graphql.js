import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../../components/Loading';
import BookmarkList from '../../components/BookmarkList';
import { links as LinksQuery } from '../Dashboard/graphql';

class Tag extends React.Component {
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
          const dataCache = cache.readQuery({
            query: tag,
            variables: { id: parseInt(this.props.match.params.id, 10) },
          });
          dataCache.tag.links = dataCache.tag.links.filter(l => l.uuid !== uuid);
          cache.writeQuery({ query: tag, data: dataCache });
          const dataCacheTwo = cache.readQuery({ query: LinksQuery });
          console.log(dataCacheTwo);
          dataCacheTwo.links = dataCacheTwo.links.filter(l => l.uuid !== uuid);
          cache.writeQuery({ query: LinksQuery, data: dataCacheTwo });
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
    const { tag } = this.props;
    if (tag.loading) {
      return <Loading />;
    }
    const linkData = tag.tag.links;
    return (
      <BookmarkList
        tagCount={tag.tag.meta.count}
        tag={tag.tag.title}
        deleteLink={this.deleteLink}
        data={linkData}
      />
    );
    // return null;
  }
}

Tag.propTypes = {
  tag: PropTypes.object,
  deleteLink: PropTypes.func,
  match: PropTypes.object,
};

// We use the gql tag to parse our query string into a query document
export const tag = gql`
  query tag($id: Int!) {
    tag(id: $id) {
      id
      title
      meta {
        count
      }
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
  graphql(tag, {
    name: 'tag',
    options: ownProps => ({
      variables: { id: parseInt(ownProps.match.params.id, 10) },
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(deleteLink, { name: 'deleteLink' }),
)(Tag);
