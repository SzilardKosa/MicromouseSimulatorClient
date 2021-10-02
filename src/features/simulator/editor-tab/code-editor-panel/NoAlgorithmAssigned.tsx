import React from 'react'
import { Center, useColorModeValue, Text, useDisclosure, Button } from '@chakra-ui/react'
import AddNewAlgorithmModal from './modals/AddNewAlgorithmModal'
import OpenAlgorithmModal from './modals/OpenAlgorithmModal'
import { SimulationDTO } from '../../../../api/gen'

type NoAlgorithmAssignedProps = { simulation: SimulationDTO }

const NoAlgorithmAssigned = ({ simulation }: NoAlgorithmAssignedProps) => {
  const errorColor = useColorModeValue('red.700', 'red.300')
  const {
    isOpen: isAddNewAlgorithmModalOpen,
    onOpen: onAddNewAlgorithmModalOpen,
    onClose: onAddNewAlgorithmModalClose,
  } = useDisclosure()
  const {
    isOpen: isOpenAlgorithmModalOpen,
    onOpen: onOpenAlgorithmModalOpen,
    onClose: onOpenAlgorithmModalClose,
  } = useDisclosure()

  return (
    <>
      <Center h="full" p={2}>
        <Text fontSize="md" color={errorColor} maxWidth={'xl'}>
          There is no algorithm assigned to this simulation.{' '}
          <Button colorScheme="blue" variant="link" onClick={onAddNewAlgorithmModalOpen}>
            Create a new
          </Button>{' '}
          or{' '}
          <Button colorScheme="blue" variant="link" onClick={onOpenAlgorithmModalOpen}>
            choose an existing one
          </Button>
          .
        </Text>
      </Center>

      <AddNewAlgorithmModal
        onClose={onAddNewAlgorithmModalClose}
        isOpen={isAddNewAlgorithmModalOpen}
        simulation={simulation}
      />

      <OpenAlgorithmModal onClose={onOpenAlgorithmModalClose} isOpen={isOpenAlgorithmModalOpen} />
    </>
  )
}

export default NoAlgorithmAssigned
