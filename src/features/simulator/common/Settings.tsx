import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

const Settings = () => {
  return <IconButton aria-label="Ide Settings" size={'md'} icon={<SettingsIcon w={5} h={5} />} />
}

export default Settings
