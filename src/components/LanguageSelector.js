import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box, Center } from '@chakra-ui/core'
import { LanguageContext } from '../locale/LanguageContext'
import romanian from '../assets/images/romania-flag-medium.png'
import english from '../assets/images/united-kingdom-flag-medium.png'
export function LanguageSelector() {
  let history = useHistory()
  const languageContext = useContext(LanguageContext)
  function forwardAction(e, lang) {
    e.stopPropagation()
    languageContext.setLanguage(lang)
    history.push('/start')
  }

  return (
    <Center width="full" height="full">
      <Grid templateColumns="repeat(2, 300px)" templateRows="170px" gap="10">
        <Box
          boxSize="sm"
          onClick={(e) => forwardAction(e, 'ro')}
          height="150px"
          overflow="hidden">
          <img src={romanian} alt="" width="300px" height="150px" />
        </Box>
        <Box boxSize="sm" onClick={(e) => forwardAction(e, 'en')}>
          <img src={english} alt="" width="300px" height="150px" />
        </Box>
      </Grid>
    </Center>
  )
}
