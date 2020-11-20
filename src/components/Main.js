import React from 'react'
import { Flex } from '@chakra-ui/core'

export function Main({ children }) {
  return (
    <Flex
      minHeight="780px"
      width="1400px"
      mx="auto"
      my="calc((100vh - 985px) / 2)">
      {children}
    </Flex>
  )
}
