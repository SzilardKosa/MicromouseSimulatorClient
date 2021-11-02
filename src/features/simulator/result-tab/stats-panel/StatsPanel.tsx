import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import PanelHeader from '../../common/PanelHeader'
import StatsPanelBody from './StatsPanelBody'
import { SimulationExpandedDTO } from '../../../../api/gen'

type StatsPanelProps = { simulation: SimulationExpandedDTO }

const StatsPanel = ({ simulation }: StatsPanelProps) => {
  return (
    <>
      <PanelHeader position="relative" zIndex={1}>
        <Flex alignItems={'center'}>
          <Text fontWeight="medium">Stats</Text>
        </Flex>
      </PanelHeader>
      <StatsPanelBody simulation={simulation} />
    </>
  )
}

export default StatsPanel
