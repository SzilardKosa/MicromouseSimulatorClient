import React from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

const Settings = (props: IconButtonProps) => {
  return <IconButton {...props} size={'md'} icon={<SettingsIcon w={5} h={5} />} />
}

export default Settings
