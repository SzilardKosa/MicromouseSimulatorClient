import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import PanelHeader from '../../common/PanelHeader'
import StatsPanelBody from './StatsPanelBody'

const StatsPanel = () => {
  return (
    <>
      <PanelHeader position="relative" zIndex={1}>
        <Flex alignItems={'center'}>
          <Text fontWeight="medium">Stats</Text>
        </Flex>
      </PanelHeader>
      <StatsPanelBody />
    </>
  )
}

export default StatsPanel
