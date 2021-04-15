import React, { useState } from 'react'
import { Text, Flex, HStack, BoxProps } from '@chakra-ui/react'
import SizeTypePicker, { SizeOptions } from './SizeTypePicker'
import Settings from '../../common/Settings'
import FileMenu from '../../common/FileMenu'
import PanelHeader from '../../common/PanelHeader'

const MazePanelHeader = ({ children, ...props }: BoxProps) => {
  const [sizeType, setSizeType] = useState<SizeOptions>('full')
  return (
    <PanelHeader {...props}>
      <Flex alignItems={'center'}>
        <Text fontWeight="medium">Japan2012_full_size</Text>
      </Flex>
      <Flex alignItems={'center'}>
        <SizeTypePicker value={sizeType} onChange={setSizeType} />
      </Flex>
      <HStack spacing={4} alignItems={'center'}>
        <Settings />
        <FileMenu />
      </HStack>
    </PanelHeader>
  )
}

export default MazePanelHeader
