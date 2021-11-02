import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import PanelHeader from '../../common/PanelHeader'
import ConsolePanelBody from './ConsolePanelBody'
import { SimulationExpandedDTO } from '../../../../api/gen'

type ConsolePanelProps = { simulation: SimulationExpandedDTO }

const ConsolePanel = ({ simulation }: ConsolePanelProps) => {
  return (
    <>
      <PanelHeader position="relative" zIndex={1}>
        <Flex alignItems={'center'}>
          <Text fontWeight="medium">Debug Console</Text>
        </Flex>
      </PanelHeader>
      <ConsolePanelBody simulation={simulation} />
    </>
  )
}

export default ConsolePanel
