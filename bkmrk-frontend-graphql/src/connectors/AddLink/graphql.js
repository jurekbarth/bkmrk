import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import AddLinkComponent from '../../components/AddLink';

import { links as LinksQuery } from '../Dashboard/graphql';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      errorMessage: null,
      url: null,
    };
  }
  sendData(d) {
    this.props
      .addLink({
        variables: d,
        update: (cache, { data }) => {
          const dataCache = cache.readQuery({ query: LinksQuery });
          dataCache.links = [data.addLink, ...dataCache.links];
          console.log(dataCache);
          cache.writeQuery({ query: LinksQuery, data: dataCache });
        },
      })
      .then(({ data }) => {
        console.log('data from addLink');
        console.log(data.addLink.url);
        this.setState(() => {
          return { url: data.addLink.url, errorMessage: null };
        });
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message.toString().replace('GraphQL error: ', '');
        this.setState(() => {
          return { errorMessage };
        });
      });
  }
  render() {
    const { sending, errorMessage, url } = this.state;
    const { toggleAddLink } = this.props;
    let standalone = false;
    if (this.props.match) {
      standalone = true;
    }
    return (
      <AddLinkComponent
        standalone={standalone}
        toggleAddLink={() => toggleAddLink()}
        errorMessage={errorMessage}
        sending={sending}
        url={url}
        sendData={data => this.sendData(data)}
      />
    );
  }
}

Login.propTypes = {
  match: PropTypes.object,
  addLink: PropTypes.func,
  toggleAddLink: PropTypes.func,
};

// We use the gql tag to parse our query string into a query document
const addLink = gql`
  mutation addLink($url: String!, $tags: [InputTag]) {
    addLink(url: $url, tags: $tags) {
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

export default graphql(addLink, { name: 'addLink' })(Login);
