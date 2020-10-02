import React from 'react'
import { Box, Flex, Image, Stack, Text } from '@chakra-ui/core'
import { Trans } from '../locale/Trans'
import cn from '../assets/images/cn-full.svg'
import sts from '../assets/images/logo.png'
export function Footer() {
  return (
    <Flex wrap="wrap" width="1400px" height="100px" mx="auto">
      <Box
        borderColor="gray.200"
        borderWidth="1px 1px 0 1px"
        borderTopRadius="lg"
        textAlign="center"
        bg="white"
        color="brand.900"
        w="100%">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mt="2">
          <Image
            height="80px"
            objectFit="cover"
            src={cn}
            alt="Citizen Next"
            mx="4"
          />
          <Image
            width="60px"
            height="60px"
            objectFit="center"
            src={sts}
            alt={<Trans id="sts" />}
            mx="4"
          />
          <Text fontSize="30px" color="black">
            Serviciul de Telecomunicații Speciale
          </Text>
        </Stack>
      </Box>
    </Flex>
  )
}
