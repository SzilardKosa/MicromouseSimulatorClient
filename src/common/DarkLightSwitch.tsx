import React from 'react'
import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const DarkLightSwitch = (props: Omit<IconButtonProps, 'aria-label'>) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      {...props}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      aria-label={'Dark Light switch'}
      onClick={toggleColorMode}
    />
  )
}

export default DarkLightSwitch
