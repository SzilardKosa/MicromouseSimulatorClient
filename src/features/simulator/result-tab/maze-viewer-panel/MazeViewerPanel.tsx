import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import PanelHeader from '../../common/PanelHeader'
import MazeViewerPanelBody from './MazeViewerPanelBody'

const MazeViewerPanel = () => {
  return (
    <>
      <PanelHeader position="relative" zIndex={1}>
        <Flex alignItems={'center'}>
          <Text fontWeight="medium">Maze viewer</Text>
        </Flex>
      </PanelHeader>
      <MazeViewerPanelBody />
    </>
  )
}

export default MazeViewerPanel
