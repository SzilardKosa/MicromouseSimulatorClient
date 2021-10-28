import React from 'react'
import { useSelector } from 'react-redux'
import { Center } from '@chakra-ui/react'
import MazeViewerHUD from './MazeViewerHUD'
import MazeViewerCanvas from './MazeViewerCanvas'
import { selectMazeViewerInput } from '../resultSlice'
import ErrorMessageView from '../../../../common/ErrorMessageView'

const MazeViewerPanelBody = () => {
  const mazeViewerInput = useSelector(selectMazeViewerInput)
  if (mazeViewerInput == null) {
    return (
      <Center h="calc(100% - 48px)" overflow="hidden" position="relative">
        <ErrorMessageView message={'Nothing to show yet!'} />
      </Center>
    )
  }

  return (
    <Center h="calc(100% - 48px)" overflow="hidden" position="relative">
      <MazeViewerHUD />
      <MazeViewerCanvas {...mazeViewerInput} />
    </Center>
  )
}

export default MazeViewerPanelBody
