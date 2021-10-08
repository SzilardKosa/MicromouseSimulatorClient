import React from 'react'
import { useDispatch } from 'react-redux'
import { setGoalArea, setWalls } from './mazeEditorSlice'
import { Center, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import { MazeDTO, SimulationExpandedDTO } from '../../../../api/gen'
import { useMaze } from '../../../../api/hooks/mazes'
import MazeCanvas from './MazeCanvas'
import MazeEditorHUD from './MazeEditorHUD'
import MazePanelHeader from './MazePanelHeader'

type MazeEditorPanelContentProps = {
  simulation: SimulationExpandedDTO
  mazeId: string
}

const MazeEditorPanelContent = ({ simulation, mazeId }: MazeEditorPanelContentProps) => {
  const dispatch = useDispatch()
  const updateStore = (maze: MazeDTO) => {
    dispatch(setGoalArea([maze.goalArea.cell1, maze.goalArea.cell2]))
    dispatch(setWalls(maze.walls))
  }
  const { status, data: maze, error } = useMaze({ id: mazeId, onSuccess: updateStore })
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
        <MazeCanvas maze={maze} />
      </Center>
    </>
  )
}

export default MazeEditorPanelContent
