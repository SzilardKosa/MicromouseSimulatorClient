import React from 'react'
import { Center } from '@chakra-ui/react'
import MazeViewerHUD from './MazeViewerHUD'
import MazeViewerCanvas from './MazeViewerCanvas'

const MazeViewerPanelBody = () => {
  return (
    <Center h="calc(100% - 48px)" overflow="hidden" position="relative">
      <MazeViewerHUD />
      <MazeViewerCanvas />
    </Center>
  )
}

export default MazeViewerPanelBody
