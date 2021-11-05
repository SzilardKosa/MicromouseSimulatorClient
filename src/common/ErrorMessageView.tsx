import { Center, Text } from '@chakra-ui/react'
import React from 'react'
import { useErrorColor } from './consts'

type ErrorMessageViewProps = { message: String }

const ErrorMessageView = ({ message }: ErrorMessageViewProps) => {
  const errorColor = useErrorColor()
  return (
    <Center h="full">
      <Text fontSize="md" color={errorColor}>
        {message}
      </Text>
    </Center>
  )
}

export default ErrorMessageView
