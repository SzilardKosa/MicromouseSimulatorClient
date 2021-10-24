import { Center, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type ErrorMessageViewProps = { message: String }

const ErrorMessageView = ({ message }: ErrorMessageViewProps) => {
  const errorColor = useColorModeValue('red.700', 'red.300')
  return (
    <Center h="full">
      <Text fontSize="md" color={errorColor}>
        {message}
      </Text>
    </Center>
  )
}

export default ErrorMessageView
