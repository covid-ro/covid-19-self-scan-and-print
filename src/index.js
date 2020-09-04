import React from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider, CSSReset } from '@chakra-ui/core'
import theme from './chakra'
import { LanguageProvider } from './locale/LanguageContext'

import App from './App'
import ScrollToTop from './components/ScrollToTop'

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <LanguageProvider>
      <Helmet
        titleTemplate={`%s | Covid-SAFE@Frontieră Imprimare Declarație`}
      />
      <CSSReset />
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </LanguageProvider>
  </ChakraProvider>,
  document.getElementById('root')
)
