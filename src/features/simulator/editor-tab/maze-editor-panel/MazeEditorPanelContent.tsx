import React from 'react'
import { Center, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import { SimulationExpandedDTO } from '../../../../api/gen'
import { useMaze } from '../../../../api/hooks/mazes'
import MazeCanvas from './MazeCanvas'
import MazeEditorHUD from './MazeEditorHUD'
import MazePanelHeader from './MazePanelHeader'

type MazeEditorPanelContentProps = {
  simulation: SimulationExpandedDTO
  mazeId: string
}

const MazeEditorPanelContent = ({ simulation, mazeId }: MazeEditorPanelContentProps) => {
  const { status, data: maze, error } = useMaze(mazeId)
  const errorColor = useColorModeValue('red.700', 'red.300')

  if (status === 'loading') {
    return (
      <Center h="full">
        <Spinner />
      </Center>
    )
  }

  if (status === 'error') {
    console.log(error)
    return (
      <Center h="full">
        <Text fontSize="md" color={errorColor}>
          An error occured while loading the maze!
        </Text>
      </Center>
    )
  }

  if (!maze) {
    return (
      <Center h="full">
        <Text fontSize="md" color={errorColor}>
          Maze not found!
        </Text>
      </Center>
    )
  }

  return (
    <>
      <MazePanelHeader position="relative" zIndex={1} simulation={simulation} maze={maze} />
      <Center h="calc(100% - 48px)" overflow="hidden" position="relative">
        <MazeEditorHUD />
        <MazeCanvas />
      </Center>
    </>
  )
}

export default MazeEditorPanelContent
