import React from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { SimulationExpandedDTO } from '../../../api/gen'
import SimulationListItem from './SimulationListItem'
import AddNewSimulation from './AddNewSimulation'

type SimulationListProps = { simulations: SimulationExpandedDTO[] }

const SimulationList = ({ simulations }: SimulationListProps) => {
  const list = simulations.map((simulation) => (
    <SimulationListItem key={simulation.id} simulation={simulation} />
  ))
  return (
    <Box p={4}>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={5}>
        {list}
      </SimpleGrid>
      <AddNewSimulation />
    </Box>
  )
}

export default SimulationList
