import React from 'react'
import { Helmet } from 'react-helmet'
import { Footer } from './Footer'
import { Main } from './Main'
export function Layout({ children, title }) {
  return (
    <>
      <Helmet title={title} />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
