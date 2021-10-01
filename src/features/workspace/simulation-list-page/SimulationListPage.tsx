import React from 'react'
import { Box, Center, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import { useSimulations } from '../../../api/hooks/simulations'
import SimulationList from './SimulationList'

const SimulationListPage = () => {
  const { status, data, error } = useSimulations()
  const errorColor = useColorModeValue('red.700', 'red.300')
  let content

  if (status === 'loading') {
    content = (
      <Center h="full">
        <Spinner />
      </Center>
    )
  } else if (status === 'error') {
    console.log(error)
    content = (
      <Center h="full">
        <Text fontSize="md" color={errorColor}>
          An error occured while loading the simulations!
        </Text>
      </Center>
    )
  } else {
    content = <SimulationList simulations={data ?? []} />
  }

  return (
    <Box h="calc(100vh - 64px)" w="full" position="relative">
      {content}
    </Box>
  )
}

export default SimulationListPage
