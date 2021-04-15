import React from 'react'
import { Box } from '@chakra-ui/react'
import MazePanelHeader from './MazePanelHeader'

const MazeEditorPanel = () => {
  return (
    <>
      <MazePanelHeader position="relative" zIndex={1} />
      <Box bg="lightskyblue" h="100%">
        Maze Editor Panel
      </Box>
    </>
  )
}

export default MazeEditorPanel
