import React from 'react'
import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { SimulationDTO } from '../../../../../api/gen'
import { useMice } from '../../../../../api/hooks/mice'
import ErrorMessageView from '../../../../../common/ErrorMessageView'
import { useUpdateSimulation } from '../../../../../api/hooks/simulations'

type OpenMouseModalProps = {
  isOpen: boolean
  onClose: () => void
  simulation: SimulationDTO
}

const OpenMouseModal = ({ isOpen, onClose, simulation }: OpenMouseModalProps) => {
  const { status, data: mice, error } = useMice()
  const { mutateAsync: updateSimulation } = useUpdateSimulation()
  const listItemBg = useColorModeValue('blackAlpha.200', 'blackAlpha.400')
  const listItemBgHover = useColorModeValue('green.200', 'green.400')
  let content

  async function onChoose(mouseId: string) {
    try {
      const newSimulation: SimulationDTO = {
        ...simulation,
        mouseId,
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
    content = <ErrorMessageView message={'An error occured while loading the mice!'} />
  } else if (!mice || mice.length === 0) {
    console.log(error)
    content = <ErrorMessageView message={'No mice found!'} />
  } else {
    content = (
      <Box w="full">
        {mice.map((mouse) => (
          <Center
            key={mouse.id}
            onClick={() => onChoose(mouse.id)}
            backgroundColor={listItemBg}
            cursor="pointer"
            _hover={{ backgroundColor: listItemBgHover }}
            w="full"
            h="3rem"
            my="2"
            borderRadius="md"
          >
            <HStack justify="center" w="full" px="4">
              <Text>{mouse.name}</Text>
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
        <ModalHeader>Open mouse</ModalHeader>
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

export default OpenMouseModal
