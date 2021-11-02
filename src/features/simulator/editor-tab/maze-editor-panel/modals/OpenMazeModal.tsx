import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue,
  Center,
  Spinner,
  Text,
  Box,
  HStack,
} from '@chakra-ui/react'
import { SimulationDTO } from '../../../../../api/gen'
import { useMazes } from '../../../../../api/hooks/mazes'
import { useUpdateSimulation } from '../../../../../api/hooks/simulations'
import ErrorMessageView from '../../../../../common/ErrorMessageView'

type OpenMazeModalProps = {
  isOpen: boolean
  onClose: () => void
  simulation: SimulationDTO
}

const OpenMazeModal = ({ isOpen, onClose, simulation }: OpenMazeModalProps) => {
  const { status, data: mazes, error } = useMazes()
  const { mutateAsync: updateSimulation } = useUpdateSimulation()
  const listItemBg = useColorModeValue('blackAlpha.200', 'blackAlpha.400')
  const listItemBgHover = useColorModeValue('green.200', 'green.400')
  let content

  async function onChoose(mazeId: string) {
    try {
      const newSimulation: SimulationDTO = {
        id: simulation.id,
        algorithmId: simulation.algorithmId,
        mazeId: mazeId,
        mouseId: simulation.mouseId,
        name: simulation.name,
      }
      await updateSimulation(newSimulation)
    } catch (error) {
      console.error(error)
    }
    onClose()
  }

  if (status === 'loading') {
    content = (
      <Center h="full">
        <Spinner />
      </Center>
    )
  } else if (status === 'error') {
    console.log(error)
    content = <ErrorMessageView message={'An error occured while loading the mazes!'} />
  } else {
    content = (
      <Box w="full">
        {mazes?.map((maze) => (
          <Center
            key={maze.id}
            onClick={() => onChoose(maze.id)}
            backgroundColor={listItemBg}
            cursor="pointer"
            _hover={{ backgroundColor: listItemBgHover }}
            w="full"
            h="3rem"
            my="2"
            borderRadius="md"
          >
            <HStack justify="space-between" w="full" px="4">
              <Text>{maze.name}</Text>
              <Text>{maze.isFullSize ? 'full' : 'half'} size</Text>
            </HStack>
          </Center>
        ))}
      </Box>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Open maze</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" maxHeight="md">
          {content}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OpenMazeModal
