import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react'
import EditTypePicker from './EditTypePicker'
import {
  changeEditType,
  selectCellSize,
  selectCellWallRation,
  selectEditType,
  setCellSize,
  setCellWallRation,
} from './mazeEditorSlice'

const MazeEditorHUD = () => {
  const editType = useSelector(selectEditType)
  const cellSize = useSelector(selectCellSize)
  const cellWallRation = useSelector(selectCellWallRation)
  const dispatch = useDispatch()
  return (
    <>
      <Box position="absolute" top="6" left="6">
        <EditTypePicker value={editType} onChange={(value) => dispatch(changeEditType(value))} />
      </Box>
      <VStack
        spacing={2}
        alignItems={'flex-end'}
        position="absolute"
        top="6"
        right="6"
        style={{ isolation: 'isolate' }}
      >
        <HStack spacing={4} alignItems={'center'}>
          <Text>Zoom:</Text>
          <Slider
            aria-label="slider-zoom"
            colorScheme={'green'}
            w={48}
            defaultValue={50}
            min={10}
            max={100}
            step={1}
            value={cellSize}
            onChange={(value) => dispatch(setCellSize(value))}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </HStack>
        <HStack spacing={4} alignItems={'center'}>
          <Text>Wall/Cell ratio:</Text>
          <Slider
            aria-label="slider-ratio"
            colorScheme={'green'}
            w={48}
            defaultValue={0.25}
            min={0.1}
            max={0.5}
            step={0.01}
            value={cellWallRation}
            onChange={(value) => dispatch(setCellWallRation(value))}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </HStack>
      </VStack>
    </>
  )
}

export default MazeEditorHUD
