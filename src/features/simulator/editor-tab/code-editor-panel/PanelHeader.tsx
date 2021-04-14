import React, { useState } from 'react'
import { Box, Text, Flex, HStack, useColorModeValue, BoxProps } from '@chakra-ui/react'
import LanguagePicker, { LanguageOptions } from './LanguagePicker'
import Settings from './Settings'
import FileMenu from './FileMenu'

const PanelHeader = (props: BoxProps) => {
  const [language, setLanguage] = useState<LanguageOptions>('Python')
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} shadow="base" {...props}>
      <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'}>
          <Text fontWeight="medium">FloodFill_v1.py</Text>
        </Flex>
        <Flex alignItems={'center'}>
          <LanguagePicker value={language} onChange={setLanguage} />
        </Flex>
        <HStack spacing={4} alignItems={'center'}>
          <Settings />
          <FileMenu />
        </HStack>
      </Flex>
    </Box>
  )
}

export default PanelHeader
