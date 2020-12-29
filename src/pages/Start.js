import React, { useContext, useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Heading, Box, Input, useToast, Center, Spinner, Divider } from '@chakra-ui/core'

import { LanguageContext } from '../locale/LanguageContext'
import { Trans } from '../locale/Trans'
import { WhiteBox } from '../components/WhiteBox'
import { Layout } from '../components/Layout'
import Document from '../js/document'
import { countriesList } from '../assets/data/groupedCountries'
const api = process.env.REACT_APP_API

function Start() {
  const toast = useToast()
  const history = useHistory()
  const [qrCode, setQrCode] = useState('')
  const [disabled, setDisabled] = useState(false)
  const languageContext = useContext(LanguageContext)
  const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus()
    }

    return [htmlElRef, setFocus]
  }
  const [inputRef, setInputFocus] = useFocus()
  useEffect(() => {
    document.addEventListener('mousedown', handleClick) // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })
  const handleClick = (e) => {
    if (inputRef.current.contains(e.target)) {
      // inside click
      return
    } // outside click
    setTimeout(() => {
      setInputFocus()
    }, 100)
  }
  async function preview(code) {
    let doc = new Document()
    const verifiedCode = /\b\d{7}\b \b\w{5,20}\b/gm.test(code)
    if (!verifiedCode) {
      toast({
        title: languageContext.dictionary['error'],
        description: languageContext.dictionary['invalidCode'],
        status: 'error',
        isClosable: true,
        duration: null,
      })
      setDisabled(false)
      return
    }
    const { declaration } = await getDeclaratie(code)
    if (declaration) {
      const documentDate = new Date(
        declaration.created_at.toString().substring(0, declaration.created_at.length - 5)
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
        countryDeparture: countriesList.find((country) => country.value === declaration.travelling_from_country_code).label,
        destinationAddress: declaration.home_isolated
          ? declaration.home_address || languageContext.dictionary['homeAddress']
          : `${declaration.isolation_addresses[0].street}, ${declaration.isolation_addresses[0].number},  ${declaration.isolation_addresses[0].bloc},  ${declaration.isolation_addresses[0].entry},  ${declaration.isolation_addresses[0].apartment},  ${declaration.isolation_addresses[0].city},  ${declaration.isolation_addresses[0].county}, `,
        phoneNumber: declaration.phone,
        documentDate: documentDate,
      }
      return doc.preview(data, languageContext.dictionary['print'])
    }
  }
  async function getDeclaratie(code) {
    setDisabled(true)
    const verifiedCode = /\b\d{7}\b \b\w{5,20}\b/gm.test(code)
    if (!verifiedCode) {
      toast({
        title: languageContext.dictionary['error'],
        description: languageContext.dictionary['invalidCode'],
        status: 'error',
        isClosable: true,
        duration: null,
      })
      setDisabled(false)
      return
    }

    try {
      const request = await fetch(`${api}/declaration-self-print/${code}`, {
        headers: {
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
          description: message,
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
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: null,
      })
    }
  }

  return (
    <Layout title='Codurile dumneavoastră'>
      <WhiteBox p='8'>
        <Center width='100%' height='100%' flexDirection='column'>
          <Heading size='lg' as='h1' lineHeight='60px' fontWeight='black' textAlign='center'>
            <Trans id='start' />
          </Heading>
          <Box mt='4' mb='16' d='flex' w='full' flexDirection='column' alignItems='center' justifyContent='center'>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                preview(qrCode)
                setTimeout(() => {
                  history.push('/')
                }, 2000)
              }}>
              <Input
                variant='flushed'
                textAlign='center'
                width='600px'
                autoFocus={true}
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                disabled={disabled}
                ref={inputRef}
              />
              <Divider color='transparent' />
              {disabled && (
                <Center width='full' height='60px'>
                  <Spinner thickness='2px' speed='0.65s' emptyColor='gray.200' color='brand.500' size='md' />
                </Center>
              )}
            </form>
          </Box>
        </Center>
      </WhiteBox>
    </Layout>
  )
}
export default Start
