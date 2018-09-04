import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../../components/Loading';
import BookmarkEditComponent from '../../components/BookmarkEdit';

import { links as LinksQuery } from '../Dashboard/graphql';

class BookmarkEdit extends React.Component {
  constructor(props) {
    super(props);
    this.deleteLink = this.deleteLink.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.state = {
      status: 0,
    };
  }
  updateLink(data) {
    this.setState(() => {
      return {
        status: 0,
      };
    });
    this.props
      .editLink({
        variables: data,
        update: (cache, d) => {
          const dataCache = cache.readQuery({ query: LinksQuery });
          dataCache.links = dataCache.links.map((link) => {
            if (link.uuid === d.data.editLink.uuid) {
              return d.data.editLink;
            }
            return link;
          });
          cache.writeQuery({ query: LinksQuery, data: dataCache });
        },
      })
      .then(({ data }) => {
        console.log('data from updatelink', data);
        this.setState(() => {
          return {
            status: 2,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState(() => {
          return {
            status: 4,
          };
        });
      });
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
    const { status } = this.state;
    if (link.loading) {
      return <Loading />;
    }
    return (
      <BookmarkEditComponent
        status={status}
        history={history}
        updateLink={this.updateLink}
        deleteLink={this.deleteLink}
        data={link.link}
      />
    );
  }
}

BookmarkEdit.propTypes = {
  link: PropTypes.object,
  history: PropTypes.object,
  deleteLink: PropTypes.func,
  editLink: PropTypes.func,
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

const editLink = gql`
  mutation editLink(
    $uuid: String!
    $title: String!
    $author: String!
    $excerpt: String!
    $tags: [InputTag]
  ) {
    editLink(uuid: $uuid, title: $title, author: $author, excerpt: $excerpt, tags: $tags) {
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
  graphql(link, {
    name: 'link',
    options: ownProps => ({ variables: { uuid: ownProps.match.params.uuid } }),
  }),
  graphql(editLink, { name: 'editLink' }),
  graphql(deleteLink, { name: 'deleteLink' }),
)(BookmarkEdit);
