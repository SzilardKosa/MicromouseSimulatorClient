import React from 'react'
import { useSelector } from 'react-redux'
import { Text, Center, HStack, VStack } from '@chakra-ui/react'
import { selectErrorMessage, selectMazeRuns } from '../resultSlice'
import ErrorMessageView from '../../../../common/ErrorMessageView'
import StatsGrid from './StatsGrid'
import StatusMessage from './StatusMessage'

const StatsPanelBody = () => {
  const mazeRuns = useSelector(selectMazeRuns)
  const errorMessage = useSelector(selectErrorMessage)

  if (!mazeRuns && !errorMessage) {
    return (
      <Center h="calc(100% - 48px)" overflow="hidden" position="relative">
        <ErrorMessageView message={'Nothing to show yet!'} />
      </Center>
    )
  }

  return (
    <VStack h="calc(100% - 48px)" alignItems="center" w="full" p="4" spacing="1" overflowY="auto">
      <HStack w="sm" alignItems="start" mb="3">
        <Text fontWeight="bold">Status: </Text>
        <StatusMessage errorMessage={errorMessage} />
      </HStack>
      {mazeRuns && <StatsGrid mazeRuns={mazeRuns} />}
    </VStack>
  )
}

export default StatsPanelBody
