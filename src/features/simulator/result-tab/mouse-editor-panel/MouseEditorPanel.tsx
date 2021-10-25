import React from 'react'
import { Box } from '@chakra-ui/react'
import MousePanelHeader from './MousePanelHeader'

const MouseEditorPanel = () => {
  return (
    <>
      <MousePanelHeader position="relative" zIndex={1} />
      <Box bg="lightcoral" h="calc(100% - 48px)">
        Mouse Editor Panel
      </Box>
    </>
  )
}

export default MouseEditorPanel
