import React from 'react'
import { Flex } from '@chakra-ui/core'

export function Main({ children }) {
  return (
    <Flex
      minH="70vh"
      width="1280px"
      mx="auto"
      my={[1, 4, 10, 10]}
      px={[2, 4, 10, 10]}>
      {children}
    </Flex>
  )
}
