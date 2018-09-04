import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

import 'sanitize.css/sanitize.css';

import App from './App';

import { defaults, resolvers } from './clientState';

const DEV = process.env.NODE_ENV === 'development';

let endpoint = 'https://api.bkmrk.space/graphql';
if (DEV) {
  endpoint = 'http://localhost:3000/graphql';
}

const httpLink = createHttpLink({
  uri: endpoint,
});

const cache = new InMemoryCache();

const stateLink = withClientState({ resolvers, cache, defaults });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
  cache,
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
