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
} from '@chakra-ui/react'

type OpenAlgorithmModalProps = {
  isOpen: boolean
  onClose: () => void
}

const OpenAlgorithmModal = ({ isOpen, onClose }: OpenAlgorithmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Open algorithm</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>Choose from this list</ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OpenAlgorithmModal
