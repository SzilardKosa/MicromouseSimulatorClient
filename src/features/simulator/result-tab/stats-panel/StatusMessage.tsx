import React from 'react'
import { Text, useColorModeValue } from '@chakra-ui/react'
import { useErrorColor } from '../../../../common/consts'

type StatusMessageProps = { errorMessage?: string }

const StatusMessage = ({ errorMessage }: StatusMessageProps) => {
  const errorColor = useErrorColor()
  const successColor = useColorModeValue('green.500', 'green.300')

  if (!errorMessage) {
    return (
      <Text fontWeight="medium" color={successColor}>
        Success! Simulation finished without errors
      </Text>
    )
  }
  return (
    <Text fontWeight="medium" color={errorColor}>
      Error with message: {errorMessage}
    </Text>
  )
}

export default StatusMessage
