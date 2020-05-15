import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContent from './App';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from '@apollo/react-hooks';
import * as serviceWorker from './serviceWorker';

const link = new createHttpLink({ uri: 'http://api ---replace-me---' });

// Fixes readQuery to return undefined on an error (bit of a hack)
const cache = new InMemoryCache();
cache.originalReadQuery = cache.readQuery;
cache.readQuery = (...args) => {
  try {
    return cache.originalReadQuery(...args);
  } catch (err) {
    return undefined;
  }
};

const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
});

const App = () => (
  <ApolloProvider client={client}>
    <AppContent />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
