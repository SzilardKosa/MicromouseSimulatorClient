import React from 'react'
import {
  Text,
  Button,
  HStack,
  VStack,
  Center,
  useBreakpointValue,
  LightMode,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const WelcomePage = () => {
  // https://github.com/chakra-ui/chakra-ui/issues/385
  const buttonSize = useBreakpointValue({ base: 'sm', sm: 'md', lg: 'lg' })

  return (
    <Center
      w="100%"
      h="100vh"
      bgImage="linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url('https://creightonchan.github.io/images/IMAG0138cy.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <VStack spacing="2" align="flex-start">
        <Text color="white" fontWeight="bold" fontSize={{ base: '2xl', sm: '4xl', lg: '6xl' }}>
          Micromouse Simulator
        </Text>
        <HStack spacing="2">
          <LightMode>
            <Button
              as={RouterLink}
              to="/signup"
              colorScheme="green"
              variant="solid"
              size={buttonSize}
              transition="background 250ms" // to override the size transition, on responsive resizing
            >
              Sign Up
            </Button>
            <Button
              as={RouterLink}
              to="/login"
              colorScheme="whiteAlpha"
              variant="solid"
              size={buttonSize}
              transition="background 250ms"
            >
              Log In
            </Button>
          </LightMode>
        </HStack>
      </VStack>
    </Center>
  )
}

export default WelcomePage
