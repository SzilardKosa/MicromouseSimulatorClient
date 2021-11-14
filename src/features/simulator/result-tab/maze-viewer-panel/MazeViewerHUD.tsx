/* eslint-disable jsx-a11y/aria-proptypes */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  HStack,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { selectIntervalLength, selectSelectedInterval, setSelectedInterval } from '../resultSlice'

const MazeViewerHUD = () => {
  const selectedInterval = useSelector(selectSelectedInterval)
  const intervalLength = useSelector(selectIntervalLength)
  const dispatch = useDispatch()
  return (
    <Box
      position="absolute"
      transform="translate3d(0,0,0)"
      zIndex="2"
      bottom="6"
      rounded={'md'}
      bg={useColorModeValue('gray.100', 'gray.900')}
      boxShadow={'md'}
      p={3}
    >
      <HStack spacing={6}>
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
    </Box>
  )
}

export default MazeViewerHUD
