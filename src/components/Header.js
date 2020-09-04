import React, { useContext } from 'react'
import { Heading, Flex, Image, Text } from '@chakra-ui/core'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { Trans } from '../locale/Trans'
import { LanguageContext } from '../locale/LanguageContext'
const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, lg: 0 }} mr={6} fontWeight="semibold" display="block">
    {children}
  </Text>
)
export function Header(props) {
  // const languageContext = useContext(LanguageContext)
  const bgColor = 'white'
  const color = 'brand.900'
  const borderColor = 'gray.300'
  return (
    <Flex
      as="nav"
      pos="sticky"
      top="0"
      zIndex="2"
      align="center"
      justify="space-between"
      borderBottom="1px"
      borderColor={borderColor}
      wrap="wrap"
      px={[2, 4, 10]}
      py="4"
      bg={bgColor}
      color={color}
      {...props}>
      <Link to="/">
        <Flex align="center" flexGrow={1}>
          <Image src={logo} alt="Guvernul Romaniei" height="50px" />
          <Heading
            as="h1"
            size={['xs', 'lg']}
            color={color}
            ml="4"
            fontWeight="normal"
            maxW="200px">
            <Trans id="title" />
          </Heading>
        </Flex>
      </Link>
    </Flex>
  )
}
