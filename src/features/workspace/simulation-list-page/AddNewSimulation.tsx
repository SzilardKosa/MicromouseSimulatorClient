import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  IconButton,
  FormErrorMessage,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useCreateSimulation } from '../../../api/hooks/simulations'

const AddNewSimulation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, errors, formState } = useForm()
  const { mutateAsync: createSimulation } = useCreateSimulation()

  async function onSubmit(values: any) {
    try {
      await createSimulation({ name: values.name })
    } catch (error) {
      console.error(error)
    }
    onClose()
  }

  return (
    <>
      <IconButton
        aria-label="Add new simulation"
        icon={<AddIcon />}
        size="lg"
        borderRadius="full"
        colorScheme="blue"
        m={4}
        pos="absolute"
        bottom="0"
        right="0"
        onClick={onOpen}
      >
        Add new Simulation
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new simulation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)} id="add-new-simulation">
              <FormControl isInvalid={errors.name}>
                <Input
                  ref={register({ required: true })}
                  name="name"
                  placeholder="Simulation name"
                />
                <FormErrorMessage>{errors.name && 'Simulation name is required'}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              form="add-new-simulation"
              mr={3}
              isLoading={formState.isSubmitting}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddNewSimulation
