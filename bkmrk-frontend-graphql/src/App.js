import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';

import Router from './routes';

import './global-styles';

const theme = {
  backgroundColor: '#F5F5F5',
  white: '#F5F8FA',
  grey: '#E1E8ED',
  greyDark: '#7C8A98',
  dark: '#343940',
  black: '#252525',
  signal: '#E00519',
  green: '#79A026',
  red: '#E00519',
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    );
  }
}

export default App;
