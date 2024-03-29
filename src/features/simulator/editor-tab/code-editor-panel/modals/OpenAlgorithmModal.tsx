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
import { useAlgorithms } from '../../../../../api/hooks/algorithms'
import { useUpdateSimulation } from '../../../../../api/hooks/simulations'
import LanguageIcon from '../LanguageIcon'
import { Languages } from '../consts'
import ErrorMessageView from '../../../../../common/ErrorMessageView'

type OpenAlgorithmModalProps = {
  isOpen: boolean
  onClose: () => void
  simulation: SimulationDTO
}

const OpenAlgorithmModal = ({ isOpen, onClose, simulation }: OpenAlgorithmModalProps) => {
  const { status, data: algorithms, error } = useAlgorithms()
  const { mutateAsync: updateSimulation } = useUpdateSimulation()
  const listItemBg = useColorModeValue('blackAlpha.200', 'blackAlpha.400')
  const listItemBgHover = useColorModeValue('green.200', 'green.400')
  let content

  async function onChoose(algorithmId: string) {
    try {
      const newSimulation: SimulationDTO = {
        id: simulation.id,
        algorithmId: algorithmId,
        mazeId: simulation.mazeId,
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
    content = <ErrorMessageView message={'An error occured while loading the algorithms!'} />
  } else if (!algorithms || algorithms.length === 0) {
    console.log(error)
    content = <ErrorMessageView message={'No algorithms found!'} />
  } else {
    content = (
      <Box w="full">
        {algorithms.map((algorithm) => (
          <Center
            key={algorithm.id}
            onClick={() => onChoose(algorithm.id)}
            backgroundColor={listItemBg}
            cursor="pointer"
            _hover={{ backgroundColor: listItemBgHover }}
            w="full"
            h="3rem"
            my="2"
            borderRadius="md"
          >
            <HStack justify="space-between" w="full" px="4">
              <Text>{algorithm.name}</Text>
              <LanguageIcon language={algorithm.language as Languages} />
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
        <ModalHeader>Open algorithm</ModalHeader>
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

export default OpenAlgorithmModal
