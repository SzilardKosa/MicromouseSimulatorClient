import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Flex, HStack, IconButton, useColorModeValue } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import DarkLightSwitch from '../../common/DarkLightSwitch'

const Navbar = () => {
  let history = useHistory()
  return (
    <>
      <Box bg={useColorModeValue('green.400', 'green.800')} px={4} shadow="base">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={4} alignItems={'center'}>
            <IconButton
              variant="ghost"
              colorScheme="blackAlpha"
              color={useColorModeValue('gray.800', 'white')}
              size={'md'}
              icon={<ArrowBackIcon w={5} h={5} />}
              aria-label={'Back to list'}
              onClick={() => history.push('/workspace/simulations')}
            />
            <Box fontWeight="bold">Simulator</Box>
          </HStack>
          <Flex alignItems={'center'}>
            <DarkLightSwitch
              variant="ghost"
              colorScheme="blackAlpha"
              color={useColorModeValue('gray.800', 'white')}
              size={'md'}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Navbar
