import React from 'react'
import { Text, Flex, HStack, BoxProps } from '@chakra-ui/react'
import Settings from '../../common/Settings'
import FileMenu from '../../common/FileMenu'
import PanelHeader from '../../common/PanelHeader'

const MousePanelHeader = ({ children, ...props }: BoxProps) => {
  return (
    <PanelHeader {...props}>
      <Flex alignItems={'center'}>
        <Text fontWeight="medium">Atomic_v1</Text>
      </Flex>
      <HStack spacing={4} alignItems={'center'}>
        <Settings />
        <FileMenu />
      </HStack>
    </PanelHeader>
  )
}

export default MousePanelHeader
