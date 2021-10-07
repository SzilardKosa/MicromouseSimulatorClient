import React from 'react'
import { Center, useColorModeValue, useDisclosure, Text, Button } from '@chakra-ui/react'
import AddNewMazeModal from './modals/AddNewMazeModal'
import OpenMazeModal from './modals/OpenMazeModal'
import { SimulationDTO } from '../../../../api/gen'

type NoMazeAssignedProps = { simulation: SimulationDTO }

const NoMazeAssigned = ({ simulation }: NoMazeAssignedProps) => {
  const errorColor = useColorModeValue('red.700', 'red.300')
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure()

  return (
    <>
      <Center h="full" p={2}>
        <Text fontSize="md" color={errorColor} maxWidth={'xl'}>
          There is no maze assigned to this simulation.{' '}
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

      <AddNewMazeModal onClose={onCreateClose} isOpen={isCreateOpen} simulation={simulation} />

      <OpenMazeModal onClose={onSearchClose} isOpen={isSearchOpen} simulation={simulation} />
    </>
  )
}

export default NoMazeAssigned
