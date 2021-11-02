import React from 'react'
import { useDispatch } from 'react-redux'
import { Text, Center, useColorModeValue, VStack, Grid } from '@chakra-ui/react'
import { MazeRun, setSelectedInterval } from '../resultSlice'
import StatsItem from './StatsItem'

type StatsGridProps = { mazeRuns: MazeRun[] }

const StatsGrid = ({ mazeRuns }: StatsGridProps) => {
  const listItemBg = useColorModeValue('gray.100', 'gray.900')
  const errorColor = useColorModeValue('red.700', 'red.300')
  const dispatch = useDispatch()

  const runs = mazeRuns.map(
    (
      { endIndex, startIndex, goalReachedIndex, fullRunTime, mazeRunTime, searchBackTime },
      index
    ) => {
      return (
        <Center key={startIndex} backgroundColor={listItemBg} w="sm" borderRadius="md">
          <Grid templateColumns="70px repeat(3, 1fr)" w="full" p="1" gap="1">
            <Center>
              <Text>#{index + 1} Run</Text>
            </Center>
            <StatsItem
              steps={endIndex - startIndex}
              estimatedTime={fullRunTime}
              onClick={() => dispatch(setSelectedInterval([startIndex, endIndex]))}
            />
            {goalReachedIndex ? (
              <>
                <StatsItem
                  steps={goalReachedIndex - startIndex}
                  estimatedTime={mazeRunTime}
                  onClick={() => dispatch(setSelectedInterval([startIndex, goalReachedIndex]))}
                />
                <StatsItem
                  steps={endIndex - goalReachedIndex}
                  estimatedTime={searchBackTime}
                  onClick={() => dispatch(setSelectedInterval([goalReachedIndex, endIndex]))}
                />
              </>
            ) : (
              <Center gridColumn="3 / 5">
                <Text color={errorColor}>Goal not reached</Text>
              </Center>
            )}
          </Grid>
        </Center>
      )
    }
  )
  return (
    <>
      <Grid templateColumns="70px repeat(3, 1fr)" w="sm" p="1" gap="1">
        <Text fontWeight="bold">Runs</Text>
        <Text fontWeight="bold">Full Run</Text>
        <Text fontWeight="bold">Maze Run</Text>
        <Text fontWeight="bold">Search Back</Text>
      </Grid>
      <VStack spacing="2">{runs}</VStack>
    </>
  )
}

export default StatsGrid
