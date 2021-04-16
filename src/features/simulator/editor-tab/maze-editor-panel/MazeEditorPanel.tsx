import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Center } from '@chakra-ui/react'
import MazePanelHeader from './MazePanelHeader'
import MazeCanvas from './MazeCanvas'
import EditTypePicker from './EditTypePicker'
import { changeEditType, selectEditType } from './mazeEditorSlice'

const MazeEditorPanel = () => {
  const editType = useSelector(selectEditType)
  const dispatch = useDispatch()
  return (
    <>
      <MazePanelHeader position="relative" zIndex={1} />
      <Center h="calc(100% - 48px)" overflow="auto" position="relative">
        <Box position="absolute" top="8" left="8">
          <EditTypePicker value={editType} onChange={(value) => dispatch(changeEditType(value))} />
        </Box>
        <MazeCanvas />
      </Center>
    </>
  )
}

export default MazeEditorPanel
