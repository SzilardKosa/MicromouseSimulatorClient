import React from 'react'
import { Icon } from '@chakra-ui/react'
import { SiC, SiCplusplus, SiPython } from 'react-icons/si'

export type LanguageOptions = 'Python' | 'C' | 'C++'

interface LanguageIconProps {
  language: LanguageOptions
}

const LanguageIcon = ({ language }: LanguageIconProps) => {
  if (language === 'Python') {
    return <Icon w={5} h={5} as={SiPython} />
  }
  if (language === 'C++') {
    return <Icon w={5} h={5} as={SiCplusplus} />
  }
  return <Icon w={5} h={5} as={SiC} />
}

export default LanguageIcon
