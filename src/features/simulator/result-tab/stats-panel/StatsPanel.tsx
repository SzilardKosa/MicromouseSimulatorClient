import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import PanelHeader from '../../common/PanelHeader'

const StatsPanel = () => {
  return (
    <>
      <PanelHeader position="relative" zIndex={1}>
        <Flex alignItems={'center'}>
          <Text fontWeight="medium">Stats</Text>
        </Flex>
      </PanelHeader>
      <Box bg="lightgoldenrodyellow" h="calc(100% - 48px)">
        Stats Panel
      </Box>
    </>
  )
}

export default StatsPanel
