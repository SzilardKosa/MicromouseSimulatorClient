import React from 'react'
import { Center } from '@chakra-ui/react'
import MazePanelHeader from './MazePanelHeader'
import MazeCanvas from './MazeCanvas'
import MazeEditorHUD from './MazeEditorHUD'
import { SimulationExpandedDTO } from '../../../../api/gen'
import NoMazeAssigned from './NoMazeAssigned'

type MazeEditorPanelProps = { simulation: SimulationExpandedDTO }

const MazeEditorPanel = ({ simulation }: MazeEditorPanelProps) => {
  const maze = simulation.maze

  if (!maze) {
    return <NoMazeAssigned simulation={simulation} />
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

export default MazeEditorPanel
