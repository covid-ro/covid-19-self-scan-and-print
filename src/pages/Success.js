import React, { useContext } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import { Heading, Button, useToast, Link as Anchor } from '@chakra-ui/core'

import { LanguageContext } from '../locale/LanguageContext'
import { Trans } from '../locale/Trans'
import { WhiteBox } from '../components/WhiteBox'
import { Layout } from '../components/Layout'

function Success() {
  const toast = useToast()
  const languageContext = useContext(LanguageContext)

  return (
    <Layout title="Codurile dumneavoastră">
      <WhiteBox p="8">
        <Heading textAlign="center" marginBottom="12">
          <Trans id="yourCodesLabel" />
        </Heading>

        <Heading size="md" lineHeight="32px" fontWeight="bold">
          <Trans id="finishScreenFirstLine" />
        </Heading>
      </WhiteBox>
    </Layout>
  )
}
export default Success
