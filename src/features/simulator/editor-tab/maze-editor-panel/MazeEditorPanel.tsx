import React from 'react'
import { Center } from '@chakra-ui/react'
import MazePanelHeader from './MazePanelHeader'
import MazeCanvas from './MazeCanvas'

import MazeEditorHUD from './MazeEditorHUD'

const MazeEditorPanel = () => {
  return (
    <>
      <MazePanelHeader position="relative" zIndex={1} />
      <Center h="calc(100% - 48px)" overflow="hidden" position="relative">
        <MazeEditorHUD />
        <MazeCanvas />
      </Center>
    </>
  )
}

export default MazeEditorPanel
