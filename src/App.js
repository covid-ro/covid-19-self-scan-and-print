import { hot } from 'react-hot-loader/root'
import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Spinner, Center } from '@chakra-ui/core'
const Home = lazy(() => import('./pages/Home'))
const Start = lazy(() => import('./pages/Start'))
const Success = lazy(() => import('./pages/Success'))
const End = lazy(() => import('./pages/End'))
const NoMatch = lazy(() => import('./pages/NoMatch'))

function App() {
  return (
    <Suspense
      fallback={
        <Center width="full" height="100vh">
          <Spinner
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.500"
            size="xl"
          />
        </Center>
      }>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/start">
          <Start />
        </Route>
        <Route path="/succes">
          <Success />
        </Route>
        <Route path="/multumim">
          <End />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Suspense>
  )
}
export default hot(App)
