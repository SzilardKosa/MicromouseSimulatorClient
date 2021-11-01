import React from 'react'
import { useColorModeValue, VStack, Text, StackProps } from '@chakra-ui/react'

type StatsItemProps = StackProps & {
  steps: number
  estimatedTime?: number
}

const StatsItem = ({ steps, estimatedTime, ...rest }: StatsItemProps) => {
  const listItemBgHover = useColorModeValue('green.200', 'green.400')
  return (
    <VStack
      p="1"
      borderRadius="md"
      _hover={{ backgroundColor: listItemBgHover }}
      spacing="0.5"
      alignItems="start"
      cursor="pointer"
      {...rest}
    >
      <Text fontSize="sm">Steps: {steps}</Text>
      <Text fontSize="sm">Time: --:-- s</Text>
    </VStack>
  )
}

export default StatsItem
