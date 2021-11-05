import React from 'react'
import { Button, Center, Text, useDisclosure } from '@chakra-ui/react'
import { SimulationDTO } from '../../../../api/gen'
import AddNewMouseModal from './modals/AddNewMouseModal'
import OpenMouseModal from './modals/OpenMouseModal'
import { useErrorColor } from '../../../../common/consts'

type NoMouseAssignedProps = { simulation: SimulationDTO }

const NoMouseAssigned = ({ simulation }: NoMouseAssignedProps) => {
  const errorColor = useErrorColor()
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure()

  return (
    <>
      <Center h="full" p={2}>
        <Text fontSize="md" color={errorColor} maxWidth={'xl'}>
          There is no mouse assigned to this simulation.{' '}
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

      <AddNewMouseModal onClose={onCreateClose} isOpen={isCreateOpen} simulation={simulation} />

      <OpenMouseModal onClose={onSearchClose} isOpen={isSearchOpen} simulation={simulation} />
    </>
  )
}

export default NoMouseAssigned
