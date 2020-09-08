import React from 'react'
import { Heading } from '@chakra-ui/core'
import { LanguageSelector } from '../components/LanguageSelector'
import { WhiteBox } from '../components/WhiteBox'
import { Layout } from '../components/Layout'

function Home() {
  return (
    <Layout title="Acasă">
      <WhiteBox p={[2, 8, 8, 8]}>
        <Heading
          size="lg"
          as="h1"
          lineHeight="60px"
          fontWeight="black"
          textAlign="center">
          Aici poți imprima declarația de intrare în țară /<br />
          Here you can print your entry statement
        </Heading>
        <LanguageSelector />
      </WhiteBox>
    </Layout>
  )
}
export default Home
