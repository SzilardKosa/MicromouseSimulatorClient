import React from 'react'
import { Icon } from '@chakra-ui/react'
import { SiC, SiCplusplus, SiPython } from 'react-icons/si'
import { Languages } from './consts'

interface LanguageIconProps {
  language: Languages
}

const LanguageIcon = ({ language }: LanguageIconProps) => {
  if (language === Languages.python) {
    return <Icon w={5} h={5} as={SiPython} />
  }
  if (language === Languages.cpp) {
    return <Icon w={5} h={5} as={SiCplusplus} />
  }
  return <Icon w={5} h={5} as={SiC} />
}

export default LanguageIcon
