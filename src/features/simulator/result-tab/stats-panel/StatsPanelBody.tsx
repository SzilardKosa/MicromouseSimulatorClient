import React from 'react'
import { useSelector } from 'react-redux'
import { Text, Center, HStack, VStack } from '@chakra-ui/react'
import { selectErrorMessage, selectMazeRuns, selectSimulationId } from '../resultSlice'
import ErrorMessageView from '../../../../common/ErrorMessageView'
import StatsGrid from './StatsGrid'
import StatusMessage from './StatusMessage'
import { SimulationExpandedDTO } from '../../../../api/gen'
import { panelHeaderHeight } from '../../../../common/consts'

type StatsPanelBodyProps = { simulation: SimulationExpandedDTO }

const StatsPanelBody = ({ simulation }: StatsPanelBodyProps) => {
  const mazeRuns = useSelector(selectMazeRuns)
  const errorMessage = useSelector(selectErrorMessage)
  const simulationId = useSelector(selectSimulationId)

  if ((!mazeRuns && !errorMessage) || simulation.id !== simulationId) {
    return (
      <Center h={`calc(100% - ${panelHeaderHeight}px)`} overflow="hidden" position="relative">
        <ErrorMessageView message={'Nothing to show yet!'} />
      </Center>
    )
  }

  return (
    <VStack
      h={`calc(100% - ${panelHeaderHeight}px)`}
      alignItems="center"
      w="full"
      p="4"
      spacing="1"
      overflowY="auto"
    >
      <HStack w="sm" alignItems="start" mb="3">
        <Text fontWeight="bold">Status: </Text>
        <StatusMessage errorMessage={errorMessage} />
      </HStack>
      {mazeRuns && <StatsGrid mazeRuns={mazeRuns} />}
    </VStack>
  )
}

export default StatsPanelBody
