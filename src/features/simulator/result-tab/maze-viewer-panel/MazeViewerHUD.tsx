/* eslint-disable jsx-a11y/aria-proptypes */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  HStack,
  VStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'
import {
  selectCellSize,
  selectCellWallRation,
  selectIntervalLength,
  selectSelectedInterval,
  setCellSize,
  setCellWallRation,
  setSelectedInterval,
} from '../resultSlice'

const MazeViewerHUD = () => {
  const cellSize = useSelector(selectCellSize)
  const cellWallRation = useSelector(selectCellWallRation)
  const selectedInterval = useSelector(selectSelectedInterval)
  const intervalLength = useSelector(selectIntervalLength)
  const dispatch = useDispatch()
  return (
    <>
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
            defaultValue={0.1}
            min={0.05}
            max={0.3}
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
      <HStack spacing={6} position="absolute" bottom="6" style={{ isolation: 'isolate' }}>
        <Text>Step {selectedInterval[0]}</Text>
        <RangeSlider
          aria-label={['min', 'max']}
          w={500}
          colorScheme="green"
          min={0}
          max={intervalLength}
          step={1}
          value={selectedInterval}
          onChange={(values) => dispatch(setSelectedInterval(values))}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={6} index={0} />
          <RangeSliderThumb boxSize={6} index={1} />
        </RangeSlider>
        <Text>Step {selectedInterval[1]}</Text>
      </HStack>
    </>
  )
}

export default MazeViewerHUD
