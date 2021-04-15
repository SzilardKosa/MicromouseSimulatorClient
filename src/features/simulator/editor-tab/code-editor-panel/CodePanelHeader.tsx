import React, { useState } from 'react'
import { Text, Flex, HStack, BoxProps } from '@chakra-ui/react'
import LanguagePicker, { LanguageOptions } from './LanguagePicker'
import Settings from '../../common/Settings'
import FileMenu from '../../common/FileMenu'
import PanelHeader from '../../common/PanelHeader'

const CodePanelHeader = ({ children, ...props }: BoxProps) => {
  const [language, setLanguage] = useState<LanguageOptions>('Python')
  return (
    <PanelHeader {...props}>
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
    </PanelHeader>
  )
}

export default CodePanelHeader
