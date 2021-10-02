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
  Select,
  Stack,
} from '@chakra-ui/react'

type AddNewAlgorithmModalProps = {
  isOpen: boolean
  onClose: () => void
}

const AddNewAlgorithmModal = ({ isOpen, onClose }: AddNewAlgorithmModalProps) => {
  const { register, handleSubmit, errors, formState } = useForm()

  async function onSubmit(values: any) {
    try {
      console.log('save algo: ', values)
    } catch (error) {
      console.error(error)
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new algorithm</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)} id="add-new-algorithm">
            <Stack spacing={4}>
              <FormControl isInvalid={errors.name}>
                <Input
                  ref={register({ required: true })}
                  name="name"
                  placeholder="Algorithm name"
                />
                <FormErrorMessage>{errors.name && 'Algorithm name is required'}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.language}>
                <Select
                  ref={register({ required: true })}
                  name="language"
                  placeholder="Select language"
                >
                  <option>Python</option>
                  <option>C</option>
                  <option>C++</option>
                </Select>
                <FormErrorMessage>
                  {errors.language && 'Algorithm language is required'}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            type="submit"
            form="add-new-algorithm"
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

export default AddNewAlgorithmModal
