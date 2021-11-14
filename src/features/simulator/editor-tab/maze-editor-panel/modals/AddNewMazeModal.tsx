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
  Button,
  FormControl,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useCreateMaze } from '../../../../../api/hooks/mazes'
import { useUpdateSimulation } from '../../../../../api/hooks/simulations'
import { NewMazeDTO, SimulationDTO } from '../../../../../api/gen'
import { defaultHeight, defaultWalls, defaultWidth } from '../consts'

type AddNewMazeModalProps = {
  isOpen: boolean
  onClose: () => void
  simulation: SimulationDTO
}

const AddNewMazeModal = ({ isOpen, onClose, simulation }: AddNewMazeModalProps) => {
  const { register, handleSubmit, errors, formState } = useForm()
  const { mutateAsync: createMaze } = useCreateMaze()
  const { mutateAsync: updateSimulation } = useUpdateSimulation()

  async function onSubmit(values: any) {
    try {
      const newMaze: NewMazeDTO = {
        name: values.name,
        isFullSize: true,
        width: defaultWidth,
        height: defaultHeight,
        walls: defaultWalls,
        goalArea: {
          cell1: {
            x: 7,
            y: 7,
          },
          cell2: {
            x: 8,
            y: 8,
          },
        },
      }
      const result = await createMaze(newMaze)
      const newSimulation: SimulationDTO = {
        id: simulation.id,
        algorithmId: simulation.algorithmId,
        mazeId: result.data.id,
        mouseId: simulation.mouseId,
        name: simulation.name,
      }
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
        <ModalHeader>Create new maze</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)} id="add-new-maze">
            <FormControl isInvalid={errors.name}>
              <Input ref={register({ required: true })} name="name" placeholder="Maze name" />
              <FormErrorMessage>{errors.name && 'Maze name is required'}</FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            type="submit"
            form="add-new-maze"
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

export default AddNewMazeModal
