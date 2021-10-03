import React from 'react'
import { Center, useColorModeValue, Text, useDisclosure, Button } from '@chakra-ui/react'
import AddNewAlgorithmModal from './modals/AddNewAlgorithmModal'
import OpenAlgorithmModal from './modals/OpenAlgorithmModal'
import { SimulationDTO } from '../../../../api/gen'

type NoAlgorithmAssignedProps = { simulation: SimulationDTO }

const NoAlgorithmAssigned = ({ simulation }: NoAlgorithmAssignedProps) => {
  const errorColor = useColorModeValue('red.700', 'red.300')
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure()

  return (
    <>
      <Center h="full" p={2}>
        <Text fontSize="md" color={errorColor} maxWidth={'xl'}>
          There is no algorithm assigned to this simulation.{' '}
          <Button colorScheme="blue" variant="link" onClick={onCreateOpen}>
            Create a new
          </Button>{' '}
          or{' '}
          <Button colorScheme="blue" variant="link" onClick={onSearchOpen}>
            choose an existing one
          </Button>
          .
        </Text>
      </Center>

      <AddNewAlgorithmModal onClose={onCreateClose} isOpen={isCreateOpen} simulation={simulation} />

      <OpenAlgorithmModal onClose={onSearchClose} isOpen={isSearchOpen} simulation={simulation} />
    </>
  )
}

export default NoAlgorithmAssigned
