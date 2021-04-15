import React from 'react'
import { Box, Flex, useColorModeValue, BoxProps } from '@chakra-ui/react'

const PanelHeader = ({ children, ...props }: BoxProps) => {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} shadow="base" {...props}>
      <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
        {children}
      </Flex>
    </Box>
  )
}

export default PanelHeader
