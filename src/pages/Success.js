import React, { useContext, useState } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import {
  Flex,
  Heading,
  Button,
  useToast,
  useColorModeValue,
  Stack,
  IconButton,
  Link as Anchor,
} from '@chakra-ui/core'

import { LanguageContext } from '../locale/LanguageContext'
import { Trans } from '../locale/Trans'
import { WhiteBox } from '../components/WhiteBox'
import { Layout } from '../components/Layout'
import Document from '../js/document'
import { countriesList } from '../assets/data/groupedCountries'
const api = process.env.REACT_APP_API

function Success() {
  const toast = useToast()
  const [disabled, setDisabled] = useState(false)
  const languageContext = useContext(LanguageContext)
  async function download(code) {
    let doc = new Document()
    const { declaration } = await getDeclaratie(code)
    if (declaration) {
      const documentDate = new Date(
        declaration.created_at
          .toString()
          .substring(0, declaration.created_at.length - 5)
      ).toLocaleDateString('ro-RO')
      const data = {
        locale: languageContext.language,
        code: declaration.code,
        measure: {
          hospital: true,
          quarantine: true,
          isolation: true,
        },
        lastName: declaration.surname,
        firstName: declaration.name,
        idCardNumber: declaration.cnp,
        dateOfBirth: {
          year: declaration.birth_date.split('-')[0],
          month: declaration.birth_date.split('-')[1],
          day: declaration.birth_date.split('-')[2],
        },
        countryDeparture: countriesList.find(
          (country) =>
            country.value === declaration.travelling_from_country_code
        ).label,
        destinationAddress: declaration.home_isolated
          ? declaration.home_address ||
            languageContext.dictionary['homeAddress']
          : `${declaration.isolation_addresses[0].street}, ${declaration.isolation_addresses[0].number},  ${declaration.isolation_addresses[0].bloc},  ${declaration.isolation_addresses[0].entry},  ${declaration.isolation_addresses[0].apartment},  ${declaration.isolation_addresses[0].city},  ${declaration.isolation_addresses[0].county}, `,
        phoneNumber: declaration.phone,
        documentDate: documentDate,
      }
      return doc.download(data)
    }
  }
  const token = localStorage.getItem('token')
  async function getDeclaratie(code) {
    setDisabled(true)
    try {
      const request = await fetch(`${api}/declaration-web/${code}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-API-KEY': process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json',
        },
      })
      const response = await request.json()
      if (response.status === 'success') {
        setDisabled(false)
        return response
      } else {
        let message
        switch (response.message) {
          case 'Unauthorized':
            message = languageContext.dictionary['unauthorized']
            break
          default:
            message = languageContext.dictionary['unknownError']
        }
        setDisabled(false)
        toast({
          title: languageContext.dictionary['error'],
          descripaddingTopion: message,
          status: 'error',
          isClosable: true,
          duration: null,
        })
        return response
      }
    } catch (err) {
      setDisabled(false)
      toast({
        title: languageContext.dictionary['error'],
        descripaddingTopion: err.message,
        status: 'error',
        isClosable: true,
        duration: null,
      })
    }
  }

  return (
    <Layout title="Codurile dumneavoastră">
      <WhiteBox p={[2, 8, 8, 8]}>
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
