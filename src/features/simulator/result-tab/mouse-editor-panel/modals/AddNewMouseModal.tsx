import React from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { MouseDTO, SimulationDTO } from '../../../../../api/gen'
import { useForm } from 'react-hook-form'
import { useCreateMouse } from '../../../../../api/hooks/mice'
import { useUpdateSimulation } from '../../../../../api/hooks/simulations'

type AddNewMouseModalProps = {
  isOpen: boolean
  onClose: () => void
  simulation: SimulationDTO
}

const AddNewMouseModal = ({ isOpen, onClose, simulation }: AddNewMouseModalProps) => {
  const { register, handleSubmit, errors, formState } = useForm()
  const { mutateAsync: createMouse } = useCreateMouse()
  const { mutateAsync: updateSimulation } = useUpdateSimulation()

  async function onSubmit(values: any) {
    try {
      const newMouse: MouseDTO = {
        name: values.name,
        acceleration: 1,
        deceleration: 1,
        maxSpeed: 1,
        turnTime: 1,
      }
      const result = await createMouse(newMouse)
      console.log(result)
      const newSimulation: SimulationDTO = {
        ...simulation,
        mouseId: result.data.id,
      }
      console.log(newSimulation)
      await updateSimulation(newSimulation)
    } catch (error) {
      console.error(error)
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new mouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)} id="add-new-mouse">
            <FormControl isInvalid={errors.name}>
              <Input ref={register({ required: true })} name="name" placeholder="Mouse name" />
              <FormErrorMessage>{errors.name && 'Mouse name is required'}</FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            type="submit"
            form="add-new-mouse"
            mr={3}
            isLoading={formState.isSubmitting}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddNewMouseModal
