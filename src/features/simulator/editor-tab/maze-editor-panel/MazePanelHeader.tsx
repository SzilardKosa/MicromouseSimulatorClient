import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  Flex,
  HStack,
  BoxProps,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import SizeTypePicker, { SizeOptions } from './SizeTypePicker'
import Settings from '../../common/Settings'
import FileMenu from '../../common/FileMenu'
import PanelHeader from '../../common/PanelHeader'
import { selectCols, selectRows, setCols, setRows } from './mazeEditorSlice'

const MazePanelHeader = ({ children, ...props }: BoxProps) => {
  const [sizeType, setSizeType] = useState<SizeOptions>('full')
  const rows = useSelector(selectRows)
  const cols = useSelector(selectCols)
  const dispatch = useDispatch()
  return (
    <PanelHeader {...props}>
      <Flex alignItems={'center'}>
        <Text fontWeight="medium">Japan2012_full_size</Text>
      </Flex>
      <Flex alignItems={'center'}>
        <SizeTypePicker value={sizeType} onChange={setSizeType} />
      </Flex>
      <HStack spacing={4} alignItems={'center'}>
        <HStack spacing={2} alignItems={'center'}>
          <Text>H:</Text>
          <NumberInput
            value={rows}
            onChange={(value) => dispatch(setRows(parseInt(value)))}
            size="md"
            maxW={20}
            step={1}
            defaultValue={16}
            min={1}
            max={32}
            allowMouseWheel
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack spacing={2} alignItems={'center'}>
          <Text>W:</Text>
          <NumberInput
            value={cols}
            onChange={(value) => dispatch(setCols(parseInt(value)))}
            size="md"
            maxW={20}
            step={1}
            defaultValue={16}
            min={1}
            max={32}
            allowMouseWheel
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
      </HStack>
      <HStack spacing={4} alignItems={'center'}>
        <Settings aria-label="Maze Editor Settings" />
        <FileMenu />
      </HStack>
    </PanelHeader>
  )
}

export default MazePanelHeader
